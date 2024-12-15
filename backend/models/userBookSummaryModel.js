import mongoose from "mongoose";

const userBookSummarySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    //likes 
}, {timestamps: true});

const UserBookSummary = mongoose.model('UserBookSummary', userBookSummarySchema);

export default UserBookSummary;