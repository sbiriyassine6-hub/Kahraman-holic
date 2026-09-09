import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { language } = useStore();
  const isAr = language === 'ar';

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Also provide direct WhatsApp handoff
  };

  return (
    <div className="w-full bg-[#0B0B0C] py-16 sm:py-24 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-2">
            {isAr ? 'يسعدنا تواصلكم دائماً' : 'At Your Service'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {isAr ? 'تواصل مع كهرمان هوليك' : 'Contact Kahraman Holic'}
          </h1>
          <p className="text-sm text-[#A69582]">
            {isAr
              ? 'فريق خدمة العملاء واستشارات الكهرمان في دولة قطر جاهز للإجابة على استفساراتكم وتلبية طلباتكم الخاصة'
              : 'Our amber concierge in Qatar is available to answer inquiries and curate bespoke commissions'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Information Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* WhatsApp Card (Primary) */}
            <a
              href="https://wa.me/97433879834?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%83%D9%87%D8%B1%D9%85%D8%A7%D9%86%20%D9%87%D9%88%D9%84%D9%8A%D9%83"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 rounded-xl bg-[#14100D] border border-[#263D2E] hover:border-emerald-500/60 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#128C7E]/20 text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-[#8C7A65] block mb-1">
                    {isAr ? 'الطلب والاستفسار الفوري (WhatsApp)' : 'Instant Orders & WhatsApp'}
                  </span>
                  <div className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors dir-ltr text-right">
                    +974 3387 9834
                  </div>
                  <span className="text-[11px] text-emerald-400 mt-1 inline-block">
                    {isAr ? 'متاح للرد السريع على مدار اليوم' : 'Available for immediate reply'}
                  </span>
                </div>
              </div>
            </a>

            {/* Email Card */}
            <a
              href="mailto:sbiriyassine6@gmail.com"
              className="block p-5 rounded-xl bg-[#14100D] border border-[#2B2016] hover:border-[#D4AF37] transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#241A10] text-[#D4AF37] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-[#8C7A65] block mb-1">
                    {isAr ? 'البريد الإلكتروني الرسمي' : 'Official Email'}
                  </span>
                  <div className="text-base font-bold text-white group-hover:text-[#F3E5AB] transition-colors">
                    sbiriyassine6@gmail.com
                  </div>
                  <span className="text-[11px] text-[#A69582] mt-1 inline-block">
                    {isAr ? 'للطلبات والاستفسارات التجارية والشراكات' : 'For orders & corporate gifts'}
                  </span>
                </div>
              </div>
            </a>

            {/* Qatar Location Card */}
            <div className="p-5 rounded-xl bg-[#14100D] border border-[#2B2016]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#241A10] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-[#8C7A65] block mb-1">
                    {isAr ? 'المقر الرئيسي وخدمة التوصيل' : 'Location & VIP Delivery'}
                  </span>
                  <div className="text-base font-bold text-white">
                    {isAr ? 'الدوحة، دولة قطر' : 'Doha, State of Qatar'}
                  </div>
                  <p className="text-[11px] text-[#A69582] mt-1 leading-relaxed">
                    {isAr
                      ? 'خدمة التوصيل الخاص (VIP Delivery) مع إمكانية معاينة القطع عند الاستلام'
                      : 'White-glove private VIP delivery with preview option upon arrival'}
                  </p>
                </div>
              </div>
            </div>

            {/* Timings */}
            <div className="p-5 rounded-xl bg-[#14100D] border border-[#2B2016]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#241A10] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-[#8C7A65] block mb-1">
                    {isAr ? 'ساعات العمل والخدمة' : 'Service Hours'}
                  </span>
                  <div className="text-sm font-bold text-white">
                    {isAr ? 'السبت - الخميس: 10:00 صباحاً - 10:00 مساءً' : 'Sat - Thu: 10:00 AM - 10:00 PM'}
                  </div>
                  <span className="text-[11px] text-[#A69582] block mt-0.5">
                    {isAr ? 'الجمعة: 4:00 عصراً - 11:00 مساءً' : 'Friday: 4:00 PM - 11:00 PM'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-[#14100D] border border-[#2B2016] rounded-xl p-6 sm:p-8">
            {formSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {isAr ? 'تم استلام رسالتك بنجاح' : 'Message Received Successfully'}
                </h3>
                <p className="text-xs sm:text-sm text-[#A69582] mb-6 max-w-sm mx-auto">
                  {isAr
                    ? 'شكراً لتواصلك مع كهرمان هوليك، سيقوم خبيرنا بالتواصل معك في أقرب وقت.'
                    : 'Thank you for reaching out to Kahraman Holic. Our amber concierge will be in touch shortly.'}
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', phone: '', email: '', subject: 'inquiry', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#241A10] text-[#D4AF37] border border-[#3A2B1D] text-xs font-semibold"
                >
                  {isAr ? 'إرسال استفسار آخر' : 'Send another inquiry'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-2">
                  {isAr ? 'أرسل لنا استفسارك المباشر' : 'Send an Direct Inquiry'}
                </h3>
                <p className="text-xs text-[#A69582] mb-4">
                  {isAr
                    ? 'املأ النموذج وسنتواصل معك هاتفياً أو عبر البريد الإلكتروني'
                    : 'Fill in the form and our team will contact you via phone or email'}
                </p>

                <div>
                  <label className="block text-xs font-semibold text-[#D4C3AC] mb-1">
                    {isAr ? 'الاسم الكريم *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isAr ? 'أدخل اسمك الكامل' : 'Enter your name'}
                    className="w-full bg-[#1A140F] border border-[#2B2016] focus:border-[#D4AF37] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#6B5A47] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#D4C3AC] mb-1">
                      {isAr ? 'رقم الهاتف / الجوال *' : 'Phone Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+974 3387 9834"
                      className="w-full bg-[#1A140F] border border-[#2B2016] focus:border-[#D4AF37] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#6B5A47] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D4C3AC] mb-1">
                      {isAr ? 'البريد الإلكتروني' : 'Email'}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sbiriyassine6@gmail.com"
                      className="w-full bg-[#1A140F] border border-[#2B2016] focus:border-[#D4AF37] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#6B5A47] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D4C3AC] mb-1">
                    {isAr ? 'نوع الطلب أو الاستفسار' : 'Subject'}
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#1A140F] border border-[#2B2016] focus:border-[#D4AF37] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                  >
                    <option value="inquiry" className="bg-[#14100D]">{isAr ? 'استفسار عن قطعة كهرمان' : 'Amber Piece Inquiry'}</option>
                    <option value="custom" className="bg-[#14100D]">{isAr ? 'طلب مسباح خاص / تفصيل مخصص' : 'Bespoke Misbaha Commission'}</option>
                    <option value="wholesale" className="bg-[#14100D]">{isAr ? 'هدايا الشركات والمناسبات' : 'Corporate / VIP Gifting'}</option>
                    <option value="authenticity" className="bg-[#14100D]">{isAr ? 'فحص وضمان الأصالة' : 'Authenticity & Certification'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D4C3AC] mb-1">
                    {isAr ? 'الرسالة أو تفاصيل الطلب *' : 'Message Details *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={isAr ? 'اكتب استفسارك بالتفصيل...' : 'Tell us how we can assist you...'}
                    className="w-full bg-[#1A140F] border border-[#2B2016] focus:border-[#D4AF37] rounded-lg p-3 text-sm text-white placeholder-[#6B5A47] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B0B0C] font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{isAr ? 'إرسال الاستفسار الآن' : 'Submit Inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
