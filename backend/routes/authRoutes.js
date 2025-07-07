import express from "express";
import {
  loginAdmin,
  loginUser,
  registerUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);

// POST /api/auth/login
router.post("/login", loginUser);
// POST /api/auth/admin/login
router.post("/admin/login", loginAdmin);

export default router;
