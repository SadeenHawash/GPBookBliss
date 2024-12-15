import bycryptjs from 'bcryptjs';
import resetToken from '../models/resetToken.js';
import User from "../models/user/userModel.js";

export const isResetTokenValid = async(req, res, next) => {
    try {
        const {userId, uniqueString} = req.params;
        console.log(userId);
        if (!userId || !uniqueString) {
            return res.status(403).json({ error: 'Invalid request' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({error: "User not found."});
        }
        const token = await resetToken.findOne({userId});
        if(!token) {
            return res.status(400).json({error: "Reset Token not found."});
        }
        const isUniqueStringCorrect = await bycryptjs.compare(uniqueString, resetToken.uniqueString);
        if(!isUniqueStringCorrect){
            return res.status(400).json({error: "Reset Token isn't valid."});
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in verify reset token middleware", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}