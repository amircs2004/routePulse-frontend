export default function GroceryCartIllustration({ className = "w-48 h-48" }) {
  return (
    <svg 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Soft Glow */}
      <circle cx="100" cy="110" r="70" fill="#162B22" fillOpacity="0.05" />

      {/* --- GROCERY ITEMS (Peeking out of the cart) --- */}
      <g transform="translate(75, 45)">
        <rect x="0" y="15" width="32" height="50" rx="4" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
        <path d="M0 15L16 2L32 15V15H0Z" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="2" />
        <rect x="12" y="0" width="8" height="4" rx="1" fill="#3B82F6" />
        <rect x="4" y="28" width="24" height="14" rx="2" fill="#3B82F6" fillOpacity="0.15" />
        <circle cx="16" cy="35" r="3" fill="#3B82F6" />
      </g>

      <g transform="translate(115, 30) rotate(15)">
        <path d="M10 20L20 45C22 50 15 52 11 47L2 20Z" fill="#FF6B35" />
        <line x1="7" y1="28" x2="14" y2="30" stroke="#E0531E" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="9" y1="36" x2="17" y2="38" stroke="#E0531E" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 20C8 10 3 5 0 2C5 7 8 12 10 20Z" fill="#22C55E" />
        <path d="M12 20C14 10 20 6 24 3C19 8 15 13 12 20Z" fill="#16A34A" />
      </g>

      <g transform="translate(50, 40)">
        <circle cx="18" cy="25" r="18" fill="#16A34A" />
        <circle cx="12" cy="20" r="10" fill="#22C55E" />
        <circle cx="22" cy="30" r="10" fill="#15803D" />
      </g>

      {/* --- SHOPPING CART FRAME --- */}
      <path 
        d="M35 75H155L140 130H50L35 75Z" 
        fill="#162B22" 
        fillOpacity="0.9"
        stroke="#162B22" 
        strokeWidth="3" 
        strokeLinejoin="round"
      />
      <path 
        d="M42 90H148M46 105H144M50 120H140" 
        stroke="white" 
        strokeWidth="2" 
        strokeOpacity="0.2" 
        strokeLinecap="round"
      />
      <path 
        d="M60 75L50 130M95 75L95 130M130 75L140 130" 
        stroke="white" 
        strokeWidth="2" 
        strokeOpacity="0.15" 
      />
      <path 
        d="M20 50H45L60 75" 
        stroke="#162B22" 
        strokeWidth="5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <circle cx="20" cy="50" r="3" fill="#FF6B35" />

      {/* --- WHEELS --- */}
      <circle cx="65" cy="150" r="10" fill="#334155" stroke="#162B22" strokeWidth="3" />
      <circle cx="65" cy="150" r="3" fill="#CBD5E1" />
      <circle cx="125" cy="150" r="10" fill="#334155" stroke="#162B22" strokeWidth="3" />
      <circle cx="125" cy="150" r="3" fill="#CBD5E1" />
    </svg>
  );
}