import { db } from "../config/db.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan Password wajib diisi." });
  }

  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password harus minimal 8 digit angka" });
  }

  try {
    const [rows] = await db.query(
      "SELECT id, email, password, role FROM users WHERE email = ? AND password = ? AND role = 'users'",
      [email, password]
    );

    if (rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Email atau Password tidak cocok atau bukan users." });
    }

    return res.json({ user: rows[0] });
  } catch (err) {
    console.error("Login users error:", err);
    return res.status(500).json({ message: "Terjadi kesalahan sistem." });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan Password wajib diisi." });
  }

  try {
    const [rows] = await db.query(
      "SELECT id, email, password, role FROM users WHERE email = ? AND password = ? AND role = 'admin'",
      [email, password]
    );

    if (rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Email atau Password tidak cocok atau bukan admin." });
    }

    return res.json({ user: rows[0] });
  } catch (err) {
    console.error("Login admin error:", err);
    return res.status(500).json({ message: "Terjadi kesalahan sistem." });
  }
};
