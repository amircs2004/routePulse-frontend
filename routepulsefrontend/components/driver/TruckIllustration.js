export default function TruckIllustration({ className = "w-full h-auto" }) {
  return (
    <svg
      viewBox="0 0 500 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Soft Card Base */}
      <rect width="500" height="380" rx="32" fill="#FAFBF9" />
      <circle cx="250" cy="190" r="140" fill="#162B22" fillOpacity="0.03" />
      <circle cx="250" cy="190" r="90" fill="#10B981" fillOpacity="0.06" />

      {/* Motion / Route Ground Lines */}
      <path
        d="M80 270H420"
        stroke="#162B22"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="12 12"
        opacity="0.15"
      />

      {/* Truck and Delivery Group */}
      <g transform="translate(100, 60)">
        {/* Cargo Box */}
        <rect
          x="50"
          y="110"
          width="135"
          height="95"
          rx="8"
          fill="#10B981"
        />
        
        {/* Cargo Box Eco Leaf Badge */}
        <circle cx="117" cy="157" r="22" fill="#162B22" fillOpacity="0.1" />
        <path
          d="M117 142C117 142 110 150 110 157C110 161 113 164 117 164C121 164 124 161 124 157C124 150 117 142 117 142Z"
          fill="#162B22"
        />
        <path
          d="M117 150V168"
          stroke="#10B981"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Truck Cab */}
        <path
          d="M185 140H235C243.284 140 250 146.716 250 155V205H185V140Z"
          fill="#10B981"
        />
        
        {/* Windshield */}
        <path
          d="M210 148H235C239.418 148 243 151.582 243 156V172H210V148Z"
          fill="#162B22"
        />
        
        {/* Driver Silhouette in Cab */}
        <circle cx="225" cy="162" r="7" fill="#10B981" />

        {/* Bumper / Grill */}
        <rect x="247" y="185" width="6" height="15" rx="3" fill="#162B22" />

        {/* Back Wheel */}
        <circle cx="95" cy="210" r="26" fill="#162B22" />
        <circle cx="95" cy="210" r="12" fill="#FAFBF9" />
        <circle cx="95" cy="210" r="5" fill="#162B22" />

        {/* Front Wheel */}
        <circle cx="215" cy="210" r="26" fill="#162B22" />
        <circle cx="215" cy="210" r="12" fill="#FAFBF9" />
        <circle cx="215" cy="210" r="5" fill="#162B22" />

        {/* Speed / Motion Lines Behind Truck */}
        <path
          d="M25 150H40M15 170H35M30 190H45"
          stroke="#162B22"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.2"
        />
      </g>

      {/* Floating Status Badge */}
      <g transform="translate(150, 300)">
        <rect
          width="200"
          height="42"
          rx="21"
          fill="#162B22"
          className="shadow-xl"
        />
        <circle cx="26" cy="21" r="5" fill="#10B981" className="animate-pulse" />
        <text
          x="44"
          y="25"
          fill="white"
          fontFamily="system-ui, sans-serif"
          fontSize="13"
          fontWeight="700"
        >
          Eco-Delivery Active
        </text>
      </g>
    </svg>
  );
}