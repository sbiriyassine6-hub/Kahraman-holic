import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Logo } from './Logo';

export const Hero: React.FC = () => {
  const { language, setActiveView, customLogoUrl } = useStore();
  const isAr = language === 'ar';

  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: new URL('../assets/images/hero_amber_beads_1788970530400.jpg', import.meta.url).href,
      headlineAr: 'أصالة الكهرمان ..\nفي قطعة تستحق أن تُقتنى',
      headlineEn: 'Authentic Amber Masterpieces..\nCrafted to be Treasured',
      subtextAr: 'اكتشف مجموعتنا المختارة من الكهرمان الطبيعي والقطع الفاخرة، بتصاميم فريدة وجودة عالية تجمع بين الأصالة والجودة والفخامة.',
      subtextEn: 'Discover our curated selection of 100% natural Baltic amber jewelry and imperial misbaha, blending heritage with modern luxury.',
    },
    {
      id: 2,
      image: new URL('../assets/images/raw_amber_stones_1788970581477.jpg', import.meta.url).href,
      headlineAr: 'كهرمان طبيعي 100%..\nمن أعماق بحر البلطيق',
      headlineEn: '100% Natural Amber..\nFrom the Depths of the Baltic',
      subtextAr: 'في كهرمان هوليك، نختار كل قطعة بعناية فائقة لتصلك مع شهادة فحص موثوقة تضمن نقاء الخامة وأصالتها.',
      subtextEn: 'At Kahraman Holic, each amber stone is hand-selected with certified authenticity guaranteed to meet royal standards.',
    }
  ];

  const current = slides[activeSlide];

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#0B0B0C] min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] flex items-center">
      {/* Background Cinematic Image with Luxury Dark Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={current.image}
          alt="Kahraman Holic Luxury Amber"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out brightness-90"
        />
        {/* Cinematic Vignette & Gradients matching screenshot */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C] via-[#0B0B0C]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-[#0B0B0C]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(217,119,6,0.12),transparent_60%)]" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="max-w-xl text-right">
          
          {/* Brand Logo in Hero */}
          <div className="mb-6 inline-block">
            <Logo size="lg" customLogoUrl={customLogoUrl} showSubtext={true} />
          </div>

          {/* User Requested Exact Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.3] mb-4 tracking-tight drop-shadow-md">
            {isAr ? (
              <>
                <span className="block text-[#F3E5AB]">أصالة الكهرمان ..</span>
                <span className="block text-white mt-1">في قطعة تستحق أن تُقتنى</span>
              </>
            ) : (
              <>
                <span className="block text-[#F3E5AB]">Authentic Amber ..</span>
                <span className="block text-white mt-1">Crafted to be Treasured</span>
              </>
            )}
          </h1>

          {/* User Requested Exact Subtitle / Description */}
          <p className="text-sm sm:text-base text-[#D4C3AC] leading-relaxed mb-8 max-w-lg drop-shadow">
            {isAr ? current.subtextAr : current.subtextEn}
          </p>

          {/* User Requested CTA: "تسوق الآن" */}
          <div className="flex items-center gap-4">
            <button
              id="hero-shop-now-btn"
              onClick={() => {
                setActiveView('shop');
                const catalogElem = document.getElementById('product-catalog-section');
                if (catalogElem) {
                  catalogElem.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-[#D4AF37] bg-[#1A140F]/80 hover:bg-[#D4AF37] text-[#F3E5AB] hover:text-[#0B0B0C] transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.45)] text-sm sm:text-base font-semibold"
            >
              <span>{isAr ? 'تسوق الآن' : 'Shop Now'}</span>
              {isAr ? (
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              ) : (
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              )}
            </button>

            <button
              id="hero-our-story-btn"
              onClick={() => {
                setActiveView('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm text-[#C5B39A] hover:text-[#F3E5AB] transition-colors"
            >
              <span>{isAr ? 'اكتشف قصتنا' : 'Our Story'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Slider Left and Right Controls */}
      <button
        onClick={handlePrev}
        className="hidden md:flex absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full items-center justify-center border border-[#3A2E20]/80 bg-[#0B0B0C]/60 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B0B0C] transition-all shadow-lg backdrop-blur-sm"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="hidden md:flex absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full items-center justify-center border border-[#3A2E20]/80 bg-[#0B0B0C]/60 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B0B0C] transition-all shadow-lg backdrop-blur-sm"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Slider Pagination Dots (matches screenshot) */}
      <div className="absolute bottom-6 inset-x-0 z-20 flex items-center justify-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className={`h-1.5 transition-all rounded-full ${
              activeSlide === idx
                ? 'w-8 bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]'
                : 'w-2.5 bg-[#4A3B2A] hover:bg-[#73604B]'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
