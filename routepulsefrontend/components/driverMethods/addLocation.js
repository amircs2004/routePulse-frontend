"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getlNeasestOrder } from "../../lib/api";
import { assigneDriverApi } from "../../lib/api"
import dynamic from "next/dynamic";

// Dynamically import the Leaflet map component with SSR disabled
const DeliveryMap = dynamic(() => import("../../components/map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-[#FAFAFC] rounded-3xl border border-gray-100 flex items-center justify-center text-xs text-gray-400">
      Loading Map...
    </div>
  ),
});

export default function UpdateLocation() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nearestOrder, setNearestOrder] = useState(null);
  const [driverCoords, setDriverCoords] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [declinedIds, setDeclinedIds] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [refuse , setrefuse] = useState(false)

  //handkler that handles the slescted coordinates from the map component
  const handleLocationSelect = (locationInfo) => {
    setSelectedLocation(locationInfo);
  };

  // Triggered when the driver clicks the button
   const handleAssigningDriver =  async (orderId) => {
  try {
     
     const result = await assigneDriverApi(orderId)
     console.log(result)
     if(!result.ok){
       console.log('error at assgiginh driver');
       
     }
  }catch(error){
   console.error('Error at assigning driver:', error.message);
  }
   }
  const fetchNearestOrder = async (lng, lat) => {
    setLoading(true);
    setError(null);  
    try {
      const result = await getlNeasestOrder(lng, lat);
      console.log("neasrst order Api Response:", result);
      if (!result.success) {
        throw new Error(
          result.error || result.message || "Failed to find nearby orders.",
        );
      }
      setNearestOrder(result.data);
      console.log("Nearest Order Data:", result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFindNearestOrder = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    setError(null);

    setIsOnline(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const coords = { lat, lng };

        setDriverCoords(coords);
        setSelectedLocation({ ...coords, address: "Live GPS Position" });
        //to save the driver location i nthe frontend so not each time they have to like manually enter it if the driver declines  the nereasrt order recommanded
        localStorage.setItem("driverLocation", JSON.stringify(coords));

        // Call the shared helper
        fetchNearestOrder(lng, lat);
      },
      () => {
        setError(
          "Unable to retrieve your location. Please check browser permissions.",
        );
        setLoading(false);
      },
      { enableHighAccuracy: true },
    );
  };

  // 2. Triggered when clicking "Find Nearest Order Here" from a map click
  const handleSearchFromSelectedPin = () => {
    if (!selectedLocation) return;
    setIsOnline(true);

    // Call the exact same shared helper with the clicked coordinates
    fetchNearestOrder(selectedLocation.lng, selectedLocation.lat);
  };

  // Build markers array for the map component
  const mapMarkers = [];

  if (driverCoords) {
    mapMarkers.push({
      position: [driverCoords.lat, driverCoords.lng],
      popupText: "🛵 Your Driver GPS",
    });
  }

  if (selectedLocation) {
    mapMarkers.push({
      position: [selectedLocation.lat, selectedLocation.lng],
      popupText: `📍 Selected: ${selectedLocation.address}`,
    });
  }

  if (nearestOrder?.location?.coordinates) {
    const [orderLng, orderLat] = nearestOrder.location.coordinates;
    mapMarkers.push({
      position: [orderLat, orderLng],
      popupText: `🎯 Target Order (${nearestOrder.status})`,
    });
  }

  useEffect(() => {
    const savedLocation = localStorage.getItem("driverLocation");
    if (savedLocation) {
      const { lat, lng } = JSON.parse(savedLocation);
      // You can store these in state or use them right away
    }
  }, []);

  const handleDeclineOrder = (orderId) => {
    // Add this order to the declined list so it won't pop up again immediately
    const updatedDeclined = [...declinedIds, orderId];
    setDeclinedIds(updatedDeclined);
   
    // Clear current popup order
    setIsOnline(false)
    setNearestOrder(null);
      setrefuse(true)
    
    // Grab saved location from localStorage and fetch the next one
    const { lat, lng } = JSON.parse(localStorage.getItem("driverLocation"));
    fetchNearestOrder(lat, lng, updatedDeclined);
  };
  const handleAcceptOrder = async (orderId) => {
    try {
         const result = await assigneDriverApi(orderId)
     if(!result.ok){

       console.log('error at assgiginh driver');
     }
      alert(`Order ${orderId} accepted successfully! 🚀`);

      // Clear the popup and reset state or redirect to active delivery page
      setNearestOrder(null);

    } catch (err) {
      setError("Failed to accept order. Please try again.");
    }
  };
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#162B22]">
            Driver Dispatch Hub
          </h1>
          <p className="text-sm text-stone-500">
            Scan your current location to fetch the nearest active order.
          </p>
        </div>
             {/*
             deleted a dumb button that returns any order dumb asf
             */ 
             }
      
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm">
          {error}
        </div>
      )}

      {/* Map View */}
      <div className="w-full h-[400px] rounded-3xl overflow-hidden border border-stone-200 shadow-sm">
        <DeliveryMap
          center={[36.7538, 3.0588]}
          zoom={13}
          markers={mapMarkers}
          onLocationSelect={handleLocationSelect}
        />
      </div>

      {/* Nearest Order Info Card */}
      {nearestOrder && (
        <div className="bg-[#FAFBF9] p-6 rounded-3xl border border-stone-200 space-y-3 shadow-sm">
          <h2 className="text-lg font-bold text-stone-800">
            Target Order Acquired 🎯
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-stone-500 block">Status:</span>
              <span className="font-semibold uppercase text-stone-800">
                {nearestOrder.status}
              </span>
            </div>
            <div>
              <span className="text-stone-500 block">Items Count:</span>
              <span className="font-semibold text-stone-800">
                {nearestOrder.items?.length || 0} items
              </span>
            </div>
          </div>
        </div>
      )}
      {selectedLocation && (
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Active Map Pin
            </span>
            <p className="text-sm font-semibold text-stone-800">
              {selectedLocation.address}
            </p>
            <p className="text-xs text-stone-400 font-mono">
              Lat: {selectedLocation.lat.toFixed(4)}, Lng:{" "}
              {selectedLocation.lng.toFixed(4)}
            </p>
          </div>
          <button
            onClick={handleSearchFromSelectedPin}
            disabled={loading}
            className="bg-[#162B22] hover:bg-[#1f3a2e] text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition cursor-pointer disabled:opacity-50 shrink-0"
          >
            {loading ? "Searching..." : "Find Nearest Order Here 🎯"}
          </button>
        </div>
      )}
      {/* Order Popup Overlay */}
      {nearestOrder && isOnline && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-[#162B22] border border-[#233d32] w-full max-w-md rounded-3xl p-6 shadow-2xl text-white">
            {/* Header Badge */}
            <div className="flex justify-between items-center mb-4">
              <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                New Order Available! 🚀
              </span>
              <span className="text-sm font-semibold text-stone-300">
                {nearestOrder.distanceInMeters
                  ? `${(nearestOrder.distanceInMeters / 1000).toFixed(2)} km away`
                  : "Nearby"}
              </span>
            </div>

            {/* Order Details */}
            <div className="space-y-3 mb-6">
              <div>
                <p className="text-xs text-stone-300 uppercase tracking-wide">
                  Delivery Address
                </p>
                <p className="text-sm font-medium mt-1 text-white">
                  {nearestOrder.shippingAddress?.formattedAddress ||
                    "Address not available"}
                </p>
              </div>
              <div className="flex justify-between items-center bg-[#101e17] p-3 rounded-2xl border border-[#233d32]">
                <span className="text-sm text-stone-300">Total Payout</span>
                <span className="text-lg font-bold text-amber-400">
                  ${(nearestOrder.totalAmount || 0).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => handleDeclineOrder(nearestOrder._id)}
                className="w-1/2 bg-red-900/40 hover:bg-red-900/60 text-red-200 font-bold py-3 rounded-2xl border border-red-700/50 transition cursor-pointer"
              >
                Decline
              </button>
              <button
              //i changed here i hope it workds 
                onClick={() => handleAssigningDriver(nearestOrder._id)}
                className="w-1/2 bg-[#2d5242] hover:bg-[#36634f] text-white font-bold py-3 rounded-2xl border border-[#3e6f59] shadow-lg transition cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
