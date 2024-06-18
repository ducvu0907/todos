import express from "express";
import { getUser, updateUser } from "../controllers/user.controllers.js";
import protectRoute from "../utils/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getUser);
router.post("/", protectRoute, updateUser);

export default router;