// controllers/milestoneController.js
import { db } from "../config/db.js";

// ✅ GET: Get completed milestones for a specific child with detailed stats
export const getChildMilestones = async (req, res) => {
  const { childId } = req.params;
  const userId = req.user.id;

  console.log(`🏆 Getting milestones for child ID: ${childId}`);

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

    // Get child's age for filtering age-appropriate milestones
    const [childInfo] = await db.query(
      `SELECT name, birth_date, TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) AS age_years 
       FROM children WHERE id = ?`,
      [childId]
    );

    const childAge = childInfo.length > 0 ? childInfo[0].age_years : 3; // Default to 3 if age not found
    console.log(`👶 Child is ${childAge} years old`);

    // Get child's activities that could be milestones (marked with isMilestone = 1)
    // Filter by age group to show only relevant milestones
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

    // Filter potential milestones by age appropriateness
    const ageAppropriateActivities = potentialMilestones.filter((activity) => {
      const ageGroup = activity.age_group || "";

      // Extract age ranges from age_group string (e.g., "2-3 years", "3-5 years")
      const ageMatch = ageGroup.match(/(\d+)-(\d+)/);
      if (ageMatch) {
        const minAge = parseInt(ageMatch[1]);
        const maxAge = parseInt(ageMatch[2]);

        // Include if child's age is within range or close to it (±1 year flexibility)
        return childAge >= minAge - 1 && childAge <= maxAge + 1;
      }

      // If no age range found, include it
      return true;
    });

    console.log(
      `🎯 Filtered ${ageAppropriateActivities.length} age-appropriate activities from ${potentialMilestones.length} total milestone activities`
    );

    // Categorize activities
    const completed = [];

    for (let i = 0; i < completedMilestones.length; i++) {
      const milestone = completedMilestones[i];

      // Extract age range from age_group string (e.g., "2-3 years", "3-5 years")
      const ageGroup = milestone.age_group || "";
      const ageMatch = ageGroup.match(/(\d+)-(\d+)/);
      let ageGroupMin = null;
      let ageGroupMax = null;

      if (ageMatch) {
        ageGroupMin = parseInt(ageMatch[1]);
        ageGroupMax = parseInt(ageMatch[2]);
      }

      const mappedMilestone = {
        id: milestone.id,
        // Ensure both field versions exist
        activityTitle: milestone.activity_title || "Unknown Activity",
        activity_title: milestone.activity_title || "Unknown Activity",
        title: milestone.activity_title || "Unknown Activity",
        category: milestone.category || "general",
        // Ensure both date versions exist
        achieved_at: milestone.achieved_at,
        achievedAt: milestone.achieved_at,
        // Other fields
        icon: milestone.icon || "🎯",
        difficulty: milestone.difficulty || "medium",
        notes: milestone.notes || "",
        duration: milestone.duration || 0,
        // Age range fields
        age_group: ageGroup,
        age_group_min: ageGroupMin,
        age_group_max: ageGroupMax,
      };

      completed.push(mappedMilestone);
    }

    // Debug processed completed milestones
    if (completed.length > 0) {
      console.log("🔍 First processed completed milestone:", completed[0]);
      console.log("🔍 Mapped activityTitle:", completed[0].activityTitle);
      console.log("🔍 Mapped achievedAt:", completed[0].achievedAt);
      console.log("🔍 Keys in processed milestone:", Object.keys(completed[0]));
    }

    const inProgress = [];
    const potential = [];

    ageAppropriateActivities.forEach((activity) => {
      // Skip if already completed as milestone
      const isCompleted = completedMilestones.some(
        (cm) => cm.activity_id === activity.id
      );
      if (isCompleted) return;

      // Extract age range from age_group string for potential milestones too
      const ageGroup = activity.age_group || "";
      const ageMatch = ageGroup.match(/(\d+)-(\d+)/);
      let ageGroupMin = null;
      let ageGroupMax = null;

      if (ageMatch) {
        ageGroupMin = parseInt(ageMatch[1]);
        ageGroupMax = parseInt(ageMatch[2]);
      }

      if (activity.status === "pending" || activity.status === "started") {
        inProgress.push({
          id: activity.id,
          title: activity.title,
          activityTitle: activity.title, // Use consistent field name
          category: activity.category,
          icon: activity.icon,
          difficulty: activity.difficulty,
          status: activity.status,
          description: activity.description,
          age_group: ageGroup,
          age_group_min: ageGroupMin,
          age_group_max: ageGroupMax,
        });
      } else if (!activity.status) {
        potential.push({
          id: activity.id,
          title: activity.title,
          activityTitle: activity.title, // Use consistent field name
          category: activity.category,
          icon: activity.icon,
          difficulty: activity.difficulty,
          description: activity.description,
          age_group: ageGroup,
          age_group_min: ageGroupMin,
          age_group_max: ageGroupMax,
        });
      }
    });

    // Calculate statistics
    const stats = {
      completed: completed.length,
      inProgress: inProgress.length,
      upcoming: potential.length,
      completionRate:
        ageAppropriateActivities.length > 0
          ? Math.round(
              (completed.length / ageAppropriateActivities.length) * 100
            )
          : 0,
    };

    console.log(`✅ Milestones stats:`, stats);
    console.log(
      `📊 Completed milestones: ${completed.length}, In progress: ${inProgress.length}, Potential: ${potential.length}`
    );

    const responseData = {
      message: "Milestones retrieved successfully",
      milestones: {
        completed,
        inProgress,
        potential,
        statistics: stats,
      },
    };

    res.status(200).json(responseData);
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

// ✅ GET: Get milestone statistics for a child
export const getMilestoneStats = async (req, res) => {
  const { childId } = req.params;
  const userId = req.user.id;

  if (!childId) {
    return res.status(400).json({ message: "childId is required" });
  }

  try {
    console.log(`📊 Getting milestone stats for child ID: ${childId}`); // Force reload

    // Verify that the child belongs to the authenticated user
    const [childCheck] = await db.query(
      `SELECT id FROM children WHERE id = ? AND user_id = ?`,
      [childId, userId]
    );

    if (childCheck.length === 0) {
      return res.status(404).json({ message: "Child not found" });
    }

    // Get total completed milestones
    const [completedCount] = await db.query(
      `SELECT COUNT(*) as count FROM child_milestones WHERE child_id = ?`,
      [childId]
    );

    // Get milestones per category
    const [categoryStats] = await db.query(
      `SELECT 
        a.category,
        COUNT(*) as count
      FROM child_milestones cm
      JOIN activities a ON cm.activity_id = a.id
      WHERE cm.child_id = ?
      GROUP BY a.category`,
      [childId]
    );

    // Get recent milestones (last 5)
    const [recentMilestones] = await db.query(
      `SELECT 
        cm.achieved_at,
        a.title,
        a.category,
        a.icon
      FROM child_milestones cm
      JOIN activities a ON cm.activity_id = a.id
      WHERE cm.child_id = ?
      ORDER BY cm.achieved_at DESC
      LIMIT 5`,
      [childId]
    );

    res.status(200).json({
      totalCompleted: completedCount[0]?.count || 0,
      categoryBreakdown: categoryStats,
      recentMilestones: recentMilestones,
    });
  } catch (error) {
    console.error("Get milestone stats error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
