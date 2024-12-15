import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { addBookToList, checkBookInLists, checkBookStatus, getReadingListBooks, getSimilarBooks, getUserReadingList, moveBookBetweenLists, removeBookFromList } from "../controllers/readingListController.js";

const router = express.Router();

router.post('/move', protectRoute, moveBookBetweenLists);
router.post('/add', protectRoute, addBookToList);
router.delete('/:listName/:bookId/remove', protectRoute, removeBookFromList);
router.get('/similar-books/:listName', protectRoute, getSimilarBooks);
router.get('/', protectRoute, getUserReadingList);
//router.get('/:listName', protectRoute, getUserReadingList);
router.get('/status/:bookId', protectRoute, checkBookStatus);
router.get('/checkBook/:bookId', protectRoute, checkBookInLists);
router.get('/list/:listName', protectRoute,getReadingListBooks);

export default router;