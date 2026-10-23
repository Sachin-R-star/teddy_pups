import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import TeddyMascot from '../components/TeddyMascot';

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState('local'); // 'local' | 'imported'
  const [flightT, setFlightT] = useState(0.5);
  const deliverySectionRef = useRef(null);

  // Flight airplane scroll animation along route arc (Item 23)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (deliverySectionRef.current) {
            const rect = deliverySectionRef.current.getBoundingClientRect();
            const windowH = window.innerHeight;
            const totalDist = rect.height + windowH * 0.4;
            const currentDist = windowH * 0.7 - rect.top;
            const t = Math.max(0.05, Math.min(0.95, currentDist / totalDist));
            setFlightT(t);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute flight plane position along Bezier curve M40 250 C 170 40, 470 20, 620 168
  const getFlightCoords = (t) => {
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;
    const uuu = uu * u;
    const ttt = tt * t;

    const x = uuu * 40 + 3 * uu * t * 170 + 3 * u * tt * 470 + ttt * 620;
    const y = uuu * 250 + 3 * uu * t * 40 + 3 * u * tt * 20 + ttt * 168;

    const dx = 3 * uu * (170 - 40) + 6 * u * t * (470 - 170) + 3 * tt * (620 - 470);
    const dy = 3 * uu * (40 - 250) + 6 * u * t * (20 - 40) + 3 * tt * (168 - 20);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    return { x: Math.round(x), y: Math.round(y), angle: Math.round(angle) };
  };

  const planeCoords = getFlightCoords(flightT);

  return (
    <div data-page="how" className="tp-page">
      <section
        data-pup-scene="true"
        data-tone="light"
        className="tp-scene"
        style={{ "--sky-top": "#fffbf3", "--sky-bottom": "#f6cc85" }}
        aria-labelledby="how-title"
      >
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <header className="grid gap-8 md:grid-cols-12 md:items-end">
            <h1 id="how-title" className="font-plush text-giant md:col-span-7">How it works</h1>
            <p className="text-lede text-[var(--ink-soft)] md:col-span-5 md:pb-4">
              Whether you choose to visit us locally or order a premium breed from overseas, TeddyPups is here to make the experience unforgettable.
            </p>
          </header>

          <nav aria-label="On this page" className="mt-10 flex flex-wrap gap-2">
            <a href="#two-ways" className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft">
              <span className="font-plush text-toffee">1</span> Two ways home
            </a>
            <a href="#promise" className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft">
              <span className="font-plush text-toffee">2</span> Our premium puppy promise
            </a>
            <a href="#delivery" className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft">
              <span className="font-plush text-toffee">3</span> Delivery &amp; collection
            </a>
            <a href="#why" className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft">
              <span className="font-plush text-toffee">4</span> Why choose us
            </a>
          </nav>

          {/* TWO WAYS SECTION */}
          <div id="two-ways" className="mt-16">
            <section className="tp-journeys" aria-labelledby="two-ways-title">
              <div className="tp-journeys__top">
                <div>
                  <p className="font-scrawl tp-journeys__kicker">choose your way</p>
                  <h2 id="two-ways-title" className="font-plush text-big">Two ways home</h2>
                </div>

                <div className="tp-journeys__pick">
                  {/* Interactive Switch Tab between In Dubai & Imported */}
                  <div
                    role="tablist"
                    aria-label="Ways to bring your puppy home"
                    className="tp-switch"
                    style={{ "--at": activeTab === 'local' ? "0" : "1", "--n": "2" }}
                  >
                    <span aria-hidden="true" className="tp-switch__thumb"></span>
                    <button
                      type="button"
                      role="tab"
                      id="tab-local"
                      aria-selected={activeTab === 'local'}
                      tabIndex={0}
                      className="tp-switch__tab"
                      onClick={() => setActiveTab('local')}
                    >
                      <span className="font-plush tp-switch__label">In Dubai</span>
                      <span className="tp-switch__hint">meet in person</span>
                    </button>
                    <button
                      type="button"
                      role="tab"
                      id="tab-imported"
                      aria-selected={activeTab === 'imported'}
                      tabIndex={0}
                      className="tp-switch__tab"
                      onClick={() => setActiveTab('imported')}
                    >
                      <span className="font-plush tp-switch__label">Imported</span>
                      <span className="tp-switch__hint">order upon request</span>
                    </button>
                  </div>

                  {/* Welcoming Interactive Puppy Mascot (Items 21, 22) */}
                  <div className="pup-buddy tp-journeys__teddy" style={{ width: 'clamp(9rem, 14vw, 13rem)', display: 'block' }}>
                    <TeddyMascot
                      pose={activeTab === 'local' ? "sit" : "peek"}
                      facing="right"
                      interactive={true}
                    />
                  </div>
                </div>
              </div>

              {/* LOCAL PANEL */}
              {activeTab === 'local' && (
                <div role="tabpanel" id="panel-local" aria-labelledby="tab-local" className="tp-journey">
                  <div className="tp-journey__head">
                    <div>
                      <h3 className="font-plush tp-journey__title">Meet your puppy in person</h3>
                      <p className="text-lede mt-4 text-[var(--ink-soft)]">
                        Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face. We source healthy, well-socialized puppies from trusted local breeders, ensuring they're raised with care, proper nutrition, and veterinary checks.
                      </p>
                    </div>
                    <div aria-hidden="true" className="tp-postcard">
                      <span className="tp-postcard__sun"></span>
                      <svg viewBox="0 0 300 120" className="tp-postcard__city" aria-hidden="true">
                        <path d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                      <span className="font-scrawl tp-postcard__to tp-postcard__to--left">Downtown Dubai</span>
                    </div>
                  </div>

                  <ol className="tp-steps">
                    <li className="tp-step" style={{ "--i": "0", "--tint": "#fbe3b4" }}>
                      <span aria-hidden="true" className="tp-step__icon">
                        <svg viewBox="0 0 48 48">
                          <circle cx="21" cy="21" r="12" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></circle>
                          <path d="m30 30 10 10" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M21 27c-3-2-4.4-3.6-4.4-5.2a2.2 2.2 0 0 1 4.4-.4 2.2 2.2 0 0 1 4.4.4c0 1.6-1.4 3.2-4.4 5.2z" fill="currentColor"></path>
                        </svg>
                      </span>
                      <span className="tp-step__num font-plush">Step 1</span>
                      <h4 className="font-plush-text tp-step__title">Explore our puppies</h4>
                      <p className="tp-step__text">Browse our website to view the available puppies. Each listing includes photos, breed details, age, and health information.</p>
                    </li>

                    <li className="tp-step" style={{ "--i": "1", "--tint": "#fde6de" }}>
                      <span aria-hidden="true" className="tp-step__icon">
                        <svg viewBox="0 0 48 48">
                          <path d="M24 40C11 31 6 24.5 6 17.8 6 12.4 10.2 8 15.4 8c3.7 0 6.8 2.1 8.6 5.3C25.8 10.1 28.9 8 32.6 8 37.8 8 42 12.4 42 17.8 42 24.5 37 31 24 40z" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="m17 22 5 5 9-10" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </span>
                      <span className="tp-step__num font-plush">Step 2</span>
                      <h4 className="font-plush-text tp-step__title">Choose your puppy</h4>
                      <p className="tp-step__text">Once you find a puppy you love, open their profile for more information or to enquire further. You can also reach out to us directly.</p>
                    </li>

                    <li className="tp-step" style={{ "--i": "2", "--tint": "#e3f0fb" }}>
                      <span aria-hidden="true" className="tp-step__icon">
                        <svg viewBox="0 0 48 48">
                          <path d="M14 18c-3-6-1-10 3-10s5 4 4 8M34 18c3-6 1-10-3-10s-5 4-4 8" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
                          <ellipse cx="24" cy="27" rx="13" ry="12" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></ellipse>
                          <circle cx="19.5" cy="25" r="1.6" fill="currentColor"></circle>
                          <circle cx="28.5" cy="25" r="1.6" fill="currentColor"></circle>
                          <path d="M22 31h4l-2 2z" fill="currentColor" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </span>
                      <span className="tp-step__num font-plush">Step 3</span>
                      <h4 className="font-plush-text tp-step__title">Meet before you choose</h4>
                      <p className="tp-step__text">Spend time bonding with the puppies in our relaxed Downtown Dubai showroom before making your decision.</p>
                    </li>

                    <li className="tp-step" style={{ "--i": "3", "--tint": "#e6f2df" }}>
                      <span aria-hidden="true" className="tp-step__icon">
                        <svg viewBox="0 0 48 48">
                          <path d="M5 30V18h22v12M27 22h8l6 6v2H27" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M5 30h36" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
                          <circle cx="13" cy="33" r="3.4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></circle>
                          <circle cx="34" cy="33" r="3.4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></circle>
                        </svg>
                      </span>
                      <span className="tp-step__num font-plush">Step 4</span>
                      <h4 className="font-plush-text tp-step__title">Pick-up or delivery</h4>
                      <p className="tp-step__text">Pick up your puppy from us or have them delivered safely to your home anywhere within the UAE.</p>
                    </li>
                  </ol>
                </div>
              )}

              {/* IMPORTED PANEL */}
              {activeTab === 'imported' && (
                <div role="tabpanel" id="panel-imported" aria-labelledby="tab-imported" className="tp-journey">
                  <div className="tp-journey__head">
                    <div>
                      <h3 className="font-plush tp-journey__title">Order upon request</h3>
                      <p className="text-lede mt-4 text-[var(--ink-soft)]">
                        Looking for a truly exceptional companion? Our Order Upon Request service gives you access to some of the world's most sought-after teacup breeds — ethically sourced from the most reputable, certified breeders across Europe, Korea, and beyond.
                      </p>
                      <p className="font-scrawl mt-4 text-toffee-ink">
                        From Korean teacup poodles to rare Maltese, Pom, and Yorkie lines, we bring the world's finest puppies to Dubai, just for you.
                      </p>
                    </div>
                    <div aria-hidden="true" className="tp-postcard tp-postcard--sky">
                      <svg viewBox="0 0 320 150" className="tp-postcard__route" preserveAspectRatio="none">
                        <path d="M28 128C90 20 230 20 292 118"></path>
                      </svg>
                      <svg viewBox="0 0 64 40" className="tp-postcard__plane" aria-hidden="true">
                        <path d="M4 22l20-2 12-14h6l-6 14 14-1 6-7h4l-3 10 3 10h-4l-6-7-14-1 6 14h-6L24 24 4 22z" fill="#fffdf8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                      <span className="font-scrawl tp-postcard__from">Europe · Korea</span>
                      <span className="font-scrawl tp-postcard__to">Dubai</span>
                    </div>
                  </div>

                  <ol className="tp-steps">
                    <li className="tp-step" style={{ "--i": "0", "--tint": "#fbe3b4" }}>
                      <span aria-hidden="true" className="tp-step__icon">
                        <svg viewBox="0 0 48 48">
                          <rect x="7" y="10" width="34" height="30" rx="5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></rect>
                          <path d="M7 19h34M16 6v8M32 6v8" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="m17 29 5 5 9-9" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </span>
                      <span className="tp-step__num font-plush">Step 1</span>
                      <h4 className="font-plush-text tp-step__title">Reserve your puppy</h4>
                      <p className="tp-step__text">Browse our selection of available breeds and place a reservation for the teacup puppy that captures your heart.</p>
                    </li>

                    <li className="tp-step" style={{ "--i": "1", "--tint": "#fde6de" }}>
                      <span aria-hidden="true" className="tp-step__icon">
                        <svg viewBox="0 0 48 48">
                          <path d="M6 12a5 5 0 0 1 5-5h16a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5h-9l-6 5v-5h-1a5 5 0 0 1-5-5z" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M36 17h1a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5h-1v5l-6-5h-6a5 5 0 0 1-4-2" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </span>
                      <span className="tp-step__num font-plush">Step 2</span>
                      <h4 className="font-plush-text tp-step__title">Personalized consultation</h4>
                      <p className="tp-step__text">Once your reservation is confirmed, we work closely with you to finalize details and provide updates on your puppy's journey.</p>
                    </li>

                    <li className="tp-step" style={{ "--i": "2", "--tint": "#e3f0fb" }}>
                      <span aria-hidden="true" className="tp-step__icon">
                        <svg viewBox="0 0 48 48">
                          <path transform="matrix(-1 0 0 1 48 0)" d="M4 27l13-1.5 8-10h4l-4 9.5 9-.8 4-4.7h3l-2 6.6 2 6.6h-3l-4-4.7-9-.8 4 9.5h-4l-8-10L4 29z" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </span>
                      <span className="tp-step__num font-plush">Step 3</span>
                      <h4 className="font-plush-text tp-step__title">Import and arrival</h4>
                      <p className="tp-step__text">We manage all aspects of the import process, including health checks, travel arrangements, and necessary documentation.</p>
                    </li>

                    <li className="tp-step" style={{ "--i": "3", "--tint": "#e6f2df" }}>
                      <span aria-hidden="true" className="tp-step__icon">
                        <svg viewBox="0 0 48 48">
                          <path d="M6 23 24 8l18 15M11 19v21h26V19" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M24 35c-4.6-3.2-6.8-5.7-6.8-8.2a3.4 3.4 0 0 1 6.8-.8 3.4 3.4 0 0 1 6.8.8c0 2.5-2.2 5-6.8 8.2z" fill="currentColor"></path>
                        </svg>
                      </span>
                      <span className="tp-step__num font-plush">Step 4</span>
                      <h4 className="font-plush-text tp-step__title">Welcome home</h4>
                      <p className="tp-step__text">Upon arrival, we provide support to help your new puppy acclimate to their new environment happily.</p>
                    </li>
                  </ol>
                </div>
              )}
            </section>
          </div>

          {/* PROMISE SECTION */}
          <section id="promise" aria-labelledby="promise-title" className="tp-paper mt-24 -rotate-[0.6deg]">
            <p aria-hidden="true" className="font-scrawl text-lg text-toffee-ink">puppy passport</p>
            <h2 id="promise-title" className="font-plush text-huge mt-1 max-w-[16ch]">Our premium puppy promise</h2>
            <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <li className="tp-entry" style={{ "--ink-stamp": "#a24a1a", "--tilt": "-8deg", "--i": "0" }}>
                <span className="tp-stamp tp-stamp--round">
                  <svg viewBox="0 0 64 64" className="tp-stamp__icon" aria-hidden="true">
                    <path d="M32 54C16 43 8 34 8 24c0-7 5.4-12 12-12 5 0 9 3 12 7 3-4 7-7 12-7 6.6 0 12 5 12 12 0 10-8 19-24 30z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M22 30h7l3-7 4 13 3-6h7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <span className="tp-stamp__title font-plush">Hand-selected breeders</span>
                </span>
                <p className="tp-entry__text">We work only with breeders who uphold the highest ethical and health standards.</p>
              </li>

              <li className="tp-entry" style={{ "--ink-stamp": "#1f6b45", "--tilt": "5deg", "--i": "1" }}>
                <span className="tp-stamp tp-stamp--ticket">
                  <svg viewBox="0 0 64 64" className="tp-stamp__icon" aria-hidden="true">
                    <path d="M6 36l22-3 12-17h6l-6 17 12-1 6-7h3l-2 10 2 10h-3l-6-7-12-1 6 17h-6L28 37 6 36z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M8 50c10 4 20 4 30 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 7"></path>
                  </svg>
                  <span className="tp-stamp__title font-plush">Full transparency</span>
                </span>
                <p className="tp-entry__text">Photos, videos, and health certificates are shared before your puppy travels.</p>
              </li>

              <li className="tp-entry" style={{ "--ink-stamp": "#5a3a28", "--tilt": "-4deg", "--i": "2" }}>
                <span className="tp-stamp tp-stamp--oval">
                  <svg viewBox="0 0 64 64" className="tp-stamp__icon" aria-hidden="true">
                    <path d="M10 14h44v28H30l-12 10v-10h-8z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M22 28h0M32 28h0M42 28h0" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <span className="tp-stamp__title font-plush">Safe, stress-free delivery</span>
                </span>
                <p className="tp-entry__text">We handle every detail of the import process, so your puppy arrives happy, healthy, and ready to love you.</p>
              </li>
            </ul>
          </section>

          {/* DELIVERY & COLLECTION SECTION - With Animated Flight Plane (Item 23) */}
          <section
            ref={deliverySectionRef}
            id="delivery"
            aria-labelledby="delivery-title"
            className="mt-24 grid items-center gap-10 lg:grid-cols-12"
          >
            <div className="lg:col-span-6">
              <h2 id="delivery-title" className="font-plush text-huge">Delivery &amp; collection</h2>
              <p className="text-lede mt-5 text-[var(--ink-soft)]">
                From a same-day visit in Downtown Dubai to a flight from Korea, every puppy travels comfortably and arrives safely.
              </p>
              <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                <li>
                  <h3 className="font-plush-text text-[1.3rem] font-bold leading-snug">Take your puppy home the same day</h3>
                  <p className="mt-1.5 text-[var(--ink-soft)]">Local puppies are available immediately — visit, fall in love, and go home together.</p>
                </li>
                <li>
                  <h3 className="font-plush-text text-[1.3rem] font-bold leading-snug">Delivery within Dubai</h3>
                  <p className="mt-1.5 text-[var(--ink-soft)]">Prefer to stay home? We deliver your puppy to your door within Dubai, safely and comfortably.</p>
                </li>
                <li>
                  <h3 className="font-plush-text text-[1.3rem] font-bold leading-snug">Safe international cargo</h3>
                  <p className="mt-1.5 text-[var(--ink-soft)]">We handle all the paperwork and ensure comfortable travel so your puppy arrives happy and stress-free.</p>
                </li>
                <li>
                  <h3 className="font-plush-text text-[1.3rem] font-bold leading-snug">Worldwide delivery</h3>
                  <p className="mt-1.5 text-[var(--ink-soft)]">We safely deliver puppies to loving homes all around the world with certified travel partners.</p>
                </li>
              </ul>
            </div>

            <div className="relative h-[clamp(14rem,30vw,22rem)] lg:col-span-6">
              <svg viewBox="0 0 300 120" className="absolute inset-x-0 bottom-0 w-full text-cocoa/25" aria-hidden="true">
                <path d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>

              <div className="tp-flight">
                <svg viewBox="0 0 660 300" role="img" aria-label="A plane flying puppies from Korea to Dubai">
                  <defs>
                    <clipPath id="_R_1albsnkivb_">
                      <circle r="25"></circle>
                    </clipPath>
                  </defs>
                  <path d="M40 250 C 170 40, 470 20, 620 168" className="tp-flight__route"></path>
                  <circle cx="40" cy="250" r="7" className="tp-flight__dot"></circle>
                  <circle cx="620" cy="168" r="7" className="tp-flight__dot"></circle>
                  <text x="40" y="284" textAnchor="middle" className="tp-flight__label">Korea</text>
                  <text x="620" y="202" textAnchor="middle" className="tp-flight__label">Dubai</text>

                  {/* Flight Plane animating along the route arc */}
                  <g transform={`translate(${planeCoords.x} ${planeCoords.y}) rotate(${planeCoords.angle})`} style={{ transition: 'transform 0.1s linear' }}>
                    <g transform="translate(-126 -78)">
                      <path d="M28 60 L8 26 L34 26 L60 54 Z" className="tp-flight__wing"></path>
                      <path d="M108 112 L142 156 L172 156 L158 112 Z" className="tp-flight__wing tp-flight__wing--far"></path>
                      <path d="M20 80 C20 52 52 44 80 44 L168 44 C200 44 224 60 232 80 C224 100 200 112 168 112 L80 112 C52 112 20 104 20 80 Z" className="tp-flight__body"></path>
                      <path d="M104 44 L138 2 L168 2 L154 44 Z" className="tp-flight__wing"></path>
                      <path d="M206 64 C215 67 221 73 224 80" className="tp-flight__line"></path>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </section>

          {/* WHY CHOOSE US SECTION - Duplicate flight plane icon removed and replaced with authentic Globe icon (Item 24) */}
          <section id="why" aria-labelledby="why-title" className="mt-24 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="why-title" className="font-plush text-huge">Why choose us</h2>
              <p className="text-lede mt-6 text-[var(--ink-soft)]">
                We're here to help you find a new family member. From the moment you visit our site to the joyful day your puppy arrives at your door, we're with you every step of the way.
              </p>
            </div>

            <ul className="space-y-8 lg:col-span-6 lg:col-start-7">
              {/* Item 24: Replaced duplicate airplane icon with International Shipping Globe Icon */}
              <li className="flex gap-5">
                <svg viewBox="0 0 64 64" className="size-14 shrink-0 text-toffee-deep" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="32" cy="32" r="22"></circle>
                  <path d="M10 32h44"></path>
                  <path d="M32 10c-8 8-8 36 0 44"></path>
                  <path d="M32 10c8 8 8 36 0 44"></path>
                </svg>
                <div>
                  <h3 className="font-plush text-[1.7rem]">International cargo</h3>
                  <p className="mt-2 text-[var(--ink-soft)]">
                    We safely deliver puppies to loving homes all around the world. Our trusted international cargo partners ensure your new furry friend travels comfortably and arrives safely, no matter the distance.
                  </p>
                </div>
              </li>

              <li className="flex gap-5">
                <svg viewBox="0 0 64 64" className="size-14 shrink-0 text-toffee-deep" aria-hidden="true">
                  <path d="M10 14h44v28H30l-12 10v-10h-8z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M22 28h0M32 28h0M42 28h0" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <div>
                  <h3 className="font-plush text-[1.7rem]">Support 24/7</h3>
                  <p className="mt-2 text-[var(--ink-soft)]">
                    Our team is available 24/7 to answer your questions and assist you through every step of the adoption process. From choosing your puppy to post-delivery support — we're just a message away.
                  </p>
                </div>
              </li>

              <li className="flex gap-5">
                <svg viewBox="0 0 64 64" className="size-14 shrink-0 text-toffee-deep" aria-hidden="true">
                  <path d="M32 54C16 43 8 34 8 24c0-7 5.4-12 12-12 5 0 9 3 12 7 3-4 7-7 12-7 6.6 0 12 5 12 12 0 10-8 19-24 30z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M22 30h7l3-7 4 13 3-6h7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <div>
                  <h3 className="font-plush text-[1.7rem]">Health guarantee</h3>
                  <p className="mt-2 text-[var(--ink-soft)]">
                    All our puppies come with a verified health certificate from licensed vets. We ensure every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          {/* CALL TO ACTION BOARD */}
          <section aria-labelledby="care-title" className="tp-board mt-24 grid items-center gap-8 md:grid-cols-[1fr_auto] md:!p-12">
            <div>
              <h2 id="care-title" className="font-plush text-big">Unique and high quality puppies</h2>
              <p className="text-lede measure mt-5 text-cocoa-soft">
                When you choose TeddyPups, you can trust that you're getting a puppy of the highest quality. We also provide guidance and support to new pet owners, offering advice on training, nutrition, and general care to ensure a smooth transition for you and your new furry friend.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I&#x27;d%20love%20to%20know%20more%20about%20your%20puppies." target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                  Ask us on WhatsApp
                </a>
                <Link className="btn btn-ghost" to="/puppies">See available puppies</Link>
              </div>
            </div>

            <div className="mx-auto w-48 md:w-56" style={{ display: 'block' }}>
              <TeddyMascot pose="hop" facing="left" interactive={true} />
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
