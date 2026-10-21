import React, { useEffect, useRef, useState } from 'react';

export default function PawCursor() {
  const cursorRef = useRef(null);
  const trailsContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on devices with a mouse/pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let lastX = 0;
    let lastY = 0;
    let stepCount = 0;
    let isMoving = false;

    // Apply cursor: none to document when active
    document.documentElement.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      setIsVisible(true);

      // Smooth hardware-accelerated transform
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }

      // Check distance moved to spawn paw prints trail
      const dist = Math.hypot(x - lastX, y - lastY);
      if (dist > 38 && trailsContainerRef.current) {
        lastX = x;
        lastY = y;
        stepCount++;

        // Calculate movement angle
        const angle = Math.atan2(y - lastY, x - lastX) * (180 / Math.PI) + 90;
        // Alternate slight tilt between left and right paws
        const sideTilt = stepCount % 2 === 0 ? 14 : -14;

        // Create trailing paw print clone
        const pawPrint = document.createElement('div');
        pawPrint.className = 'tp-paw-trail-item';
        pawPrint.style.left = `${x}px`;
        pawPrint.style.top = `${y}px`;
        pawPrint.style.transform = `translate(-50%, -50%) rotate(${angle + sideTilt}deg) scale(0.85)`;

        // SVG paw print inner
        pawPrint.innerHTML = `
          <svg viewBox="0 0 64 64" width="22" height="22" fill="#c2622b">
            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z"/>
          </svg>
        `;

        trailsContainerRef.current.appendChild(pawPrint);

        // Remove from DOM after fadeout animation completes
        setTimeout(() => {
          if (pawPrint && pawPrint.parentNode) {
            pawPrint.parentNode.removeChild(pawPrint);
          }
        }, 950);
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
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer')
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
  }, []);

  return (
    <>
      {/* Container for trailing paw prints */}
      <div
        ref={trailsContainerRef}
        className="tp-paw-trails-container fixed inset-0 pointer-events-none z-[99998] overflow-hidden"
        aria-hidden="true"
      />

      {/* Main Cursor Element */}
      <div
        ref={cursorRef}
        className={`tp-custom-paw-cursor fixed top-0 left-0 pointer-events-none z-[99999] transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <div
          className={`relative transition-all duration-150 ${
            isPressed
              ? 'scale-75 rotate-[-8deg]'
              : isHovered
              ? 'scale-125 rotate-[6deg]'
              : 'scale-100'
          }`}
        >
          {/* Main Paw Icon */}
          <div className="size-8 drop-shadow-[0_2px_4px_rgba(42,23,14,0.3)]">
            <svg viewBox="0 0 64 64" className="size-full" fill={isHovered ? '#c2622b' : '#2a170e'}>
              <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
            </svg>
          </div>

          {/* Hover halo ring */}
          {isHovered && (
            <div className="absolute inset-0 -m-1 rounded-full border-2 border-dashed border-toffee animate-spin-slow opacity-60" />
          )}
        </div>
      </div>
    </>
  );
}
