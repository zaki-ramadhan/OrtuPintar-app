import express from "express";
import { addChild, getChildren } from "../controllers/childController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// GET all children for current user
router.get("/", verifyToken, getChildren);

// POST add new child
router.post("/", verifyToken, addChild);

export default router;
