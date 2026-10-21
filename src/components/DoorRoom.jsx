import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { puppiesData } from '../data/puppies';

export default function DoorRoom() {
  const [openDoors, setOpenDoors] = useState({});

  const featured = puppiesData.slice(0, 4);

  const toggleDoor = (id) => {
    setOpenDoors(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="tp-meet__hall grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {featured.map((pup) => {
        const isOpen = openDoors[pup.id];
        return (
          <div
            key={pup.id}
            className="tp-door relative aspect-[3/4] rounded-t-full bg-honey/40 border-4 border-cocoa p-2 shadow-lg transition-transform duration-300 hover:-translate-y-1"
            onMouseEnter={() => setOpenDoors(prev => ({ ...prev, [pup.id]: true }))}
            onMouseLeave={() => setOpenDoors(prev => ({ ...prev, [pup.id]: false }))}
            onClick={() => toggleDoor(pup.id)}
          >
            {/* Door Frame Inner Room */}
            <div className="tp-door__room relative size-full rounded-t-full overflow-hidden bg-amber-100 flex items-center justify-center">
              {/* Revealed Puppy Photo Inside Room */}
              <img
                src={pup.image}
                alt={pup.name}
                className="size-full object-cover object-center"
              />

              {/* Puppy Tag */}
              <div className="tp-door__tag absolute bottom-3 inset-x-3 bg-cocoa/90 text-milk p-2 rounded-xl text-center backdrop-blur-sm shadow">
                <span className="font-plush font-bold text-lg block text-honey">{pup.name}</span>
                <span className="text-xs text-milk/80 block">{pup.breed} · {pup.gender}</span>
                <Link
                  to={`/puppies/${pup.slug}`}
                  className="mt-1 inline-block text-[11px] font-bold text-honey underline hover:text-white"
                >
                  Meet {pup.name} →
                </Link>
              </div>

              {/* Wooden Door Leaf (Swings open on hover) */}
              <div
                className={`tp-door__leaf absolute inset-0 rounded-t-full bg-[#8c532b] border-2 border-cocoa flex flex-col items-center justify-center transition-transform duration-700 origin-left shadow-2xl cursor-pointer ${
                  isOpen ? '-rotate-y-80 opacity-20 pointer-events-none' : 'rotate-y-0 opacity-100'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '800px',
                  transform: isOpen ? 'rotateY(-85deg)' : 'rotateY(0deg)'
                }}
              >
                {/* Peephole */}
                <div className="tp-door__peephole size-10 rounded-full border-4 border-honey bg-cocoa/60 flex items-center justify-center shadow-inner">
                  <span className="text-xs text-honey">👁️</span>
                </div>

                {/* Wood planks grain lines */}
                <div className="w-full h-1/2 border-y-2 border-cocoa/20 my-4" />

                {/* Brass Plate with Name */}
                <div className="tp-door__plate bg-honey text-cocoa px-3 py-1 rounded border border-cocoa font-plush text-xs font-bold uppercase tracking-wider shadow">
                  Room of {pup.name}
                </div>

                {/* Brass Knob */}
                <div className="tp-door__knob absolute right-3 top-1/2 -translate-y-1/2 size-5 rounded-full bg-honey border-2 border-cocoa shadow-md" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
