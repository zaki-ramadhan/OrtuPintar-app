import { db } from "../config/db.js";

export const addChild = async (req, res) => {
  const { name, birthDate, gender, photoUrl } = req.body;

  console.log("💡 Add child req.body:", req.body);
  console.log("👤 Auth user:", req.user);

  if (!name || !birthDate || !gender) {
    return res
      .status(400)
      .json({ message: "Name, birthDate, dan gender wajib diisi." });
  }

  // Validate gender enum
  if (!["P", "L"].includes(gender)) {
    return res.status(400).json({
      message: "Gender must be 'P' (Perempuan) or 'L' (Laki-laki)",
    });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO children (user_id, name, birth_date, gender, photo_url, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [req.user.id, name, birthDate, gender, photoUrl || null]
    );

    console.log("✅ Insert child result:", result);

    return res.status(201).json({
      message: "Child berhasil ditambahkan.",
      child: {
        id: result.insertId,
        name,
        birthDate,
        gender,
        photoUrl: photoUrl || null,
        user_id: req.user.id,
      },
    });
  } catch (error) {
    console.error("❌ Add child error:", error.message);
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan saat menambahkan anak." });
  }
};

export const getChildren = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get children with milestone count from child_activities
    const [rows] = await db.query(
      `SELECT 
        c.id, 
        c.name, 
        c.birth_date, 
        c.gender, 
        c.photo_url, 
        c.created_at,
        COUNT(ca.id) as milestones_completed
      FROM children c 
      LEFT JOIN child_activities ca ON c.id = ca.child_id AND ca.status = 'completed'
      WHERE c.user_id = ? 
      GROUP BY c.id
      ORDER BY c.created_at DESC`,
      [userId]
    );

    const children = rows.map((row) => ({
      id: row.id,
      name: row.name,
      birthDate: row.birth_date,
      gender: row.gender,
      photoUrl: row.photo_url,
      createdAt: row.created_at,
      milestones: row.milestones_completed || 0, // Real milestone count
    }));

    return res.status(200).json({
      message: "Children fetched successfully",
      children: children || [],
    });
  } catch (err) {
    console.error("Get children error:", err);
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan sistem.", children: [] });
  }
};

// Update child by ID
export const updateChild = async (req, res) => {
  try {
    const userId = req.user.id;
    const childId = req.params.id;
    const { name, birthDate, gender, photoUrl } = req.body;

    console.log("Updating child:", {
      userId,
      childId,
      name,
      birthDate,
      gender,
      photoUrl,
    });

    // Validate required fields
    if (!name || !birthDate || !gender) {
      return res
        .status(400)
        .json({ message: "Name, birth date, and gender are required" });
    }

    // Validate gender enum
    if (!["P", "L"].includes(gender)) {
      return res.status(400).json({
        message: "Gender must be 'P' (Perempuan) or 'L' (Laki-laki)",
      });
    }

    // Validate childId
    if (!childId || isNaN(childId)) {
      return res.status(400).json({ message: "Invalid child ID" });
    }

    // First, check if the child exists and belongs to the user
    const [checkRows] = await db.query(
      "SELECT id FROM children WHERE id = ? AND user_id = ?",
      [childId, userId]
    );

    if (checkRows.length === 0) {
      return res.status(404).json({
        message: "Child not found or doesn't belong to you",
      });
    }

    // Update the child
    const [result] = await db.query(
      "UPDATE children SET name = ?, birth_date = ?, gender = ?, photo_url = ? WHERE id = ? AND user_id = ?",
      [name, birthDate, gender, photoUrl, childId, userId]
    );

    console.log("Update result:", result);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Child not found or couldn't be updated",
      });
    }

    return res.status(200).json({
      message: "Child updated successfully",
    });
  } catch (err) {
    console.error("Update child error:", err);
    return res.status(500).json({
      message: "Terjadi kesalahan sistem saat mengupdate anak.",
    });
  }
};

// Delete child by ID
export const deleteChild = async (req, res) => {
  try {
    const userId = req.user.id;
    const childId = req.params.id;

    console.log("Deleting child:", { userId, childId });

    // Validate childId
    if (!childId || isNaN(childId)) {
      return res.status(400).json({ message: "Invalid child ID" });
    }

    // First, check if the child exists and belongs to the user
    const [checkRows] = await db.query(
      "SELECT id FROM children WHERE id = ? AND user_id = ?",
      [childId, userId]
    );

    if (checkRows.length === 0) {
      return res.status(404).json({
        message: "Child not found or doesn't belong to you",
      });
    }

    // Delete the child
    const [result] = await db.query(
      "DELETE FROM children WHERE id = ? AND user_id = ?",
      [childId, userId]
    );

    console.log("Delete result:", result);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Child not found or couldn't be deleted",
      });
    }

    return res.status(200).json({
      message: "Child deleted successfully",
    });
  } catch (err) {
    console.error("Delete child error:", err);
    return res.status(500).json({
      message: "Terjadi kesalahan sistem saat menghapus anak.",
    });
  }
};
