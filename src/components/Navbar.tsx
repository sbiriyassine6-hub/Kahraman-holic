import React, { useState } from 'react';
import { Search, ShoppingBag, User, Menu, X, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    cartItemsCount,
    setIsCartOpen,
    activeView,
    setActiveView,
    searchQuery,
    setSearchQuery,
    isAdminAuthenticated,
    customLogoUrl,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isAr = language === 'ar';

  const navLinks = [
    { id: 'home', labelAr: 'الرئيسية', labelEn: 'Home' },
    { id: 'shop', labelAr: 'المتجر', labelEn: 'Boutique' },
    { id: 'collections', labelAr: 'مجموعاتنا', labelEn: 'Collections' },
    { id: 'about', labelAr: 'قصتنا', labelEn: 'Our Story' },
    { id: 'contact', labelAr: 'تواصل معنا', labelEn: 'Contact Us' },
  ];

  const handleNavClick = (viewId: string) => {
    if (viewId === 'collections') {
      setActiveView('shop');
    } else {
      setActiveView(viewId as 'home' | 'shop' | 'about' | 'contact');
    }
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B0B0C]/95 backdrop-blur-md border-b border-[#2A1F14] transition-all">
      {/* Top Gold Trim */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Left Actions: Search, User/Admin, Bag, Language Switcher (matches user screenshot) */}
          <div className="flex items-center gap-3 sm:gap-4 order-1">
            {/* Search Button */}
            <button
              id="search-toggle-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-[#E5C378]/80 hover:text-[#F3E5AB] hover:bg-[#1C150F] rounded-full transition-colors"
              title={isAr ? 'بحث عن قطعة كهرمان' : 'Search Amber Pieces'}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Admin / Account Quick Access */}
            <button
              id="admin-account-btn"
              onClick={() => {
                setActiveView('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-2 text-[#E5C378]/80 hover:text-[#F3E5AB] hover:bg-[#1C150F] rounded-full transition-colors relative"
              title={isAr ? 'لوحة تحكم المتجر (الإدارة)' : 'Store Management Admin'}
              aria-label="Admin"
            >
              <User className="w-5 h-5" />
              {isAdminAuthenticated && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#0B0B0C]" />
              )}
            </button>

            {/* Shopping Bag with Counter */}
            <button
              id="cart-toggle-btn"
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-[#E5C378]/80 hover:text-[#F3E5AB] hover:bg-[#1C150F] rounded-full transition-colors relative"
              title={isAr ? 'حقيبة المقتنيات' : 'Shopping Bag'}
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-[#0B0B0C] text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Language Switcher "AR | EN" */}
            <div className="hidden sm:flex items-center text-xs tracking-wider font-semibold border-l border-r border-[#2A1F14] px-3 py-1">
              <button
                id="lang-ar-btn"
                onClick={() => setLanguage('ar')}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  isAr ? 'text-[#F3E5AB] font-bold' : 'text-[#8C7A65] hover:text-[#E5C378]'
                }`}
              >
                AR
              </button>
              <span className="text-[#4A3B2A] mx-0.5">|</span>
              <button
                id="lang-en-btn"
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  !isAr ? 'text-[#F3E5AB] font-bold' : 'text-[#8C7A65] hover:text-[#E5C378]'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Center: Brand Logo */}
          <div className="order-2 cursor-pointer flex-shrink-0" onClick={() => handleNavClick('home')}>
            <Logo size="md" customLogoUrl={customLogoUrl} />
          </div>

          {/* Right: Desktop Navigation Links (matches user screenshot with active gold underline) */}
          <nav className="hidden lg:flex items-center gap-7 order-3">
            {navLinks.map((link) => {
              const isActive =
                activeView === link.id || (link.id === 'collections' && activeView === 'shop');
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-2 text-sm tracking-wide transition-all font-medium ${
                    isActive
                      ? 'text-[#F5E6B3] font-semibold'
                      : 'text-[#C5B39A] hover:text-[#F3E5AB]'
                  }`}
                >
                  {isAr ? link.labelAr : link.labelEn}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Trigger for iPhone */}
          <div className="flex lg:hidden items-center gap-2 order-3">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#E5C378] hover:bg-[#1C150F] rounded-lg"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Expandable Search Input Bar */}
        {isSearchOpen && (
          <div className="py-3 px-2 border-t border-[#2A1F14] animate-fadeIn">
            <div className="relative max-w-xl mx-auto">
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isAr
                    ? 'ابحث بالاسم، النوع، الكهرمان البولندي، المسابيح، الخواتم...'
                    : 'Search by name, type, Polish amber, misbaha, rings...'
                }
                className="w-full bg-[#15110E] border border-[#3A2E20] focus:border-[#D4AF37] rounded-full px-5 py-2.5 text-sm text-[#F3E5AB] placeholder-[#73604B] focus:outline-none transition-all shadow-inner"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#9B8874] hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu (iPhone Optimized) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[82px] bg-[#0E0C0A]/98 backdrop-blur-xl border-b border-[#3A2A1A] p-6 shadow-2xl z-50">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const isActive =
                activeView === link.id || (link.id === 'collections' && activeView === 'shop');
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-right py-3 px-4 rounded-lg text-base font-medium flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-[#241A10] text-[#D4AF37] border-r-2 border-[#D4AF37]'
                      : 'text-[#D8C7B0] hover:bg-[#17130E]'
                  }`}
                >
                  <span>{isAr ? link.labelAr : link.labelEn}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
                </button>
              );
            })}

            {/* Language Switcher Mobile */}
            <div className="pt-4 border-t border-[#2A1F14] flex items-center justify-between">
              <span className="text-xs text-[#8C7A65]">
                {isAr ? 'اللغة / Language' : 'Language / اللغة'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLanguage('ar')}
                  className={`px-3 py-1.5 text-xs rounded font-bold ${
                    isAr ? 'bg-[#D4AF37] text-[#0B0B0C]' : 'bg-[#1C150F] text-[#C5B39A]'
                  }`}
                >
                  العربية
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1.5 text-xs rounded font-bold ${
                    !isAr ? 'bg-[#D4AF37] text-[#0B0B0C]' : 'bg-[#1C150F] text-[#C5B39A]'
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            {/* Quick Admin Access Mobile */}
            <button
              onClick={() => {
                setActiveView('admin');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-3 bg-[#1C140D] hover:bg-[#2A1D13] border border-[#3A2B1D] rounded-lg text-xs text-[#E5C378]"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isAr ? 'إدارة المتجر (Admin)' : 'Admin Dashboard'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
