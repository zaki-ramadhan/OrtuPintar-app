import { db } from "../config/db.js";
import bcrypt from "bcrypt";

// Get all users with pagination and filtering
export const getAllUsers = async (req, res) => {
  try {
    // Disable caching
    res.set("Cache-Control", "no-cache, no-store, must-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");

    const {
      page = 1,
      limit = 10,
      search = "",
      status = "",
      role = "",
      sortBy = "created_at",
    } = req.query;

    const offset = (page - 1) * limit;

    // Build WHERE conditions
    let whereConditions = [];
    let params = [];

    if (search) {
      whereConditions.push("(name LIKE ? OR email LIKE ?)");
      params.push(`%${search}%`, `%${search}%`);
    }

    if (role) {
      whereConditions.push("role = ?");
      params.push(role);
    }

    const whereClause =
      whereConditions.length > 0
        ? `WHERE ${whereConditions.join(" AND ")}`
        : "";

    console.log("🔍 Users query parameters:", {
      page,
      limit,
      search,
      role,
      sortBy,
    });
    console.log("📊 WHERE clause:", whereClause);

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM users ${whereClause}`;
    console.log("🔢 Total count query:", countQuery);

    const countResult = await db.query(countQuery, params);
    const total = countResult[0][0].total;

    console.log("📈 Total users found:", total);
    console.log("🔢 Count result structure:", countResult[0]);

    // Get users with pagination
    const usersQuery = `
      SELECT 
        id, 
        name, 
        email, 
        role, 
        created_at,
        phone,
        location,
        (SELECT COUNT(*) FROM children WHERE user_id = users.id) as children_count
      FROM users 
      ${whereClause}
      ORDER BY ${sortBy} DESC
      LIMIT ? OFFSET ?
    `;

    console.log("🔍 Users query:", usersQuery);
    console.log("🔢 Query params:", [
      ...params,
      parseInt(limit),
      parseInt(offset),
    ]);

    const users = await db.query(usersQuery, [
      ...params,
      parseInt(limit),
      parseInt(offset),
    ]);

    console.log("✅ Users fetched from DB:", users[0].length);
    console.log("👥 Users data (first array only):", users[0]);

    res.json({
      success: true,
      data: users[0], // Take only the data array, not metadata
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};

// Create new user
export const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role = "users",
      phone = "",
      location = "",
    } = req.body;

    console.log("➕ Create user request:", {
      name,
      email,
      role,
      phone,
      location,
      hasPassword: !!password,
    });

    // Validate required fields
    if (!name || !email || !password) {
      console.log("❌ Missing required fields:", {
        name: !!name,
        email: !!email,
        password: !!password,
      });
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    // Check if user already exists
    const [existingUserRows] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    console.log("📧 Email check result:", existingUserRows);

    if (existingUserRows.length > 0) {
      console.log("❌ Email already exists:", email);
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("🔐 Password hashed successfully");

    // Insert new user
    const insertQuery = `
      INSERT INTO users (name, email, password, role, phone, location, created_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;

    console.log("📝 Insert query:", insertQuery);
    console.log("📊 Insert params:", [
      name,
      email,
      "[HIDDEN]",
      role,
      phone,
      location,
    ]);

    const [insertResult] = await db.query(insertQuery, [
      name,
      email,
      hashedPassword,
      role,
      phone,
      location,
    ]);

    console.log("✅ Insert result:", insertResult);
    console.log("🆔 New user ID:", insertResult.insertId);

    // Get the created user
    const [newUserRows] = await db.query(
      "SELECT id, name, email, role, phone, location, created_at FROM users WHERE id = ?",
      [insertResult.insertId]
    );

    console.log("👤 Created user data:", newUserRows[0]);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUserRows[0],
    });
  } catch (error) {
    console.error("❌ Error creating user:", error);
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, phone, location, password } = req.body;

    console.log("🔧 Update user request:", {
      id,
      name,
      email,
      role,
      phone,
      location,
      hasPassword: !!password,
    });

    // Check if user exists
    const [existingUserRows] = await db.query(
      "SELECT id FROM users WHERE id = ?",
      [id]
    );
    console.log("🔍 Existing user check:", existingUserRows);

    if (existingUserRows.length === 0) {
      console.log("❌ User not found:", id);
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if email is taken by another user
    const [emailCheckRows] = await db.query(
      "SELECT id FROM users WHERE email = ? AND id != ?",
      [email, id]
    );
    console.log("📧 Email check result:", emailCheckRows);

    if (emailCheckRows.length > 0) {
      console.log("❌ Email already taken:", email);
      return res.status(400).json({
        success: false,
        message: "Email is already taken by another user",
      });
    }

    // Validate required fields
    if (!name || !email) {
      console.log("❌ Missing required fields:", { name, email });
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    // Prepare update query
    let updateFields = [];
    let params = [];

    if (name) {
      updateFields.push("name = ?");
      params.push(name);
    }

    if (email) {
      updateFields.push("email = ?");
      params.push(email);
    }

    if (role) {
      updateFields.push("role = ?");
      params.push(role);
    }

    if (phone !== undefined) {
      updateFields.push("phone = ?");
      params.push(phone);
    }

    if (location !== undefined) {
      updateFields.push("location = ?");
      params.push(location);
    }

    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      updateFields.push("password = ?");
      params.push(hashedPassword);
    }

    params.push(id);

    console.log("🔧 Update fields:", updateFields);
    console.log("📊 Update params:", params);

    const updateQuery = `UPDATE users SET ${updateFields.join(
      ", "
    )} WHERE id = ?`;

    console.log("📝 Update query:", updateQuery);

    const [updateResult] = await db.query(updateQuery, params);
    console.log("✅ Update result:", updateResult);

    // Get updated user
    const [updatedUserRows] = await db.query(
      "SELECT id, name, email, role, phone, location, created_at FROM users WHERE id = ?",
      [id]
    );

    console.log("👤 Updated user data:", updatedUserRows[0]);

    res.json({
      success: true,
      message: "User updated successfully",
      data: updatedUserRows[0],
    });
  } catch (error) {
    console.error("❌ Error updating user:", error);
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const existingUser = await db.query("SELECT id FROM users WHERE id = ?", [
      id,
    ]);
    if (existingUser.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Don't allow deleting admin users (optional security)
    const userToDelete = await db.query("SELECT role FROM users WHERE id = ?", [
      id,
    ]);
    if (userToDelete[0].role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Cannot delete admin users",
      });
    }

    // Delete related children first (if any)
    await db.query("DELETE FROM children WHERE user_id = ?", [id]);

    // Delete user
    await db.query("DELETE FROM users WHERE id = ?", [id]);

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message,
    });
  }
};

