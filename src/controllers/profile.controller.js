import growwApi from "../services/groww.service.js";

import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getProfile = asyncHandler(async (req, res) => {

    const response = await growwApi.get("/v1/profile");

    if (!response.data) {
        throw new ApiError(404, "Profile not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            "Profile fetched successfully",
            response.data
        )
    );

});

export { getProfile };