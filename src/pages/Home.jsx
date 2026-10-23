import React, { useState, useEffect, useRef } from 'react';
import TeddyMascot from '../components/TeddyMascot';
import { Link } from 'react-router-dom';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDir, setScrollDir] = useState('down');
  const [hoveredSeat, setHoveredSeat] = useState(null);
  const [flightT, setFlightT] = useState(0.55);
  const [isHouseDoorOpen, setIsHouseDoorOpen] = useState(false);
  const [hallProgress, setHallProgress] = useState(0);
  const [hallMascotX, setHallMascotX] = useState(35);
  const [hallFacing, setHallFacing] = useState('right');

  const lastScrollY = useRef(0);
  const meetSectionRef = useRef(null);
  const meetTrackRef = useRef(null);
  const pathsSectionRef = useRef(null);
  const houseRef = useRef(null);

  // Scroll listener for scroll-direction, flight progress, doors treadmill, and hero state
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setScrollY(currentY);

          // Track scroll direction for mascot facing (User Request Item 3, 6)
          if (Math.abs(currentY - lastScrollY.current) > 3) {
            setScrollDir(currentY > lastScrollY.current ? 'right' : 'left');
            lastScrollY.current = currentY;
          }

          // 1. Scene 2 (Meet the pups) Treadmill Horizontal Scroll (User Request Item 3, 4)
          if (meetSectionRef.current && meetTrackRef.current) {
            const rect = meetSectionRef.current.getBoundingClientRect();
            const windowH = window.innerHeight;
            // Progress from 0 when section enters to 1 when scrolling past
            const totalRange = rect.height + windowH * 0.4;
            const currentDist = windowH * 0.7 - rect.top;
            const progress = Math.max(0, Math.min(1, currentDist / totalRange));
            setHallProgress(progress);

            const trackWidth = meetTrackRef.current.scrollWidth;
            const containerWidth = meetSectionRef.current.clientWidth || window.innerWidth;
            const maxScroll = Math.max(0, trackWidth - containerWidth + 60);
            meetTrackRef.current.style.transform = `translateX(-${progress * maxScroll}px)`;

            // Move the hallway puppy across the floor as doors scroll
            setHallMascotX(15 + progress * 68);
          }

          // 2. Scene 3 (Two ways - Flight Plane animation) (User Request Item 5)
          if (pathsSectionRef.current) {
            const rect = pathsSectionRef.current.getBoundingClientRect();
            const windowH = window.innerHeight;
            const totalDist = rect.height + windowH * 0.5;
            const currentDist = windowH * 0.8 - rect.top;
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

  // Scene 8 (Home ready) House Door Outward Open via IntersectionObserver (User Request Item 7)
  useEffect(() => {
    const el = houseRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
          setIsHouseDoorOpen(true);
        }
      },
      { threshold: [0.1, 0.25, 0.5] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Interactive mouse movement over the hallway doors track (User Request Item 3)
  const handleHallMouseMove = (e) => {
    if (!meetSectionRef.current) return;
    const rect = meetSectionRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const pct = Math.max(8, Math.min(92, (mouseX / rect.width) * 100));
    setHallFacing(pct >= hallMascotX ? 'right' : 'left');
    setHallMascotX(pct);
  };

  // Compute flight plane coordinates & rotation along Bezier curve M40 250 C 170 40, 470 20, 620 168
  const getFlightCoords = (t) => {
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;
    const uuu = uu * u;
    const ttt = tt * t;

    // P0(40, 250), P1(170, 40), P2(470, 20), P3(620, 168)
    const x = uuu * 40 + 3 * uu * t * 170 + 3 * u * tt * 470 + ttt * 620;
    const y = uuu * 250 + 3 * uu * t * 40 + 3 * u * tt * 20 + ttt * 168;

    // Tangent derivative for banking rotation angle
    const dx = 3 * uu * (170 - 40) + 6 * u * t * (470 - 170) + 3 * tt * (620 - 470);
    const dy = 3 * uu * (40 - 250) + 6 * u * t * (20 - 40) + 3 * tt * (168 - 20);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    return { x: Math.round(x), y: Math.round(y), angle: Math.round(angle) };
  };

  const planeCoords = getFlightCoords(flightT);
  const isHeroHere = scrollY < 60;

  return (
    <div data-page="home" className="tp-page">
      {/* 1. HERO SCENE */}
      <section
        data-pup-scene="true"
        data-tone="light"
        className="tp-scene tp-hero"
        data-here={isHeroHere ? "true" : "false"}
        style={{ "--sky-top": "#fffdf8", "--sky-bottom": "#fff1d8", "--quilt": "#fff1d8" }}
        aria-labelledby="hero-title"
      >
        <span aria-hidden="true" className="tp-hero__sun"></span>
        <div className="tp-hero__copy gutter">
          <p className="tp-hero__note font-scrawl">
            every puppy is family
            <svg viewBox="0 0 220 24" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full text-toffee" aria-hidden="true">
              <path d="M4 14c18-10 30 8 48-1s28-9 46 0 30 8 48-1 30-9 48 0 18 2 22 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </p>
          <h1 id="hero-title" className="tp-hero__title font-plush">
            <span className="tp-hero__line">Premium teacup</span>
            <span className="tp-hero__line tp-hero__line--2">puppies in Dubai</span>
          </h1>
          <p className="tp-hero__lede">
            Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
          </p>
          <div className="tp-hero__actions">
            <Link className="btn btn-primary" to="/puppies">View available puppies</Link>
            <a href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I&#x27;d%20love%20to%20know%20more%20about%20your%20puppies." target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Enquire on WhatsApp
            </a>
          </div>
        </div>

        <div className="tp-hero__stage">
          <ul className="tp-lineup" aria-label="Some of the puppies in our showroom">
            <li className="tp-lineup__seat" style={{ "--x": "9%", "--w": "8.6rem", "--peek": "0.62", "--tilt": "-5deg", "--i": "0" }}>
              <Link className="tp-lineup__pup" data-pup-friend="true" aria-label="Meet Max, Maltipoo" to="/puppies/maltipoo-max-male" onMouseEnter={() => setHoveredSeat(0)} onMouseLeave={() => setHoveredSeat(null)}>
                <span className="tp-lineup__photo">
                  <img alt="Max, male Maltipoo puppy" fetchPriority="high" loading="eager" decoding="async" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, objectFit: "cover", objectPosition: "53.8% 44.3%" }} src="https://puppy.instabizweb.com/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp" />
                </span>
              </Link>
            </li>
            <li className="tp-lineup__seat" style={{ "--x": "22.5%", "--w": "10.4rem", "--peek": "0.8", "--tilt": "3deg", "--i": "1" }}>
              <Link className="tp-lineup__pup" data-pup-friend="true" aria-label="Meet Korean Teacup Maltipoo, Korean Teacup Maltipoo" to="/puppies/korean-teacup-maltipoo-female" onMouseEnter={() => setHoveredSeat(1)} onMouseLeave={() => setHoveredSeat(null)}>
                <span className="tp-lineup__photo">
                  <img alt="Female Korean Teacup Maltipoo puppy" fetchPriority="high" loading="eager" decoding="async" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, objectFit: "cover", objectPosition: "52.5% 42.6%" }} src="https://puppy.instabizweb.com/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg" />
                </span>
              </Link>
            </li>
            <li className="tp-lineup__seat" style={{ "--x": "35%", "--w": "9.2rem", "--peek": "0.7", "--tilt": "-2deg", "--i": "2" }}>
              <Link className="tp-lineup__pup" data-pup-friend="true" aria-label="Meet Korean Teacup Poodle, Korean Teacup Poodle" to="/puppies/korean-teacup-poodle-female" onMouseEnter={() => setHoveredSeat(2)} onMouseLeave={() => setHoveredSeat(null)}>
                <span className="tp-lineup__photo">
                  <img alt="Female Korean Teacup Poodle puppy" loading="eager" decoding="async" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, objectFit: "cover", objectPosition: "54.5% 45.7%" }} src="https://puppy.instabizweb.com/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg" />
                </span>
              </Link>
            </li>
            <li className="tp-lineup__seat" style={{ "--x": "65%", "--w": "9.4rem", "--peek": "0.74", "--tilt": "3deg", "--i": "3" }}>
              <Link className="tp-lineup__pup" data-pup-friend="true" aria-label="Meet Maltipoo &amp; Cavapoo, Maltipoo &amp; Cavapoo" to="/puppies/maltipoo-cavapoo-male" onMouseEnter={() => setHoveredSeat(3)} onMouseLeave={() => setHoveredSeat(null)}>
                <span className="tp-lineup__photo">
                  <img alt="Male Maltipoo &amp; Cavapoo puppy" loading="eager" decoding="async" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, objectFit: "cover", objectPosition: "44.7% 29.5%" }} src="https://puppy.instabizweb.com/media/YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg" />
                </span>
              </Link>
            </li>
            <li className="tp-lineup__seat" style={{ "--x": "77.5%", "--w": "10.6rem", "--peek": "0.82", "--tilt": "-3deg", "--i": "4" }}>
              <Link className="tp-lineup__pup" data-pup-friend="true" aria-label="Meet Toy Poodle, Toy Poodle" to="/puppies/toy-poodle-male-female" onMouseEnter={() => setHoveredSeat(4)} onMouseLeave={() => setHoveredSeat(null)}>
                <span className="tp-lineup__photo">
                  <img alt="Toy Poodle puppy" loading="eager" decoding="async" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, objectFit: "cover", objectPosition: "65.4% 44.7%" }} src="https://puppy.instabizweb.com/media/vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg" />
                </span>
              </Link>
            </li>
            <li className="tp-lineup__seat" style={{ "--x": "91%", "--w": "8.4rem", "--peek": "0.6", "--tilt": "4deg", "--i": "5" }}>
              <Link className="tp-lineup__pup" data-pup-friend="true" aria-label="Meet Maltipoo, Maltipoo" to="/puppies/maltipoo-female-2" onMouseEnter={() => setHoveredSeat(5)} onMouseLeave={() => setHoveredSeat(null)}>
                <span className="tp-lineup__photo">
                  <img alt="Female Maltipoo puppy" loading="eager" decoding="async" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, objectFit: "cover", objectPosition: "64.6% 42.3%" }} src="https://puppy.instabizweb.com/media/3WJNmn6VVgVu/732f779474/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg" />
                </span>
              </Link>
            </li>
          </ul>

          <ul aria-hidden="true" className="tp-lineup tp-lineup--tags">
            <li className="tp-lineup__seat" style={{ "--x": "9%", "--w": "8.6rem", "--peek": "0.62", "--tilt": "-5deg", "--i": "0" }}>
              <span className="tp-lineup__ghost" data-tag={hoveredSeat === 0 ? "show" : undefined}>
                <span className="tp-lineup__name font-scrawl" style={{ opacity: hoveredSeat === 0 ? 1 : undefined, transform: hoveredSeat === 0 ? 'translate(var(--tag-x, -50%), -12%)' : undefined }}>Max</span>
              </span>
            </li>
            <li className="tp-lineup__seat" style={{ "--x": "22.5%", "--w": "10.4rem", "--peek": "0.8", "--tilt": "3deg", "--i": "1" }}>
              <span className="tp-lineup__ghost" data-tag={hoveredSeat === 1 ? "show" : undefined}>
                <span className="tp-lineup__name font-scrawl" style={{ opacity: hoveredSeat === 1 ? 1 : undefined, transform: hoveredSeat === 1 ? 'translate(var(--tag-x, -50%), -12%)' : undefined }}>Korean Teacup Maltipoo</span>
              </span>
            </li>
            <li className="tp-lineup__seat" style={{ "--x": "35%", "--w": "9.2rem", "--peek": "0.7", "--tilt": "-2deg", "--i": "2" }}>
              <span className="tp-lineup__ghost" data-tag={hoveredSeat === 2 ? "show" : undefined}>
                <span className="tp-lineup__name font-scrawl" style={{ opacity: hoveredSeat === 2 ? 1 : undefined, transform: hoveredSeat === 2 ? 'translate(var(--tag-x, -50%), -12%)' : undefined }}>Korean Teacup Poodle</span>
              </span>
            </li>
            <li className="tp-lineup__seat" style={{ "--x": "65%", "--w": "9.4rem", "--peek": "0.74", "--tilt": "3deg", "--i": "3" }}>
              <span className="tp-lineup__ghost" data-tag={hoveredSeat === 3 ? "show" : undefined}>
                <span className="tp-lineup__name font-scrawl" style={{ opacity: hoveredSeat === 3 ? 1 : undefined, transform: hoveredSeat === 3 ? 'translate(var(--tag-x, -50%), -12%)' : undefined }}>Maltipoo &amp; Cavapoo</span>
              </span>
            </li>
            <li className="tp-lineup__seat" style={{ "--x": "77.5%", "--w": "10.6rem", "--peek": "0.82", "--tilt": "-3deg", "--i": "4" }}>
              <span className="tp-lineup__ghost" data-tag={hoveredSeat === 4 ? "show" : undefined}>
                <span className="tp-lineup__name font-scrawl" style={{ opacity: hoveredSeat === 4 ? 1 : undefined, transform: hoveredSeat === 4 ? 'translate(var(--tag-x, -50%), -12%)' : undefined }}>Toy Poodle</span>
              </span>
            </li>
            <li className="tp-lineup__seat" style={{ "--x": "91%", "--w": "8.4rem", "--peek": "0.6", "--tilt": "4deg", "--i": "5" }}>
              <span className="tp-lineup__ghost" data-tag={hoveredSeat === 5 ? "show" : undefined}>
                <span className="tp-lineup__name font-scrawl" style={{ opacity: hoveredSeat === 5 ? 1 : undefined, transform: hoveredSeat === 5 ? 'translate(var(--tag-x, -50%), -12%)' : undefined }}>Maltipoo</span>
              </span>
            </li>
          </ul>

          <div
            data-pup-stop="true"
            data-pose="peek"
            data-facing="right"
            className="pup-stop tp-hero__teddy"
          >
            <TeddyMascot pose="peek" facing="right" interactive={true} />
          </div>

          <div aria-hidden="true" className="tp-quilt">
            <svg className="tp-quilt__edge" width="100%" height="40" preserveAspectRatio="none">
              <defs>
                <pattern id="tp-scallop" width="76" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 40V27A38 25 0 0 1 76 27V40Z" style={{ fill: "var(--quilt)" }}></path>
                  <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2a170e" strokeWidth="3"></path>
                  <path d="M11 33A27 19 0 0 1 65 33" fill="none" stroke="#2a170e" strokeWidth="1.6" strokeDasharray="3.5 5.5" strokeLinecap="round" opacity=".42"></path>
                </pattern>
              </defs>
              <rect width="100%" height="40" fill="url(#tp-scallop)"></rect>
            </svg>
          </div>
        </div>
      </section>

      {/* 2. MEET THE PUPS SCENE - Treadmill Doors Track with Walking Mascot */}
      <section
        ref={meetSectionRef}
        data-pup-scene="true"
        data-tone="light"
        className="tp-scene tp-meet"
        style={{ "--sky-top": "#fff1d8", "--sky-bottom": "#fbe3b4" }}
        aria-labelledby="meet-title"
        onMouseMove={handleHallMouseMove}
      >
        <div data-pin-range="true">
          <div className="tp-meet__stage">
            <header className="tp-meet__head gutter">
              <div>
                <h2 id="meet-title" className="font-plush text-huge">Meet the pups</h2>
                <p className="text-lede mt-3 max-w-[44ch] text-[var(--ink-soft)]">Real puppies, real photos, looking for their families right now.</p>
              </div>
              <Link className="btn btn-primary shrink-0" to="/puppies">See all available puppies</Link>
            </header>

            <div className="tp-meet__hall">
              <ol ref={meetTrackRef} className="tp-meet__track" data-treadmill="true" aria-label="Puppies looking for a family">
                <li className="tp-door" data-open="false">
                  <Link className="tp-door__link" style={{ "--door": "#a24a1a" }} to="/puppies/maltipoo-max-male">
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">Max</span>
                      <span className="tp-door__meta">Maltipoo, boy, 3 months, with video</span>
                    </span>
                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <img alt="Max, male Maltipoo puppy" loading="lazy" decoding="async" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, objectFit: "cover", objectPosition: "53.8% 44.3%" }} src="https://puppy.instabizweb.com/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp" />
                      </span>
                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          <svg viewBox="0 0 64 64" className="tp-door__peephole" aria-hidden="true" fill="currentColor">
                            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5z"></path>
                          </svg>
                          <span className="tp-door__knob"></span>
                        </span>
                      </span>
                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </Link>
                </li>

                <li className="tp-door" data-open="false">
                  <Link className="tp-door__link" style={{ "--door": "#5a3a28" }} to="/puppies/korean-teacup-maltipoo-female">
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">Korean Teacup Maltipoo</span>
                      <span className="tp-door__meta">girl, 2 months, with video</span>
                    </span>
                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <img alt="Female Korean Teacup Maltipoo puppy" loading="lazy" decoding="async" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, objectFit: "cover", objectPosition: "52.5% 42.6%" }} src="https://puppy.instabizweb.com/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg" />
                      </span>
                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          <svg viewBox="0 0 64 64" className="tp-door__peephole" aria-hidden="true" fill="currentColor">
                            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.5z"></path>
                          </svg>
                          <span className="tp-door__knob"></span>
                        </span>
                      </span>
                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </Link>
                </li>

                <li className="tp-door" data-open="false">
                  <Link className="tp-door__link" style={{ "--door": "#d4893f" }} to="/puppies/korean-teacup-poodle-female">
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">Korean Teacup Poodle</span>
                      <span className="tp-door__meta">girl, 2 months</span>
                    </span>
                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <img alt="Female Korean Teacup Poodle puppy" loading="lazy" decoding="async" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, objectFit: "cover", objectPosition: "54.5% 45.7%" }} src="https://puppy.instabizweb.com/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg" />
                      </span>
                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          <svg viewBox="0 0 64 64" className="tp-door__peephole" aria-hidden="true" fill="currentColor">
                            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.5z"></path>
                          </svg>
                          <span className="tp-door__knob"></span>
                        </span>
                      </span>
                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </Link>
                </li>

                <li className="tp-door" data-open="false">
                  <Link className="tp-door__link" style={{ "--door": "#b8644a" }} to="/puppies/maltipoo-cavapoo-male">
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">Maltipoo &amp; Cavapoo</span>
                      <span className="tp-door__meta">boy, 3 months &amp; 2 months, with video</span>
                    </span>
                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <img alt="Male Maltipoo &amp; Cavapoo puppy" loading="lazy" decoding="async" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, objectFit: "cover", objectPosition: "44.7% 29.5%" }} src="https://puppy.instabizweb.com/media/YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg" />
                      </span>
                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          <svg viewBox="0 0 64 64" className="tp-door__peephole" aria-hidden="true" fill="currentColor">
                            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.5z"></path>
                          </svg>
                          <span className="tp-door__knob"></span>
                        </span>
                      </span>
                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </Link>
                </li>

                <li className="tp-door" data-open="false">
                  <Link className="tp-door__link" style={{ "--door": "#7a4a2e" }} to="/puppies/toy-poodle-male-female">
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">Toy Poodle</span>
                      <span className="tp-door__meta">boy &amp; girl, 2 months</span>
                    </span>
                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <img alt="Toy Poodle puppy" loading="lazy" decoding="async" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, objectFit: "cover", objectPosition: "65.4% 44.7%" }} src="https://puppy.instabizweb.com/media/vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg" />
                      </span>
                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          <svg viewBox="0 0 64 64" className="tp-door__peephole" aria-hidden="true" fill="currentColor">
                            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.5z"></path>
                          </svg>
                          <span className="tp-door__knob"></span>
                        </span>
                      </span>
                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </Link>
                </li>

                <li className="tp-door" data-open="false">
                  <Link className="tp-door__link" style={{ "--door": "#a24a1a" }} to="/puppies/maltipoo-female-2">
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">Maltipoo</span>
                      <span className="tp-door__meta">girl, 3 months, with video</span>
                    </span>
                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <img alt="Female Maltipoo puppy" loading="lazy" decoding="async" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, objectFit: "cover", objectPosition: "64.6% 42.3%" }} src="https://puppy.instabizweb.com/media/3WJNmn6VVgVu/732f779474/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg" />
                      </span>
                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          <svg viewBox="0 0 64 64" className="tp-door__peephole" aria-hidden="true" fill="currentColor">
                            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.5z"></path>
                          </svg>
                          <span className="tp-door__knob"></span>
                        </span>
                      </span>
                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </Link>
                </li>

                <li className="tp-door" data-open="false">
                  <Link className="tp-door__link" style={{ "--door": "#5a3a28" }} to="/puppies/pomeranian-female">
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">Pomeranian</span>
                      <span className="tp-door__meta">girl, 3 months</span>
                    </span>
                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <img alt="Female Pomeranian puppy" loading="lazy" decoding="async" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, objectFit: "cover", objectPosition: "40.3% 44.3%" }} src="https://puppy.instabizweb.com/media/3yOfnmoyPooH/81e0c7e00c/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg" />
                      </span>
                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          <svg viewBox="0 0 64 64" className="tp-door__peephole" aria-hidden="true" fill="currentColor">
                            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.5z"></path>
                          </svg>
                          <span className="tp-door__knob"></span>
                        </span>
                      </span>
                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </Link>
                </li>

                <li className="tp-door" data-open="false">
                  <Link className="tp-door__link" style={{ "--door": "#d4893f" }} to="/puppies/copper-male">
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">Copper</span>
                      <span className="tp-door__meta">Cavapoo, boy, 2 months</span>
                    </span>
                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <img alt="Copper, male Cavapoo puppy" loading="lazy" decoding="async" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, objectFit: "cover", objectPosition: "43.0% 50.5%" }} src="https://puppy.instabizweb.com/media/O-6w4FYqE10j/be76f399cc/b942a5_bb73ebbb952047988f944f3a8e3052bd-mv2.jpg" />
                      </span>
                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          <svg viewBox="0 0 64 64" className="tp-door__peephole" aria-hidden="true" fill="currentColor">
                            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.5z"></path>
                          </svg>
                          <span className="tp-door__knob"></span>
                        </span>
                      </span>
                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </Link>
                </li>

                <li className="tp-door" data-open="false">
                  <Link className="tp-door__link" style={{ "--door": "#b8644a" }} to="/puppies/shitzu-female">
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">Shih Tzu</span>
                      <span className="tp-door__meta">girl, 2 months</span>
                    </span>
                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <img alt="Female Shih Tzu puppy" loading="lazy" decoding="async" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, objectFit: "cover", objectPosition: "44.8% 42.5%" }} src="https://puppy.instabizweb.com/media/qNrTCSrsYyzY/168fa8c4ff/b942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.jpeg" />
                      </span>
                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          <svg viewBox="0 0 64 64" className="tp-door__peephole" aria-hidden="true" fill="currentColor">
                            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.5z"></path>
                          </svg>
                          <span className="tp-door__knob"></span>
                        </span>
                      </span>
                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </Link>
                </li>

                <li className="tp-door" data-open="false">
                  <Link className="tp-door__link" style={{ "--door": "#7a4a2e" }} to="/puppies/shitzu-male">
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">Shih Tzu</span>
                      <span className="tp-door__meta">boy, 2 months</span>
                    </span>
                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <img alt="Male Shih Tzu puppy" loading="lazy" decoding="async" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, objectFit: "cover", objectPosition: "40.3% 43.6%" }} src="https://puppy.instabizweb.com/media/crgs9ih6as_M/e37bafb1bf/b942a5_344e49c6c34940d2b09a3ddd5c2e3234-mv2.jpg" />
                      </span>
                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          <svg viewBox="0 0 64 64" className="tp-door__peephole" aria-hidden="true" fill="currentColor">
                            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.5z"></path>
                          </svg>
                          <span className="tp-door__knob"></span>
                        </span>
                      </span>
                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </Link></li>

                {/* "Meet them all" Door Card */}
                <li className="tp-door tp-door--all" data-open="true">
                  <Link className="tp-door__link" to="/puppies">
                    <span className="tp-door__frame tp-door__frame--all">
                      <span className="font-plush tp-door__all">Meet them all</span>
                    </span>
                  </Link>
                </li>
              </ol>

              {/* Wooden Floor */}
              <div aria-hidden="true" className="tp-meet__floor"></div>

              {/* Walking Hallway Mascot that travels with scroll and cursor */}
              <div
                data-pup-stop="true"
                data-pose="walk"
                data-facing={hallFacing}
                className="pup-stop tp-meet__teddy"
                style={{
                  left: `${hallMascotX}%`,
                  right: 'auto',
                  transform: 'translateX(-50%)',
                  transition: 'left 0.25s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
              >
                <TeddyMascot pose="walk" facing={hallFacing} interactive={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TWO WAYS SCENE - Flight plane moves smoothly along route arc */}
      <section
        ref={pathsSectionRef}
        data-pup-scene="true"
        data-tone="light"
        className="tp-scene tp-paths"
        style={{ "--sky-top": "#fbe3b4", "--sky-bottom": "#f7d18d" }}
        aria-labelledby="paths-title"
      >
        <div className="gutter mx-auto max-w-[110rem]">
          <h2 id="paths-title" className="tp-paths__title font-plush text-huge">Two ways to meet your puppy</h2>
          <div className="tp-fork">
            <div aria-hidden="true" className="tp-fork__post"></div>
            
            <article className="tp-way tp-way--left" aria-labelledby="way-local">
              <h3 id="way-local" className="tp-sign tp-sign--left font-plush">Puppies in Dubai</h3>
              <div className="tp-way__scene" data-pup-look="true">
                <svg viewBox="0 0 300 120" className="tp-way__skyline" aria-hidden="true">
                  <path d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <figure className="tp-window">
                  <span className="tp-window__glass">
                    <img alt="A tiny apricot teddy bear puppy held up in the TeddyPups showroom" loading="lazy" decoding="async" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, objectFit: "cover", objectPosition: "54.3% 48.3%" }} src="https://puppy.instabizweb.com/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg" />
                  </span>
                  <figcaption className="font-scrawl">In our showroom</figcaption>
                </figure>
              </div>
              <p className="tp-way__text">See them, love them, take them home. Come meet our locally available puppies before you decide.</p>
              <Link className="btn btn-primary" to="/puppies?origin=local">Meet local puppies</Link>
            </article>

            <article className="tp-way tp-way--right" aria-labelledby="way-imported">
              <h3 id="way-imported" className="tp-sign tp-sign--right font-plush">Imported for you</h3>
              <div className="tp-way__scene" data-pup-look="true">
                <div className="tp-flight">
                  <svg viewBox="0 0 660 300" role="img" aria-label="A plane bringing a Korean Teacup Maltipoo puppy from Korea to Dubai">
                    <defs>
                      <clipPath id="_R_jieankivb_">
                        <circle r="25"></circle>
                      </clipPath>
                    </defs>
                    <path d="M40 250 C 170 40, 470 20, 620 168" className="tp-flight__route"></path>
                    <circle cx="40" cy="250" r="7" className="tp-flight__dot"></circle>
                    <circle cx="620" cy="168" r="7" className="tp-flight__dot"></circle>
                    <text x="40" y="284" textAnchor="middle" className="tp-flight__label">Korea</text>
                    <text x="620" y="202" textAnchor="middle" className="tp-flight__label">Dubai</text>

                    {/* Flight Airplane - Animates along route arc on scroll (User Request Item 5) */}
                    <g transform={`translate(${planeCoords.x} ${planeCoords.y}) rotate(${planeCoords.angle})`} style={{ transition: 'transform 0.12s linear' }}>
                      <g transform="translate(-126 -78)">
                        <path d="M28 60 L8 26 L34 26 L60 54 Z" className="tp-flight__wing"></path>
                        <path d="M108 112 L142 156 L172 156 L158 112 Z" className="tp-flight__wing tp-flight__wing--far"></path>
                        <path d="M20 80 C20 52 52 44 80 44 L168 44 C200 44 224 60 232 80 C224 100 200 112 168 112 L80 112 C52 112 20 104 20 80 Z" className="tp-flight__body"></path>
                        <path d="M104 44 L138 2 L168 2 L154 44 Z" className="tp-flight__wing"></path>
                        <path d="M206 64 C215 67 221 73 224 80" className="tp-flight__line"></path>
                      </g>
                      <g transform="translate(10 2)">
                        <image href="https://puppy.instabizweb.com/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg" x="-25" y="-25" width="50" height="50" clipPath="url(#_R_jieankivb_)" preserveAspectRatio="xMidYMid slice"></image>
                        <circle r="25" className="tp-flight__porthole"></circle>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
              <p className="tp-way__text">Exclusive Korean teacup puppies, delivered. Order from the world&#x27;s most reputable breeders and let us handle the import.</p>
              <Link className="btn btn-primary" to="/puppies?origin=imported">See imported puppies</Link>
            </article>

            <div data-pup-stop="true" data-pose="sit" data-facing={scrollDir} className="pup-stop tp-fork__teddy">
              <TeddyMascot pose="sit" facing={scrollDir} interactive={true} />
            </div>
          </div>
        </div>
      </section>

      {/* 4. CHAT JOURNEY SCENE */}
      <section data-pup-scene="true" data-tone="light" className="tp-scene tp-chat" style={{ "--sky-top": "#f7d18d", "--sky-bottom": "#f0b866" }} aria-labelledby="journey-title">
        <div className="tp-chat__grid gutter" data-pin-range="true">
          <div className="tp-chat__story">
            <h2 id="journey-title" className="font-plush text-huge">Your puppy journey</h2>
            <p className="text-lede mt-5 max-w-[42ch] text-[var(--ink-soft)]">A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.</p>
            <ol className="tp-chat__steps">
              <li className="tp-chat__step" data-done="true">
                <span className="tp-chat__num font-plush" aria-hidden="true">1</span>
                <h3 className="font-plush tp-chat__title">Choose your breed</h3>
                <p className="tp-chat__text">Select your preferred breed or tell us what you&#x27;re looking for. We&#x27;ll guide you based on availability and your lifestyle.</p>
              </li>
              <li className="tp-chat__step" data-done="true">
                <span className="tp-chat__num font-plush" aria-hidden="true">2</span>
                <h3 className="font-plush tp-chat__title">Get photos &amp; details</h3>
                <p className="tp-chat__text">Our team will share real photos, health details, and all necessary information directly on WhatsApp.</p>
              </li>
              <li className="tp-chat__step" data-active="true">
                <span className="tp-chat__num font-plush" aria-hidden="true">3</span>
                <h3 className="font-plush tp-chat__title">Secure &amp; safe delivery</h3>
                <p className="tp-chat__text">Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.</p>
              </li>
            </ol>
            <Link className="btn btn-ghost tp-chat__cta" to="/how-it-works">How it works</Link>
          </div>

          <div className="tp-chat__side">
            <div className="tp-phone" aria-label="A WhatsApp conversation with TeddyPups U.A.E." role="group">
              <div className="tp-phone__bar">
                <img alt="" loading="lazy" width="40" height="40" decoding="async" className="tp-phone__avatar" src="https://puppy.instabizweb.com/brand/logo.png" />
                <span>
                  <span className="tp-phone__name">TeddyPups U.A.E.</span>
                  <span className="tp-phone__status">online</span>
                </span>
              </div>
              <div className="tp-phone__screen">
                <p className="tp-msg tp-msg--me">Hi TeddyPups! I&#x27;d love to know more about your puppies.</p>
                <div className="tp-msg-group" data-step="0" data-show="true">
                  <div className="tp-msg tp-msg--them">
                    <p>Select your preferred breed or tell us what you&#x27;re looking for. We&#x27;ll guide you based on availability and your lifestyle.</p>
                    <ul className="tp-chips" aria-label="Breeds we have now">
                      <li><Link to="/puppies?breed=maltipoo">Maltipoo</Link></li>
                      <li><Link to="/puppies?breed=pomeranian">Pomeranian</Link></li>
                      <li><Link to="/puppies?breed=poodle">Poodle</Link></li>
                      <li><Link to="/puppies?breed=cavapoo">Cavapoo</Link></li>
                      <li><Link to="/puppies?breed=shih-tzu">Shih Tzu</Link></li>
                    </ul>
                  </div>
                </div>

                <div className="tp-msg-group" data-step="1" data-show="true">
                  <div className="tp-msg tp-msg--them tp-msg--media">
                    <div className="tp-snaps">
                      <span className="tp-snaps__one"><img alt="A tiny apricot teddy bear puppy held up in the TeddyPups showroom" loading="lazy" decoding="async" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, objectFit: "cover", objectPosition: "54.3% 48.3%" }} src="https://puppy.instabizweb.com/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg" /></span>
                      <span className="tp-snaps__one"><img alt="The apricot teddy bear puppy from our showroom, close up" loading="lazy" decoding="async" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, objectFit: "cover", objectPosition: "46.0% 44.4%" }} src="https://puppy.instabizweb.com/media/Vi-kzyvemRl4/e740ed8a24/27b888_323008bb0f6a41d4bde2a0da7206cd98f001.jpg" /></span>
                      <span className="tp-snaps__one"><img alt="The apricot teddy bear puppy from our showroom, looking up" loading="lazy" decoding="async" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, objectFit: "cover", objectPosition: "43.7% 40.2%" }} src="https://puppy.instabizweb.com/media/g_e4ebbc7fyG/8276289ae7/27b888_323008bb0f6a41d4bde2a0da7206cd98f002.jpg" /></span>
                      <span className="tp-snaps__one"><img alt="The apricot teddy bear puppy from our showroom, held up to say hello" loading="lazy" decoding="async" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, objectFit: "cover", objectPosition: "45.3% 44.4%" }} src="https://puppy.instabizweb.com/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg" /></span>
                    </div>
                  </div>
                  <div className="tp-msg tp-msg--them tp-msg--media">
                    <div className="tp-clip">
                      <video src="https://puppy.instabizweb.com/media/dSAUmXs8Qai9/ef39cbea20/27b888_323008bb0f6a41d4bde2a0da7206cd98-720p.mp4" poster="https://puppy.instabizweb.com/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg" muted loop playsInline preload="none" aria-label="Video of a tiny apricot teddy bear puppy in the TeddyPups showroom"></video>
                      <button type="button" className="tp-clip__play" aria-pressed="false" aria-label="Play video"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"></path></svg></button>
                    </div>
                  </div>
                  <p className="tp-msg tp-msg--them">Our team will share real photos, health details, and all necessary information directly on WhatsApp.</p>
                </div>

                <div className="tp-msg-group" data-step="2" data-show="true">
                  <div className="tp-msg tp-msg--them">
                    <p>Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.</p>
                  </div>
                </div>
              </div>
              <a href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I&#x27;d%20love%20to%20know%20more%20about%20your%20puppies." target="_blank" rel="noopener noreferrer" className="tp-phone__compose">
                <span>Say hello on WhatsApp</span>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 20l18-8L3 4v6l12 2-12 2z"></path></svg>
              </a>
            </div>

            <div data-pup-stop="true" data-pose="sit" data-facing={scrollDir} className="pup-stop tp-chat__teddy">
              <TeddyMascot pose="sit" facing={scrollDir} interactive={true} />
            </div>
          </div>
        </div>
      </section>

      {/* 5. PASSPORT TRUST SCENE */}
      <section data-pup-scene="true" data-tone="light" className="tp-scene tp-passport" style={{ "--sky-top": "#f0b866", "--sky-bottom": "#a65a30" }} aria-labelledby="trust-title">
        <div className="gutter mx-auto max-w-[96rem]">
          <div className="tp-book">
            <div className="tp-book__page tp-book__page--left">
              <p aria-hidden="true" className="tp-book__kicker font-scrawl">puppy passport</p>
              <h2 id="trust-title" className="font-plush tp-book__title">Why families trust TeddyPups</h2>
              <div data-pup-stop="true" data-pose="sit" data-facing={scrollDir} className="pup-stop tp-book__teddy">
                <TeddyMascot pose="sit" facing={scrollDir} interactive={true} />
              </div>
            </div>
            <ul className="tp-book__page tp-book__page--right">
              <li className="tp-entry" style={{ "--ink-stamp": "#a24a1a", "--tilt": "-8deg", "--i": "0" }}>
                <span className="tp-stamp tp-stamp--round">
                  <svg viewBox="0 0 64 64" className="tp-stamp__icon" aria-hidden="true">
                    <path d="M32 54C16 43 8 34 8 24c0-7 5.4-12 12-12 5 0 9 3 12 7 3-4 7-7 12-7 6.6 0 12 5 12 12 0 10-8 19-24 30z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M22 30h7l3-7 4 13 3-6h7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <span className="tp-stamp__title font-plush">Vet-checked &amp; healthy</span>
                </span>
                <p className="tp-entry__text">Every puppy comes vaccinated, dewormed, and with a verified health certificate.</p>
              </li>
              <li className="tp-entry" style={{ "--ink-stamp": "#1f6b45", "--tilt": "5deg", "--i": "1" }}>
                <span className="tp-stamp tp-stamp--ticket">
                  <svg viewBox="0 0 64 64" className="tp-stamp__icon" aria-hidden="true">
                    <path d="M6 36l22-3 12-17h6l-6 17 12-1 6-7h3l-2 10 2 10h-3l-6-7-12-1 6 17h-6L28 37 6 36z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M8 50c10 4 20 4 30 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 7"></path>
                  </svg>
                  <span className="tp-stamp__title font-plush">Korea to Dubai, safely</span>
                </span>
                <p className="tp-entry__text">Trusted breeders, safe travel, and premium care from start to finish.</p>
              </li>
              <li className="tp-entry" style={{ "--ink-stamp": "#5a3a28", "--tilt": "-4deg", "--i": "2" }}>
                <span className="tp-stamp tp-stamp--oval">
                  <svg viewBox="0 0 64 64" className="tp-stamp__icon" aria-hidden="true">
                    <path d="M10 14h44v28H30l-12 10v-10h-8z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M22 28h0M32 28h0M42 28h0" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <span className="tp-stamp__title font-plush">Support 24/7</span>
                </span>
                <p className="tp-entry__text">Always here to help, from choosing your puppy to post-delivery support.</p>
              </li>
              <li className="tp-entry" style={{ "--ink-stamp": "#c2622b", "--tilt": "7deg", "--i": "3" }}>
                <span className="tp-stamp tp-stamp--scallop">
                  <svg viewBox="0 0 64 64" className="tp-stamp__icon" aria-hidden="true">
                    <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></circle>
                    <path d="M10 32h44M32 10c-8 8-8 36 0 44M32 10c8 8 8 36 0 44" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <span className="tp-stamp__title font-plush">Trusted by families worldwide</span>
                </span>
                <p className="tp-entry__text">Puppies delivered to loving homes all around the world.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. DUSK POLAROIDS SCENE */}
      <section data-pup-scene="true" data-tone="dark" className="tp-scene tp-dusk" style={{ "--sky-top": "#a65a30", "--sky-bottom": "#4d2b19" }} aria-labelledby="dusk-title">
        <div className="tp-dusk__sky gutter">
          <div className="tp-dusk__head">
            <h2 id="dusk-title" className="font-plush text-huge">Happy families &amp; puppies</h2>
            <p className="text-lede mt-5 max-w-[50ch] text-[var(--ink-soft)]">
              We are truly honored to see our puppies become cherished members of loving families. These heartwarming moments have been shared by our valued clients who welcomed a Teddy Pup into their homes and hearts.
            </p>
          </div>
          <figure className="tp-dusk__note">
            <blockquote className="font-plush-text">
              “TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.”
            </blockquote>
            <figcaption className="font-scrawl">Sarah M., Dubai, UAE</figcaption>
          </figure>
        </div>

        <div className="tp-photowall">
          <div className="tp-photowall__wall">
            <ul className="tp-photowall__prints" aria-label="Photos from TeddyPups families">
              <li data-reveal="true" style={{ "--d": "330ms" }}>
                <span className="tp-polaroid" style={{ "--tilt": "-2.2deg", "--tape": "#f6d79a", "--i": "0" }}>
                  <span aria-hidden="true" className="tp-tape tp-tape--center"></span>
                  <span className="tp-polaroid__photo">
                    <img alt="A happy TeddyPups family with their new puppy" loading="lazy" width="433" height="433" src="https://puppy.instabizweb.com/media/dI8Jv0KRTiLJ/d2d7e5375b/27b888_7d940ce5701f48d98327e4a242b53ac4-mv2.jpg" />
                  </span>
                  <span className="tp-polaroid__caption font-scrawl">Lulu 🧸 with her new mummy ❤️</span>
                </span>
              </li>
              <li data-reveal="true" style={{ "--d": "0ms" }}>
                <span className="tp-polaroid" style={{ "--tilt": "1.6deg", "--tape": "#f9cdbf", "--i": "1" }}>
                  <span aria-hidden="true" className="tp-tape tp-tape--left"></span>
                  <span className="tp-polaroid__photo">
                    <img alt="A happy TeddyPups family with their new puppy" loading="lazy" width="433" height="433" src="https://puppy.instabizweb.com/media/TI-WtaFssfQt/c41fb2a387/27b888_15920f828b864dd1b44b98ec4e964c53-mv2.jpg" />
                  </span>
                  <span className="tp-polaroid__caption font-scrawl">Adorable Maltipoo baby 🧸❤️</span>
                </span>
              </li>
              <li data-reveal="true" style={{ "--d": "550ms" }}>
                <span className="tp-polaroid" style={{ "--tilt": "-0.9deg", "--tape": "#cfe5f6", "--i": "2" }}>
                  <span aria-hidden="true" className="tp-tape tp-tape--right"></span>
                  <span className="tp-polaroid__photo">
                    <img alt="A happy TeddyPups family with their new puppy" loading="lazy" width="433" height="433" src="https://puppy.instabizweb.com/media/j6T9eswP2eS8/59c6879a1d/27b888_bc27df54dcce410196c6016475364ff3-mv2.jpg" />
                  </span>
                  <span className="tp-polaroid__caption font-scrawl">My new teddy puppy 🥰🧸</span>
                </span>
              </li>
              <li data-reveal="true" style={{ "--d": "110ms" }}>
                <span className="tp-polaroid" style={{ "--tilt": "2.4deg", "--tape": "#f6d79a", "--i": "3" }}>
                  <span aria-hidden="true" className="tp-tape tp-tape--tl"></span>
                  <span aria-hidden="true" className="tp-tape tp-tape--tr"></span>
                  <span className="tp-polaroid__photo">
                    <img alt="A happy TeddyPups family with their new puppy" loading="lazy" width="433" height="433" src="https://puppy.instabizweb.com/media/HJgL4rRnmReV/533701358f/27b888_082e47dfd8144423a96dc70d966fa5b2-mv2.jpg" />
                  </span>
                  <span className="tp-polaroid__caption font-scrawl">Our new puppies 🧸🥰🤗</span>
                </span>
              </li>
              <li data-reveal="true" style={{ "--d": "660ms" }}>
                <span className="tp-polaroid" style={{ "--tilt": "-1.5deg", "--tape": "#e9dcc4", "--i": "4" }}>
                  <span aria-hidden="true" className="tp-tape tp-tape--center"></span>
                  <span className="tp-polaroid__photo">
                    <img alt="A happy TeddyPups family with their new puppy" loading="lazy" width="433" height="433" src="https://puppy.instabizweb.com/media/uc5ANs5jm7r7/7160d8b7b1/27b888_f7f4966e59e94db591784d4ec546682f-mv2.jpg" />
                  </span>
                  <span className="tp-polaroid__caption font-scrawl">New puppy 🧸😍</span>
                </span>
              </li>
              <li data-reveal="true" style={{ "--d": "220ms" }}>
                <span className="tp-polaroid" style={{ "--tilt": "0.8deg", "--tape": "#f6d79a", "--i": "5" }}>
                  <span aria-hidden="true" className="tp-tape tp-tape--right"></span>
                  <span className="tp-polaroid__photo">
                    <img alt="A happy TeddyPups family with their new puppy" loading="lazy" width="433" height="433" src="https://puppy.instabizweb.com/media/pRJubyqHw8p7/d58c4c07ee/27b888_b073c5815f7c4f92ad9a57741a653663-mv2.jpg" />
                  </span>
                  <span className="tp-polaroid__caption font-scrawl">Gang of 3 😍🧸</span>
                </span>
              </li>
            </ul>

            <div className="tp-facade__ground">
              <span aria-hidden="true" className="tp-facade__door"></span>
              <span aria-hidden="true" className="tp-lamp"><span className="tp-lamp__light"></span></span>
              <Link className="btn btn-primary tp-facade__cta" to="/happy-families">See every happy family</Link>
              <div data-pup-stop="true" data-pose="sit" data-facing={scrollDir} className="pup-stop tp-dusk__teddy">
                <TeddyMascot pose="sit" facing={scrollDir} interactive={true} />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="tp-street__pavement"></div>
        </div>
      </section>

      {/* 7. NIGHT FAQ SCENE */}
      <section data-pup-scene="true" data-tone="dark" className="tp-scene tp-night" style={{ "--sky-top": "#4d2b19", "--sky-bottom": "#2f1a10" }} aria-labelledby="questions-title">
        <div aria-hidden="true" className="pointer-events-none tp-night__stars">
          <svg viewBox="0 0 40 40" className="tp-twinkle absolute text-honey" style={{ left: "8%", top: "12%", width: "16px" }} aria-hidden="true">
            <path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" fill="currentColor"></path>
          </svg>
          <svg viewBox="0 0 40 40" className="tp-twinkle absolute text-honey" style={{ left: "72%", top: "6%", width: "14px" }} aria-hidden="true">
            <path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" fill="currentColor"></path>
          </svg>
        </div>

        <div className="tp-night__grid gutter">
          <div className="tp-night__intro">
            <h2 id="questions-title" className="font-plush text-huge">Questions, answered</h2>
            <Link className="btn btn-ghost tp-night__cta" to="/faq">Read all questions</Link>
            <div className="tp-night__pup">
              <span aria-hidden="true" className="tp-night__wonder font-plush">?</span>
              <div data-pup-stop="true" data-pose="sit" data-facing={scrollDir} className="pup-stop tp-night__teddy">
                <TeddyMascot pose="sit" facing={scrollDir} interactive={true} />
              </div>
            </div>
          </div>

          <dl className="tp-night__list">
            <div className="tp-qa">
              <dt className="font-plush tp-qa__q">Are your puppies vaccinated and health-checked?</dt>
              <dd className="tp-qa__a">Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.</dd>
            </div>
            <div className="tp-qa">
              <dt className="font-plush tp-qa__q">Can I meet a puppy before I decide?</dt>
              <dd className="tp-qa__a">Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision.</dd>
            </div>
            <div className="tp-qa">
              <dt className="font-plush tp-qa__q">Can I take my puppy home the same day?</dt>
              <dd className="tp-qa__a">Local puppies are available immediately, so you can take your puppy home the same day.</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 8. HOME READY SCENE - Single House Door Swings Outward Smoothly on Scroll (User Request Item 7) */}
      <section
        data-pup-scene="true"
        data-tone="dark"
        className="tp-scene tp-home"
        style={{ "--sky-top": "#2f1a10", "--sky-bottom": "#24130b" }}
        aria-labelledby="cta-title"
      >
        <div className="tp-home__copy gutter">
          <h2 id="cta-title" className="font-plush text-huge">Ready to meet your new best friend?</h2>
          <p className="tp-home__lede">
            Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.
          </p>
        </div>

        <div
          ref={houseRef}
          className={`tp-house ${isHouseDoorOpen ? 'door-open' : ''}`}
          data-door-open={isHouseDoorOpen ? "true" : "false"}
        >
          <span aria-hidden="true" className="tp-house__plant tp-house__plant--left"></span>
          <span aria-hidden="true" className="tp-house__lamp"></span>

          <div className="tp-house__doorway">
            <span className="tp-house__inside">
              <img
                alt="Max, waiting inside"
                loading="lazy"
                decoding="async"
                style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, objectFit: "cover", objectPosition: "53.8% 44.3%" }}
                src="https://puppy.instabizweb.com/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp"
              />
            </span>
            {/* The single house door swinging outward on scroll (User Request Item 7) */}
            <span aria-hidden="true" className="tp-house__door">
              <span className="tp-house__peep"></span>
              <span className="tp-house__knob"></span>
            </span>
          </div>

          <span aria-hidden="true" className="tp-house__plant tp-house__plant--right"></span>
          <span aria-hidden="true" className="tp-house__mat font-scrawl">welcome home</span>

          <div data-pup-stop="true" data-pose="bow" data-facing={scrollDir} className="pup-stop tp-house__teddy">
            <TeddyMascot pose="sit" facing={scrollDir} interactive={true} />
          </div>
        </div>

        <div className="tp-home__actions gutter">
          <a href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I&#x27;d%20love%20to%20know%20more%20about%20your%20puppies." target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            Enquire on WhatsApp
          </a>
          <Link className="btn btn-ghost tp-home__ghost" to="/contact">Visit &amp; contact</Link>
        </div>
      </section>
    </div>
  );
}
