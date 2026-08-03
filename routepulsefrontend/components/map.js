'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function LocationClickHandler({ onLocationSelect }) {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await res.json();
        const formattedAddress = data.display_name || "Selected Location";

        if (onLocationSelect) {
          onLocationSelect({ lat, lng, address: formattedAddress });
        }
      } catch (err) {
        console.error("Failed to fetch address details", err);
        if (onLocationSelect) {
          onLocationSelect({ lat, lng, address: "Custom Location" });
        }
      }
    },
  });

  return null;
}

export default function DeliveryMap({ center = [36.7538, 3.0588], zoom = 13, markers = [], onLocationSelect }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-[550px] bg-[#FAFAFC] rounded-3xl border border-gray-100 flex items-center justify-center text-xs text-gray-400">
        Loading Map...
      </div>
    );
  }

  return (
    // Increased height to h-[550px] for a much larger map view
    <div className="w-full h-[550px] rounded-3xl overflow-hidden border border-gray-100 shadow-xs z-10 relative">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={false} 
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationClickHandler onLocationSelect={onLocationSelect} />

        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} icon={customIcon}>
            {marker.popupText && (
              <Popup>
                <div className="text-xs font-medium text-gray-800">
                  {marker.popupText}
                </div>
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}