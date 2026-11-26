import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Search,
  ChevronDown,
  Menu,
  X,
  UserRound,
  BriefcaseBusiness,
  Star,
  Clock3,
  Navigation,
  LocateFixed,
  ArrowRight,
  MapPinned,
  Check,
} from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default marker assets when bundled with Vite.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const categories = [
  { name: "Plumber", icon: "🔧", color: "bg-blue-50" },
  { name: "Electrician", icon: "⚡", color: "bg-yellow-50" },
  { name: "Carpenter", icon: "🪚", color: "bg-orange-50" },
  { name: "Painter", icon: "🎨", color: "bg-pink-50" },
  { name: "Cleaning", icon: "🧹", color: "bg-green-50" },
  { name: "AC Repair", icon: "❄️", color: "bg-cyan-50" },
  { name: "Mechanic", icon: "🔩", color: "bg-purple-50" },
  { name: "RO Repair", icon: "💧", color: "bg-sky-50" },
];

// Demo listings. Replace this array with the providers API when backend is ready.
// Coordinates are sample points around Bareilly, not verified provider addresses.
const providers = [
  {
    id: 1,
    name: "Raj Kumar",
    service: "Plumbing Services",
    category: "Plumber",
    rating: "4.9",
    reviews: 120,
    price: 299,
    available: true,
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=700&q=80",
    lat: 28.3672,
    lng: 79.4304,
    area: "Civil Lines",
  },
  {
    id: 2,
    name: "Amit Sharma",
    service: "Electrician Services",
    category: "Electrician",
    rating: "4.8",
    reviews: 96,
    price: 249,
    available: true,
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=700&q=80",
    lat: 28.3558,
    lng: 79.4169,
    area: "Model Town",
  },
  {
    id: 3,
    name: "Rohit Verma",
    service: "Home Repair Services",
    category: "Carpenter",
    rating: "4.7",
    reviews: 84,
    price: 349,
    available: false,
    image:
      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=700&q=80",
    lat: 28.3741,
    lng: 79.4481,
    area: "DD Puram",
  },
  {
    id: 4,
    name: "Sandeep Yadav",
    service: "Painting Services",
    category: "Painter",
    rating: "4.8",
    reviews: 73,
    price: 399,
    available: true,
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=700&q=80",
    lat: 28.3418,
    lng: 79.4262,
    area: "Shastri Nagar",
  },
  {
    id: 5,
    name: "Imran Khan",
    service: "Home Cleaning",
    category: "Cleaning",
    rating: "4.6",
    reviews: 65,
    price: 199,
    available: true,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=80",
    lat: 28.3611,
    lng: 79.455,
    area: "Rajendra Nagar",
  },
  {
    id: 6,
    name: "Vikas Singh",
    service: "AC Repair Services",
    category: "AC Repair",
    rating: "4.9",
    reviews: 58,
    price: 499,
    available: true,
    image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=700&q=80",
    lat: 28.386,
    lng: 79.414,
    area: "Izzat Nagar",
  },
];

const DEFAULT_LOCATION = {
  label: "Bareilly, Uttar Pradesh",
  lat: 28.367,
  lng: 79.430,
};

function MapRecenter({ center }) {
  const map = useMap();
  React.useEffect(() => {
    if (center?.lat && center?.lng) {
      map.setView([center.lat, center.lng], 13, { animate: true });
    }
  }, [center, map]);
  return null;
}

function MapClickPicker({ onPick }) {
  useMapEvents({
    click(event) {
      onPick(event.latlng);
    },
  });
  return null;
}

function distanceKm(a, b) {
  const rad = (value) => (value * Math.PI) / 180;
  const earthRadius = 6371;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const value =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) *
      Math.cos(rad(b.lat)) *
      Math.sin(dLng / 2) ** 2;
  return earthRadius * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
}

