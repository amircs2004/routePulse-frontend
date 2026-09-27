export default function SettingsIllustration({ className = "w-48 h-48" }) {
  return (
    <svg 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Soft Glow */}
      <circle cx="100" cy="110" r="70" fill="#162B22" fillOpacity="0.05" />

      {/* --- MECHANICAL TOOLS & GEARS --- */}
      
      {/* 1. Large Main Gear (Forest Green) */}
      <g transform="translate(65, 65)">
        <circle cx="45" cy="45" r="28" fill="#162B22" />
        <circle cx="45" cy="45" r="14" fill="white" />
        {/* Gear Teeth */}
        <rect x="41" y="10" width="8" height="10" rx="2" fill="#162B22" />
        <rect x="41" y="70" width="8" height="10" rx="2" fill="#162B22" />
        <rect x="10" y="41" width="10" height="8" rx="2" fill="#162B22" />
        <rect x="70" y="41" width="10" height="8" rx="2" fill="#162B22" />
        <rect x="20" y="20" width="8" height="8" rx="1.5" transform="rotate(45 24 24)" fill="#162B22" />
        <rect x="62" y="62" width="8" height="8" rx="1.5" transform="rotate(45 66 66)" fill="#162B22" />
        <rect x="62" y="20" width="8" height="8" rx="1.5" transform="rotate(-45 66 24)" fill="#162B22" />
        <rect x="20" y="62" width="8" height="8" rx="1.5" transform="rotate(-45 24 66)" fill="#162B22" />
      </g>

      {/* 2. Smaller Accent Gear (Vibrant Orange) */}
      <g transform="translate(32, 35)">
        <circle cx="25" cy="25" r="16" fill="#FF6B35" />
        <circle cx="25" cy="25" r="8" fill="white" />
        <rect x="22" y="5" width="6" height="7" rx="1.5" fill="#FF6B35" />
        <rect x="22" y="38" width="6" height="7" rx="1.5" fill="#FF6B35" />
        <rect x="5" y="22" width="7" height="6" rx="1.5" fill="#FF6B35" />
        <rect x="38" y="22" width="7" height="6" rx="1.5" fill="#FF6B35" />
      </g>

      {/* 3. Wrench Tool */}
      <g transform="translate(110, 25) rotate(35)">
        {/* Wrench handle */}
        <rect x="0" y="10" width="8" height="65" rx="3" fill="#334155" />
        {/* Wrench head */}
        <path d="M-4 12C-4 6 0 2 4 2C8 2 12 6 12 12C12 15 10 18 8 20L4 25L0 20C-2 18 -4 15 -4 12Z" fill="#334155" />
        <circle cx="4" cy="11" r="2.5" fill="white" />
      </g>

      {/* 4. Screwdriver Tool */}
      <g transform="translate(38, 120) rotate(-35)">
        {/* Handle */}
        <rect x="0" y="0" width="12" height="40" rx="4" fill="#FF6B35" />
        <rect x="2" y="10" width="8" height="20" rx="1" fill="#E0531E" />
        {/* Shaft */}
        <rect x="4" y="-25" width="4" height="27" fill="#94A3B8" />
        {/* Tip */}
        <path d="M4 -25L6 -32L8 -25H4Z" fill="#334155" />
      </g>

    </svg>
  );
}