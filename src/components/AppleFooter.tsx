import React from 'react';
import { ArrowUp, Globe, Mail, Code, ExternalLink } from 'lucide-react';

interface AppleFooterProps {
  onBackToTop: () => void;
}

export const AppleFooter: React.FC<AppleFooterProps> = ({ onBackToTop }) => {
  return (
    <footer className="relative bg-[#161617] text-[#86868b] text-xs pt-16 pb-24 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        {/* Footnotes & Disclaimers */}
        <div className="space-y-3 border-b border-white/10 pb-8 leading-relaxed text-[11px]">
          <p>
            1. Pipeline optimization metrics (~75% runtime reduction from 8–9 hours to 1–2 hours) achieved using Azure Databricks Adaptive Query Execution (AQE), Delta Lake Z-Ordering, and PySpark partition pruning.
          </p>
          <p>
            2. Volume metrics (500M+ records) based on production ETL batch and streaming pipelines delivered across FIFA Stagwell, GEO McSquared.ai, and enterprise analytics workloads.
          </p>
          <p>
            3. All third-party logos (Azure, Databricks, OpenAI, Claude, Power BI, PySpark) are property of their respective owners and used solely for technical skill representation.
          </p>
        </div>

        {/* Multi-Column Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h4 className="font-semibold text-white tracking-wide">Technical Expertise</h4>
            <ul className="space-y-2">
              <li><a href="#architecture" className="hover:text-white transition-colors">Medallion Architecture</a></li>
              <li><a href="#architecture" className="hover:text-white transition-colors">Agentic RAG Workflows</a></li>
              <li><a href="#performance" className="hover:text-white transition-colors">PySpark ETL Optimization</a></li>
              <li><a href="#specs" className="hover:text-white transition-colors">Power BI & DAX Modeling</a></li>
              <li><a href="#architecture" className="hover:text-white transition-colors">Unity Catalog Governance</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-white tracking-wide">Enterprise Roles</h4>
            <ul className="space-y-2">
              <li><a href="#experience" className="hover:text-white transition-colors">Product Owner — CIM Group</a></li>
              <li><a href="#experience" className="hover:text-white transition-colors">Sr. AI Data Engineer — GEO</a></li>
              <li><a href="#experience" className="hover:text-white transition-colors">Sr. Data Engineer — FIFA</a></li>
              <li><a href="#experience" className="hover:text-white transition-colors">Sr. Data Analyst — MARS</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-white tracking-wide">Connect & Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:tushar_kashyap@outlook.com" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Mail size={12} />
                  <span>tushar_kashyap@outlook.com</span>
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/tusharkz" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ExternalLink size={12} />
                  <span>LinkedIn / tusharkz</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/Tushar-Kashyap-bit" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Code size={12} />
                  <span>GitHub Repository</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-white tracking-wide">About</h4>
            <p className="text-[11px] leading-relaxed">
              Designed with sleek dark aesthetics, precision glassmorphic UI, and SF Pro typography for Tushar Kashyap.
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            Copyright © 2026 Tushar Kashyap. All rights reserved. Engineered with React, TypeScript & Tailwind CSS.
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Globe size={13} />
              <span>India / English (Global)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Bottom Sticky Action Bar */}
      <div className="fixed bottom-6 inset-x-0 z-40 flex justify-center px-6 pointer-events-none">
        <div className="apple-glass rounded-full px-6 py-3 border border-white/15 shadow-2xl flex items-center gap-6 pointer-events-auto backdrop-blur-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span className="text-xs font-semibold text-white">Tushar Kashyap — AI Data Engineer</span>
          </div>

          <div className="h-4 w-px bg-white/20" />

          <div className="flex items-center gap-3">
            <a
              href="mailto:tushar_kashyap@outlook.com"
              className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-white/90 transition-all hover:scale-105 active:scale-95"
            >
              Get In Touch
            </a>

            <button
              onClick={onBackToTop}
              aria-label="Back to Top"
              className="w-8 h-8 rounded-full apple-glass flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-all"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
