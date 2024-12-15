import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import User from "../models/user/userModel.js";

const router = express.Router();

router.get("/profile", protectRoute ,async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error in profile Route"});
    }
});
export default router;