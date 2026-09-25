import React, { useState } from 'react';
import { Toaster } from 'sonner';
import { AppleNavbar } from './components/AppleNavbar';
import { AppleHero } from './components/AppleHero';
import { AppleHighlights } from './components/AppleHighlights';
import { Apple3DShowcase } from './components/Apple3DShowcase';
import { AppleChipArchitecture } from './components/AppleChipArchitecture';
import { ApplePerformanceSlider } from './components/ApplePerformanceSlider';
import { AppleBadgesGallery } from './components/AppleBadgesGallery';
import { AppleCapabilities } from './components/AppleCapabilities';
import { AppleExperienceTimeline } from './components/AppleExperienceTimeline';
import { AppleIndustries } from './components/AppleIndustries';
import { AppleProcess } from './components/AppleProcess';
import { AppleTechSpecs } from './components/AppleTechSpecs';
import { AppleFAQ } from './components/AppleFAQ';
import { AppleContact } from './components/AppleContact';
import { AppleFooter } from './components/AppleFooter';
import PrivacyPolicy from './components/PrivacyPolicy';

export const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<string>('black');
  const [showPrivacy, setShowPrivacy] = useState<boolean>(false);

  const handleNavigate = (sectionId: string) => {
    if (showPrivacy) {
      setShowPrivacy(false);
    }
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      data-theme={currentTheme}
      className="min-h-screen bg-black text-[#f5f5f7] selection:bg-cyan-500/30 selection:text-white relative"
    >
      {/* Apple Blurred Sticky Navbar */}
      <AppleNavbar
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        onNavigate={handleNavigate}
      />

      {showPrivacy ? (
        <main className="max-w-4xl mx-auto px-6 py-16">
          <button
            onClick={() => setShowPrivacy(false)}
            className="mb-8 px-4 py-2 rounded-full apple-glass text-xs font-semibold text-cyan-400 hover:text-white transition-colors cursor-pointer"
          >
            ← Back to Main Website
          </button>
          <PrivacyPolicy />
        </main>
      ) : (
        /* Main Content Layout */
        <main id="main-content">
          {/* 1. Hero Section with Looping Background Video */}
          <AppleHero
            onExplore={() => handleNavigate('architecture')}
            onSpecs={() => handleNavigate('specs')}
          />

          {/* 2. Core Highlights Bento Grid */}
          <AppleHighlights />

          {/* 3. 3D Interactive Data Mesh & Identity Showcase */}
          <Apple3DShowcase
            currentTheme={currentTheme}
            onThemeChange={setCurrentTheme}
          />

          {/* 4. Azure Data & AI Architecture Visualizer */}
          <AppleChipArchitecture />

          {/* 5. Performance Speed Slider & Benchmarks */}
          <ApplePerformanceSlider />

          {/* 6. 100% Certified Developer Teams Badges Gallery */}
          <AppleBadgesGallery />

          {/* 7. Enterprise Capabilities & Specification Dialogs */}
          <AppleCapabilities />

          {/* 8. Enterprise Milestones Timeline & Client Proof */}
          <AppleExperienceTimeline />

          {/* 9. Industry Verticals Matrix */}
          <AppleIndustries />

          {/* 10. 5-Phase Delivery Process */}
          <AppleProcess />

          {/* 11. Technical Specifications & Engagement Tiers */}
          <AppleTechSpecs />

          {/* 12. Enterprise FAQs */}
          <AppleFAQ />

          {/* 13. Corporate Contact & Project Brief Submission */}
          <AppleContact />
        </main>
      )}

      {/* Apple Footer & Sticky Floating Bottom Action Bar */}
      <AppleFooter
        onBackToTop={() => handleNavigate('top')}
        onOpenPrivacy={() => {
          setShowPrivacy(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Toaster for Sonner Notifications */}
      <Toaster
        position="top-right"
        richColors
        closeButton
        theme="dark"
        toastOptions={{
          style: {
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.85rem',
            borderRadius: '16px',
            background: 'rgba(18, 18, 20, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
          },
        }}
      />
    </div>
  );
};

export default App;
