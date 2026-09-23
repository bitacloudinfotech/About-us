import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark';
  const saved = localStorage.getItem('bita_theme');
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const navLinks = [
  { label: 'Capabilities', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Industries', href: '#industries' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

  /* Scroll handler */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Apply theme */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('bita_theme', theme);
  }, [theme]);

  /* Trap focus inside mobile menu */
  useEffect(() => {
    if (!mobileOpen) return;
    const menu = mobileMenuRef.current;
    if (!menu) return;

    const focusables = menu.querySelectorAll(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    const trap = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
        }
      }
      if (e.key === 'Escape') {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', trap);
    first?.focus();
    return () => document.removeEventListener('keydown', trap);
  }, [mobileOpen]);

  /* Prevent body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    toast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode`, {
      icon: nextTheme === 'dark' ? '🌙' : '☀️',
      duration: 2000,
    });
  };

  const closeMobile = () => { setMobileOpen(false); hamburgerRef.current?.focus(); };

  return (
    <>
      <header
        role="banner"
        style={{
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.25)' : 'none',
          transition: 'background-color var(--duration-normal) ease, border-color var(--duration-normal) ease, box-shadow var(--duration-normal) var(--ease-out)',
        }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2.5 shrink-0 group"
              aria-label="BITA CLOUD INFO TECH — Home"
            >
              <div
                className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-medium)' }}
              >
                <img
                  src="/Bitacloudinfotechtransparent.png"
                  alt="BITA CLOUD INFO TECH logo"
                  className="w-full h-full object-contain p-1"
                  width="36"
                  height="36"
                />
              </div>
              <div className="hidden sm:block leading-none">
                <span className="font-bold text-base tracking-tight" style={{ color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>
                  BITA{' '}
                  <span
                    style={{
                      color: 'var(--accent-cyan)',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.68rem',
                      letterSpacing: '0.12em',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: 'var(--accent-cyan-dim)',
                      border: '1px solid rgba(0,229,255,0.2)',
                      verticalAlign: 'middle',
                    }}
                  >
                    CLOUD
                  </span>
                </span>
                <div
                  className="text-xs mt-0.5"
                  style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.08em' }}
                >
                  Data &amp; AI Engineering
                </div>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav
              className="hidden lg:flex items-center gap-0.5"
              role="navigation"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.background = 'var(--bg-hover)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                title={`Currently ${theme} mode`}
                id="theme-toggle-btn"
              >
                {theme === 'dark'
                  ? <Sun size={17} strokeWidth={2} aria-hidden="true" />
                  : <Moon size={17} strokeWidth={2} aria-hidden="true" />
                }
              </button>

              {/* WhatsApp */}
              <a
                href="https://wa.me/918982296014"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex btn-whatsapp text-xs py-2 px-3"
                aria-label="Chat with us on WhatsApp — +91 89822 96014"
              >
                <MessageSquare size={14} className="fill-white" aria-hidden="true" />
                <span className="hidden md:inline">WhatsApp</span>
              </a>

              {/* Contact CTA */}
              <a
                href="#contact"
                className="btn-primary text-xs py-2 px-4 hidden sm:inline-flex"
              >
                <span>Book a Call</span>
                <ArrowRight size={14} aria-hidden="true" />
              </a>

              {/* Mobile Menu Toggle */}
              <button
                ref={hamburgerRef}
                onClick={() => setMobileOpen(o => !o)}
                className="lg:hidden theme-toggle"
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
              >
                {mobileOpen
                  ? <X size={18} aria-hidden="true" />
                  : <Menu size={18} aria-hidden="true" />
                }
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer (iOS Drawer Physics) */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        ref={mobileMenuRef}
        className="lg:hidden fixed inset-0 z-40 pt-16"
        style={{
          background: 'var(--bg-primary)',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 260ms var(--ease-drawer)',
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
        aria-hidden={!mobileOpen}
      >
        <div className="container py-6 flex flex-col gap-1 h-full overflow-y-auto">
          <nav aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobile}
                className="flex items-center px-4 py-4 rounded-lg text-base font-medium"
                style={{
                  color: 'var(--text-primary)',
                  borderBottom: '1px solid var(--border-subtle)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-5 flex flex-col gap-3 mt-auto pb-8">
            <a
              href="https://wa.me/918982296014"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp justify-center py-3"
              onClick={closeMobile}
            >
              <MessageSquare size={16} className="fill-white" aria-hidden="true" />
              <span>WhatsApp · +91 89822 96014</span>
            </a>
            <a
              href="#contact"
              onClick={closeMobile}
              className="btn-primary justify-center py-3"
            >
              <span>Get in Touch</span>
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}
    </>
  );
}
