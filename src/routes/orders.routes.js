import { Router } from "express";
import { getOrders, getTradesForOrder } from "../controllers/orders.controller.js";

const router = Router();

// GET /api/v1/orders?segment=CASH&page=0&page_size=100
router.route("/").get(getOrders);

// GET /api/v1/orders/:groww_order_id/trades
router.route("/:groww_order_id/trades").get(getTradesForOrder);

export default router;