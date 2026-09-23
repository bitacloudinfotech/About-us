import React, { useState, useEffect } from 'react';
import { Cookie, X, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const CONSENT_KEY = 'bita_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (!saved) {
      // Show banner after 1.5 seconds so it doesn't fight the page load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setAccepted(true);
    toast.success('Cookie preferences saved.');
    setTimeout(() => setVisible(false), 450);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    toast.info('Non-essential cookies declined.');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-50 w-full max-w-xl"
      style={{
        transform: 'translateX(-50%)',
        animation: 'fadeUp 0.4s ease forwards',
      }}
    >
      <div
        className="master-card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-medium)',
          boxShadow: '0 8px 48px rgba(0,0,0,0.5)',
        }}
      >
        <div className="flex items-start gap-3 flex-1">
          <Cookie
            size={20}
            style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '2px' }}
            aria-hidden="true"
          />
          <div>
            <p className="font-semibold text-sm mb-0.5" style={{ color: 'var(--text-primary)' }}>
              We use cookies
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              We use minimal cookies for theme preferences and Google Fonts. See our{' '}
              <a href="#privacy-policy" style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }}>
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={decline}
            className="btn-ghost text-xs py-2 px-3 flex-1 sm:flex-none justify-center"
            aria-label="Decline non-essential cookies"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="btn-primary text-xs py-2 px-4 flex-1 sm:flex-none justify-center"
            aria-label="Accept all cookies"
          >
            {accepted ? (
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={13} aria-hidden="true" /> Accepted
              </span>
            ) : (
              'Accept All'
            )}
          </button>
          <button
            onClick={decline}
            className="theme-toggle"
            aria-label="Close cookie consent banner"
            title="Close"
          >
            <X size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
