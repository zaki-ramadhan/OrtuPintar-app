// Test controller untuk debugging
import { db } from "../config/db.js";

export const debugChildActivities = async (req, res) => {
  const { childId } = req.params;

  try {
    console.log(`🔍 Debug child activities for childId: ${childId}`);

    // Get all child_activities for this child
    const [allActivities] = await db.query(
      `SELECT 
         ca.*,
         a.title,
         DATE(ca.created_at) as created_date,
         TIME(ca.created_at) as created_time
       FROM child_activities ca
       LEFT JOIN activities a ON ca.activity_id = a.id
       WHERE ca.child_id = ?
       ORDER BY ca.created_at DESC`,
      [childId]
    );

    const today = new Date().toISOString().split("T")[0];
    console.log(`Today is: ${today}`);
    console.log(`Found ${allActivities.length} activities:`, allActivities);

    return res.json({
      message: "Debug data retrieved",
      childId: parseInt(childId),
      today,
      totalActivities: allActivities.length,
      activities: allActivities,
    });
  } catch (err) {
    console.error("Debug error:", err);
    return res.status(500).json({ message: "Debug failed" });
  }
};

export const debugNotifications = async (req, res) => {
  const { userId } = req.params;

  try {
    console.log(`🔍 Debug notifications for userId: ${userId}`);

    // Get all notifications for this user
    const [allNotifications] = await db.query(
      `SELECT 
         n.*,
         c.name as child_name
       FROM notifications n
       LEFT JOIN children c ON n.child_id = c.id
       WHERE n.user_id = ?
       ORDER BY n.created_at DESC`,
      [userId]
    );

    console.log(
      `Found ${allNotifications.length} notifications:`,
      allNotifications
    );

    return res.json({
      message: "Debug notifications retrieved",
      userId: parseInt(userId),
      totalNotifications: allNotifications.length,
      notifications: allNotifications,
    });
  } catch (err) {
    console.error("Debug notifications error:", err);
    return res.status(500).json({ message: "Debug notifications failed" });
  }
};
