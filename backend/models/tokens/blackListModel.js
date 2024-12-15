import mongoose from "mongoose";

const blackListTokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    }
});

const BlackListToken = mongoose.model("BlackListToken", blackListTokenSchema);

export default BlackListToken;