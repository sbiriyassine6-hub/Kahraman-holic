import React, { useState } from 'react';
import { X, ShoppingBag, MessageCircle, ShieldCheck, Check, Truck, Sparkles, Scale, Globe, Info } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductForDetail,
    setSelectedProductForDetail,
    language,
    addToCart,
    products,
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!selectedProductForDetail) return null;

  const product = selectedProductForDetail;
  const isAr = language === 'ar';
  const isSoldOut = product.isSoldOut || product.stock <= 0;

  // Find related products in same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    if (isSoldOut) return;
    addToCart(product, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleWhatsAppOrder = () => {
    const productName = isAr ? product.nameAr : product.nameEn;
    const text = isAr
      ? `مرحباً متجر كهرمان هوليك، أرغب بطلب هذه القطعة المميزة:\n- الاسم: ${productName}\n- الكود: ${product.id}\n- السعر: ${product.price} ر.ق\n- الوزن: ${product.weightGrams} جرام\nيرجى تأكيد التوافر وطريقة التوصيل داخل قطر.`
      : `Hello Kahraman Holic, I would like to order this exclusive piece:\n- Product: ${productName}\n- Code: ${product.id}\n- Price: ${product.price} QAR\n- Weight: ${product.weightGrams}g\nPlease confirm availability and delivery in Qatar.`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/97433879834?text=${encoded}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={() => setSelectedProductForDetail(null)}
    >
      <div
        className="relative w-full max-w-4xl bg-[#120E0B] border border-[#3A2B1D] rounded-xl overflow-hidden shadow-2xl text-right my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductForDetail(null)}
          className="absolute top-4 left-4 z-20 p-2 rounded-full bg-[#1F1710]/80 text-[#D4C3AC] hover:text-white hover:bg-[#3A2B1D] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Gallery Images Column */}
            <div className="md:col-span-6 flex flex-col gap-3">
              <div className="relative aspect-square rounded-lg overflow-hidden border border-[#2E2115] bg-[#0A0807] shadow-inner">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={isAr ? product.nameAr : product.nameEn}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
                
                {/* Sold out overlay */}
                {isSoldOut && (
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-red-950/90 text-red-300 border border-red-800 text-sm font-bold tracking-wider">
                      {isAr ? 'نفدت الكمية - Sold Out' : 'Sold Out'}
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-md overflow-hidden border-2 flex-shrink-0 transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30'
                          : 'border-[#2E2115] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details & Purchase Actions */}
            <div className="md:col-span-6 flex flex-col justify-between h-full">
              <div>
                {/* Category & Origin */}
                <div className="flex items-center justify-between text-xs text-[#A6937E] mb-2">
                  <span className="text-[#D4AF37] font-semibold">
                    {product.amberTypeAr || (isAr ? 'كهرمان أصلي 100%' : '100% Genuine Amber')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5" />
                    {isAr ? product.originAr : product.originEn}
                  </span>
                </div>

                {/* Product Title */}
                <h2 className="text-2xl font-bold text-white mb-3 leading-snug">
                  {isAr ? product.nameAr : product.nameEn}
                </h2>

                {/* Price Display in QAR */}
                <div className="flex items-baseline gap-3 mb-6 p-3 rounded-lg bg-[#19130D] border border-[#2B1F14]">
                  <span className="text-3xl font-extrabold text-[#E5C378]">
                    {product.price.toLocaleString()}{' '}
                    <span className="text-sm font-medium text-[#C5B39A]">
                      {isAr ? 'ريال قطري (QAR)' : 'QAR'}
                    </span>
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#73604B] line-through">
                      {product.originalPrice.toLocaleString()} {isAr ? 'ر.ق' : 'QAR'}
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#A6937E] mb-2 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{isAr ? 'الوصف والتفاصيل' : 'Product Description'}</span>
                  </h4>
                  <p className="text-sm text-[#D4C3AC] leading-relaxed">
                    {isAr ? product.descriptionAr : product.descriptionEn}
                  </p>
                </div>

                {/* Specifications Grid */}
                <div className="grid grid-cols-2 gap-2 mb-6 text-xs bg-[#17110C] p-3 rounded-lg border border-[#2B2016]">
                  <div className="flex items-center gap-2 p-1.5 text-[#C5B39A]">
                    <Scale className="w-4 h-4 text-[#D4AF37]" />
                    <span>{isAr ? 'الوزن التقريبي:' : 'Weight:'}</span>
                    <strong className="text-white">{product.weightGrams} {isAr ? 'جرام' : 'g'}</strong>
                  </div>

                  {product.beadSizeMm && (
                    <div className="flex items-center gap-2 p-1.5 text-[#C5B39A]">
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                      <span>{isAr ? 'المقاس والقصة:' : 'Bead size:'}</span>
                      <strong className="text-white">{product.beadSizeMm}</strong>
                    </div>
                  )}

                  {product.beadsCount && (
                    <div className="flex items-center gap-2 p-1.5 text-[#C5B39A]">
                      <span className="text-[#D4AF37] font-bold">●</span>
                      <span>{isAr ? 'عدد الحبات:' : 'Beads count:'}</span>
                      <strong className="text-white">{product.beadsCount} {isAr ? 'خرزة' : 'beads'}</strong>
                    </div>
                  )}

                  <div className="flex items-center gap-2 p-1.5 text-[#C5B39A]">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{isAr ? 'المصدر:' : 'Origin:'}</span>
                    <strong className="text-white">{isAr ? product.originAr : product.originEn}</strong>
                  </div>
                </div>

                {/* Guarantee Badges */}
                <div className="flex items-center gap-4 text-xs text-[#9E8B76] mb-6 border-b border-[#291D13] pb-4">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    <span>{isAr ? 'شهادة فحص كهرمان أصلي' : 'Authenticity Guarantee'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#D4AF37]" />
                    <span>{isAr ? 'توصيل فوري داخل قطر' : 'Fast Delivery in Qatar'}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Add to Cart */}
                  <button
                    id="modal-add-to-cart-btn"
                    onClick={handleAddToCart}
                    disabled={isSoldOut}
                    className={`py-3.5 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      isSoldOut
                        ? 'bg-[#1F1813] text-[#635343] cursor-not-allowed border border-[#2C2117]'
                        : addedAnimation
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B0B0C] shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                    }`}
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{isAr ? 'تمت الإضافة إلى السلة' : 'Added to Cart'}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>{isAr ? 'أضف إلى السلة' : 'Add to Cart'}</span>
                      </>
                    )}
                  </button>

                  {/* WhatsApp Order */}
                  <button
                    id="modal-whatsapp-order-btn"
                    onClick={handleWhatsAppOrder}
                    className="py-3.5 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 bg-[#128C7E] hover:bg-[#075E54] text-white transition-all shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{isAr ? 'اطلب عبر WhatsApp (+974)' : 'Order via WhatsApp'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Row */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#291D13]">
              <h3 className="text-lg font-bold text-white mb-4">
                {isAr ? 'قطع مشابهة قد تنال إعجابك' : 'Related Amber Pieces'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((relProduct) => (
                  <ProductCard key={relProduct.id} product={relProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
