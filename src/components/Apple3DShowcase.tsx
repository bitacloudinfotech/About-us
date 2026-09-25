import React from 'react';
import { Sparkles, ShieldCheck, CheckCircle2, Lock, ArrowUpRight } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

interface Apple3DShowcaseProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

export const Apple3DShowcase: React.FC<Apple3DShowcaseProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  const finishes = [
    { id: 'black', label: 'Dark Mode', color: '#00e5ff' },
    { id: 'titanium', label: 'Silver Mode', color: '#e5e7eb' },
    { id: 'blue', label: 'Ocean Mode', color: '#3b82f6' },
    { id: 'gold', label: 'Amber Mode', color: '#f59e0b' },
  ];

  return (
    <section className="relative py-20 px-6 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 inline-flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Corporate Emblem &amp; Enterprise Identity
        </span>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          BITA CLOUD INFO TECH
        </h2>
        <p className="text-[#86868b] text-base sm:text-lg font-medium">
          Official corporate emblem and verified enterprise brand. Certified Azure Data &amp; AI Engineering
          firm delivering high-throughput lakehouses and autonomous AI agents.
        </p>
      </div>

      {/* Corporate Emblem Showcase Container */}
      <div className="relative rounded-3xl apple-glass p-8 md:p-14 border border-white/10 overflow-hidden min-h-[480px] flex flex-col items-center justify-between">
        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-60"
          style={{
            background:
              currentTheme === 'gold'
                ? 'radial-gradient(circle at center, rgba(245, 158, 11, 0.18) 0%, transparent 70%)'
                : currentTheme === 'blue'
                ? 'radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, transparent 70%)'
                : currentTheme === 'titanium'
                ? 'radial-gradient(circle at center, rgba(229, 231, 235, 0.15) 0%, transparent 70%)'
                : 'radial-gradient(circle at center, rgba(0, 229, 255, 0.18) 0%, transparent 70%)',
          }}
        />

        {/* Top Status Tag */}
        <div className="w-full flex items-center justify-between pb-6 border-b border-white/5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full apple-glass text-[11px] font-semibold text-white/80 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Verified Corporate Identity</span>
          </div>

          <span className="text-[11px] font-mono text-[#86868b] uppercase tracking-widest hidden sm:inline-block">
            Registered Enterprise Mark
          </span>
        </div>

        {/* Central Embedded Emblem Presentation */}
        <div className="relative z-10 my-8 flex flex-col items-center justify-center text-center space-y-6 max-w-xl">
          {/* Emblem Hologram Stage */}
          <div className="relative group">
            {/* Pulsing Backlight Halo */}
            <div
              className="absolute -inset-4 rounded-full blur-2xl transition-all duration-500 opacity-50 group-hover:opacity-100"
              style={{
                backgroundColor:
                  currentTheme === 'gold'
                    ? '#f59e0b'
                    : currentTheme === 'blue'
                    ? '#3b82f6'
                    : currentTheme === 'titanium'
                    ? '#e5e7eb'
                    : '#00e5ff',
              }}
            />

            {/* Emblem Glass Frame */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-3xl apple-glass p-6 flex items-center justify-center border border-white/20 shadow-2xl transition-transform duration-500 group-hover:scale-105 bg-black/40 backdrop-blur-2xl">
              <img
                src={getAssetUrl('Bitacloudinfotechtransparent.png')}
                alt="BITA CLOUD INFO TECH Corporate Emblem"
                className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
              />
            </div>
          </div>

          {/* Brand Details */}
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              BITA CLOUD INFO TECH
            </h3>
            <p className="text-xs sm:text-sm text-cyan-400 font-semibold uppercase tracking-widest">
              Data &amp; AI Engineering Firm
            </p>
            <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed max-w-md pt-1">
              Architecting production Azure lakehouses, Microsoft Fabric pipelines, dbt data models,
              and autonomous AI systems for global enterprise organizations.
            </p>
          </div>

          {/* Credentials Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { icon: ShieldCheck, text: '100% Certified Architects' },
              { icon: CheckCircle2, text: 'Microsoft Fabric & Azure' },
              { icon: Lock, text: 'SOC 2 · HIPAA Aligned' },
            ].map((badge, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium apple-glass text-white/80 border border-white/10"
              >
                <badge.icon size={13} className="text-cyan-400" />
                <span>{badge.text}</span>
              </span>
            ))}
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-white transition-colors pt-2 cursor-pointer"
          >
            <span>Initiate an engagement with our engineering team</span>
            <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Bottom Color Switcher Bar */}
        <div className="z-10 flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-white/10 w-full justify-between">
          <div className="text-xs text-[#86868b] font-medium flex items-center gap-2">
            <span>Theme Accent Finish:</span>
            <span className="text-white font-semibold capitalize">
              {finishes.find((f) => f.id === currentTheme)?.label}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {finishes.map((finish) => (
              <button
                key={finish.id}
                onClick={() => onThemeChange(finish.id)}
                className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                  currentTheme === finish.id
                    ? 'border-white scale-110 shadow-lg'
                    : 'border-white/20 hover:border-white/60'
                }`}
                style={{ backgroundColor: finish.color }}
                title={finish.label}
              >
                {currentTheme === finish.id && (
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
