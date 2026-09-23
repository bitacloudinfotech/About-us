import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar3D } from './Avatar3D';
import { Layers, Sparkles, Terminal } from 'lucide-react';

interface Apple3DShowcaseProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

export const Apple3DShowcase: React.FC<Apple3DShowcaseProps> = ({ currentTheme, onThemeChange }) => {
  const [viewMode, setViewMode] = useState<'3d' | 'ascii'>('3d');

  const finishes = [
    { id: 'black', label: 'Dark Mode', color: '#1d1d1f' },
    { id: 'titanium', label: 'Silver Mode', color: '#e5e7eb' },
    { id: 'blue', label: 'Ocean Mode', color: '#3b82f6' },
    { id: 'gold', label: 'Amber Mode', color: '#f59e0b' },
  ];

  return (
    <section className="relative py-20 px-6 max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-sky-400 inline-flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Interactive 3D Persona
        </span>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          Tushar Kashyap
        </h2>
        <p className="text-[#86868b] text-base sm:text-lg font-medium">
          Senior AI Data Engineer & Product Owner. Move your cursor to rotate the 3D model, or toggle the vector ASCII portrait.
        </p>
      </div>

      {/* 3D Stage Container */}
      <div className="relative rounded-3xl apple-glass p-8 md:p-12 border border-white/10 overflow-hidden min-h-[480px] flex flex-col items-center justify-center">
        {/* View Mode Toggle Buttons */}
        <div className="absolute top-6 left-6 z-20 flex items-center gap-2 apple-glass rounded-full p-1 border border-white/10">
          <button
            onClick={() => setViewMode('3d')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all ${
              viewMode === '3d' ? 'bg-white text-black shadow-lg' : 'text-white/70 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3D Avatar Mesh</span>
          </button>
          
          <button
            onClick={() => setViewMode('ascii')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all ${
              viewMode === 'ascii' ? 'bg-white text-black shadow-lg' : 'text-white/70 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Vector ASCII Portrait</span>
          </button>
        </div>

        {/* Display Canvas */}
        <div className="w-full flex items-center justify-center my-4 min-h-[340px]">
          {viewMode === '3d' ? (
            <Avatar3D />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="p-4 apple-glass rounded-3xl border border-white/15 max-w-md w-full shadow-2xl flex justify-center bg-black/60"
            >
              <img
                src="data/tushar-ascii.svg"
                alt="Tushar Kashyap ASCII Portrait"
                className="w-full max-w-[340px] h-auto object-contain filter drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]"
              />
            </motion.div>
          )}
        </div>

        {/* Color Switcher Bar */}
        <div className="z-20 flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-white/10 w-full justify-between">
          <div className="text-xs text-[#86868b] font-medium flex items-center gap-2">
            <span>Theme Accent:</span>
            <span className="text-white font-semibold capitalize">
              {finishes.find((f) => f.id === currentTheme)?.label}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {finishes.map((finish) => (
              <button
                key={finish.id}
                onClick={() => onThemeChange(finish.id)}
                className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                  currentTheme === finish.id ? 'border-white scale-110 shadow-lg' : 'border-white/20 hover:border-white/60'
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
