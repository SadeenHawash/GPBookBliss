import express from 'express';
import { createStory, deleteStory, getStory, updateStory } from '../controllers/UserStory/userStoryController.js';
import { errorHandlingMD } from '../middleware/errorHandlingMD.js';
const router = express.Router();

//create story
router.post('/create', createStory, errorHandlingMD);

//update Story
router.put('/:storyId', updateStory, errorHandlingMD);

//delete story
router.delete('/:storyId', deleteStory, errorHandlingMD);

//get story
router.get('/:storyId', getStory, errorHandlingMD);

export default router;