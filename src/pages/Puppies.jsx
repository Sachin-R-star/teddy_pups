import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { puppiesData } from '../data/puppies';
import { goneHomeData } from '../data/goneHome';
import PuppyCard from '../components/PuppyCard';
import TicketCard from '../components/TicketCard';
import { siteConfig } from '../data/siteConfig';
import { PawIcon } from '../components/Navbar';

export default function Puppies() {
  const [selectedBreed, setSelectedBreed] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract all distinct breeds
  const breeds = useMemo(() => {
    const list = ['All', 'Maltipoo', 'Pomeranian', 'Pomsky', 'Poodle', 'Shih Tzu', 'Bichon'];
    return list;
  }, []);

  // Filtered puppies
  const filteredPuppies = useMemo(() => {
    return puppiesData.filter((p) => {
      // Breed match
      const breedMatch =
        selectedBreed === 'All' ||
        p.breed.toLowerCase().includes(selectedBreed.toLowerCase());

      // Gender match
      const genderMatch =
        selectedGender === 'All' ||
        p.gender.toLowerCase() === selectedGender.toLowerCase();

      // Search query match
      const queryMatch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.breed.toLowerCase().includes(searchQuery.toLowerCase());

      return breedMatch && genderMatch && queryMatch;
    });
  }, [selectedBreed, selectedGender, searchQuery]);

  return (
    <div data-page="puppies" className="tp-page pt-10 pb-20">
      <div className="gutter mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="tp-sketchbook__head text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-honey/60 text-cocoa font-bold text-xs mb-4 border border-cocoa/10 shadow-sm">
            <PawIcon className="size-4 text-toffee-deep" />
            <span>Meet Our Little Angels</span>
          </div>

          <h1 className="font-plush text-4xl sm:text-6xl font-extrabold text-cocoa leading-tight">
            Available puppies
          </h1>
          <p className="tp-sketchbook__lede font-sans text-base sm:text-lg text-cocoa/75 mt-3 max-w-xl mx-auto">
            All puppies are vaccinated, microchipped, and vetted with full UAE health guarantees.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or breed (e.g. Max, Maltipoo)..."
              className="w-full pl-11 pr-4 py-3 rounded-full border-2 border-cocoa/20 bg-white text-cocoa placeholder:text-cocoa/40 focus:border-toffee-deep focus:outline-none shadow-sm text-sm"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cocoa/50 text-base">
              🔍
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-cocoa/50 hover:text-cocoa"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filters Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Breed filter pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
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

            {/* Gender filter toggle */}
            <div className="inline-flex rounded-full bg-cocoa/5 p-1 border border-cocoa/10">
              {['All', 'Boy', 'Girl'].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setSelectedGender(g)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                    selectedGender === g
                      ? 'bg-cocoa text-milk'
                      : 'text-cocoa hover:text-toffee-deep'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between border-b border-cocoa/10 pb-4 mb-8 text-xs font-semibold text-cocoa/60">
          <span>Showing {filteredPuppies.length} available puppies</span>
          <span>Downtown Dubai Showroom</span>
        </div>

        {/* Puppies Grid */}
        {filteredPuppies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPuppies.map((puppy, idx) => (
              <PuppyCard key={puppy.id} puppy={puppy} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-honey/20 rounded-3xl p-8 border-2 border-dashed border-cocoa/20">
            <span className="text-4xl block mb-2">🐾</span>
            <h3 className="font-plush text-2xl font-bold text-cocoa">
              No puppies match this filter
            </h3>
            <p className="text-sm text-cocoa/70 mt-2 max-w-sm mx-auto">
              Looking for a specific teacup puppy? Contact us on WhatsApp and we will find your dream puppy from our ethical breeders.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => { setSelectedBreed('All'); setSelectedGender('All'); setSearchQuery(''); }}
                className="px-5 py-2 rounded-full bg-white border border-cocoa text-xs font-bold text-cocoa shadow-sm"
              >
                Reset filters
              </button>
              <a
                href={siteConfig.getWhatsAppUrl("Hi TeddyPups! I'm looking for a specific teacup puppy breed.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp px-5 py-2 rounded-full text-xs font-bold shadow-sm"
              >
                Custom Request on WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* Already Gone Home Section Strip */}
        <div className="tp-gone-strip mt-24 pt-16 border-t-2 border-dashed border-cocoa/20">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <div>
              <span className="font-scrawl text-2xl text-toffee-deep font-bold block mb-1">
                forever family happiness ❤️
              </span>
              <h2 className="font-plush text-3xl font-extrabold text-cocoa">
                Already gone home
              </h2>
            </div>
            <Link
              to="/gone-home"
              className="text-sm font-bold text-cocoa underline hover:text-toffee"
            >
              View all adopted tickets ({goneHomeData.length}) →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {goneHomeData.slice(0, 3).map((pup) => (
              <TicketCard key={pup.id} puppy={pup} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
