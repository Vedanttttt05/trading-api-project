import { Router } from "express";
import { getMargin } from "../controllers/margin.controller.js";

const router = Router();

// GET /api/v1/margin
router.route("/").get(getMargin);

export default router;