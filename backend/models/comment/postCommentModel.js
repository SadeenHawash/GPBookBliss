import mongoose from "mongoose";

const postCommentSchema = mongoose.Schema({
    commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true});

const PostComment = mongoose.model("PostComment", postCommentSchema);

export default PostComment;