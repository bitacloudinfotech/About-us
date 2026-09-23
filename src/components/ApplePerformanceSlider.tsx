import React, { useState } from 'react';
import { Zap, Clock } from 'lucide-react';

export const ApplePerformanceSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(75);

  return (
    <section id="performance" className="relative py-24 px-6 max-w-6xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 inline-flex items-center gap-2">
          <Zap className="w-4 h-4" />
          ETL Pipeline Optimization
        </span>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          75% Runtime Reduction
        </h2>
        <p className="text-[#86868b] text-base sm:text-lg font-medium">
          Drag the interactive performance slider to visualize the pipeline runtime transformation from legacy ETL to PySpark Delta Lake optimization.
        </p>
      </div>

      {/* Interactive Before/After Speed Slider Card */}
      <div className="relative rounded-3xl apple-glass p-8 md:p-12 border border-white/10 overflow-hidden space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="text-3xl font-bold text-white tracking-tight">
              75% Optimization Gain
            </div>
            <div className="text-xs text-purple-400 font-semibold uppercase tracking-wider mt-1">
              8.5 Hours → 1.5 Hours Execution Time
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-xs font-medium text-[#86868b]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span>Legacy Pipeline (8.5 hrs)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-400" />
              <span>Optimized PySpark (1.5 hrs)</span>
            </div>
          </div>
        </div>

        {/* Range Slider Control */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-white/70 font-semibold">
            <span className="flex items-center gap-1.5"><Clock size={14} className="text-red-400" /> Legacy ETL State</span>
            <span className="flex items-center gap-1.5"><Zap size={14} className="text-purple-400" /> 75% Speedup Achieved</span>
          </div>

          <div className="relative w-full h-12 apple-glass rounded-2xl flex items-center px-4 border border-white/10">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Dynamic Visual comparison bars */}
        <div className="grid md:grid-cols-2 gap-6 pt-4">
          {/* Legacy Bar */}
          <div className="apple-glass rounded-2xl p-6 border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-white/80">
              <span>Legacy Unoptimized Pipeline</span>
              <span className="text-red-400">8.5 Hours</span>
            </div>
            <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-amber-500 transition-all duration-300 rounded-full"
                style={{ width: `${Math.max(100 - sliderPos, 15)}%` }}
              />
            </div>
            <p className="text-xs text-[#86868b]">Unpartitioned table scans, row-by-row iteration, high memory spilling.</p>
          </div>

          {/* Optimized Bar */}
          <div className="apple-glass rounded-2xl p-6 border border-purple-500/40 bg-purple-500/5 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-white/90">
              <span className="text-purple-300">Optimized PySpark & Delta Lake</span>
              <span className="text-purple-400">1.5 Hours</span>
            </div>
            <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-sky-400 transition-all duration-300 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.6)]"
                style={{ width: `${Math.min(100, Math.max(sliderPos, 20))}%` }}
              />
            </div>
            <p className="text-xs text-white/70">AQE enabled, partition pruning, Z-Order indexing, broadcast joins.</p>
          </div>
        </div>

        {/* DAX & Power BI Metric Card */}
        <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
          <div className="apple-glass rounded-2xl p-4 text-center space-y-1">
            <div className="text-3xl font-bold text-white">+40%</div>
            <div className="text-xs text-[#86868b]">Dashboard Load Speed</div>
          </div>
          <div className="apple-glass rounded-2xl p-4 text-center space-y-1">
            <div className="text-3xl font-bold text-white">500M+</div>
            <div className="text-xs text-[#86868b]">Pipeline Records</div>
          </div>
          <div className="apple-glass rounded-2xl p-4 text-center space-y-1">
            <div className="text-3xl font-bold text-white">99.9%</div>
            <div className="text-xs text-[#86868b]">SLA Pipeline Reliability</div>
          </div>
        </div>
      </div>
    </section>
  );
};
