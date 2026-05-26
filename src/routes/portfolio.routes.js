import { Router } from "express";
import { getHoldings, getPositions } from "../controllers/portfolio.controller.js";

const router = Router();

// GET /api/v1/portfolio/holdings
router.route("/holdings").get(getHoldings);

// GET /api/v1/portfolio/positions?segment=CASH
router.route("/positions").get(getPositions);

export default router;