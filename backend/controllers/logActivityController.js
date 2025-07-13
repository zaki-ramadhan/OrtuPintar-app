import { db } from "../config/db.js";

// ✅ GET: Get all log activities for a specific child
export const getChildLogActivities = async (req, res) => {
    const { childId } = req.params;
    const userId = req.user.id;

    if (!childId) {
        return res.status(400).json({ message: "childId is required" });
    }

    try {
        // Verify that the child belongs to the authenticated user
        const [childCheck] = await db.query(
            `SELECT id, name FROM children WHERE id = ? AND user_id = ?`,
            [childId, userId]
        );

        if (childCheck.length === 0) {
            return res.status(404).json({ message: "Child not found or access denied" });
        }

        // Get all activity logs for the child with detailed information
        const [activities] = await db.query(
            `SELECT 
                ca.id,
                ca.activity_id,
                ca.child_id,
                ca.status,
                ca.started_at,
                ca.completed_at,
                ca.cancelled_at,
                ca.progress_notes,
                ca.created_at,
                ca.updated_at,
                a.title,
                a.description,
                a.category,
                a.difficulty,
                a.duration,
                a.icon,
                a.isMilestone,
                a.age_group_min,
                a.age_group_max,
                c.name as child_name
            FROM child_activities ca
            JOIN activities a ON ca.activity_id = a.id
            JOIN children c ON ca.child_id = c.id
            WHERE ca.child_id = ? 
            ORDER BY ca.created_at DESC`,
            [childId]
        );

        return res.status(200).json({
            message: "Child log activities fetched successfully",
            child: childCheck[0],
            activities: activities
        });
    } catch (err) {
        console.error("Get child log activities error:", err);
        return res.status(500).json({
            message: "An error occurred while fetching log activities",
            error: err.message
        });
    }
};

// ✅ GET: Get all log activities for all children of a user
export const getAllLogActivities = async (req, res) => {
    const userId = req.user.id;

    try {
        // Get all children for the user
        const [children] = await db.query(
            `SELECT id, name, birth_date, gender FROM children WHERE user_id = ? ORDER BY created_at ASC`,
            [userId]
        );

        if (children.length === 0) {
            return res.status(200).json({
                message: "No children found",
                children: [],
                activities: []
            });
        }

        // Get all activity logs for all children
        const [activities] = await db.query(
            `SELECT 
                ca.id,
                ca.activity_id,
                ca.child_id,
                ca.status,
                ca.started_at,
                ca.completed_at,
                ca.cancelled_at,
                ca.progress_notes,
                ca.created_at,
                ca.updated_at,
                a.title,
                a.description,
                a.category,
                a.difficulty,
                a.duration,
                a.icon,
                a.isMilestone,
                a.age_group_min,
                a.age_group_max,
                c.name as child_name,
                c.birth_date,
                c.gender
            FROM child_activities ca
            JOIN activities a ON ca.activity_id = a.id
            JOIN children c ON ca.child_id = c.id
            WHERE c.user_id = ?
            ORDER BY ca.created_at DESC`,
            [userId]
        );

        return res.status(200).json({
            message: "All log activities fetched successfully",
            children: children,
            activities: activities
        });
    } catch (err) {
        console.error("Get all log activities error:", err);
        return res.status(500).json({
            message: "An error occurred while fetching log activities",
            error: err.message
        });
    }
};

// ✅ GET: Get log activity statistics for a child
export const getChildLogStats = async (req, res) => {
    const { childId } = req.params;
    const userId = req.user.id;

    if (!childId) {
        return res.status(400).json({ message: "childId is required" });
    }

    try {
        // Verify that the child belongs to the authenticated user
        const [childCheck] = await db.query(
            `SELECT id, name FROM children WHERE id = ? AND user_id = ?`,
            [childId, userId]
        );

        if (childCheck.length === 0) {
            return res.status(404).json({ message: "Child not found or access denied" });
        }

        // Get total activities count
        const [totalCount] = await db.query(
            `SELECT COUNT(*) as total FROM child_activities WHERE child_id = ?`,
            [childId]
        );

        // Get activities by status
        const [statusStats] = await db.query(
            `SELECT 
                status,
                COUNT(*) as count
            FROM child_activities 
            WHERE child_id = ?
            GROUP BY status`,
            [childId]
        );

        // Get activities by category
        const [categoryStats] = await db.query(
            `SELECT 
                a.category,
                COUNT(*) as count,
                SUM(CASE WHEN ca.status = 'completed' THEN 1 ELSE 0 END) as completed_count
            FROM child_activities ca
            JOIN activities a ON ca.activity_id = a.id
            WHERE ca.child_id = ?
            GROUP BY a.category
            ORDER BY count DESC`,
            [childId]
        );

        // Get milestones achieved
        const [milestoneStats] = await db.query(
            `SELECT COUNT(*) as milestone_count
            FROM child_activities ca
            JOIN activities a ON ca.activity_id = a.id
            WHERE ca.child_id = ? AND a.isMilestone = 1 AND ca.status = 'completed'`,
            [childId]
        );

        // Get recent activity trends (last 30 days by week)
        const [weeklyTrends] = await db.query(
            `SELECT 
                WEEK(ca.created_at) as week_number,
                COUNT(*) as activity_count,
                SUM(CASE WHEN ca.status = 'completed' THEN 1 ELSE 0 END) as completed_count
            FROM child_activities ca
            WHERE ca.child_id = ? 
            AND ca.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
            GROUP BY WEEK(ca.created_at)
            ORDER BY week_number ASC`,
            [childId]
        );

        return res.status(200).json({
            message: "Child log statistics fetched successfully",
            child: childCheck[0],
            stats: {
                total: totalCount[0].total,
                byStatus: statusStats,
                byCategory: categoryStats,
                milestones: milestoneStats[0].milestone_count,
                weeklyTrends: weeklyTrends
            }
        });
    } catch (err) {
        console.error("Get child log stats error:", err);
        return res.status(500).json({
            message: "An error occurred while fetching log statistics",
            error: err.message
        });
    }
};