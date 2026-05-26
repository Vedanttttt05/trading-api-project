import axios from "axios";
import { getAccessToken } from "./auth.service.js";

const growwApi = axios.create({
    baseURL: "https://api.groww.in/v1",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-API-VERSION": "1.0",
    },
});


growwApi.interceptors.request.use(
    async (config) => {
        const token = await getAccessToken();
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

export default growwApi;