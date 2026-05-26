import { Router } from "express";
import { login } from "../controllers/auth.controller.js";

const router = Router();

// POST /api/v1/auth/login
router.route("/login").post(login);

export default router;