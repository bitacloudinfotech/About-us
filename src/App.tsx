import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsBanner from './components/StatsBanner';
import CertifiedTeamSection from './components/CertifiedTeamSection';
import PlatformGrid from './components/PlatformGrid';
import ProcessSection from './components/ProcessSection';
import PricingSection from './components/PricingSection';
import WhyBITASection from './components/WhyBITASection';
import IndustriesSection from './components/IndustriesSection';
import TestimonialsPartners from './components/TestimonialsPartners';
import AboutSection from './components/AboutSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import StickyContact from './components/StickyContact';
import PrivacyPolicy from './components/PrivacyPolicy';

// Global scroll reveal observer
function useGlobalScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
    );

    const observeElements = () => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el));
    };

    observeElements();

    const mutationObserver = new MutationObserver(() => observeElements());
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => { observer.disconnect(); mutationObserver.disconnect(); };
  }, []);
}

export default function App() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  useGlobalScrollReveal();

  const handleNavClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a[href="#privacy-policy"]');
    if (anchor) { e.preventDefault(); setShowPrivacy(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    const backAnchor = target.closest('a[href="#"]');
    if (backAnchor && showPrivacy) { setShowPrivacy(false); }
  };

  return (
    <div
      style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', overflowX: 'hidden' }}
      onClick={handleNavClick}
    >
      <Navbar />

      {showPrivacy ? (
        <main id="main-content" tabIndex={-1}>
          <PrivacyPolicy />
        </main>
      ) : (
        <main id="main-content" tabIndex={-1}>
          {/* 1. Hero — Mainframe full-screen interactive landing */}
          <HeroSection />

          <div className="relative z-[2]" style={{ background: 'var(--bg-primary)' }}>
            {/* 2. Stats — 4 animated count-up metrics */}
            <StatsBanner />

            {/* 3. Certifications — 6 badge cards */}
            <CertifiedTeamSection />

            {/* 4. Services — 6 capability cards with modal */}
            <PlatformGrid />

            {/* 5. Process — 5-phase delivery */}
            <ProcessSection />

            {/* 6. Pricing — 3 engagement tiers */}
            <PricingSection />

            {/* 7. Why BITA — differentiators + switch reasons */}
            <WhyBITASection />

            {/* 8. Industries — 6 verticals */}
            <IndustriesSection />

            {/* 9. Testimonials + Tech Marquee */}
            <TestimonialsPartners />

            {/* 10. About + Careers */}
            <AboutSection />

            {/* 11. FAQ */}
            <FAQSection />

            {/* 12. Contact */}
            <ContactSection />
          </div>
        </main>
      )}

      <Footer />
      <CookieConsent />
      <StickyContact />
      <Toaster
        position="top-right"
        richColors
        closeButton
        theme="system"
        toastOptions={{
          style: { fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', borderRadius: '12px' }
        }}
      />
    </div>
  );
}
