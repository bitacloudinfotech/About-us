import React from 'react';
import { ArrowUp, Mail, Phone, ExternalLink } from 'lucide-react';

function LinkedinIcon(props) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" width="16" height="16" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.47 1.47 0 1 0 0 2.94 1.47 1.47 0 0 0 0-2.94Z" />
    </svg>
  );
}

const footerNavigation = {
  solutions: [
    { label: 'Azure Data Factory (ADF)', href: '#services' },
    { label: 'Microsoft Fabric OneLake', href: '#services' },
    { label: 'Power BI Visual Analytics', href: '#services' },
    { label: 'Databricks & PySpark', href: '#services' },
    { label: 'dbt Data Transformation', href: '#services' },
    { label: 'Enterprise AI & LLM Agents', href: '#services' },
    { label: 'Snowflake & PostgreSQL', href: '#services' },
    { label: 'Cloud Migration & ETL', href: '#services' },
  ],
  engagement: [
    { label: 'Fixed-Scope Sprint', href: '#pricing' },
    { label: 'Monthly Dedicated Retainer', href: '#pricing' },
    { label: 'Enterprise Transformation', href: '#pricing' },
    { label: 'Healthcare & Life Sciences', href: '#industries' },
    { label: 'Banking & Financial Services', href: '#industries' },
    { label: 'Retail & Consumer Goods', href: '#industries' },
    { label: 'Industrial & Manufacturing', href: '#industries' },
  ],
  company: [
    { label: 'About BITA CLOUD', href: '#about' },
    { label: '100% Certified Team', href: '#certified-teams' },
    { label: 'Engagement Process', href: '#process' },
    { label: 'Why Choose BITA', href: '#why-bita' },
    { label: 'Frequently Asked Questions', href: '#faq' },
    { label: 'Book Discovery Call', href: '#contact' },
    { label: 'Privacy Policy', href: '#privacy-policy' },
  ],
};

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      role="contentinfo"
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '100px',
        color: 'var(--text-primary)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Main Footer Container */}
      <div className="container pb-24 lg:pb-20 space-y-12">

        {/* Balanced 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 w-full">

          {/* Column 1: Brand & Contact */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl overflow-hidden p-1 shrink-0 flex items-center justify-center"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-medium)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
              >
                <img
                  src="/Bitacloudinfotechtransparent.png"
                  alt="BITA CLOUD INFO TECH"
                  className="w-full h-full object-contain"
                  loading="lazy"
                  width="40"
                  height="40"
                />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight block" style={{ color: 'var(--text-primary)' }}>
                  BITA CLOUD INFO TECH
                </span>
                <span
                  className="text-xs font-semibold block"
                  style={{ color: 'var(--accent-cyan)', letterSpacing: '0.03em' }}
                >
                  Data &amp; AI Engineering Firm
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Specialist enterprise data platform consultancy. We architect production Azure lakehouses, Microsoft Fabric pipelines, dbt data models, and custom Power BI solutions for high-growth tech companies and Fortune 500 enterprises.
            </p>

            {/* Direct Contact Links */}
            <div className="space-y-2.5 pt-1">
              <a
                href="mailto:contact@bitacloudinfo.tech"
                className="flex items-center gap-2.5 p-2 rounded-lg transition-colors text-xs font-medium"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', textDecoration: 'none' }}
              >
                <Mail size={14} style={{ color: 'var(--accent-cyan)' }} aria-hidden="true" />
                <span>contact@bitacloudinfo.tech</span>
              </a>

              <a
                href="https://wa.me/918982296014"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-lg transition-colors text-xs font-medium"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', textDecoration: 'none' }}
              >
                <Phone size={14} style={{ color: '#25D366' }} aria-hidden="true" />
                <span>+91 89822 96014 (Direct)</span>
              </a>

              <a
                href="https://www.linkedin.com/company/bita-cloud-info-tech"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-lg transition-colors text-xs font-medium"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', textDecoration: 'none' }}
              >
                <LinkedinIcon style={{ color: '#0A66C2' }} aria-hidden="true" />
                <span>LinkedIn Company Page</span>
                <ExternalLink size={12} className="ml-auto" style={{ color: 'var(--text-muted)' }} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 2: Capabilities & Tech Stack */}
          <div className="space-y-4">
            <h3
              className="text-xs font-bold uppercase tracking-wider pb-2"
              style={{ color: 'var(--text-primary)', borderBottom: '2px solid var(--accent-cyan)', display: 'inline-block' }}
            >
              Capabilities &amp; Tech Stack
            </h3>
            <ul className="space-y-2.5 list-none p-0 m-0 pt-4">
              {footerNavigation.solutions.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs transition-all duration-150 block py-0.5"
                    style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = 'var(--accent-cyan)';
                      e.currentTarget.style.transform = 'translateX(3px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Engagement & Verticals */}
          <div className="space-y-4">
            <h3
              className="text-xs font-bold uppercase tracking-wider pb-2"
              style={{ color: 'var(--text-primary)', borderBottom: '2px solid var(--accent-purple)', display: 'inline-block' }}
            >
              Engagement &amp; Verticals
            </h3>
            <ul className="space-y-2.5 list-none p-0 m-0 pt-4">
              {footerNavigation.engagement.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs transition-all duration-150 block py-0.5"
                    style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = 'var(--accent-purple)';
                      e.currentTarget.style.transform = 'translateX(3px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company & Governance */}
          <div className="space-y-4">
            <h3
              className="text-xs font-bold uppercase tracking-wider pb-2"
              style={{ color: 'var(--text-primary)', borderBottom: '2px solid var(--accent-magenta)', display: 'inline-block' }}
            >
              Company &amp; FAQ
            </h3>
            <ul className="space-y-2.5 list-none p-0 m-0 pt-4">
              {footerNavigation.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs transition-all duration-150 block py-0.5"
                    style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = 'var(--accent-magenta)';
                      e.currentTarget.style.transform = 'translateX(3px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div
          className="pt-10 mt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <div className="space-y-1 text-center md:text-left">
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              © {new Date().getFullYear()} <strong style={{ color: 'var(--text-primary)' }}>BITA CLOUD INFO TECH</strong>. All rights reserved.
            </p>
            <p className="text-[0.68rem]" style={{ color: 'var(--text-muted)' }}>
              Microsoft, Azure, Power BI, Databricks, and dbt are registered trademarks of their respective owners.
            </p>
          </div>

          <div className="flex items-center gap-5 text-xs flex-wrap justify-center">
            <a
              href="#privacy-policy"
              className="hover:underline transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              Privacy Policy
            </a>
            <span style={{ color: 'var(--border-medium)' }} aria-hidden="true">•</span>
            <a
              href="#privacy-policy"
              className="hover:underline transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              Terms of Engagement
            </a>
            <span style={{ color: 'var(--border-medium)' }} aria-hidden="true">•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
              }}
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} aria-hidden="true" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
