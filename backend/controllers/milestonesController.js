import { db } from "../config/db.js";

// Get milestones for a specific child
export const getChildMilestones = async (req, res) => {
  try {
    const { childId } = req.params;
    console.log(`🏆 Getting milestones for child ID: ${childId}`);

    // Get completed milestones with activity details
    const [completedMilestones] = await db.execute(
      `SELECT 
        cm.id,
        cm.child_id,
        cm.activity_id,
        cm.achieved_at,
        cm.notes,
        a.title as activity_title,
        a.category,
        a.description,
        a.difficulty_level
      FROM child_milestones cm
      JOIN activities a ON cm.activity_id = a.id
      WHERE cm.child_id = ?
      ORDER BY cm.achieved_at DESC`,
      [childId]
    );

    // Get child's activities that could be milestones (completed activities)
    const [childActivities] = await db.execute(
      `SELECT 
        ca.id,
        ca.child_id,
        ca.activity_id,
        ca.status,
        ca.completed_at,
        a.title as activity_title,
        a.category,
        a.description,
        a.difficulty_level
      FROM child_activities ca
      JOIN activities a ON ca.activity_id = a.id
      WHERE ca.child_id = ? AND ca.status = 'completed'
      ORDER BY ca.completed_at DESC`,
      [childId]
    );

    // Get all available activities for potential future milestones
    const [allActivities] = await db.execute(
      `SELECT 
        a.id,
        a.title,
        a.category,
        a.description,
        a.difficulty_level,
        CASE 
          WHEN cm.id IS NOT NULL THEN 'completed'
          WHEN ca.id IS NOT NULL AND ca.status = 'completed' THEN 'achieved'
          WHEN ca.id IS NOT NULL AND ca.status = 'in_progress' THEN 'in_progress'
          ELSE 'upcoming'
        END as milestone_status,
        cm.achieved_at,
        ca.completed_at
      FROM activities a
      LEFT JOIN child_milestones cm ON a.id = cm.activity_id AND cm.child_id = ?
      LEFT JOIN child_activities ca ON a.id = ca.activity_id AND ca.child_id = ?
      ORDER BY a.id`,
      [childId, childId]
    );

    // Calculate milestone statistics
    const totalMilestones = allActivities.length;
    const completedCount = completedMilestones.length;
    const inProgressCount = allActivities.filter(
      (a) => a.milestone_status === "in_progress"
    ).length;
    const upcomingCount = allActivities.filter(
      (a) => a.milestone_status === "upcoming"
    ).length;
    const completionRate =
      totalMilestones > 0
        ? Math.round((completedCount / totalMilestones) * 100)
        : 0;

    console.log(`📊 Milestone stats for child ${childId}:`, {
      total: totalMilestones,
      completed: completedCount,
      inProgress: inProgressCount,
      upcoming: upcomingCount,
      completionRate,
    });

    res.json({
      success: true,
      milestones: {
        completed: completedMilestones,
        inProgress: allActivities.filter(
          (a) => a.milestone_status === "in_progress"
        ),
        upcoming: allActivities.filter(
          (a) => a.milestone_status === "upcoming"
        ),
        statistics: {
          total: totalMilestones,
          completed: completedCount,
          inProgress: inProgressCount,
          upcoming: upcomingCount,
          completionRate,
        },
      },
    });
  } catch (error) {
    console.error("❌ Error fetching child milestones:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch milestones",
      error: error.message,
    });
  }
};

// Get all milestones (for admin or overview)
export const getAllMilestones = async (req, res) => {
  try {
    console.log("🏆 Getting all milestones");

    const [milestones] = await db.execute(
      `SELECT 
        cm.id,
        cm.child_id,
        cm.activity_id,
        cm.achieved_at,
        cm.notes,
        c.name as child_name,
        a.title as activity_title,
        a.category,
        a.description
      FROM child_milestones cm
      JOIN children c ON cm.child_id = c.id
      JOIN activities a ON cm.activity_id = a.id
      ORDER BY cm.achieved_at DESC`
    );

    res.json({
      success: true,
      milestones,
    });
  } catch (error) {
    console.error("❌ Error fetching all milestones:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch milestones",
      error: error.message,
    });
  }
};
