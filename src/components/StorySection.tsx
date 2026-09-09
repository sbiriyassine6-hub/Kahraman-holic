import React from 'react';
import { ShieldCheck, Gem, Sparkles, Award, ArrowLeft, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const StorySection: React.FC = () => {
  const { language, setActiveView } = useStore();
  const isAr = language === 'ar';

  const storyBadges = [
    {
      id: 'service',
      icon: Sparkles,
      titleAr: 'خدمة عملاء مميزة',
      titleEn: 'VIP Client Concierge',
    },
    {
      id: 'designs',
      icon: Award,
      titleAr: 'تصاميم فريدة',
      titleEn: 'Bespoke Craftsmanship',
    },
    {
      id: 'natural',
      icon: Gem,
      titleAr: 'أحجار طبيعية 100%',
      titleEn: '100% Natural Amber',
    },
    {
      id: 'quality',
      icon: ShieldCheck,
      titleAr: 'جودة مضمونة',
      titleEn: 'Certified Quality',
    },
  ];

  return (
    <section className="relative w-full bg-[#0B0B0C] py-16 sm:py-24 border-b border-[#241A10] overflow-hidden">
      {/* Subtle Baroque Damask Watermark Accent (matching user screenshot) */}
      <div className="absolute right-0 inset-y-0 w-96 opacity-5 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Visual: Glowing Natural Amber on Volcanic Rock (matches screenshot) */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-lg overflow-hidden border border-[#2B2117] p-2 bg-[#14100D] shadow-2xl group">
              <div className="relative aspect-[4/3] rounded overflow-hidden">
                <img
                  src={new URL('../assets/images/raw_amber_stones_1788970581477.jpg', import.meta.url).href}
                  alt="Kahraman Holic Natural Amber"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-transparent opacity-60" />
                
                {/* Floating Amber Authenticity Seal */}
                <div className="absolute bottom-4 right-4 bg-[#0B0B0C]/85 backdrop-blur-md border border-[#D4AF37]/50 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D97706] animate-pulse" />
                  <span className="text-xs font-semibold text-[#F3E5AB]">
                    {isAr ? 'كهرمان بلطيقي أصيل وغير معالج' : 'Untreated Baltic Amber'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content (matches screenshot text word-for-word) */}
          <div className="lg:col-span-6 text-right order-1 lg:order-2">
            
            {/* Heading "قصتنا" with Gold Accent Line */}
            <div className="mb-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                {isAr ? 'قصتنا' : 'Our Story'}
              </h2>
              <div className="w-16 h-[2px] bg-[#D4AF37] mt-2 rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
            </div>

            {/* Exact Paragraph from Mockup */}
            <p className="text-sm sm:text-base text-[#D4C3AC] leading-relaxed mb-8 max-w-xl">
              {isAr
                ? 'في كهرمان هوليك، نؤمن بأن الكهرمان أكثر من مجرد حجر... إنه تاريخ، وطبيعة، ورمز. نختار لك بعناية أجمل قطع الكهرمان الطبيعي من مصادر موثوقة، لنقدم لك تجربة فريدة تجمع بين الأصالة والتميز.'
                : 'At Kahraman Holic, we believe amber is far more than a precious gem... it is history, nature, and legacy. We meticulously select each authentic piece from certified Baltic origins to provide an experience of heritage and rare refinement.'}
            </p>

            {/* 4 Feature Badges in a Sleek Row (matches screenshot) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-3 mb-8 pt-4 border-t border-[#261B12]">
              {storyBadges.map((badge) => {
                const IconComponent = badge.icon;
                return (
                  <div
                    key={badge.id}
                    className="flex flex-col items-center text-center p-3 rounded bg-[#15110E]/60 border border-[#241A10]"
                  >
                    <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#241A10] text-[#D4AF37] mb-2">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-medium text-[#E5D5BC]">
                      {isAr ? badge.titleAr : badge.titleEn}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Button "تعرف على قصتنا ←" (matches screenshot) */}
            <div>
              <button
                id="story-learn-more-btn"
                onClick={() => {
                  setActiveView('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-[#D4AF37]/80 bg-[#16110D] hover:bg-[#D4AF37] text-[#F3E5AB] hover:text-[#0B0B0C] transition-all text-sm font-semibold shadow-md"
              >
                <span>{isAr ? 'تعرف على قصتنا' : 'Discover Our Story'}</span>
                {isAr ? (
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                ) : (
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
