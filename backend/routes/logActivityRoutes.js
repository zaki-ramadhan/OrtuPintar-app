import express from "express";
import {
  getAllLogActivities,
  getChildLogActivities,
  getChildLogStats,
  updateActivityNotes,
} from "../controllers/logActivityController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// GET: All log activities for all children of user
router.get("/", verifyToken, getAllLogActivities);

// GET: Log activities for specific child
router.get("/child/:childId", verifyToken, getChildLogActivities);

// GET: Log activity statistics for specific child
router.get("/stats/:childId", verifyToken, getChildLogStats);

// PUT: Update activity progress notes
router.put("/:activityId/notes", verifyToken, updateActivityNotes);

export default router;
