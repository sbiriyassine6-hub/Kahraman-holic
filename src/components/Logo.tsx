import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'gold' | 'light' | 'dark';
  customLogoUrl?: string | null;
  showSubtext?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'gold',
  customLogoUrl,
  showSubtext = true,
}) => {
  // If user uploaded a custom logo image, render it cleanly
  if (customLogoUrl) {
    const heightMap = {
      sm: 'h-9',
      md: 'h-14',
      lg: 'h-20',
      xl: 'h-28',
    };
    return (
      <div className={`flex flex-col items-center justify-center select-none ${className}`}>
        <img
          src="/public/assets/aistudio/IMG_0090.png
          alt="Kahraman Holic
          className={`${heightMap[size]} w-auto object-contain drop-shadow-md`}
        />
      </div>
    );
  }

  // Size configurations
  const scaleMap = {
    sm: { scale: 0.75, arabicText: 'text-lg', englishText: 'text-xs' },
    md: { scale: 1.0, arabicText: 'text-2xl', englishText: 'text-sm' },
    lg: { scale: 1.35, arabicText: 'text-3xl sm:text-4xl', englishText: 'text-base sm:text-lg' },
    xl: { scale: 1.7, arabicText: 'text-4xl sm:text-5xl', englishText: 'text-xl' },
  };

  const currentScale = scaleMap[size];

  // Gold gradient fill for the ornate royal crest
  const goldColor = variant === 'dark' ? '#3A2E20' : '#D4AF37';
  const lightColor = variant === 'dark' ? '#6B5A42' : '#F5E6B3';

  return (
    <div
      className={`inline-flex flex-col items-center justify-center text-center select-none ${className}`}
      id="brand-logo"
    >
      {/* Royal Baroque Filigree Crest Icon */}
      <svg
        viewBox="0 0 160 80"
        className="w-auto"
        style={{ height: `${28 * currentScale.scale}px` }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="crestGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5E6B3" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#996515" />
          </linearGradient>
          <radialGradient id="amberGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Central glowing amber stone in crest */}
        <circle cx="80" cy="48" r="4.5" fill="#F59E0B" />
        <circle cx="80" cy="48" r="7" fill="url(#amberGlow)" />

        {/* Central Fleur-de-lis and Royal finial */}
        <path
          d="M80 6 C79 16, 74 24, 71 30 C76 29, 84 29, 89 30 C86 24, 81 16, 80 6 Z"
          fill="url(#crestGoldGrad)"
        />
        <circle cx="80" cy="5" r="2.5" fill="#F5E6B3" />

        {/* Left curving acanthus wing */}
        <path
          d="M71 28 C64 22, 54 20, 48 27 C44 32, 47 40, 54 41 C63 42, 69 36, 73 34 C69 37, 65 44, 69 50 C72 54, 77 53, 78 49 C78 43, 74 37, 71 28 Z"
          fill="url(#crestGoldGrad)"
        />
        <path
          d="M50 27 C42 20, 31 24, 29 33 C27 41, 35 48, 43 45 C41 43, 38 39, 39 34 C41 29, 47 28, 50 27 Z"
          fill="url(#crestGoldGrad)"
          opacity="0.85"
        />

        {/* Right curving acanthus wing (symmetrical) */}
        <path
          d="M89 28 C96 22, 106 20, 112 27 C116 32, 113 40, 106 41 C97 42, 91 36, 87 34 C91 37, 95 44, 91 50 C88 54, 83 53, 82 49 C82 43, 86 37, 89 28 Z"
          fill="url(#crestGoldGrad)"
        />
        <path
          d="M110 27 C118 20, 129 24, 131 33 C133 41, 125 48, 117 45 C119 43, 122 39, 121 34 C119 29, 113 28, 110 27 Z"
          fill="url(#crestGoldGrad)"
          opacity="0.85"
        />

        {/* Ornate lower scrolls & pedestal */}
        <path
          d="M62 55 C68 59, 74 61, 80 61 C86 61, 92 59, 98 55 C93 54, 87 56, 80 56 C73 56, 67 54, 62 55 Z"
          fill="url(#crestGoldGrad)"
        />
        <circle cx="56" cy="55" r="1.8" fill="#F5E6B3" />
        <circle cx="104" cy="55" r="1.8" fill="#F5E6B3" />
      </svg>

      {/* Main Arabic Calligraphy: كهرمان هوليك */}
      <div
        className={`font-semibold tracking-wide text-center leading-tight transition-all duration-300 ${currentScale.arabicText} text-white drop-shadow-[0_2px_10px_rgba(212,175,55,0.25)]`}
        style={{
          fontFamily: "'Cairo', 'Amiri', serif",
          letterSpacing: '0.02em',
        }}
      >
        <span className="text-white">كهرمان</span>{' '}
        <span className="text-[#F5E6B3] font-bold">هوليك</span>
      </div>

      {/* English Cursive Subtext: Kahraman Holic */}
      {showSubtext && (
        <div
          className={`italic font-normal tracking-wider -mt-0.5 ${currentScale.englishText}`}
          style={{
            fontFamily: "'Playfair Display', 'Cinzel', serif",
            color: '#E5C378',
            letterSpacing: '0.12em',
          }}
        >
          Kahraman Holic
        </div>
      )}

      {/* Symmetrical Lower Flourish Accent */}
      {size !== 'sm' && (
        <svg
          viewBox="0 0 100 12"
          className="w-auto mt-0.5 opacity-90"
          style={{ height: `${7 * currentScale.scale}px` }}
          fill="none"
        >
          <path
            d="M20 6 Q35 1, 46 6 T50 6 T54 6 Q65 1, 80 6"
            stroke="url(#crestGoldGrad)"
            strokeWidth="1.2"
          />
          <circle cx="50" cy="6" r="2.2" fill="#D4AF37" />
          <circle cx="43" cy="6" r="1.2" fill="#F5E6B3" />
          <circle cx="57" cy="6" r="1.2" fill="#F5E6B3" />
        </svg>
      )}
    </div>
  );
};
