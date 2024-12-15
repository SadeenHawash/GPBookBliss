import express from "express";
import multer from "multer";
import protectRoute from "../middleware/protectRoute.js"
import { addReview, createBook, deleteBook, editBook, getAllBooks, getBook, getUserBookReview, getUserStories, searchAndFilterBooks, userCreateBook } from "../controllers/bookController.js";
import { storage } from '../utils/fileUpload.js';
import { errorHandlingMD } from "../middleware/errorHandlingMD.js";

// multer instance 
const upload = multer({storage});
const router = express.Router();

router.get("/search", protectRoute, searchAndFilterBooks);
//router.get('/search-book', protectRoute, searchBook);
router.get("/mybooks", protectRoute, getUserStories);
router.get("/all", getAllBooks);
router.get('/:bookId', protectRoute, getBook, errorHandlingMD); 
router.post('/create', protectRoute, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'pdf', maxCount: 1 }
]), createBook);
router.post('/user-create', protectRoute, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'pdf', maxCount: 1 }
]), userCreateBook);
router.put('/:bookId', protectRoute, editBook);
router.delete('/:bookId', protectRoute, deleteBook);
router.post("/:bookId/review", protectRoute, addReview);
router.get("/:bookId/myreview", protectRoute, getUserBookReview);


export default router;

// import { upload } from "../utils/multerConfig.js";
// import {
//     addBook,
// } from "../controllers/bookController.js";
//import { getRecommendations } from "../controllers/recommendationcontroller.js";

// router.get("/books", getBooks); // Add this route

// router.get("/books/search", searchBooks);
// router.get("/books/user/:userId", getUserUploadedBooks);
// router.get("/books/recommendations/:userId", getRecommendations);

// router.get("/books/top-selling", getTopSellingBooks);
// router.get("/books/:id", getBookDetails);

// router.post("/books/:bookId/review", addReview);
// router.put("/books/edit/:id", editBook);
// router.delete("/books/:id", deleteBook);

// router.post("/books/recently-view/:userId/:bookId", recentlyViewBook);
// router.get("/books/recently-view/:userId", getRecentlyViewedBooks);