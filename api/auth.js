const path = require("path");
const crypto = require("crypto");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const handlebars = require("handlebars");
const router = express.Router();

const User = require("../models/User.model");

const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const sendMail = require("../server-utils/sendEmail");
const readHtml = require("../server-utils/readHtml");

// @route:  GET /api/auth
// @desc:   Get logged in user's info
router.get("/", auth, async(req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(400).json({
                msg: "Please verify your email and complete onboarding first",
            });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.log(err);
        res.status(500).json({ msg: "Server error" });
    }
});

// @route:  POST /api/auth
// @desc:   Login user
router.post("/", async(req, res) => {
    const { email, password } = req.body;

    if (password.length < 6)
        return res
            .status(400)
            .json({ msg: "Password must be at least 6 characters" });

    try {
        // Check if user is registered
        const user = await User.findOne({ email: email.toLowerCase() }).selct(
            "+password"
        );
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        if (!user.isVerified)
            return res
                .status(403)
                .json({ msg: "Please verify your email before trying to log in" });

        // Check if password is correct
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword)
            return res.status(400).json({ msg: "Invalid credentials" });

        // Sign JWT and return token
        jwt.sign({ userId: user._id }, process.env.JWT_SECRET, (err, token) => {
            if (err) throw err;
            res.status(200).send({ token });
        });
    } catch (error) {
        console.log(err);
        res.status(500).json({ msg: "Server error" });
    }
});

// @route:  PUT /api/auth
// @desc:   Update user settings
router.put("/", auth, upload.single("profilePic"), async(req, res) => {
    try {
        const { name, password } = req.body;

        // Check if username is already taken
        let user = await User.findOne({ username: username.toLowerCase() });
        if (user && user._id.toString() !== req.userId) {
            return res.status(400).json({ msg: "Username is already taken" });
        }

        const updateUser = {};
        if (name) updateUser.name = name;
        if (username) updateUser.username = username;
        if (req.file && req.file.path) updateUser.profilePicUrl = req.file.path;

        user = await User.findByIdAndUpdate(req.userId, updateUser, { new: true });

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error" });
    }
});

// @route:  PUT /api/auth/password
// @desc:   Update password
router.put("/", auth, async(req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.userId).select("+password");
        if (!user) return res.status(404).json({ msg: "User not found" });

        // Check if current password matches
        const isMatch = await bcrypt.compare(currentPassword, newPassword);
        if (!isMatch) return res.status(401).json({ msg: "Incorrect password" });

        if (newPassword.length < 6)
            return res
                .status(400)
                .json({ msg: "Password must be atleast 6 characters long" });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({ msg: "Password updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error" });
    }
});

// @route:  POST /api/auth/forgot-password
// @desc:   Send password reset email
router.post("/forgot-password", async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ msg: "User not found" });

        const resetToken = crypto.randomBytes(20).toString("hex");
        user.resetPasswordToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

        const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/reset-password/${resetToken}`;

        const htmlTemplate = await readHtml(
            path.join(__dirname, "..", "emails", "forgot-password.html")
        );

        const handlebarsTemplate = handlebars.compile(htmlTemplate);
        const replacements = { resetUrl };
        const html = handlebarsTemplate(replacements);

        try {
            await sendEmail({
                to: user.email,
                subject: "Driwwwle - Reset Password",
                html,
            });
        } catch (error) {
            console.log(err);
            user.resetPasswordToken = undefined;
            await user.save();
            return res.status(500).json({ msg: "Error sending verification email" });
        }

        await user.save();
        res.status(200).json({ msg: "Email sent" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }

    // @route:  PUT /api/auth/reset-password/:token
    // @desc:   Reset password
    router.put("reset-password", async(req, res) => {
        try {
            const resetPasswordToken = crypto
                .createHash("sha256")
                .update(req.params.token)
                .digest("hex");

            const user = await User.findOne({
                resetPasswordToken,
                resetPasswordExpire: { $gt: Date.now() },
            });

            if (!user)
                return res.status(400).json({ msg: "Invalid or expired token" });

            // Set new password
            user.password = await bcrypt.hash(req.body.password, 10);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();

            res.status(200).json({ msg: "Password reset successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Server error" });
        }
    });
});

module.exports = router;