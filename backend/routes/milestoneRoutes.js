// routes/milestoneRoutes.js
import express from "express";
import {
  getChildMilestones,
  getAllMilestoneActivities,
  // getMilestoneStats,
} from "../controllers/milestoneController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// GET: Get completed milestones for a specific child
router.get("/child/:childId", verifyToken, getChildMilestones);

// GET: Get all milestone activities (suggestions)
router.get("/activities", verifyToken, getAllMilestoneActivities);

// GET: Get milestone statistics for a child
// router.get("/stats/:childId", verifyToken, getMilestoneStats);

export default router;
