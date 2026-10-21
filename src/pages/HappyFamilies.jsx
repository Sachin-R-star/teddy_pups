import React, { useState } from 'react';
import { polaroidsData } from '../data/polaroids';
import PolaroidCard from '../components/PolaroidCard';
import { siteConfig } from '../data/siteConfig';
import { PawIcon } from '../components/Navbar';

export default function HappyFamilies() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [visibleCount, setVisibleCount] = useState(24);

  const displayedPolaroids = polaroidsData.slice(0, visibleCount);

  return (
    <div data-page="happy-families" className="tp-page pt-10 pb-24">
      <div className="gutter mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="tp-memories__head text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-honey/60 text-cocoa font-bold text-xs mb-4 border border-cocoa/10 shadow-sm">
            <PawIcon className="size-4 text-toffee-deep" />
            <span>Real Stories & Moments</span>
          </div>

          <h1 className="font-plush text-4xl sm:text-6xl font-extrabold text-cocoa leading-tight">
            Happy families
          </h1>
          <p className="font-sans text-base sm:text-lg text-cocoa/75 mt-3 max-w-xl mx-auto">
            A wall of love featuring our pet parents across Dubai, Abu Dhabi, and beyond with their beloved teacup companions.
          </p>
        </div>

        {/* Polaroids Wall Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedPolaroids.map((item) => (
            <PolaroidCard
              key={item.id}
              item={item}
              onClick={(it) => setSelectedPhoto(it)}
            />
          ))}
        </div>

        {/* Load more button */}
        {visibleCount < polaroidsData.length && (
          <div className="text-center mt-12">
            <button
              type="button"
              onClick={() => setVisibleCount(prev => prev + 20)}
              className="px-8 py-3.5 rounded-full font-bold bg-cocoa text-milk hover:bg-toffee-deep transition-all shadow-md text-sm cursor-pointer"
            >
              Load more memories ({polaroidsData.length - visibleCount} remaining)
            </button>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-[1000] bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="max-w-2xl bg-white p-4 rounded-3xl shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 size-10 rounded-full bg-cocoa text-milk flex items-center justify-center font-bold text-lg hover:bg-toffee transition-colors shadow z-10"
              >
                ✕
              </button>
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.caption}
                className="rounded-2xl max-h-[75vh] w-auto mx-auto object-contain"
              />
              <p className="font-scrawl text-2xl text-cocoa text-center mt-3 font-bold">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-20 text-center bg-honey/30 p-10 rounded-[2.5rem] border-2 border-cocoa/15 max-w-4xl mx-auto">
          <span className="font-scrawl text-2xl text-toffee-deep font-bold block mb-1">
            join our family ♡
          </span>
          <h2 className="font-plush text-2xl sm:text-3xl font-extrabold text-cocoa">
            Ready to write your own puppy love story?
          </h2>
          <div className="mt-6">
            <a
              href={siteConfig.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp px-8 py-3.5 rounded-full font-bold text-sm shadow-md"
            >
              Connect with TeddyPups on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
