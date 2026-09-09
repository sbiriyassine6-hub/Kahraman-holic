import React from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotalQar,
    cartItemsCount,
    language,
    setIsCheckoutOpen,
  } = useStore();

  if (!isCartOpen) return null;

  const isAr = language === 'ar';

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-fadeIn"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className={`fixed inset-y-0 ${
          isAr ? 'left-0' : 'right-0'
        } max-w-full flex pl-0 sm:pl-10 w-full sm:max-w-md`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full bg-[#120E0B] border-x border-[#332517] shadow-2xl flex flex-col justify-between text-right">
          
          {/* Header */}
          <div className="p-5 border-b border-[#291D13] flex items-center justify-between">
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-[#A6937E] hover:text-white hover:bg-[#241910] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-lg font-bold text-white">
                {isAr ? 'حقيبة المقتنيات' : 'Your Shopping Bag'}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#241A10] text-[#D4AF37] border border-[#3A2B1D]">
                {cartItemsCount}
              </span>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#1C150F] flex items-center justify-center text-[#73604B] mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">
                  {isAr ? 'حقيبتك فارغة حالياً' : 'Your bag is empty'}
                </h3>
                <p className="text-xs text-[#8C7A65] max-w-xs mb-6">
                  {isAr
                    ? 'اختر قطع الكهرمان الملكية المميزة من مجموعاتنا الفاخرة وأضفها لحقيبتك'
                    : 'Explore our collections and add authentic amber treasures to your bag'}
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-[#0B0B0C] text-xs font-bold shadow-md hover:bg-[#F3E5AB] transition-colors"
                >
                  {isAr ? 'استكشف المجموعات' : 'Explore Collections'}
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3 bg-[#19130D] rounded-lg border border-[#2B1F14] flex gap-3 items-center"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="w-16 h-16 object-cover rounded-md border border-[#382A1C] flex-shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 text-right min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">
                      {isAr ? item.product.nameAr : item.product.nameEn}
                    </h4>
                    <span className="text-[11px] text-[#A6937E] block mb-1.5">
                      {item.product.weightGrams}g • {isAr ? item.product.originAr : item.product.originEn}
                    </span>

                    <div className="flex items-center justify-between">
                      {/* Price */}
                      <span className="text-xs font-bold text-[#E5C378]">
                        {(item.product.price * item.quantity).toLocaleString()}{' '}
                        {isAr ? 'ر.ق' : 'QAR'}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-[#0E0C0A] px-2 py-1 rounded border border-[#291D13]">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="text-[#9E8B76] hover:text-white p-0.5"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="text-[#9E8B76] hover:text-white p-0.5 disabled:opacity-30"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-1.5 text-[#7A6A58] hover:text-red-400 rounded transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#17110C] border-t border-[#291D13] space-y-4">
              {/* Delivery notice */}
              <div className="flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-950/40 p-2 rounded border border-emerald-900/50">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>
                  {isAr
                    ? 'توصيل مجاني وسريع لكافة مناطق ومناطق قطر'
                    : 'Free fast VIP delivery across all Qatar municipalities'}
                </span>
              </div>

              {/* Subtotal */}
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-base font-bold text-white">
                  {cartTotalQar.toLocaleString()}{' '}
                  <span className="text-xs font-semibold text-[#D4AF37]">
                    {isAr ? 'ريال قطري (QAR)' : 'QAR'}
                  </span>
                </span>
                <span className="text-[#A6937E] font-medium">
                  {isAr ? 'الإجمالي الفرعي:' : 'Subtotal:'}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                id="cart-proceed-checkout-btn"
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3.5 rounded-lg bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B0B0C] font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>{isAr ? 'متابعة إتمام الطلب' : 'Proceed to Checkout'}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
