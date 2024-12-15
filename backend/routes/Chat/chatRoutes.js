import express from 'express';
import {  accessChat, fetchChats, searchUser, createGroup, renameGroup, addToGroup, removeFromGroup } from '../../controllers/Chat/chatController.js';
import protectRoute from '../../middleware/protectRoute.js';

const router = express.Router();

//access exsisting chat or create if not exist
router.post('/acess-chat', protectRoute, accessChat);
//fetch all chats
router.get('/', protectRoute, fetchChats);
//search
router.get('/search-chat', protectRoute, searchUser);
//group
//create group
router.post('/group', protectRoute, createGroup);
//rename group
router.put('/rename', protectRoute, renameGroup);
//add to group
router.put('/groupadd', protectRoute, addToGroup);
//remove from group
router.put('/groupremove', protectRoute, removeFromGroup);

export default router;