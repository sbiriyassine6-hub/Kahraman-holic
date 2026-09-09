import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WhatsAppFloating: React.FC = () => {
  const { language } = useStore();
  const isAr = language === 'ar';

  return (
    <aside aria-label="WhatsApp Concierge" className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
      <a
        href="https://wa.me/97433879834?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%83%D9%87%D8%B1%D9%85%D8%A7%D9%86%20%D9%87%D9%88%D9%84%D9%8A%D9%83%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%85%D9%82%D8%AA%D9%86%D9%8A%D8%A7%D8%AA%20%D8%A7%D9%84%D9%83%D9%87%D8%B1%D9%85%D8%A7%D9%86"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 bg-[#128C7E] hover:bg-[#075E54] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-[0_4px_25px_rgba(18,140,126,0.4)] hover:shadow-[0_6px_30px_rgba(18,140,126,0.6)] transition-all duration-300 transform hover:scale-105"
        title="+97433879834"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="hidden sm:inline-block text-xs font-bold tracking-wide">
          {isAr ? 'اطلب واستفسر عبر WhatsApp' : 'Order via WhatsApp'}
        </span>
      </a>
    </aside>
  );
};
