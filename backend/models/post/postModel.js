import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    // title: {
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    description: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    nextEarningDate: {
        type: Date,
        default: () => 
            new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
    },
    thisMonthEarnings: {
        type: Number,
        default: 0
    },
    totalEarnings: {
        type: Number,
        default: 0
    },
    image: {
        type: Object,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "PostComment",
        }
    ],
    viewers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    isBloked: {
        type: Boolean,
        default: false
    }

} , {timestamps: true});

const Post = mongoose.model("Post", postSchema);

export default Post;