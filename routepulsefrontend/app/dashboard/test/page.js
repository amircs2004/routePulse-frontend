'use client';

import dynamic from 'next/dynamic';

// Import the map dynamically with SSR completely turned off
const DeliveryMap = dynamic(() => import('../../../components/map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-[#FAFAFC] rounded-3xl border border-gray-100 flex items-center justify-center text-xs text-gray-400">
      Loading Map...
    </div>
  ),
});

export default function RouteTrackingPage() {
  const deliveryMarkers = [
    { position: [36.7538, 3.0588], popupText: '🛒 Supermarket Central Hub' },
    { position: [36.765, 3.0300], popupText: '📦 Active Delivery Stop #1' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-[#FAFAFC] min-h-screen">
      <div className="bg-white/70 backdrop-blur-md px-6 py-5 rounded-3xl border border-gray-100 shadow-xs">
        <h1 className="text-xl font-bold text-gray-900">Live Route Tracker</h1>
        <p className="text-xs text-gray-400 mt-0.5">Monitor real-time vehicle trajectories and delivery zones.</p>
      </div>

      <DeliveryMap center={[36.7538, 3.0588]} zoom={13} markers={deliveryMarkers} />
    </div>
  );
}