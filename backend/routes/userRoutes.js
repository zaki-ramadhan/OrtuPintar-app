// routes/userRoutes.js
import express from "express";
import {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/profile", verifyToken, getUserProfile);
router.put("/profile", verifyToken, updateUserProfile);

export default router;
