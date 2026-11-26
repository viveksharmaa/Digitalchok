
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Restore session when the app starts
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const response = await axiosInstance.get("/auth/me");

        setUser(response.data.user);
      } catch {
        setUser(null);
      } finally {
        setCheckingAuth(false);
      }
    };

    restoreSession();
  }, []);

  // Handle session expiration from Axios interceptor
  useEffect(() => {
    const handleSessionExpired = () => {
      setUser(null);
    };

    window.addEventListener(
      "auth:session-expired",
      handleSessionExpired
    );

    return () => {
      window.removeEventListener(
        "auth:session-expired",
        handleSessionExpired
      );
    };
  }, []);

  // Login
  const login = async (email, password) => {
    const response = await axiosInstance.post(
      "/auth/login",
      { email, password }
    );

    setUser(response.data.user);

    return response.data;
  };

  // Logout current device
  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } finally {
      setUser(null);
    }
  };

  // Logout all devices
  const logoutAll = async () => {
    try {
      await axiosInstance.post("/auth/logout-all");
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    setUser,
    isAuthenticated: Boolean(user),
    checkingAuth,
    login,
    logout,
    logoutAll,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
