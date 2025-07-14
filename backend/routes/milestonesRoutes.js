import express from "express";
import {
  getChildMilestones,
  getAllMilestones,
} from "../controllers/milestonesController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Get milestones for a specific child
router.get("/child/:childId", verifyToken, getChildMilestones);

// Get all milestones
router.get("/", verifyToken, getAllMilestones);

export default router;
