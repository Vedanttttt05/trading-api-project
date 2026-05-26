import axios from "axios";
import { generateChecksum, getEpochTimestamp } from "../utils/checksum.js";


let cachedToken = null;
let tokenFetchedAt = null;


const isTokenValid = () => {
    if (!cachedToken || !tokenFetchedAt) return false;

    const now = new Date();
    const fetchedAt = new Date(tokenFetchedAt);

    // Build today's 6 AM expiry time
    const expiryToday = new Date();
    expiryToday.setHours(6, 0, 0, 0);

    // If token was fetched before today's 6 AM and it's now past 6 AM → expired
    if (fetchedAt < expiryToday && now >= expiryToday) {
        return false;
    }

    return true;
};


const fetchAccessToken = async () => {
    const apiKey = process.env.GROWW_API_KEY;
    const apiSecret = process.env.GROWW_API_SECRET;

    if (!apiKey || !apiSecret) {
        throw new Error(
            "GROWW_API_KEY and GROWW_API_SECRET must be set in your .env file"
        );
    }

    const timestamp = getEpochTimestamp();
    const checksum = generateChecksum(apiSecret, timestamp);

    const response = await axios.post(
        "https://api.groww.in/v1/token/api/access",
        {
            key_type: "approval",
            checksum,
            timestamp,
        },
        {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }
    );

    const token = response.data?.token;

    if (!token) {
        throw new Error("Groww did not return an access token. Response: " + JSON.stringify(response.data));
    }

    cachedToken = token;
    tokenFetchedAt = Date.now();

    console.log("✅ Groww access token fetched and cached.");
    return token;
};


const getAccessToken = async () => {
    if (isTokenValid()) {
        return cachedToken;
    }
    return await fetchAccessToken();
};

export { getAccessToken };