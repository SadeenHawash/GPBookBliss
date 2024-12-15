import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genres:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Genre',
            required: true
        }
    ],
    description: {
        type: String,
        required: true
    },
    numberOfPages: {
        type: Number,
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    image: {
        type: Object,
    },
    // languages: {
    //     type: [String],
    //     required: true
    // },
    price: {
        type: Number,
        required: true
    },
    discount:{
        type: Number,
        required: true,
        default: 0
    },
    quantity: {
        type: Number,
        required: true,
    },
    pdf: { 
        type: Object
    }, 
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    salesCount: {
        type: Number,
        required: true,
        default: 0,
    },
    // audioUrl: { 
    //     type: String
    // },
    // audioDuration: { 
    //     type: Number
    // }
});

const Book = mongoose.model("Book", bookSchema);

export default Book;