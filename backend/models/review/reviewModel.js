import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    comment:{
        type: String
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    }
} , {timestamps: true});

const Review = mongoose.model("Review", reviewSchema);

export default Review;