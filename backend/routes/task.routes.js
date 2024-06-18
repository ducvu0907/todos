import express from "express";
import { getTask, getTasksList, createTask, updateTask, deleteTask } from "../controllers/task.controllers.js";
import protectRoute from "../utils/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getTasksList);
router.get("/:id", protectRoute, getTask);
router.post("/", protectRoute, createTask);
router.post("/:id", protectRoute, updateTask);
router.delete("/:id", protectRoute, deleteTask);

export default router;