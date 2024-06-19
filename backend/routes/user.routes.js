import express from "express";
import { getUser, updateUser } from "../controllers/user.controllers.js";
import protectRoute from "../utils/protectRoute.js";

const router = express.Router();

router.get("/:userId", getUser);
router.post("/:userId", updateUser);

export default router;