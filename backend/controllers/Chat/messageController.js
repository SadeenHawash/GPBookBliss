import asyncHandler from "express-async-handler";
import Message from "../../models/chat/messageModel.js";
import User from "../../models/user/userModel.js";
import Chat from "../../models/chat/chatModel.js";

//send message
export const sendMessage = asyncHandler(
    async(req, res) => {
        const { content, chatId } = req.body;
        if(!content || !chatId){
            console.log("Invalid data passed into request");
            return res.sendStatus(400);
        }
        var newMessage = {
            sender: req.user._id,
            content: content,
            chat: chatId
        }
        try {
            var message = await Message.create(newMessage);
            message = await message.populate("sender", "fullName profilePic");
            message = await message.populate("chat");
            message = await User.populate(message, {
                path: "chat.participents",
                select: "username profilePic email",
            });
            await Chat.findByIdAndUpdate(req.body.chatId, {
                latestMessage: message
            });
            console.log('Sending message:', message);
            res.status(200).json({
                message
            });
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
);

//get all messages
export const allMessages = asyncHandler(
    async(req, res) => {
        try {
            const messages = await Message.find({chat: req.params.chatId}).populate(
                "sender", "username profilePic email"
            ).populate("chat");
    
            res.status(200).json({
                messages
            });
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
);