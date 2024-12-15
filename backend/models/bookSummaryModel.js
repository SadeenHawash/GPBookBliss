import mongoose from "mongoose";

const bookSummarySchema = mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    summary: [
        {
            type: String,
            required: true
        }
    ]
});

const BookSummary = mongoose.model("BookSummary", bookSummarySchema);

export default BookSummary;