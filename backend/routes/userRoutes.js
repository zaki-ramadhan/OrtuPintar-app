// routes/userRoutes.js
import express from "express";
import {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  changePassword,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/profile", verifyToken, getUserProfile);
router.put("/profile", verifyToken, updateUserProfile);
router.put("/change-password", verifyToken, changePassword);

export default router;