// Export users to CSV
export const exportUsers = async (req, res) => {
  try {
    const users = await db.query(`
      SELECT 
        id, 
        name, 
        email, 
        role, 
        phone,
        location,
        created_at,
        (SELECT COUNT(*) FROM children WHERE user_id = users.id) as children_count
      FROM users 
      ORDER BY created_at DESC
    `);

    // Convert to CSV
    const csvHeader =
      "ID,Name,Email,Role,Phone,Location,Children Count,Registration Date\n";
    const csvData = users
      .map((user) => {
        return `${user.id},"${user.name}","${user.email}","${user.role}","${
          user.phone || ""
        }","${user.location || ""}",${user.children_count},"${new Date(
          user.created_at
        ).toLocaleDateString()}"`;
      })
      .join("\n");

    const csv = csvHeader + csvData;

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=users.csv");
    res.send(csv);
  } catch (error) {
    console.error("Error exporting users:", error);
    res.status(500).json({
      success: false,
      message: "Error exporting users",
      error: error.message,
    });
  }
};

// ==================== ACTIVITIES MANAGEMENT ====================

// Get all activities with pagination and filtering
export const getAllActivitiesAdmin = async (req, res) => {
  try {
    // Disable caching
    res.set("Cache-Control", "no-cache, no-store, must-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");

    const {
      page = 1,
      limit = 10,
      search = "",
      category = "",
      status = "",
      sortBy = "created_at",
    } = req.query;

    const offset = (page - 1) * limit;

    // Build WHERE conditions
    let whereConditions = [];
    let params = [];

    if (search) {
      whereConditions.push("(title LIKE ? OR description LIKE ?)");
      params.push(`%${search}%`, `%${search}%`);
    }

    if (category) {
      whereConditions.push("category = ?");
      params.push(category);
    }

    const whereClause =
      whereConditions.length > 0
        ? `WHERE ${whereConditions.join(" AND ")}`
        : "";

    console.log("🔍 Activities query parameters:", {
      page,
      limit,
      search,
      category,
      status,
      sortBy,
    });

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM activities ${whereClause}`;
    const [countResult] = await db.query(countQuery, params);
    const total = countResult[0].total;

    console.log("📈 Total activities found:", total);

    // Get activities with pagination
    const activitiesQuery = `
      SELECT 
        id, 
        title, 
        description, 
        category, 
        difficulty, 
        duration,
        age_group,
        age_group_min,
        age_group_max,
        icon,
        isMilestone,
        (SELECT COUNT(*) FROM child_activities WHERE activity_id = activities.id) as usage_count
      FROM activities 
      ${whereClause}
      ORDER BY ${sortBy === "created_at" ? "id" : sortBy} DESC
      LIMIT ? OFFSET ?
    `;

    const [activities] = await db.query(activitiesQuery, [
      ...params,
      parseInt(limit),
      parseInt(offset),
    ]);

    console.log("✅ Activities fetched from DB:", activities.length);

    res.json({
      success: true,
      data: activities,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("❌ Error fetching activities:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching activities",
      error: error.message,
    });
  }
};

// Create new activity
export const createActivity = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      difficulty = "easy",
      duration = "15-30 minutes",
      age_group = "1-2 tahun",
      age_group_min = 12,
      age_group_max = 24,
      icon = "🎯",
      isMilestone = 0,
      status = "published",
    } = req.body;

    console.log("➕ Create activity request:", {
      title,
      description,
      category,
      difficulty,
      duration,
      age_group,
      isMilestone,
      status,
    });

    // Validate required fields
    if (!title || !description || !category) {
      console.log("❌ Missing required fields");
      return res.status(400).json({
        success: false,
        message: "Title, description, and category are required",
      });
    }

    // Insert new activity
    const insertQuery = `
      INSERT INTO activities (
        title, description, category, difficulty, duration,
        age_group, age_group_min, age_group_max, icon, isMilestone
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [insertResult] = await db.query(insertQuery, [
      title,
      description,
      category,
      difficulty,
      duration,
      age_group,
      age_group_min,
      age_group_max,
      icon,
      isMilestone,
    ]);

    console.log("✅ Insert result:", insertResult);

    // Get the created activity
    const [newActivityRows] = await db.query(
      "SELECT * FROM activities WHERE id = ?",
      [insertResult.insertId]
    );

    console.log("🎯 Created activity data:", newActivityRows[0]);

    res.status(201).json({
      success: true,
      message: "Activity created successfully",
      data: newActivityRows[0],
    });
  } catch (error) {
    console.error("❌ Error creating activity:", error);
    res.status(500).json({
      success: false,
      message: "Error creating activity",
      error: error.message,
    });
  }
};

// Update activity
export const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      difficulty,
      duration,
      age_group,
      age_group_min,
      age_group_max,
      icon,
      isMilestone,
    } = req.body;

    console.log("🔧 Update activity request:", {
      id,
      title,
      category,
      difficulty,
    });

    // Check if activity exists
    const [existingActivityRows] = await db.query(
      "SELECT id FROM activities WHERE id = ?",
      [id]
    );

    if (existingActivityRows.length === 0) {
      console.log("❌ Activity not found:", id);
      return res.status(404).json({
        success: false,
        message: "Activity not found",
      });
    }

    // Validate required fields
    if (!title || !description || !category) {
      console.log("❌ Missing required fields");
      return res.status(400).json({
        success: false,
        message: "Title, description, and category are required",
      });
    }

    // Prepare update query
    let updateFields = [];
    let params = [];

    updateFields.push("title = ?");
    params.push(title);

    updateFields.push("description = ?");
    params.push(description);

    updateFields.push("category = ?");
    params.push(category);

    if (difficulty !== undefined) {
      updateFields.push("difficulty = ?");
      params.push(difficulty);
    }

    if (duration !== undefined) {
      updateFields.push("duration = ?");
      params.push(duration);
    }

    if (age_group !== undefined) {
      updateFields.push("age_group = ?");
      params.push(age_group);
    }

    if (age_group_min !== undefined) {
      updateFields.push("age_group_min = ?");
      params.push(age_group_min);
    }

    if (age_group_max !== undefined) {
      updateFields.push("age_group_max = ?");
      params.push(age_group_max);
    }

    if (icon !== undefined) {
      updateFields.push("icon = ?");
      params.push(icon);
    }

    if (isMilestone !== undefined) {
      updateFields.push("isMilestone = ?");
      params.push(isMilestone);
    }

    params.push(id);

    const updateQuery = `UPDATE activities SET ${updateFields.join(
      ", "
    )} WHERE id = ?`;

    console.log("📝 Update query:", updateQuery);

    const [updateResult] = await db.query(updateQuery, params);
    console.log("✅ Update result:", updateResult);

    // Get updated activity
    const [updatedActivityRows] = await db.query(
      "SELECT * FROM activities WHERE id = ?",
      [id]
    );

    console.log("🎯 Updated activity data:", updatedActivityRows[0]);

    res.json({
      success: true,
      message: "Activity updated successfully",
      data: updatedActivityRows[0],
    });
  } catch (error) {
    console.error("❌ Error updating activity:", error);
    res.status(500).json({
      success: false,
      message: "Error updating activity",
      error: error.message,
    });
  }
};

