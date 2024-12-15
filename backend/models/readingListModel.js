import mongoose from "mongoose";

const readingListSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    wantToRead:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ],
    currentlyReading:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ],
    finishedReading:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ],
});

const ReadingList = mongoose.model("ReadingList", readingListSchema);

export default ReadingList;