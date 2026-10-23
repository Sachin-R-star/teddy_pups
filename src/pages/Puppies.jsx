import React, { useState, useMemo } from 'react';
import { puppiesData } from '../data/puppies';
import PuppyCard from '../components/PuppyCard';
import TeddyMascot from '../components/TeddyMascot';

export default function Puppies() {
  const [whereFilter, setWhereFilter] = useState('All');
  const [breedFilter, setBreedFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('All');

  const breeds = ['All', 'Maltipoo', 'Poodle', 'Cavapoo', 'Pomeranian', 'Shih Tzu'];
  const whereOptions = ['All', 'In Dubai', 'Imported'];
  const genderOptions = ['All', 'Boy', 'Girl'];

  const filteredPuppies = useMemo(() => {
    return puppiesData.filter((p) => {
      // Where filter
      if (whereFilter === 'In Dubai') {
        const isImported = (p.origin && p.origin.toLowerCase().includes('korea')) || (p.where && p.where.toLowerCase().includes('imported'));
        if (isImported && !p.where?.toLowerCase().includes('dubai')) return false;
      } else if (whereFilter === 'Imported') {
        const isImported = (p.origin && p.origin.toLowerCase().includes('korea')) || (p.where && p.where.toLowerCase().includes('imported'));
        if (!isImported) return false;
      }

      // Breed filter
      if (breedFilter !== 'All') {
        if (!p.breed.toLowerCase().includes(breedFilter.toLowerCase()) && !p.name.toLowerCase().includes(breedFilter.toLowerCase())) {
          return false;
        }
      }

      // Gender filter
      if (genderFilter !== 'All') {
        if (p.gender.toLowerCase() !== genderFilter.toLowerCase() && !p.name.toLowerCase().includes(genderFilter.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [whereFilter, breedFilter, genderFilter]);

  return (
    <div data-page="pups" className="tp-page">
      <section aria-labelledby="pups-title" className="tp-sketchbook min-h-screen">
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-6 md:pt-10">
          {/* Header & Interactive Self-Portrait */}
          <div className="tp-sketchbook__head">
            <div className="tp-sketchbook__words">
              <p className="font-scrawl text-lg text-toffee-ink" data-reveal="true">
                from Teddy&apos;s sketchbook
              </p>
              <h1 id="pups-title" className="font-plush text-giant tp-sketchbook__title" data-reveal="true">
                Available puppies
                <svg aria-hidden="true" viewBox="0 0 400 24" preserveAspectRatio="none" className="tp-sketchbook__underline">
                  <path d="M4 15c40-9 70 5 112-2s70-9 112 0 74 8 116-1 38-4 52 1" pathLength="1"></path>
                </svg>
              </h1>
              <p className="tp-sketchbook__lede text-lede mt-6 max-w-[46ch] text-cocoa-soft" data-reveal="true">
                Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.
              </p>
            </div>

            {/* Interactive Self-Portrait mascot */}
            <div className="tp-sketchbook__self" data-reveal="true">
              <div className="w-44 md:w-56 cursor-pointer transition-transform hover:scale-105" title="Teddy, saying hello!">
                <TeddyMascot pose="sit" facing="left" interactive={true} />
              </div>
              <span className="font-scrawl tp-sketchbook__caption block text-center mt-2 text-toffee-ink">
                self-portrait
              </span>
            </div>
          </div>

          {/* Filter Bar (Where, Breed, Boy or Girl) */}
          <div className="mt-12 rounded-3xl border-2 border-cocoa/15 bg-milk/80 p-6 shadow-sm backdrop-blur-sm">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Where filter */}
              <div>
                <label className="font-scrawl text-sm font-bold text-toffee-ink block mb-2">
                  📍 Where
                </label>
                <div className="flex flex-wrap gap-2">
                  {whereOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setWhereFilter(opt)}
                      className={`chip text-xs md:text-sm px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                        whereFilter === opt
                          ? 'bg-toffee text-milk shadow-sm border border-toffee'
                          : 'bg-milk/60 text-cocoa hover:bg-honey/30 border border-cocoa/20'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Breed filter */}
              <div>
                <label className="font-scrawl text-sm font-bold text-toffee-ink block mb-2">
                  🐾 Breed
                </label>
                <div className="flex flex-wrap gap-2">
                  {breeds.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setBreedFilter(opt)}
                      className={`chip text-xs md:text-sm px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                        breedFilter === opt
                          ? 'bg-toffee text-milk shadow-sm border border-toffee'
                          : 'bg-milk/60 text-cocoa hover:bg-honey/30 border border-cocoa/20'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Boy or Girl filter */}
              <div>
                <label className="font-scrawl text-sm font-bold text-toffee-ink block mb-2">
                  🎀 Boy or Girl
                </label>
                <div className="flex flex-wrap gap-2">
                  {genderOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setGenderFilter(opt)}
                      className={`chip text-xs md:text-sm px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                        genderFilter === opt
                          ? 'bg-toffee text-milk shadow-sm border border-toffee'
                          : 'bg-milk/60 text-cocoa hover:bg-honey/30 border border-cocoa/20'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active count indicator */}
            <div className="mt-4 pt-4 border-t border-cocoa/10 flex items-center justify-between text-xs md:text-sm text-cocoa/70">
              <span className="font-scrawl text-toffee-ink font-bold">
                Showing {filteredPuppies.length} available {filteredPuppies.length === 1 ? 'puppy' : 'puppies'}
              </span>
              {(whereFilter !== 'All' || breedFilter !== 'All' || genderFilter !== 'All') && (
                <button
                  type="button"
                  onClick={() => {
                    setWhereFilter('All');
                    setBreedFilter('All');
                    setGenderFilter('All');
                  }}
                  className="underline hover:text-toffee-deep font-semibold"
                >
                  Reset all filters
                </button>
              )}
            </div>
          </div>

          {/* Puppies Grid */}
          <div className="mt-12">
            {filteredPuppies.length === 0 ? (
              <div className="py-20 text-center">
                <p className="font-plush text-2xl text-cocoa">No puppies found with these filters.</p>
                <button
                  onClick={() => {
                    setWhereFilter('All');
                    setBreedFilter('All');
                    setGenderFilter('All');
                  }}
                  className="btn btn-primary mt-6"
                >
                  View all puppies
                </button>
              </div>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredPuppies.map((puppy, idx) => (
                  <li key={puppy.id}>
                    <PuppyCard puppy={puppy} index={idx} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
