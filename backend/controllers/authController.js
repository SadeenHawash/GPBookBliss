import bycryptjs from 'bcryptjs';

import generateTokenAndSetCookie from '../utils/generateToken.js';
import {sendVerificationEmail} from '../utils/sendEmail.js'; 
import User from "../models/user/userModel.js";
import BlackListToken from '../models/tokens/blackListModel.js';
import verificationToken from '../models/tokens/userVerificationModel.js';


//sign up
export const userSignUp = async(req, res) => {
    try {
        const {fullName, username,email, password, confirmPassword} = req.body;
        if (!fullName ||!username ||!email ||!password ||!confirmPassword) {
            return res.status(400).json({error: "All fields are required."});
        }
        if (password.length < 6) {
            return res.status(400).json({error: "Password must be at least 6 characters long."});
        }
        if (password!== confirmPassword) {
            return res.status(400).json({error: "Passwords do not match."});
        }
        const exsistingUser = await User.findOne({$or: [{username},{email}]});
        if(exsistingUser){
            return res.status(400).json({error: "Username or email already exists."});
        }

        const salt = await bycryptjs.genSalt(10);
        const hashedPassword = await bycryptjs.hash(password, salt);

        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
            verified: false
        });

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            sendVerificationEmail(newUser._id, newUser.email, res);

            res.status(201).json({
                message: "User created successfully. Please check your email for verification.\n\n" ,
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.userName,
                email: newUser.email,
            });
            
        }else{
            res.status(400).json({error: "Invalid User Data"});
        }
        
    } catch (error) {
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(({ message }) => message);
            return res.status(400).json({ error: validationErrors });
        }
        console.log("Error in userSignUp Controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

//login
export const userLogin = async(req, res) => {
    try {
        const{email, password}  = req.body;
        
        const user = await User.findOne({email});
        const isPasswordCorrect = await bycryptjs.compare(password, user?.password || "");

        if(!user.verified){
            return res.status(400).json({error: "Email hasn't been verified yet. Check your inbox."});
        }

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid email or password"});
        }

        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.userName,
            email: user.email
        });
    } catch (error) {
        console.log("Error in userLogIn Controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}
//logout
export const userLogout = async(req, res) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(400).json({ error: 'No token provided' });
        }
        await BlackListToken.create({token});
        res.clearCookie('jwt');
        res.status(200).json({message: "Successfully Logged Out"});
    } catch (error) {
        console.log("Error in userLogout Controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

//verify email
export const userVerify = async(req, res) => {
    try {
        const {userId, uniqueString} = req.params;
        const isVerified = await verificationToken.findOne({userId});

        if (!isVerified) {
            let message = "Account record does not exist or has has been verified already. Please signup or login.";
            return res.redirect(`http://localhost:3000/verified?error=true&message=${encodeURIComponent(message)}`);
        }
        if(isVerified.expiresAt < Date.now()) {
            const deleteExpireToken = await verificationToken.findByIdAndDelete({ userId });
            if(!deleteExpireToken){
                let message = "An error occured while clearing expired user verification token.";
                return res.redirect(`http://localhost:3000/verified?error=true&message=${encodeURIComponent(message)}`);
            }
            const deleteUser = await User.findByIdAndDelete({ userId});
            if(!deleteUser){
                let message = "An error occured while deleting user record.";
                return res.redirect(`http://localhost:3000/verified?error=true&message=${encodeURIComponent(message)}`);
            }
            let message = "Link has expired. Please signup again.";
            return res.redirect(`http://localhost:3000/verified?error=true&message=${encodeURIComponent(message)}`);
            //return res.status(400).json({error: "Delete expired user verification token record."});
        }
        const isUniqueStringCorrect = await bycryptjs.compare(uniqueString, isVerified.uniqueString);
        if(!isUniqueStringCorrect){
            let message = "Invalid verification details passed.";
            return res.redirect(`http://localhost:3000/verified?error=true&message=${encodeURIComponent(message)}`);
        }
        const updateVerified = await User.findByIdAndUpdate(userId, { verified: true });
        if(!updateVerified){
            let message = "An error occured while updating user record.";
            return res.redirect(`/api/auth/verified?error=true&message=${encodeURIComponent(message)}`);
        }
        const deleteExpireToken = await verificationToken.deleteOne({ userId });
        if(!deleteExpireToken){
            let message = "An error occured while clearing expired user verification token.";
            return res.redirect(`http://localhost:3000/verified?error=true&message=${encodeURIComponent(message)}`);
        }
        //should redirect to veried page
        let message = "Email verified successfully";
        return res.redirect(`http://localhost:3000/verified?error=false&message=${encodeURIComponent(message)}`);
    } catch (error) {
        console.log("Error in userVerify Controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const verifiedPage = async(req, res) => {
    try {
        const {error, message} = req.query;
        if(error){
            return res.status(400).json({error: message});
        }
        return res.status(200).json({message: message});
    } catch (error) {
        console.log("Error in verifiedPage Controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const getMe = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select("-password");
		res.status(200).json(user);
	} catch (error) {
		console.log("Error in getMe controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

