import mongoose from "mongoose";

const subscriptionPlanSchema = mongoose.Schema({
    planName: {
        type: String,
        required: true
    },
    features: [
        {
            type: String
        }
    ],
    limitations: [
        {
            type: String
        }
    ],
    price: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const SubscriptionPlan = mongoose.model("SubscriptionPlan", subscriptionPlanSchema);

export default SubscriptionPlan;