'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for missing default marker icons in Next.js/React Leaflet
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function DeliveryMap({ center = [36.7538, 30.5833], zoom = 13, markers = [] }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent server-side rendering mismatch
  if (!isMounted) {
    return (
      <div className="w-full h-[400px] bg-[#FAFAFC] rounded-3xl border border-gray-100 flex items-center justify-center text-xs text-gray-400">
        Loading Map...
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] rounded-3xl overflow-hidden border border-gray-100 shadow-xs z-10">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={false} 
        className="w-full h-full"
      >
        {/* Clean, eye-friendly light map tile layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Render dynamic markers passed into the component */}
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