import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    participents:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    ],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    },
    isChatGroup: {
        type: Boolean,
        default: false,
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    chatName: {
        type: String,
        trim: true,
    },
    // messages: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Message'
    //     }
    // ]
}, {timestamps: true});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;