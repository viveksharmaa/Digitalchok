import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleContinue = () => {
        if (phone.length !== 10) {
            alert("Please enter a valid 10 digit mobile number");
            return;
        }

        setLoading(true);

        localStorage.setItem("phone", phone);

        setTimeout(() => {
            navigate("/role");
        }, 700);
    };

    return (
        <div className="min-h-screen bg-white flex justify-center">

            {/* MAIN MOBILE CONTAINER */}

            <div className="w-full max-w-[430px] min-h-screen px-6 py-8 flex flex-col">

                {/* LOGO */}

                <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm overflow-hidden ">
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

                        <p className="text-[10px] text-slate-500">
                            Local Services. Made Easier.
                        </p>
                    </div>

                </div>


                {/* LOGIN CONTENT */}

                <div className="flex-1 flex flex-col justify-center">

                    <div className="mb-8">

                        <h2 className="text-[30px] leading-tight font-bold text-slate-900">
                            Your Digital Journey
                            <br />
                            Begins Here
                        </h2>

                    </div>


                    {/* PHONE INPUT */}

                    <div className="mb-5">

                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Mobile Number
                        </label>

                        <div className="flex items-center h-14 border border-slate-200 rounded-xl bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition">

                            {/* COUNTRY */}

                            <div className="flex items-center gap-2 px-4">

                                <div className="flex items-center border-gray-300 rounded-xl overflow-hidden">

                                    <select
                                        className="h-12 px-3 bg-white text-gray-700 outline-none cursor-pointer"
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

                                </div>

                            </div>


                            {/* DIVIDER */}

                            <div className="h-7 w-px bg-slate-200"></div>


                            {/* INPUT */}

                            <input
                                type="tel"
                                value={phone}
                                maxLength={10}
                                placeholder="Enter phone number"
                                className="flex-1 h-full px-4 outline-none text-sm text-slate-800 placeholder:text-slate-400 bg-transparent"
                                onChange={(e) =>
                                    setPhone(
                                        e.target.value.replace(/\D/g, "")
                                    )
                                }
                            />

                            {phone.length === 10 && (
                                <span className="text-green-500 font-bold mr-4">
                                    ✓
                                </span>
                            )}

                        </div>

                        <p className="text-[11px] text-slate-400 mt-2">
                            We'll send you a verification code
                        </p>

                    </div>


                    {/* CONTINUE BUTTON */}

                    <button
                        onClick={handleContinue}
                        disabled={loading}
                        className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-sm flex items-center justify-center gap-2 transition disabled:opacity-70"
                    >

                        {loading ? (
                            <>
                                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>

                                Please wait...
                            </>
                        ) : (
                            <>
                                Continue

                                <span className="text-lg">
                                    →
                                </span>
                            </>
                        )}

                    </button>


                    {/* DIVIDER */}

                    <div className="flex items-center gap-4 my-7">

                        <div className="flex-1 h-px bg-slate-200"></div>

                        <span className="text-[11px] text-slate-400">
                            OR
                        </span>

                        <div className="flex-1 h-px bg-slate-200"></div>

                    </div>


                    {/* FACEBOOK */}

                    <button
                        className="w-full h-13 min-h-[52px] border border-slate-200 rounded-xl bg-white hover:bg-slate-50 flex items-center justify-center gap-3 text-sm font-semibold text-slate-700 transition"
                    >

                        <span className="google-icon">
                            <img
                                src="/Facebook_Logo_2023.png"
                                alt="Facebook"
                                className="w-5 h-5"
                            />
                        </span>

                        Login with Facebook

                    </button>
                    <br></br>


                    {/* GOOGLE */}

                    <button className="w-full h-12 flex items-center justify-center gap-3 border border-gray-300 rounded-xl bg-white hover:bg-gray-50 text-gray-700 font-medium transition">

                        <span className="google-icon">
                            <img
                                src="/Google__G__logo.svg.webp"
                                alt="Google"
                                className="w-5 h-5"
                            />
                        </span>

                        <span>
                            Continue with Google
                        </span>

                    </button>


                    {/* SIGN UP */}

                    <div className="text-center mt-8">

                        <p className="text-sm text-slate-500">

                            Don't have an account?

                            <Link
                                to="/signup"
                                className="ml-1 text-blue-600 font-semibold hover:underline"
                            >
                                Sign Up
                            </Link>

                        </p>

                    </div>

                </div>


                {/* BOTTOM */}

                <div className="text-center pt-6">

                    <p className="text-[10px] text-slate-400">
                        By continuing, you agree to our
                    </p>

                    <p className="text-[10px] text-slate-400 mt-1">
                        Terms of Service &nbsp;•&nbsp; Privacy Policy
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;