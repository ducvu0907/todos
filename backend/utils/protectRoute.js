import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// middleware for user authentication
export default async function protectRoute(req, res, next) {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - no tokens provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - invalid token" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    req.user = user; // assign user object to the request
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error.message });
  }
}