import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, MapPin, Phone, User, Mail, MessageCircle, AlertCircle, Copy, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CustomerDetails, Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotalQar,
    language,
    placeOrder,
    lastPlacedOrder,
    setLastPlacedOrder,
  } = useStore();

  const isAr = language === 'ar';

  const [formData, setFormData] = useState<CustomerDetails>({
    name: '',
    phone: '',
    email: '',
    municipality: 'Doha / الدوحة',
    address: '',
    notes: '',
    paymentMethod: 'cash_on_delivery',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [copiedOrder, setCopiedOrder] = useState(false);

  if (!isCheckoutOpen && !lastPlacedOrder) return null;

  const qatarMunicipalities = [
    { ar: 'الدوحة', en: 'Doha' },
    { ar: 'لوسيل', en: 'Lusail' },
    { ar: 'الريان', en: 'Al Rayyan' },
    { ar: 'الوكرة', en: 'Al Wakrah' },
    { ar: 'الخور والذخيرة', en: 'Al Khor' },
    { ar: 'أم صلال', en: 'Umm Salal' },
    { ar: 'الظعاين', en: 'Al Daayen' },
    { ar: 'الشحانية', en: 'Al Shahaniya' },
    { ar: 'الشمال', en: 'Al Shamal' },
  ];

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setErrorMsg(isAr ? 'يرجى تعبئة كافة الحقول الأساسية (الاسم، الهاتف، والعنوان)' : 'Please fill all required fields');
      return;
    }

    // Place order
    const createdOrder = placeOrder(formData);
    setErrorMsg('');
  };

  const handleSendWhatsAppOrder = (order: Order) => {
    const itemsList = order.items
      .map(
        (it) =>
          `• ${isAr ? it.product.nameAr : it.product.nameEn} (العدد: ${it.quantity}) - ${(it.product.price * it.quantity).toLocaleString()} ر.ق`
      )
      .join('\n');

    const paymentLabel =
      order.customer.paymentMethod === 'cash_on_delivery'
        ? (isAr ? 'الدفع نقداً عند الاستلام' : 'Cash on Delivery')
        : order.customer.paymentMethod === 'card_on_delivery'
        ? (isAr ? 'الدفع بالبطاقة عبر جهاز نقاط البيع عند التوصيل' : 'Card POS on Delivery')
        : (isAr ? 'تحويل بنكي مباشر' : 'Bank Transfer');

    const text = isAr
      ? `👑 *طلب جديد من متجر كهرمان هوليك*\n\n` +
        `*رقم الطلب:* #${order.id}\n` +
        `*الاسم:* ${order.customer.name}\n` +
        `*الهاتف:* ${order.customer.phone}\n` +
        `*البريد:* ${order.customer.email || 'غير محدد'}\n` +
        `*المنطقة:* ${order.customer.municipality}\n` +
        `*العنوان التفصيلي:* ${order.customer.address}\n` +
        `*طريقة الدفع:* ${paymentLabel}\n` +
        (order.customer.notes ? `*ملاحظات إضافية:* ${order.customer.notes}\n` : '') +
        `\n*القطع المطلوبة:*\n${itemsList}\n\n` +
        `*الإجمالي النهائي:* ${order.totalQar.toLocaleString()} ريال قطري (QAR)\n\n` +
        `يرجى تأكيد التجهيز وتحديد موعد تسليم الطلب.`
      : `👑 *New Order from Kahraman Holic*\n\n` +
        `*Order ID:* #${order.id}\n` +
        `*Customer:* ${order.customer.name}\n` +
        `*Phone:* ${order.customer.phone}\n` +
        `*Area:* ${order.customer.municipality}\n` +
        `*Address:* ${order.customer.address}\n` +
        `*Payment:* ${paymentLabel}\n\n` +
        `*Items:*\n${itemsList}\n\n` +
        `*Total:* ${order.totalQar.toLocaleString()} QAR\n\n` +
        `Please confirm preparation and delivery schedule.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/97433879834?text=${encoded}`, '_blank');
  };

  const handleCopyOrderId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedOrder(true);
    setTimeout(() => setCopiedOrder(false), 2000);
  };

  const handleCloseAll = () => {
    setIsCheckoutOpen(false);
    setLastPlacedOrder(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      onClick={handleCloseAll}
    >
      <div
        className="relative w-full max-w-2xl bg-[#120E0B] border border-[#3A2B1D] rounded-xl overflow-hidden shadow-2xl text-right my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleCloseAll}
          className="absolute top-4 left-4 z-20 p-2 rounded-full bg-[#1F1710]/80 text-[#D4C3AC] hover:text-white hover:bg-[#3A2B1D] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ORDER SUCCESS CONFIRMATION VIEW */}
        {lastPlacedOrder ? (
          <div className="p-6 sm:p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-4 shadow-lg shadow-emerald-900/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block mb-1">
              {isAr ? 'تم تأكيد طلبك بنجاح' : 'Order Placed Successfully'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {isAr ? 'شكراً لاختيارك كهرمان هوليك' : 'Thank You for Choosing Kahraman Holic'}
            </h2>
            <p className="text-xs sm:text-sm text-[#A69582] max-w-md mx-auto mb-6">
              {isAr
                ? 'تم تسجيل طلبك وسيقوم فريقنا بالتواصل معك لتأكيد التوصيل الفوري إلى عنوانك في دولة قطر.'
                : 'Your order is recorded. Our concierge team will contact you to coordinate delivery across Qatar.'}
            </p>

            {/* Order Card Receipt */}
            <div className="bg-[#17110C] border border-[#2B2016] rounded-xl p-5 text-right mb-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#291D13] mb-4">
                <button
                  onClick={() => handleCopyOrderId(lastPlacedOrder.id)}
                  className="flex items-center gap-1.5 text-xs text-[#D4AF37] hover:underline"
                >
                  {copiedOrder ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedOrder ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ رقم الطلب' : 'Copy ID')}</span>
                </button>
                <span className="text-sm font-bold text-white">
                  {isAr ? 'رقم الطلب:' : 'Order ID:'}{' '}
                  <span className="text-[#E5C378]">#{lastPlacedOrder.id}</span>
                </span>
              </div>

              {/* Items Summary */}
              <div className="space-y-2 mb-4">
                {lastPlacedOrder.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-xs text-[#D4C3AC]">
                    <span className="font-bold text-[#E5C378]">
                      {(item.product.price * item.quantity).toLocaleString()} {isAr ? 'ر.ق' : 'QAR'}
                    </span>
                    <span>
                      {isAr ? item.product.nameAr : item.product.nameEn} × {item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Delivery Details */}
              <div className="pt-3 border-t border-[#291D13] text-xs text-[#A6937E] flex flex-col gap-1">
                <div>
                  <strong className="text-white">{isAr ? 'المستلم: ' : 'Customer: '}</strong>
                  {lastPlacedOrder.customer.name} ({lastPlacedOrder.customer.phone})
                </div>
                <div>
                  <strong className="text-white">{isAr ? 'العنوان: ' : 'Address: '}</strong>
                  {lastPlacedOrder.customer.municipality} - {lastPlacedOrder.customer.address}
                </div>
                <div className="text-base font-bold text-[#E5C378] pt-2 flex justify-between">
                  <span>{lastPlacedOrder.totalQar.toLocaleString()} {isAr ? 'ريال قطري (QAR)' : 'QAR'}</span>
                  <span className="text-white">{isAr ? 'الإجمالي الكلي:' : 'Total:'}</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Confirmation Button */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                id="order-whatsapp-send-btn"
                onClick={() => handleSendWhatsAppOrder(lastPlacedOrder)}
                className="px-6 py-3.5 rounded-lg bg-[#128C7E] hover:bg-[#075E54] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isAr ? 'إرسال الفاتورة عبر WhatsApp (+974)' : 'Send Order via WhatsApp'}</span>
              </button>

              <button
                onClick={handleCloseAll}
                className="px-6 py-3.5 rounded-lg bg-[#241A10] hover:bg-[#382819] text-[#E5C378] font-bold text-xs sm:text-sm border border-[#3A2B1D] transition-all"
              >
                {isAr ? 'متابعة التسوق' : 'Continue Shopping'}
              </button>
            </div>
          </div>
        ) : (
          /* CHECKOUT FORM VIEW */
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                {isAr ? 'إتمام الطلب والتوصيل في قطر' : 'Checkout & Delivery in Qatar'}
              </h2>
              <p className="text-xs text-[#A69582]">
                {isAr
                  ? 'أدخل بياناتك لتوصيل مقتنيات الكهرمان إلى باب منزلك مع شهادة الأصالة المعتمدة'
                  : 'Enter your delivery details for prompt delivery across Qatar with certificate of authenticity'}
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-800/80 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="space-y-4 mb-6">
              {/* Customer Name */}
              <div>
                <label className="block text-xs font-semibold text-[#D4C3AC] mb-1">
                  {isAr ? 'الاسم الكامل *' : 'Full Name *'}
                </label>
                <div className="relative">
                  <input
                    id="checkout-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isAr ? 'مثال: محمد الكواري' : 'e.g., Mohammed Al-Kuwari'}
                    className="w-full bg-[#17110C] border border-[#2B2016] focus:border-[#D4AF37] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#6B5A47] focus:outline-none"
                  />
                  <User className="w-4 h-4 text-[#7A6A58] absolute left-3 top-3" />
                </div>
              </div>

              {/* Phone and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#D4C3AC] mb-1">
                    {isAr ? 'رقم الهاتف / الجوال (قطر) *' : 'Qatar Mobile Phone *'}
                  </label>
                  <div className="relative">
                    <input
                      id="checkout-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+974 3387 9834"
                      className="w-full bg-[#17110C] border border-[#2B2016] focus:border-[#D4AF37] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#6B5A47] focus:outline-none"
                    />
                    <Phone className="w-4 h-4 text-[#7A6A58] absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D4C3AC] mb-1">
                    {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <div className="relative">
                    <input
                      id="checkout-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sbiriyassine6@gmail.com"
                      className="w-full bg-[#17110C] border border-[#2B2016] focus:border-[#D4AF37] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#6B5A47] focus:outline-none"
                    />
                    <Mail className="w-4 h-4 text-[#7A6A58] absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              {/* Qatar Municipality Select */}
              <div>
                <label className="block text-xs font-semibold text-[#D4C3AC] mb-1">
                  {isAr ? 'البلدية / المنطقة في دولة قطر *' : 'Municipality / Area in Qatar *'}
                </label>
                <div className="relative">
                  <select
                    id="checkout-municipality"
                    value={formData.municipality}
                    onChange={(e) => setFormData({ ...formData, municipality: e.target.value })}
                    className="w-full bg-[#17110C] border border-[#2B2016] focus:border-[#D4AF37] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none cursor-pointer"
                  >
                    {qatarMunicipalities.map((mun, i) => (
                      <option key={i} value={`${mun.en} / ${mun.ar}`} className="bg-[#120E0B] text-white">
                        {isAr ? mun.ar : mun.en}
                      </option>
                    ))}
                  </select>
                  <MapPin className="w-4 h-4 text-[#7A6A58] absolute left-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Detailed Street Address */}
              <div>
                <label className="block text-xs font-semibold text-[#D4C3AC] mb-1">
                  {isAr ? 'العنوان التفصيلي (الشارع، رقم المبنى، فيلا/شقة) *' : 'Detailed Address (Street, Building, Villa) *'}
                </label>
                <textarea
                  id="checkout-address"
                  required
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder={isAr ? 'مثال: لوسيل، مارينا، برج 4، شقة 1201' : 'e.g., Lusail Marina, Tower 4, Apt 1201'}
                  className="w-full bg-[#17110C] border border-[#2B2016] focus:border-[#D4AF37] rounded-lg p-3 text-sm text-white placeholder-[#6B5A47] focus:outline-none resize-none"
                />
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#D4C3AC] mb-2">
                  {isAr ? 'طريقة الدفع في قطر' : 'Payment Method in Qatar'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'cash_on_delivery', labelAr: 'الدفع عند الاستلام', labelEn: 'Cash on Delivery' },
                    { id: 'card_on_delivery', labelAr: 'بطاقة عند التوصيل (POS)', labelEn: 'Card POS Machine' },
                    { id: 'bank_transfer', labelAr: 'تحويل بنكي مباشر', labelEn: 'Bank Transfer' },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer text-xs transition-all ${
                        formData.paymentMethod === method.id
                          ? 'border-[#D4AF37] bg-[#241A10] text-[#F3E5AB]'
                          : 'border-[#261B12] bg-[#17110C] text-[#A6937E] hover:border-[#3A2B1D]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={() => setFormData({ ...formData, paymentMethod: method.id as any })}
                        className="text-[#D4AF37] focus:ring-0"
                      />
                      <span>{isAr ? method.labelAr : method.labelEn}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Total & Submit */}
            <div className="pt-4 border-t border-[#291D13] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-right">
                <span className="text-xs text-[#8C7A65] block">{isAr ? 'إجمالي الطلب:' : 'Order Total:'}</span>
                <span className="text-xl font-bold text-[#E5C378]">
                  {cartTotalQar.toLocaleString()} {isAr ? 'ريال قطري (QAR)' : 'QAR'}
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="px-4 py-3 rounded-lg border border-[#2B2016] text-[#A6937E] hover:text-white text-xs font-semibold"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>

                <button
                  id="checkout-submit-order-btn"
                  type="submit"
                  className="flex-1 sm:flex-initial px-8 py-3 rounded-lg bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B0B0C] font-bold text-sm shadow-lg transition-all"
                >
                  {isAr ? 'تأكيد الطلب الآن' : 'Confirm Order'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
