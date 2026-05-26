import { Router } from "express";
import { getLiveQuote, getOptionGreeks } from "../controllers/market.controller.js";

const router = Router();

// GET /api/v1/market/quote?exchange=NSE&segment=CASH&trading_symbol=RELIANCE
router.route("/quote").get(getLiveQuote);

// GET /api/v1/market/greeks?exchange=NSE&underlying=NIFTY&trading_symbol=NIFTY25O1425100CE&expiry=2025-10-14
router.route("/greeks").get(getOptionGreeks);

export default router;