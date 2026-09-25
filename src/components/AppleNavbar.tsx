import React, { useState } from 'react';
import { Sparkles, ChevronDown, Mail, Phone, Menu, X, ArrowUpRight } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

interface AppleNavbarProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
  onNavigate: (sectionId: string) => void;
}

export const AppleNavbar: React.FC<AppleNavbarProps> = ({
  currentTheme,
  onThemeChange,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const themes = [
    { id: 'black', label: 'Dark Mode', color: '#00e5ff' },
    { id: 'titanium', label: 'Silver Mode', color: '#e5e7eb' },
    { id: 'blue', label: 'Ocean Mode', color: '#3b82f6' },
    { id: 'gold', label: 'Amber Mode', color: '#f59e0b' },
  ];

  const handleNav = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-50 w-full apple-nav-blur transition-all duration-300">
      {/* Upper Global Bar */}
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-xs text-[#86868b] border-b border-white/5">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-white/90 tracking-wide flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            BITA CLOUD INFO TECH — Enterprise Data &amp; AI Engineering Firm
          </span>
          <span className="hidden lg:inline-block text-white/30">|</span>
          <span className="hidden lg:inline-block text-white/60">
            100% Certified Azure, Databricks &amp; Fabric Architects
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="mailto:contact@bitacloudinfo.tech"
            className="hover:text-white transition-colors hidden sm:flex items-center gap-1"
          >
            <Mail className="w-3 h-3 text-sky-400" />
            <span>contact@bitacloudinfo.tech</span>
          </a>
          <span className="hidden sm:inline-block text-white/30">|</span>
          <a
            href="https://wa.me/918982296014"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <Phone className="w-3 h-3 text-emerald-400" />
            <span>+91 89822 96014</span>
          </a>
        </div>
      </div>

      {/* Sub-Nav Bar */}
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => handleNav('top')}
          className="text-lg md:text-xl font-bold text-white tracking-tight hover:opacity-90 transition-opacity flex items-center gap-3 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center p-0.5 apple-glass border border-white/10">
            <img
              src={getAssetUrl('Bitacloudinfotechtransparent.png')}
              alt="BITA CLOUD"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="tracking-tight">BITA CLOUD</span>
            <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-semibold rounded-full bg-sky-500/10 text-sky-300 border border-sky-400/30 uppercase tracking-widest">
              Certified Azure Partner
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-[#86868b]">
          {[
            { id: 'overview', label: 'Highlights' },
            { id: 'architecture', label: 'Architecture' },
            { id: 'performance', label: 'Optimization' },
            { id: 'badges', label: 'Certifications' },
            { id: 'specs', label: 'Capabilities' },
            { id: 'experience', label: 'Milestones' },
            { id: 'contact', label: 'Contact' },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Actions & Theme Switcher */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Dropdown */}
          <div className="relative">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="px-3 py-1.5 rounded-full apple-glass text-xs font-medium text-white/90 flex items-center gap-2 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: themes.find((t) => t.id === currentTheme)?.color || '#00e5ff' }}
              />
              <span className="capitalize">{themes.find((t) => t.id === currentTheme)?.label}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {themeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-2xl apple-glass p-2 space-y-1 shadow-2xl z-50">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      onThemeChange(t.id);
                      setThemeDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2 transition-colors cursor-pointer ${
                      currentTheme === t.id
                        ? 'bg-white/15 text-white font-medium'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-white/20"
                      style={{ backgroundColor: t.color }}
                    />
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action CTA */}
          <button
            onClick={() => handleNav('contact')}
            className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center gap-1.5 cursor-pointer"
          >
            <span>Book Consultation</span>
            <ArrowUpRight size={13} />
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white/80 p-2 focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden apple-nav-blur border-b border-white/10 px-6 py-6 space-y-4">
          <nav className="flex flex-col gap-3.5 text-sm font-medium text-white/80">
            {[
              { id: 'overview', label: 'Highlights' },
              { id: 'architecture', label: 'Architecture & Engine' },
              { id: 'performance', label: 'Pipeline Optimization' },
              { id: 'badges', label: '100% Certified Badges' },
              { id: 'specs', label: 'Technical Specifications' },
              { id: 'experience', label: 'Client Milestones' },
              { id: 'contact', label: 'Contact Leadership' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="text-left py-1 text-white hover:text-sky-400 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <div className="text-xs text-white/50 uppercase tracking-wider">Select Theme Accent</div>
            <div className="flex gap-2.5">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onThemeChange(t.id)}
                  className={`w-8 h-8 rounded-full border cursor-pointer ${
                    currentTheme === t.id ? 'border-white scale-110' : 'border-white/20'
                  }`}
                  style={{ backgroundColor: t.color }}
                  title={t.label}
                />
              ))}
            </div>
            <button
              onClick={() => handleNav('contact')}
              className="mt-2 text-center py-2.5 rounded-full bg-white text-black text-sm font-semibold cursor-pointer"
            >
              Book Discovery Call
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
