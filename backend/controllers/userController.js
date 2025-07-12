import { db } from "../config/db.js";

export const getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT * FROM users
    `);
    res.json(rows);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Dari middleware verifyToken

    console.log("🔍 Get Profile Request for User ID:", userId);

    // Query yang lebih safe, ambil kolom yang pasti ada dulu
    const [rows] = await db.query(
      `
      SELECT id, name, email, 
             COALESCE(phone, '') as phone, 
             COALESCE(location, '') as location,
             created_at as joinDate
      FROM users 
      WHERE id = ?
    `,
      [userId]
    );

    if (rows.length === 0) {
      console.log("❌ User not found with ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ User profile found:", rows[0]);

    res.json({
      message: "User profile retrieved successfully",
      user: rows[0],
    });
  } catch (err) {
    console.error("❌ Get Profile Error:", err);
    res.status(500).json({
      message: "Error fetching user profile",
      error: err.message,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    console.log("🔄 Update Profile Request:");
    console.log("User ID:", req.user?.id);
    console.log("Request Body:", req.body);

    const userId = req.user.id; // Dari middleware verifyToken
    const { name, email, phone, location } = req.body;

    // Validasi input
    if (!name || !email) {
      console.log("❌ Validation failed: Name and email required");
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("❌ Validation failed: Invalid email format");
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    console.log("✅ Validation passed, checking email uniqueness...");

    // Cek apakah email sudah digunakan user lain
    const [existingUser] = await db.query(
      `
      SELECT id FROM users 
      WHERE email = ? AND id != ?
    `,
      [email, userId]
    );

    if (existingUser.length > 0) {
      console.log("❌ Email already taken by another user");
      return res.status(400).json({
        message: "Email is already taken by another user",
      });
    }

    console.log("✅ Email is unique, updating profile...");

    // Update user profile dengan query yang lebih safe
    // Cek dulu kolom mana yang ada di tabel
    try {
      // Update hanya name dan email dulu (kolom yang pasti ada)
      await db.query(`UPDATE users SET name = ?, email = ? WHERE id = ?`, [
        name,
        email,
        userId,
      ]);
      console.log("✅ Basic profile updated (name, email)");

      // Coba update phone dan location jika kolom ada
      try {
        await db.query(`UPDATE users SET phone = ? WHERE id = ?`, [
          phone || null,
          userId,
        ]);
        console.log("✅ Phone updated");
      } catch (phoneErr) {
        console.log("⚠️ Phone column might not exist:", phoneErr.message);
      }

      try {
        await db.query(`UPDATE users SET location = ? WHERE id = ?`, [
          location || null,
          userId,
        ]);
        console.log("✅ Location updated");
      } catch (locationErr) {
        console.log("⚠️ Location column might not exist:", locationErr.message);
      }
    } catch (updateErr) {
      console.error("❌ Update failed:", updateErr);
      throw updateErr;
    }

    console.log("✅ Profile updated, fetching updated data...");

    // Ambil data user yang sudah diupdate dengan query yang safe
    const [updatedUser] = await db.query(
      `
      SELECT id, name, email, 
             COALESCE(phone, '') as phone, 
             COALESCE(location, '') as location,
             created_at as joinDate
      FROM users 
      WHERE id = ?
    `,
      [userId]
    );

    console.log("✅ Updated user data:", updatedUser[0]);

    res.json({
      message: "Profile updated successfully",
      user: updatedUser[0],
    });
  } catch (err) {
    console.error("❌ Update Profile Error:", err);
    res.status(500).json({
      message: "Error updating user profile",
      error: err.message,
    });
  }
};
