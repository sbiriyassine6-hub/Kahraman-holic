import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Heart, Lock } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const { language, setActiveView, customLogoUrl } = useStore();
  const isAr = language === 'ar';

  return (
    <footer className="w-full bg-[#080706] border-t border-[#241A10] text-right pt-16 pb-12">
      {/* Decorative subtle gold gradient bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="inline-block">
              <Logo size="md" customLogoUrl={customLogoUrl} />
            </div>
            <p className="text-xs text-[#A69582] leading-relaxed">
              {isAr
                ? 'علامة قطرية متخصصة في اقتناء وتصميم أندر قطع الكهرمان الطبيعي البلطيقي الأصيل. مسابيح وخواتم ومجوهرات ملكية تحمل عبق التاريخ والأصالة.'
                : 'A premier amber house in Qatar curating rare natural Baltic amber heirlooms, royal prayer beads, and bespoke jewelry.'}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#D4AF37]">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>{isAr ? 'شهادة أصالة معتمدة مع كل قطعة' : 'Certified Untreated Baltic Amber'}</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 border-b border-[#241A10] pb-2">
              {isAr ? 'روابط سريعة' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs text-[#B3A18C]">
              <li>
                <button
                  onClick={() => {
                    setActiveView('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {isAr ? 'الصفحة الرئيسية' : 'Home'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {isAr ? 'المتجر وكافة المجموعات' : 'Full Catalog'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {isAr ? 'قصة كهرمان هوليك' : 'Our Story'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {isAr ? 'تواصل معنا واستفسر' : 'Contact & Inquiries'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 border-b border-[#241A10] pb-2">
              {isAr ? 'خدمة العملاء في قطر' : 'Concierge & Contact'}
            </h4>
            <ul className="space-y-3 text-xs text-[#B3A18C]">
              <li className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                <a
                  href="https://wa.me/97433879834"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white dir-ltr font-mono"
                >
                  +974 3387 9834
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                <a href="mailto:sbiriyassine6@gmail.com" className="hover:text-white">
                  sbiriyassine6@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                <span>{isAr ? 'الدوحة، دولة قطر' : 'Doha, State of Qatar'}</span>
              </li>
            </ul>
          </div>

          {/* Admin & Security Column */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 border-b border-[#241A10] pb-2">
              {isAr ? 'إدارة المتجر' : 'Store Management'}
            </h4>
            <p className="text-xs text-[#8C7A65] mb-4">
              {isAr
                ? 'منطقة محمية لصاحب المتجر لإضافة المنتجات وتحديث الأسعار والمخزون'
                : 'Secure admin portal to manage inventory, prices, and orders'}
            </p>
            <button
              onClick={() => {
                setActiveView('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1F1710] hover:bg-[#2E2115] text-[#D4AF37] border border-[#3A2B1D] text-xs font-semibold transition-all"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isAr ? 'لوحة التحكم الإدارية' : 'Admin Panel'}</span>
            </button>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-[#1F1710] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6E5C4A] gap-4">
          <div className="text-center sm:text-right">
            © {new Date().getFullYear()} كهرمان هوليك | KAHRAMAN HOLIC. {isAr ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.
          </div>
          <div className="flex items-center gap-4">
            <span>{isAr ? 'الدوحة، قطر' : 'Doha, Qatar'}</span>
            <span>•</span>
            <span className="text-[#D4AF37]">{isAr ? 'الدفع بالريال القطري (QAR)' : 'Prices in QAR'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
