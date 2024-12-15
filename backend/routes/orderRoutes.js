import express from "express";
import {
    cancelOrder,
    confirmedOrder,
    createOrder,
    deleteOrder,
    deliverOrder,
    getOrder,
    getOrderHistory,
    getOrderItems,
    getOrders,
    getOrdersByStatus,
    getOrdersByUserId,
    getUserShippingAddresses,
    placeOrder,
    shipOrder,
    //updateOrder,
} from "../controllers/orderController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/history", protectRoute, getOrderHistory);
router.post("/", protectRoute, createOrder);
router.get("/shippingAddresses", protectRoute, getUserShippingAddresses);
router.get("/my-orders", protectRoute, getOrdersByUserId);
router.get("/items/:orderId", protectRoute, getOrderItems)
//admin
router.put("/:orderId/place", protectRoute, placeOrder);
router.put("/:orderId/confirm", protectRoute, confirmedOrder);
router.put("/:orderId/ship", protectRoute, shipOrder);
router.put("/:orderId/deliver", protectRoute, deliverOrder);
router.put("/:orderId/cancel", protectRoute, cancelOrder);
//
router.get("/:orderId", protectRoute, getOrder);
router.get("/", protectRoute, getOrders);
router.delete("/:orderId", protectRoute, deleteOrder);
router.get("/status/:status", protectRoute, getOrdersByStatus);

//router.put("/:orderId", protectRoute, updateOrder);

export default router;
