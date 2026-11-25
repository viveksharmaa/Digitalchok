import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const categories = [
        {
            name: "Plumber",
            icon: "🔧",
            color: "bg-blue-50",
        },
        {
            name: "Electrician",
            icon: "⚡",
            color: "bg-yellow-50",
        },
        {
            name: "Carpenter",
            icon: "🪚",
            color: "bg-orange-50",
        },
        {
            name: "Painter",
            icon: "🎨",
            color: "bg-pink-50",
        },
        {
            name: "Cleaning",
            icon: "🧹",
            color: "bg-green-50",
        },
        {
            name: "AC Repair",
            icon: "❄️",
            color: "bg-cyan-50",
        },
        {
            name: "Mechanic",
            icon: "🔩",
            color: "bg-purple-50",
        },
        {
            name: "RO Repair",
            icon: "💧",
            color: "bg-sky-50",
        },
    ];

    const providers = [
        {
            id: 1,
            name: "Raj Kumar",
            service: "Plumbing Services",
            rating: "4.9",
            reviews: "120",
            price: "299",
            distance: "1.2 km",
            available: true,
            image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80",
        },
        {
            id: 2,
            name: "Amit Sharma",
            service: "Electrician Services",
            rating: "4.8",
            reviews: "96",
            price: "249",
            distance: "2.1 km",
            available: true,
            image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80",
        },
        {
            id: 3,
            name: "Rohit Verma",
            service: "Repair Services",
            rating: "4.7",
            reviews: "84",
            price: "349",
            distance: "3.4 km",
            available: false,
            image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=400&q=80",
        },
    ];

    const handleCategory = (category) => {
        localStorage.setItem("selectedService", category);
        navigate("/providers");
    };

    const handleProvider = (provider) => {
        localStorage.setItem(
            "selectedProvider",
            JSON.stringify(provider)
        );

        navigate("/provider-profile");
    };

    const handleSearch = () => {
        if (!search.trim()) {
            navigate("/services");
            return;
        }

        localStorage.setItem("selectedService", search);
        navigate("/providers");
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ================= TOP HEADER ================= */}

            <header className="bg-white border-b border-gray-100">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="h-20 flex items-center justify-between">

                        {/* Location */}

                        <button
                            onClick={() => navigate("/location")}
                            className="flex items-center gap-3 text-left"
                        >

                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                📍
                            </div>

                            <div>

                                <p className="text-xs text-gray-400">
                                    Your Location
                                </p>

                                <div className="flex items-center gap-1">

                                    <p className="text-sm font-semibold text-gray-900">
                                        Bareilly, Uttar Pradesh
                                    </p>

                                    <span className="text-xs text-gray-400">
                                        ▼
                                    </span>

                                </div>

                            </div>

                        </button>


                        {/* Profile */}

                        <button
                            onClick={() => navigate("/profile")}
                            className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold hover:bg-blue-200 transition"
                        >
                            V
                        </button>

                    </div>

                </div>

            </header>


            {/* ================= MAIN ================= */}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">


                {/* ================= HERO ================= */}

                <section className="pt-8">

                    <div className="max-w-2xl">

                        <p className="text-blue-600 font-medium text-sm">
                            Hello, Welcome back 👋
                        </p>

                        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                            What Service Do You Need?
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Find trusted professionals near you.
                        </p>

                    </div>


                    {/* Search */}

                    <div className="mt-6 max-w-3xl">

                        <div className="flex items-center h-14 bg-white border border-gray-200 rounded-2xl shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-50">

                            <span className="ml-4 text-gray-400 text-lg">
                                🔍
                            </span>

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSearch();
                                    }
                                }}
                                placeholder="Search for services..."
                                className="flex-1 h-full px-3 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                            />

                            <button
                                onClick={handleSearch}
                                className="mr-2 w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition"
                            >
                                →
                            </button>

                        </div>

                    </div>

                </section>


                {/* ================= PROMO BANNER ================= */}

                <section className="mt-7">

                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 min-h-[170px]">

                        {/* Decorative circles */}

                        <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-white/10"></div>

                        <div className="absolute right-20 -bottom-16 w-32 h-32 rounded-full bg-white/10"></div>


                        <div className="relative z-10 p-6 sm:p-8 max-w-2xl">

                            <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-xs font-medium">
                                Limited Time Offer
                            </span>

                            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white">
                                Get 40% OFF
                            </h2>

                            <p className="mt-1 text-blue-100 text-sm">
                                On your first service booking
                            </p>

                            <button
                                onClick={() => navigate("/services")}
                                className="mt-5 px-5 py-2.5 bg-white text-blue-700 rounded-lg text-sm font-bold hover:bg-blue-50 transition"
                            >
                                Get Offer →
                            </button>

                        </div>


                        {/* Right Illustration */}

                        <div className="absolute right-6 bottom-0 hidden sm:block text-8xl">
                            🧑‍🔧
                        </div>

                    </div>

                </section>


                {/* ================= CATEGORIES ================= */}

                <section className="mt-9">

                    <div className="flex items-center justify-between mb-4">

                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                All Categories
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Explore services near you
                            </p>
                        </div>

                        <button
                            onClick={() => navigate("/services")}
                            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                        >
                            View All
                        </button>

                    </div>


                    {/* Horizontal Scroll */}

                    <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">

                        {categories.map((category) => (

                            <button
                                key={category.name}
                                onClick={() =>
                                    handleCategory(category.name)
                                }
                                className="min-w-[100px] bg-white border border-gray-100 rounded-2xl p-3 hover:border-blue-300 hover:shadow-sm transition"
                            >

                                <div
                                    className={`w-14 h-14 mx-auto rounded-2xl ${category.color} flex items-center justify-center text-2xl`}
                                >
                                    {category.icon}
                                </div>

                                <p className="mt-3 text-xs font-semibold text-gray-700 text-center whitespace-nowrap">
                                    {category.name}
                                </p>

                            </button>

                        ))}

                    </div>

                </section>


                {/* ================= RECOMMENDED ================= */}

                <section className="mt-9">

                    <div className="flex items-center justify-between mb-4">

                        <div>

                            <h2 className="text-xl font-bold text-gray-900">
                                Recommended
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Top professionals near you
                            </p>

                        </div>

                        <button
                            onClick={() => navigate("/providers")}
                            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                        >
                            View All
                        </button>

                    </div>


                    {/* Provider Cards */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                        {providers.map((provider) => (

                            <div
                                key={provider.id}
                                onClick={() =>
                                    handleProvider(provider)
                                }
                                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                            >

                                {/* Provider Image */}

                                <div className="relative h-48 bg-gray-100">

                                    <img
                                        src={provider.image}
                                        alt={provider.name}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Available */}

                                    <div className="absolute top-3 left-3">

                                        {provider.available ? (
                                            <span className="px-2.5 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">
                                                ● Available
                                            </span>
                                        ) : (
                                            <span className="px-2.5 py-1 rounded-full bg-gray-700 text-white text-xs font-semibold">
                                                Busy
                                            </span>
                                        )}

                                    </div>

                                    {/* Bookmark */}

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center"
                                    >
                                        ♡
                                    </button>

                                </div>


                                {/* Provider Info */}

                                <div className="p-4">

                                    <div className="flex items-start justify-between gap-3">

                                        <div>

                                            <h3 className="font-bold text-gray-900">
                                                {provider.name}
                                            </h3>

                                            <p className="text-sm text-gray-500 mt-1">
                                                {provider.service}
                                            </p>

                                        </div>

                                        <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                                            ⭐ {provider.rating}
                                        </div>

                                    </div>


                                    <div className="mt-4 flex items-center justify-between text-xs text-gray-500">

                                        <span>
                                            📍 {provider.distance}
                                        </span>

                                        <span>
                                            {provider.reviews} reviews
                                        </span>

                                    </div>


                                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">

                                        <div>

                                            <p className="text-xs text-gray-400">
                                                Starting from
                                            </p>

                                            <p className="text-lg font-bold text-gray-900">
                                                ₹{provider.price}
                                            </p>

                                        </div>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleProvider(provider);
                                            }}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                                        >
                                            View
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </section>


                {/* ================= QUICK SERVICES ================= */}

                <section className="mt-10">

                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                            <div>

                                <h2 className="text-lg font-bold text-gray-900">
                                    Need help urgently?
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Find an available professional near you.
                                </p>

                            </div>

                            <button
                                onClick={() => navigate("/services")}
                                className="px-5 py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition"
                            >
                                Find a Professional →
                            </button>

                        </div>

                    </div>

                </section>

            </main>


            {/* ================= BOTTOM NAV ================= */}

            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">

                <div className="max-w-2xl mx-auto h-16 px-4 flex items-center justify-around">

                    <button
                        onClick={() => navigate("/home")}
                        className="flex flex-col items-center gap-1 text-blue-600"
                    >
                        <span className="text-lg">⌂</span>
                        <span className="text-[11px] font-semibold">
                            Home
                        </span>
                    </button>


                    <button
                        onClick={() => navigate("/providers")}
                        className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600"
                    >
                        <span className="text-lg">▣</span>
                        <span className="text-[11px]">
                            Bookings
                        </span>
                    </button>


                    <button
                        onClick={() => navigate("/services")}
                        className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600"
                    >
                        <span className="text-lg">⌕</span>
                        <span className="text-[11px]">
                            Search
                        </span>
                    </button>


                    <button
                        onClick={() => navigate("/profile")}
                        className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600"
                    >
                        <span className="text-lg">♙</span>
                        <span className="text-[11px]">
                            Profile
                        </span>
                    </button>

                </div>

            </nav>

        </div>
    );
}

export default Home;