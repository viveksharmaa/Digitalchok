
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RefreshCw } from "lucide-react";

import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, checkingAuth } = useAuth();
  const location = useLocation();

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <RefreshCw
            size={28}
            className="mx-auto animate-spin text-blue-600"
          />

          <p className="mt-4 text-sm font-medium text-slate-600">
            Restoring your session...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
