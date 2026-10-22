import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPuppyBySlug, getRelatedPuppies } from '../data/puppies';
import { siteConfig } from '../data/siteConfig';
import PuppyCard from '../components/PuppyCard';
import { PawIcon } from '../components/Navbar';
import TeddyMascot from '../components/TeddyMascot';

export default function PuppyDetail() {
  const { slug } = useParams();
  const puppy = getPuppyBySlug(slug);

  const [activeTab, setActiveTab] = useState('overview');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  if (!puppy) {
    return (
      <div className="gutter mx-auto max-w-4xl py-32 text-center">
        <span className="text-5xl block mb-4">🐾</span>
        <h1 className="font-plush text-4xl font-extrabold text-cocoa">Puppy Not Found</h1>
        <p className="text-cocoa/75 mt-3">The puppy you are looking for might have already found their forever home.</p>
        <div className="mt-8">
          <Link to="/puppies" className="btn btn-primary px-8 py-3 rounded-full font-bold bg-cocoa text-milk">
            Browse all available puppies →
          </Link>
        </div>
      </div>
    );
  }

  const related = getRelatedPuppies(puppy.slug, 3);
  const whatsAppInquiry = siteConfig.getWhatsAppUrl(
    `Hi TeddyPups! I'm interested in adopting ${puppy.name} (${puppy.breed}, ${puppy.gender}, ${puppy.age}). Is ${puppy.name} available for a showroom visit?`
  );

  return (
    <div data-page="pup" className="tp-page pt-6 pb-24">
      <div className="gutter mx-auto max-w-7xl">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold text-cocoa/60 flex items-center gap-2">
          <Link to="/" className="hover:text-toffee-deep">Home</Link>
          <span>/</span>
          <Link to="/puppies" className="hover:text-toffee-deep">Puppies</Link>
          <span>/</span>
          <span className="text-cocoa font-bold">{puppy.name}</span>
        </nav>

        {/* Main Showcase Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Photo & Video Frame */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-honey/30 border-4 border-cocoa/20 shadow-xl group">
              <img
                src={puppy.image}
                alt={puppy.name}
                className="size-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Status Badge */}
              <span
                className={`absolute top-4 left-4 font-scrawl text-sm font-bold px-4 py-1.5 rounded-full shadow-md ${
                  puppy.status === 'Gone Home'
                    ? 'bg-rose-500 text-white'
                    : 'bg-milk text-cocoa border border-cocoa/20'
                }`}
              >
                {puppy.status}
              </span>

              {/* Video Play Button Overlay */}
              {puppy.hasVideo && (
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="absolute bottom-5 right-5 bg-cocoa/90 hover:bg-toffee-deep text-milk text-xs font-bold px-4 py-2.5 rounded-full backdrop-blur-md flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
                >
                  <span className="text-sm">▶</span> Watch play video
                </button>
              )}
            </div>

            {/* Micro details pills */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs font-semibold text-cocoa/80">
              <div className="bg-honey/30 p-3 rounded-2xl border border-cocoa/10">
                <span className="block text-toffee-deep font-bold">Breed</span>
                <span>{puppy.breed}</span>
              </div>
              <div className="bg-honey/30 p-3 rounded-2xl border border-cocoa/10">
                <span className="block text-toffee-deep font-bold">Gender</span>
                <span>{puppy.gender}</span>
              </div>
              <div className="bg-honey/30 p-3 rounded-2xl border border-cocoa/10">
                <span className="block text-toffee-deep font-bold">Age</span>
                <span>{puppy.age}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Puppy Story & Details */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-honey/60 text-cocoa font-bold text-xs mb-3 border border-cocoa/10">
                <PawIcon className="size-3.5 text-toffee-deep" />
                <span>Downtown Dubai VIP Showroom</span>
              </div>

              <h1 className="font-plush text-4xl sm:text-5xl font-extrabold text-cocoa leading-tight">
                {puppy.name}
              </h1>

              <p className="text-sm sm:text-base text-cocoa/80 mt-2 font-medium">
                {puppy.breed} · {puppy.gender} · {puppy.age}
              </p>
            </div>

            {/* Quick Summary Card */}
            <div className="relative p-6 rounded-3xl bg-[#fdfaf3] border-2 border-cocoa/15 shadow-sm space-y-4">
              <div className="absolute -top-20 right-2 w-24 pointer-events-auto z-20">
                <TeddyMascot pose="sit" facing="left" interactive={true} />
              </div>
              <h2 className="font-plush text-lg font-bold text-cocoa flex items-center gap-2">
                <span>📋</span> Puppy Specifications & Pedigree
              </h2>

              <dl className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <dt className="text-cocoa/60 font-medium">Location</dt>
                  <dd className="font-bold text-cocoa">{puppy.where}</dd>
                </div>
                <div>
                  <dt className="text-cocoa/60 font-medium">Origin</dt>
                  <dd className="font-bold text-cocoa">{puppy.origin}</dd>
                </div>
                <div>
                  <dt className="text-cocoa/60 font-medium">Adult Weight (Est.)</dt>
                  <dd className="font-bold text-cocoa">{puppy.weight}</dd>
                </div>
                <div>
                  <dt className="text-cocoa/60 font-medium">Color Coat</dt>
                  <dd className="font-bold text-cocoa">{puppy.color}</dd>
                </div>
                <div>
                  <dt className="text-cocoa/60 font-medium">Microchip</dt>
                  <dd className="font-bold text-emerald-700">✓ Implanted (ISO 15-digit)</dd>
                </div>
                <div>
                  <dt className="text-cocoa/60 font-medium">Vaccination</dt>
                  <dd className="font-bold text-emerald-700">✓ Up to Date</dd>
                </div>
              </dl>
            </div>

            {/* Personality & Temperament */}
            <div className="p-6 rounded-3xl bg-honey/20 border-2 border-cocoa/10 space-y-2">
              <h3 className="font-plush text-base font-bold text-cocoa flex items-center gap-2">
                <span>✨</span> Personality & Traits
              </h3>
              <p className="text-sm text-cocoa/80 leading-relaxed font-sans">
                {puppy.name} is cheerful, sociable, and raised with gentle human interaction. Accustomed to indoor grooming and puppy pad training. Hypoallergenic coat ideal for indoor luxury living in apartments or villas.
              </p>
            </div>

            {/* What's Included */}
            <div className="p-6 rounded-3xl bg-milk border-2 border-cocoa/15 shadow-sm space-y-3">
              <h3 className="font-plush text-base font-bold text-cocoa flex items-center gap-2">
                <span>🎁</span> What comes with {puppy.name}:
              </h3>
              <ul className="text-xs sm:text-sm text-cocoa/80 space-y-2 font-medium">
                <li className="flex items-center gap-2">✓ Official UAE Veterinary Health Passport & MOCCAE clearance</li>
                <li className="flex items-center gap-2">✓ ISO International Microchip registration certificate</li>
                <li className="flex items-center gap-2">✓ 1-Year Congenital & Hereditary Health Guarantee</li>
                <li className="flex items-center gap-2">✓ Luxury Welcome Kit: food, treats, toys, comfort scent blanket</li>
                <li className="flex items-center gap-2">✓ 24/7 Lifelong post-adoption WhatsApp advisor support</li>
              </ul>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2 space-y-3">
              <a
                href={whatsAppInquiry}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp w-full text-center py-4 rounded-full font-bold text-base shadow-xl hover:scale-[1.02] transition-transform block"
              >
                Inquire & Adopt {puppy.name} on WhatsApp
              </a>

              <p className="text-center text-xs text-cocoa/60">
                Direct phone: {siteConfig.phone} · Downtown Dubai showroom
              </p>
            </div>
          </div>
        </div>

        {/* Related Puppies */}
        {related.length > 0 && (
          <div className="mt-24 pt-16 border-t-2 border-dashed border-cocoa/20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-plush text-2xl sm:text-3xl font-extrabold text-cocoa">
                Other puppies you might love
              </h2>
              <Link to="/puppies" className="text-sm font-bold text-toffee-deep underline hover:text-cocoa">
                View all puppies →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((pup, idx) => (
                <PuppyCard key={pup.id} puppy={pup} index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Video Modal Simulation */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-[1000] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="max-w-lg w-full bg-white p-6 rounded-3xl shadow-2xl relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-3 right-3 size-8 rounded-full bg-cocoa text-milk flex items-center justify-center font-bold"
            >
              ✕
            </button>

            <span className="text-4xl block mb-2">🎬</span>
            <h3 className="font-plush text-2xl font-bold text-cocoa">
              Watch {puppy.name} in Action!
            </h3>
            <p className="text-xs sm:text-sm text-cocoa/75 mt-2">
              For real-time 4K HD playtime videos of {puppy.name}, our advisors send live clips directly on WhatsApp.
            </p>

            <div className="mt-6">
              <a
                href={whatsAppInquiry}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp w-full py-3.5 rounded-full font-bold text-sm block"
              >
                Send me HD Video Clips on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
