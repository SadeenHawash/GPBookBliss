import nodemailer from 'nodemailer';
import {v4 as uuidv4} from 'uuid';
import bycryptjs from 'bcryptjs';

import verificationToken from '../models/tokens/userVerificationModel.js';
import resetToken from '../models/tokens/resetToken.js';
import { generateEmailVerificationTemplete, generateResetPasswordEmailTemplete, generatePasswordResetSuccessfullyTemplate } from './mailTemplate.js';

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bookbliss24@gmail.com',
        pass: 'tulj uanb ztet jugi'
    }
});

export const sendVerificationEmail = async(_id, email, res) =>{

    console.log("Recipient's email:", email);

    if (!email) {
        return res.status(400).json({ message: "Recipient's email is missing or invalid" });
    }

    const currentURL = `http://localhost:5000/api/auth`;
    const uniqueString = uuidv4() + _id;
    const salt = await bycryptjs.genSalt(10);
    const hashedUniqueString = await bycryptjs.hash(uniqueString, salt);

    let mailOptions = {
        from: 'bookbliss24@gmail.com',
        to: email,
        subject: 'BookBliss Account Verification',
        html: generateEmailVerificationTemplete(currentURL + "/verify/" + _id + "/" + uniqueString)
    };

    const newVerificationToken = new verificationToken({
        userId: _id,
        uniqueString: hashedUniqueString,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 21600000),
    });
    if(newVerificationToken){
        await newVerificationToken.save();
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({message: "Verification Email Sent"});
            }
        });
    }else {
        console.log("Error saving verification token:", error);
        res.status(500).json({ error: "Failed to send verification email" });
    }
}

export const sendResetPasswordEmail = async (_id, email, res) => {

    console.log("Recipient's email:", email);
    
    const currentURL = `http://localhost:5000/api`;
    const uniqueString = uuidv4() + _id;
    const salt = await bycryptjs.genSalt(10);
    const hashedUniqueString = await bycryptjs.hash(uniqueString, salt);

    let mailOptions = {
        from: 'bookbliss24@gmail.com',
        to: email,
        subject: 'Password Reset',
        html: generateResetPasswordEmailTemplete(currentURL + "/verify-reset/" + _id + "/" + uniqueString)
    };
    
    const newresetToken = new resetToken({
        userId: _id,
        uniqueString: hashedUniqueString,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 3600000),
    });
    if(newresetToken){
        await newresetToken.save();
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({message: "Reset Password Email Sent"});
            }
        });
    }else {
        console.log("Error saving verification token:", error);
        res.status(500).json({ error: "Failed to send reset password email" });
    }
}

export const sendPasswordUpdatedSuccessfullyEmail = async(email) => {
    let mailOptions = {
        from: 'bookbliss24@gmail.com',
        to: email,
        subject: 'Password Reset',
        html: generatePasswordResetSuccessfullyTemplate("http://localhost:3000/login")
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({message: "Reset Password Email Sent"});
        }
    });
}

