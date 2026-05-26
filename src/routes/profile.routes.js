import { Router } from "express";

import { getProfile } from "../controllers/profile.controller.js";

const router = Router();

router.route("/").get(getProfile);

export default router;