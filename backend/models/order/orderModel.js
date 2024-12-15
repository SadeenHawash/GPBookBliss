import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    book: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Book', 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true, 
        min: 1 
    },
    // price: { 
    //     type: Number, 
    //     required: true 
    // },
});

const orderSchema = mongoose.Schema({
    orderUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderItems:[orderItemSchema],
    orderTotal: {
        type: Number,
        required: true
    },
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },
    paymentDetails:{
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "PaymentDetails",
        // required: true
        paymentMethod: {
            type: String,
        },
        paymentId: {
            type: String,
        },
        transactionId: {
            type: String,
        },
        paymentStatus: {
            type: String,
            default: "PENDING"
        }
    },
    orderDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    deliveryDate: {
        type: Date,
        //required: true
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    totalDiscountPrice: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
        default: 0,
    },
    totalItem: {
        type: Number,
        required: true,
        default: 0,
    },
    orderStatus: {
        type: String,
        required: true,
        //enum: ['pending', 'completed', 'Shipped', 'deliverd', 'cancelled'], 
        default: 'PENDING',
    }

}, {timestamps: true});

const Order = mongoose.model("Order", orderSchema);

export default Order;




