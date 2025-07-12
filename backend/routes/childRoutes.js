import express from "express";
import {
  addChild,
  getChildren,
  deleteChild,
  updateChild,
} from "../controllers/childController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// GET all children for current user
router.get("/", verifyToken, getChildren);

// POST add new child
router.post("/", verifyToken, addChild);

// PUT update child by ID
router.put("/:id", verifyToken, updateChild);

// DELETE child by ID
router.delete("/:id", verifyToken, deleteChild);

export default router;
