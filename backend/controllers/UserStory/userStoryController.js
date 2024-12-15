import asyncHandler from "express-async-handler";
import Story from "../../models/userStory/storyModel.js";

//create story
export const createStory = asyncHandler(
    async(req, res) => {
        const storyData = req.body; 
        const storyCreated = await Story.create(storyData);
        if(!storyCreated){
            throw new Error("Story not created");
        }
        res.json({
            status:'success',
            message: 'Story created successfully',
            storyCreated
        })
    }
)

// update story
export const updateStory = asyncHandler(
    async(req, res) => {
        const storyId = req.params.storyId;
        const updateData = req.body;
        const storyFounded = await Story.findById(storyId);
        if(!storyFounded){
            throw new Error("Story not found")
        }
        const storyUpdated = await Story.findByIdAndUpdate(storyId, updateData, {new: true});
        if(!storyUpdated){
            throw new Error("Story cannot be updated.")
        }
        res.json({
            status:'success',
            message: 'Story updated successfully',
            storyUpdated
        })
    }
)

//delete story
export const deleteStory = asyncHandler(
    async(req, res) => {
        const storyId = req.params.storyId;
        const storyFounded = await Story.findById(storyId);
        if(!storyFounded){
            throw new Error("Story not found")
        }
        const storyDeleted = await Story.findByIdAndDelete(storyId);
        if(!storyDeleted){
            throw new Error("Story cannot be deleted.")
        }
        res.json({
            status:'success',
            message: 'Story deleted successfully',
            storyDeleted
        })
    }
)

//get story
export const getStory = asyncHandler(
    async(req, res) => {
        const storyId = req.params.storyId;
        const storyFounded = await Story.findById(storyId);
        if(!storyFounded){
            throw new Error("Story not found")
        }
        res.json({
            status:'success',
            message: 'Story fetched successfully',
            storyFounded
        })
    }
)