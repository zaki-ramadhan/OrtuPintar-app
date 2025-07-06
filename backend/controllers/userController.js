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
