
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProviderDashboard() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState(() => {
        const saved = localStorage.getItem("ownProviderProfile");
        return saved ? JSON.parse(saved) : null;
    });

    const [available, setAvailable] = useState(
        profile?.available ?? true
    );

    const bookings = JSON.parse(
        localStorage.getItem("providerBookings") || "[]"
    );

    const completed = bookings.filter(
        (booking) => booking.status === "Completed"
    ).length;

    const pending = bookings.filter(
        (booking) => booking.status === "Requested"
    ).length;

    const earnings = bookings
        .filter((booking) => booking.status === "Completed")
        .reduce((total, booking) => total + Number(booking.price || 0), 0);

    const updateAvailability = () => {
        const updated = !available;
        setAvailable(updated);

        const updatedProfile = {
            ...profile,
            available: updated
        };

        setProfile(updatedProfile);

        localStorage.setItem(
            "ownProviderProfile",
            JSON.stringify(updatedProfile)
        );
    };

    const openPreview = () => {
        localStorage.setItem(
            "selectedProvider",
            JSON.stringify(profile)
        );

        navigate("/provider-profile");
    };

    if (!profile) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
                <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full">
                    <div className="text-6xl">👨‍🔧</div>

                    <h2 className="text-xl font-bold mt-4">
                        Create Your Provider Profile
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                        Complete your professional profile to start receiving service requests.
                    </p>

                    <button
                        onClick={() => navigate("/provider-profile-form")}
                        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
                    >
                        Create Profile →
                    </button>
                </div>
            </div>
        );
    }

    const stats = [
        {
            title: "Total Bookings",
            value: bookings.length,
            icon: "📋",
            color: "bg-blue-50 text-blue-600"
        },
        {
            title: "Pending Requests",
            value: pending,
            icon: "⏳",
            color: "bg-orange-50 text-orange-600"
        },
        {
            title: "Completed Jobs",
            value: completed,
            icon: "✅",
            color: "bg-green-50 text-green-600"
        },
        {
            title: "Total Earnings",
            value: `₹${earnings}`,
            icon: "💰",
            color: "bg-purple-50 text-purple-600"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-10">

            {/* HEADER */}

            <header className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

                    <div>
                        <h1 className="text-xl font-bold text-gray-900">
                            Digital Chok
                        </h1>
                        <p className="text-xs text-gray-500">
                            Provider Dashboard
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/login")}
                        className="text-sm text-red-500 font-semibold"
                    >
                        Logout
                    </button>

                </div>
            </header>


            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-7">

                {/* WELCOME */}

                <section className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Welcome, {profile.name} 👋
                        </h2>

                        <p className="text-sm text-gray-500 mt-2">
                            Manage your services and customer bookings.
                        </p>
                    </div>

                    <button
                        onClick={updateAvailability}
                        className={`px-5 py-3 rounded-xl text-sm font-semibold ${
                            available
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-600"
                        }`}
                    >
                        ● {available ? "Available for Work" : "Currently Busy"}
                    </button>

                </section>


                {/* PROFILE CARD */}

                <section className="mt-7 bg-white border border-gray-100 rounded-2xl p-5 sm:p-6">

                    <div className="flex flex-col sm:flex-row sm:items-center gap-5">

                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-blue-50 flex items-center justify-center shrink-0">
                            {profile.image ? (
                                <img
                                    src={profile.image}
                                    alt={profile.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-4xl">👤</span>
                            )}
                        </div>

                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900">
                                {profile.name}
                            </h3>

                            <p className="text-sm text-blue-600 mt-1">
                                {profile.service}
                            </p>

                            <p className="text-sm text-gray-500 mt-1">
                                {profile.experience || "Experience not added"}
                            </p>

                            <p className="text-sm text-gray-500 mt-1">
                                📍 {profile.address}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">

                            <button
                                onClick={() => navigate("/provider-profile-form")}
                                className="px-4 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold"
                            >
                                Edit Profile
                            </button>

                            <button
                                onClick={openPreview}
                                className="px-4 py-3 bg-blue-50 text-blue-700 rounded-xl text-sm font-semibold"
                            >
                                Preview
                            </button>

                        </div>

                    </div>

                </section>


                {/* STATISTICS */}

                <section className="mt-8">

                    <h2 className="text-lg font-bold text-gray-900">
                        Your Work Overview
                    </h2>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">

                        {stats.map((stat) => (
                            <div
                                key={stat.title}
                                className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5"
                            >
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${stat.color}`}>
                                    {stat.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mt-4">
                                    {stat.value}
                                </h3>

                                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                    {stat.title}
                                </p>
                            </div>
                        ))}

                    </div>

                </section>


                {/* QUICK ACTIONS */}

                <section className="mt-9">

                    <h2 className="text-lg font-bold text-gray-900">
                        Manage Your Work
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5">

                        <button
                            onClick={() => navigate("/provider-bookings")}
                            className="bg-white border border-gray-100 rounded-2xl p-5 text-left hover:shadow-md transition"
                        >
                            <span className="text-3xl">📋</span>
                            <h3 className="font-bold mt-3">My Bookings</h3>
                            <p className="text-xs text-gray-500 mt-1">
                                Manage customer requests
                            </p>
                        </button>

                        <button
                            onClick={() => navigate("/provider-profile-form")}
                            className="bg-white border border-gray-100 rounded-2xl p-5 text-left hover:shadow-md transition"
                        >
                            <span className="text-3xl">👤</span>
                            <h3 className="font-bold mt-3">My Profile</h3>
                            <p className="text-xs text-gray-500 mt-1">
                                Update personal details
                            </p>
                        </button>

                        <button
                            onClick={openPreview}
                            className="bg-white border border-gray-100 rounded-2xl p-5 text-left hover:shadow-md transition"
                        >
                            <span className="text-3xl">👁️</span>
                            <h3 className="font-bold mt-3">Public Profile</h3>
                            <p className="text-xs text-gray-500 mt-1">
                                See customer view
                            </p>
                        </button>

                    </div>

                </section>


                {/* RECENT BOOKINGS */}

                <section className="mt-9 bg-white border border-gray-100 rounded-2xl p-5">

                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-900">
                            Recent Bookings
                        </h2>

                        <button
                            onClick={() => navigate("/provider-bookings")}
                            className="text-sm text-blue-600 font-semibold"
                        >
                            View All
                        </button>
                    </div>

                    {bookings.length > 0 ? (

                        <div className="mt-5 space-y-3">
                            {bookings.slice(0, 5).map((booking, index) => (
                                <div
                                    key={booking.id || index}
                                    className="flex justify-between items-center border-b border-gray-100 pb-3"
                                >
                                    <div>
                                        <h3 className="font-semibold text-sm">
                                            {booking.service}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {booking.date} · {booking.time}
                                        </p>
                                    </div>

                                    <span className="text-sm font-semibold">
                                        ₹{booking.price}
                                    </span>
                                </div>
                            ))}
                        </div>

                    ) : (

                        <div className="text-center py-10">
                            <span className="text-4xl">📅</span>

                            <h3 className="font-semibold text-gray-800 mt-3">
                                No bookings yet
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                Your customer requests will appear here.
                            </p>
                        </div>

                    )}

                </section>

            </main>

        </div>
    );
}

export default ProviderDashboard;
