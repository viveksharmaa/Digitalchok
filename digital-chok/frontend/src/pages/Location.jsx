
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Location() {
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = useState("home");
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "India",
  });

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  // Detect Current Location
  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setAddress((prev) => ({
          ...prev,
          address: `${latitude}, ${longitude}`,
        }));

        setSelectedAddress("new");
        setLoading(false);
      },
      () => {
        alert("Unable to detect location. Please enter address manually.");
        setLoading(false);
      }
    );
  };

  // Continue According to User Role
  const continueWithLocation = () => {
    const role = localStorage.getItem("role");

    if (selectedAddress === "new") {
      if (
        !address.fullName ||
        !address.address ||
        !address.city ||
        !address.state
      ) {
        alert("Please fill all address details.");
        return;
      }

      localStorage.setItem(
        "selectedAddress",
        JSON.stringify(address)
      );
    } else {
      localStorage.setItem(
        "selectedAddress",
        JSON.stringify({
          type: "Home",
          address: "47, Railway Road, Bareilly",
          city: "Bareilly",
          state: "Uttar Pradesh",
          country: "India",
        })
      );
    }

    if (role === "provider") {
      navigate("/provider-profile-form");
    } else if (role === "customer") {
      navigate("/home");
    } else {
      navigate("/role");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-6">

      <div className="w-full max-w-md min-h-[820px] bg-white shadow-2xl overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex items-center gap-4 px-5 pt-6 pb-4">

          <button
            onClick={() => navigate("/role")}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition"
          >
            ←
          </button>

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Select Address
            </h1>

            <p className="text-xs text-gray-500 mt-1">
              Choose where you need the service
            </p>
          </div>

        </div>

        {/* Current Location */}
        <div className="px-5 mt-2">

          <button
            onClick={useCurrentLocation}
            disabled={loading}
            className="w-full flex items-center gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-100 hover:bg-blue-100 transition disabled:opacity-50"
          >

            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
              📍
            </div>

            <div className="text-left">

              <p className="font-semibold text-blue-700">
                {loading ? "Detecting Location..." : "Use my current location"}
              </p>

              <p className="text-xs text-blue-500 mt-1">
                Automatically detect your location
              </p>

            </div>

          </button>

        </div>

        {/* Saved Address */}
        <div className="px-5 mt-7">

          <div className="flex items-center justify-between">

            <h2 className="text-lg font-bold text-gray-900">
              Saved Address
            </h2>

            <button
              onClick={() => setSelectedAddress("new")}
              className="text-sm font-semibold text-blue-600"
            >
              + Add New
            </button>

          </div>

          {/* Home Address */}
          <button
            onClick={() => setSelectedAddress("home")}
            className={`w-full mt-4 p-4 rounded-2xl border-2 text-left transition ${
              selectedAddress === "home"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
          >

            <div className="flex items-start gap-3">

              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                🏠
              </div>

              <div className="flex-1">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2">

                    <h3 className="font-bold text-gray-900">
                      Home
                    </h3>

                    {selectedAddress === "home" && (
                      <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                        Selected
                      </span>
                    )}

                  </div>

                  <span className="text-blue-600">
                    {selectedAddress === "home" ? "●" : "○"}
                  </span>

                </div>

                <p className="text-sm text-gray-500 mt-2 leading-5">
                  47, Railway Road, Bareilly,
                  Uttar Pradesh 243001
                </p>

              </div>

            </div>

          </button>

        </div>

        {/* New Address Form */}
        {selectedAddress === "new" && (

          <div className="px-5 mt-6">

            <h2 className="text-lg font-bold text-gray-900">
              Add New Address
            </h2>

            <div className="mt-4 space-y-3">

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={address.fullName}
                onChange={handleChange}
                className="w-full h-11 px-4 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={address.address}
                onChange={handleChange}
                className="w-full h-11 px-4 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
              />

              <div className="grid grid-cols-2 gap-3">

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={address.city}
                  onChange={handleChange}
                  className="w-full h-11 px-4 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
                />

                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={address.state}
                  onChange={handleChange}
                  className="w-full h-11 px-4 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
                />

              </div>

              <input
                type="text"
                name="country"
                value={address.country}
                onChange={handleChange}
                className="w-full h-11 px-4 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
              />

            </div>

          </div>

        )}

        {/* Bottom Button */}
        <div className="mt-auto p-5 border-t border-gray-100">

          <button
            onClick={continueWithLocation}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition shadow-sm"
          >
            Proceed
          </button>

        </div>

      </div>

    </div>
  );
}

export default Location;
