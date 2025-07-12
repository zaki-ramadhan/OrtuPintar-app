import express from "express";
import {
  debugChildActivities,
  debugNotifications,
} from "../controllers/debugController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Debug endpoint (without auth for testing)
router.get("/child-activities/:childId", debugChildActivities);
router.get("/notifications/:userId", debugNotifications);

// Debug endpoint (with auth)
router.get(
  "/auth/child-activities/:childId",
  verifyToken,
  debugChildActivities
);
router.get("/auth/notifications/:userId", verifyToken, debugNotifications);

export default router;
