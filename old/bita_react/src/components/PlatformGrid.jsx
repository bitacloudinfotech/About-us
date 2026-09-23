import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { CheckCircle2, X, ArrowRight, ChevronRight, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

const techPlatforms = [
  {
    id: 'adf',
    title: 'Azure Data Factory',
    category: 'Pipeline Automation & ETL',
    filterCategory: 'Pipelines',
    icon: '/assets/tech/azure.svg',
    badge: 'ETL / ELT',
    shortDesc: 'Orchestrating enterprise-grade Azure Data Factory ETL/ELT pipelines for high-volume data integration at any scale.',
    specs: [
      'Self-hosted Integration Runtimes for hybrid cloud-on-prem data movement at zero latency.',
      'Dynamic Parameterized Pipelines with Copy, Data Flow, Lookup & ForEach activities.',
      'Automated trigger scheduling (tumbling window, event-based) with end-to-end telemetry monitoring.',
    ],
    accentColor: '#0284c7',
  },
  {
    id: 'fabric',
    title: 'Microsoft Fabric & OneLake',
    category: 'Lakehouse Architecture',
    filterCategory: 'Lakehouse',
    icon: '/assets/tech/fabric.svg',
    badge: 'Lakehouse',
    shortDesc: 'Unified SaaS OneLake lakehouse architecture with Direct Lake mode for zero-copy, instant analytical queries.',
    specs: [
      'OneLake single data copy shared across Fabric workloads — no data movement required.',
      'Direct Lake mode execution for sub-second Power BI queries on petabyte-scale datasets.',
      'Lakehouse Medallion architecture (Bronze → Silver → Gold) with automated delta refresh.',
    ],
    accentColor: '#7c3aed',
  },
  {
    id: 'powerbi',
    title: 'Power BI Analytics',
    category: 'Business Intelligence',
    filterCategory: 'Analytics',
    icon: '/assets/tech/powerbi.svg',
    badge: 'BI Visuals',
    shortDesc: 'Transforming raw data into executive-ready real-time Power BI dashboards with advanced DAX and RLS security.',
    specs: [
      'Advanced DAX measures, calculated columns, and dynamic Row-Level Security (RLS) for multi-tenant reporting.',
      'DirectQuery & Composite Model optimization for high-volume real-time data sources.',
      'Seamless integration with Fabric OneLake datasets and Azure Analysis Services.',
    ],
    accentColor: '#f59e0b',
  },
  {
    id: 'databricks',
    title: 'Databricks & PySpark',
    category: 'Big Data Processing',
    filterCategory: 'Lakehouse',
    icon: '/assets/tech/databricks.svg',
    badge: 'Data & AI',
    shortDesc: 'Scalable PySpark distributed processing, Delta Lake ACID storage, and ML model deployment on Databricks clusters.',
    specs: [
      'Delta Lake ACID transactions with time-travel query auditing for regulatory compliance.',
      'PySpark distributed processing for multi-terabyte datasets with cluster auto-scaling.',
      'MLflow experiment tracking, model registry, and automated A/B model evaluation.',
    ],
    accentColor: '#ef4444',
  },
  {
    id: 'dbt',
    title: 'dbt Transformation Layer',
    category: 'Modern Data Stack',
    filterCategory: 'Pipelines',
    icon: '/assets/tech/dbt.png',
    badge: 'Transform',
    shortDesc: 'Modular, version-controlled SQL data transformations with automated testing, lineage graphs, and documentation.',
    specs: [
      'Modular SQL model building with Jinja templating, macros, and cross-database ref() resolution.',
      'Automated schema validation, uniqueness tests, and referential integrity checks on every run.',
      'Auto-generated lineage graphs and data documentation published to team knowledge portals.',
    ],
    accentColor: '#ff5538',
  },
  {
    id: 'ai',
    title: 'Enterprise AI Agents',
    category: 'Generative AI & LLM',
    filterCategory: 'AI / LLM',
    icon: '/assets/tech/openai.svg',
    badge: 'AI / LLM',
    shortDesc: 'Building production LLM agents, RAG pipelines, and predictive ML models using Azure OpenAI and Databricks.',
    specs: [
      'Azure OpenAI GPT-4o integration for enterprise knowledge bases and document intelligence.',
      'RAG (Retrieval-Augmented Generation) pipelines with vector search on structured + unstructured data.',
      'PySpark feature stores and automated model inference endpoints with Databricks Model Serving.',
    ],
    accentColor: '#8b5cf6',
  },
];

const filterTabs = ['All', 'Pipelines', 'Lakehouse', 'Analytics', 'AI / LLM'];

function FocusTrap({ children, onClose }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const focusables = container.querySelectorAll(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    const handleKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;
      if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      }
    };

    document.addEventListener('keydown', handleKey);
    first?.focus();
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return <div ref={containerRef}>{children}</div>;
}

