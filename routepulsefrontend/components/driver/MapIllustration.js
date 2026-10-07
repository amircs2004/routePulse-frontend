
export default function MapIllustration({ className = "w-full h-auto" }) {
  return (
    <svg
      viewBox="0 0 500 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Card Base */}
      <rect width="500" height="380" rx="32" fill="#FAFBF9" />
      
      {/* Ambient Radar Glow Circles */}
      <circle cx="250" cy="190" r="150" fill="#162B22" fillOpacity="0.03" />
      <circle cx="250" cy="190" r="100" fill="#FF6B35" fillOpacity="0.04" />

      {/* Map Grid Pattern */}
      <g stroke="#162B22" strokeWidth="1" strokeDasharray="4 8" opacity="0.12">
        <line x1="60" y1="90" x2="440" y2="90" />
        <line x1="60" y1="180" x2="440" y2="180" />
        <line x1="60" y1="270" x2="440" y2="270" />
        <line x1="140" y1="50" x2="140" y2="310" />
        <line x1="250" y1="50" x2="250" y2="310" />
        <line x1="360" y1="50" x2="360" y2="310" />
      </g>

      {/* Abstract Map Roads / Geographic Contours */}
      <path
        d="M60 120 C 180 80, 280 280, 440 150"
        stroke="#162B22"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
        opacity="0.08"
      />
      <path
        d="M80 280 C 200 200, 300 100, 420 260"
        stroke="#162B22"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
        opacity="0.06"
      />

      {/* Active Navigation Route Path */}
      <path
        d="M 120 250 Q 220 120, 380 130"
        stroke="#FF6B35"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="10 8"
        fill="none"
      />

      {/* Driver Start Point (Green Marker) */}
      <g transform="translate(120, 250)">
        <circle r="18" fill="#10B981" fillOpacity="0.2" />
        <circle r="8" fill="#10B981" />
        <circle r="3" fill="#FFFFFF" />
        <text x="-12" y="28" fill="#10B981" fontFamily="system-ui" fontSize="10" fontWeight="700">Driver</text>
      </g>

      {/* Target Point with "X" (Orange Pin) */}
      <g transform="translate(380, 130)">
        <circle r="24" fill="#FF6B35" fillOpacity="0.15" />
        <circle r="16" fill="#FF6B35" />
        <circle r="10" fill="#162B22" />
        {/* The X Mark */}
        <path d="M-4 -4 L4 4 M4 -4 L-4 4" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" />
        <text x="-18" y="-22" fill="#FF6B35" fontFamily="system-ui" fontSize="10" fontWeight="700">Target Order</text>
      </g>

      {/* Floating Spatial Index Badge */}
      <g transform="translate(140, 310)">
        <rect
          width="220"
          height="40"
          rx="20"
          fill="#162B22"
        />
        <circle cx="24" cy="20" r="5" fill="#FF6B35" />
        <text
          x="42"
          y="24"
          fill="white"
          fontFamily="system-ui, sans-serif"
          fontSize="11"
          fontWeight="700"
        >
          $geoNear Spatial Index Active
        </text>
      </g>
    </svg>
  );
}