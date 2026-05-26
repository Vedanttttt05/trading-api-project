import growwApi from "../services/groww.service.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const getMargin = asyncHandler(async (req, res) => {
    const response = await growwApi.get("/margins/detail/user");

    if (!response.data) {
        throw new ApiError(500, "Failed to fetch margin details");
    }

    return res.status(200).json(
        new ApiResponse(200, "Margin details fetched successfully", response.data)
    );
});

export { getMargin };