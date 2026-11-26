import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  UserRound,
  Mail,
  Phone,
  ShieldCheck,
  LogOut,
  MonitorSmartphone,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

function getUserFromResponse(payload) {
  // Supports common API envelopes: { user }, { data: { user } }, or { data }.
  return payload?.user ?? payload?.data?.user ?? payload?.data ?? payload;
}

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [action, setAction] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${API_BASE}/auth/me`, {
          method: "GET",
          credentials: "include",
          headers: { Accept: "application/json" },
        });

        const payload = await response.json().catch(() => ({}));

        if (response.status === 401) {
          navigate("/", { replace: true });
          return;
        }
        if (!response.ok) {
          throw new Error(payload?.message || "Unable to load your profile.");
        }

        if (active) setUser(getUserFromResponse(payload));
      } catch (err) {
        if (active) {
          setError(
            err?.message ||
              "Could not connect to the server. Please try again."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadProfile();
    return () => {
      active = false;
    };
  }, [navigate]);

  const performLogout = async (type) => {
    const endpoint =
      type === "all" ? "/auth/logout-all" : "/auth/logout";

    setAction(type);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        credentials: "include",
        headers: { Accept: "application/json" },
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          payload?.message ||
            (type === "all"
              ? "Logout from all devices is not configured on the backend yet."
              : "Logout failed. Please try again.")
        );
      }

      // Cookie sessions are cleared/revoked by the backend response.
      // Remove any legacy client-side auth cache if the app used it.
      localStorage.removeItem("token");
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");

      setMessage(
        type === "all"
          ? "You have been logged out from all devices."
          : "You have been logged out."
      );
      navigate("/", { replace: true });
    } catch (err) {
      setError(err?.message || "Logout failed. Please try again.");
    } finally {
      setAction("");
    }
  };

  const displayName =
    user?.fullName || user?.name || user?.username || "DigitalChok User";
  const email = user?.email || "Not added";
  const phone = user?.phone || user?.phoneNumber || "Not added";
  const role = user?.role || "Customer";

  return (
    
 <main className="min-h-screen bg-slate-50 pb-12">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-4 sm:px-6">
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <h1 className="text-lg font-extrabold text-slate-900">
              My Profile
            </h1>
            <p className="text-sm text-slate-500">
              Manage your DigitalChok account
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {/* Error message */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            <AlertCircle size={19} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Success message */}
        {message && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white">
            <RefreshCw
              size={26}
              className="animate-spin text-blue-600"
            />

            <p className="mt-4 text-sm font-semibold text-slate-700">
              Loading your profile...
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Please wait a moment
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            {/* Left column */}
            <div className="space-y-6">
              {/* Profile card */}
              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                {/* Banner */}
                <div className="relative h-36 overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500">
                  <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full border-[28px] border-white/10" />

                  <div className="absolute -bottom-20 right-28 h-40 w-40 rounded-full bg-white/10" />

                  <div className="absolute bottom-5 left-6">
                    <p className="text-xs font-bold tracking-[0.2em] text-white/90">
                      DIGITALCHOK
                    </p>
                  </div>
                </div>

                {/* Profile details */}
                <div className="px-5 py-6 sm:px-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-4">
                      {/* Avatar */}
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-3xl font-extrabold text-blue-600">
                        {displayName?.charAt(0)?.toUpperCase() || "U"}
                      </div>

                      {/* Name */}
                      <div className="min-w-0">
                        <h2 className="break-words text-xl font-extrabold text-slate-900">
                          {displayName || "User"}
                        </h2>

                        <p className="mt-1 text-sm capitalize text-slate-500">
                          {role || "Customer"}
                        </p>
                      </div>
                    </div>

                    {/* Account status */}
                    <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Account active
                    </span>
                  </div>

                  {/* Personal information */}
                  <div className="mt-7">
                    <div className="mb-4 flex items-center gap-2">
                      <UserRound size={18} className="text-blue-600" />

                      <h3 className="text-sm font-bold text-slate-800">
                        Personal information
                      </h3>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <ProfileInfo
                        icon={<Mail size={18} />}
                        label="Email address"
                        value={email || "Not provided"}
                      />

                      <ProfileInfo
                        icon={<Phone size={18} />}
                        label="Phone number"
                        value={phone || "Not provided"}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Account security */}
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <ShieldCheck size={23} />
                  </div>

                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">
                      Account security
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Your account is protected by secure sign-in sessions.
                      You can manage where you're logged in.
                    </p>
                  </div>
                </div>

                {/* Secure session */}
                <div className="mt-5 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                    <ShieldCheck size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Secure session
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      You are currently signed in
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Right column */}
            <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Account settings
                </p>

                <h2 className="mt-2 text-xl font-extrabold text-slate-900">
                  Manage account
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Control your login sessions and keep your account secure.
                </p>
              </div>

              <div className="space-y-3">
                {/* Logout current device */}
                <button
                  onClick={() => performLogout("current")}
                  disabled={Boolean(action)}
                  className="group flex w-full items-center justify-between rounded-2xl border border-slate-200 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-white group-hover:text-blue-600">
                      <LogOut size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {action === "current"
                          ? "Logging out..."
                          : "Logout"}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Sign out from this device
                      </p>
                    </div>
                  </div>

                  <ArrowLeft
                    size={17}
                    className="rotate-180 text-slate-400 transition group-hover:translate-x-1"
                  />
                </button>

                {/* Logout all devices */}
                <button
                  onClick={() => {
                    const confirmed = window.confirm(
                      "This will sign you out on every device. Continue?"
                    );

                    if (confirmed) {
                      performLogout("all");
                    }
                  }}
                  disabled={Boolean(action)}
                  className="group flex w-full items-center justify-between rounded-2xl border border-rose-100 bg-rose-50/50 p-4 text-left transition hover:border-rose-200 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                      <MonitorSmartphone size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-rose-700">
                        {action === "all"
                          ? "Logging out everywhere..."
                          : "Logout everywhere"}
                      </p>

                      <p className="mt-1 text-xs text-rose-600/70">
                        Sign out from all devices
                      </p>
                    </div>
                  </div>

                  <ArrowLeft
                    size={17}
                    className="rotate-180 text-rose-400 transition group-hover:translate-x-1"
                  />
                </button>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="text-xs leading-5 text-slate-400">
                  Logging out everywhere will invalidate all active
                  sessions for your account.
                </p>
              </div>
            </aside>
          </div>
        )}

        {/* Back to home */}
        <Link
          to="/"
          className="group mt-8 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
        >
          <ArrowLeft
            size={16}
            className="transition group-hover:-translate-x-1"
          />
          Back to Home
        </Link>
      </div>
    </main>

  );
};

function ProfileInfo({ icon, label, value }) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-2xl bg-slate-50 p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-500">{label}</p>
        <p className="mt-1 break-words text-sm font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
}

export default Profile;
