import express from "express";
import { debugChildActivities } from "../controllers/debugController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Debug endpoint (without auth for testing)
router.get("/child-activities/:childId", debugChildActivities);

// Debug endpoint (with auth)
router.get(
  "/auth/child-activities/:childId",
  verifyToken,
  debugChildActivities
);

export default router;
