import { db } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Helper untuk generate JWT token
const generateToken = (user) => {
  console.log("🚀 Generating token for:", user);
  const secret = process.env.JWT_SECRET;
  console.log("✅ JWT_SECRET:", secret);
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    secret,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    }
  );
};

// 🔑 LOGIN USER
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("🔑 LoginUser request body:", req.body);

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

    console.log("🗂️ DB rows:", rows);

    if (rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Email tidak ditemukan atau bukan users." });
    }

    const user = rows[0];
    console.log("👤 Found user:", user);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔑 Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Password salah." });
    }

    const token = generateToken(user);
    console.log("✅ Generated Token:", token);

    const { password: userPassword, ...userData } = user;

    return res.json({
      message: "Login berhasil.",
      user: userData,
      token,
    });
  } catch (err) {
    console.error("❌ Login users error:", err);
    return res.status(500).json({ message: "Terjadi kesalahan sistem." });
  }
};

// 🔑 LOGIN ADMIN
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  console.log("🔑 LoginAdmin request body:", req.body);

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan Password wajib diisi." });
  }

  try {
    const [rows] = await db.query(
      "SELECT id, name, email, password, role FROM users WHERE email = ? AND role = 'admin'",
      [email]
    );

    console.log("🗂️ DB rows:", rows);

    if (rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Email tidak ditemukan atau bukan admin." });
    }

    const user = rows[0];
    console.log("👤 Found admin:", user);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔑 Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Password salah." });
    }

    const token = generateToken(user);
    console.log("✅ Generated Token:", token);

    const { password: userPassword, ...userData } = user;

    return res.json({
      message: "Login admin berhasil.",
      user: userData,
      token,
    });
  } catch (err) {
    console.error("❌ Login admin error:", err);
    return res.status(500).json({ message: "Terjadi kesalahan sistem." });
  }
};

// 📝 REGISTER USER
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("📝 Register request body:", req.body);

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Semua field wajib diisi." });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password minimal 8 karakter." });
  }

  try {
    const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);

    console.log("🗂️ Existing check:", existing);

    if (existing.length > 0) {
      return res.status(409).json({ message: "Email sudah terdaftar." });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log("🔒 Hashed password:", hashedPassword);

    const [result] = await db.query(
      "INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())",
      [name, email, hashedPassword, "users"]
    );

    console.log("✅ Insert result:", result);

    const userId = result.insertId;

    const user = {
      id: userId,
      name,
      email,
      role: "users",
    };

    const token = generateToken(user);
    console.log("✅ Generated Token:", token);

    return res.status(201).json({
      message: "Registrasi berhasil.",
      user,
      token,
    });
  } catch (err) {
    console.error("❌ Register error:", err);
    return res.status(500).json({ message: "Terjadi kesalahan sistem." });
  }
};
