import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength:6
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profilePic:{
        type: String,
        default: ""
    },
    role: {
        type: String,
        enum: ['user', 'admin'], 
        default: 'user'
    },
    verified: {
        type: Boolean,
        default: false
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    stories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Story'
        }
    ],
    totalEarnings: {
        type: Number,
        default: 0
    },
    // nextEarningDate: {
    //     type: Date,
    //     default: () => new Date(new Date().getFullYear(), new Date().getMonth+1, 1)
    // },
    subscritionPlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubscritionPlan'
    },
    hasSelectedPlan: {
        type: Boolean,
        default: false
    },
    paymentInformation: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Payment'
        }
    ],
    addresses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
            default: [],
        }
    ],
    lastLogin: {
        type: Date,
        default: Date.now()
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: [],
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: [],
        }
    ],
    likedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            default: [],
        },
    ],
    // passwordResetToken: {
    //     type: String,
    //     default: null
    // },
    // passwordResetExpires: {
    //     type: Date,
    //     default: null
    // },
    // accountVerificationToken:{
    //     type: String,
    //     default: null
    // },
    // accountVerificationExpires: {
    //     type: Date,
    //     default: null
    // },
    // isEmailVerified: {
    //     type: Boolean,
    //     default: false
    // }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;