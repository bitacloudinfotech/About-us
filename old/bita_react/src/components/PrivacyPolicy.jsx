import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <section
      id="privacy-policy"
      aria-labelledby="privacy-heading"
      className="section-padding"
      style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}
    >
      <div className="container max-w-3xl">
        <a
          href="#"
          className="btn-ghost inline-flex mb-8"
          aria-label="Back to homepage"
          style={{ color: 'var(--accent-cyan)' }}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Home
        </a>

        <div className="space-y-3 mb-10">
          <div className="section-badge w-fit">
            <Shield size={13} aria-hidden="true" />
            Legal
          </div>
          <h1 id="privacy-heading" className="section-title">
            Privacy Policy
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
            Last updated: August 2, 2026
          </p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>

          <div className="space-y-3">
            <h2 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>1. Introduction</h2>
            <p>
              BITA CLOUD INFO TECH ("we", "our", or "us") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or submit an inquiry.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>2. Information We Collect</h2>
            <p>We may collect the following personal information when you contact us:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Full name and job title</li>
              <li>Work email address</li>
              <li>Company name</li>
              <li>Phone number (if provided)</li>
              <li>Project description and business requirements</li>
            </ul>
            <p>
              We also collect non-personal data such as browser type, pages visited, and time spent on the site via standard web analytics.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To respond to your project inquiry or consultation request</li>
              <li>To send relevant information about our services (only with your consent)</li>
              <li>To improve our website and user experience</li>
              <li>To comply with legal obligations</li>
            </ul>
            <p>We never sell, rent, or trade your personal information to third parties.</p>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>4. Data Retention</h2>
            <p>
              We retain your personal data only as long as necessary to fulfill the purpose for which it was collected, or as required by applicable law. Contact form submissions are retained for a maximum of 24 months unless an active engagement exists.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>5. Cookies</h2>
            <p>
              Our website uses minimal cookies — primarily for theme preference storage and basic analytics. We use Google Fonts, which may set cookies from Google's servers. You may opt out of non-essential cookies via our cookie consent banner.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>6. Your Rights (GDPR / DPDP)</h2>
            <p>If you are based in the EU, UK, or India, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access your personal data</li>
              <li>Request correction or deletion of your data</li>
              <li>Object to or restrict processing</li>
              <li>Withdraw consent at any time</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
            <p>To exercise any of these rights, contact us at <a href="mailto:contact@bitacloudinfo.tech" style={{ color: 'var(--accent-cyan)' }}>contact@bitacloudinfo.tech</a>.</p>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>7. Third-Party Services</h2>
            <p>
              We use WhatsApp Business (Meta Platforms Inc.) for direct communication. Messages sent via WhatsApp are governed by Meta's privacy policy. We use Google Fonts (Google LLC) for typography — governed by Google's privacy policy.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>8. Contact Us</h2>
            <p>For any privacy-related questions or requests:</p>
            <div
              className="p-4 rounded-xl mt-3 text-sm"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)' }}
            >
              <p><strong style={{ color: 'var(--text-primary)' }}>BITA CLOUD INFO TECH</strong></p>
              <p>Email: <a href="mailto:contact@bitacloudinfo.tech" style={{ color: 'var(--accent-cyan)' }}>contact@bitacloudinfo.tech</a></p>
              <p>WhatsApp: <a href="https://wa.me/918982296014" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)' }}>+91 89822 96014</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
