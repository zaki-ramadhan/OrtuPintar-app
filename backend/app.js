import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import childRoutes from "./routes/childRoutes.js";
import recommendActivitiesRoutes from "./routes/recommendActivitiesRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import debugRoutes from "./routes/debugRoutes.js";
import milestoneRoutes from "./routes/milestoneRoutes.js";
import logActivityRoutes from "./routes/logActivityRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes (placeholder)
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/children", childRoutes);
app.use("/api/activities", recommendActivitiesRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/debug", debugRoutes);
app.use("/api/milestones", milestoneRoutes);
app.use("/api/log-activities", logActivityRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);

export default app;
