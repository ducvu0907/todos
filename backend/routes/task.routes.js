import express from "express";
import { getTask, getTaskList, createTask, updateTask, deleteTask } from "../controllers/task.controllers.js";
import protectRoute from "../utils/protectRoute.js";

const router = express.Router();

router.get("/:userId", getTaskList);
router.get("/:userId/:taskId", getTask);
router.post("/create/:userId", createTask);
router.get("/delete/:userId/:taskId", deleteTask);
router.post("/update/:userId", updateTask);

export default router;