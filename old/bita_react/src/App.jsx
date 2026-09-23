import React, { useState, useEffect } from 'react';
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
import PrivacyPolicy from './components/PrivacyPolicy';
import StickyContact from './components/StickyContact';

// Optimized Global Scroll Reveal observer
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

    // Use MutationObserver instead of polling interval
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}

export default function App() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  useGlobalScrollReveal();

  const handleNavClick = (e) => {
    const anchor = e.target.closest('a[href="#privacy-policy"]');
    if (anchor) {
      e.preventDefault();
      setShowPrivacy(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const backAnchor = e.target.closest('a[href="#"]');
    if (backAnchor && showPrivacy) {
      setShowPrivacy(false);
    }
  };

  return (
    <div
      style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', overflowX: 'hidden' }}
      onClick={handleNavClick}
    >
      <Navbar />

      {showPrivacy ? (
        <main id="main-content" tabIndex="-1">
          <PrivacyPolicy />
        </main>
      ) : (
        <main id="main-content" tabIndex="-1">

          {/* 1. Hero — 2-column enterprise layout with visual + clear value prop */}
          <HeroSection />

          {/* 2. Stats — Verified client performance metrics */}
          <StatsBanner />

          {/* 3. Certifications — 100% certified team with live verification links */}
          <CertifiedTeamSection />

          {/* 4. Platform / Services — 9 capabilities with Business Outcome callouts */}
          <PlatformGrid />

          {/* 5. Process — 5-phase delivery methodology with mobile scroll */}
          <ProcessSection />

          {/* 7. Pricing — Transparent engagement models */}
          <PricingSection />

          {/* 8. Why BITA — Differentiators + authentic client switching reasons */}
          <WhyBITASection />

          {/* 9. Industries — 6 verticals with use-case examples */}
          <IndustriesSection />

          {/* 10. Testimonials + Partners */}
          <TestimonialsPartners />

          {/* 11. About + Careers */}
          <AboutSection />

          {/* 12. FAQ — 8 enterprise buyer questions */}
          <FAQSection />

          {/* 13. Contact — Corporate form intake */}
          <ContactSection />

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
          style: {
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.85rem',
            borderRadius: '12px',
          }
        }}
      />
    </div>
  );
}
