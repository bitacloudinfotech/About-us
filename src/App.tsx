import React, { useState } from 'react';
import { AppleNavbar } from './components/AppleNavbar';
import { AppleHero } from './components/AppleHero';
import { AppleHighlights } from './components/AppleHighlights';
import { Apple3DShowcase } from './components/Apple3DShowcase';
import { AppleChipArchitecture } from './components/AppleChipArchitecture';
import { ApplePerformanceSlider } from './components/ApplePerformanceSlider';
import { AppleExperienceTimeline } from './components/AppleExperienceTimeline';
import { AppleBadgesGallery } from './components/AppleBadgesGallery';
import { AppleTechSpecs } from './components/AppleTechSpecs';
import { AppleFooter } from './components/AppleFooter';

export const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<string>('black');

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'auto' });
      }
    }
  };

  return (
    <div data-theme={currentTheme} className="min-h-screen bg-black text-[#f5f5f7] selection:bg-sky-500/30 selection:text-white relative">
      {/* Apple Blurred Sticky Navbar */}
      <AppleNavbar
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        onNavigate={handleNavigate}
      />

      {/* Main Content Layout */}
      <main>
        {/* Hero Section with Looping Background Video */}
        <AppleHero
          onExplore={() => handleNavigate('architecture')}
          onSpecs={() => handleNavigate('specs')}
        />

        {/* Core Highlights Bento Grid */}
        <AppleHighlights />

        {/* 3D Interactive Persona Showcase */}
        <Apple3DShowcase
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
        />

        {/* M-Series Silicon & Stack Architecture */}
        <AppleChipArchitecture />

        {/* Performance Speed Slider & Benchmarks */}
        <ApplePerformanceSlider />

        {/* Enterprise Experience Timeline */}
        <AppleExperienceTimeline />

        {/* Credentials & GitHub Heatmap Gallery */}
        <AppleBadgesGallery />

        {/* Technical Specifications & Engagement Matrix */}
        <AppleTechSpecs />
      </main>

      {/* Apple Footer & Sticky Contact Action Bar */}
      <AppleFooter onBackToTop={() => handleNavigate('top')} />
    </div>
  );
};

export default App;
