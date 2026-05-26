import growwApi from "../services/groww.service.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * GET /api/v1/portfolio/holdings
 * Fetches all stocks held in the user's DEMAT account.
 */
const getHoldings = asyncHandler(async (req, res) => {
    const response = await growwApi.get("/holdings/user");

    if (!response.data) {
        throw new ApiError(500, "Failed to fetch holdings");
    }

    return res.status(200).json(
        new ApiResponse(200, "Holdings fetched successfully", response.data)
    );
});

/**
 * GET /api/v1/portfolio/positions?segment=CASH
 * Fetches intraday/short-term positions of the user.
 * Query params:
 *   - segment: CASH | FNO | COMMODITY (default: CASH)
 */
const getPositions = asyncHandler(async (req, res) => {
    const { segment = "CASH" } = req.query;

    const response = await growwApi.get("/positions/user", {
        params: { segment },
    });

    if (!response.data) {
        throw new ApiError(500, "Failed to fetch positions");
    }

    return res.status(200).json(
        new ApiResponse(200, "Positions fetched successfully", response.data)
    );
});

export { getHoldings, getPositions };