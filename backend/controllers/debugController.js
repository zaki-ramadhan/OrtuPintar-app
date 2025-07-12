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
