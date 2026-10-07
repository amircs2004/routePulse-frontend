export default function LiveTrackingMap() {
  return (
    <div className="w-full relative overflow-hidden">
      
      {/* SVG Map Container */}
      <div className="relative w-full aspect-[2/1] overflow-hidden flex items-center justify-center">
        
        {/* Background Map Grid & Decorative Elements */}
        <svg className="w-full h-full absolute inset-0 opacity-30" viewBox="0 0 800 400" fill="none">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D1D5DB" strokeWidth="0.8" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Interactive Map Path & Truck */}
        <svg className="w-full h-full relative z-10" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          
          <defs>
            {/* Glow effect for path */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Base Route Track */}
          <path 
            id="routePath" 
            d="M 80 300 C 220 300, 180 100, 400 100 C 620 100, 580 300, 720 120" 
            stroke="#E2E8F0" 
            strokeWidth="8" 
            strokeLinecap="round" 
            fill="none" 
          />

          {/* Active Terracotta Progress Path */}
          <path 
            d="M 80 300 C 220 300, 180 100, 400 100 C 620 100, 580 300, 720 120" 
            stroke="#FF6B35" 
            strokeWidth="6" 
            strokeLinecap="round" 
            fill="none" 
            strokeDasharray="10 10" 
            filter="url(#glow)"
          />

          {/* Start Point Pin */}
          <g transform="translate(80, 300)">
            <circle r="12" fill="#162B22" opacity="0.2" />
            <circle r="6" fill="#162B22" />
            <text x="14" y="4" fontSize="11" fontWeight="bold" fill="#162B22">Depot</text>
          </g>

          {/* End Point Destination Pin */}
          <g transform="translate(720, 120)">
            <circle r="14" fill="#FF6B35" opacity="0.2" />
            <circle r="7" fill="#FF6B35" />
          </g>

          {/* Moving Delivery Truck Animation */}
          <g>
            <animateMotion 
              dur="7s" 
              repeatCount="indefinite" 
              rotate="auto"
            >
              <mpath href="#routePath" />
            </animateMotion>

            {/* Custom Truck Icon oriented automatically along the path */}
            <g transform="translate(-16, -12)">
              {/* Truck Shadow */}
              <ellipse cx="16" cy="22" rx="12" ry="3" fill="#000000" opacity="0.2" />
              
              {/* Truck Body (Olive #162B22) */}
              <rect x="4" y="6" width="18" height="12" rx="2" fill="#162B22" />
              {/* Truck Cab / Front */}
              <path d="M 22 10 L 27 12 L 27 18 L 22 18 Z" fill="#FF6B35" />
              
              {/* Wheels */}
              <circle cx="9" cy="18" r="3.5" fill="#1F2937" />
              <circle cx="9" cy="18" r="1.5" fill="#9CA3AF" />
              
              <circle cx="23" cy="18" r="3.5" fill="#1F2937" />
              <circle cx="23" cy="18" r="1.5" fill="#9CA3AF" />
              
              {/* Headlight Highlight */}
              <rect x="26" y="13" width="1" height="3" fill="#FDE047" />
            </g>
          </g>

        </svg>

      </div>
    </div>
  );
}