import mysql from "mysql2/promise";
import { db } from "../config/db.js";

// 📊 HEALTH MONITORING FUNCTIONS

// Check database health
async function checkDatabaseHealth() {
  try {
    const startTime = Date.now();
    await db.execute("SELECT 1");
    const responseTime = Date.now() - startTime;

    return {
      status: responseTime < 1000 ? "healthy" : "slow",
      responseTime: responseTime,
      message:
        responseTime < 1000
          ? "Database responding normally"
          : "Database response slow",
    };
  } catch (error) {
    return {
      status: "error",
      responseTime: null,
      message: "Database connection failed",
    };
  }
}

// Get server metrics
function getServerMetrics() {
  const totalMemory = process.memoryUsage();
  const uptime = process.uptime();

  return {
    memory: {
      used: Math.round(totalMemory.heapUsed / 1024 / 1024), // MB
      total: Math.round(totalMemory.heapTotal / 1024 / 1024), // MB
      usage: Math.round((totalMemory.heapUsed / totalMemory.heapTotal) * 100), // %
    },
    uptime: {
      seconds: Math.floor(uptime),
      formatted: formatUptime(uptime),
    },
    cpu: {
      usage: Math.floor(Math.random() * 20) + 5, // Simulated CPU usage 5-25%
    },
    disk: {
      usage: Math.floor(Math.random() * 30) + 40, // Simulated disk usage 40-70%
    },
    network: {
      requests: Math.floor(Math.random() * 1000) + 500, // Simulated requests
      bandwidth: Math.floor(Math.random() * 100) + 50, // Simulated bandwidth MB/s
    },
  };
}

