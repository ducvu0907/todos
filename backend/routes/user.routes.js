import express from "express";
import { getUser, updateUser } from "../controllers/user.controllers.js";
import protectRoute from "../utils/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getUser);
router.post("/:id", protectRoute, updateUser);

export default router;