import express from "express";
import { getTask, getTaskList, createTask, updateTask, deleteTask } from "../controllers/task.controllers.js";
import protectRoute from "../utils/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getTask);
router.get("/", protectRoute, getTaskList);
router.post("/", protectRoute, createTask);
router.post("/:id", protectRoute, updateTask);
router.delete("/:id", protectRoute, deleteTask);

export default router;