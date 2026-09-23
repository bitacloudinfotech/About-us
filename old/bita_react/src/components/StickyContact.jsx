import React, { useState, useEffect } from 'react';
import { MessageSquare, X, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';

export default function StickyContact() {
  const [visible, setVisible] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Show tooltip after 4s of scrolling
    const timer = setTimeout(() => {
      if (!dismissed) setTooltipVisible(true);
    }, 4000);

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
    };
  }, [dismissed]);

  const dismissTooltip = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setTooltipVisible(false);
    setDismissed(true);
  };

  const handleWhatsAppClick = () => {
    setTooltipVisible(false);
    toast.info('Connecting to certified Azure team on WhatsApp...');
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      style={{ pointerEvents: 'none' }}
    >
      {/* Tooltip bubble */}
      {tooltipVisible && (
        <div
          className="animate-fade-up"
          style={{
            pointerEvents: 'auto',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-medium)',
            borderRadius: '12px',
            padding: '12px 16px',
            maxWidth: '240px',
            boxShadow: 'var(--card-shadow)',
            position: 'relative',
          }}
        >
          <button
            onClick={dismissTooltip}
            className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded cursor-pointer"
            style={{ color: 'var(--text-muted)', background: 'transparent', border: 'none' }}
            aria-label="Dismiss consultation prompt"
          >
            <X size={12} />
          </button>
          <p className="text-xs font-bold mb-0.5" style={{ color: 'var(--text-primary)', paddingRight: '16px' }}>
            Let's talk data 💬
          </p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Get a free consultation from our certified Azure team.
          </p>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/918982296014?text=Hi%20BITA%20Cloud%2C%20I'm%20interested%20in%20a%20free%20consultation."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with BITA CLOUD on WhatsApp — get a free consultation"
        className="btn-whatsapp"
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '14px 20px',
          borderRadius: '50px',
          fontWeight: 700,
          fontSize: '0.875rem',
          boxShadow: '0 4px 24px rgba(37,211,102,0.45)',
          animation: 'pulse-ring 2.8s ease-in-out infinite',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
        onClick={handleWhatsAppClick}
      >
        <MessageSquare size={18} className="fill-white" aria-hidden="true" />
        <span className="hidden sm:inline">Free Consultation</span>
        <span className="sm:hidden">Chat Now</span>
      </a>

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="theme-toggle"
        aria-label="Scroll to top"
        style={{ pointerEvents: 'auto', width: '40px', height: '40px' }}
      >
        <ChevronUp size={18} aria-hidden="true" />
      </button>
    </div>
  );
}
