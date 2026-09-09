import React, { useMemo, useState } from 'react';
import { SlidersHorizontal, Search, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const ProductCatalog: React.FC = () => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    language,
  } = useStore();

  const isAr = language === 'ar';
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'weight'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }

        // Stock filter
        if (onlyInStock && (product.isSoldOut || product.stock <= 0)) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchAr = product.nameAr.toLowerCase().includes(q) ||
            product.descriptionAr.toLowerCase().includes(q) ||
            product.originAr.toLowerCase().includes(q);
          const matchEn = product.nameEn.toLowerCase().includes(q) ||
            product.descriptionEn.toLowerCase().includes(q) ||
            product.originEn.toLowerCase().includes(q);
          return matchAr || matchEn;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'weight') return b.weightGrams - a.weightGrams;
        // default: featured first, then in-stock
        if (a.isSoldOut && !b.isSoldOut) return 1;
        if (!a.isSoldOut && b.isSoldOut) return -1;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, onlyInStock, sortBy]);

  return (
    <section id="product-catalog-section" className="w-full bg-[#0B0B0C] py-16 sm:py-20 border-b border-[#241A10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A140E] border border-[#382819] text-[#D4AF37] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'مقتنيات كهرمان هوليك الملكية' : 'Kahraman Holic Royal Catalog'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            {isAr ? 'روائع الكهرمان الطبيعي' : 'Natural Amber Masterpieces'}
          </h2>

          <p className="text-sm text-[#A69582]">
            {isAr
              ? 'تصفح تشكيلتنا الحصرية من مسابيح الكهرمان البولندي النادر والخواتم والقلادات المصاغة يدوياً'
              : 'Explore our exclusive collection of rare Baltic amber misbaha, heirloom rings, and bespoke jewelry'}
          </p>
        </div>

        {/* Filters and Search Control Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-[#130F0C] p-4 rounded-xl border border-[#2B2016]">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <button
              id="category-tab-all"
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#D4AF37] text-[#0B0B0C] shadow-md'
                  : 'bg-[#1C1611] text-[#C5B39A] hover:text-white hover:bg-[#2A2017]'
              }`}
            >
              {isAr ? 'كافة القطع' : 'All Collections'}
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`category-tab-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#D4AF37] text-[#0B0B0C] shadow-md'
                    : 'bg-[#1C1611] text-[#C5B39A] hover:text-white hover:bg-[#2A2017]'
                }`}
              >
                {isAr ? cat.nameAr : cat.nameEn}
              </button>
            ))}
          </div>

          {/* Secondary Controls: Stock Toggle & Sort */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            
            {/* Only In Stock Toggle */}
            <label className="flex items-center gap-2 text-xs text-[#C5B39A] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded bg-[#1C1611] border-[#3A2B1C] text-[#D4AF37] focus:ring-0 focus:ring-offset-0"
              />
              <span>{isAr ? 'المتوفر فقط' : 'In Stock Only'}</span>
            </label>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-[#C5B39A] bg-[#1C1611] px-3 py-2 rounded-lg border border-[#2E2217]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#D4AF37]" />
              <select
                id="catalog-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs text-[#E5D5BC] focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-[#1C1611] text-white">
                  {isAr ? 'المميز أولاً' : 'Featured First'}
                </option>
                <option value="price-asc" className="bg-[#1C1611] text-white">
                  {isAr ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}
                </option>
                <option value="price-desc" className="bg-[#1C1611] text-white">
                  {isAr ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}
                </option>
                <option value="weight" className="bg-[#1C1611] text-white">
                  {isAr ? 'الوزن (الأثقل أولاً)' : 'Weight (Grams)'}
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Count Indicator */}
        <div className="flex items-center justify-between text-xs text-[#8C7A65] mb-6">
          <span>
            {isAr
              ? `عرض ${filteredProducts.length} من إجمالي ${products.length} قطعة`
              : `Showing ${filteredProducts.length} of ${products.length} pieces`}
          </span>

          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#D4AF37] hover:underline"
            >
              {isAr ? 'مسح البحث' : 'Clear search'}
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 bg-[#14100D] rounded-xl border border-[#2B2016]">
            <Search className="w-12 h-12 text-[#6B5A47] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">
              {isAr ? 'لم نجد قطع كهرمان تطابق بحثك' : 'No amber pieces found'}
            </h3>
            <p className="text-sm text-[#A69582] mb-6 max-w-md mx-auto">
              {isAr
                ? 'جرب البحث بكلمات أخرى أو اختر فئة مختلفة لمشاهدة مقتنياتنا المتوفرة'
                : 'Try adjusting your search terms or filter to see available pieces'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setOnlyInStock(false);
              }}
              className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-[#0B0B0C] font-bold text-xs"
            >
              {isAr ? 'إعادة ضبط كافة الفلاتر' : 'Reset all filters'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
