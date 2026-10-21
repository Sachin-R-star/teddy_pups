import React from 'react';

export default function PolaroidCard({ item, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick && onClick(item)}
      className="tp-wall__print text-left block w-full focus:outline-none group cursor-pointer"
      aria-label={item.label || item.caption}
    >
      <span
        className="tp-polaroid block bg-white p-3 pb-5 rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300 relative border border-cocoa/5 group-hover:scale-105"
        style={{
          transform: `rotate(${item.tilt || '0deg'})`,
          '--tape': item.tapeColor || '#f6d79a'
        }}
      >
        {/* Washi Tape strip */}
        <span
          className="tp-tape tp-tape--center absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 opacity-85 shadow-sm"
          style={{
            backgroundColor: item.tapeColor || '#f6d79a',
            clipPath: 'polygon(0% 0%, 100% 5%, 95% 100%, 5% 95%)'
          }}
          aria-hidden="true"
        />

        {/* Photo Container */}
        <span className="tp-polaroid__photo block aspect-[3/4] overflow-hidden rounded bg-stone-100 relative">
          <img
            src={item.image}
            alt={item.caption}
            loading="lazy"
            className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = 'https://puppy.instabizweb.com/brand/logo.png';
            }}
          />
        </span>

        {/* Polaroid handwritten caption */}
        <span className="tp-polaroid__caption font-scrawl text-cocoa text-center block mt-3 text-lg font-bold truncate px-1">
          {item.caption}
        </span>
      </span>
    </button>
  );
}
