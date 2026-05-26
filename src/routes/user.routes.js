import { Router } from "express";
import { getProfile } from "../controllers/user.controller.js";

const router = Router();

router.route("/profile").get(getProfile);

export default router;