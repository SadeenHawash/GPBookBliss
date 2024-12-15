import express from "express";
import { userLogin, userLogout, userSignUp, userVerify, verifiedPage, getMe, getUsers} from "../../controllers/authController.js";
import protectRoute from '../../middleware/protectRoute.js';

const router = express.Router();

router.get("/me", protectRoute, getMe);
router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.post("/logout", userLogout);
router.get("/verify/:userId/:uniqueString", userVerify);
//for the verified page
router.get("/verified", verifiedPage);
router.get("/", getUsers);

export default router;
