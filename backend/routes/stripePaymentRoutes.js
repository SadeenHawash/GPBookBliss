import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { stripePayment, verifyPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post('/checkout', protectRoute, stripePayment);
router.get('/verify/:paymentId', verifyPayment);

export default router;