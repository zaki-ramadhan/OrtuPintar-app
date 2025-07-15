import express from "express";
import * as adminController from "../controllers/adminController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Middleware to verify admin role
const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin role required.",
    });
  }
  next();
};

// Apply authentication and admin verification to all routes
router.use(verifyToken);
router.use(verifyAdmin);

// User management routes
router.get("/users", adminController.getAllUsers);
router.post("/users", adminController.createUser);
router.put("/users/:id", adminController.updateUser);
router.delete("/users/:id", adminController.deleteUser);
router.get("/users/export", adminController.exportUsers);

// Activities management routes
router.get("/activities", adminController.getAllActivitiesAdmin);
router.post("/activities", adminController.createActivity);
router.put("/activities/:id", adminController.updateActivity);
router.delete("/activities/:id", adminController.deleteActivity);
router.get("/activities/stats", adminController.getActivityStats);

export default router;
