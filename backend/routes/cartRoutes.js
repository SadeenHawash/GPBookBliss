import express from "express";
import {
    addToCart,
    decrementItem,
    emptyCart,
    getCart,
    incrementItem,
    removeFromCart,
    updateCartItem,
} from "../controllers/cartController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/:bookId", protectRoute, addToCart);
router.delete("/:itemId", protectRoute, removeFromCart);
router.delete("/", protectRoute, emptyCart);

router.get("/", protectRoute, getCart);
router.put("/:bookId", protectRoute, updateCartItem);
router.put("/:itemId/increment", protectRoute, incrementItem);
router.put("/:itemId/decrement", protectRoute, decrementItem);


export default router;