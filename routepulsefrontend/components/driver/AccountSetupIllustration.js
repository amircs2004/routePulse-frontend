export default function AccountSetupIllustration({ className = "w-full h-auto" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 450 350" 
      className={className}
    >
      <defs>
        {/* Deep Olive Van Gradient */}
        <linearGradient id="vanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E3B2F" />
          <stop offset="100%" stopColor="#162B22" />
        </linearGradient>

        {/* Terracotta Accent Gradient */}
        <linearGradient id="orangeAccent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFA94D" />
          <stop offset="100%" stopColor="#FF6B35" />
        </linearGradient>

        {/* Soft Drop Shadow */}
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#162B22" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Background Ground Shadow */}
      <ellipse cx="225" cy="300" rx="180" ry="12" fill="#162B22" opacity="0.08" />

      {/* Delivery Van */}
      <g transform="translate(180, 130)">
        {/* Van Body */}
        <path d="M 10 70 L 10 40 C 10 30 18 22 28 22 L 120 22 C 135 22 148 32 154 46 L 180 60 C 188 64 192 72 192 80 L 192 110 L 10 110 Z" fill="url(#vanGrad)" filter="url(#shadow)" />
        
        {/* Windshield & Windows */}
        <path d="M 30 35 L 75 35 L 75 65 L 25 65 C 18 65 14 60 16 53 L 22 41 C 24 37 27 35 30 35 Z" fill="#E2E8F0" opacity="0.9" />
        <path d="M 85 35 L 140 35 L 155 65 L 85 65 Z" fill="#E2E8F0" opacity="0.9" />
        
        {/* Front Cab Accent */}
        <rect x="165" y="70" width="22" height="25" rx="4" fill="url(#orangeAccent)" />
        
        {/* Headlight */}
        <rect x="185" y="80" width="5" height="10" rx="2" fill="#FDE047" />
        
        {/* Wheels */}
        <circle cx="50" cy="110" r="16" fill="#1F2937" />
        <circle cx="50" cy="110" r="7" fill="#9CA3AF" />
        <circle cx="150" cy="110" r="16" fill="#1F2937" />
        <circle cx="150" cy="110" r="7" fill="#9CA3AF" />
        
        {/* RoutePulse Branding Badge on Van */}
        <circle cx="110" cy="65" r="10" fill="#FF6B35" />
        <text x="105" y="69" fontSize="10" fontWeight="bold" fill="#FFFFFF">RP</text>
      </g>

      {/* Courier Man Holding Account Details */}
      <g transform="translate(60, 110)">
        {/* Footprint Shadow */}
        <ellipse cx="45" cy="192" rx="22" ry="6" fill="#000000" opacity="0.15" />
        
        {/* Legs */}
        <rect x="34" y="140" width="10" height="52" rx="4" fill="#162B22" />
        <rect x="52" y="140" width="10" height="52" rx="4" fill="#162B22" />
        
        {/* Shoes */}
        <path d="M 28 190 L 46 190 C 48 190 50 192 50 194 L 46 194 Z" fill="#1F2937" />
        <path d="M 48 190 L 66 190 C 68 190 70 192 70 194 L 66 194 Z" fill="#1F2937" />
        
        {/* Jacket / Torso */}
        <path d="M 25 75 C 25 65 35 60 48 60 C 61 60 71 65 71 75 L 75 145 C 75 148 72 150 69 150 L 27 150 C 24 150 21 148 21 145 Z" fill="#162B22" filter="url(#shadow)" />
        
        {/* Terracotta Inner Shirt Accent */}
        <path d="M 40 60 L 56 60 L 52 100 L 44 100 Z" fill="#FF6B35" />
        
        {/* Head */}
        <circle cx="48" cy="38" r="16" fill="#FBBF24" />
        
        {/* Hair */}
        <path d="M 32 35 C 32 25 40 22 48 22 C 56 22 64 25 64 35 C 60 30 54 28 48 28 C 42 28 36 30 32 35 Z" fill="#1F2937" />
        
        {/* Clipboard / Account Info Card in Hand */}
        <g transform="translate(58, 85)">
          <rect x="0" y="0" width="30" height="40" rx="4" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="2" filter="url(#shadow)" />
          <rect x="6" y="8" width="18" height="4" rx="2" fill="#FF6B35" />
          <rect x="6" y="16" width="12" height="3" rx="1.5" fill="#9CA3AF" />
          <rect x="6" y="22" width="15" height="3" rx="1.5" fill="#9CA3AF" />
          <circle cx="21" cy="31" r="5" fill="#10B981" />
          <path d="M 19 31 L 20.5 32.5 L 23.5 29.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      </g>

      {/* Floating Account Complete Badge */}
      <g transform="translate(290, 45)" filter="url(#shadow)">
        <rect x="0" y="0" width="130" height="50" rx="14" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
        <circle cx="25" cy="25" r="14" fill="#162B22" />
        <text x="20" y="29" fontSize="12" fontWeight="bold" fill="#FFFFFF">✓</text>
        <text x="48" y="22" fontSize="11" fontWeight="bold" fill="#162B22">Account Ready</text>
        <text x="48" y="36" fontSize="9" fill="#6B7280">Profile Completed</text>
      </g>

    </svg>
  );
}