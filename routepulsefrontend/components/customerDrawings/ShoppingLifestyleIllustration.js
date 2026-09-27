export default function ShoppingLifestyleIllustration({ className = "w-64 h-64" }) {
  return (
    <svg 
      viewBox="0 0 240 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Soft Background Glow */}
      <circle cx="120" cy="105" r="85" fill="#162B22" fillOpacity="0.04" />

      {/* --- 1. ORGANIC PLATE & CROISSANT (Left side) --- */}
      <g transform="translate(15, 10)">
        {/* Plate Shadow */}
        <ellipse cx="65" cy="145" rx="50" ry="16" fill="#000000" fillOpacity="0.06" />
        
        {/* Outer Ceramic Plate */}
        <path 
          d="M15 135C15 122 37 112 65 112C93 112 115 122 115 135C115 148 93 158 65 158C37 158 15 148 15 135Z" 
          fill="#FAFAF9" 
          stroke="#E7E5E4" 
          strokeWidth="3" 
        />
        {/* Inner Rim */}
        <path 
          d="M27 135C27 125 43 118 65 118C87 118 103 125 103 135C103 145 87 152 65 152C43 152 27 145 27 135Z" 
          fill="none" 
          stroke="#F0EDE6" 
          strokeWidth="2" 
        />

        {/* Croissant on Plate */}
        <g transform="translate(43, 122)">
          <path 
            d="M4 16C7 9 17 5 25 7C35 9 40 15 38 19C35 23 29 21 21 20C13 19 7 20 4 16Z" 
            fill="#D97706" 
          />
          <path d="M18 9L16 19" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M11 11L10 17" stroke="#B45309" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M26 10L28 18" stroke="#B45309" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      </g>

      {/* --- 2. SLEEK MODERN HEADPHONES (Centered Top) --- */}
      <g transform="translate(82, 22)">
        {/* Headband Arc */}
        <path 
          d="M8 55C8 22 24 6 38 6C52 6 68 22 68 55" 
          fill="none" 
          stroke="#162B22" 
          strokeWidth="5.5" 
          strokeLinecap="round" 
        />
        {/* Left Ear Cup */}
        <rect x="0" y="42" width="16" height="28" rx="8" fill="#FF6B35" stroke="#162B22" strokeWidth="2.5" />
        {/* Right Ear Cup */}
        <rect x="60" y="42" width="16" height="28" rx="8" fill="#FF6B35" stroke="#162B22" strokeWidth="2.5" />
        {/* Ear Cup Accents */}
        <circle cx="8" cy="56" r="3" fill="#162B22" />
        <circle cx="68" cy="56" r="3" fill="#162B22" />
      </g>

      {/* --- 3. CHIC SHOPPING BAG (Right side) --- */}
      <g transform="translate(145, 90)">
        {/* Bag Body */}
        <rect x="0" y="18" width="50" height="62" rx="6" fill="#162B22" />
        {/* Bag Handles */}
        <path 
          d="M12 18V11C12 6 16 2 25 2C34 2 38 6 38 11V18" 
          fill="none" 
          stroke="#162B22" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
        />
        {/* Orange Accent Tag */}
        <rect x="10" y="35" width="30" height="9" rx="2.5" fill="#FF6B35" />
        <circle cx="25" cy="39.5" r="2" fill="white" />
      </g>

    </svg>
  );
}