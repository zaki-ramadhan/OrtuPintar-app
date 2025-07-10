// controllers/recommendActivitiesController.js
import { db } from "../config/db.js";

// ✅ GET: Semua activities rekomendasi
export const getAllActivities = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, title, description, category, difficulty, duration, age_group, icon FROM activities ORDER BY id DESC"
    );

    return res.status(200).json({
      message: "Activities fetched successfully",
      activities: rows,
    });
  } catch (err) {
    console.error("Get activities error:", err);
    return res.status(500).json({ message: "Terjadi kesalahan sistem." });
  }
};

// ✅ POST: Mark activity done
export const markActivityDone = async (req, res) => {
  const { childId, activityId } = req.body;

  if (!childId || !activityId) {
    return res
      .status(400)
      .json({ message: "childId dan activityId wajib diisi." });
  }

  try {
    await db.query(
      `INSERT INTO child_activities (child_id, activity_id, status, completed_at)
       VALUES (?, ?, 'done', NOW())`,
      [childId, activityId]
    );

    return res.status(201).json({ message: "Activity marked as done." });
  } catch (err) {
    console.error("Mark activity done error:", err);
    return res.status(500).json({ message: "Terjadi kesalahan sistem." });
  }
};

// ✅ GET: Recent activities untuk child tertentu
export const getRecentActivities = async (req, res) => {
  const { childId } = req.params;

  if (!childId) {
    return res.status(400).json({ message: "childId wajib diisi di params." });
  }

  try {
    const [rows] = await db.query(
      `SELECT 
         ca.id,
         ca.status,
         ca.completed_at,
         a.title,
         a.icon,
         a.category,
         a.duration
       FROM child_activities ca
       JOIN activities a ON ca.activity_id = a.id
       WHERE ca.child_id = ?
       ORDER BY ca.completed_at DESC
       LIMIT 10`,
      [childId]
    );

    return res.status(200).json({
      message: "Recent activities fetched successfully",
      recentActivities: rows,
    });
  } catch (err) {
    console.error("Get recent activities error:", err);
    return res.status(500).json({ message: "Terjadi kesalahan sistem." });
  }
};
