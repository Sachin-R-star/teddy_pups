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
            {/* Corner doodles */}
            <g transform="translate(6, 12) scale(0.6)">
              <circle cx="5" cy="5" r="3" fill="#d4893f" opacity="0.6" />
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
