import asyncHandler from "express-async-handler";
import Book from "../models/bookModel.js";
import User from "../models/user/userModel.js";
import Review from "../models/review/reviewModel.js";
import { ObjectId } from 'bson';
// get all books
export const getAllBooks = asyncHandler(
    async(req, res) => {
        const books = await Book.find().populate('genres', 'name');
        res.json(books);
    }
);

export const getBook = asyncHandler(
    async(req, res) => {
        const bookId = req.params.bookId;
        const bookFounded = await Book.findById(bookId)
        .populate('genres', 'name')
        .populate('reviews')
        .populate({
            path: 'reviews',
            populate: {
                path: 'userId',
                select: 'fullName'
            }
        });
        if(!bookFounded){
            throw new Error("Post not found")
        }
        res.json({
            status:'success',
            message: 'Book fetched successfully',
            bookFounded
        })
    }
)

export const createBook = async (req, res, next) => {
    try {
        const {
            title,
            author,
            publishedDate,
            numberOfPages,
            description,
            genres,
            price,
            discount,
            quantity
        } = req.body;

        const image = req.files['image'] ? req.files['image'][0].path : null;
        const pdf = req.files['pdf'] ? req.files['pdf'][0].path : null;

        // Ensure genres is an array of ObjectId
        let genresArray;
        try {
            genresArray = Array.isArray(genres) ? genres : JSON.parse(genres);
        } catch (err) {
            return res.status(400).json({ message: 'Invalid genres format' });
        }

        const newBook = new Book({
            title,
            author,
            publishedDate,
            numberOfPages,
            description,
            genres: genresArray,
            price,
            discount,
            quantity,
            image,
            pdf
        });

        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        console.error('Error creating book:', error.message); // More detailed error message
        if (error.stack) {
            console.error(error.stack);
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const editBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
            new: true,
        });
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.bookId);
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const addReview = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const userId = req.user._id;
        const user = await User.findOne(userId);
        if(!user){
            throw new Error("User not found")
        }
        const { rating, comment } = req.body;
        const newReview = new Review({ userId, bookId, comment, rating });
        await newReview.save();
    
        await Book.findByIdAndUpdate(bookId, { $push: { reviews: newReview._id } });
    
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getUserBookReview = async(req, res) => {
    const bookId = req.params.bookId;
    const userId = req.user._id;
    try {
        const review = await Review.findOne({ bookId, userId });
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const userCreateBook = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const {
            title,
            numberOfPages,
            description,
            genres,
            price,
            discount,
            quantity
        } = req.body;

        const image = req.files['image'] ? req.files['image'][0].path : null;
        const pdf = req.files['pdf'] ? req.files['pdf'][0].path : null;

        // Ensure genres is an array of ObjectId
        let genresArray;
        try {
            genresArray = Array.isArray(genres) ? genres : JSON.parse(genres);
        } catch (err) {
            return res.status(400).json({ message: 'Invalid genres format' });
        }

        const user = await User.findOne(userId);
        if(!user){
            throw new Error("User not found")
        }


        const newBook = new Book({
            title,
            author: user.fullName,
            publishedDate: Date.now(),
            numberOfPages,
            description,
            genres: genresArray,
            price,
            discount,
            quantity,
            image,
            pdf
        });

        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        console.error('Error creating book:', error.message); // More detailed error message
        if (error.stack) {
            console.error(error.stack);
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getUserStories = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findOne(userId);
        if(!user){
            throw new Error("User not found")
        }
        const userFullName = user.fullName;
        const userStories = await Book.find({ author: userFullName});
        res.status(200).json(userStories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const searchAndFilterBooks = async (req, res) => {
    try {
        const { search, author, price, rating, category, discount, pages } = req.query;

        let filterCriteria = {};

        // Search by book name or author
        if (search) {
        filterCriteria.$or = [
            { title: { $regex: search, $options: 'i' } }, 
            { author: { $regex: search, $options: 'i' } } 
        ];
        }

        // Filter by author
        if (author) {
        filterCriteria.author = { $regex: author, $options: 'i' };
        }

        // Filter by price range
        if (price) {
        filterCriteria.price = { $gte: price };
        }

        // Filter by rating
        const reviews = await Review.find({ rating: { $eq: rating } });
        
        if (rating) {
        filterCriteria.rating = reviews.rating ;
        }

        // Filter by category
        if (category) {
        filterCriteria.category = category;
        }

        // Filter by discount range
        if (discount) {
        filterCriteria.discount = { $gte: discount };
        }

        // Filter by number of pages range
        if (pages) {
        filterCriteria.numberOfPages = { $gte: pages };
        }

        const books = await Book.find(filterCriteria);

        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


