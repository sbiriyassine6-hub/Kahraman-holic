import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryShowcase } from './components/CategoryShowcase';
import { StorySection } from './components/StorySection';
import { ProductCatalog } from './components/ProductCatalog';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { AdminPanel } from './components/AdminPanel';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  const { activeView } = useStore();

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-[#F3E5AB] flex flex-col justify-between selection:bg-[#D4AF37]/30 selection:text-[#F3E5AB]">
      {/* Sticky Luxury Navbar */}
      <Navbar />

      {/* Main View Switcher */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <Hero />
            <CategoryShowcase />
            <ProductCatalog />
            <StorySection />
          </>
        )}

        {activeView === 'shop' && (
          <div className="pt-4">
            <CategoryShowcase />
            <ProductCatalog />
          </div>
        )}

        {activeView === 'about' && <AboutPage />}

        {activeView === 'contact' && <ContactPage />}

        {activeView === 'admin' && <AdminPanel />}
      </main>

      {/* Modals and Overlays */}
      <CartDrawer />
      <CheckoutModal />
      <ProductDetailModal />
      <WhatsAppFloating />

      {/* Luxury Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
