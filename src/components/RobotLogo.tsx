import React from 'react';

interface RobotLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const RobotLogo: React.FC<RobotLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const sizeMap = {
    sm: { icon: 28, textClass: 'text-sm' },
    md: { icon: 38, textClass: 'text-base' },
    lg: { icon: 54, textClass: 'text-xl' },
    xl: { icon: 72, textClass: 'text-2xl' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Neon Robot Head Icon */}
      <div className="relative flex items-center justify-center">
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-cyan-400/25 blur-lg rounded-full pointer-events-none" />
        
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative drop-shadow-[0_0_12px_rgba(34,211,238,0.85)] filter"
        >
          {/* Antenna */}
          <line
            x1="50"
            y1="22"
            x2="50"
            y2="10"
            stroke="#22d3ee"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle
            cx="50"
            cy="8"
            r="5"
            stroke="#22d3ee"
            strokeWidth="3.5"
            fill="#060b13"
          />

          {/* Left & Right Ears */}
          <path
            d="M 17 48 C 12 48, 12 62, 17 62"
            stroke="#22d3ee"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 83 48 C 88 48, 88 62, 83 62"
            stroke="#22d3ee"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Outer Head Shell */}
          <path
            d="M 23 44 C 23 28, 35 22, 50 22 C 65 22, 77 28, 77 44 C 77 66, 73 78, 50 78 C 27 78, 23 66, 23 44 Z"
            stroke="#22d3ee"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#071220"
            fillOpacity="0.8"
          />

          {/* Inner Screen / Visor */}
          <rect
            x="30"
            y="38"
            width="40"
            height="26"
            rx="12"
            stroke="#38bdf8"
            strokeWidth="3.5"
            strokeOpacity="0.9"
            fill="#030810"
          />

          {/* Glowing Eyes */}
          <circle cx="41" cy="51" r="4.5" fill="#e0f2fe" />
          <circle cx="41" cy="51" r="2" fill="#0284c7" />
          <circle cx="59" cy="51" r="4.5" fill="#e0f2fe" />
          <circle cx="59" cy="51" r="2" fill="#0284c7" />

          {/* Eye glow halos */}
          <circle cx="41" cy="51" r="6" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="59" cy="51" r="6" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.5" />
        </svg>
      </div>

      {/* Futuristic Neon Text */}
      {showText && (
        <div className="flex flex-col leading-none font-['Orbitron'] tracking-wider">
          <span
            className={`font-black text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)] ${currentSize.textClass}`}
            style={{
              textShadow: '0 0 10px rgba(34,211,238,0.8), 0 0 20px rgba(6,182,212,0.4)',
            }}
          >
            ROBOT
          </span>
          <span
            className={`font-bold tracking-[0.25em] text-cyan-300 drop-shadow-[0_0_6px_rgba(56,189,248,0.7)] ${
              size === 'sm' ? 'text-[9px]' : size === 'md' ? 'text-[11px]' : size === 'lg' ? 'text-[13px]' : 'text-[16px]'
            }`}
            style={{
              textShadow: '0 0 8px rgba(56,189,248,0.7)',
            }}
          >
            PORTFOLIO
          </span>
        </div>
      )}
    </div>
  );
};
