
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../api/authApi";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    password: "",
    role: "customer",
    address: "",
    city: "",
    state: "",
    country: "India",
    latitude: "",
    longitude: "",
  });

  const [loading, setLoading] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);

  // Handle all input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Detect current location
  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setDetectingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));

        setDetectingLocation(false);
        alert("Location detected successfully!");
      },
      () => {
        alert("Unable to detect location. Please enter address manually.");
        setDetectingLocation(false);
      }
    );
  };

  // Submit complete signup data to backend
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter your full name");
      return;
    }

    if (!form.email.trim()) {
      alert("Please enter your email");
      return;
    }

    if (form.phone.length !== 10) {
      alert("Please enter a valid 10 digit mobile number");
      return;
    }

    if (form.password.length < 8) {
      alert("Password must contain at least 8 characters");
      return;
    }

    if (!form.role) {
      alert("Please select your role");
      return;
    }

    if (
      !form.address.trim() ||
      !form.city.trim() ||
      !form.state.trim()
    ) {
      alert("Please complete your address");
      return;
    }

    const userData = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: `${form.countryCode}${form.phone}`,
      password: form.password,
      role: form.role,

      address: {
        address: form.address.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        country: form.country,
        latitude: form.latitude || null,
        longitude: form.longitude || null,
      },
    };

    try {
      setLoading(true);

      const response = await signupUser(userData);

      console.log("Signup successful:", response);

      // Save non-sensitive information only
      localStorage.setItem("userName", form.name);
      localStorage.setItem("phone", userData.phone);
      localStorage.setItem("role", form.role);

      alert("Account created successfully!");

      // Navigate only after database registration succeeds
      if (form.role === "provider") {
        navigate("/provider-profile-form");
      } else {
        navigate("/home");
      }

    } catch (error) {
      console.error("Signup error:", error);

      alert(
        error.response?.data?.message ||
        "Signup failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-8">

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10">

        {/* LOGO */}

        <div className="flex items-center gap-3 mb-8">

          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center overflow-hidden">

            <img
              src="/Futuristic Digital Chok Neon Logo (1).png"
              alt="Digital Chok Logo"
              className="w-full h-full object-contain"
            />

          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Digital Chok
            </h1>

            <p className="text-xs text-slate-500">
              Local Services. Made Easier.
            </p>
          </div>

        </div>

        {/* HEADER */}

        <div className="mb-8">

          <h2 className="text-3xl font-bold text-slate-900">
            Create your account
          </h2>

          <p className="text-slate-500 mt-2">
            Join Digital Chok and connect with local services.
          </p>

        </div>

        <form onSubmit={handleSignup} className="space-y-6">

          {/* PERSONAL DETAILS */}

          <div>
            <h3 className="font-bold text-lg text-slate-900 mb-4">
              Personal Details
            </h3>

            <div className="space-y-4">

              {/* NAME */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full h-12 px-4 border border-gray-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* EMAIL */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full h-12 px-4 border border-gray-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* PHONE */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>

                <div className="flex h-12 border border-gray-300 rounded-xl overflow-hidden focus-within:border-blue-500">

                  <select
                    name="countryCode"
                    value={form.countryCode}
                    onChange={handleChange}
                    className="px-3 bg-gray-50 border-r outline-none text-gray-700"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+971">🇦🇪 +971</option>
                  </select>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    maxLength={10}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        phone: e.target.value.replace(/\D/g, ""),
                      }))
                    }
                    placeholder="10 digit mobile number"
                    className="flex-1 px-4 outline-none"
                  />

                </div>
              </div>

              {/* PASSWORD */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full h-12 px-4 border border-gray-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <p className="text-xs text-gray-400 mt-2">
                  Minimum 8 characters
                </p>
              </div>

            </div>
          </div>

          {/* ROLE SELECTION */}

          <div>
            <h3 className="font-bold text-lg text-slate-900 mb-4">
              I want to join as
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    role: "customer",
                  }))
                }
                className={`p-5 rounded-2xl border-2 text-left transition ${
                  form.role === "customer"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >

                <div className="text-3xl mb-3">
                  👤
                </div>

                <h4 className="font-bold text-gray-900">
                  Customer
                </h4>

                <p className="text-sm text-gray-500 mt-1">
                  I need services near me
                </p>

              </button>

              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    role: "provider",
                  }))
                }
                className={`p-5 rounded-2xl border-2 text-left transition ${
                  form.role === "provider"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >

                <div className="text-3xl mb-3">
                  🧑‍🔧
                </div>

                <h4 className="font-bold text-gray-900">
                  Service Provider
                </h4>

                <p className="text-sm text-gray-500 mt-1">
                  I want to provide services
                </p>

              </button>

            </div>
          </div>

          {/* ADDRESS */}

          <div>
            <h3 className="font-bold text-lg text-slate-900 mb-4">
              Your Location
            </h3>

            <button
              type="button"
              onClick={handleCurrentLocation}
              disabled={detectingLocation}
              className="w-full mb-4 p-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 font-semibold text-sm hover:bg-blue-100 transition disabled:opacity-60"
            >
              {detectingLocation
                ? "Detecting location..."
                : "📍 Use my current location"}
            </button>

            <div className="space-y-4">

              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="House number, street, area"
                className="w-full h-12 px-4 border border-gray-300 rounded-xl outline-none focus:border-blue-500"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full h-12 px-4 border border-gray-300 rounded-xl outline-none focus:border-blue-500"
                />

                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="w-full h-12 px-4 border border-gray-300 rounded-xl outline-none focus:border-blue-500"
                />

              </div>

              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Country"
                className="w-full h-12 px-4 border border-gray-300 rounded-xl outline-none focus:border-blue-500"
              />

            </div>
          </div>

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold flex items-center justify-center gap-2 transition"
          >

            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                Create Account
                <span className="text-lg">→</span>
              </>
            )}

          </button>

        </form>

        {/* LOGIN LINK */}

        <div className="mt-7 text-center">

          <p className="text-sm text-gray-500">
            Already have an account?

            <Link
              to="/login"
              className="ml-1 text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Signup;
