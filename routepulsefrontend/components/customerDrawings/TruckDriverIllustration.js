export default function TruckDriverIllustration({ className = "w-48 h-48" }) {
  return (
    <svg 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Soft Glow */}
      <circle cx="100" cy="110" r="70" fill="#162B22" fillOpacity="0.05" />

      {/* Road Dashed Line */}
      <path d="M25 145H175" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 8" />

      {/* --- TRUCK GROUP --- */}
      <g transform="translate(12, 25)">
        
        {/* Cargo Box (Vibrant Orange) */}
        <rect x="20" y="55" width="70" height="45" rx="4" fill="#FF6B35" />
        <path d="M20 70H90" stroke="#E0531E" strokeWidth="2" strokeOpacity="0.4" />
        
        {/* Truck Cab (Forest Green) */}
        <path d="M90 65H122C126 65 130 69 130 73V100H90V65Z" fill="#162B22" />

        {/* Windshield */}
        <path d="M98 68H118C120 68 122 70 122 72V84H98V68Z" fill="#E2E8F0" fillOpacity="0.9" />
        
        {/* Driver Silhouette & Steering Wheel */}
        <circle cx="107" cy="77" r="5" fill="#334155" />
        <path d="M104 84L110 84" stroke="#334155" strokeWidth="2" strokeLinecap="round" />

        {/* Wheels */}
        <circle cx="45" cy="105" r="12" fill="#334155" stroke="#162B22" strokeWidth="3" />
        <circle cx="45" cy="105" r="4" fill="#CBD5E1" />

        <circle cx="115" cy="105" r="12" fill="#334155" stroke="#162B22" strokeWidth="3" />
        <circle cx="115" cy="105" r="4" fill="#CBD5E1" />

        {/* Headlight */}
        <rect x="128" y="85" width="3" height="8" rx="1" fill="#FACC15" />
      </g>

      {/* Motion / Speed Lines Behind Truck */}
      <path d="M25 110H45" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
      <path d="M15 120H35" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.3" />

    </svg>
  );
}