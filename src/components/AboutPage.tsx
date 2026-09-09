import React from 'react';
import { ShieldCheck, Flame, Sparkles, Award, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Logo } from './Logo';

export const AboutPage: React.FC = () => {
  const { language, customLogoUrl, setActiveView } = useStore();
  const isAr = language === 'ar';

  const tests = [
    {
      titleAr: 'اختبار الماء المالح (الطفو)',
      titleEn: 'Saltwater Float Test',
      descAr: 'يطفو الكهرمان الطبيعي الأصلي على سطح الماء المشبع بالملح، في حين تغرق الأحجار البلاستيكية والمقلدة.',
      descEn: 'Authentic natural amber floats effortlessly in saturated saltwater due to its unique low density.',
    },
    {
      titleAr: 'اختبار الرائحة الصنوبرية',
      titleEn: 'Natural Pine Aroma Test',
      descAr: 'عند فرك الكهرمان الطبيعي برفق باليد، تنبعث منه رائحة خشب الصنوبر العتيقة المستخلصة من أشجار تعود لملايين السنين.',
      descEn: 'Gentle friction releases a distinct and comforting natural pine tree resin scent.',
    },
    {
      titleAr: 'اختبار الأشعة فوق البنفسجية (UV)',
      titleEn: 'UV Fluorescence Test',
      descAr: 'يتوهج الكهرمان البلطيقي الحقيقي بلون أزرق خافت مميز تحت أشعة الـ UV كدليل قاطع على أصالته وعدم خلطه.',
      descEn: 'Under UV light, authentic Baltic amber exhibits an unmistakable ethereal greenish-blue fluorescence.',
    },
  ];

  return (
    <div className="w-full bg-[#0B0B0C] py-16 sm:py-24 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-6 flex justify-center">
            <Logo size="xl" customLogoUrl={customLogoUrl} />
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            {isAr ? 'عن كهرمان هوليك' : 'About Kahraman Holic'}
          </h1>
          
          <p className="text-base sm:text-lg text-[#D4C3AC] leading-relaxed">
            {isAr
              ? 'في كهرمان هوليك، نختار قطع الكهرمان بعناية لنقدم تجربة تجمع بين الأصالة والجودة والفخامة في دولة قطر.'
              : 'At Kahraman Holic, we meticulously curate genuine Baltic amber to deliver an experience that unites heritage, authenticity, and luxury in Qatar.'}
          </p>
        </div>

        {/* Story & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#2B2117] p-2 bg-[#14100D] shadow-2xl">
              <img
                src={new URL('../assets/images/hero_amber_beads_1788970530400.jpg', import.meta.url).href}
                alt="Kahraman Holic Story"
                className="w-full aspect-[4/3] object-cover rounded-xl"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {isAr ? 'رسالتنا وشغفنا بالكهرمان الحر' : 'Our Legacy & Amber Passion'}
            </h2>

            <p className="text-sm sm:text-base text-[#B3A18C] leading-relaxed">
              {isAr
                ? 'انطلقت علامة "كهرمان هوليك" من عشق عميق لحجر الكهرمان البلطيقي، ذلك الذهب العضوي المتشكل عبر ملايين السنين من عصارة أشجار الصنوبر القديمة. نحن لا نبيع مجرد إكسسوارات أو مسابيح، بل نقدم قطعاً فنية نادرة تحتفظ بروح التاريخ وتحمل قيمة استثمارية وعاطفية تتوارثها الأجيال.'
                : 'Kahraman Holic was founded upon a profound appreciation for natural Baltic amber—the organic gold fossilized over tens of millions of years. We do not merely offer accessories; we curate heirloom masterpieces holding historical reverence and enduring investment value.'}
            </p>

            <p className="text-sm sm:text-base text-[#B3A18C] leading-relaxed">
              {isAr
                ? 'تخضع كل قطعة في متجرنا لفحص دقيق ومطابقة مخبرية للتأكد من خلوها من أي إضافات صناعية أو ضغط حراري مشوه. نحرص على تقديم المسابيح الخراطية الملكية، والخواتم المصاغة يدوياً، والقلادات الفاخرة لعملائنا المميزين في قطر والخليج العربي.'
                : 'Every creation undergoes rigorous laboratory evaluation ensuring untouched natural integrity, unpressed purity, and flawless hand-carved finishing for our discerning clientele in Qatar and the Arabian Gulf.'}
            </p>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => setActiveView('shop')}
                className="px-6 py-3 rounded-full bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B0B0C] font-bold text-sm transition-all"
              >
                {isAr ? 'تصفح روائع المقتنيات' : 'Explore Collections'}
              </button>

              <button
                onClick={() => setActiveView('contact')}
                className="px-6 py-3 rounded-full border border-[#3A2B1D] text-[#D4C3AC] hover:text-white text-sm"
              >
                {isAr ? 'تواصل مع الخبير' : 'Speak to a Specialist'}
              </button>
            </div>
          </div>
        </div>

        {/* Authenticity Verification Tests */}
        <div className="bg-[#14100D] border border-[#2B2016] rounded-2xl p-8 sm:p-12 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-2">
              {isAr ? 'ضمان الأصالة 100%' : '100% Authenticity Guarantee'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              {isAr ? 'كيف نتأكد من نقاء وأصالة الكهرمان؟' : 'How We Certify Natural Amber'}
            </h3>
            <p className="text-xs sm:text-sm text-[#A69582]">
              {isAr
                ? 'تخضع مقتنياتنا لمعايير فحص عالمية دقيقة لضمان أعلى مستويات الأصالة والمصداقية'
                : 'Our pieces are verified using internationally recognized amber testing methodologies'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tests.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#1C1611] p-6 rounded-xl border border-[#2B2117] hover:border-[#D4AF37]/50 transition-all text-right"
              >
                <div className="w-10 h-10 rounded-full bg-[#291D13] flex items-center justify-center text-[#D4AF37] mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">
                  {isAr ? t.titleAr : t.titleEn}
                </h4>
                <p className="text-xs text-[#A69582] leading-relaxed">
                  {isAr ? t.descAr : t.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Banner */}
        <div className="bg-gradient-to-r from-[#17110C] via-[#241910] to-[#17110C] p-8 rounded-xl border border-[#3A2B1D] text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-2">
            {isAr ? 'هل تبحث عن قطعة مخصصة أو استشارة خاصة؟' : 'Looking for a Bespoke Custom Piece?'}
          </h3>
          <p className="text-xs text-[#C5B39A] mb-6">
            {isAr
              ? 'يسعدنا استقبال طلبات التفصيل الخاص للمسابيح والخواتم وتوفير خامات نادرة حسب رغبتك في قطر.'
              : 'Our master craftsmen accommodate bespoke commissions for custom misbaha, rare rings, and raw specimens.'}
          </p>
          <a
            href="https://wa.me/97433879834?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%83%D9%87%D8%B1%D9%85%D8%A7%D9%86%20%D9%87%D9%88%D9%84%D9%8A%D9%83%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%82%D8%B7%D8%B9%D8%A9%20%D9%85%D8%AE%D8%B5%D8%B5%D8%A9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white font-bold text-sm shadow-lg transition-all"
          >
            <span>{isAr ? 'تحدث مباشرة عبر WhatsApp: +97433879834' : 'Contact WhatsApp: +97433879834'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
