
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000/api/v1";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let refreshPromise = null;

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    const url = originalRequest?.url || "";

    const isAuthRequest =
      url.includes("/auth/login") ||
      url.includes("/auth/signup") ||
      url.includes("/auth/refresh") ||
      url.includes("/auth/logout") ||
      url.includes("/auth/logout-all");

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      isAuthRequest
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = axios
          .post(
            `${API_URL}/auth/refresh`,
            {},
            { withCredentials: true }
          )
          .finally(() => {
            refreshPromise = null;
          });
      }

      await refreshPromise;

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      window.dispatchEvent(
        new Event("auth:session-expired")
      );

      return Promise.reject(refreshError);
    }
  }
);

export default axiosInstance;
