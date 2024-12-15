import Post from "../models/post/postModel.js";
import asyncHandler from "express-async-handler";
import User from "../models/user/userModel.js";
import PostComment from "../models/comment/postCommentModel.js";

export const createPost = asyncHandler(
    async(req, res) =>{
        console.log(req.file);
        const { description } = req.body;
        const userId = req.user._id;
        const user = await User.findOne(userId);
        if(!user){
            throw new Error("User not found")
        }
        const postCreated = await Post.create({ description, image: req.file, user:user});
        if(!postCreated){
            throw new Error ("Post cannot be created.");
        }
        user.posts.push(postCreated?._id);
        const userUpdated = await user.save();
        if (!userUpdated) {
            throw new Error("User cannot be updated.");
        }
        res.json({
            status: 'success',
            message: 'Post created successfully',
            postCreated
        })
    }
)

export const getAllPosts = asyncHandler(
    async(req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 })
    .populate({ path: 'user', select: 'fullName' })
    .populate({
        path: 'comments',
        populate: {
            path: 'commenter',
            select: 'fullName'
        }
    });
    if(!posts){
        throw new Error("Posts cannot be fetched.");
    }
    res.json({
        status:'success',
        message: 'Posts fetched successfully',
        posts
    })
})

export const updatePost = asyncHandler(
    async(req, res) => {
        const postId = req.params.postId;
        const updateData = req.body;
        const postFounded = await Post.findById(postId);
        if(!postFounded){
            throw new Error("Post not found")
        }
        const postUpdated = await Post.findByIdAndUpdate(postId, updateData, {new: true});
        if(!postUpdated){
            throw new Error("Post cannot be updated.")
        }
        res.json({
            status:'success',
            message: 'Post updated successfully',
            postUpdated
        })
    }
)

export const getPost = asyncHandler(
    async(req, res) => {
        const postId = req.params.postId;
        const postFounded = await Post.findById(postId).populate('user', 'fullName');
        if(!postFounded){
            throw new Error("Post not found")
        }
        res.json({
            status:'success',
            message: 'Post fetched successfully',
            postFounded
        })
    }
)

export const deletePost = asyncHandler(
    async(req, res) => {
        const postId = req.params.postId;
        const userId = req.user._id;
        const user = await User.findOne(userId);
        if(!user){
            throw new Error("User not found")
        }
        const postDeleted = await Post.findByIdAndDelete(postId);
        if(!postDeleted){
            throw new Error("Post cannot be deleted.")
        }
        await PostComment.deleteMany({ post: postId });
        user.posts.pop(postDeleted?._id);
        const userUpdated = await user.save();
        if (!userUpdated) {
            throw new Error("User cannot be updated.");
        }
        res.json({
            status:'success',
            message: 'Post and related comments deleted successfully'
        })
    }
)

export const getUserPosts = asyncHandler(
    async(req, res) => {
        const {username} = req.params;
        const user = await User.findOne({username});
        if(!user){
            throw new Error("User not found")
        }
        const posts = await Post.find({user: user._id}).sort({ createdAt: -1 }).populate('user', 'fullName');
        if(!posts){
            throw new Error("Posts cannot be fetched.");
        }
        res.json({
            status:'success',
            message: 'Posts fetched successfully',
            posts
        })
    }
)

export const likeUnlikePost = asyncHandler(
    async(req, res) => {
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        if(!post){
            throw new Error("Post not found")
        }
        const user = await User.findById(req.user._id);
        if(!user){
            throw new Error("User not found")
        }
        if(post.likes.includes(user._id)){
            post.likes = post.likes.filter(id => id.toString()!== user._id.toString());
            user.likedPosts = user.likedPosts.filter(id => id.toString()!== postId.toString());
        }
        else{
            post.likes.push(user._id);
            user.likedPosts.push(postId);
        }
        const userUpdated = await User.findByIdAndUpdate(req.user._id, user, {new: true});
        if(!userUpdated){
            throw new Error("User cannot be updated.")
        }
        const postUpdated = await Post.findByIdAndUpdate(postId, post, {new: true});
        if(!postUpdated){
            throw new Error("Post cannot be updated.")
        }
        res.json({
            status:'success',
            message: 'Post updated successfully',
            postUpdated
        })
    }
)

export const getLikedPosts = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new Error("User not found");
    }

    const likedPosts = await Post.find({ _id: { $in: user.likedPosts } }).sort({ createdAt: -1 }).populate('user', 'fullName');

    res.json({
        status: 'success',
        message: 'Posts fetched successfully',
        likedPosts,
    });
});

export const commentOnPost = asyncHandler(
    async(req, res) => {
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        if(!post){
            throw new Error("Post not found")
        }
        const user = await User.findById(req.user._id);
        if(!user){
            throw new Error("User not found")
        }
        const newComment = await PostComment.create({
            content: req.body.content,
            commenter: user._id,
            post: postId
        });
        if(!newComment){
            throw new Error ("Comment cannot be created.");
        }
        post.comments.push(newComment?._id);
        const postUpdated = await post.save();
        if(!postUpdated){
            throw new Error("Post cannot be updated.")
        }
        res.json({
            status:'success',
            message: 'Comment created successfully',
            newComment
        })
    }
)

export const getPostComments = asyncHandler(
    async(req, res) => {
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        if(!post){
            throw new Error("Post not found")
        }
        const comments = await PostComment.find({post: postId}).populate('commenter', 'fullName');
        if(!comments){
            throw new Error("Comments cannot be fetched.")
        }
        res.json({
            status:'success',
            message: 'Comments fetched successfully',
            comments
        })
})
