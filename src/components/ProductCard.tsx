import React from 'react';
import { ShoppingBag, MessageCircle, Eye, CheckCircle2, XCircle } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, addToCart, setSelectedProductForDetail } = useStore();
  const isAr = language === 'ar';

  const isSoldOut = product.isSoldOut || product.stock <= 0;

  // WhatsApp prefilled message
  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const productName = isAr ? product.nameAr : product.nameEn;
    const text = isAr
      ? `مرحباً كهرمان هوليك، أود الاستفسار والطلب لقطعة: "${productName}" (كود: ${product.id}) بسعر ${product.price} ر.ق.`
      : `Hello Kahraman Holic, I would like to order: "${productName}" (Code: ${product.id}) priced at ${product.price} QAR.`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/97433879834?text=${encoded}`, '_blank');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => setSelectedProductForDetail(product)}
      className="group cursor-pointer bg-[#14100D] border border-[#2B2016] hover:border-[#D4AF37]/80 rounded-lg overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-[0_8px_30px_rgba(212,175,55,0.14)] relative"
    >
      {/* Top Badges */}
      <div className="relative aspect-[4/3] bg-[#0B0B0C] overflow-hidden">
        <img
          src={product.images[0]}
          alt={isAr ? product.nameAr : product.nameEn}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#14100D] via-transparent to-black/30 opacity-70 group-hover:opacity-40 transition-opacity" />

        {/* Stock / Sold Out Badge */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          {isSoldOut ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-950/90 text-red-300 border border-red-800/80 backdrop-blur-md">
              <XCircle className="w-3 h-3" />
              <span>{isAr ? 'نفدت الكمية' : 'Sold Out'}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-950/90 text-emerald-300 border border-emerald-800/80 backdrop-blur-md">
              <CheckCircle2 className="w-3 h-3" />
              <span>
                {isAr
                  ? product.stock === 1
                    ? 'قطعة واحدة فقط'
                    : `متوفر (${product.stock})`
                  : product.stock === 1
                  ? 'Only 1 left'
                  : `In Stock (${product.stock})`}
              </span>
            </span>
          )}

          {/* Weight Badge */}
          {product.weightGrams > 0 && (
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-medium bg-[#0B0B0C]/80 text-[#D4C3AC] border border-[#3A2B1C]/60 backdrop-blur-sm">
              {product.weightGrams}g
            </span>
          )}
        </div>

        {/* Quick View Overlay Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProductForDetail(product);
            }}
            className="px-4 py-2 rounded-full bg-[#D4AF37] text-[#0B0B0C] font-semibold text-xs flex items-center gap-1.5 shadow-xl hover:bg-[#F3E5AB] transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>{isAr ? 'عرض التفاصيل' : 'Quick View'}</span>
          </button>
        </div>
      </div>

      {/* Body Information */}
      <div className="p-4 flex-1 flex flex-col justify-between text-right">
        <div>
          {/* Origin / Subtitle */}
          <div className="flex items-center justify-between text-[11px] text-[#A6937E] mb-1.5">
            <span>{isAr ? product.originAr : product.originEn}</span>
            {product.beadSizeMm && <span className="text-[#8C7B68]">{product.beadSizeMm}</span>}
          </div>

          {/* Product Name */}
          <h3 className="text-base font-semibold text-white group-hover:text-[#F3E5AB] transition-colors line-clamp-2 leading-snug mb-2">
            {isAr ? product.nameAr : product.nameEn}
          </h3>

          {/* Brief Description */}
          <p className="text-xs text-[#A69582] line-clamp-2 leading-relaxed mb-3">
            {isAr ? product.descriptionAr : product.descriptionEn}
          </p>
        </div>

        {/* Price & Action Buttons */}
        <div>
          {/* Price in Qatari Riyals (QAR) */}
          <div className="flex items-baseline justify-between pt-2 mb-4 border-t border-[#261C13]">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-[#E5C378]">
                {product.price.toLocaleString()}{' '}
                <span className="text-xs font-medium text-[#C5B39A]">
                  {isAr ? 'ر.ق' : 'QAR'}
                </span>
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#705F4E] line-through">
                  {product.originalPrice.toLocaleString()} {isAr ? 'ر.ق' : 'QAR'}
                </span>
              )}
            </div>
            <span className="text-[11px] text-[#7A6A58]">
              {isAr ? 'شامل شهادة الفحص' : 'Certified Natural'}
            </span>
          </div>

          {/* Action Buttons: "أضف إلى السلة" and "اطلب عبر WhatsApp" */}
          <div className="grid grid-cols-2 gap-2">
            {/* Add to Cart Button */}
            <button
              id={`add-to-cart-btn-${product.id}`}
              onClick={handleAddToCart}
              disabled={isSoldOut}
              className={`py-2.5 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                isSoldOut
                  ? 'bg-[#1F1914] text-[#635343] cursor-not-allowed border border-[#2B2218]'
                  : 'bg-[#241A10] hover:bg-[#D4AF37] text-[#F3E5AB] hover:text-[#0B0B0C] border border-[#3A2B1D] hover:border-[#D4AF37] shadow-sm'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{isAr ? 'أضف إلى السلة' : 'Add to Cart'}</span>
            </button>

            {/* WhatsApp Direct Order Button */}
            <button
              id={`whatsapp-order-btn-${product.id}`}
              onClick={handleWhatsAppOrder}
              className="py-2.5 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 bg-[#0F2418] hover:bg-[#128C7E] text-emerald-300 hover:text-white border border-[#19402B] hover:border-[#128C7E] transition-all shadow-sm"
              title="+97433879834"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:text-white" />
              <span>{isAr ? 'اطلب عبر WhatsApp' : 'WhatsApp'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
