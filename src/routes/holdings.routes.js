import { Router } from "express";

import { getHoldings } from "../controllers/holdings.controller.js";

const router = Router();

router.route("/").get(getHoldings);

export default router;