
import axiosInstance from "./axiosInstance";

// Signup API
export const signupUser = async (userData) => {
  const response = await axiosInstance.post(
    "/auth/signup",
    userData
  );

  return response.data;
};

// Login API
export const loginUser = async (userData) => {
  const response = await axiosInstance.post(
    "/auth/login",
    userData
  );

  return response.data;
};

// Get logged-in user profile
export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/auth/me");

  return response.data;
};

// Logout current device
export const logoutUser = async () => {
  const response = await axiosInstance.post("/auth/logout");

  return response.data;
};

// Logout from all devices
export const logoutAllDevices = async () => {
  const response = await axiosInstance.post("/auth/logout-all");

  return response.data;
};

// Refresh access token
export const refreshSession = async () => {
  const response = await axiosInstance.post("/auth/refresh");

  return response.data;
};
