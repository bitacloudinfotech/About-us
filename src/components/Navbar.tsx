import { useState, useEffect } from 'react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Capabilities', href: '#services' },
  { label: 'Lakehouse', href: '#why-bita' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* Fixed Navbar (z-index: 10) */}
      <header
        className="fixed top-0 left-0 right-0 z-10 w-full px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center transition-colors duration-300"
        style={{
          fontFamily: 'var(--font-body)',
        }}
      >
        {/* Logo (left) */}
        <a
          href="#"
          className="flex items-center gap-3 no-underline select-none group"
          aria-label="BITA CLOUD — Mainframe"
        >
          <span
            style={{ fontFamily: 'var(--font-heading)' }}
            className="text-white text-[21px] sm:text-[26px] tracking-tight font-medium"
          >
            BITA CLOUD®
          </span>
          <span
            className="text-white text-[25px] sm:text-[30px] select-none leading-none"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            ✳︎
          </span>
        </a>

        {/* Desktop Nav Links (center, hidden below md) */}
        <nav
          className="hidden md:flex items-center text-[23px] text-white"
          aria-label="Main Navigation"
        >
          {navItems.map((item, idx) => (
            <span key={item.label} className="inline-flex items-center">
              <a
                href={item.href}
                className="hover:opacity-60 transition-opacity text-white no-underline"
              >
                {item.label}
              </a>
              {idx < navItems.length - 1 && (
                <span className="text-white select-none mr-2">, </span>
              )}
            </span>
          ))}
        </nav>

        {/* Desktop CTA (right, hidden below md) */}
        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            className="text-[23px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile Hamburger (visible below md) */}
        <button
          type="button"
          onClick={toggleMobile}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 z-20 focus:outline-none"
        >
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 transform ${
              mobileOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 ${
              mobileOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 transform ${
              mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </header>

      {/* Mobile Overlay (z-index: 9) */}
      <div
        className={`fixed inset-0 z-[9] bg-black/90 backdrop-blur-md flex flex-col justify-center px-8 gap-8 transition-opacity duration-300 md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={closeMobile}
            className="text-[32px] font-medium text-white no-underline hover:opacity-70 transition-opacity"
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={closeMobile}
          className="text-[32px] font-medium text-white underline underline-offset-2 hover:opacity-70 transition-opacity"
        >
          Get in touch
        </a>
      </div>
    </>
  );
}
