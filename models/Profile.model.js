const { Schema, model } = require("mongoose");

const profleSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    bio: {
        type: String,
        required: true,
    },
    techStack: {
        type: [String],
    },
    social: {
        github: { type: String },
        website: { type: String },
        linkedin: { type: String },
        twitter: { type: String },
        instagram: { type: String },
        youtube: { type: String },
    },
    badges: [{
        title: String,
        image: String,
        description: String,
    }, ],
}, {
    timestamps: true,
});

module.exports = model("Profile", profileSchema);