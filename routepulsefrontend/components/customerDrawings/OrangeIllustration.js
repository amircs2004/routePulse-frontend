export default function OrangeIllustration({ className = "w-48 h-48" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 240 240" 
      className={className}
    >
      <defs>
        {/* Rich 3D Orange Gradient */}
        <radialGradient id="orangeGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFA94D" />
          <stop offset="50%" stopColor="#FF6B35" />
          <stop offset="100%" stopColor="#D9481E" />
        </radialGradient>

        {/* Deep Green Leaf Gradient */}
        <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2ECC71" />
          <stop offset="100%" stopColor="#14532D" />
        </linearGradient>

        {/* Stem Gradient */}
        <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8D6E63" />
          <stop offset="100%" stopColor="#4A3B32" />
        </linearGradient>

        {/* Glossy Overlay Highlight */}
        <radialGradient id="highlight" cx="30%" cy="30%" r="40%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Subtle Ground Shadow */}
      <ellipse cx="120" cy="205" rx="55" ry="10" fill="#000000" opacity="0.12" />

      {/* Main Orange Body */}
      <circle cx="120" cy="130" r="70" fill="url(#orangeGrad)" />
      
      {/* Glossy Specular Highlight */}
      <circle cx="120" cy="130" r="70" fill="url(#highlight)" />

      {/* Stem */}
      <path 
        d="M116 65 C116 55 120 46 128 43 C125 51 123 59 123 66 Z" 
        fill="url(#stemGrad)" 
        stroke="#3E2723" 
        strokeWidth="1" 
        strokeLinejoin="round" 
      />

      {/* Green Leaf on the Right Side */}
      <path 
        d="M128 66 C155 52 192 72 188 98 C184 120 152 112 128 80 Z" 
        fill="url(#leafGrad)" 
        filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.15))"
      />

      {/* Leaf Central Vein Detail */}
      <path 
        d="M136 74 C150 80 168 90 178 94" 
        stroke="#86EFAC" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        fill="none" 
        opacity="0.75" 
      />
    </svg>
  );
}