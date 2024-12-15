import express from 'express';
import protectRoute from '../../middleware/protectRoute.js';
import { allMessages, sendMessage } from '../../controllers/Chat/messageController.js';

const router = express.Router();

router.post('/send', protectRoute, sendMessage);
router.get('/messages/:chatId', protectRoute, allMessages);

export default router;