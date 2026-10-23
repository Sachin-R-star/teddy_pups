import React from 'react';
import { Link } from 'react-router-dom';

export default function PuppyCard({ puppy, index = 0 }) {
  // Deterministic tilt & watercolor wash colors for aesthetic variety
  const tilts = ['0.4deg', '-0.5deg', '0.6deg', '-0.3deg', '0.5deg', '-0.7deg'];
  const washes = ['#f2be6b', '#f9cdbf', '#cfe5f6', '#f6d79a', '#e8d2b8', '#fed7aa'];
  
  const tilt = tilts[index % tilts.length];
  const wash = washes[index % washes.length];
  const delay = `${(index % 6) * 60}ms`;

  return (
    <div className="relative group">
      <Link
        to={`/puppies/${puppy.slug}`}
        className="tp-sketch block transition-all duration-300 hover:-translate-y-2"
        data-reveal="true"
        style={{
          '--tilt': tilt,
          '--d': delay,
          '--wash': wash,
          transform: `rotate(${tilt})`
        }}
        aria-label={`${puppy.name}, ${puppy.breed}, ${puppy.gender}, ${puppy.age}, ${puppy.status}`}
      >
        <span className="tp-sketch__frame relative block aspect-[4/5] overflow-hidden rounded-[2rem] bg-amber-50/50 shadow-md">
          {/* Watercolor wash background */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            className="tp-sketch__wash absolute inset-0 size-full pointer-events-none opacity-40 transition-opacity group-hover:opacity-60"
            style={{ translate: '-4.0% 4.9%' }}
          >
            <circle cx="50" cy="50" r="45" fill={wash} />
          </svg>

          {/* Puppy Photo */}
          <img
            alt={puppy.name}
            loading="lazy"
            src={puppy.image}
            className="absolute inset-0 size-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              // Fallback placeholder if image takes time to load
              e.currentTarget.src = "https://puppy.instabizweb.com/brand/logo.png";
            }}
          />

          {/* Hand-drawn ink doodle border */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            className="tp-sketch__ink absolute inset-0 size-full pointer-events-none"
          >
            <rect
              x="3"
              y="3"
              width="94"
              height="94"
              rx="18"
              fill="none"
              stroke="#2a170e"
              strokeWidth="2.2"
              strokeDasharray="180 4 2 2"
              className="tp-sketch__line opacity-80"
            />
            {/* Decorative hand-drawn doodles around the photo frame */}
            {/* Top-Right: Star or Sparkle */}
            <g transform="translate(88, 12) scale(0.95)" fill="#c2622b">
              {index % 2 === 0 ? (
                <path d="M0 -6c.6 3.6 2.4 5.4 6 6-3.6.6-5.4 2.4-6 6-.6-3.6-2.4-5.4-6-6 3.6-.6 5.4-2.4 6-6z" />
              ) : (
                <g fill="#d4893f">
                  <circle cx="-3" cy="1" r="1.3" />
                  <circle cx="0" cy="-2" r="1.3" />
                  <circle cx="3" cy="1" r="1.3" />
                </g>
              )}
            </g>

            {/* Bottom-Left: Heart or Paw print */}
            <g transform="translate(10, 88)" fill="#e25c5c">
              {index % 3 === 0 ? (
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  transform="scale(0.4) translate(-12, -12)"
                />
              ) : (
                <path
                  d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z"
                  transform="scale(0.18) translate(-32, -34)"
                  fill="#d4893f"
                  opacity="0.9"
                />
              )}
            </g>

            {/* Top-Left / Bottom-Right subtle accents */}
            <g transform="translate(90, 88) scale(0.7)" fill="#a24a1a">
              <path d="M0 -5c.5 3 2 4.5 5 5-3 .5-4.5 2-5 5-.5-3-2-4.5-5-5 3-.5 4.5-2 5-5z" />
            </g>
          </svg>

          {/* Status sticker */}
          <span
            className={`tp-sketch__sticker font-scrawl absolute top-3 left-3 px-3 py-1 text-sm font-bold shadow-sm rounded-full ${
              puppy.status === 'Gone Home'
                ? 'bg-[#f43f5e] text-white rotate-[-6deg]'
                : puppy.status === 'Reserved'
                ? 'bg-amber-400 text-cocoa rotate-[4deg]'
                : 'bg-milk text-cocoa border border-cocoa/20 rotate-[-4deg]'
            }`}
          >
            {puppy.status}
          </span>

          {/* Video indicator tag */}
          {puppy.hasVideo && (
            <span className="tp-sketch__video absolute bottom-3 right-3 bg-cocoa/80 text-milk text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm flex items-center gap-1 shadow">
              ▶ video
            </span>
          )}
        </span>

        {/* Name and Meta */}
        <span className="tp-sketch__name font-plush text-2xl text-cocoa block mt-3 font-bold group-hover:text-toffee-deep transition-colors">
          {puppy.name}
        </span>
        <span className="tp-sketch__meta text-sm text-cocoa/70 block font-medium">
          {puppy.breed} · {puppy.gender} · {puppy.age}
        </span>
      </Link>
    </div>
  );
}
