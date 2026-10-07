"use client";
import Link from "next/link";
import { getUser } from "../../lib/api";
import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Sidebar, Header, Footer } from "../../components/siteAnatomy";
import CustomerDashboard from "../../components/CustomerView";
import DriverView from "../../components/driverview";
import GroceryCartIllustration from "../../components/customerDrawings/GroceryCartIllustration";
import ShoppingLifestyleIllustration from "../../components/customerDrawings/ShoppingLifestyleIllustration";
import SettingsIllustration from "../../components/customerDrawings/SettingsIllustration";
import TruckDriverIllustration from "../../components/customerDrawings/TruckDriverIllustration";
import LiveTrackingMap from "../../components/customerDrawings/LiveTrackingMap";

export default function DashBOARD() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Added mobile sidebar state

  useEffect(() => {
    startTransition(async () => {
      {
        /*
         first why are you calling an api directally in an UI component? you should call it in a helper function and then call that helper function in the componnt!
         
        */
      }
      const responce = await getUser();

      console.log("Full API Response:", responce);

      if (responce && responce.data) {
        setUser(responce.data);
      } else {
        router.push("/auth");
      }
      setLoading(false);
    });
  }, [router]);

  if (loading || isPending) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50/70 text-slate-600 font-sans">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs sm:text-sm font-bold text-slate-700">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  const userRole = user?.role?.trim();

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F8F6] font-sans text-slate-800 relative overflow-x-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-lime-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Pass the menu toggle handler to the Header */}
      <Header onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="flex flex-1 relative">
        {/* Pass the open state and close handler to the Sidebar drawer */}

        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8 w-full">
          {/* User Welcome Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl bg-white/95 backdrop-blur-xl p-5 sm:p-6 shadow-xl shadow-[#162B22]/5 border border-[#162B22]/10 transition-all">
            <div className="flex items-center gap-4">
              {/* Profile Avatar Badge using custom forest green */}
              <div className="w-12 h-12 rounded-2xl bg-[#162B22] text-white font-black text-lg flex items-center justify-center shadow-md shadow-[#162B22]/20 shrink-0 uppercase tracking-wider">
                {user?.name ? user.name.charAt(0) : "U"}
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                  Welcome back, {user?.name}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-stone-400 font-medium">
                    Role:
                  </span>
                  <span className="px-2.5 py-0.5 text-xs font-bold text-[#162B22] bg-[#162B22]/5 rounded-full border border-[#162B22]/15 capitalize">
                    {user?.role || "User"}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sessionStorage.removeItem("token");
                router.push("/auth/log");
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-rose-50/80 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-100 hover:text-rose-700 transition-all border border-rose-100 shrink-0 active:scale-95 shadow-xs"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Log Out
            </button>
          </div>

          {/* Customer View Component */}
          {userRole?.toLowerCase() === "customer" && (
            <div className="flex flex-row gap-6 w-full items-start relative">
              {/* Sidebar on the left (sticky) */}
              <div className="sticky top-6 self-start shrink-0">
                <Sidebar
                  isOpen={isSidebarOpen}
                  onClose={() => setIsSidebarOpen(false)}
                />
              </div>

              {/* Main Content Area */}
              <div className="flex-1 min-w-0 space-y-6">
                <CustomerDashboard />
                {/* Bottom Section: 3-Column Horizontal Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* 1. Shopping Cart Card */}
                  <div className="flex flex-col items-center justify-between p-8 bg-white rounded-3xl shadow-sm border border-stone-100 space-y-6">
                    <div className="text-center space-y-1">
                      <h3 className="text-lg font-bold text-stone-800">
                        Your Shopping Cart
                      </h3>
                      <p className="text-xs text-stone-500">
                        Review your items and proceed to checkout
                      </p>
                    </div>

                    <GroceryCartIllustration className="w-48 h-48 z-10 drop-shadow-xl hover:scale-105 transition-transform duration-300" />

                    <Link
                      href="/dashboard/ordersAndRoutes"
                      className="w-full bg-[#162B22] hover:bg-[#1e3b2f] text-white font-bold py-3 px-6 rounded-2xl text-center text-sm shadow-lg shadow-emerald-900/10 transition-all flex items-center justify-center gap-2 group"
                    >
                      <span>See Your Order & Finalize</span>
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>

                  {/* 2. System Preferences Card */}
                  <div className="flex flex-col items-center justify-between p-8 bg-white rounded-3xl shadow-sm border border-stone-100 space-y-6">
                    <div className="text-center space-y-1">
                      <h3 className="text-lg font-bold text-stone-800">
                        System Preferences
                      </h3>
                      <p className="text-xs text-stone-500">
                        Configure your account and app settings
                      </p>
                    </div>

                    <SettingsIllustration className="w-48 h-48 z-10 drop-shadow-xl hover:scale-105 transition-transform duration-300" />

                    <Link
                      href="/dashboard/settings"
                      className="w-full bg-[#162B22] hover:bg-[#1e3b2f] text-white font-bold py-3 px-6 rounded-2xl text-center text-sm transition-all flex items-center justify-center gap-2 group"
                    >
                      <span>Manage Settings</span>
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>

                  {/* 3. Route & Tracking Card */}
                  <div className="flex flex-col items-center justify-between p-8 bg-white rounded-3xl shadow-sm border border-stone-100 space-y-6">
                    <div className="text-center space-y-1">
                      <h3 className="text-lg font-bold text-stone-800">
                        Route & Tracking
                      </h3>
                      <p className="text-xs text-stone-500">
                        Monitor live delivery status and driver updates
                      </p>
                    </div>

                    <TruckDriverIllustration className="w-48 h-48 z-10 drop-shadow-xl hover:scale-105 transition-transform duration-300" />

                    <Link
                      href="/dashboard/discover-Drivers"
                      className="w-full bg-[#162B22] hover:bg-[#1e3b2f] text-white font-bold py-3 px-6 rounded-2xl text-center text-sm shadow-lg shadow-emerald-900/10 transition-all flex items-center justify-center gap-2 group"
                    >
                      <span> See your Driver infos</span>
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                  <div className="max-w-7xl mx-auto px-6 w-full flex justify-end pb-12">
                    <div className="w-80 space-y-2">
                      <p className="text-xs font-semibold tracking-wider text-stone-400 uppercase text-right">
                        Track Delivery
                      </p>
                      <LiveTrackingMap />
                    </div>
                  </div>
                </div>
              </div>

              {/* FLOATING WIDGET: Shopping & Lifestyle Illustration pinned to the bottom-left */}
              <div className="fixed bottom-6 left-6 z-45 hidden xl:block hover:scale-105 transition-transform duration-300 cursor-pointer pointer-events-none">
                <ShoppingLifestyleIllustration className="w-40 h-40 drop-shadow-2xl" />
              </div>
            </div>
          )}

          {/* Driver View Component Placeholder */}
          {userRole?.toLowerCase() === "driver" && <DriverView />}
        </main>
      </div>

      <Footer />
    </div>
  );
}
