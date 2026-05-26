import growwApi from "../services/groww.service.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * GET /api/v1/orders?segment=CASH&page=0&page_size=100
 * Fetches the order book (all orders including rejected ones).
 * Query params:
 *   - segment: CASH | FNO | COMMODITY (default: CASH)
 *   - page: page number (default: 0)
 *   - page_size: orders per page (default: 100)
 */
const getOrders = asyncHandler(async (req, res) => {
    const { segment = "CASH", page = 0, page_size = 100 } = req.query;

    const response = await growwApi.get("/order/list", {
        params: { segment, page, page_size },
    });

    if (!response.data) {
        throw new ApiError(500, "Failed to fetch order book");
    }

    return res.status(200).json(
        new ApiResponse(200, "Order book fetched successfully", response.data)
    );
});

/**
 * GET /api/v1/orders/:groww_order_id/trades?segment=CASH
 * Fetches all trades (executions) for a specific order.
 * An order can be split into multiple trades at the exchange.
 */
const getTradesForOrder = asyncHandler(async (req, res) => {
    const { groww_order_id } = req.params;
    const { segment = "CASH" } = req.query;

    if (!groww_order_id) {
        throw new ApiError(400, "groww_order_id is required");
    }

    const response = await growwApi.get(`/order/trades/${groww_order_id}`, {
        params: { segment },
    });

    if (!response.data) {
        throw new ApiError(404, "No trades found for this order");
    }

    return res.status(200).json(
        new ApiResponse(200, "Trades fetched successfully", response.data)
    );
});

export { getOrders, getTradesForOrder };