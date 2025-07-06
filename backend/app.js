import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
import path from "path";

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes (placeholder)
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
