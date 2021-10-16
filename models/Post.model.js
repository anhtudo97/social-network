const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    techStack: {
        type: [String],
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    liveDemo: {
        type: String,
        required: true,
    },
    sourceCode: {
        type: String,
    },
    likes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    }, ],
    saves: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    }, ],
    views: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

module.exports = model("Post", postSchema);