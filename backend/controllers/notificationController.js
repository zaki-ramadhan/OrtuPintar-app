// controllers/notificationController.js
import { db } from "../config/db.js";

// ✅ GET: Semua notifications untuk user
export const getUserNotifications = async (req, res) => {
  const userId = req.user.id; // dari middleware auth

  try {
    const [rows] = await db.query(
      `SELECT 
        n.id,
        n.type,
        n.title,
        n.message,
        n.action_url,
        n.is_read as read,
        n.created_at,
        c.name as child_name
       FROM notifications n
       LEFT JOIN children c ON n.child_id = c.id
       WHERE n.user_id = ?
       ORDER BY n.created_at DESC
       LIMIT 50`,
      [userId]
    );

    const notifications = rows.map((row) => ({
      id: row.id,
      type: row.type,
      title: row.title,
      message: row.message,
      actionUrl: row.action_url,
      read: Boolean(row.read),
      time: new Date(row.created_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      childName: row.child_name,
    }));

    return res.status(200).json({
      message: "Notifications fetched successfully",
      notifications: notifications,
    });
  } catch (err) {
    console.error("Get notifications error:", err);
    return res.status(500).json({ message: "Terjadi kesalahan sistem." });
  }
};

// ✅ PUT: Mark notification as read
export const markAsRead = async (req, res) => {
  const { notificationId } = req.params;
  const userId = req.user.id;

  try {
    const [result] = await db.query(
      `UPDATE notifications 
       SET is_read = 1
       WHERE id = ? AND user_id = ?`,
      [notificationId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Notification tidak ditemukan.",
      });
    }

    return res.status(200).json({
      message: "Notification marked as read.",
    });
  } catch (err) {
    console.error("Mark notification as read error:", err);
    return res.status(500).json({ message: "Terjadi kesalahan sistem." });
  }
};

// ✅ PUT: Mark all notifications as read
export const markAllAsRead = async (req, res) => {
  const userId = req.user.id;

  try {
    await db.query(
      `UPDATE notifications 
       SET is_read = 1
       WHERE user_id = ? AND is_read = 0`,
      [userId]
    );

    return res.status(200).json({
      message: "All notifications marked as read.",
    });
  } catch (err) {
    console.error("Mark all notifications as read error:", err);
    return res.status(500).json({ message: "Terjadi kesalahan sistem." });
  }
};

// ✅ DELETE: Clear all notifications
export const clearAllNotifications = async (req, res) => {
  const userId = req.user.id;

  try {
    await db.query(`DELETE FROM notifications WHERE user_id = ?`, [userId]);

    return res.status(200).json({
      message: "All notifications cleared.",
    });
  } catch (err) {
    console.error("Clear notifications error:", err);
    return res.status(500).json({ message: "Terjadi kesalahan sistem." });
  }
};
