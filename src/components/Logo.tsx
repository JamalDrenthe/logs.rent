type LogoVariant = 'dark' | 'light';

interface LogoProps {
  className?: string;
  variant?: LogoVariant;
}

export function Logo({ className = 'w-9 h-9', variant = 'dark' }: LogoProps) {
  const markColor = variant === 'light' ? '#17202b' : '#ffffff';

  return (
    <div className={`relative flex items-center justify-center rounded-xl p-1.5 transition-all duration-300 group ${className}`}>
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-white group-hover:scale-105 transition-transform"
        aria-label="logs.rent"
        role="img"
      >
        <path
          d="M 22 18 L 36 18 L 36 84 L 84 84 L 84 98 L 22 98 Z"
          fill={markColor}
        />

        <path
          d="M 44 18 L 96 18 C 108 18 116 26 116 38 C 116 50 108 58 94 58 L 74 58 L 88 44 L 92 44 C 98 44 102 41 102 38 C 102 35 98 32 92 32 L 44 32 Z"
          fill={markColor}
        />

        <path
          d="M 44 38 L 58 24 L 118 98 L 98 98 Z"
          fill={markColor}
        />

        <path
          d="M 46 48 L 60 48 L 60 78 L 46 78 Z"
          fill={markColor}
        />

        <circle cx="43" cy="91" r="5" fill="#10B981" />
      </svg>
    </div>
  );
}
