'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {confirmOrder} from "../../lib/api";
// Dynamically import the DeliveryMap component with SSR disabled
const DeliveryMap = dynamic(() => import("../../components/map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-[#FAFAFC] rounded-3xl border border-gray-100 flex items-center justify-center text-xs text-gray-400">
      Loading Map...
    </div>
  ),
});

export default function CheckoutPage() {
  const router = useRouter();
  
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleMapClick = (locationData) => {
    setSelectedLocation(locationData);
    setErrorMsg("");
  };

  const mapMarkers = selectedLocation 
    ? [{ position: [selectedLocation.lat, selectedLocation.lng], popupText: selectedLocation.address }]
    : [];

  // Submit Handler using your confirmOrder helper
  const handlePlaceOrder = async () => {
    if (!selectedLocation) {
      setErrorMsg("Please click on the map to select your delivery location.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    // Build payload to send to your helper
    const checkoutPayload = {
      shippingAddress: {
        formattedAddress: selectedLocation.address || "",
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
        street: selectedLocation.street || selectedLocation.address || "",
        city: selectedLocation.city || "",
        postalCode: selectedLocation.postalCode || "",
      },
      paymentMethod,
    };

    // Call your imported function directly
    const res = await confirmOrder(checkoutPayload);

    if (res?.success) {
      router.push("/dashboard");
    } else {
      setErrorMsg(res?.message || res?.error || "Failed to place order.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 space-y-5 font-sans text-slate-800">
      {/* Main Section Card */}
      <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/70 p-5 sm:p-7 shadow-xl shadow-slate-200/40 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100/80 flex items-center justify-center shrink-0 shadow-xs">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Select Delivery Address on Map
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Click anywhere on the map to pinpoint your exact drop-off location
              </p>
            </div>
          </div>
          
          <span className="self-start sm:self-auto px-3 py-1 text-[11px] font-bold text-indigo-700 bg-indigo-50/80 rounded-full border border-indigo-100/80 shrink-0">
            Interactive Map
          </span>
        </div>

        {/* Map Frame Container */}
        <div className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm bg-slate-100 relative">
          <DeliveryMap 
            markers={mapMarkers} 
            onLocationSelect={handleMapClick} 
          />
        </div>

        {/* Selected Location Banner */}
        {selectedLocation && (
          <div className="p-4 sm:p-5 bg-gradient-to-br from-indigo-50/90 to-violet-50/60 border border-indigo-100 rounded-2xl text-slate-800 transition-all shadow-xs flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/20 mt-0.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="space-y-0.5 overflow-hidden">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                Selected Address
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug break-words">
                {selectedLocation.address}
              </p>
            </div>
          </div>
        )}

        {/* Payment Method Selector */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Payment Method
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod("Cash on Delivery")}
              className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                paymentMethod === "Cash on Delivery"
                  ? "bg-indigo-50/60 border-indigo-600 ring-2 ring-indigo-600/20 text-indigo-900"
                  : "border-slate-200 hover:bg-slate-50 text-slate-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">💵</span>
                <div>
                  <p className="text-xs font-bold">Cash on Delivery</p>
                  <p className="text-[11px] text-slate-400">Pay when your order arrives</p>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("Card")}
              className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                paymentMethod === "Card"
                  ? "bg-indigo-50/60 border-indigo-600 ring-2 ring-indigo-600/20 text-indigo-900"
                  : "border-slate-200 hover:bg-slate-50 text-slate-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">💳</span>
                <div>
                  <p className="text-xs font-bold">Credit / Debit Card</p>
                  <p className="text-[11px] text-slate-400">Pay securely online</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Error Message Alert */}
        {errorMsg && (
          <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl text-xs font-semibold text-rose-600">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Confirm Order Button */}
        <button
          onClick={handlePlaceOrder}
          disabled={!selectedLocation || loading}
          className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:cursor-not-allowed text-white font-bold text-sm shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Confirming Order...</span>
            </>
          ) : (
            <span>Confirm & Place Order</span>
          )}
        </button>

      </div>
    </div>
  );
}