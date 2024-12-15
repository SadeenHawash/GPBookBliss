import { isValidObjectId } from 'mongoose';
import bycryptjs from 'bcryptjs';

import resetToken from '../models/tokens/resetToken.js';
import User from "../models/user/userModel.js";
import {sendPasswordUpdatedSuccessfullyEmail, sendResetPasswordEmail} from '../utils/sendEmail.js';

export const forgotPassword = async(req, res) => {
    try {
        const {email} = req.body;
        if(!email) {
            return res.status(400).json({error: "Please provide a valid email."});
        }
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({error: "User not found, Invalid email."});
        }
        const token = await resetToken.findOne({userId : user._id});
        if(token){
            return res.status(400).json({error: "Only after one hour you can requset for reseting your password."});
        }
        sendResetPasswordEmail(user._id, email, res);
        
    } catch (error) {
        console.log("Error in forgotPassword Controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const verifyResetToken = async(req, res) => {
    try {
        const {userId, uniqueString} = req.params;
        const isVerified = await resetToken.findOne({userId});

        if (!isVerified) {
            let message = "Link Expired.";
            return res.redirect(`http://localhost:3000/verify-reset?error=true&message=${encodeURIComponent(message)}`);
        }
        if(isVerified.expiresAt < Date.now()) {
            await resetToken.findByIdAndDelete({ userId });
            let message = "Link Expired.";
            return res.redirect(`http://localhost:3000/verify-reset?error=true&message=${encodeURIComponent(message)}`);
            //return res.status(400).json({error: "Delete expired user verification token record."});
        }
        const isUniqueStringCorrect = await bycryptjs.compare(uniqueString, isVerified.uniqueString);
        if(!isUniqueStringCorrect){
            let message = "Invalid details passed.";
            return res.redirect(`http://localhost:3000/verify-reset?error=true&message=${encodeURIComponent(message)}`);
        }
        let uid = userId;
        return res.redirect(`http://localhost:3000/reset-password?uid=${uid}`);
    } catch (error) {
        console.log("Error in verify reset token Controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const resetPassword = async(req, res) => {
    try {
        const{ uid } = req.query;
        console.log("UID: "+uid);
        if (!isValidObjectId(uid)) {
            return res.status(400).json({ error: "Invalid user ID provided." });
        }
        const{ password, confirmPassword } = req.body;
        if (password.length < 6) {
            return res.status(400).json({error: "Password must be at least 6 characters long."});
        }
        if (password!== confirmPassword) {
            return res.status(400).json({error: "Passwords do not match."});
        }
        const user = await User.findOne({_id : uid});
        if (!user) {
            return res.status(400).json({error: "User not found."});
        }
        const salt = await bycryptjs.genSalt(10);
        const hashedPassword = await bycryptjs.hash(password, salt);
        user.password = hashedPassword;
        await user.save();
        const resetTokenId = await resetToken.findOne({ userId: uid });
        if(!resetTokenId) {
            return res.status(400).json({error: "Failed to find reset token."});
        }
        const deleteToken = await resetToken.findByIdAndDelete(resetTokenId);
        if(!deleteToken) {
            return res.status(400).json({error: "Failed to delete reset token."});
        }
        res.status(200).json({success: "password updated."});
        sendPasswordUpdatedSuccessfullyEmail(user.email);
    } catch (error) {
        console.log("Error in resetPassword Controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}