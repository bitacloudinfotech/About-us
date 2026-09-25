import React, { useState } from 'react';
import { Zap, Clock, TrendingUp } from 'lucide-react';

export const ApplePerformanceSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(75);

  return (
    <section id="performance" className="relative py-24 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 inline-flex items-center gap-2">
          <Zap className="w-4 h-4" />
          ETL Pipeline &amp; Lakehouse Optimization
        </span>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          75% Runtime Reduction
        </h2>
        <p className="text-[#86868b] text-base sm:text-lg font-medium">
          Drag the interactive performance slider to visualize the pipeline runtime transformation
          from legacy unpartitioned ETL to PySpark Delta Lake &amp; Direct Lake optimization.
        </p>
      </div>

      {/* Interactive Before/After Speed Slider Card */}
      <div className="relative rounded-3xl apple-glass p-8 md:p-12 border border-white/10 overflow-hidden space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <span>75% Optimization Gain</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Verified Benchmark
              </span>
            </div>
            <div className="text-xs text-purple-400 font-semibold uppercase tracking-wider mt-1.5">
              8.5 Hours → 1.5 Hours Execution Time
            </div>
          </div>

          <div className="flex items-center gap-5 text-xs font-medium text-[#86868b]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span>Legacy Pipeline (8.5 hrs)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-400" />
              <span>BITA Optimized PySpark (1.5 hrs)</span>
            </div>
          </div>
        </div>

        {/* Range Slider Control */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-white/70 font-semibold">
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-red-400" /> Legacy ETL State
            </span>
            <span className="flex items-center gap-1.5">
              <Zap size={14} className="text-purple-400" /> 75% Speedup Achieved
            </span>
          </div>

          <div className="relative w-full h-12 apple-glass rounded-2xl flex items-center px-4 border border-white/10">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer"
              aria-label="Performance slider"
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
            <p className="text-xs text-[#86868b]">
              Unpartitioned table scans, row-by-row iteration, frequent memory spilling, and 24-hour reporting lag.
            </p>
          </div>

          {/* Optimized Bar */}
          <div className="apple-glass rounded-2xl p-6 border border-purple-500/40 bg-purple-500/5 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-white/90">
              <span className="text-purple-300">BITA Optimized PySpark &amp; Delta Lake</span>
              <span className="text-purple-400">1.5 Hours</span>
            </div>
            <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-300 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.6)]"
                style={{ width: `${Math.min(100, Math.max(sliderPos, 20))}%` }}
              />
            </div>
            <p className="text-xs text-white/80">
              Adaptive Query Execution (AQE), partition pruning, Z-Order indexing, broadcast joins, and sub-second Direct Lake queries.
            </p>
          </div>
        </div>

        {/* Real Metrics Row */}
        <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
          <div className="apple-glass rounded-2xl p-4 text-center space-y-1">
            <div className="text-3xl font-bold text-white flex items-center justify-center gap-1">
              <TrendingUp className="w-6 h-6 text-emerald-400 inline" />
              <span>+40%</span>
            </div>
            <div className="text-xs text-[#86868b]">Dashboard Load Speed</div>
          </div>
          <div className="apple-glass rounded-2xl p-4 text-center space-y-1">
            <div className="text-3xl font-bold text-white">350M+</div>
            <div className="text-xs text-[#86868b]">Daily Pipeline Records</div>
          </div>
          <div className="apple-glass rounded-2xl p-4 text-center space-y-1">
            <div className="text-3xl font-bold text-white">99.99%</div>
            <div className="text-xs text-[#86868b]">Pipeline Uptime SLA</div>
          </div>
        </div>
      </div>
    </section>
  );
};
