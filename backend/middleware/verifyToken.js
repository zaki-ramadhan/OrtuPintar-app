import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("🔑 Incoming Auth Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(403)
      .json({ message: "Token tidak valid atau tidak ada." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token decoded:", decoded);
    req.user = decoded; // inject ke req.user biar dipakai di controller
    next();
  } catch (error) {
    console.error("❌ Token verification failed:", error.message);
    return res.status(403).json({ message: "Token invalid atau expired." });
  }
};
