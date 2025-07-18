// middleware/verifyAdmin.js
import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.email !== "admin@green.com") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.user = decoded; // optional, in case you need admin info
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
