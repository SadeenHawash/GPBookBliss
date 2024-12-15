import mongoose from "mongoose";

const postNotificationSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'POST',
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

const PostNotification = mongoose.model("PostrNotification", postNotificationSchema);

export default PostNotification;