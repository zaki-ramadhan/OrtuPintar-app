import { db } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Helper generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    }
  );
};

// Login Users
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan Password wajib diisi." });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password harus minimal 8 karakter." });
  }

  try {
    const [rows] = await db.query(
      "SELECT id, name, email, password, role FROM users WHERE email = ? AND role = 'users'",
      [email]
    );

    if (rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Email tidak ditemukan atau bukan users." });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password salah." });
    }

    // Buat token
    const token = generateToken(user);

    // Jangan return password
    const { password: userPassword, ...userData } = user;

    return res.json({
      message: "Login berhasil.",
      user: userData,
      token,
    });
  } catch (err) {
    console.error("Login users error:", err);
    return res.status(500).json({ message: "Terjadi kesalahan sistem." });
  }
};

// Login Admin
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan Password wajib diisi." });
  }

  try {
    const [rows] = await db.query(
      "SELECT id, name, email, password, role FROM users WHERE email = ? AND role = 'admin'",
      [email]
    );

    if (rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Email tidak ditemukan atau bukan admin." });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password salah." });
    }

    const token = generateToken(user);
    const { password: userPassword, ...userData } = user;

    return res.json({
      message: "Login admin berhasil.",
      user: userData,
      token,
    });
  } catch (err) {
    console.error("Login admin error:", err);
    return res.status(500).json({ message: "Terjadi kesalahan sistem." });
  }
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Validasi input
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Semua field wajib diisi." });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password minimal 8 karakter." });
  }

  try {
    // 2. Cek email sudah terdaftar belum
    const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);

    if (existing.length > 0) {
      return res.status(409).json({ message: "Email sudah terdaftar." });
    }

    // 3. Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4. Insert user baru
    const [result] = await db.query(
      "INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())",
      [name, email, hashedPassword, "users"]
    );

    // 5. Ambil user ID
    const userId = result.insertId;

    const user = {
      id: userId,
      name,
      email,
      role: "users",
    };

    // 6. Generate token
    const token = jwt.sign(
      { id: userId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    // 7. Return response
    return res.status(201).json({
      message: "Registrasi berhasil.",
      user,
      token,
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Terjadi kesalahan sistem." });
  }
};
