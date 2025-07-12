import { db } from "../config/db.js";
import bcrypt from "bcrypt";

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

export const changePassword = async (req, res) => {
  try {
    console.log("🔄 Change Password Request:");
    console.log("User ID:", req.user?.id);
    console.log("Request Body:", req.body);

    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    // Validasi input
    if (!currentPassword || !newPassword) {
      console.log("❌ Validation failed: Current and new password required");
      return res.status(400).json({
        message: "Current password and new password are required",
      });
    }

    if (newPassword.length < 8) {
      console.log("❌ Validation failed: New password too short");
      return res.status(400).json({
        message: "New password must be at least 8 characters long",
      });
    }

    console.log("✅ Validation passed, checking current password...");

    // Ambil password user saat ini
    const [user] = await db.query("SELECT password FROM users WHERE id = ?", [
      userId,
    ]);

    if (user.length === 0) {
      console.log("❌ User not found with ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    // Verifikasi password saat ini
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user[0].password
    );

    if (!isCurrentPasswordValid) {
      console.log("❌ Current password is incorrect");
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    console.log("✅ Current password verified, hashing new password...");

    // Hash password baru
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    console.log("✅ New password hashed, updating database...");

    // Update password di database
    await db.query("UPDATE users SET password = ? WHERE id = ?", [
      hashedNewPassword,
      userId,
    ]);

    console.log("✅ Password updated successfully");

    res.json({
      message: "Password changed successfully",
    });
  } catch (err) {
    console.error("❌ Change Password Error:", err);
    res.status(500).json({
      message: "Error changing password",
      error: err.message,
    });
  }
};
