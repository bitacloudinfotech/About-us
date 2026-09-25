import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

export const AppleFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How quickly can you start on our project?',
      a: 'We can begin discovery within 48 business hours of signing the SOW. Our pre-built onboarding framework and architecture templates mean your first design session happens within days, not weeks.',
    },
    {
      q: 'Do you work with companies that are not yet on Azure?',
      a: 'Yes. We specialize in enterprise migrations from on-premises SQL Server, SSIS, Oracle, AWS, or GCP to Azure, Microsoft Fabric OneLake, Databricks, or Snowflake. We audit your existing stack and blueprint a phased zero-downtime migration path.',
    },
    {
      q: 'Who will actually work on our project?',
      a: 'You get a named, senior certified engineer — not a sales manager who delegates to juniors. Every engineer holds active Microsoft, Databricks, or Palantir certification. Zero subcontracting. You speak directly to your engineer via Slack and WhatsApp.',
    },
    {
      q: 'Do you offer fixed-price engagements?',
      a: 'Yes. For well-scoped projects (specific ADF pipelines, Power BI dashboard suites, dbt transformation layers, or Fabric lakehouse builds), we deliver fixed-price SOWs so you have zero budget surprises.',
    },
    {
      q: 'How do you handle security and data privacy?',
      a: 'All pipelines are built with Row-Level Security (RLS), private endpoints, Azure AD tenant separation, and audit logging by default. We sign mutual NDAs before discovery and align with SOC 2, HIPAA, GDPR, and ISO 27001 requirements.',
    },
    {
      q: 'What happens to our code and data after the project?',
      a: 'Full IP transfer on day one. Every pipeline, dbt model, notebook, Power BI semantic model, and architecture document belongs 100% to you. We retain zero rights to your code or data.',
    },
    {
      q: 'Can we hire your engineers after a project?',
      a: 'Our engineers are available for ongoing retainer engagements but are not available for direct client hire during or within 12 months of an active engagement, preserving team continuity and project stability.',
    },
    {
      q: 'What does the discovery call involve?',
      a: 'A free 30-minute technical session with a senior certified architect — no salesperson, no script. We review your data topology, business bottlenecks, and latency requirements, and outline actionable recommendations.',
    },
  ];

  return (
    <section id="faq" className="relative py-24 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 inline-flex items-center gap-2">
          <HelpCircle className="w-4 h-4" />
          Enterprise FAQs
        </span>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-[#86868b] text-base sm:text-lg font-medium">
          Everything engineering leaders ask before initiating an engagement with BITA CLOUD.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Left Info Card */}
        <div className="apple-glass rounded-3xl p-8 border border-white/10 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Have a custom question?</h3>
            <p className="text-xs text-[#86868b] leading-relaxed">
              Ask our certified engineering leadership directly. Typical response within 2 business hours.
            </p>
          </div>

          <a
            href="https://wa.me/918982296014"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare size={14} className="fill-white" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href="#contact"
            className="w-full py-3 rounded-full apple-glass text-white text-xs font-semibold hover:bg-white/10 transition-all border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Send Project Brief</span>
          </a>
        </div>

        {/* Right Accordion List */}
        <div className="lg:col-span-2 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="apple-glass rounded-2xl border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <span className="text-sm font-semibold text-white/95">{faq.q}</span>
                  <div
                    className={`w-7 h-7 rounded-full apple-glass flex items-center justify-center text-cyan-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <ChevronDown size={15} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-xs text-[#86868b] leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
