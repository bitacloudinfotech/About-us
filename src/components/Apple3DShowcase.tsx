import React, { useState } from 'react';
import { Avatar3D } from './Avatar3D';
import { Layers, Sparkles, ShieldCheck } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

interface Apple3DShowcaseProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

export const Apple3DShowcase: React.FC<Apple3DShowcaseProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  const [viewMode, setViewMode] = useState<'3d' | 'logo'>('3d');

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
          Interactive 3D Data Mesh &amp; Identity
        </span>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          BITA CLOUD INFO TECH
        </h2>
        <p className="text-[#86868b] text-base sm:text-lg font-medium">
          Certified Azure Data &amp; AI Engineering Firm. Move your cursor to rotate the 3D data
          mesh, or toggle the official corporate emblem.
        </p>
      </div>

      {/* 3D Stage Container */}
      <div className="relative rounded-3xl apple-glass p-8 md:p-12 border border-white/10 overflow-hidden min-h-[500px] flex flex-col items-center justify-center">
        {/* View Mode Toggle Buttons */}
        <div className="absolute top-6 left-6 z-20 flex items-center gap-2 apple-glass rounded-full p-1 border border-white/10">
          <button
            onClick={() => setViewMode('3d')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              viewMode === '3d'
                ? 'bg-white text-black shadow-lg'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3D Data Mesh</span>
          </button>

          <button
            onClick={() => setViewMode('logo')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              viewMode === 'logo'
                ? 'bg-white text-black shadow-lg'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Corporate Emblem</span>
          </button>
        </div>

        {/* Display Canvas */}
        <div className="w-full flex items-center justify-center my-4 min-h-[360px]">
          {viewMode === '3d' ? (
            <Avatar3D />
          ) : (
            <div className="p-8 apple-glass rounded-3xl border border-white/15 max-w-md w-full shadow-2xl flex flex-col items-center justify-center bg-black/60 space-y-6">
              <div className="w-32 h-32 rounded-2xl apple-glass p-3 flex items-center justify-center border border-white/20 shadow-[0_0_50px_rgba(0,229,255,0.3)]">
                <img
                  src={getAssetUrl('Bitacloudinfotechtransparent.png')}
                  alt="BITA CLOUD INFO TECH"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(0,229,255,0.5)]"
                />
              </div>
              <div className="text-center space-y-1">
                <h3 className="text-xl font-bold text-white tracking-tight">BITA CLOUD INFO TECH</h3>
                <p className="text-xs text-cyan-400 font-semibold uppercase tracking-widest">
                  Certified Azure Data &amp; AI Engineering
                </p>
                <p className="text-xs text-[#86868b] max-w-xs pt-2">
                  Empowering global enterprises with high-throughput cloud data lakehouses, Fabric OneLake, and autonomous AI agents.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Color Switcher Bar */}
        <div className="z-20 flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-white/10 w-full justify-between">
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
