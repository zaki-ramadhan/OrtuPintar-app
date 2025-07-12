// routes/recommendActivitiesRoutes.js
import express from "express";
import {
  getAllActivities,
  startActivity,
  completeActivity,
  cancelActivity,
  getUpcomingReminders,
  getChildProgress,
  getRecentActivities,
  getWeeklySummary,
} from "../controllers/recommendActivitiesController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// GET: Semua activities
router.get("/", verifyToken, getAllActivities);

// POST: Start activity (pindah ke upcoming reminders)
router.post("/start", verifyToken, startActivity);

// PUT: Complete activity
router.put("/complete", verifyToken, completeActivity);

// PUT: Cancel activity
router.put("/cancel", verifyToken, cancelActivity);

// GET: Upcoming reminders untuk child tertentu
router.get("/reminders/:childId", verifyToken, getUpcomingReminders);

// GET: Child progress
router.get("/progress/:childId", verifyToken, getChildProgress);

// GET: Recent completed activities untuk semua anak user
router.get("/recent", verifyToken, getRecentActivities);

// GET: Weekly summary untuk semua anak user
router.get("/weekly-summary", verifyToken, getWeeklySummary);

export default router;
