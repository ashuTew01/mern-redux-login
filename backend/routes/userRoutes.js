import express from "express";
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile } from "../controllers/userController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
//                       PTBN ABOVE^ If you want a route to be accessible by a particular user, do this.
export default router;