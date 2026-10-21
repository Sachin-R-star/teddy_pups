import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';

export default function Footer() {
  return (
    <footer className="tp-footer relative pb-[calc(var(--bar-h)+2rem)] text-milk md:pb-10">
      {/* Curved rolling hill top edge */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="tp-footer__hill"
      >
        <path d="M0 80V44c120-30 240-44 360-30s240 46 360 34 240-58 360-46 240 40 360 26v52z" />
      </svg>

      {/* Starry Night Sky with Crescent Moon & Twinkling Stars */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-6 h-64 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {[
            { left: '6%', top: '18%', width: '12.6px', delay: '0.00s' },
            { left: '14%', top: '42%', width: '8.4px', delay: '0.40s' },
            { left: '26%', top: '22%', width: '10.5px', delay: '0.80s' },
            { left: '42%', top: '35%', width: '7px', delay: '1.20s' },
            { left: '58%', top: '15%', width: '11.2px', delay: '0.20s' },
            { left: '72%', top: '38%', width: '9.1px', delay: '0.60s' },
            { left: '84%', top: '20%', width: '11.9px', delay: '1.00s' },
            { left: '92%', top: '46%', width: '7.7px', delay: '1.40s' },
            { left: '48%', top: '50%', width: '8.4px', delay: '1.60s' }
          ].map((star, idx) => (
            <svg
              key={idx}
              viewBox="0 0 40 40"
              className="tp-twinkle absolute text-honey"
              style={{ left: star.left, top: star.top, width: star.width, animationDelay: star.delay }}
              aria-hidden="true"
            >
              <path
                d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
                fill="currentColor"
              />
            </svg>
          ))}
        </div>
        <span className="tp-moon"></span>
      </div>

      <div className="gutter relative mx-auto grid max-w-[110rem] gap-12 pt-20 md:grid-cols-12 md:gap-x-12 md:gap-y-6 md:pt-28">
        {/* Brand headline & summary */}
        <div className="md:col-span-5">
          <p className="font-plush text-big text-honey-soft">Home, at last.</p>
          <p className="mt-5 max-w-md text-milk/80 font-sans leading-relaxed">
            TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premium services and worldwide shipping.
          </p>
        </div>

        {/* Sleeping Teddy in Wicker Basket */}
        <div className="order-last md:order-none md:col-span-5 md:col-start-1 md:row-start-2">
          <div className="tp-basket">
            <svg aria-hidden="true" viewBox="0 0 300 240" className="tp-basket__back">
              <path
                d="M116 145 C118 100 126 80 138 65 L286 65 C298 80 306 100 308 145 Z"
                className="tp-basket__back-fill"
              />
            </svg>
            <div
              data-pup-stop="true"
              data-pose="snug"
              data-facing="right"
              data-act="basket"
              data-behind="true"
              data-lane="true"
              className="pup-stop tp-basket__pup"
            >
              <div className="pup-buddy" data-facing="right">
                <svg viewBox="0 0 424 240" className="tp-buddy-svg w-36 h-auto">
                  <ellipse cx="212" cy="140" rx="42" ry="28" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" />
                  <circle cx="212" cy="100" r="32" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" />
                  {/* Fluffy ears */}
                  <ellipse cx="178" cy="105" rx="14" ry="20" fill="#e4a352" stroke="#2a170e" strokeWidth="2.5" />
                  <ellipse cx="246" cy="105" rx="14" ry="20" fill="#e4a352" stroke="#2a170e" strokeWidth="2.5" />
                  {/* Sleeping eyes curved */}
                  <path d="M198 98 Q204 104 210 98" stroke="#2a170e" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <path d="M214 98 Q220 104 226 98" stroke="#2a170e" strokeWidth="3" strokeLinecap="round" fill="none" />
                  {/* Cute snout & nose */}
                  <ellipse cx="212" cy="108" rx="5" ry="3.5" fill="#2a170e" />
                  <path d="M212 111.5 v 4" stroke="#2a170e" strokeWidth="2" strokeLinecap="round" />
                  {/* Little blush cheeks */}
                  <circle cx="192" cy="104" r="5" fill="#f9b9a6" opacity="0.8" />
                  <circle cx="232" cy="104" r="5" fill="#f9b9a6" opacity="0.8" />
                </svg>
              </div>
            </div>
            <svg aria-hidden="true" viewBox="0 0 300 240" className="tp-basket__front">
              <path
                d="M116 145 C118 180 126 214 138 232 L286 232 C298 214 306 180 308 145 A96 12 0 0 1 116 145 Z"
                className="tp-basket__body"
              />
              <path d="M121 178 Q212 197 303 178 M127 206 Q212 223 297 206" className="tp-basket__weave" />
              <path
                d="M150 164 L158 230 M182 168 L185 232 M212 169 V232 M242 168 L239 232 M274 164 L266 230"
                className="tp-basket__weave tp-basket__weave--stakes"
              />
              <path d="M116 145 A96 12 0 0 0 308 145" className="tp-basket__rim-line" />
              <path d="M116 145 A96 12 0 0 0 308 145" className="tp-basket__rim" />
            </svg>
          </div>
        </div>

        {/* Explore Navigation Column */}
        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7 md:row-span-2 md:row-start-1">
          <h2 className="font-scrawl text-lg text-honey">Explore</h2>
          <ul className="mt-4 space-y-2.5 font-sans">
            <li>
              <Link className="font-semibold text-milk/90 underline-offset-4 hover:text-honey hover:underline" to="/puppies">
                Available puppies
              </Link>
            </li>
            <li>
              <Link className="font-semibold text-milk/90 underline-offset-4 hover:text-honey hover:underline" to="/gone-home">
                Gone home
              </Link>
            </li>
            <li>
              <Link className="font-semibold text-milk/90 underline-offset-4 hover:text-honey hover:underline" to="/happy-families">
                Happy families
              </Link>
            </li>
            <li>
              <Link className="font-semibold text-milk/90 underline-offset-4 hover:text-honey hover:underline" to="/how-it-works">
                How it works
              </Link>
            </li>
            <li>
              <Link className="font-semibold text-milk/90 underline-offset-4 hover:text-honey hover:underline" to="/how-it-works#delivery">
                Delivery &amp; collection
              </Link>
            </li>
            <li>
              <Link className="font-semibold text-milk/90 underline-offset-4 hover:text-honey hover:underline" to="/faq">
                FAQ
              </Link>
            </li>
            <li>
              <Link className="font-semibold text-milk/90 underline-offset-4 hover:text-honey hover:underline" to="/contact">
                Visit &amp; contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Say hello Column */}
        <div className="md:col-span-3 md:row-span-2 md:row-start-1">
          <h2 className="font-scrawl text-lg text-honey">Say hello</h2>
          <ul className="mt-4 space-y-2.5 text-milk/90 font-sans">
            <li>
              <a
                className="font-semibold hover:text-honey"
                href={siteConfig.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp {siteConfig.phone}
              </a>
            </li>
            <li>
              <a className="break-all hover:text-honey" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </li>
            <li>{siteConfig.address}</li>
          </ul>

          {/* Social Media Pill Buttons */}
          <ul className="mt-6 flex flex-wrap gap-3 font-sans" aria-label="Social media">
            <li>
              <a
                href="https://www.instagram.com/teddypups.worldwide/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center rounded-full border-2 border-milk/30 px-4 text-sm font-semibold hover:border-honey hover:text-honey transition-colors"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/@teddypupsuae"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center rounded-full border-2 border-milk/30 px-4 text-sm font-semibold hover:border-honey hover:text-honey transition-colors"
              >
                TikTok
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61567496944539"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center rounded-full border-2 border-milk/30 px-4 text-sm font-semibold hover:border-honey hover:text-honey transition-colors"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Bar with Logo & Tagline */}
      <div className="gutter relative mx-auto mt-16 flex max-w-[110rem] flex-col items-start justify-between gap-4 border-t border-milk/15 pt-6 text-sm text-milk/60 md:flex-row md:items-center">
        <span className="flex items-center gap-3">
          <img
            alt="TeddyPups Logo"
            loading="lazy"
            width="36"
            height="36"
            className="size-9 rounded-full object-cover"
            src="https://puppy.instabizweb.com/brand/logo.png"
          />
          © 2026 TeddyPups U.A.E.
        </span>
        <span className="font-scrawl text-base text-honey/80">
          every puppy is family
        </span>
      </div>
    </footer>
  );
}
