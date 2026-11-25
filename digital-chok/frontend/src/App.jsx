import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RoleSelection from "./pages/RoleSelection";
import Location from "./pages/Location";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ProviderList from "./pages/ProviderList";
import ProviderProfile from "./pages/ProviderProfile";
import Booking from "./pages/Booking";
import ProviderProfileForm from "./pages/ProviderProfileForm";
import ProviderDashboard from "./pages/ProviderDashboard";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =========================
            AUTHENTICATION
        ========================= */}

        <Route
          path="/"
          element={<LandingPage/>}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />


        {/* =========================
            USER SETUP
        ========================= */}

        <Route
          path="/role"
          element={<RoleSelection />}
        />

        <Route
          path="/location"
          element={<Location />}
        />


        {/* =========================
            MAIN APP
        ========================= */}

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/providers"
          element={<ProviderList />}
        />

        <Route
          path="/provider-profile"
          element={<ProviderProfile />}
        />

        <Route
          path="/provider-profile-form"
          element={<ProviderProfileForm />}
        />

        <Route
          path="/provider-dashboard"
          element={<ProviderDashboard />}
        />

        <Route
          path="/booking"
          element={<Booking />}
        />


        {/* =========================
            FALLBACK
        ========================= */}

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;