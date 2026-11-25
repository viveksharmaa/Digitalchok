
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProviderList() {
    const navigate = useNavigate();

    const selectedService =
        localStorage.getItem("selectedService") || "";

    const [providers, setProviders] = useState([]);
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("Newest");
    const [bookmarks, setBookmarks] = useState([]);

    // Load dynamically created provider profiles
    useEffect(() => {
        const loadProviders = () => {
            try {
                const savedProfiles = JSON.parse(
                    localStorage.getItem("providerProfiles") || "[]"
                );

                const ownProfile = JSON.parse(
                    localStorage.getItem("ownProviderProfile") || "null"
                );

                let allProfiles = [...savedProfiles];

                // Add old profile if it is not already in the list
                if (
                    ownProfile &&
                    !allProfiles.some(
                        (item) => item.id === ownProfile.id
                    )
                ) {
                    const profileWithId = {
                        ...ownProfile,
                        id: ownProfile.id || Date.now().toString(),
                    };

                    allProfiles.push(profileWithId);

                    localStorage.setItem(
                        "providerProfiles",
                        JSON.stringify(allProfiles)
                    );
                }

                setProviders(allProfiles);
            } catch (error) {
                console.error("Error loading providers:", error);
                setProviders([]);
            }
        };

        loadProviders();

        window.addEventListener("storage", loadProviders);

        return () => {
            window.removeEventListener("storage", loadProviders);
        };
    }, []);

    // Filters
    const filters = [
        "Newest",
        "Rating",
        "Price",
        "Available",
    ];

    // Search and sorting
    const filteredProviders = useMemo(() => {
        let result = providers.filter((provider) => {
            const matchesService =
                !selectedService ||
                provider.service?.toLowerCase() ===
                    selectedService.toLowerCase();

            const matchesSearch =
                provider.name?.toLowerCase().includes(
                    search.toLowerCase()
                ) ||
                provider.service?.toLowerCase().includes(
                    search.toLowerCase()
                );

            return matchesService && matchesSearch;
        });

        if (activeFilter === "Newest") {
            result.sort(
                (a, b) =>
                    new Date(b.createdAt || 0) -
                    new Date(a.createdAt || 0)
            );
        }

        if (activeFilter === "Rating") {
            result.sort(
                (a, b) =>
                    (b.rating || 0) - (a.rating || 0)
            );
        }

        if (activeFilter === "Price") {
            result.sort(
                (a, b) =>
                    Number(a.price || 0) -
                    Number(b.price || 0)
            );
        }

        if (activeFilter === "Available") {
            result = result.filter(
                (provider) => provider.available === true
            );
        }

        return result;
    }, [providers, search, activeFilter, selectedService]);

    // Bookmark provider
    const toggleBookmark = (e, id) => {
        e.stopPropagation();

        setBookmarks((previous) =>
            previous.includes(id)
                ? previous.filter((item) => item !== id)
                : [...previous, id]
        );
    };

    // Open provider profile
    const openProvider = (provider) => {
        localStorage.setItem(
            "selectedProvider",
            JSON.stringify(provider)
        );

        navigate("/provider-profile");
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">

            {/* HEADER */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="h-20 flex items-center gap-4">

                        <button
                            onClick={() => navigate("/services")}
                            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl text-gray-700 hover:bg-gray-200 transition"
                        >
                            ←
                        </button>

                        <div className="flex-1">
                            <h1 className="text-xl font-bold text-gray-900">
                                {selectedService
                                    ? `${selectedService} Services`
                                    : "All Services"}
                            </h1>

                            <p className="text-xs text-gray-500 mt-1">
                                Find trusted professionals near you
                            </p>
                        </div>

                        <button
                            onClick={() => navigate("/location")}
                            className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center"
                        >
                            📍
                        </button>

                    </div>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6">

                {/* SEARCH */}
                <section className="pt-6">
                    <div className="h-12 flex items-center bg-white border border-gray-200 rounded-xl px-4 focus-within:border-blue-500">

                        <span className="text-gray-400">🔍</span>

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search service providers..."
                            className="flex-1 h-full px-3 outline-none bg-transparent text-sm"
                        />

                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="text-gray-400"
                            >
                                ✕
                            </button>
                        )}

                    </div>
                </section>

                {/* FILTERS */}
                <section className="mt-5">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">

                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`shrink-0 px-4 py-2 rounded-full border text-sm font-medium transition ${
                                    activeFilter === filter
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
                                }`}
                            >
                                {filter === "Rating" && "⭐ "}
                                {filter === "Price" && "₹ "}
                                {filter === "Available" && "● "}
                                {filter === "Newest" && "🆕 "}
                                {filter}
                            </button>
                        ))}

                    </div>
                </section>

                {/* PROVIDER HEADING */}
                <section className="mt-6">
                    <div className="flex items-center justify-between">

                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Service Professionals
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                {filteredProviders.length} providers found
                            </p>
                        </div>

                        <span className="text-xs text-gray-400">
                            Sort: {activeFilter}
                        </span>

                    </div>
                </section>

                {/* PROVIDER LIST */}
                <section className="mt-5 space-y-4">

                    {filteredProviders.length > 0 ? (

                        filteredProviders.map((provider) => (

                            <div
                                key={provider.id}
                                onClick={() => openProvider(provider)}
                                className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4 flex gap-3 sm:gap-5 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer"
                            >

                                {/* IMAGE */}
                                <div className="relative w-[105px] h-[125px] sm:w-36 sm:h-36 shrink-0 rounded-xl overflow-hidden bg-gray-100">

                                    {provider.image ? (
                                        <img
                                            src={provider.image}
                                            alt={provider.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-5xl">
                                            👤
                                        </div>
                                    )}

                                    {provider.verified && (
                                        <span className="absolute bottom-2 left-2 text-[9px] sm:text-[10px] bg-white text-blue-700 font-semibold px-2 py-1 rounded-full">
                                            ✓ Verified
                                        </span>
                                    )}

                                </div>

                                {/* PROVIDER DETAILS */}
                                <div className="flex-1 min-w-0 flex flex-col justify-between py-1">

                                    <div>
                                        <div className="flex justify-between items-start gap-2">

                                            <div className="min-w-0">
                                                <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate">
                                                    {provider.name}
                                                </h3>

                                                <p className="text-xs text-gray-500 mt-1 truncate">
                                                    {provider.service}
                                                </p>
                                            </div>

                                            <button
                                                onClick={(e) =>
                                                    toggleBookmark(e, provider.id)
                                                }
                                                className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg transition ${
                                                    bookmarks.includes(provider.id)
                                                        ? "bg-red-50 text-red-500"
                                                        : "bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-500"
                                                }`}
                                                aria-label="Bookmark provider"
                                            >
                                                {bookmarks.includes(provider.id)
                                                    ? "♥"
                                                    : "♡"}
                                            </button>

                                        </div>

                                        {/* RATING */}
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-xs font-semibold text-gray-800">
                                                ⭐ {provider.rating || "New"}
                                            </span>

                                            <span className="text-[10px] sm:text-xs text-gray-400">
                                                ({provider.reviews || 0} Reviews)
                                            </span>
                                        </div>

                                        {/* ADDRESS AND EXPERIENCE */}
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">

                                            <span className="text-[10px] sm:text-xs text-gray-500">
                                                📍 {provider.address || "Location not added"}
                                            </span>

                                            <span className="text-[10px] sm:text-xs text-gray-500">
                                                💼 {provider.experience || "Experience not added"}
                                            </span>

                                        </div>
                                    </div>

                                    {/* PRICE AND STATUS */}
                                    <div className="flex items-end justify-between gap-2 mt-3 pt-2 border-t border-gray-100">

                                        <div>
                                            <p className="text-[10px] text-gray-400">
                                                Starting from
                                            </p>

                                            <p className="text-sm sm:text-base font-bold text-gray-900">
                                                ₹{provider.price || 0}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className={`text-[10px] sm:text-xs font-semibold ${
                                                provider.available
                                                    ? "text-green-600"
                                                    : "text-red-500"
                                            }`}>
                                                {provider.available
                                                    ? "● Available"
                                                    : "● Busy"}
                                            </p>

                                            <p className="text-[10px] text-blue-600 font-semibold mt-1">
                                                View Profile →
                                            </p>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        ))

                    ) : (

                        /* EMPTY STATE */
                        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">

                            <div className="text-5xl">🔍</div>

                            <h3 className="mt-4 font-bold text-gray-900">
                                No providers found
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                No professional has created a matching profile yet.
                            </p>

                            <button
                                onClick={() => {
                                    setSearch("");
                                    setActiveFilter("Newest");
                                }}
                                className="mt-5 text-sm font-semibold text-blue-600"
                            >
                                Reset Filters
                            </button>

                        </div>
                    )}

                </section>

                {/* HELP BANNER */}
                <section className="mt-8 mb-6">
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">

                        <h3 className="font-bold text-gray-900">
                            Need help choosing a professional?
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Compare ratings, experience and prices before booking.
                        </p>

                    </div>
                </section>

            </main>

            {/* BOTTOM NAVIGATION */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">

                <div className="max-w-2xl mx-auto h-16 px-4 flex items-center justify-around">

                    <button
                        onClick={() => navigate("/home")}
                        className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600"
                    >
                        <span className="text-xl">⌂</span>
                        <span className="text-[11px]">Home</span>
                    </button>

                    <button
                        onClick={() => navigate("/booking")}
                        className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600"
                    >
                        <span className="text-xl">▣</span>
                        <span className="text-[11px]">Booking</span>
                    </button>

                    <button
                        onClick={() => navigate("/services")}
                        className="flex flex-col items-center gap-1 text-blue-600"
                    >
                        <span className="text-xl">⌕</span>
                        <span className="text-[11px] font-semibold">Services</span>
                    </button>

                    <button
                        onClick={() => navigate("/provider-dashboard")}
                        className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600"
                    >
                        <span className="text-xl">♙</span>
                        <span className="text-[11px]">Profile</span>
                    </button>

                </div>
            </nav>

        </div>
    );
}

export default ProviderList;
