
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProviderProfile() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("About");
    const [isFavourite, setIsFavourite] = useState(false);

    // Get actual selected provider
    let provider = null;

    try {
        const providerData = localStorage.getItem("selectedProvider");
        provider = providerData ? JSON.parse(providerData) : null;
    } catch (error) {
        console.error("Invalid provider data:", error);
    }

    const tabs = ["About", "Skills", "Reviews", "Gallery"];

    // No demo provider
    if (!provider) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
                <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full shadow-sm border border-gray-100">
                    <div className="text-6xl">👤</div>

                    <h2 className="text-xl font-bold text-gray-900 mt-4">
                        Provider Not Found
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                        Please select a service provider to view their profile.
                    </p>

                    <button
                        onClick={() => navigate("/providers")}
                        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
                    >
                        Back to Providers
                    </button>
                </div>
            </div>
        );
    }

    const rating = Number(provider.rating) || 0;
    const reviewsCount = Number(provider.reviews) || 0;

    const skills = Array.isArray(provider.skills)
        ? provider.skills
        : [];

    const galleryImages = Array.isArray(provider.gallery)
        ? provider.gallery
        : [];

    const handleBooking = () => {
        if (!provider.available) {
            alert("This provider is currently busy. Please choose another provider.");
            return;
        }

        // Save provider for booking page
        localStorage.setItem(
            "selectedProvider",
            JSON.stringify(provider)
        );

        navigate("/booking");
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-28">

            {/* HEADER */}
            <header className="bg-white sticky top-0 z-40 border-b border-gray-100">
                <div className="max-w-5xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">

                    <button
                        onClick={() => navigate("/providers")}
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl text-gray-700 hover:bg-gray-200 transition"
                    >
                        ←
                    </button>

                    <h1 className="font-bold text-gray-900">
                        Provider Profile
                    </h1>

                    <button
                        onClick={() => setIsFavourite(!isFavourite)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition ${
                            isFavourite
                                ? "bg-red-50 text-red-500"
                                : "bg-gray-100 text-gray-600"
                        }`}
                    >
                        {isFavourite ? "♥" : "♡"}
                    </button>

                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6">

                {/* PROFILE HERO */}
                <section className="mt-5 bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">

                    {/* PROFILE IMAGE */}
                    <div className="relative h-64 sm:h-80 bg-gradient-to-br from-blue-100 to-gray-200">

                        {provider.image ? (
                            <img
                                src={provider.image}
                                alt={provider.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-8xl">
                                👤
                            </div>
                        )}

                        {provider.verified && (
                            <div className="absolute top-4 left-4">
                                <span className="bg-white px-3 py-2 rounded-full text-xs font-bold text-blue-700 shadow-sm">
                                    ✓ Verified Professional
                                </span>
                            </div>
                        )}

                        <div className="absolute bottom-4 right-4">
                            <span className={`px-3 py-2 rounded-full text-xs font-semibold text-white ${
                                provider.available
                                    ? "bg-green-600"
                                    : "bg-gray-700"
                            }`}>
                                {provider.available
                                    ? "● Available Now"
                                    : "● Currently Busy"}
                            </span>
                        </div>

                    </div>

                    {/* PROVIDER DETAILS */}
                    <div className="p-5 sm:p-7">

                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    {provider.name}
                                </h2>

                                <p className="mt-2 text-blue-600 font-semibold">
                                    {provider.service}
                                </p>

                                <div className="flex flex-wrap items-center gap-3 mt-3">

                                    <span className="text-sm font-semibold text-gray-800">
                                        ⭐ {rating > 0 ? rating.toFixed(1) : "New"}
                                    </span>

                                    <span className="text-sm text-gray-400">
                                        ({reviewsCount} Reviews)
                                    </span>

                                </div>
                            </div>

                            {/* PRICE */}
                            <div className="sm:text-right bg-blue-50 rounded-2xl px-5 py-4">

                                <p className="text-xs text-gray-500">
                                    Starting Price
                                </p>

                                <h3 className="text-2xl font-bold text-blue-700 mt-1">
                                    ₹{provider.price ?? 0}
                                </h3>

                                <p className="text-xs text-gray-400 mt-1">
                                    Final price may vary
                                </p>

                            </div>

                        </div>

                        {/* PROVIDER STATS */}
                        <div className="grid grid-cols-3 gap-3 mt-7 pt-6 border-t border-gray-100">

                            <div className="text-center">
                                <h3 className="text-lg font-bold text-gray-900">
                                    {provider.experience || "Not specified"}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    Experience
                                </p>
                            </div>

                            <div className="text-center border-x border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900">
                                    ⭐ {rating > 0 ? rating.toFixed(1) : "New"}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    Rating
                                </p>
                            </div>

                            <div className="text-center">
                                <h3 className="text-lg font-bold text-gray-900">
                                    {reviewsCount}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    Reviews
                                </p>
                            </div>

                        </div>

                    </div>
                </section>

                {/* PROFILE TABS */}
                <section className="mt-7">

                    <div className="flex items-center gap-6 overflow-x-auto border-b border-gray-200">

                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`shrink-0 pb-3 text-sm font-semibold transition ${
                                    activeTab === tab
                                        ? "text-blue-600 border-b-2 border-blue-600"
                                        : "text-gray-500 hover:text-gray-900"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}

                    </div>

                    {/* ABOUT TAB */}
                    {activeTab === "About" && (
                        <div className="bg-white rounded-2xl p-5 sm:p-6 mt-5 border border-gray-100">

                            <h2 className="text-lg font-bold text-gray-900">
                                About Professional
                            </h2>

                            <p className="text-sm text-gray-500 leading-7 mt-3">
                                {provider.description || "No description has been added by this professional yet."}
                            </p>

                            <h3 className="font-bold text-gray-900 mt-7">
                                Service Information
                            </h3>

                            <div className="mt-4 space-y-4">

                                <div className="flex items-center justify-between gap-3 text-sm">
                                    <span className="text-gray-500">
                                        Service Category
                                    </span>
                                    <span className="font-semibold text-gray-800">
                                        {provider.service || "Not specified"}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-3 text-sm">
                                    <span className="text-gray-500">
                                        Experience
                                    </span>
                                    <span className="font-semibold text-gray-800">
                                        {provider.experience || "Not specified"}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-3 text-sm">
                                    <span className="text-gray-500">
                                        Address
                                    </span>
                                    <span className="font-semibold text-gray-800 text-right">
                                        {provider.address || "Not added"}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-3 text-sm">
                                    <span className="text-gray-500">
                                        Availability
                                    </span>
                                    <span className={`font-semibold ${
                                        provider.available
                                            ? "text-green-600"
                                            : "text-red-500"
                                    }`}>
                                        {provider.available ? "Available" : "Busy"}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-3 text-sm">
                                    <span className="text-gray-500">
                                        Contact Number
                                    </span>
                                    <span className="font-semibold text-gray-800">
                                        {provider.phone || "Not added"}
                                    </span>
                                </div>

                            </div>
                        </div>
                    )}

                    {/* SKILLS TAB */}
                    {activeTab === "Skills" && (
                        <div className="bg-white rounded-2xl p-5 sm:p-6 mt-5 border border-gray-100">

                            <h2 className="text-lg font-bold text-gray-900">
                                Skills & Expertise
                            </h2>

                            <p className="text-sm text-gray-500 mt-2">
                                Skills added by this professional.
                            </p>

                            {skills.length > 0 ? (
                                <div className="flex flex-wrap gap-3 mt-5">
                                    {skills.map((skill, index) => (
                                        <span
                                            key={`${skill}-${index}`}
                                            className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium"
                                        >
                                            ✓ {skill}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-400 mt-5">
                                    This professional has not added any skills yet.
                                </p>
                            )}

                        </div>
                    )}

                    {/* REVIEWS TAB */}
                    {activeTab === "Reviews" && (
                        <div className="bg-white rounded-2xl border border-gray-100 p-5 mt-5">

                            <h2 className="text-lg font-bold text-gray-900">
                                Customer Reviews
                            </h2>

                            <div className="flex items-center gap-3 mt-4">

                                <h3 className="text-4xl font-bold text-gray-900">
                                    {rating > 0 ? rating.toFixed(1) : "New"}
                                </h3>

                                <div>
                                    <p className="text-yellow-500">
                                        {rating > 0 ? "⭐".repeat(Math.round(rating)) : "No ratings"}
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1">
                                        Based on {reviewsCount} reviews
                                    </p>
                                </div>

                            </div>

                            <p className="text-sm text-gray-500 mt-6">
                                {reviewsCount > 0
                                    ? "Review details will appear here when customers submit verified reviews."
                                    : "This professional has not received any reviews yet."}
                            </p>

                        </div>
                    )}

                    {/* GALLERY TAB */}
                    {activeTab === "Gallery" && (
                        <div className="mt-5">

                            <h2 className="text-lg font-bold text-gray-900 mb-4">
                                Work Gallery
                            </h2>

                            {galleryImages.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

                                    {galleryImages.map((image, index) => (
                                        <div
                                            key={index}
                                            className="h-36 sm:h-48 rounded-2xl overflow-hidden bg-gray-100"
                                        >
                                            <img
                                                src={image}
                                                alt={`Work sample ${index + 1}`}
                                                className="w-full h-full object-cover hover:scale-110 transition duration-300"
                                            />
                                        </div>
                                    ))}

                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                                    <div className="text-5xl">🖼️</div>
                                    <p className="text-sm text-gray-500 mt-3">
                                        This professional has not uploaded any work images yet.
                                    </p>
                                </div>
                            )}

                        </div>
                    )}

                </section>

                {/* LOCATION */}
                <section className="mt-6 mb-6 bg-white rounded-2xl border border-gray-100 p-5">

                    <h2 className="font-bold text-gray-900">
                        Service Location
                    </h2>

                    <p className="text-sm text-gray-500 mt-3">
                        📍 {provider.address || "Location not provided"}
                    </p>

                </section>

            </main>

            {/* FIXED BOOKING BUTTON */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">

                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">

                    <div className="flex-1">
                        <p className="text-xs text-gray-400">
                            Starting Price
                        </p>

                        <p className="text-xl font-bold text-gray-900">
                            ₹{provider.price ?? 0}
                        </p>
                    </div>

                    <button
                        onClick={handleBooking}
                        disabled={!provider.available}
                        className="flex-1 sm:flex-none sm:min-w-[220px] py-3.5 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-bold text-sm transition shadow-sm"
                    >
                        {provider.available
                            ? "Book Service →"
                            : "Currently Unavailable"}
                    </button>

                </div>
            </div>

        </div>
    );
}

export default ProviderProfile;
