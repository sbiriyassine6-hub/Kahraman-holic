import React from 'react';
import { useStore } from '../context/StoreContext';

export const CategoryShowcase: React.FC = () => {
  const { language, setSelectedCategory, setActiveView } = useStore();
  const isAr = language === 'ar';

  const categoryCards = [
    {
      id: 'rings',
      nameAr: 'خواتم الكهرمان',
      nameEn: 'Amber Rings',
      image: new URL('../assets/images/amber_ring_1788970543135.jpg', import.meta.url).href,
    },
    {
      id: 'pendants',
      nameAr: 'قلادات الكهرمان',
      nameEn: 'Amber Pendants',
      image: new URL('../assets/images/amber_pendant_1788970554992.jpg', import.meta.url).href,
    },
    {
      id: 'misbaha',
      nameAr: 'مسابيح الكهرمان',
      nameEn: 'Amber Misbaha',
      image: new URL('../assets/images/amber_misbaha_1788970566069.jpg', import.meta.url).href,
    },
    {
      id: 'raw',
      nameAr: 'القطع الخام',
      nameEn: 'Raw Amber',
      image: new URL('../assets/images/raw_amber_stones_1788970581477.jpg', import.meta.url).href,
    },
    {
      id: 'bracelets',
      nameAr: 'أساور الكهرمان',
      nameEn: 'Amber Bracelets',
      image: new URL('../assets/images/amber_bracelet_1788970592645.jpg', import.meta.url).href,
    },
    {
      id: 'packaging',
      nameAr: 'تغليف فاخر',
      nameEn: 'Luxury Packaging',
      image: new URL('../assets/images/luxury_box_1788970605461.jpg', import.meta.url).href,
    },
  ];

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    setActiveView('shop');
    const target = document.getElementById('product-catalog-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-[#0E0C0A] py-8 sm:py-12 border-b border-[#241A10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Cards Horizontal Bento Grid (matches user mockup exactly) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categoryCards.map((cat) => (
            <div
              key={cat.id}
              id={`category-card-${cat.id}`}
              onClick={() => handleSelectCategory(cat.id)}
              className="group cursor-pointer relative bg-[#15110E] border border-[#2B2117] hover:border-[#D4AF37]/70 rounded-md overflow-hidden transition-all duration-300 flex flex-col items-center p-3 text-center shadow-md hover:shadow-[0_4px_20px_rgba(212,175,55,0.15)]"
            >
              {/* Product Thumbnail Container */}
              <div className="w-full aspect-[4/3] rounded overflow-hidden bg-[#0B0B0C] mb-3 flex items-center justify-center relative">
                <img
                  src={cat.image}
                  alt={cat.nameAr}
                  className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15110E] via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity" />
              </div>

              {/* Title & Gold Underline indicator on hover */}
              <span className="text-xs sm:text-sm font-medium text-[#E5D5BC] group-hover:text-[#F5E6B3] transition-colors whitespace-nowrap">
                {isAr ? cat.nameAr : cat.nameEn}
              </span>

              {/* Gold underline accent (matches user mockup) */}
              <div className="w-6 h-[2px] bg-transparent group-hover:bg-[#D4AF37] mt-1.5 transition-all duration-300 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
