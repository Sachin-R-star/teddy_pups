import React, { useEffect, useRef, useState } from 'react';

export default function PawCursor() {
  const cursorRef = useRef(null);
  const trailsContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isOverDark, setIsOverDark] = useState(false);

  useEffect(() => {
    // Only enable on devices with a mouse/pointer (not touch-only phones)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let lastX = -100;
    let lastY = -100;
    let stepCount = 0;

    // Apply custom-cursor-active class to document
    document.documentElement.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      setIsVisible(true);

      // Smooth position update
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }

      // Detect if cursor is over footer or dark background element (Item 8)
      try {
        const el = document.elementFromPoint(x, y);
        if (el && (el.closest('footer') || el.closest('.tp-footer') || el.closest('[data-tone="dark"]') || el.closest('.tp-night') || el.closest('.tp-dusk') || el.closest('.tp-home'))) {
          setIsOverDark(true);
        } else {
          setIsOverDark(false);
        }
      } catch (err) {
        // Safe fallback
      }

      // Check distance moved to spawn trailing paw prints (Item 9: larger lingering signs)
      const dist = Math.hypot(x - lastX, y - lastY);
      if (dist > 38 && trailsContainerRef.current) {
        lastX = x;
        lastY = y;
        stepCount++;

        // Calculate movement angle
        const angle = Math.atan2(y - lastY, x - lastX) * (180 / Math.PI) + 90;
        // Alternate slight tilt between left and right paws
        const sideTilt = stepCount % 2 === 0 ? 14 : -14;

        // Create trailing paw print - enlarged per Requirement 9
        const pawPrint = document.createElement('div');
        pawPrint.className = 'tp-paw-trail-item';
        pawPrint.style.cssText = `
          position: fixed;
          left: ${x}px;
          top: ${y}px;
          width: 30px;
          height: 30px;
          pointer-events: none;
          z-index: 2147483646;
          transform: translate(-50%, -50%) rotate(${angle + sideTilt}deg) scale(1.05);
        `;

        // SVG paw print (color adjusts if over dark background)
        const trailFill = isOverDark ? '#fbe3b4' : '#c2622b';
        pawPrint.innerHTML = `
          <svg viewBox="0 0 64 64" width="30" height="30" fill="${trailFill}" style="display:block;filter:drop-shadow(0 1px 3px rgba(0,0,0,0.3));">
            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
          </svg>
        `;

        trailsContainerRef.current.appendChild(pawPrint);

        // Remove from DOM after fadeout animation
        setTimeout(() => {
          if (pawPrint && pawPrint.parentNode) {
            pawPrint.parentNode.removeChild(pawPrint);
          }
        }, 1200);
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Hover detection on interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target &&
        (target.closest('a') ||
          target.closest('button') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.closest('.cursor-pointer'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isOverDark]);

  // Color calculation based on dark footer / hover state (Item 8)
  const cursorFillColor = isOverDark
    ? isHovered
      ? '#ffffff'
      : '#fbe3b4' // light honey cream when over footer/dark bg
    : isHovered
    ? '#c2622b'
    : '#2a170e'; // normal dark cocoa

  return (
    <>
      {/* Container for trailing paw prints */}
      <div
        ref={trailsContainerRef}
        className="tp-paw-trails-container"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2147483646,
          overflow: 'hidden'
        }}
        aria-hidden="true"
      />

      {/* Main Paw Cursor Element */}
      <div
        ref={cursorRef}
        className="tp-custom-paw-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          pointerEvents: 'none',
          zIndex: 2147483647,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease, transform 0.05s linear',
          transform: 'translate3d(-9999px, -9999px, 0)'
        }}
        aria-hidden="true"
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transform: isPressed
              ? 'scale(0.78) rotate(-8deg)'
              : isHovered
              ? 'scale(1.25) rotate(6deg)'
              : 'scale(1)',
            transition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          {/* Main Paw SVG - dynamically lightened on dark footer/backgrounds */}
          <svg
            viewBox="0 0 64 64"
            width="36"
            height="36"
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              fill: cursorFillColor,
              filter: isOverDark
                ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.8))'
                : 'drop-shadow(0 2px 5px rgba(42,23,14,0.4))',
              transition: 'fill 0.2s ease'
            }}
          >
            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
          </svg>

          {/* Golden halo ring REMOVED per Requirement 11 */}
        </div>
      </div>
    </>
  );
}
