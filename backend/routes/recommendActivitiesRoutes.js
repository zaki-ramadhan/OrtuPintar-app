// routes/recommendActivitiesRoutes.js
import express from "express";
import {
  getAllActivities,
  markActivityDone,
  getRecentActivities,
} from "../controllers/recommendActivitiesController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Semua routes aman pakai verifyToken
router.get("/", verifyToken, getAllActivities);
router.post("/done", verifyToken, markActivityDone);
router.get("/recent/:childId", verifyToken, getRecentActivities);

export default router;