export default function PlatformGrid() {
  const [selected, setSelected] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [copied, setCopied] = useState(false);
  const triggerRef = useRef(null);

  const filteredPlatforms = useMemo(() => {
    if (activeFilter === 'All') return techPlatforms;
    return techPlatforms.filter((p) => p.filterCategory === activeFilter);
  }, [activeFilter]);

  const openModal = useCallback((tech, el) => {
    triggerRef.current = el;
    setSelected(tech);
    setCopied(false);
  }, []);

  const closeModal = useCallback(() => {
    setSelected(null);
    setCopied(false);
    triggerRef.current?.focus();
  }, []);

  const copySpecs = (tech) => {
    const text = `${tech.title} (${tech.category})\n\n${tech.shortDesc}\n\nTechnical Specifications:\n${tech.specs.map(s => `• ${s}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${tech.title} specs copied to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  /* Body scroll lock when modal open */
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="section-padding"
      style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)' }}
    >
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-4">
            <div className="section-badge w-fit">Capabilities &amp; Tech Stack</div>
            <h2 id="services-heading" className="section-title">
              Enterprise <strong>Azure Data &amp; AI</strong> Platform
            </h2>
            <p className="section-subtitle">
              Production-proven implementations across Azure Data Factory, Microsoft Fabric, Power BI, Databricks, dbt, and enterprise AI models.
            </p>
          </div>

          {/* Interactive Filter Pills (Apple / Emil Segmentation) */}
          <div
            className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-medium)', width: 'fit-content' }}
            role="tablist"
            aria-label="Filter capabilities by domain"
          >
            {filterTabs.map((tab) => {
              const active = activeFilter === tab;
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveFilter(tab)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
                  style={{
                    background: active ? 'var(--accent-cyan)' : 'transparent',
                    color: active ? 'var(--text-on-dark)' : 'var(--text-secondary)',
                    boxShadow: active ? '0 0 16px var(--accent-cyan-glow)' : 'none',
                    border: 'none',
                    transition: 'background-color var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out)',
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        <ul
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 list-none p-0 m-0"
          role="list"
          aria-label="Technology capabilities"
        >
          {filteredPlatforms.map((tech) => (
            <li key={tech.id}>
              <button
                onClick={(e) => openModal(tech, e.currentTarget)}
                className="master-card p-6 flex flex-col justify-between group text-left w-full cursor-pointer h-full"
                aria-label={`${tech.title} — ${tech.category}. Click to view technical specifications.`}
                aria-haspopup="dialog"
              >
                <div className="space-y-5">
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center p-2 overflow-hidden shrink-0 transition-transform duration-200 group-hover:scale-105"
                      style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-medium)' }}
                    >
                      <img
                        src={tech.icon}
                        alt={`${tech.title} logo`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        width="48"
                        height="48"
                      />
                    </div>
                    <span className="code-badge shrink-0 mt-1">{tech.badge}</span>
                  </div>

                  <div className="space-y-1.5">
                    <p
                      className="text-xs font-semibold uppercase tracking-widest"
                      style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.14em' }}
                    >
                      {tech.category}
                    </p>
                    <h3
                      className="font-semibold text-base leading-snug"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {tech.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {tech.shortDesc}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center justify-between mt-5 pt-4 text-xs font-semibold"
                  style={{ borderTop: '1px solid var(--border-subtle)', color: 'var(--accent-cyan)' }}
                  aria-hidden="true"
                >
                  <span>View Specifications</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal Dialog (Emil Kowalski scale(0.96) entry & focus-trapped) */}
      {selected && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
          aria-hidden="false"
        >
          <FocusTrap onClose={closeModal}>
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-desc"
              className="master-card modal-surface w-full max-w-lg p-8 relative"
              style={{ background: 'var(--bg-elevated)', maxHeight: '92vh', overflowY: 'auto' }}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-9 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-muted)',
                }}
                aria-label="Close specifications dialog"
              >
                <X size={16} aria-hidden="true" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-xl p-2.5 flex items-center justify-center overflow-hidden shrink-0"
                  style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-medium)' }}
                >
                  <img
                    src={selected.icon}
                    alt={`${selected.title} logo`}
                    className="w-full h-full object-contain"
                    width="56"
                    height="56"
                  />
                </div>
                <div>
                  <p
                    className="text-xs uppercase tracking-widest"
                    style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {selected.category}
                  </p>
                  <h2 id="modal-title" className="font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
                    {selected.title}
                  </h2>
                </div>
              </div>

              <p id="modal-desc" className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                {selected.shortDesc}
              </p>

              {/* Specs */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-between pb-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <h3
                    className="text-xs uppercase tracking-widest font-bold"
                    style={{
                      color: 'var(--text-muted)',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    Technical Specifications
                  </h3>
                  <button
                    onClick={() => copySpecs(selected)}
                    className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md cursor-pointer transition-colors"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-medium)',
                      color: copied ? 'var(--accent-green)' : 'var(--accent-cyan)',
                    }}
                    title="Copy technical specifications"
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copied ? 'Copied' : 'Copy Specs'}</span>
                  </button>
                </div>
                <ul className="space-y-3 list-none p-0 m-0">
                  {selected.specs.map((spec, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-primary)' }}>
                      <CheckCircle2
                        size={15}
                        style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '2px' }}
                        aria-hidden="true"
                      />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="btn-outline flex-1 justify-center py-2.5 text-sm cursor-pointer"
                >
                  Close
                </button>
                <a
                  href="#contact"
                  onClick={closeModal}
                  className="btn-primary flex-1 justify-center py-2.5 text-sm cursor-pointer"
                  aria-label={`Request consultation for ${selected.title}`}
                >
                  Request Consultation
                </a>
              </div>
            </div>
          </FocusTrap>
        </div>
      )}
    </section>
  );
}
