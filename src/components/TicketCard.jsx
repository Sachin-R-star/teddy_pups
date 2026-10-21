import React from 'react';
import { Link } from 'react-router-dom';

export default function TicketCard({ puppy }) {
  return (
    <article className="tp-ticket relative rounded-3xl bg-[#fdfaf3] border-2 border-cocoa/15 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden">
      <Link
        to={`/puppies/${puppy.slug}`}
        className="tp-ticket__link block p-4 flex flex-col md:flex-row items-center gap-5"
      >
        {/* Photo with rounded corners and border */}
        <div className="tp-ticket__photo size-24 md:size-28 shrink-0 rounded-2xl overflow-hidden border-2 border-cocoa/20 relative shadow-inner">
          <img
            src={puppy.image}
            alt={puppy.name}
            className="size-full object-cover object-center"
            loading="lazy"
          />
          <span className="absolute bottom-1 right-1 bg-rose-500 text-milk text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
            ❤️ ADOPTED
          </span>
        </div>

        {/* Ticket Details */}
        <div className="tp-ticket__body flex-1 text-center md:text-left">
          <span className="font-scrawl tp-ticket__kicker text-toffee-deep text-sm font-bold block">
            forever home found ✈️
          </span>
          <h3 className="font-plush tp-ticket__name text-2xl font-bold text-cocoa leading-tight">
            {puppy.name}
          </h3>
          <p className="tp-ticket__meta text-sm text-cocoa/70 font-medium mt-0.5">
            {puppy.breed} · {puppy.gender}
          </p>
          <div className="tp-ticket__route mt-2 inline-flex items-center gap-2 bg-honey/40 px-3 py-1 rounded-full text-xs font-semibold text-cocoa/80">
            <span>Route:</span>
            <span className="text-cocoa font-bold">{puppy.route || 'Seoul ✈️ Dubai'}</span>
          </div>
        </div>

        {/* Perforated Stub Section */}
        <div className="tp-ticket__stub border-t md:border-t-0 md:border-l-2 md:border-dashed border-cocoa/20 pt-3 md:pt-0 md:pl-5 text-center shrink-0 flex flex-col items-center justify-center">
          <div className="size-10 rounded-full border-2 border-toffee-deep/40 bg-toffee/10 flex items-center justify-center text-toffee-deep font-bold text-xs rotate-[-12deg]">
            STAMP
          </div>
          <span className="text-[11px] font-mono text-cocoa/50 mt-1 block">
            UAE-HOME
          </span>
        </div>
      </Link>
    </article>
  );
}
