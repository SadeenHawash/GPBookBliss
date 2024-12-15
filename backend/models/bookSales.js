import mongoose from "mongoose";

const booksSalesSchema = mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    revenue:{
        type: Number,
        required: true
    },
    month:{
        type: Number,
        required: true
    },
    year:{
        type: Number,
        required: true
    }
}, {timestamps: true});

const BooksSales = mongoose.model("BooksSales", booksSalesSchema);

export default BooksSales;