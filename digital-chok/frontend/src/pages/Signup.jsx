import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = () => {
    if (!name.trim()) {
      alert("Please enter your full name");
      return;
    }

    if (phone.length < 10) {
      alert("Please enter a valid mobile number");
      return;
    }

    setLoading(true);

    localStorage.setItem("userName", name);
    localStorage.setItem("phone", phone);
    localStorage.setItem("email", email);

    setTimeout(() => {
      navigate("/role");
    }, 700);
  };

  return (
    <div className="min-h-screen flex bg-white">

      {/* ================= LEFT SECTION ================= */}

      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 text-white p-12 flex-col justify-between">

        {/* Logo */}

        <div className="flex items-center gap-3">

          <div className="w-[44px] h-[44px] min-w-[44px] min-h-[44px] rounded-xl bg-blue-600 flex items-center justify-center shadow-sm overflow-hidden">

            <img
              src="/Futuristic Digital Chok Neon Logo (1).png"
              alt="Digital Chok Logo"
              className="w-full h-full object-contain"
            />

          </div>

          <span className="text-2xl font-bold">
            Digital Chok
          </span>

        </div>

        {/* Content */}

        <div className="max-w-lg">

          <span className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm">
            Join Digital Chok
          </span>

          <h1 className="mt-6 text-5xl font-bold leading-tight">
            Find trusted services
            <span className="block text-blue-100">
              near you.
            </span>
          </h1>

          <p className="mt-6 text-lg text-blue-100 leading-8">
            Create your account and connect with reliable
            local professionals for all your everyday
            service needs.
          </p>

          {/* Features */}

          <div className="mt-10 space-y-6">

            <div className="flex items-start gap-4">

              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                ✓
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Verified Professionals
                </h3>

                <p className="text-blue-100 text-sm mt-1">
                  Connect with trusted local service providers.
                </p>
              </div>

            </div>

            <div className="flex items-start gap-4">

              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                ★
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Real Customer Reviews
                </h3>

                <p className="text-blue-100 text-sm mt-1">
                  Choose providers based on ratings and reviews.
                </p>
              </div>

            </div>

            <div className="flex items-start gap-4">

              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                ✓
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Simple & Secure
                </h3>

                <p className="text-blue-100 text-sm mt-1">
                  Book services quickly and securely.
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <p className="text-sm text-blue-100">
          © 2026 Digital Chok. Local services, made easier.
        </p>

      </div>


      {/* ================= RIGHT SECTION ================= */}

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-md">

          {/* Mobile Logo */}

          <div className="flex lg:hidden items-center justify-center gap-3 mb-10">

            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm overflow-hidden shrink-0">

              <img
                src="/Futuristic Digital Chok Neon Logo (1).png"
                alt="Digital Chok Logo"
                className="w-full h-full object-contain"
              />

            </div>

            <span className="text-xl font-bold text-gray-900">
              Digital Chok
            </span>

          </div>


          {/* Header */}

          <div className="mb-8">

            <h2 className="text-3xl font-bold text-gray-900">
              Create your account
            </h2>

            <p className="mt-2 text-gray-500">
              Join Digital Chok and get started today.
            </p>

          </div>


          {/* Form */}

          <div className="space-y-5">

            {/* Full Name */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 px-4 border border-gray-300 rounded-xl outline-none text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />

            </div>


            {/* Mobile Number */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>

              <div className="flex items-center w-full h-12 border border-gray-300 rounded-xl overflow-hidden bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">

                {/* Country Code */}

                <select
                  className="h-full px-3 bg-white text-gray-700 outline-none cursor-pointer border-r border-gray-300"
                  defaultValue="+91"
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+61">🇦🇺 +61</option>
                  <option value="+971">🇦🇪 +971</option>
                  <option value="+65">🇸🇬 +65</option>
                  <option value="+81">🇯🇵 +81</option>
                  <option value="+49">🇩🇪 +49</option>
                </select>

                {/* Phone */}

                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  maxLength="15"
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                  className="flex-1 h-full px-4 text-gray-700 outline-none placeholder-gray-400"
                />

              </div>

            </div>


            {/* Email */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
                <span className="text-gray-400 font-normal">
                  {" "} (Optional)
                </span>
              </label>

              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 border border-gray-300 rounded-xl outline-none text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />

            </div>


            {/* Create Account Button */}

            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full h-12 mt-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition shadow-sm"
            >

              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <span className="text-lg">
                    →
                  </span>
                </>
              )}

            </button>

          </div>


          {/* Divider */}

          <div className="flex items-center gap-4 my-7">

            <div className="flex-1 h-px bg-gray-200"></div>

            <span className="text-sm text-gray-400">
              OR
            </span>

            <div className="flex-1 h-px bg-gray-200"></div>

          </div>


          {/* Google */}

          <button className="w-full h-12 flex items-center justify-center gap-3 border border-gray-300 rounded-xl bg-white hover:bg-gray-50 text-gray-700 font-medium transition">

            <img
              src="/Google__G__logo.svg.webp"
              alt="Google"
              className="w-5 h-5 object-contain"
            />

            <span>
              Continue with Google
            </span>

          </button>


          {/* Terms */}

          <p className="mt-6 text-center text-xs text-gray-500 leading-5">

            By creating an account, you agree to our{" "}

            <a
              href="#"
              className="text-blue-600 hover:underline"
            >
              Terms of Service
            </a>

            {" "}and{" "}

            <a
              href="#"
              className="text-blue-600 hover:underline"
            >
              Privacy Policy
            </a>.

          </p>


          {/* Login */}

          <div className="mt-7 text-center">

            <span className="text-sm text-gray-500">
              Already have an account?{" "}
            </span>

            <Link
              to="/login"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Login
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Signup;