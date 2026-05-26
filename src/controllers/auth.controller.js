import { getAccessToken } from "../services/auth.service.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * POST /api/v1/auth/login
 * Generates a Groww access token using API Key + Secret.
 * Token is cached in memory and auto-refreshed after 6 AM daily.
 */
const login = asyncHandler(async (req, res) => {
    const token = await getAccessToken();

    if (!token) {
        throw new ApiError(401, "Failed to generate access token from Groww");
    }

    return res.status(200).json(
        new ApiResponse(200, "Login successful. Access token generated.", {
            access_token: token,
            note: "Token expires daily at 6:00 AM. It will be auto-refreshed on next request.",
        })
    );
});

export { login };