import mongoose from "mongoose";

const resetTokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    uniqueString: String,
    createdeAt: Date,
    expiresAt: Date,
});

const resetToken = mongoose.model("resetToken", resetTokenSchema);

export default resetToken;