// Calculate overall system health score
function calculateSystemHealthScore(dbHealth, serverMetrics, apiMetrics) {
  let score = 100;

  // Database health impact (40% weight)
  if (dbHealth.status === "error") {
    score -= 40;
  } else if (dbHealth.status === "slow") {
    score -= 20;
  } else if (dbHealth.responseTime > 500) {
    score -= 10;
  }

  // Memory usage impact (20% weight)
  if (serverMetrics.memory.usage > 90) {
    score -= 20;
  } else if (serverMetrics.memory.usage > 80) {
    score -= 10;
  } else if (serverMetrics.memory.usage > 70) {
    score -= 5;
  }

  // CPU usage impact (15% weight)
  if (serverMetrics.cpu.usage > 80) {
    score -= 15;
  } else if (serverMetrics.cpu.usage > 60) {
    score -= 8;
  } else if (serverMetrics.cpu.usage > 40) {
    score -= 3;
  }

  // Disk usage impact (15% weight)
  if (serverMetrics.disk.usage > 90) {
    score -= 15;
  } else if (serverMetrics.disk.usage > 80) {
    score -= 8;
  } else if (serverMetrics.disk.usage > 70) {
    score -= 3;
  }

  // API response time impact (10% weight)
  if (apiMetrics.averageResponseTime > 2000) {
    score -= 15;
  } else if (apiMetrics.averageResponseTime > 1000) {
    score -= 8;
  } else if (apiMetrics.averageResponseTime > 500) {
    score -= 3;
  }

  // Error rate impact (10% weight)
  if (apiMetrics.errorRate > 5) {
    score -= 10;
  } else if (apiMetrics.errorRate > 2) {
    score -= 5;
  } else if (apiMetrics.errorRate > 1) {
    score -= 2;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

// Get health status text
function getHealthStatusText(score) {
  if (score >= 95) return "Excellent";
  if (score >= 85) return "Good";
  if (score >= 70) return "Fair";
  if (score >= 50) return "Poor";
  return "Critical";
}

// Get health status color
function getHealthStatusColor(score) {
  if (score >= 95) return "green";
  if (score >= 85) return "blue";
  if (score >= 70) return "yellow";
  if (score >= 50) return "orange";
  return "red";
}

// Helper function to format time ago
function formatTimeAgo(date) {
  const now = new Date();
  const diffInMinutes = Math.floor((now - new Date(date)) / (1000 * 60));

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} days ago`;

  return new Date(date).toLocaleDateString();
}

// Format uptime helper
function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}

// Generate health recommendations
function generateHealthRecommendations(
  dbHealth,
  serverMetrics,
  apiMetrics,
  healthScore
) {
  const recommendations = [];

  if (dbHealth.status === "error") {
    recommendations.push({
      type: "critical",
      message: "Database connection failed - Check database server status",
      action: "Restart database service or check connection settings",
    });
  } else if (dbHealth.responseTime > 1000) {
    recommendations.push({
      type: "warning",
      message: "Database response time is slow",
      action: "Consider optimizing queries or upgrading database resources",
    });
  }

  if (serverMetrics.memory.usage > 85) {
    recommendations.push({
      type: "warning",
      message: "High memory usage detected",
      action: "Monitor memory leaks or consider scaling server resources",
    });
  }

  if (serverMetrics.cpu.usage > 70) {
    recommendations.push({
      type: "info",
      message: "CPU usage is elevated",
      action: "Monitor system load and consider load balancing",
    });
  }

  if (serverMetrics.disk.usage > 80) {
    recommendations.push({
      type: "warning",
      message: "Disk space is running low",
      action: "Clean up log files or expand storage capacity",
    });
  }

  if (apiMetrics.errorRate > 2) {
    recommendations.push({
      type: "warning",
      message: "API error rate is above normal",
      action: "Review error logs and fix common issues",
    });
  }

  if (apiMetrics.averageResponseTime > 1000) {
    recommendations.push({
      type: "info",
      message: "API response time could be improved",
      action: "Optimize database queries and consider caching",
    });
  }

  if (healthScore >= 95) {
    recommendations.push({
      type: "success",
      message: "System is performing excellently",
      action: "Continue monitoring and maintain current practices",
    });
  } else if (recommendations.length === 0) {
    recommendations.push({
      type: "info",
      message: "System is stable with minor optimization opportunities",
      action: "Regular monitoring and preventive maintenance recommended",
    });
  }

  return recommendations;
}

// 📊 GET ALL DASHBOARD DATA (Combined endpoint)
export const getAllDashboardData = async (req, res) => {
  try {
    console.log("🔑 Incoming Auth Header:", req.headers.authorization);

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    // Get stats data
    const [totalUsersResult] = await db.execute(`
      SELECT COUNT(*) as total FROM users WHERE role = 'users'
    `);
    const totalUsers = totalUsersResult[0].total;

    const [activeUsersResult] = await db.execute(`
      SELECT COUNT(DISTINCT user_id) as active 
      FROM children 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    `);
    const activeUsers = activeUsersResult[0].active;

    const [totalChildrenResult] = await db.execute(`
      SELECT COUNT(*) as total FROM children
    `);
    const totalChildren = totalChildrenResult[0].total;

    // Calculate monthly growth
    const [lastMonthUsersResult] = await db.execute(`
      SELECT COUNT(*) as lastMonth 
      FROM users 
      WHERE role = 'users' 
      AND created_at < DATE_SUB(NOW(), INTERVAL 30 DAY)
    `);
    const lastMonthUsers = lastMonthUsersResult[0].lastMonth;
    const monthlyGrowth =
      lastMonthUsers > 0
        ? Math.round(((totalUsers - lastMonthUsers) / lastMonthUsers) * 100)
        : totalUsers > 0
        ? 100
        : 0;

    // Get recent users
    const [recentUsersResult] = await db.execute(`
      SELECT 
        u.id,
        u.name,
        u.email,
        u.created_at,
        COUNT(c.id) as children
      FROM users u
      LEFT JOIN children c ON u.id = c.user_id
      WHERE u.role = 'users'
      GROUP BY u.id, u.name, u.email, u.created_at
      ORDER BY u.created_at DESC
      LIMIT 5
    `);

    const recentUsers = recentUsersResult.map((user) => ({
      id: user.id,
      name: user.name || "No Name",
      email: user.email,
      created_at: user.created_at,
      children: user.children,
      status: user.children > 0 ? "active" : "inactive",
    }));

    // Get recent activities
    const [childrenActivitiesResult] = await db.execute(`
      SELECT 
        c.id,
        c.name as child_name,
        c.created_at,
        u.name,
        'child' as type
      FROM children c
      JOIN users u ON c.user_id = u.id
      ORDER BY c.created_at DESC
      LIMIT 3
    `);

    const [userActivitiesResult] = await db.execute(`
      SELECT 
        id,
        name,
        created_at,
        'user' as type
      FROM users
      WHERE role = 'users'
      ORDER BY created_at DESC
      LIMIT 5
    `);

    let activities = [];
    let activityId = 1;

    // Add child activities
    childrenActivitiesResult.forEach((activity) => {
      activities.push({
        id: activityId++,
        message: `New child added: ${activity.child_name} by ${activity.name}`,
        type: activity.type,
        time: formatTimeAgo(activity.created_at),
      });
    });

    // Add user activities
    userActivitiesResult.forEach((activity) => {
      activities.push({
        id: activityId++,
        message: `New user registered: ${activity.name || "No Name"}`,
        type: activity.type,
        time: activity.created_at.toLocaleDateString(),
      });
    });

    // Sort activities by most recent
    activities.sort((a, b) => new Date(b.time) - new Date(a.time));

    const dashboardData = {
      stats: {
        totalUsers,
        activeUsers,
        totalChildren,
        systemHealth: 98, // Basic health - will be enhanced by system-health endpoint
        monthlyGrowth,
      },
      recentUsers,
      activities: activities.slice(0, 8),
    };

    console.log("📊 Complete dashboard data:", dashboardData);
    res.json(dashboardData);
  } catch (error) {
    console.error("❌ Dashboard data error:", error);
    res.status(500).json({
      message: "Failed to fetch dashboard data",
      error: error.message,
    });
  }
};

// 🏥 GET SYSTEM HEALTH DETAILS
export const getSystemHealthDetails = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    // Get database health
    const dbHealth = await checkDatabaseHealth();

    // Get server metrics
    const serverMetrics = getServerMetrics();

    // Simulate API metrics (in real app, you'd track these)
    const apiMetrics = {
      totalRequests: Math.floor(Math.random() * 10000) + 5000,
      averageResponseTime: Math.floor(Math.random() * 800) + 200, // 200-1000ms
      errorRate: Math.random() * 3, // 0-3%
      successRate: 97 + Math.random() * 3, // 97-100%
    };

    // Calculate overall health score
    const healthScore = calculateSystemHealthScore(
      dbHealth,
      serverMetrics,
      apiMetrics
    );

    // Generate recommendations
    const recommendations = generateHealthRecommendations(
      dbHealth,
      serverMetrics,
      apiMetrics,
      healthScore
    );

    const systemHealthData = {
      overall: {
        score: healthScore,
        status: getHealthStatusText(healthScore),
        color: getHealthStatusColor(healthScore),
        lastChecked: new Date().toISOString(),
      },
      database: {
        status: dbHealth.status,
        responseTime: dbHealth.responseTime,
        message: dbHealth.message,
        healthy: dbHealth.status === "healthy",
      },
      server: {
        memory: serverMetrics.memory,
        uptime: serverMetrics.uptime,
        cpu: serverMetrics.cpu,
        disk: serverMetrics.disk,
        network: serverMetrics.network,
      },
      api: {
        totalRequests: apiMetrics.totalRequests,
        averageResponseTime: Math.round(apiMetrics.averageResponseTime),
        errorRate: Math.round(apiMetrics.errorRate * 100) / 100,
        successRate: Math.round(apiMetrics.successRate * 100) / 100,
      },
      recommendations: recommendations,
    };

    res.json(systemHealthData);
  } catch (error) {
    console.error("❌ System health error:", error);
    res.status(500).json({
      message: "Failed to fetch system health",
      error: error.message,
    });
  }
};

// 📊 INDIVIDUAL ENDPOINTS (for backwards compatibility)

export const getDashboardStats = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const [totalUsersResult] = await db.execute(`
      SELECT COUNT(*) as total FROM users WHERE role = 'users'
    `);
    const totalUsers = totalUsersResult[0].total;

    const [activeUsersResult] = await db.execute(`
      SELECT COUNT(DISTINCT user_id) as active 
      FROM children 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    `);
    const activeUsers = activeUsersResult[0].active;

    const [totalChildrenResult] = await db.execute(`
      SELECT COUNT(*) as total FROM children
    `);
    const totalChildren = totalChildrenResult[0].total;

    const [lastMonthUsersResult] = await db.execute(`
      SELECT COUNT(*) as lastMonth 
      FROM users 
      WHERE role = 'users' 
      AND created_at < DATE_SUB(NOW(), INTERVAL 30 DAY)
    `);
    const lastMonthUsers = lastMonthUsersResult[0].lastMonth;
    const monthlyGrowth =
      lastMonthUsers > 0
        ? Math.round(((totalUsers - lastMonthUsers) / lastMonthUsers) * 100)
        : totalUsers > 0
        ? 100
        : 0;

    res.json({
      totalUsers,
      activeUsers,
      totalChildren,
      systemHealth: 98,
      monthlyGrowth,
    });
  } catch (error) {
    console.error("❌ Dashboard stats error:", error);
    res.status(500).json({
      message: "Failed to fetch dashboard stats",
      error: error.message,
    });
  }
};

export const getRecentUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const [recentUsersResult] = await db.execute(`
      SELECT 
        u.id,
        u.name,
        u.email,
        u.created_at,
        COUNT(c.id) as children
      FROM users u
      LEFT JOIN children c ON u.id = c.user_id
      WHERE u.role = 'users'
      GROUP BY u.id, u.name, u.email, u.created_at
      ORDER BY u.created_at DESC
      LIMIT 10
    `);

    const recentUsers = recentUsersResult.map((user) => ({
      id: user.id,
      name: user.name || "No Name",
      email: user.email,
      created_at: user.created_at,
      children: user.children,
      status: user.children > 0 ? "active" : "inactive",
    }));

    res.json(recentUsers);
  } catch (error) {
    console.error("❌ Recent users error:", error);
    res.status(500).json({
      message: "Failed to fetch recent users",
      error: error.message,
    });
  }
};

export const getRecentActivities = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const [childrenActivitiesResult] = await db.execute(`
      SELECT 
        c.id,
        c.name as child_name,
        c.created_at,
        u.name,
        'child' as type
      FROM children c
      JOIN users u ON c.user_id = u.id
      ORDER BY c.created_at DESC
      LIMIT 5
    `);

    const [userActivitiesResult] = await db.execute(`
      SELECT 
        id,
        name,
        created_at,
        'user' as type
      FROM users
      WHERE role = 'users'
      ORDER BY created_at DESC
      LIMIT 5
    `);

    let activities = [];
    let activityId = 1;

    childrenActivitiesResult.forEach((activity) => {
      activities.push({
        id: activityId++,
        message: `New child added: ${activity.child_name} by ${activity.name}`,
        type: activity.type,
        time: formatTimeAgo(activity.created_at),
      });
    });

    userActivitiesResult.forEach((activity) => {
      activities.push({
        id: activityId++,
        message: `New user registered: ${activity.name || "No Name"}`,
        type: activity.type,
        time: activity.created_at.toLocaleDateString(),
      });
    });

    activities.sort((a, b) => new Date(b.time) - new Date(a.time));

    res.json(activities.slice(0, 10));
  } catch (error) {
    console.error("❌ Recent activities error:", error);
    res.status(500).json({
      message: "Failed to fetch recent activities",
      error: error.message,
    });
  }
};

// 🔔 GET ADMIN NOTIFICATIONS
export const getAdminNotifications = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    console.log("📬 Fetching admin notifications...");

    const adminId = req.user.id;

    // Create admin_notification_reads table if not exists
    await db.execute(`
      CREATE TABLE IF NOT EXISTS admin_notification_reads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        admin_id INT NOT NULL,
        marked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_admin (admin_id),
        INDEX(admin_id)
      )
    `);

    // Get admin's last read timestamp
    const [readStatus] = await db.execute(
      `
      SELECT marked_at FROM admin_notification_reads WHERE admin_id = ? ORDER BY marked_at DESC LIMIT 1
    `,
      [adminId]
    );

    const lastReadTime = readStatus.length > 0 ? readStatus[0].marked_at : null;
    console.log(`📖 Admin last read time: ${lastReadTime}`);

    // Get recent user registrations (last 7 days)
    const [recentUsers] = await db.execute(`
      SELECT 
        u.id,
        u.name,
        u.email,
        u.created_at,
        COUNT(c.id) as children_count
      FROM users u
      LEFT JOIN children c ON u.id = c.user_id
      WHERE u.role = 'users' 
      AND u.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      GROUP BY u.id, u.name, u.email, u.created_at
      ORDER BY u.created_at DESC
      LIMIT 8
    `);

    // Get data from notifications table (recent notifications from users)
    const [userNotifications] = await db.execute(`
      SELECT 
        n.id,
        n.type,
        n.title,
        n.message,
        n.is_read as \`read\`,
        n.created_at,
        u.name as user_name,
        u.email as user_email,
        c.name as child_name
      FROM notifications n
      JOIN users u ON n.user_id = u.id
      LEFT JOIN children c ON n.child_id = c.id
      WHERE n.created_at >= DATE_SUB(NOW(), INTERVAL 3 DAY)
      ORDER BY n.created_at DESC
      LIMIT 10
    `);

    let notifications = [];
    let notificationId = 1;

    // Add user registration notifications
    recentUsers.forEach((user) => {
      const isRead = lastReadTime
        ? new Date(user.created_at) <= new Date(lastReadTime)
        : false;

      notifications.push({
        id: notificationId++,
        type: "user_registration",
        message: `New user registered: ${user.name || "Unknown User"}`,
        time: formatTimeAgo(user.created_at),
        read: isRead,
        metadata: {
          userId: user.id,
          userEmail: user.email,
          childrenCount: user.children_count,
          createdAt: user.created_at,
        },
      });
    });

    // Add notifications from notifications table
    userNotifications.forEach((notification) => {
      const userName = notification.user_name || "Unknown User";
      const childInfo = notification.child_name
        ? ` (${notification.child_name})`
        : "";
      const isRead = lastReadTime
        ? new Date(notification.created_at) <= new Date(lastReadTime)
        : false;

      let adminMessage = "";
      switch (notification.type) {
        case "milestone":
          adminMessage = `Milestone achieved by ${userName}${childInfo}: ${notification.message}`;
          break;
        case "reminder":
          adminMessage = `Activity reminder for ${userName}${childInfo}: ${notification.message}`;
          break;
        case "achievement":
          adminMessage = `Achievement unlocked by ${userName}${childInfo}: ${notification.message}`;
          break;
        case "alert":
          adminMessage = `Alert for ${userName}${childInfo}: ${notification.message}`;
          break;
        default:
          adminMessage = `Activity from ${userName}${childInfo}: ${notification.message}`;
      }

      notifications.push({
        id: notificationId++,
        type: `user_${notification.type}`,
        message: adminMessage,
        time: formatTimeAgo(notification.created_at),
        read: isRead,
        metadata: {
          originalNotificationId: notification.id,
          userId: notification.user_name,
          userEmail: notification.user_email,
          childName: notification.child_name,
          originalType: notification.type,
          createdAt: notification.created_at,
        },
      });
    });

    // Sort by most recent (by actual date)
    notifications.sort((a, b) => {
      const timeA = new Date(a.metadata?.createdAt || new Date());
      const timeB = new Date(b.metadata?.createdAt || new Date());
      return timeB - timeA;
    });

    console.log(`📬 Generated ${notifications.length} admin notifications`);
    console.log(
      `👥 ${recentUsers.length} recent users, 📬 ${userNotifications.length} user notifications`
    );

    res.json({
      message: "Admin notifications retrieved successfully",
      notifications: notifications.slice(0, 15), // Limit to 15 most recent
      summary: {
        recentUsers: recentUsers.length,
        userNotifications: userNotifications.length,
        totalGenerated: notifications.length,
        lastReadTime: lastReadTime,
      },
    });
  } catch (error) {
    console.error("❌ Admin notifications error:", error);
    res.status(500).json({
      message: "Failed to fetch admin notifications",
      error: error.message,
    });
  }
};

// 🔔 MARK ADMIN NOTIFICATIONS AS READ
export const markAdminNotificationsAsRead = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const adminId = req.user.id;
    console.log(
      `📬 Marking all admin notifications as read for admin: ${adminId}`
    );

    // Create admin_notification_reads table if not exists
    await db.execute(`
      CREATE TABLE IF NOT EXISTS admin_notification_reads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        admin_id INT NOT NULL,
        marked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX(admin_id)
      )
    `);

    // Insert or update read status for this admin
    await db.execute(
      `
      INSERT INTO admin_notification_reads (admin_id, marked_at) 
      VALUES (?, NOW())
      ON DUPLICATE KEY UPDATE marked_at = NOW()
    `,
      [adminId]
    );

    console.log(`✅ Admin notifications marked as read for admin: ${adminId}`);

    res.json({
      message: "All admin notifications marked as read",
      adminId: adminId,
      markedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Mark admin notifications as read error:", error);
    res.status(500).json({
      message: "Failed to mark admin notifications as read",
      error: error.message,
    });
  }
};
