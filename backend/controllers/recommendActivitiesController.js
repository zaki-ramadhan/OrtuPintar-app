// controllers/recommendActivitiesController.js
import { db } from "../config/db.js";

// ✅ GET: Semua activities rekomendasi
export const getAllActivities = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT 
        id, title, description, category, difficulty, duration, 
        age_group, age_group_min, age_group_max, icon, isMilestone
       FROM activities 
       ORDER BY id DESC`
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

// ✅ POST: Start activity (pindah dari recommended ke upcoming)
export const startActivity = async (req, res) => {
  const { childId, activityId } = req.body;

  if (!childId || !activityId) {
    return res
      .status(400)
      .json({ message: "childId dan activityId wajib diisi." });
  }

  try {
    console.log(
      `🚀 Starting activity - childId: ${childId}, activityId: ${activityId}`
    );

    // Cek apakah activity sudah dimulai hari ini
    const today = new Date().toISOString().split("T")[0];
    const [existing] = await db.query(
      `SELECT id FROM child_activities 
       WHERE child_id = ? AND activity_id = ? 
       AND DATE(created_at) = ? AND status IN ('pending', 'in_progress')`,
      [childId, activityId, today]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message: "Activity sudah dimulai untuk hari ini.",
      });
    }

    // Insert activity sebagai pending
    const [result] = await db.query(
      `INSERT INTO child_activities (child_id, activity_id, status, started_at)
       VALUES (?, ?, 'pending', NOW())`,
      [childId, activityId]
    );

    console.log(`✅ Activity inserted with ID: ${result.insertId}`);

    // Verify insertion
    const [verification] = await db.query(
      `SELECT * FROM child_activities WHERE id = ?`,
      [result.insertId]
    );
    console.log(`✅ Verification - inserted record:`, verification[0]);

    return res.status(201).json({
      message: "Activity berhasil ditambahkan ke upcoming reminders.",
      insertedId: result.insertId,
      record: verification[0],
    });
  } catch (err) {
    console.error("Start activity error:", err);
    return res.status(500).json({ message: "Terjadi kesalahan sistem." });
  }
};

// ✅ PUT: Complete activity
export const completeActivity = async (req, res) => {
  const { childId, activityId } = req.body;

  if (!childId || !activityId) {
    return res
      .status(400)
      .json({ message: "childId dan activityId wajib diisi." });
  }

  try {
    // Update status menjadi completed
    const [result] = await db.query(
      `UPDATE child_activities 
       SET status = 'completed', completed_at = NOW()
       WHERE child_id = ? AND activity_id = ? AND status = 'pending'`,
      [childId, activityId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Activity tidak ditemukan atau sudah diselesaikan.",
      });
    }

    // Get activity info untuk notification
    const [activityData] = await db.query(
      `SELECT title, isMilestone FROM activities WHERE id = ?`,
      [activityId]
    );

    // Get user_id dari child
    const [childData] = await db.query(
      `SELECT user_id FROM children WHERE id = ?`,
      [childId]
    );

    if (activityData.length > 0 && childData.length > 0) {
      const activity = activityData[0];
      const userId = childData[0].user_id;

      // Insert notification activity completed
      await db.query(
        `INSERT INTO notifications (user_id, child_id, type, title, message)
         VALUES (?, ?, 'activity_done', 'Activity Completed', ?)`,
        [userId, childId, `Activity "${activity.title}" has been completed!`]
      );

      // Jika milestone, insert notification achievement
      if (activity.isMilestone) {
        await db.query(
          `INSERT INTO notifications (user_id, child_id, type, title, message)
           VALUES (?, ?, 'achievement', 'Milestone Achieved!', ?)`,
          [
            userId,
            childId,
            `Milestone achieved: "${activity.title}"! Congratulations!`,
          ]
        );

        // Insert ke tabel milestones
        await db.query(
          `INSERT IGNORE INTO child_milestones (child_id, activity_id, achieved_at)
           VALUES (?, ?, NOW())`,
          [childId, activityId]
        );
      }
    }

    return res.status(200).json({
      message: "Activity berhasil diselesaikan.",
    });
  } catch (err) {
    console.error("Complete activity error:", err);
    return res.status(500).json({ message: "Terjadi kesalahan sistem." });
  }
};

// ✅ DELETE: Cancel activity (hapus dari upcoming, kembali ke recommended)
export const cancelActivity = async (req, res) => {
  const { childId, activityId } = req.body;

  if (!childId || !activityId) {
    return res
      .status(400)
      .json({ message: "childId dan activityId wajib diisi." });
  }

  try {
    // Update status menjadi cancelled atau hapus record
    const [result] = await db.query(
      `UPDATE child_activities 
       SET status = 'cancelled', cancelled_at = NOW()
       WHERE child_id = ? AND activity_id = ? AND status = 'pending'`,
      [childId, activityId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Activity tidak ditemukan atau sudah diselesaikan.",
      });
    }

    return res.status(200).json({
      message: "Activity berhasil dibatalkan.",
    });
  } catch (err) {
    console.error("Cancel activity error:", err);
    return res.status(500).json({ message: "Terjadi kesalahan sistem." });
  }
};

// ✅ GET: Upcoming reminders untuk child tertentu
export const getUpcomingReminders = async (req, res) => {
  const { childId } = req.params;

  if (!childId) {
    return res.status(400).json({ message: "childId wajib diisi di params." });
  }
  try {
    const today = new Date().toISOString().split("T")[0];
    console.log(`Fetching reminders for childId: ${childId}, today: ${today}`);

    // Debug: Check what's in child_activities table
    const [allRows] = await db.query(
      `SELECT ca.*, DATE(ca.created_at) as created_date 
       FROM child_activities ca 
       WHERE ca.child_id = ? 
       ORDER BY ca.created_at DESC`,
      [childId]
    );
    console.log(`All child_activities for child ${childId}:`, allRows);

    // Modified query to be more flexible with date matching
    const [rows] = await db.query(
      `SELECT 
         ca.id as reminder_id,
         ca.activity_id,
         ca.status,
         ca.started_at,
         a.title as activityName,
         a.icon,
         a.category,
         a.duration,
         DATE(ca.created_at) as created_date
       FROM child_activities ca
       JOIN activities a ON ca.activity_id = a.id
       WHERE ca.child_id = ? 
       AND ca.status IN ('pending', 'completed')
       AND ca.created_at >= DATE_SUB(NOW(), INTERVAL 2 DAY)
       ORDER BY ca.created_at DESC`,
      [childId]
    );

    console.log(
      `Found ${rows.length} reminders with flexible date filter:`,
      rows
    );

    // If still no results, show all records for debugging
    if (rows.length === 0) {
      console.log(
        "🔍 No reminders found with flexible filter, checking all records..."
      );
      const [allRecords] = await db.query(
        `SELECT 
           ca.id as reminder_id,
           ca.activity_id,
           ca.status,
           ca.started_at,
           ca.created_at,
           a.title as activityName,
           a.icon,
           a.category,
           a.duration,
           DATE(ca.created_at) as created_date
         FROM child_activities ca
         JOIN activities a ON ca.activity_id = a.id
         WHERE ca.child_id = ? 
         AND ca.status IN ('pending', 'completed')
         ORDER BY ca.created_at DESC
         LIMIT 10`,
        [childId]
      );
      console.log(
        `Found ${allRecords.length} total records for child:`,
        allRecords
      );
    }

    const reminders = rows.map((row) => ({
      childId: parseInt(childId),
      activityId: row.activity_id,
      activityName: row.activityName,
      date: today,
      completed: row.status === "completed",
      icon: row.icon,
      category: row.category,
      duration: row.duration,
    }));

    // Set headers to prevent caching
    res.set({
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    });

    return res.status(200).json({
      message: "Upcoming reminders fetched successfully",
      reminders: reminders,
    });
  } catch (err) {
    console.error("Get upcoming reminders error:", err);
    return res.status(500).json({ message: "Terjadi kesalahan sistem." });
  }
};

// ✅ GET: Child progress untuk overview
export const getChildProgress = async (req, res) => {
  const { childId } = req.params;

  if (!childId) {
    return res.status(400).json({ message: "childId wajib diisi di params." });
  }

  try {
    // Hitung total activities hari ini
    const today = new Date().toISOString().split("T")[0];
    const [todayStats] = await db.query(
      `SELECT 
         COUNT(*) as total_today,
         SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_today
       FROM child_activities 
       WHERE child_id = ? AND DATE(created_at) = ?`,
      [childId, today]
    );

    // Hitung milestone yang sudah dicapai
    const [milestoneStats] = await db.query(
      `SELECT COUNT(*) as total_milestones
       FROM child_milestones 
       WHERE child_id = ?`,
      [childId]
    );

    // Hitung progress per kategori (30 hari terakhir)
    const [categoryProgress] = await db.query(
      `SELECT 
         a.category,
         COUNT(*) as total_activities,
         SUM(CASE WHEN ca.status = 'completed' THEN 1 ELSE 0 END) as completed_activities
       FROM child_activities ca
       JOIN activities a ON ca.activity_id = a.id
       WHERE ca.child_id = ? 
       AND ca.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
       GROUP BY a.category`,
      [childId]
    );

    // Recent achievements (milestone yang dicapai)
    const [recentAchievements] = await db.query(
      `SELECT 
         a.title,
         cm.achieved_at
       FROM child_milestones cm
       JOIN activities a ON cm.activity_id = a.id
       WHERE cm.child_id = ?
       ORDER BY cm.achieved_at DESC
       LIMIT 1`,
      [childId]
    );

    // Next milestones (milestone yang belum dicapai)
    const [nextMilestones] = await db.query(
      `SELECT a.title, a.age_group_min, a.age_group_max
       FROM activities a
       WHERE a.isMilestone = 1
       AND a.id NOT IN (
         SELECT activity_id FROM child_milestones WHERE child_id = ?
       )
       ORDER BY a.age_group_min ASC
       LIMIT 1`,
      [childId]
    );

    // Calculate overall progress
    const todayProgress =
      todayStats[0].total_today > 0
        ? Math.round(
            (todayStats[0].completed_today / todayStats[0].total_today) * 100
          )
        : 0;

    // Development areas dengan mock data yang lebih realistis
    const developmentAreas = [
      {
        name: "Physical",
        progress: 75,
        color: "emerald",
      },
      {
        name: "Cognitive",
        progress: 85,
        color: "blue",
      },
      {
        name: "Social",
        progress: 65,
        color: "orange",
      },
      {
        name: "Language",
        progress: 80,
        color: "purple",
      },
    ];

    const progressData = {
      todayProgress,
      overallProgress: Math.round((75 + 85 + 65 + 80) / 4), // average dari development areas
      totalMilestones: milestoneStats[0].total_milestones,
      developmentAreas,
      recentAchievement:
        recentAchievements[0]?.title || "Keep going! You're doing great!",
      nextMilestone: nextMilestones[0]?.title || "All milestones completed!",
      categoryProgress: categoryProgress.map((cat) => ({
        category: cat.category,
        progress:
          cat.total_activities > 0
            ? Math.round(
                (cat.completed_activities / cat.total_activities) * 100
              )
            : 0,
      })),
    };

    return res.status(200).json({
      message: "Child progress fetched successfully",
      progress: progressData,
    });
  } catch (err) {
    console.error("Get child progress error:", err);
    return res.status(500).json({ message: "Terjadi kesalahan sistem." });
  }
};

// ✅ GET: Recent completed activities untuk semua anak user
export const getRecentActivities = async (req, res) => {
  const userId = req.user.id;

  try {
    // Ambil aktivitas completed dari semua anak user, diurutkan terbaru
    const [rows] = await db.query(
      `SELECT 
         ca.id,
         ca.activity_id,
         ca.child_id,
         ca.completed_at,
         c.name as child_name,
         a.title as activity_title,
         a.icon,
         a.category,
         a.duration,
         a.isMilestone,
         TIMESTAMPDIFF(MINUTE, ca.completed_at, NOW()) as minutes_ago,
         TIMESTAMPDIFF(HOUR, ca.completed_at, NOW()) as hours_ago,
         TIMESTAMPDIFF(DAY, ca.completed_at, NOW()) as days_ago
       FROM child_activities ca
       JOIN children c ON ca.child_id = c.id
       JOIN activities a ON ca.activity_id = a.id
       WHERE c.user_id = ? 
       AND ca.status = 'completed'
       AND ca.completed_at IS NOT NULL
       ORDER BY ca.completed_at DESC
       LIMIT 10`,
      [userId]
    );

    const recentActivities = rows.map((row) => {
      // Format waktu yang user-friendly
      let timeAgo;
      if (row.minutes_ago < 60) {
        timeAgo =
          row.minutes_ago === 0 ? "Just now" : `${row.minutes_ago} minutes ago`;
      } else if (row.hours_ago < 24) {
        timeAgo = `${row.hours_ago} hour${row.hours_ago > 1 ? "s" : ""} ago`;
      } else {
        timeAgo = `${row.days_ago} day${row.days_ago > 1 ? "s" : ""} ago`;
      }

      return {
        id: row.id,
        activity: row.activity_title,
        child: row.child_name,
        time: timeAgo,
        icon: row.icon,
        category: row.category,
        isMilestone: row.isMilestone,
        completedAt: row.completed_at,
      };
    });

    return res.status(200).json({
      message: "Recent activities fetched successfully",
      activities: recentActivities,
    });
  } catch (err) {
    console.error("Get recent activities error:", err);
    return res.status(500).json({ message: "Terjadi kesalahan sistem." });
  }
};

// ✅ GET: Weekly summary untuk semua anak user
export const getWeeklySummary = async (req, res) => {
  const userId = req.user.id;

  try {
    // Hitung tanggal minggu ini dan minggu lalu
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const startOfLastWeek = new Date(startOfWeek);
    startOfLastWeek.setDate(startOfWeek.getDate() - 7);

    const endOfLastWeek = new Date(startOfLastWeek);
    endOfLastWeek.setDate(startOfLastWeek.getDate() + 6);
    endOfLastWeek.setHours(23, 59, 59, 999);

    // Activities completed minggu ini
    const [thisWeekActivities] = await db.query(
      `SELECT COUNT(*) as count
       FROM child_activities ca
       JOIN children c ON ca.child_id = c.id
       WHERE c.user_id = ? 
       AND ca.status = 'completed'
       AND ca.completed_at >= ? AND ca.completed_at <= ?`,
      [userId, startOfWeek, endOfWeek]
    );

    // Activities completed minggu lalu
    const [lastWeekActivities] = await db.query(
      `SELECT COUNT(*) as count
       FROM child_activities ca
       JOIN children c ON ca.child_id = c.id
       WHERE c.user_id = ? 
       AND ca.status = 'completed'
       AND ca.completed_at >= ? AND ca.completed_at <= ?`,
      [userId, startOfLastWeek, endOfLastWeek]
    );

    // Milestones achieved minggu ini
    const [thisWeekMilestones] = await db.query(
      `SELECT COUNT(*) as count
       FROM child_milestones cm
       JOIN children c ON cm.child_id = c.id
       WHERE c.user_id = ?
       AND cm.achieved_at >= ? AND cm.achieved_at <= ?`,
      [userId, startOfWeek, endOfWeek]
    );

    // Milestones achieved minggu lalu
    const [lastWeekMilestones] = await db.query(
      `SELECT COUNT(*) as count
       FROM child_milestones cm
       JOIN children c ON cm.child_id = c.id
       WHERE c.user_id = ?
       AND cm.achieved_at >= ? AND cm.achieved_at <= ?`,
      [userId, startOfLastWeek, endOfLastWeek]
    );

    return res.status(200).json({
      message: "Weekly summary fetched successfully",
      summary: {
        thisWeek: {
          activities: thisWeekActivities[0].count,
          milestones: thisWeekMilestones[0].count,
        },
        lastWeek: {
          activities: lastWeekActivities[0].count,
          milestones: lastWeekMilestones[0].count,
        },
      },
    });
  } catch (err) {
    console.error("Get weekly summary error:", err);
    return res.status(500).json({ message: "Terjadi kesalahan sistem." });
  }
};