function Home() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [locationLabel, setLocationLabel] = useState(DEFAULT_LOCATION.label);
  const [locationOpen, setLocationOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [pickedPoint, setPickedPoint] = useState(null);

  const visibleProviders = useMemo(() => {
    const query = submittedSearch.trim().toLowerCase();
    return providers
      .filter((provider) => {
        const matchesCategory =
          activeCategory === "All" || provider.category === activeCategory;
        const searchableText = [
          provider.name,
          provider.service,
          provider.category,
          provider.area,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        const matchesSearch = !query || searchableText.includes(query);
        return matchesCategory && matchesSearch;
      })
      .map((provider) => ({
        ...provider,
        distance: distanceKm(location, {
          lat: provider.lat,
          lng: provider.lng,
        }).toFixed(1),
      }))
      .sort((a, b) => Number(a.distance) - Number(b.distance));
  }, [submittedSearch, activeCategory, location]);

  const selectCategory = (category) => {
    setActiveCategory(category);
    setSearchInput("");
    setSubmittedSearch("");
  };

  const clearAllFilters = () => {
    setActiveCategory("All");
    setSearchInput("");
    setSubmittedSearch("");
  };

  const handleProvider = (provider) => {
    localStorage.setItem("selectedProvider", JSON.stringify(provider));
    navigate("/provider-profile");
  };

  const handleSearch = (event) => {
    event?.preventDefault();

    // Search across every category, not just the previously selected category.
    setActiveCategory("All");
    setSubmittedSearch(searchInput.trim());
  };

  const useCurrentLocation = () => {
    setLocationError("");
    if (!navigator.geolocation) {
      setLocationError("Your browser does not support location access.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const next = { lat: coords.latitude, lng: coords.longitude };
        setLocation(next);
        setPickedPoint(next);
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${next.lat}&lon=${next.lng}`
          );
          if (response.ok) {
            const data = await response.json();
            const address = data.address || {};
            const area =
              address.suburb ||
              address.neighbourhood ||
              address.city ||
              address.town ||
              address.village ||
              address.county;
            const state = address.state;
            const label = [area, state].filter(Boolean).join(", ");
            setLocationLabel(label || "Current location");
          } else {
            setLocationLabel("Current location");
          }
        } catch {
          setLocationLabel("Current location");
        } finally {
          setLocating(false);
          setLocationOpen(false);
        }
      },
      (error) => {
        setLocating(false);
        setLocationError(
          error.code === 1
            ? "Location permission was denied. You can choose a point on the map."
            : "Could not detect your location. Please choose it on the map."
        );
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    );
  };

  const pickMapPoint = (point) => {
    const next = { lat: point.lat, lng: point.lng };
    setLocation(next);
    setPickedPoint(next);
    setLocationLabel(`Selected map location (${point.lat.toFixed(3)}, ${point.lng.toFixed(3)})`);
  };

  const confirmLocation = () => {
    setLocationOpen(false);
    setLocationError("");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Main navbar — no About / FAQ / Features links on the home screen */}
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/home" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <BriefcaseBusiness size={21} />
            </span>
            <span className="text-xl font-extrabold tracking-tight">
              Digital<span className="text-blue-600">Chok</span>
            </span>
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => setLocationOpen(true)}
              className="flex max-w-[280px] items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-left hover:border-blue-300 hover:bg-blue-50/50"
            >
              <MapPin size={18} className="shrink-0 text-blue-600" />
              <span className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Your location
                </span>
                <span className="block truncate text-sm font-semibold">{locationLabel}</span>
              </span>
              <ChevronDown size={16} className="text-slate-400" />
            </button>
            <button
              onClick={() => navigate("/profile")}
              aria-label="Open profile"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-700 transition hover:bg-blue-100"
            >
              <UserRound size={20} />
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setLocationOpen(true)}
              aria-label="Choose location"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700"
            >
              <MapPin size={19} />
            </button>
            <button
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label="Toggle menu"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-slate-100 bg-white px-4 py-3 md:hidden">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/profile");
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold hover:bg-slate-50"
            >
              <UserRound size={18} /> My Profile
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setLocationOpen(true);
              }}
              className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold hover:bg-slate-50"
            >
              <MapPin size={18} /> {locationLabel}
            </button>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="grid items-center gap-8 py-9 lg:grid-cols-[1.1fr_0.9fr] lg:py-12">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Local services, made simple
            </p>
            <h1 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Find trusted help for your{" "}
              <span className="text-blue-600">everyday needs.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
              Connect with local professionals for repairs, home services and more.
              Choose your location and explore available service providers.
            </p>

            <form
              onSubmit={handleSearch}
              className="mt-7 flex max-w-2xl items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-sm focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50"
            >
              <Search className="ml-3 shrink-0 text-slate-400" size={20} />
              <input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search plumber, electrician, repair..."
                className="h-11 min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Search
              </button>
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold">Popular:</span>
              {["Plumber", "Electrician", "Cleaning"].map((name) => (
                <button
                  key={name}
                  onClick={() => selectCategory(name)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 hover:border-blue-300 hover:text-blue-700"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-6 text-white sm:p-8">
            <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/10" />
            <div className="absolute -bottom-16 left-1/3 h-40 w-40 rounded-full bg-white/10" />
            <div className="relative">
              <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">
                One place. Local solutions.
              </span>
              <h2 className="mt-5 max-w-md text-2xl font-extrabold leading-snug sm:text-3xl">
                Skilled people, right around your neighbourhood.
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-blue-100">
                Select your area to make it easier to find the service you need.
              </p>
              <button
                onClick={() => setLocationOpen(true)}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
              >
                <MapPinned size={17} /> Choose your location
              </button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mt-3">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold sm:text-2xl">Browse services</h2>
              <p className="mt-1 text-sm text-slate-500">What kind of help are you looking for?</p>
            </div>
            <button
              onClick={() => {
                clearAllFilters();
              }}
              className="text-sm font-bold text-blue-600 hover:text-blue-700"
            >
              Show all
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => selectCategory(category.name)}
                className={`rounded-2xl border p-4 text-center transition ${
                  activeCategory === category.name
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                    : "border-slate-100 bg-white hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm"
                }`}
              >
                <span className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl ${category.color} text-2xl`}>
                  {category.icon}
                </span>
                <span className="mt-3 block text-xs font-bold text-slate-700">{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* All provider listings */}
        <section className="mt-10">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-extrabold sm:text-2xl">
                {activeCategory === "All" ? "Service providers" : `${activeCategory} providers`}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                All demo listings are shown here, sorted by distance from your selected map point.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {(submittedSearch || activeCategory !== "All") && (
                <button
                  onClick={clearAllFilters}
                  className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-100"
                >
                  Clear filters & search
                </button>
              )}
              <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                {visibleProviders.length} providers
              </span>
            </div>
          </div>

          {(submittedSearch || activeCategory !== "All") && (
            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-slate-500">Active filters:</span>
              {submittedSearch && (
                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-700">
                  Search: “{submittedSearch}”
                </span>
              )}
              {activeCategory !== "All" && (
                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-700">
                  Category: {activeCategory}
                </span>
              )}
            </div>
          )}

          {visibleProviders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <Search className="mx-auto text-slate-400" size={28} />
              <h3 className="mt-3 font-bold">No providers found</h3>
              <p className="mt-1 text-sm text-slate-500">Try another service or search term.</p>
              <button
                onClick={() => {
                  clearAllFilters();
                }}
                className="mt-4 text-sm font-bold text-blue-600"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {visibleProviders.map((provider) => (
                <article
                  key={provider.id}
                  onClick={() => handleProvider(provider)}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-48 bg-slate-100">
                    <img
                      src={provider.image}
                      alt={provider.service}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    />
                    <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-white ${
                      provider.available ? "bg-emerald-500" : "bg-slate-600"
                    }`}>
                      {provider.available ? "● Available" : "Busy"}
                    </span>
                    <span className="absolute bottom-3 right-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-slate-700">
                      {provider.distance} km away*
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-extrabold">{provider.name}</h3>
                        <p className="mt-1 text-sm text-slate-500">{provider.service}</p>
                        <p className="mt-1 text-xs text-slate-400">{provider.area}, Bareilly</p>
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-sm font-bold text-amber-700">
                        <Star size={14} fill="currentColor" /> {provider.rating}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                      <div>
                        <p className="text-xs text-slate-400">Starting from</p>
                        <p className="text-lg font-extrabold">₹{provider.price}</p>
                      </div>
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          handleProvider(provider);
                        }}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
                      >
                        View profile <ArrowRight size={15} />
                      </button>
                    </div>
                    <p className="mt-3 flex items-center gap-1 text-xs text-slate-400">
                      <Clock3 size={13} /> {provider.reviews} customer reviews
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
          <p className="mt-3 text-xs text-slate-400">
            *Provider locations and distances are sample data for the UI. Connect your provider API and saved coordinates for live nearby results.
          </p>
        </section>

        {/* Friendly call to action */}
        <section className="mt-10 rounded-3xl bg-blue-600 p-6 text-white sm:flex sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="text-xl font-extrabold sm:text-2xl">Need help with a service?</h2>
            <p className="mt-2 text-sm text-blue-100">Browse the listings and choose the professional you need.</p>
          </div>
          <button
            onClick={() => navigate("/services")}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50 sm:mt-0"
          >
            Browse services <ArrowRight size={16} />
          </button>
        </section>
      </main>

      {/* Bottom navigation retained from your existing routes */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-xl items-center justify-around px-3">
          <button onClick={() => navigate("/home")} className="flex flex-col items-center gap-1 text-blue-600">
            <span className="text-lg">⌂</span><span className="text-[11px] font-bold">Home</span>
          </button>
          <button onClick={() => navigate("/providers")} className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600">
            <span className="text-lg">▣</span><span className="text-[11px]">Bookings</span>
          </button>
          <button onClick={() => navigate("/services")} className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600">
            <span className="text-lg">⌕</span><span className="text-[11px]">Search</span>
          </button>
          <button onClick={() => navigate("/profile")} className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600">
            <UserRound size={19} /><span className="text-[11px]">Profile</span>
          </button>
        </div>
      </nav>

      {/* Location picker modal */}
      {locationOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/50 p-0 sm:items-center sm:p-4">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold">Choose your location</h2>
                <p className="mt-1 text-sm text-slate-500">Use your current location or click on the map.</p>
              </div>
              <button onClick={() => setLocationOpen(false)} aria-label="Close location picker" className="rounded-xl p-2 hover:bg-slate-100">
                <X size={20} />
              </button>
            </div>
            <button
              onClick={useCurrentLocation}
              disabled={locating}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              <LocateFixed size={17} /> {locating ? "Detecting location..." : "Use my current location"}
            </button>
            {locationError && <p className="mt-2 text-sm text-rose-600">{locationError}</p>}
            <div className="mt-4 h-[280px] overflow-hidden rounded-2xl border border-slate-200">
              <MapContainer center={[location.lat, location.lng]} zoom={12} className="h-full w-full">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapRecenter center={location} />
                <MapClickPicker onPick={pickMapPoint} />
                {pickedPoint && <Marker position={[pickedPoint.lat, pickedPoint.lng]} />}
              </MapContainer>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-400">Selected location</p>
                <p className="truncate text-sm font-bold">{locationLabel}</p>
              </div>
              <button onClick={confirmLocation} className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700">
                <Check size={16} /> Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
