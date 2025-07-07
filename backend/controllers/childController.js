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

    const [rows] = await db.query(
      "SELECT id, name, birth_date, gender, photo_url, created_at FROM children WHERE user_id = ?",
      [userId]
    );

    const children = rows.map((row) => ({
      id: row.id,
      name: row.name,
      birthDate: row.birth_date, // bisa kamu format di frontend
      gender: row.gender,
      photoUrl: row.photo_url,
      createdAt: row.created_at,
    }));

    return res.status(200).json({
      message: "Children fetched successfully",
      children: children || [], // fallback biar gak undefined
    });
  } catch (err) {
    console.error("Get children error:", err);
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan sistem.", children: [] });
  }
};
