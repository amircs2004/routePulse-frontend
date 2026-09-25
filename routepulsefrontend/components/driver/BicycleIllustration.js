

export default function BicycleIllustration({ className = "w-full h-auto" }) {
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

      {/* Bicycle and Rider Group */}
      <g transform="translate(120, 75)">
        {/* Back Wheel */}
        <circle
          cx="70"
          cy="180"
          r="38"
          stroke="#162B22"
          strokeWidth="6"
          fill="none"
        />
        <circle cx="70" cy="180" r="6" fill="#162B22" />

        {/* Front Wheel */}
        <circle
          cx="250"
          cy="180"
          r="38"
          stroke="#162B22"
          strokeWidth="6"
          fill="none"
        />
        <circle cx="250" cy="180" r="6" fill="#162B22" />

        {/* Bicycle Frame */}
        <path
          d="M70 180L140 120H190L250 180M140 120L165 190H120M190 120L170 70H140"
          stroke="#10B981"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Delivery Backpack */}
        <rect
          x="110"
          y="65"
          width="28"
          height="35"
          rx="6"
          fill="#162B22"
        />
        <rect
          x="118"
          y="73"
          width="12"
          height="8"
          rx="2"
          fill="#10B981"
        />

        {/* Rider Torso & Helmet */}
        <path
          d="M140 100L170 70L190 120"
          stroke="#162B22"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="178" cy="52" r="14" fill="#162B22" /> {/* Helmet */}
        <path
          d="M185 48H195"
          stroke="#10B981"
          strokeWidth="4"
          strokeLinecap="round"
        />{" "}
        {/* Helmet Visor Stripe */}

        {/* Legs / Pedaling Motion */}
        <path
          d="M165 190L140 150L115 195"
          stroke="#162B22"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Handlebars */}
        <path
          d="M170 70L205 95"
          stroke="#162B22"
          strokeWidth="6"
          strokeLinecap="round"
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