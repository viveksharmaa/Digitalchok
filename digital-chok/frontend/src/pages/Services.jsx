
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Services() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const services = [
        {
            name: "Electrician",
            icon: "⚡",
            description: "Electrical repair & installation",
            color: "bg-yellow-50",
            iconColor: "text-yellow-600",
            popular: true
        },
        {
            name: "Plumber",
            icon: "🔧",
            description: "Pipe, tap & water repairs",
            color: "bg-blue-50",
            iconColor: "text-blue-600",
            popular: true
        },
        {
            name: "Carpenter",
            icon: "🪚",
            description: "Furniture & woodwork",
            color: "bg-orange-50",
            iconColor: "text-orange-600",
            popular: true
        },
        {
            name: "Painter",
            icon: "🎨",
            description: "Home painting services",
            color: "bg-pink-50",
            iconColor: "text-pink-600",
            popular: false
        },
        {
            name: "Cleaning",
            icon: "🧹",
            description: "Home & office cleaning",
            color: "bg-green-50",
            iconColor: "text-green-600",
            popular: true
        },
        {
            name: "AC Repair",
            icon: "❄️",
            description: "AC repair & maintenance",
            color: "bg-cyan-50",
            iconColor: "text-cyan-600",
            popular: true
        },
        {
            name: "Mechanic",
            icon: "🔩",
            description: "Vehicle repair services",
            color: "bg-purple-50",
            iconColor: "text-purple-600",
            popular: false
        },
        {
            name: "RO Repair",
            icon: "💧",
            description: "Water purifier services",
            color: "bg-sky-50",
            iconColor: "text-sky-600",
            popular: false
        },
        {
            name: "Appliance Repair",
            icon: "🔌",
            description: "Home appliance repair",
            color: "bg-indigo-50",
            iconColor: "text-indigo-600",
            popular: false
        },
        {
            name: "Tutor",
            icon: "📚",
            description: "Home & online tutors",
            color: "bg-rose-50",
            iconColor: "text-rose-600",
            popular: false
        },
        {
            name: "Beauty",
            icon: "💇",
            description: "Beauty & personal care",
            color: "bg-fuchsia-50",
            iconColor: "text-fuchsia-600",
            popular: false
        },
        {
            name: "Photographer",
            icon: "📷",
            description: "Events & photography",
            color: "bg-amber-50",
            iconColor: "text-amber-600",
            popular: false
        }
    ];

    const filteredServices = services.filter((service) =>
        service.name.toLowerCase().includes(search.toLowerCase())
    );

    const popularServices = services.filter(
        (service) => service.popular
    );

    const handleService = (service) => {
        localStorage.setItem("selectedService", service);
        navigate("/providers");
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">

            {/* HEADER */}

            <header className="bg-white border-b border-gray-100 sticky top-0 z-40">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="h-20 flex items-center gap-4">

                        <button
                            onClick={() => navigate("/home")}
                            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl text-gray-700 hover:bg-gray-200 transition"
                        >
                            ←
                        </button>

                        <div className="flex-1">
                            <h1 className="text-xl font-bold text-gray-900">
                                All Services
                            </h1>

                            <p className="text-xs text-gray-500 mt-1">
                                Explore services near you
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

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* HERO */}

                <section className="pt-7">

                    <span className="text-sm font-semibold text-blue-600">
                        FIND YOUR SERVICE
                    </span>

                    <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">
                        What do you need help with?
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Choose a service and connect with trusted professionals.
                    </p>

                </section>


                {/* SEARCH */}

                <section className="mt-6">

                    <div className="flex items-center h-14 bg-white border border-gray-200 rounded-2xl shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-50">

                        <span className="ml-4 text-gray-400 text-lg">
                            🔍
                        </span>

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search electrician, plumber..."
                            className="flex-1 h-full px-3 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                        />

                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="mr-4 text-gray-400 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        )}

                    </div>

                </section>


                {/* PROMO BANNER */}

                {!search && (
                    <section className="mt-7">

                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 p-6 sm:p-8">

                            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10"></div>

                            <div className="relative z-10 max-w-lg">

                                <span className="text-xs font-semibold text-blue-100 uppercase tracking-wider">
                                    Digital Chok Special
                                </span>

                                <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white">
                                    Get 40% OFF
                                </h2>

                                <p className="mt-2 text-sm text-blue-100">
                                    Book your first service and enjoy exclusive savings.
                                </p>

                                <button
                                    onClick={() => handleService("Plumber")}
                                    className="mt-5 px-5 py-2.5 bg-white text-blue-700 rounded-xl text-sm font-bold hover:bg-blue-50 transition"
                                >
                                    Explore Services →
                                </button>

                            </div>

                            <div className="absolute right-5 bottom-2 hidden sm:block text-7xl">
                                🧑‍🔧
                            </div>

                        </div>

                    </section>
                )}


                {/* POPULAR SERVICES */}

                {!search && (
                    <section className="mt-9">

                        <div className="flex items-center justify-between mb-5">

                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Popular Services
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Frequently booked services
                                </p>
                            </div>

                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">

                            {popularServices.map((service) => (

                                <button
                                    key={service.name}
                                    onClick={() => handleService(service.name)}
                                    className="bg-white border border-gray-100 rounded-2xl p-4 text-left hover:border-blue-300 hover:shadow-md transition-all group"
                                >

                                    <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center text-2xl group-hover:scale-110 transition`}>
                                        {service.icon}
                                    </div>

                                    <h3 className="mt-4 text-sm font-bold text-gray-900">
                                        {service.name}
                                    </h3>

                                    <p className="mt-1 text-xs text-gray-500">
                                        {service.description}
                                    </p>

                                    <div className="mt-3 text-xs font-semibold text-blue-600">
                                        Explore →
                                    </div>

                                </button>

                            ))}

                        </div>

                    </section>
                )}


                {/* ALL CATEGORIES */}

                <section className="mt-10">

                    <div className="flex items-center justify-between mb-5">

                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                {search ? "Search Results" : "All Categories"}
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                {filteredServices.length} services available
                            </p>
                        </div>

                    </div>


                    {filteredServices.length > 0 ? (

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

                            {filteredServices.map((service) => (

                                <button
                                    key={service.name}
                                    onClick={() => handleService(service.name)}
                                    className="group bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 text-left hover:border-blue-400 hover:shadow-lg transition-all duration-200"
                                >

                                    <div className="flex items-center justify-between">

                                        <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center text-3xl group-hover:scale-110 transition`}>
                                            {service.icon}
                                        </div>

                                        <span className="text-gray-300 group-hover:text-blue-600 transition text-lg">
                                            →
                                        </span>

                                    </div>

                                    <h3 className="mt-4 font-bold text-gray-900 text-sm sm:text-base">
                                        {service.name}
                                    </h3>

                                    <p className="mt-1 text-xs text-gray-500 leading-5">
                                        {service.description}
                                    </p>

                                </button>

                            ))}

                        </div>

                    ) : (

                        <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center">

                            <div className="text-5xl">
                                🔍
                            </div>

                            <h3 className="mt-4 font-bold text-gray-900">
                                No services found
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Try searching with a different service name.
                            </p>

                            <button
                                onClick={() => setSearch("")}
                                className="mt-5 text-sm font-semibold text-blue-600"
                            >
                                Clear Search
                            </button>

                        </div>

                    )}

                </section>


                {/* HELP BANNER */}

                <section className="mt-10">

                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                        <div>
                            <h3 className="text-lg font-bold text-gray-900">
                                Can't find your service?
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Explore all available local professionals.
                            </p>
                        </div>

                        <button
                            onClick={() => navigate("/providers")}
                            className="px-5 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
                        >
                            Find Professionals →
                        </button>

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
                        onClick={() => navigate("/provider-profile")}
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

export default Services;
