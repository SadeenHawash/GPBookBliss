import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    refrence: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending',
        required: true
    },
    amount: {
        type: Number,
        default: 0,
    }
    // subscriptionPlan: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'SubscriptionPlan',
    //     required: true
    // },

}, {timestamps: true});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;