// Delete activity
export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("🗑️ Delete activity request:", id);

    // Check if activity exists
    const [existingActivityRows] = await db.query(
      "SELECT id FROM activities WHERE id = ?",
      [id]
    );

    if (existingActivityRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Activity not found",
      });
    }

    // Check if activity is being used by children
    const [usageCheck] = await db.query(
      "SELECT COUNT(*) as count FROM child_activities WHERE activity_id = ?",
      [id]
    );

    if (usageCheck[0].count > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete activity. It is currently being used by ${usageCheck[0].count} children.`,
      });
    }

    // Delete activity
    const [deleteResult] = await db.query(
      "DELETE FROM activities WHERE id = ?",
      [id]
    );

    console.log("✅ Delete result:", deleteResult);

    res.json({
      success: true,
      message: "Activity deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting activity:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting activity",
      error: error.message,
    });
  }
};

// Get activity statistics
export const getActivityStats = async (req, res) => {
  try {
    console.log("📊 Getting activity statistics");

    // Get total counts
    const [totalCountResult] = await db.query(
      "SELECT COUNT(*) as total FROM activities"
    );
    const [milestoneCountResult] = await db.query(
      "SELECT COUNT(*) as milestones FROM activities WHERE isMilestone = 1"
    );

    // Get usage statistics
    const [usageResult] = await db.query(`
      SELECT 
        a.id,
        a.title,
        COUNT(ca.id) as usage_count
      FROM activities a
      LEFT JOIN child_activities ca ON a.id = ca.activity_id
      GROUP BY a.id, a.title
      ORDER BY usage_count DESC
      LIMIT 5
    `);

    const stats = {
      total: totalCountResult[0].total,
      published: totalCountResult[0].total, // Assuming all activities are "published"
      draft: 0, // No draft concept in current schema
      milestones: milestoneCountResult[0].milestones,
      topActivities: usageResult,
    };

    console.log("📈 Activity stats:", stats);

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("❌ Error getting activity stats:", error);
    res.status(500).json({
      success: false,
      message: "Error getting activity statistics",
      error: error.message,
    });
  }
};
