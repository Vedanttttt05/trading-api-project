import growwApi from "../services/groww.service.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * GET /api/v1/market/quote?exchange=NSE&segment=CASH&trading_symbol=RELIANCE
 * Fetches live market quote for a given instrument.
 * Query params:
 *   - exchange: NSE | BSE | MCX (required)
 *   - segment: CASH | FNO | COMMODITY (required)
 *   - trading_symbol: e.g. RELIANCE, NIFTY (required)
 */
const getLiveQuote = asyncHandler(async (req, res) => {
    const { exchange, segment, trading_symbol } = req.query;

    if (!exchange || !segment || !trading_symbol) {
        throw new ApiError(
            400,
            "exchange, segment, and trading_symbol are required query params"
        );
    }

    const response = await growwApi.get("/live-data/quote", {
        params: { exchange, segment, trading_symbol },
    });

    if (!response.data) {
        throw new ApiError(500, "Failed to fetch live quote");
    }

    return res.status(200).json(
        new ApiResponse(200, "Live quote fetched successfully", response.data)
    );
});

/**
 * GET /api/v1/market/greeks?exchange=NSE&underlying=NIFTY&trading_symbol=NIFTY25O1425100CE&expiry=2025-10-14
 * Fetches option greeks (Delta, Gamma, Theta, Vega, IV) for an F&O contract.
 * Query params:
 *   - exchange: NSE | BSE (required)
 *   - underlying: e.g. NIFTY, BANKNIFTY (required)
 *   - trading_symbol: full option symbol e.g. NIFTY25O1425100CE (required)
 *   - expiry: expiry date in YYYY-MM-DD format (required)
 */
const getOptionGreeks = asyncHandler(async (req, res) => {
    const { exchange, underlying, trading_symbol, expiry } = req.query;

    if (!exchange || !underlying || !trading_symbol || !expiry) {
        throw new ApiError(
            400,
            "exchange, underlying, trading_symbol, and expiry are required query params"
        );
    }

    const response = await growwApi.get(
        `/live-data/greeks/exchange/${exchange}/underlying/${underlying}/trading_symbol/${trading_symbol}/expiry/${expiry}`
    );

    if (!response.data) {
        throw new ApiError(500, "Failed to fetch option greeks");
    }

    return res.status(200).json(
        new ApiResponse(200, "Option greeks fetched successfully", response.data)
    );
});

export { getLiveQuote, getOptionGreeks };