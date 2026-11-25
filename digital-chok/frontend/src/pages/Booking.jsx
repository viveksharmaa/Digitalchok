
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Booking() {
    const navigate = useNavigate();

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [address, setAddress] = useState("");
    const [notes, setNotes] = useState("");

    // Get selected provider
    let provider = null;

    try {
        const providerData = localStorage.getItem("selectedProvider");
        provider = providerData ? JSON.parse(providerData) : null;
    } catch (error) {
        console.error("Provider data error:", error);
    }

    // Current date
    const today = new Date().toLocaleDateString("en-CA");

    // Handle booking
    const handleBooking = () => {
        if (!provider || !provider.id) {
            alert("Please select a valid service provider.");
            navigate("/providers");
            return;
        }

        if (!provider.available) {
            alert("This provider is currently unavailable.");
            return;
        }

        if (!date || !time || !address.trim()) {
            alert("Please fill all required booking details.");
            return;
        }

        if (date < today) {
            alert("Please select a valid future date.");
            return;
        }

        try {
            const existingBookings = JSON.parse(
                localStorage.getItem("bookings") || "[]"
            );

            const booking = {
                id: Date.now().toString(),
                providerId: provider.id,
                providerName: provider.name,
                providerImage: provider.image || "",
                customerName:
                    localStorage.getItem("userName") || "Customer",
                service: provider.service,
                date,
                time,
                address: address.trim(),
                notes: notes.trim(),
                price: Number(provider.price) || 0,
                status: "Requested",
                createdAt: new Date().toISOString()
            };

            const updatedBookings = [
                ...existingBookings,
                booking
            ];

            localStorage.setItem(
                "bookings",
                JSON.stringify(updatedBookings)
            );

            // Keep latest booking for convenience
            localStorage.setItem(
                "booking",
                JSON.stringify(booking)
            );

            alert("Service request sent successfully!");

            navigate("/home");

        } catch (error) {
            console.error("Booking error:", error);
            alert("Unable to save booking. Please try again.");
        }
    };

    // Provider not selected
    if (!provider) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">

                <div className="bg-white p-8 rounded-2xl text-center max-w-md w-full border border-gray-100">

                    <div className="text-5xl">📅</div>

                    <h2 className="text-xl font-bold text-gray-900 mt-4">
                        No Provider Selected
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                        Please select a service provider before booking.
                    </p>

                    <button
                        onClick={() => navigate("/providers")}
                        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
                    >
                        Find Providers
                    </button>

                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-10">

            {/* HEADER */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-40">

                <div className="max-w-3xl mx-auto h-16 px-4 flex items-center gap-4">

                    <button
                        onClick={() => navigate("/provider-profile")}
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl hover:bg-gray-200"
                    >
                        ←
                    </button>

                    <h1 className="text-lg font-bold text-gray-900">
                        Book Service
                    </h1>

                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-6">

                {/* SELECTED PROVIDER */}
                <section className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">

                    <h2 className="font-bold text-gray-900 mb-4">
                        Selected Professional
                    </h2>

                    <div className="flex items-center gap-4">

                        <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden shrink-0">

                            {provider.image ? (
                                <img
                                    src={provider.image}
                                    alt={provider.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-4xl">
                                    👤
                                </div>
                            )}

                        </div>

                        <div className="flex-1 min-w-0">

                            <h3 className="font-bold text-gray-900 text-lg truncate">
                                {provider.name}
                            </h3>

                            <p className="text-sm text-blue-600 mt-1">
                                {provider.service}
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                                ⭐ {Number(provider.rating) > 0
                                    ? Number(provider.rating).toFixed(1)
                                    : "New Provider"}
                            </p>

                            <p className={`text-xs font-semibold mt-1 ${
                                provider.available
                                    ? "text-green-600"
                                    : "text-red-500"
                            }`}>
                                {provider.available
                                    ? "● Available"
                                    : "● Busy"}
                            </p>

                        </div>

                        <div className="text-right">
                            <p className="text-xs text-gray-400">
                                Starting Price
                            </p>

                            <p className="text-xl font-bold text-blue-700">
                                ₹{provider.price ?? 0}
                            </p>
                        </div>

                    </div>

                </section>

                {/* BOOKING FORM */}
                <section className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 mt-5">

                    <h2 className="text-lg font-bold text-gray-900">
                        Booking Details
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Select your preferred date and time.
                    </p>

                    {/* DATE */}
                    <div className="mt-6">

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Select Date *
                        </label>

                        <input
                            type="date"
                            min={today}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 bg-white"
                        />

                    </div>

                    {/* TIME */}
                    <div className="mt-5">

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Select Time *
                        </label>

                        <select
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 bg-white"
                        >

                            <option value="">
                                Select preferred time
                            </option>

                            <option value="10:00 AM">10:00 AM</option>
                            <option value="12:00 PM">12:00 PM</option>
                            <option value="02:00 PM">02:00 PM</option>
                            <option value="04:00 PM">04:00 PM</option>
                            <option value="06:00 PM">06:00 PM</option>
                            <option value="08:00 PM">08:00 PM</option>

                        </select>

                    </div>

                    {/* ADDRESS */}
                    <div className="mt-5">

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Service Address *
                        </label>

                        <textarea
                            rows="4"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter your complete address, house number, street, area and landmark..."
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 resize-none"
                        />

                    </div>

                    {/* ADDITIONAL NOTES */}
                    <div className="mt-5">

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Additional Instructions (Optional)
                        </label>

                        <textarea
                            rows="3"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Describe your problem or any special requirements..."
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 resize-none"
                        />

                    </div>

                </section>

                {/* PRICE SUMMARY */}
                <section className="bg-white rounded-2xl border border-gray-100 p-5 mt-5">

                    <h2 className="font-bold text-gray-900">
                        Price Summary
                    </h2>

                    <div className="flex justify-between items-center mt-5">

                        <span className="text-sm text-gray-500">
                            Starting Service Price
                        </span>

                        <span className="font-semibold text-gray-900">
                            ₹{Number(provider.price) || 0}
                        </span>

                    </div>

                    <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">

                        <span className="font-bold text-gray-900">
                            Estimated Total
                        </span>

                        <span className="text-xl font-bold text-blue-700">
                            ₹{Number(provider.price) || 0}
                        </span>

                    </div>

                    <p className="text-xs text-gray-400 mt-3">
                        Final charges may vary depending on the work required.
                    </p>

                </section>

                {/* CONFIRM BOOKING */}
                <button
                    onClick={handleBooking}
                    disabled={!provider.available}
                    className="w-full mt-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-bold transition shadow-sm"
                >
                    {provider.available
                        ? "Confirm Booking →"
                        : "Provider Currently Unavailable"}
                </button>

                <p className="text-center text-xs text-gray-400 mt-3">
                    Your service request will be saved after confirmation.
                </p>

            </main>

        </div>
    );
}

export default Booking;
