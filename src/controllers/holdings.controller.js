import growwApi from "../services/groww.service.js";

import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getHoldings = asyncHandler(async (req, res) => {

    const response = await growwApi.get("/holdings/user");

    if (!response.data) {
        throw new ApiError(500, "Failed to fetch holdings");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            "Holdings fetched successfully",
            response.data
        )
    );

});

export { getHoldings };