import mongoose from "mongoose";

const chapterNotificationSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chapterId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter'
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const ChapterNotification = mongoose.model("ChapterNotification", chapterNotificationSchema);

export default ChapterNotification;