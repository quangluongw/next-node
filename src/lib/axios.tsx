import axios from "axios";
import { clearAccessToken } from "./utils";
import { refreshAccessToken } from "@/services/refreshAccessToken";

const BASE_URL = "https://be-nodejs-three.vercel.app/api";

let accessToken: string | null = null;

const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu token hết hạn, cố gắng làm mới
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        accessToken = newAccessToken;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (err) {
        // ❌ Không có refresh-token hoặc token lỗi
        clearAccessToken(); // Xoá token, clear state
        window.location.href = "/login"; // 👉 Chuyển về trang login
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export default axiosClient;
