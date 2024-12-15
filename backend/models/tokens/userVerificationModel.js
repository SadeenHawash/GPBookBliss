import mongoose from "mongoose";

const verificationTokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    uniqueString: String,
    createdeAt: Date,
    expiresAt: Date,
});

const verificationToken = mongoose.model("verificationToken", verificationTokenSchema);

export default verificationToken;