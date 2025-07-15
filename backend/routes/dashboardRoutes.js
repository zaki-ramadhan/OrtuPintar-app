import express from "express";
import {
  getDashboardStats,
  getRecentUsers,
  getRecentActivities,
  getAllDashboardData,
  getSystemHealthDetails,
} from "../controllers/dashboardController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Get all dashboard data
router.get("/all", verifyToken, getAllDashboardData);

// Get system health details
router.get("/system-health", verifyToken, getSystemHealthDetails);

// Get basic stats
router.get("/stats", verifyToken, getDashboardStats);

// Get recent users
router.get("/recent-users", verifyToken, getRecentUsers);

// Get recent activities
router.get("/recent-activities", verifyToken, getRecentActivities);

export default router;
