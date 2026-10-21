import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import { PawIcon } from './Navbar';

export default function Footer() {
  return (
    <footer className="tp-footer relative pb-[calc(var(--bar-h)+2rem)] text-milk md:pb-10 overflow-hidden bg-[#1e100a]">
      {/* Night hill backdrop curve */}
      <div className="tp-footer__hill" aria-hidden="true" />

      {/* Twinkling stars */}
      {[
        { top: '15%', left: '12%', delay: '0s' },
        { top: '25%', left: '28%', delay: '1.2s' },
        { top: '18%', left: '72%', delay: '0.6s' },
        { top: '35%', left: '88%', delay: '1.8s' },
        { top: '10%', left: '50%', delay: '2.4s' }
      ].map((star, i) => (
        <span
          key={i}
          className="tp-twinkle absolute text-honey"
          style={{ top: star.top, left: star.left, animationDelay: star.delay }}
        >
          ✦
        </span>
      ))}

      {/* Moon */}
      <div className="tp-moon absolute top-8 right-12 md:right-28" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="size-16 md:size-24 text-honey fill-current opacity-90 drop-shadow-[0_0_15px_rgba(251,227,180,0.4)]">
          <circle cx="50" cy="50" r="45" fill="#fbe3b4" />
          <circle cx="65" cy="40" r="38" fill="#1e100a" />
        </svg>
      </div>

      {/* Woven Basket with sleeping pup */}
      <div className="tp-basket mx-auto mt-6 mb-12 flex justify-center" aria-hidden="true">
        <svg viewBox="0 0 240 160" className="w-56 h-auto drop-shadow-xl" fill="none">
          {/* Basket back */}
          <ellipse cx="120" cy="95" rx="85" ry="35" fill="#4a2c1d" />
          {/* Sleeping pup curled up */}
          <g transform="translate(65, 55)">
            <ellipse cx="55" cy="45" rx="42" ry="28" fill="#f2be6b" stroke="#2a170e" strokeWidth="2.5" />
            <circle cx="85" cy="40" r="22" fill="#f2be6b" stroke="#2a170e" strokeWidth="2.5" />
            {/* Floppy ear */}
            <path d="M78 30 C70 42 75 58 84 52" fill="#e4a352" stroke="#2a170e" strokeWidth="2" />
            {/* Sleeping eyes */}
            <path d="M88 42 Q92 46 96 42" stroke="#2a170e" strokeWidth="2.5" strokeLinecap="round" />
            {/* Nose */}
            <ellipse cx="98" cy="47" rx="3.5" ry="2.5" fill="#2a170e" />
            {/* Little paw */}
            <ellipse cx="40" cy="58" rx="8" ry="6" fill="#fbe3b4" stroke="#2a170e" strokeWidth="1.8" />
            <path d="M48 30 Q35 25 30 35" stroke="#2a170e" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
          {/* Basket front weave */}
          <path d="M35 95 C35 135 70 150 120 150 C170 150 205 135 205 95 C205 85 170 80 120 80 C70 80 35 85 35 95 Z" fill="#8c532b" stroke="#2a170e" strokeWidth="3" />
          {/* Basket rim */}
          <ellipse cx="120" cy="92" rx="86" ry="14" fill="#a26335" stroke="#2a170e" strokeWidth="2.5" />
          {/* Basket weave pattern lines */}
          <path d="M50 105 C70 140 100 145 120 145 M80 98 C100 135 140 145 160 140 M120 95 C140 130 180 135 190 115" stroke="#68391b" strokeWidth="2" opacity="0.6" strokeDasharray="6 4" />
        </svg>
      </div>

      <div className="gutter mx-auto max-w-7xl pt-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-milk/10">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src={siteConfig.logo}
                alt="TeddyPups Logo"
                className="size-12 rounded-full border-2 border-honey/40 bg-milk/10 p-1"
              />
              <span className="font-plush text-2xl text-honey">{siteConfig.brandName}</span>
            </Link>
            <p className="text-sm text-milk/80 leading-relaxed font-sans">
              Ethically raised, health-guaranteed teacup & teddy bear puppies in Dubai. Experience the joy of meeting your new family member in our Downtown showroom.
            </p>
            <div className="pt-2">
              <span className="font-scrawl text-xl text-honey">every puppy is family ♡</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-plush text-lg text-honey mb-4 flex items-center gap-2">
              <PawIcon className="size-4 text-toffee inline" /> Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-milk/80">
              {siteConfig.navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-honey transition-colors inline-flex items-center gap-2"
                  >
                    <span>→</span> {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Showroom & Hours */}
          <div>
            <h3 className="font-plush text-lg text-honey mb-4 flex items-center gap-2">
              <PawIcon className="size-4 text-toffee inline" /> Dubai Showroom
            </h3>
            <div className="space-y-3 text-sm text-milk/80">
              <p>📍 {siteConfig.address}</p>
              <p>🕒 {siteConfig.showroomHours}</p>
              <p>Private VIP visits available upon prior appointment.</p>
              <p className="pt-1">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-honey transition-colors text-xs text-honey/80 underline"
                >
                  {siteConfig.email}
                </a>
              </p>
            </div>
          </div>

          {/* Instant Contact CTA */}
          <div>
            <h3 className="font-plush text-lg text-honey mb-4 flex items-center gap-2">
              <PawIcon className="size-4 text-toffee inline" /> Say Hello
            </h3>
            <p className="text-sm text-milk/80 mb-4">
              Connect directly with our puppy care advisors on WhatsApp:
            </p>
            <a
              href={siteConfig.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full text-center py-3 font-bold shadow-lg block hover:scale-[1.02] transition-transform"
            >
              WhatsApp Us
            </a>
            <p className="text-center text-xs text-milk/60 mt-3">
              Direct: {siteConfig.phone}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-milk/60 gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.</p>
          <p className="flex items-center gap-1 font-sans">
            Handcrafted with love for puppy lovers in UAE 🐾
          </p>
        </div>
      </div>
    </footer>
  );
}
