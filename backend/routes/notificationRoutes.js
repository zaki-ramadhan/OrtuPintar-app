// routes/notificationRoutes.js
import express from "express";
import {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  clearAllNotifications,
} from "../controllers/notificationController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// GET: All notifications for user
router.get("/", verifyToken, getUserNotifications);

// PUT: Mark notification as read
router.put("/:notificationId/read", verifyToken, markAsRead);

// PUT: Mark all notifications as read
router.put("/read-all", verifyToken, markAllAsRead);

// DELETE: Clear all notifications
router.delete("/clear-all", verifyToken, clearAllNotifications);

export default router;
