import { db } from "../config/db.js";
import bcrypt from "bcrypt";
import PDFDocument from "pdfkit";

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
    console.log("📊 Starting CSV export for users...");

    const [users] = await db.query(`
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

    console.log(`📊 Found ${users.length} users for CSV export`);
    console.log("🔍 All users data for CSV:", users);

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

// Export users to PDF
export const exportUsersPDF = async (req, res) => {
  try {
    console.log("📋 Starting PDF export for users...");

    // Fetch users data with complete information - using same query as getAllUsers
    const [users] = await db.query(`
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
      ORDER BY created_at DESC
    `);

    console.log(`📊 Found ${users.length} users for PDF export`);
    console.log("🔍 All users data for PDF:", users);

    // Use all users for export - no filtering needed
    const safeUsers = users.map((user) => ({
      id: user.id || 0,
      name: user.name || "Unknown",
      email: user.email || "No email",
      role: user.role || "users",
      created_at: user.created_at || new Date(),
      phone: user.phone || "",
      location: user.location || "",
      children_count: user.children_count || 0,
    }));

    console.log("✅ Safe users data prepared:", safeUsers.length);

    // Set response headers first
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=users-report.pdf"
    );

    // Create PDF document
    const doc = new PDFDocument({ margin: 50, size: "A4" });

    // Pipe PDF to response immediately
    doc.pipe(res);

    // Add header
    doc
      .fontSize(20)
      .fillColor("#2563eb")
      .text("OrtuPintar - Users Report", { align: "center" });

    doc.moveDown();
    doc
      .fontSize(12)
      .fillColor("#666666")
      .text(
        `Generated on: ${new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}`,
        { align: "center" }
      );

    doc.moveDown();
    doc.text(`Total Users: ${safeUsers.length}`, { align: "center" });

    doc.moveDown(2);

    // Add summary stats
    const adminCount = safeUsers.filter((u) => u.role === "admin").length;
    const regularUserCount = safeUsers.filter((u) => u.role === "users").length;
    const totalChildren = safeUsers.reduce(
      (sum, u) => sum + (parseInt(u.children_count) || 0),
      0
    );

    doc
      .fontSize(14)
      .fillColor("#1f2937")
      .text("Summary Statistics", { underline: true });

    doc.moveDown(0.5);
    doc
      .fontSize(12)
      .text(`• Total Users: ${safeUsers.length}`)
      .text(`• Admin Users: ${adminCount}`)
      .text(`• Regular Users: ${regularUserCount}`)
      .text(`• Total Children: ${totalChildren}`)
      .text(
        `• Average Children per User: ${
          users.length > 0 ? (totalChildren / users.length).toFixed(1) : 0
        }`
      );

    doc.moveDown(2);

    // Table header
    doc
      .fontSize(14)
      .fillColor("#1f2937")
      .text("User Details", { underline: true });

    doc.moveDown();

    // Table setup
    const tableTop = doc.y;
    const itemHeight = 25;
    let currentY = tableTop;

    // Draw table header
    doc.fontSize(10).fillColor("#374151").font("Helvetica-Bold");

    const colWidths = {
      id: 30,
      name: 100,
      email: 120,
      role: 50,
      phone: 80,
      location: 80,
      children: 40,
      date: 80,
    };

    let currentX = 50;
    doc.text("ID", currentX, currentY, { width: colWidths.id, align: "left" });
    currentX += colWidths.id;
    doc.text("Name", currentX, currentY, {
      width: colWidths.name,
      align: "left",
    });
    currentX += colWidths.name;
    doc.text("Email", currentX, currentY, {
      width: colWidths.email,
      align: "left",
    });
    currentX += colWidths.email;
    doc.text("Role", currentX, currentY, {
      width: colWidths.role,
      align: "left",
    });
    currentX += colWidths.role;
    doc.text("Phone", currentX, currentY, {
      width: colWidths.phone,
      align: "left",
    });
    currentX += colWidths.phone;
    doc.text("Location", currentX, currentY, {
      width: colWidths.location,
      align: "left",
    });
    currentX += colWidths.location;
    doc.text("Children", currentX, currentY, {
      width: colWidths.children,
      align: "center",
    });
    currentX += colWidths.children;
    doc.text("Joined", currentX, currentY, {
      width: colWidths.date,
      align: "left",
    });

    // Draw header line
    currentY += 15;
    doc.moveTo(50, currentY).lineTo(550, currentY).stroke();

    currentY += 10;

    // Draw table rows
    doc.font("Helvetica").fontSize(9);

    safeUsers.forEach((user, index) => {
      // Check if we need a new page
      if (currentY > 700) {
        doc.addPage();
        currentY = 50;

        // Redraw header on new page
        doc.fontSize(10).fillColor("#374151").font("Helvetica-Bold");

        let headerX = 50;
        doc.text("ID", headerX, currentY, {
          width: colWidths.id,
          align: "left",
        });
        headerX += colWidths.id;
        doc.text("Name", headerX, currentY, {
          width: colWidths.name,
          align: "left",
        });
        headerX += colWidths.name;
        doc.text("Email", headerX, currentY, {
          width: colWidths.email,
          align: "left",
        });
        headerX += colWidths.email;
        doc.text("Role", headerX, currentY, {
          width: colWidths.role,
          align: "left",
        });
        headerX += colWidths.role;
        doc.text("Phone", headerX, currentY, {
          width: colWidths.phone,
          align: "left",
        });
        headerX += colWidths.phone;
        doc.text("Location", headerX, currentY, {
          width: colWidths.location,
          align: "left",
        });
        headerX += colWidths.location;
        doc.text("Children", headerX, currentY, {
          width: colWidths.children,
          align: "center",
        });
        headerX += colWidths.children;
        doc.text("Joined", headerX, currentY, {
          width: colWidths.date,
          align: "left",
        });

        currentY += 15;
        doc.moveTo(50, currentY).lineTo(550, currentY).stroke();
        currentY += 10;

        doc.font("Helvetica").fontSize(9);
      }

      // Alternate row colors
      if (index % 2 === 0) {
        doc
          .rect(50, currentY - 2, 500, itemHeight - 5)
          .fillAndStroke("#f9fafb", "#f9fafb");
      }

      doc.fillColor("#374151");

      let rowX = 50;

      // Safely handle user.id
      const userId = user.id ? String(user.id) : "N/A";
      doc.text(userId, rowX, currentY, {
        width: colWidths.id,
        align: "left",
      });
      rowX += colWidths.id;

      // Safely handle user.name
      const userName = user.name ? String(user.name) : "N/A";
      doc.text(userName, rowX, currentY, {
        width: colWidths.name,
        align: "left",
        ellipsis: true,
      });
      rowX += colWidths.name;

      // Safely handle user.email
      const userEmail = user.email ? String(user.email) : "N/A";
      doc.text(userEmail, rowX, currentY, {
        width: colWidths.email,
        align: "left",
        ellipsis: true,
      });
      rowX += colWidths.email;

      // Safely handle user.role
      const userRole = user.role === "admin" ? "Admin" : "User";
      doc.text(userRole, rowX, currentY, {
        width: colWidths.role,
        align: "left",
      });
      rowX += colWidths.role;

      // Safely handle user.phone
      const userPhone = user.phone ? String(user.phone) : "-";
      doc.text(userPhone, rowX, currentY, {
        width: colWidths.phone,
        align: "left",
        ellipsis: true,
      });
      rowX += colWidths.phone;

      // Safely handle user.location
      const userLocation = user.location ? String(user.location) : "-";
      doc.text(userLocation, rowX, currentY, {
        width: colWidths.location,
        align: "left",
        ellipsis: true,
      });
      rowX += colWidths.location;

      // Safely handle children_count
      const childrenCount = user.children_count
        ? String(user.children_count)
        : "0";
      doc.text(childrenCount, rowX, currentY, {
        width: colWidths.children,
        align: "center",
      });
      rowX += colWidths.children;

      // Safely handle created_at
      let joinDate = "N/A";
      if (user.created_at) {
        try {
          joinDate = new Date(user.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "2-digit",
          });
        } catch (e) {
          joinDate = "Invalid Date";
        }
      }
      doc.text(joinDate, rowX, currentY, {
        width: colWidths.date,
        align: "left",
      });

      currentY += itemHeight;
    });

    // Add footer
    doc.moveDown(2);
    doc
      .fontSize(8)
      .fillColor("#9ca3af")
      .text(
        `Report generated by OrtuPintar Admin Dashboard • ${new Date().toLocaleDateString()}`,
        50,
        doc.page.height - 50,
        { align: "center" }
      );

    // Finalize PDF
    doc.end();

    console.log("✅ PDF export completed successfully");
  } catch (error) {
    console.error("Error exporting users to PDF:", error);

    // If headers haven't been sent yet, send error response
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Error exporting users to PDF",
        error: error.message,
      });
    }
  }
};

// Export users to PDF
export const exportUsersToPDF = async (req, res) => {
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

    // Create a document
    const doc = new PDFDocument();
    let filename = "users.pdf";
    // Set response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    // Pipe the PDF into the response
    doc.pipe(res);

    // Add document content
    doc.fontSize(20).text("Users Report", { align: "center" });
    doc.moveDown();

    // Table header
    doc
      .fontSize(12)
      .text(
        "ID\tName\tEmail\tRole\tPhone\tLocation\tChildren Count\tRegistration Date",
        {
          align: "left",
          width: 500,
        }
      );
    doc.moveDown(0.5);

    // Table rows
    users.forEach((user) => {
      doc.text(
        `${user.id}\t${user.name}\t${user.email}\t${user.role}\t${
          user.phone || ""
        }\t${user.location || ""}\t${user.children_count}\t${new Date(
          user.created_at
        ).toLocaleDateString()}`,
        {
          align: "left",
          width: 500,
        }
      );
    });

    // Finalize the PDF and end the response
    doc.end();
  } catch (error) {
    console.error("Error exporting users to PDF:", error);
    res.status(500).json({
      success: false,
      message: "Error exporting users to PDF",
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

    if (status) {
      if (status === "milestone") {
        whereConditions.push("isMilestone = 1");
      } else if (status === "regular") {
        whereConditions.push("isMilestone = 0");
      }
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
      age_group = "0-6 months",
      age_group_min = 0,
      age_group_max = 6,
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
      age_group_min,
      age_group_max,
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

// Get activity categories from database enum
export const getActivityCategories = async (req, res) => {
  try {
    // Query to get enum values from activities table category column
    const [rows] = await db.query(`
      SHOW COLUMNS FROM activities LIKE 'category'
    `);

    if (rows && rows.length > 0) {
      // Extract enum values from the Type field
      const enumType = rows[0].Type;
      const enumMatch = enumType.match(/enum\((.*)\)/i);

      if (enumMatch) {
        // Parse enum values and clean them
        const enumValues = enumMatch[1]
          .split(",")
          .map((value) => value.replace(/'/g, "").trim());

        console.log("📋 Activity categories from database:", enumValues);

        res.json({
          success: true,
          data: enumValues,
        });
      } else {
        throw new Error("Could not parse enum values");
      }
    } else {
      throw new Error("Category column not found");
    }
  } catch (error) {
    console.error("❌ Error fetching activity categories:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching activity categories",
      error: error.message,
    });
  }
};

// Get activity difficulties from database enum
export const getActivityDifficulties = async (req, res) => {
  try {
    // Query to get enum values from activities table difficulty column
    const [rows] = await db.query(`
      SHOW COLUMNS FROM activities LIKE 'difficulty'
    `);

    if (rows && rows.length > 0) {
      // Extract enum values from the Type field
      const enumType = rows[0].Type;
      const enumMatch = enumType.match(/enum\((.*)\)/i);

      if (enumMatch) {
        // Parse enum values and clean them
        const enumValues = enumMatch[1]
          .split(",")
          .map((value) => value.replace(/'/g, "").trim());

        console.log("📋 Activity difficulties from database:", enumValues);

        res.json({
          success: true,
          data: enumValues,
        });
      } else {
        throw new Error("Could not parse enum values");
      }
    } else {
      throw new Error("Difficulty column not found");
    }
  } catch (error) {
    console.error("❌ Error fetching activity difficulties:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching activity difficulties",
      error: error.message,
    });
  }
};

// Migration: Fix age_group format from Indonesian to English
export const migrateAgeGroupFormat = async (req, res) => {
  try {
    console.log("🔄 Starting age_group format migration...");

    // Define mapping for Indonesian to English
    const ageGroupMapping = {
      "0-6 bulan": "0-6 months",
      "6-12 bulan": "6-12 months",
      "1-2 tahun": "1-2 years",
      "2-3 tahun": "2-3 years",
      "3-4 tahun": "3-4 years",
      "4-5 tahun": "4-5 years",
      "5-6 tahun": "5-6 years",
    };

    let updatedCount = 0;

    // Update each mapping
    for (const [indonesian, english] of Object.entries(ageGroupMapping)) {
      const updateQuery = `
        UPDATE activities 
        SET age_group = ? 
        WHERE age_group = ?
      `;

      const result = await db.query(updateQuery, [english, indonesian]);
      const affected = result[0].affectedRows;

      if (affected > 0) {
        console.log(
          `✅ Updated ${affected} activities: "${indonesian}" → "${english}"`
        );
        updatedCount += affected;
      }
    }

    console.log(
      `🎉 Migration completed! Total updated: ${updatedCount} activities`
    );

    res.json({
      success: true,
      message: "Age group format migration completed",
      data: {
        totalUpdated: updatedCount,
        mapping: ageGroupMapping,
      },
    });
  } catch (error) {
    console.error("❌ Migration error:", error);
    res.status(500).json({
      success: false,
      message: "Migration failed",
      error: error.message,
    });
  }
};

// Export activities to CSV
export const exportActivities = async (req, res) => {
  try {
    console.log("📊 Starting CSV export for activities...");

    const [activities] = await db.query(`
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
        created_at,
        (SELECT COUNT(*) FROM child_activities WHERE activity_id = activities.id) as usage_count
      FROM activities 
      ORDER BY created_at DESC
    `);

    console.log(`📊 Found ${activities.length} activities for CSV export`);
    console.log("🔍 All activities data for CSV:", activities);

    // Convert to CSV
    const csvHeader =
      "ID,Title,Description,Category,Difficulty,Duration,Age Group,Min Age,Max Age,Icon,Is Milestone,Usage Count,Created Date\n";
    const csvData = activities
      .map((activity) => {
        return `${activity.id},"${
          activity.title
        }","${activity.description.replace(/"/g, '""')}","${
          activity.category
        }","${activity.difficulty}","${activity.duration}","${
          activity.age_group
        }",${activity.age_group_min},${activity.age_group_max},"${
          activity.icon
        }","${activity.isMilestone ? "Yes" : "No"}",${
          activity.usage_count
        },"${new Date(activity.created_at).toLocaleDateString()}"`;
      })
      .join("\n");

    const csv = csvHeader + csvData;

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=activities.csv");
    res.send(csv);
  } catch (error) {
    console.error("Error exporting activities:", error);
    res.status(500).json({
      success: false,
      message: "Error exporting activities",
      error: error.message,
    });
  }
};

// Export activities to PDF
export const exportActivitiesPDF = async (req, res) => {
  try {
    console.log("📋 Starting PDF export for activities...");

    // Fetch activities data with complete information
    const [activities] = await db.query(`
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
        created_at,
        (SELECT COUNT(*) FROM child_activities WHERE activity_id = activities.id) as usage_count
      FROM activities 
      ORDER BY created_at DESC
    `);

    console.log(`📊 Found ${activities.length} activities for PDF export`);
    console.log("🔍 All activities data for PDF:", activities);

    // Use all activities for export - no filtering needed
    const safeActivities = activities.map((activity) => ({
      id: activity.id || 0,
      title: activity.title || "Untitled",
      description: activity.description || "No description",
      category: activity.category || "uncategorized",
      difficulty: activity.difficulty || "easy",
      duration: activity.duration || "Unknown",
      age_group: activity.age_group || "All ages",
      icon: activity.icon || "🎯",
      isMilestone: activity.isMilestone || 0,
      usage_count: activity.usage_count || 0,
      created_at: activity.created_at || new Date(),
    }));

    console.log("✅ Safe activities data prepared:", safeActivities.length);

    // Set response headers first
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=activities-report.pdf"
    );

    // Create PDF document
    const doc = new PDFDocument({
      margin: 50,
      size: "A4",
    });

    // Pipe to response
    doc.pipe(res);

    // Header
    doc.fontSize(20).text("OrtuPintar - Activities Report", 50, 50);
    doc
      .fontSize(12)
      .text(`Generated on: ${new Date().toLocaleDateString()}`, 50, 80);
    doc.text(`Total Activities: ${safeActivities.length}`, 50, 100);

    // Statistics Summary
    const milestoneCount = safeActivities.filter(
      (a) => a.isMilestone === 1
    ).length;
    const totalUsage = safeActivities.reduce(
      (sum, a) => sum + a.usage_count,
      0
    );
    const categories = [...new Set(safeActivities.map((a) => a.category))];

    doc.fontSize(14).text("Summary Statistics:", 50, 130);
    doc
      .fontSize(10)
      .text(`• Total Activities: ${safeActivities.length}`, 70, 150)
      .text(`• Milestone Activities: ${milestoneCount}`, 70, 165)
      .text(
        `• Regular Activities: ${safeActivities.length - milestoneCount}`,
        70,
        180
      )
      .text(`• Total Usage Count: ${totalUsage}`, 70, 195)
      .text(
        `• Categories: ${categories.length} (${categories.join(", ")})`,
        70,
        210
      );

    // Table header
    let yPosition = 250;
    doc.fontSize(8);

    // Check if we need a new page
    if (yPosition > 750) {
      doc.addPage();
      yPosition = 50;
    }

    // Table headers
    doc.rect(50, yPosition, 500, 20).stroke();
    doc.text("ID", 55, yPosition + 5, { width: 30 });
    doc.text("Title", 90, yPosition + 5, { width: 120 });
    doc.text("Category", 215, yPosition + 5, { width: 60 });
    doc.text("Difficulty", 280, yPosition + 5, { width: 50 });
    doc.text("Age Group", 335, yPosition + 5, { width: 60 });
    doc.text("Milestone", 400, yPosition + 5, { width: 50 });
    doc.text("Usage", 455, yPosition + 5, { width: 40 });
    doc.text("Created", 500, yPosition + 5, { width: 50 });

    yPosition += 20;

    // Table data
    safeActivities.forEach((activity) => {
      // Check if we need a new page
      if (yPosition > 750) {
        doc.addPage();
        yPosition = 50;

        // Re-draw headers on new page
        doc.rect(50, yPosition, 500, 20).stroke();
        doc.text("ID", 55, yPosition + 5, { width: 30 });
        doc.text("Title", 90, yPosition + 5, { width: 120 });
        doc.text("Category", 215, yPosition + 5, { width: 60 });
        doc.text("Difficulty", 280, yPosition + 5, { width: 50 });
        doc.text("Age Group", 335, yPosition + 5, { width: 60 });
        doc.text("Milestone", 400, yPosition + 5, { width: 50 });
        doc.text("Usage", 455, yPosition + 5, { width: 40 });
        doc.text("Created", 500, yPosition + 5, { width: 50 });
        yPosition += 20;
      }

      doc.rect(50, yPosition, 500, 15).stroke();
      doc.text(activity.id.toString(), 55, yPosition + 2, { width: 30 });
      doc.text(activity.title.substring(0, 20), 90, yPosition + 2, {
        width: 120,
      });
      doc.text(activity.category, 215, yPosition + 2, { width: 60 });
      doc.text(activity.difficulty, 280, yPosition + 2, { width: 50 });
      doc.text(activity.age_group, 335, yPosition + 2, { width: 60 });
      doc.text(activity.isMilestone ? "Yes" : "No", 400, yPosition + 2, {
        width: 50,
      });
      doc.text(activity.usage_count.toString(), 455, yPosition + 2, {
        width: 40,
      });
      doc.text(
        new Date(activity.created_at).toLocaleDateString(),
        500,
        yPosition + 2,
        { width: 50 }
      );

      yPosition += 15;
    });

    // Footer
    const footerY = yPosition + 30;
    doc
      .fontSize(8)
      .text(
        `Report generated by OrtuPintar Admin System - ${new Date().toLocaleString()}`,
        50,
        footerY,
        { align: "center" }
      );

    // Finalize the PDF and end the response
    doc.end();
  } catch (error) {
    console.error("Error exporting activities to PDF:", error);
    res.status(500).json({
      success: false,
      message: "Error exporting activities to PDF",
      error: error.message,
    });
  }
};
