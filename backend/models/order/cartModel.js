import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
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
});

const cartSchema = mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    items: [cartItemSchema],
    totalPrice: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    totalDiscountPrice: {
        type: Number,
    },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;