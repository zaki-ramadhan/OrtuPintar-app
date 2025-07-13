// controllers/milestoneController.js
import { db } from "../config/db.js";

// ✅ GET: Get completed milestones for a specific child
export const getChildMilestones = async (req, res) => {
    const { childId } = req.params;
    const userId = req.user.id;

    if (!childId) {
        return res.status(400).json({ message: "childId is required" });
    }

    try {
        // Verify that the child belongs to the authenticated user
        const [childCheck] = await db.query(
            `SELECT id FROM children WHERE id = ? AND user_id = ?`,
            [childId, userId]
        );

        if (childCheck.length === 0) {
            return res.status(404).json({ message: "Child not found" });
        }

        // Get completed milestones for the child
        const [milestones] = await db.query(
            `SELECT 
         cm.id,
         cm.child_id,
         cm.activity_id,
         cm.achieved_at,
         a.title,
         a.description,
         a.category,
         a.age_group,
         a.age_group_min,
         a.age_group_max,
         a.icon,
         a.difficulty,
         a.duration
       FROM child_milestones cm
       JOIN activities a ON cm.activity_id = a.id
       WHERE cm.child_id = ?
       ORDER BY cm.achieved_at DESC`,
            [childId]
        );

        return res.status(200).json({
            message: "Child milestones fetched successfully",
            milestones: milestones,
        });
    } catch (err) {
        console.error("Get child milestones error:", err);
        return res.status(500).json({
            message: "An error occurred while fetching milestones",
            error: err.message
        });
    }
};

// ✅ GET: Get all milestone activities (suggestions) organized by age groups
export const getAllMilestoneActivities = async (req, res) => {
    try {
        const [milestones] = await db.query(
            `SELECT 
         id,
         title,
         description,
         category,
         age_group,
         age_group_min,
         age_group_max,
         icon,
         difficulty,
         duration
       FROM activities 
       WHERE isMilestone = 1
       ORDER BY age_group_min ASC, age_group_max ASC, title ASC`
        );

        return res.status(200).json({
            message: "Milestone activities fetched successfully",
            milestones: milestones,
        });
    } catch (err) {
        console.error("Get milestone activities error:", err);
        return res.status(500).json({
            message: "An error occurred while fetching milestone activities",
            error: err.message
        });
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
        // Verify that the child belongs to the authenticated user
        const [childCheck] = await db.query(
            `SELECT id, birth_date FROM children WHERE id = ? AND user_id = ?`,
            [childId, userId]
        );

        if (childCheck.length === 0) {
            return res.status(404).json({ message: "Child not found" });
        }

        const childBirthDate = childCheck[0].birth_date;

        // Calculate child's current age in years
        const today = new Date();
        const birthDate = new Date(childBirthDate);
        let ageInYears = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            ageInYears--;
        }

        // Get total completed milestones
        const [completedCount] = await db.query(
            `SELECT COUNT(*) as total_completed
       FROM child_milestones 
       WHERE child_id = ?`,
            [childId]
        );

        // Get age-appropriate milestone activities (within 1 year of child's age)
        const [ageAppropriate] = await db.query(
            `SELECT COUNT(*) as total_age_appropriate
       FROM activities 
       WHERE isMilestone = 1
       AND age_group_min <= ? + 1
       AND age_group_max >= ? - 1`,
            [ageInYears, ageInYears]
        );

        // Get all milestone activities
        const [allMilestones] = await db.query(
            `SELECT COUNT(*) as total_milestones
       FROM activities 
       WHERE isMilestone = 1`
        );

        // Calculate completion rate based on age-appropriate milestones
        const totalAgeAppropriate = ageAppropriate[0].total_age_appropriate;
        const totalCompleted = completedCount[0].total_completed;
        const completionRate = totalAgeAppropriate > 0
            ? Math.round((totalCompleted / totalAgeAppropriate) * 100)
            : 0;

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

        return res.status(200).json({
            message: "Milestone statistics fetched successfully",
            stats: {
                totalCompleted: totalCompleted,
                totalAgeAppropriate: totalAgeAppropriate,
                totalAllMilestones: allMilestones[0].total_milestones,
                completionRate: completionRate,
                childAge: ageInYears,
                recentMilestones: recentMilestones
            }
        });
    } catch (err) {
        console.error("Get milestone stats error:", err);
        return res.status(500).json({
            message: "An error occurred while fetching milestone statistics",
            error: err.message
        });
    }
};
