import User from "../../models/user/userModel.js";
import Chat from '../../models/chat/chatModel.js';
import asyncHandler from "express-async-handler";

export const  accessChat = async(req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(403).json({ error: 'Invalid request' });
        }
        var isChat = await Chat.find({ 
            isChatGroup: false,
            $and: [
                {participents: { $elemMatch: {$eq: req.user._id}}},
                {participents: { $elemMatch: {$eq: userId}}}
            ]
        }).populate("participents", "-password")
                .populate("latestMessage");
        isChat = await User.populate(isChat, {
            path: "latestMessage.sender",
            select: "username profilePic email",
        });
        if (isChat.length > 0) {
            return res.status(200).json(isChat[0]);
        } else {
            var chatData = {
                isChatGroup: false,
                participents: [req.user._id, userId],
                chatName: "sender"
            }
            try {
                var createdChat = await Chat.create(chatData);
                const FullChat = await Chat.findOne({_id: createdChat._id}).populate("participents", "-password");
                return res.status(200).json(FullChat);
            } catch (error) {
                return res.status(500).json({error: "Internal Server Error"});
            }
        }
        } catch (error) {
        console.log("Error in  access Chat Controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const fetchChats = asyncHandler(
    async(req, res) => {
        try {
            var chats = await Chat.find({participents: {$elemMatch: {$eq: req.user._id}}})
            .populate("participents", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
                .sort({updatedAt: -1});
            chats = await User.populate(chats, {
                path: "latestMessage.sender",
                select: "username profilePic email",
            });
            return res.status(200).json(chats);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
)

export const searchUser = asyncHandler(
    async(req, res) => {
        const keyword = req.query.search;
        const regex = new RegExp(keyword, 'i');
        const users = await User.find({
            $or: [
                {fullName: regex},
                {username: regex},
                {email: regex}
            ]
        });
        res.status(200).json(users);
    }
)

export const createGroup = asyncHandler(
    async(req, res) => {
        if(!req.body.participents || !req.body.chatName){
            return res.status(400).send({message: "Please fill all the feilds!"});
        }
        console.log(req.body.participents);
        //test group1
        //var participents = req.body.participents;
        //test group
        var participents = JSON.parse(req.body.participents);
        if(participents.length < 2){
            return res.status(400).send({message: "Please add atleast 2 users!"});
        }
        console.log(participents);
        participents.push(req.user._id);
        console.log(participents.length);
        const groupAdmin = req.user;
        try {
            const createGroup = await Chat.create({
                isChatGroup: true,
                groupAdmin,
                participents,
                chatName : req.body.chatName
            });
            const fullGroupChat = await Chat.findOne({_id: createGroup._id})
            .populate("participents", "-password")
            .populate("groupAdmin", "-password");

            res.status(200).json(fullGroupChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
)

export const renameGroup = asyncHandler(
    async(req, res) => {
        const {chatId , chatName} = req.body;
        const updatedChat = await Chat.findByIdAndUpdate( chatId, { chatName: chatName },
            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            }
        )
        .populate("participents", "-password")
        .populate("groupAdmin", "-password");
    
        if (!updatedChat) {
            return res.status(404).json({error: "Chat not found"});
        }
        res.status(200).json(updatedChat);
    }
)

export const addToGroup = asyncHandler(
    async(req, res) => {
        const {chatId, userId} = req.body;
        const groupChat = await Chat.findById(chatId);
        if (!groupChat) {
            return res.status(404).json({error: "Chat not found"});
        }
        if(groupChat.participents.includes(userId)){
            return res.status(400).json({error: "User is already in the group"});
        }
        const added = await Chat.findByIdAndUpdate(
            chatId,
            {
                $push: {
                    participents: userId
                }
            },
            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            }
        )
        .populate("participents", "-password")
        .populate("groupAdmin", "-password");
    
        if(!added){
            res.status(404);
            throw new Error("Chat not found");
        }
        res.status(200).json(added);
    }
)

export const removeFromGroup = asyncHandler(
    async(req, res) => {
        const {chatId, userId} = req.body;
        const groupChat = await Chat.findById(chatId);
        if (!groupChat) {
            return res.status(404).json({error: "Chat not found"});
        }
        if(!groupChat.participents.includes(userId)){
            return res.status(400).json({error: "User not in the group"});
        }
        const removed = await Chat.findByIdAndUpdate(
            chatId,
            {
                $pull: {
                    participents: userId
                }
            },
            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            }
        )
        .populate("participents", "-password")
        .populate("groupAdmin", "-password");
    
        if(!removed){
            return res.status(404).json({error: "Can't remove participant to group"});
        }
        res.status(200).json(removed);
    }
)