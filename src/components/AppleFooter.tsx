import React from 'react';
import { ArrowUp, Globe, Mail, Phone, ExternalLink, ShieldCheck } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

interface AppleFooterProps {
  onBackToTop: () => void;
  onOpenPrivacy?: () => void;
}

export const AppleFooter: React.FC<AppleFooterProps> = ({ onBackToTop, onOpenPrivacy }) => {
  return (
    <footer className="relative bg-[#0d0d0f] text-[#86868b] text-xs pt-20 pb-28 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Footnotes & Disclaimers */}
        <div className="space-y-3 border-b border-white/10 pb-8 leading-relaxed text-[11px]">
          <p>
            1. Pipeline optimization metrics (~75% runtime reduction from 8.5 hours to 1.5 hours) achieved using Azure Databricks Adaptive Query Execution (AQE), Delta Lake Z-Ordering, and PySpark partition pruning across verified enterprise workloads.
          </p>
          <p>
            2. Volume metrics (350M+ daily records) based on production batch and streaming data pipelines delivered across global logistics, financial transaction auditing, and healthcare lakehouses.
          </p>
          <p>
            3. All third-party trademarks (Microsoft, Azure, Microsoft Fabric, Power BI, Databricks, dbt, OpenAI) are property of their respective owners and used solely for technical capability representation.
          </p>
        </div>

        {/* Multi-Column Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h4 className="font-semibold text-white tracking-wide">Capabilities &amp; Stack</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Microsoft Fabric OneLake
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Azure Data Factory (ADF)
                </a>
              </li>
              <li>
                <a href="#performance" className="hover:text-white transition-colors">
                  Databricks &amp; PySpark
                </a>
              </li>
              <li>
                <a href="#specs" className="hover:text-white transition-colors">
                  Power BI &amp; Direct Lake
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-white transition-colors">
                  dbt Transformation Layer
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-white transition-colors">
                  Enterprise AI &amp; RAG Agents
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-white tracking-wide">Engagement &amp; Verticals</h4>
            <ul className="space-y-2">
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Fixed-Scope Sprint ($15k+)
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Monthly Dedicated Retainer
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Enterprise Transformation
                </a>
              </li>
              <li>
                <a href="#industries" className="hover:text-white transition-colors">
                  Healthcare &amp; Life Sciences
                </a>
              </li>
              <li>
                <a href="#industries" className="hover:text-white transition-colors">
                  Banking &amp; Financial Services
                </a>
              </li>
              <li>
                <a href="#industries" className="hover:text-white transition-colors">
                  Industrial &amp; Manufacturing
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-white tracking-wide">Connect &amp; Inquiries</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:contact@bitacloudinfo.tech"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Mail size={12} className="text-cyan-400" />
                  <span>contact@bitacloudinfo.tech</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/918982296014"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Phone size={12} className="text-emerald-400" />
                  <span>+91 89822 96014 (WhatsApp)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/bita-cloud-info-tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink size={12} className="text-blue-400" />
                  <span>LinkedIn Company Page</span>
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Privacy Policy &amp; Terms
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg overflow-hidden apple-glass p-0.5">
                <img
                  src={getAssetUrl('Bitacloudinfotechtransparent.png')}
                  alt="BITA CLOUD"
                  className="w-full h-full object-contain"
                />
              </div>
              <h4 className="font-semibold text-white tracking-wide">About BITA CLOUD</h4>
            </div>
            <p className="text-[11px] leading-relaxed">
              BITA CLOUD INFO TECH is an elite certified Azure Data &amp; AI engineering firm. We architect production lakehouses, Microsoft Fabric pipelines, and autonomous AI agents for high-growth tech enterprises and Fortune 500s.
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            Copyright © {new Date().getFullYear()} BITA CLOUD INFO TECH. All rights reserved. 100% Certified Engineers.
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Globe size={13} />
              <span>India · Global Remote Operations</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Bottom Sticky Action Bar */}
      <div className="fixed bottom-6 inset-x-0 z-40 flex justify-center px-6 pointer-events-none">
        <div className="apple-glass rounded-full px-6 py-3 border border-white/15 shadow-2xl flex items-center gap-6 pointer-events-auto backdrop-blur-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-semibold text-white">
              BITA CLOUD — Certified Azure &amp; AI Architects
            </span>
          </div>

          <div className="h-4 w-px bg-white/20 hidden sm:block" />

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/918982296014"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>Engage Team</span>
              <ShieldCheck size={13} />
            </a>

            <button
              onClick={onBackToTop}
              aria-label="Back to Top"
              className="w-8 h-8 rounded-full apple-glass flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-all cursor-pointer"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
