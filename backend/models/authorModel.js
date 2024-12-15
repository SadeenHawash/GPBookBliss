import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    image: {
        type: String,
        required: true
    },
    about: { type: String },
    books: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Book' 
        }
    ],
});

const Author = mongoose.model('Author', authorSchema);

export default Author;
