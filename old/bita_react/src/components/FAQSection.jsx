import React, { useState } from 'react';
import { ChevronDown, MessageSquare } from 'lucide-react';

const faqs = [
  {
    q: 'How quickly can you start on our project?',
    a: 'We can begin discovery within 48 business hours of signing the SOW. Our pre-built onboarding process means no lengthy kickoff cycles — your first architecture design session typically happens within the first week.',
  },
  {
    q: 'Do you work with companies that are not yet on Azure?',
    a: 'Yes. We specialize in cloud migrations from on-premises SQL Server, SSIS, Oracle, and other legacy systems to Azure, Microsoft Fabric, Snowflake, or PostgreSQL. We assess your current stack and recommend the most cost-effective migration path.',
  },
  {
    q: 'Who will actually work on our project?',
    a: 'You get a named, senior certified engineer — not a project manager who delegates to juniors. Every engineer holds active Microsoft, Databricks, or Palantir certification. Zero subcontracting. You can speak directly to your engineer any time.',
  },
  {
    q: 'Do you offer fixed-price engagements?',
    a: 'Yes. For well-scoped projects (specific pipelines, Power BI suites, dbt layers, or Fabric lakehouse builds), we provide fixed-price SOWs so you know exactly what you are getting and what it costs. For evolving projects, we offer monthly retainers.',
  },
  {
    q: 'How do you handle security and data privacy?',
    a: 'All pipelines are built with Row-Level Security, private endpoints, Azure AD integration, and audit logging by default. We sign mutual NDAs before discovery and can align with SOC 2, HIPAA, GDPR, and ISO 27001 requirements depending on your industry.',
  },
  {
    q: 'What happens to our code and data after the project?',
    a: 'Full IP transfer on day one. Every pipeline, dbt model, notebook, Power BI report, and architecture document is yours. We do not retain any rights, and we do not keep your data after the engagement unless you continue with managed support.',
  },
  {
    q: 'Can we hire your engineers after a project?',
    a: "Our engineers are available for ongoing retainer engagements but are not available for direct hire by clients during or within 12 months of an active engagement. This protects our team's continuity and your project quality.",
  },
  {
    q: 'What does the discovery call involve?',
    a: "A free 30-minute call with a senior certified engineer — no sales person. We review your current data stack, understand your business goals, identify gaps, and provide initial recommendations. No obligation. You'll leave with actionable insights regardless of whether we work together.",
  },
];

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div
      className="border-b"
      style={{ borderColor: 'var(--border-subtle)' }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer transition-colors"
        aria-expanded={isOpen}
      >
        <span 
          className="font-semibold text-sm transition-colors" 
          style={{ color: isOpen ? 'var(--accent-cyan)' : 'var(--text-primary)' }}
        >
          {q}
        </span>
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-220"
          style={{
            background: isOpen ? 'var(--accent-cyan-dim)' : 'transparent',
            border: isOpen ? '1px solid rgba(0,229,255,0.3)' : '1px solid transparent',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <ChevronDown
            size={16}
            style={{
              color: 'var(--accent-cyan)',
              flexShrink: 0,
            }}
            aria-hidden="true"
          />
        </div>
      </button>
      <div className={`faq-accordion-body ${isOpen ? 'open' : ''}`}>
        <div className="faq-accordion-inner">
          <p
            className="pb-5 text-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="section-padding"
      style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-subtle)' }}
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">

          {/* Left */}
          <div className="lg:col-span-2 space-y-5">
            <div className="section-badge w-fit">Frequently Asked Questions</div>
            <h2 id="faq-heading" className="section-title">
              Questions we <strong>hear most</strong>
            </h2>
            <p className="section-subtitle" style={{ fontSize: '0.95rem' }}>
              Everything enterprise buyers want to know before starting an engagement with a data engineering partner.
            </p>

            <div
              className="p-6 rounded-2xl space-y-4 mt-6"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-medium)' }}
            >
              <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                Don't see your question?
              </p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Ask a senior certified engineer directly — no sales team, no script.
              </p>
              <a
                href="https://wa.me/918982296014"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline w-full justify-center text-sm"
                aria-label="Ask a question on WhatsApp"
              >
                <MessageSquare size={15} aria-hidden="true" />
                <span>Ask on WhatsApp</span>
              </a>
              <a
                href="#contact"
                className="btn-primary w-full justify-center text-sm"
                aria-label="Send us your question via the contact form"
              >
                <span>Send Your Question</span>
              </a>
            </div>
          </div>

          {/* Right — FAQ Accordion */}
          <div className="lg:col-span-3">
            <div role="list" aria-label="Frequently asked questions">
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  q={faq.q}
                  a={faq.a}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
