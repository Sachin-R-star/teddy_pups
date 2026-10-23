import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';

// Paw Icon component used for hover and active state on nav links
export const PawIcon = ({ className = "tp-nav-link__paw" }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true" fill="currentColor">
    <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Puppies', path: '/puppies' },
    { label: 'Happy families', path: '/happy-families' },
    { label: 'How it works', path: '/how-it-works' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Visit & contact', path: '/contact' }
  ];

  return (
    <>
      <a href="#main" className="sr-only-focusable fixed left-4 top-4 z-[100] rounded-full bg-cocoa px-5 py-3 font-semibold text-milk">
        Skip to content
      </a>

      <header
        id="site-header"
        data-scrolled={scrolled ? "true" : "false"}
        data-hidden="false"
        data-home={isHome ? "true" : undefined}
        className="tp-header fixed inset-x-0 top-0 z-50"
      >
        <div className="tp-header__bar gutter">
          <Link to="/" className="tp-header__brand" aria-label="TeddyPups U.A.E. — home">
            <img
              alt="TeddyPups Logo"
              width="56"
              height="56"
              className="tp-header__logo"
              src="https://puppy.instabizweb.com/brand/logo.png"
            />
            <span className="font-plush tp-header__name">TeddyPups</span>
          </Link>

          <nav aria-label="Main" className="tp-header__nav">
            <ul>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      aria-current={isActive ? 'page' : undefined}
                      data-active={isActive ? 'true' : 'false'}
                      className="tp-nav-link"
                    >
                      <span>{item.label}</span>
                      <PawIcon className="tp-nav-link__paw" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="tp-header__end">
            <a
              href={siteConfig.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp tp-header__wa"
            >
              WhatsApp us
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-10 items-center gap-2 rounded-full border-2 border-cocoa bg-milk px-4 text-[0.95rem] font-semibold lg:hidden transition-transform active:scale-95 shadow-sm"
              aria-haspopup="dialog"
              aria-label="Open navigation menu"
            >
              <PawIcon className="size-5 text-cocoa" />
              <span>Menu</span>
            </button>

            {/* Smooth fullscreen menu expanding from top right */}
            <div
              aria-label="Site menu"
              role="dialog"
              aria-modal="true"
              className={`tp-menu-drawer fixed inset-0 z-[100] bg-honey text-cocoa transition-all duration-500 ease-out ${
                menuOpen
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none'
              }`}
              style={{
                clipPath: menuOpen
                  ? 'circle(160% at calc(100% - 3.5rem) 2.5rem)'
                  : 'circle(0% at calc(100% - 3.5rem) 2.5rem)',
                transition: 'clip-path 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease'
              }}
            >
              <div className="flex h-full flex-col gutter pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-5">
                <div className="flex items-center justify-between">
                  <span className="font-scrawl text-lg text-cocoa-soft">where to, friend?</span>
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    className="h-11 rounded-full bg-cocoa px-5 font-semibold text-milk hover:bg-toffee-deep transition-colors"
                  >
                    Close
                  </button>
                </div>

                <nav aria-label="Mobile" className="mt-8 flex-1 overflow-y-auto">
                  <ul className="space-y-1">
                    {navItems.map((item) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            aria-current={isActive ? 'page' : undefined}
                            data-active={isActive ? 'true' : 'false'}
                            className="tp-menu-link font-plush flex items-center justify-between py-2 text-[clamp(2.2rem,9vw,3.2rem)] hover:text-toffee-deep transition-colors"
                            onClick={() => setMenuOpen(false)}
                          >
                            <span>{item.label}</span>
                            {isActive && <PawIcon className="size-6 text-cocoa shrink-0" />}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="space-y-3 pt-4 border-t border-cocoa/10">
                  <a
                    href={siteConfig.getWhatsAppUrl()}
                    className="btn btn-whatsapp w-full !shadow-md"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp us
                  </a>
                  <p className="text-center text-sm font-semibold text-cocoa/80">{siteConfig.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scalloped hem border at bottom of header - Static (no continuous wave animation) */}
        <svg aria-hidden="true" className="tp-header__hem" width="100%" height="14" preserveAspectRatio="none">
          <defs>
            <pattern id="tp-hem" width="44" height="14" patternUnits="userSpaceOnUse">
              <path d="M0 0H44V2A22 11 0 0 1 0 2Z" className="tp-header__hem-fill" />
              <path d="M0 2A22 11 0 0 0 44 2" className="tp-header__hem-line" />
            </pattern>
          </defs>
          <rect width="100%" height="14" fill="url(#tp-hem)" />
        </svg>
      </header>
    </>
  );
}
