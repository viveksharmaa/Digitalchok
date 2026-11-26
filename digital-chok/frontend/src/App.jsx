
import React from "react";
import {
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
import Profile from "./pages/userprofile/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/role" element={<RoleSelection />} />

      <Route path="/location" element={<Location />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />

        <Route path="/services" element={<Services />} />

        <Route path="/providers" element={<ProviderList />} />

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

        <Route path="/booking" element={<Booking />} />

        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;
