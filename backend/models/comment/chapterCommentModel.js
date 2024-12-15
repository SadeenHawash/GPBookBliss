import mongoose from "mongoose";

const chapterCommentSchema = mongoose.Schema({
    commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Chapter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter',
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {timestamps: true});

const ChapterComment = mongoose.model("ChapterComment", chapterCommentSchema);

export default ChapterComment;