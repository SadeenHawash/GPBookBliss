import mongoose from "mongoose";

const storySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        //required: true
    },
    genre: [{
        type: String,
        //type: mongoose.Schema.Types.ObjectId,
        //ref: 'Genre',
        required: true
    }],
    isPaid: {
        type: Boolean,
        default: false
    },
    chapters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter'
    }], 
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

const Story = mongoose.model('Story', storySchema);

export default Story;