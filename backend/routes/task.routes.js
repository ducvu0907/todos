import express from "express";
import { getTask, getTasksList, createTask } from "../controllers/task.controllers.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const router = express.Router();

// middleware to authenticate users
const protectRoute = async (req, res, next) => {
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
};

router.get("/", protectRoute, getTasksList);
router.get("/:id", protectRoute, getTask);
router.post("/", protectRoute, createTask);

export default router;