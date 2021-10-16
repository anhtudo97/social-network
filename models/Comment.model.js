const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
    },
    comments: [{
        _id: { type: String, required: true },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        text: {
            type: String,
            required: true,
        },
        date: { type: Date, default: Date.now },
        likes: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        }, ],
        replies: [{
            _id: { type: String, required: true },
            user: { type: Schema.Types.ObjectId, ref: "User" },
            text: { type: String, required: true },
            date: { type: Date, default: Date.now },
            likes: [{
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
            }, ],
        }, ],
    }, ],
});

module.exports = model("Comment", commentSchema);