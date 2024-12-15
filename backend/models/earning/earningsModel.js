import mongoose from "mongoose";

const earningsSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chapter: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter',
        required: true
    },
    earnings: {
        type: Number,
        required: true
    },
    calculatedOn: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

const earnings = mongoose.model("earnings", earningsSchema);

export default earnings;