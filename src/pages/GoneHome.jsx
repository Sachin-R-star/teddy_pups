import React, { useState, useMemo } from 'react';
import { goneHomeData } from '../data/goneHome';
import TicketCard from '../components/TicketCard';
import { siteConfig } from '../data/siteConfig';
import { PawIcon } from '../components/Navbar';

export default function GoneHome() {
  const [selectedBreed, setSelectedBreed] = useState('All');

  const breeds = useMemo(() => {
    return ['All', 'Maltipoo', 'Pomeranian', 'Pomsky', 'Poodle', 'Maltese', 'Bichon'];
  }, []);

  const filteredTickets = useMemo(() => {
    if (selectedBreed === 'All') return goneHomeData;
    return goneHomeData.filter(p => p.breed.toLowerCase().includes(selectedBreed.toLowerCase()));
  }, [selectedBreed]);

  return (
    <div data-page="gone-home" className="tp-page pt-10 pb-24">
      <div className="gutter mx-auto max-w-7xl">
        {/* Ticket Booth Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-800 font-bold text-xs mb-4 border border-rose-200">
            <span>❤️ Happily Settled in Dubai & UAE</span>
          </div>

          <h1 className="font-plush text-4xl sm:text-6xl font-extrabold text-cocoa leading-tight">
            Already gone home
          </h1>
          <p className="font-sans text-base sm:text-lg text-cocoa/75 mt-3 max-w-xl mx-auto">
            These precious little ones have embarked on their journey and are now living happily with their loving forever families.
          </p>

          {/* Breed Filter */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {breeds.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setSelectedBreed(b)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer ${
                  selectedBreed === b
                    ? 'bg-toffee-deep text-milk shadow-md scale-105'
                    : 'bg-white border border-cocoa/15 text-cocoa hover:bg-honey/40'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTickets.map((puppy) => (
            <TicketCard key={puppy.id} puppy={puppy} />
          ))}
        </div>

        {/* Missed out on a puppy? CTA */}
        <div className="mt-20 p-8 md:p-12 rounded-[2.5rem] bg-honey/30 border-2 border-cocoa/15 text-center max-w-4xl mx-auto shadow-sm">
          <span className="text-4xl block mb-2">💌</span>
          <h2 className="font-plush text-2xl sm:text-3xl font-extrabold text-cocoa">
            Fell in love with an adopted puppy?
          </h2>
          <p className="text-sm sm:text-base text-cocoa/80 mt-2 max-w-xl mx-auto">
            Our ethical breeders in Korea and Europe regularly have new litters. Let us know your preferred breed, color, and gender to reserve first pick!
          </p>
          <div className="mt-6">
            <a
              href={siteConfig.getWhatsAppUrl("Hi TeddyPups! I'm interested in reserving a future puppy litter.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp px-8 py-3.5 rounded-full font-bold text-sm shadow-md"
            >
              Reserve From Upcoming Litters
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
