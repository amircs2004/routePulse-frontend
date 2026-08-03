'use client';

import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the DeliveryMap component with SSR disabled so Leaflet only loads in the browser
const DeliveryMap = dynamic(() => import("../../components/map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-[#FAFAFC] rounded-3xl border border-gray-100 flex items-center justify-center text-xs text-gray-400">
      Loading Map...
    </div>
  ),
});

export default function CheckoutPage() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapClick = (locationData) => {
    setSelectedLocation(locationData);
    console.log("User picked:", locationData);
  };

  const mapMarkers = selectedLocation 
    ? [{ position: [selectedLocation.lat, selectedLocation.lng], popupText: selectedLocation.address }]
    : [];

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-lg font-bold">Select Delivery Address on Map</h2>
      
      <DeliveryMap 
        markers={mapMarkers} 
        onLocationSelect={handleMapClick} 
      />

      {selectedLocation && (
        <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl text-xs text-indigo-900">
          <p className="font-semibold mb-1">Selected Address:</p>
          <p>{selectedLocation.address}</p>
        </div>
      )}
    </div>
  );
}