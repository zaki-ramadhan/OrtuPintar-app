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

    // Check if user already exists
    const existingUser = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const insertQuery = `
      INSERT INTO users (name, email, password, role, phone, location, created_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;

    const result = await db.query(insertQuery, [
      name,
      email,
      hashedPassword,
      role,
      phone,
      location,
    ]);

    // Get the created user
    const newUser = await db.query(
      "SELECT id, name, email, role, phone, location, created_at FROM users WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser[0],
    });
  } catch (error) {
    console.error("Error creating user:", error);
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

    // Check if email is taken by another user
    const emailCheck = await db.query(
      "SELECT id FROM users WHERE email = ? AND id != ?",
      [email, id]
    );
    if (emailCheck.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email is already taken by another user",
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

    const updateQuery = `UPDATE users SET ${updateFields.join(
      ", "
    )} WHERE id = ?`;
    await db.query(updateQuery, params);

    // Get updated user
    const updatedUser = await db.query(
      "SELECT id, name, email, role, phone, location, created_at FROM users WHERE id = ?",
      [id]
    );

    res.json({
      success: true,
      message: "User updated successfully",
      data: updatedUser[0],
    });
  } catch (error) {
    console.error("Error updating user:", error);
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
