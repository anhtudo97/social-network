const { Schema, model } = require("mongoose");

const followerSchema = new Schema({
    user: {
        type: Schema.Type.ObjectId,
        ref: "User",
    },
    followers: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    }, ],
    following: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    }, ],
});

module.exports = model("Follower", followerSchema);