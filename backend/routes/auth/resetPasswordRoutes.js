import express from 'express';
import {forgotPassword, resetPassword, verifyResetToken} from "../../controllers/resetPasswordController.js";

const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.get("/verify-reset/:userId/:uniqueString", verifyResetToken);
router.post("/reset-password", resetPassword);

export default router;


