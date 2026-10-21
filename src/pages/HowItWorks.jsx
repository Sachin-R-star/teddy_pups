import React, { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import { PawIcon } from '../components/Navbar';

export default function HowItWorks() {
  const [activePath, setActivePath] = useState('local'); // 'local' | 'import'

  const localSteps = [
    {
      num: '01',
      title: 'Browse & Choose Your Favorite',
      text: 'Explore our catalog of puppies currently staying in our Downtown Dubai showroom. Review pictures, videos, and temperament notes.',
      icon: '🐾'
    },
    {
      num: '02',
      title: 'Private Showroom Meet & Cuddle',
      text: 'Schedule a private VIP appointment in Downtown Dubai. Spend peaceful quality time interacting, holding, and bonding with the puppy.',
      icon: '🏠'
    },
    {
      num: '03',
      title: 'Health Scan & Veterinary Clearance',
      text: 'Review the official UAE veterinary passport. We scan the 15-digit microchip with you to verify identification and vaccinations.',
      icon: '📋'
    },
    {
      num: '04',
      title: 'Welcome Home Same Day',
      text: 'Take your puppy home immediately or request VIP chauffeur delivery to your door with our luxury puppy starter care package.',
      icon: '🏡'
    }
  ];

  const importSteps = [
    {
      num: '01',
      title: 'Consultation & Custom Matching',
      text: 'Share your exact dream puppy preferences (teacup bloodline, color, gender, expected adult weight) with our senior breed advisors.',
      icon: '✨'
    },
    {
      num: '02',
      title: 'Breeder Sourcing & 4K Weekly Updates',
      text: 'We match you with champion ethical breeders in South Korea or Europe. Receive weekly 4K HD video clips and veterinary growth charts.',
      icon: '📹'
    },
    {
      num: '03',
      title: 'VIP Climate-Controlled Flight',
      text: 'Your puppy travels via an accredited pet courier on a temperature-controlled direct flight with dedicated in-flight veterinary care.',
      icon: '✈️'
    },
    {
      num: '04',
      title: 'UAE MOCCAE Inspection & Handover',
      text: 'Upon arrival at DXB, UAE Ministry of Climate Change and Environment vets complete entry clearance before luxury doorstep delivery.',
      icon: '🎁'
    }
  ];

  const currentSteps = activePath === 'local' ? localSteps : importSteps;

  return (
    <div data-page="how-it-works" className="tp-page pt-10 pb-24">
      <div className="gutter mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-honey/60 text-cocoa font-bold text-xs mb-4 border border-cocoa/10 shadow-sm">
            <PawIcon className="size-4 text-toffee-deep" />
            <span>Smooth, Transparent Adoption</span>
          </div>

          <h1 className="font-plush text-4xl sm:text-6xl font-extrabold text-cocoa leading-tight">
            How it works
          </h1>
          <p className="font-sans text-base sm:text-lg text-cocoa/75 mt-3 max-w-xl mx-auto">
            Whether adopting locally in Dubai or bringing home an imported teacup bloodline, we make every step seamless and comforting.
          </p>

          {/* Interactive Switcher */}
          <div className="mt-8 inline-flex p-1.5 bg-cocoa/5 rounded-full border-2 border-cocoa/20 shadow-inner">
            <button
              type="button"
              onClick={() => setActivePath('local')}
              className={`px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activePath === 'local'
                  ? 'bg-cocoa text-milk shadow-md'
                  : 'text-cocoa hover:text-toffee-deep'
              }`}
            >
              Option 1: Downtown Dubai Showroom
            </button>
            <button
              type="button"
              onClick={() => setActivePath('import')}
              className={`px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activePath === 'import'
                  ? 'bg-cocoa text-milk shadow-md'
                  : 'text-cocoa hover:text-toffee-deep'
              }`}
            >
              Option 2: Direct Worldwide Import
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {currentSteps.map((step) => (
            <div
              key={step.num}
              className="p-8 rounded-[2.5rem] bg-[#fdfaf3] border-2 border-cocoa/15 shadow-sm hover:shadow-md transition-shadow relative"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-plush text-3xl font-extrabold text-toffee-deep">
                  {step.num}
                </span>
                <span className="text-3xl size-12 rounded-2xl bg-honey/40 flex items-center justify-center">
                  {step.icon}
                </span>
              </div>
              <h2 className="font-plush text-2xl font-bold text-cocoa">
                {step.title}
              </h2>
              <p className="text-sm sm:text-base text-cocoa/80 mt-3 leading-relaxed font-sans">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        {/* Premium Puppy Promise Banner */}
        <div className="p-10 md:p-14 rounded-[3rem] bg-[#2a170e] text-milk shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="font-scrawl text-2xl text-honey font-bold block mb-2">
              pure peace of mind 🌟
            </span>
            <h2 className="font-plush text-3xl sm:text-4xl font-extrabold text-honey">
              Our premium puppy promise
            </h2>
            <p className="text-milk/80 text-sm sm:text-base mt-3 leading-relaxed">
              Every TeddyPups adoption includes comprehensive veterinary health records, microchip registration, 1-year hereditary guarantee, and lifetime nutritional and care guidance.
            </p>

            <div className="mt-8">
              <a
                href={siteConfig.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp px-8 py-3.5 rounded-full font-bold text-sm shadow-lg inline-block"
              >
                Discuss Adoption on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
