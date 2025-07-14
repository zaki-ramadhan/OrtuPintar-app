// controllers/milestoneController.js
import { db } from "../config/db.js";

// ✅ GET: Get completed milestones for a specific child with detailed stats
export const getChildMilestones = async (req, res) => {
  const { childId } = req.params;
  const userId = req.user.id;

  if (!childId) {
    return res.status(400).json({ message: "childId is required" });
  }

  try {
    console.log(`🏆 Getting detailed milestones for child ID: ${childId}`);

    // Verify that the child belongs to the authenticated user
    const [childCheck] = await db.query(
      `SELECT id FROM children WHERE id = ? AND user_id = ?`,
      [childId, userId]
    );

    if (childCheck.length === 0) {
      return res.status(404).json({ message: "Child not found" });
    }

    // Get completed milestones with activity details
    const [completedMilestones] = await db.query(
      `SELECT 
                cm.id,
                cm.child_id,
                cm.activity_id,
                cm.achieved_at,
                cm.notes,
                a.title as activity_title,
                a.category,
                a.description,
                a.difficulty,
                a.age_group,
                a.duration,
                a.icon
            FROM child_milestones cm
            JOIN activities a ON cm.activity_id = a.id
            WHERE cm.child_id = ?
            ORDER BY cm.achieved_at DESC`,
      [childId]
    );

    // Get child's activities that could be milestones (marked with isMilestone = 1)
    const [potentialMilestones] = await db.query(
      `SELECT 
                a.id,
                a.title,
                a.category,
                a.description,
                a.difficulty,
                a.age_group,
                a.duration,
                a.icon,
                ca.status,
                ca.started_at,
                ca.completed_at
            FROM activities a
            LEFT JOIN child_activities ca ON a.id = ca.activity_id AND ca.child_id = ?
            WHERE a.isMilestone = 1
            ORDER BY a.category, a.title`,
      [childId]
    );

    // Categorize activities
    const completed = completedMilestones.map((milestone) => ({
      id: milestone.id,
      activity_title: milestone.activity_title,
      category: milestone.category,
      achieved_at: milestone.achieved_at,
      icon: milestone.icon,
      difficulty: milestone.difficulty,
      notes: milestone.notes,
    }));

    const inProgress = [];
    const potential = [];

    potentialMilestones.forEach((activity) => {
      // Skip if already completed as milestone
      const isCompleted = completedMilestones.some(
        (cm) => cm.activity_id === activity.id
      );
      if (isCompleted) return;

      if (activity.status === "pending" || activity.status === "started") {
        inProgress.push({
          id: activity.id,
          title: activity.title,
          category: activity.category,
          icon: activity.icon,
          difficulty: activity.difficulty,
          status: activity.status,
          description: activity.description,
        });
      } else if (!activity.status) {
        potential.push({
          id: activity.id,
          title: activity.title,
          category: activity.category,
          icon: activity.icon,
          difficulty: activity.difficulty,
          description: activity.description,
        });
      }
    });

    // Calculate statistics
    const stats = {
      completed: completed.length,
      inProgress: inProgress.length,
      upcoming: potential.length,
      completionRate:
        potentialMilestones.length > 0
          ? Math.round((completed.length / potentialMilestones.length) * 100)
          : 0,
    };

    console.log(`✅ Milestones stats:`, stats);
    console.log(`📊 Completed milestones:`, completed.length);
    console.log(`⏳ In progress milestones:`, inProgress.length);
    console.log(`📋 Potential milestones:`, potential.length);

    res.status(200).json({
      message: "Milestones retrieved successfully",
      milestones: {
        completed,
        inProgress,
        potential,
        statistics: stats,
      },
    });
  } catch (error) {
    console.error("Get child milestones error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ GET: Get all milestone activities (activities marked as milestones)
export const getAllMilestoneActivities = async (req, res) => {
  try {
    console.log(`🏆 Getting all milestone activities`);

    const [milestoneActivities] = await db.query(
      `SELECT 
                id,
                title,
                description,
                category,
                difficulty,
                age_group,
                duration,
                icon
            FROM activities 
            WHERE isMilestone = 1 
            ORDER BY category, title`
    );

    console.log(`✅ Found ${milestoneActivities.length} milestone activities`);

    res.status(200).json({
      message: "Milestone activities retrieved successfully",
      activities: milestoneActivities,
    });
  } catch (error) {
    console.error("Get milestone activities error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ POST: Mark an activity completion as a milestone
export const createMilestone = async (req, res) => {
  const { childId, activityId, notes } = req.body;
  const userId = req.user.id;

  if (!childId || !activityId) {
    return res.status(400).json({
      message: "childId and activityId are required",
    });
  }

  try {
    console.log(
      `🏆 Creating milestone for child ${childId}, activity ${activityId}`
    );

    // Verify child belongs to user
    const [childCheck] = await db.query(
      `SELECT id FROM children WHERE id = ? AND user_id = ?`,
      [childId, userId]
    );

    if (childCheck.length === 0) {
      return res.status(404).json({ message: "Child not found" });
    }

    // Verify activity exists and is marked as milestone
    const [activityCheck] = await db.query(
      `SELECT id, title FROM activities WHERE id = ? AND isMilestone = 1`,
      [activityId]
    );

    if (activityCheck.length === 0) {
      return res.status(404).json({
        message: "Activity not found or not marked as milestone",
      });
    }

    // Check if milestone already exists
    const [existingMilestone] = await db.query(
      `SELECT id FROM child_milestones 
       WHERE child_id = ? AND activity_id = ?`,
      [childId, activityId]
    );

    if (existingMilestone.length > 0) {
      return res.status(400).json({
        message: "Milestone already exists for this activity",
      });
    }

    // Create milestone
    const [result] = await db.query(
      `INSERT INTO child_milestones (child_id, activity_id, achieved_at, notes)
       VALUES (?, ?, NOW(), ?)`,
      [childId, activityId, notes || null]
    );

    console.log(`✅ Milestone created with ID: ${result.insertId}`);

    res.status(201).json({
      message: "Milestone created successfully",
      milestoneId: result.insertId,
    });
  } catch (error) {
    console.error("Create milestone error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ PUT: Update milestone notes
export const updateMilestone = async (req, res) => {
  const { milestoneId } = req.params;
  const { notes } = req.body;
  const userId = req.user.id;

  if (!milestoneId) {
    return res.status(400).json({ message: "milestoneId is required" });
  }

  try {
    console.log(`🏆 Updating milestone ${milestoneId}`);

    // Verify milestone belongs to user's child
    const [milestoneCheck] = await db.query(
      `SELECT cm.id 
       FROM child_milestones cm
       JOIN children c ON cm.child_id = c.id
       WHERE cm.id = ? AND c.user_id = ?`,
      [milestoneId, userId]
    );

    if (milestoneCheck.length === 0) {
      return res.status(404).json({ message: "Milestone not found" });
    }

    // Update milestone
    await db.query(`UPDATE child_milestones SET notes = ? WHERE id = ?`, [
      notes || null,
      milestoneId,
    ]);

    console.log(`✅ Milestone ${milestoneId} updated`);

    res.status(200).json({
      message: "Milestone updated successfully",
    });
  } catch (error) {
    console.error("Update milestone error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ DELETE: Remove a milestone
export const deleteMilestone = async (req, res) => {
  const { milestoneId } = req.params;
  const userId = req.user.id;

  if (!milestoneId) {
    return res.status(400).json({ message: "milestoneId is required" });
  }

  try {
    console.log(`🏆 Deleting milestone ${milestoneId}`);

    // Verify milestone belongs to user's child
    const [milestoneCheck] = await db.query(
      `SELECT cm.id 
       FROM child_milestones cm
       JOIN children c ON cm.child_id = c.id
       WHERE cm.id = ? AND c.user_id = ?`,
      [milestoneId, userId]
    );

    if (milestoneCheck.length === 0) {
      return res.status(404).json({ message: "Milestone not found" });
    }

    // Delete milestone
    await db.query(`DELETE FROM child_milestones WHERE id = ?`, [milestoneId]);

    console.log(`✅ Milestone ${milestoneId} deleted`);

    res.status(200).json({
      message: "Milestone deleted successfully",
    });
  } catch (error) {
    console.error("Delete milestone error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
