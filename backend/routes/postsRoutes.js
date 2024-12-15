import express, { Router } from 'express';
import multer from 'multer'
import { createPost, getAllPosts, getLikedPosts, updatePost, getPost, deletePost, getUserPosts, likeUnlikePost, commentOnPost } from '../controllers/postControllers.js';
import { errorHandlingMD } from '../middleware/errorHandlingMD.js';
import { storage } from '../utils/fileUpload.js';
import protectRoute from '../middleware/protectRoute.js';

// multer instance 
const upload = multer({storage});
const router = express.Router();

router.get('/', getAllPosts, protectRoute, errorHandlingMD);
router.get('/liked-posts', protectRoute, getLikedPosts, errorHandlingMD);
//router.get("/user", protectRoute, getUserPosts);
router.get("/user/:username", protectRoute, getUserPosts);
//router.get("/following", protectRoute, getFollowingPosts);
router.get('/:postId', protectRoute, getPost, errorHandlingMD); 
router.post('/create', protectRoute, upload.single('image'), createPost, errorHandlingMD);
router.post("/like/:postId", protectRoute, likeUnlikePost);
router.post("/comment/:postId", protectRoute, commentOnPost);
router.put('/:postId', protectRoute, updatePost, errorHandlingMD);
router.delete('/:postId', protectRoute, deletePost, errorHandlingMD);

export default router;