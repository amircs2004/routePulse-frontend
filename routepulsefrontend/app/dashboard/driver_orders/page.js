"use client";

import { useState, useEffect } from 'react';
import { getDriversOrdersApi } from '../../../lib/api';
import dynamic from "next/dynamic";

// Dynamically import the Leaflet map component with SSR disabled
const DeliveryMap = dynamic(() => import("../../../components/map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-[#FAFAFC] rounded-3xl border border-gray-100 flex items-center justify-center text-xs text-gray-400">
      Loading Map...
    </div>
  ),
});

export default function DriverOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [driverPos, setDriverPos] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null); // Tracks which order's map is popped up

  const fetchOrderForDriver = async () => {
    try {
      const result = await getDriversOrdersApi();
      setOrders(result.data || result || []);
      console.log('orders fetched for driver', result);
    } catch (error) {
      console.error('error fetching orders for driver', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderForDriver();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setDriverPos([position.coords.latitude, position.coords.longitude]);
        },
        (error) => console.error("Geolocation error:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Extract coordinates for the currently selected order in the modal
  const rawCoords = selectedOrder?.location?.coordinates;
  const orderPos = rawCoords ? [rawCoords[1], rawCoords[0]] : null;

  const markers = [];
  if (orderPos) {
    markers.push({
      position: orderPos,
      popupText: `📍 Order: ${selectedOrder.shippingAddress?.street || "Destination"}`
    });
  }
  if (driverPos) {
    markers.push({
      position: driverPos,
      popupText: "🚗 Your Live Location"
    });
  }
  const mapCenter = orderPos || driverPos || [36.7538, 3.0588];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-stone-800">Assigned Orders</h1>
      
      {loading ? (
        <p className="text-stone-500">Loading your orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-stone-500">No active orders found for this driver.</p>
      ) : (
        <div className="grid gap-4">
          {/* Order Cards List */}
          {orders.map((order) => (
            <div 
              key={order._id} 
              onClick={() => setSelectedOrder(order)} // Clicking opens the map modal for this order
              className="p-5 border border-stone-200 rounded-2xl bg-white shadow-sm transition-all hover:shadow-md cursor-pointer hover:border-blue-300"
            >
              <p className="font-semibold text-stone-800">
                📍 {order.shippingAddress?.formattedAddress || order.shippingAddress?.street || "Address unavailable"}
              </p>
              <div className="flex justify-between items-center mt-3 text-sm text-stone-600">
                <span>Status: <strong className="capitalize text-stone-800">{order.orderStatus || "Assigned"}</strong></span>
                <span className="text-stone-400">Click to view map 🗺️</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Map Modal Popup */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-bold text-stone-800">Order Location</h2>
                <p className="text-xs text-stone-500 truncate max-w-md">
                  {selectedOrder.shippingAddress?.formattedAddress || selectedOrder.shippingAddress?.street}
                </p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)} // Close the modal
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Render Map inside Modal */}
            <DeliveryMap 
              center={mapCenter} 
              zoom={15} 
              markers={markers} 
            />
          </div>
        </div>
      )}
    </div>
  );
}