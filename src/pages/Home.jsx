import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import { puppiesData } from '../data/puppies';
import { polaroidsData } from '../data/polaroids';
import { faqsData } from '../data/faqs';
import HeroStage from '../components/HeroStage';
import PuppyCard from '../components/PuppyCard';
import DoorRoom from '../components/DoorRoom';
import PhoneChat from '../components/PhoneChat';
import PolaroidCard from '../components/PolaroidCard';
import { PawIcon } from '../components/Navbar';

export default function Home() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  const featuredPuppies = puppiesData.slice(0, 6);
  const featuredPolaroids = polaroidsData.slice(0, 8);
  const homeFaqs = faqsData.slice(0, 5);

  return (
    <div data-page="home" className="tp-page">
      {/* 1. HERO SECTION (EXACT REFERENCE MATCH) */}
      <section id="hero-title" className="tp-scene tp-hero relative pt-8 pb-0 overflow-hidden bg-[#fffdf8]">
        {/* Decorative Golden Sun */}
        <div className="tp-hero__sun absolute top-6 right-10 md:right-24 size-32 md:size-48 rounded-full bg-honey/40 blur-2xl pointer-events-none" />

        <div className="gutter mx-auto max-w-7xl relative z-10 text-center">
          {/* Note: "every puppy is family" with cute hand-drawn scribble wave underline */}
          <div className="inline-block relative mb-3">
            <span className="tp-hero__note font-scrawl text-2xl sm:text-3xl text-toffee-deep font-bold relative inline-block">
              every puppy is family
              <svg viewBox="0 0 220 24" preserveAspectRatio="none" className="absolute -bottom-2.5 left-0 h-3.5 w-full text-toffee-deep" aria-hidden="true">
                <path d="M4 14c18-10 30 8 48-1s28-9 46 0 30 8 48-1 30-9 48 0 18 2 22 0" fill="none" stroke="#c2622b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          {/* Headline */}
          <h1 className="tp-hero__title font-plush text-5xl sm:text-7xl md:text-8xl font-black text-cocoa leading-[1.05] tracking-tight max-w-4xl mx-auto mt-2">
            <span className="tp-hero__line block">Premium teacup</span>
            <span className="tp-hero__line tp-hero__line--2 block">puppies in Dubai</span>
          </h1>

          {/* Subtitle */}
          <p className="tp-hero__lede font-sans text-base sm:text-xl text-cocoa/80 max-w-2xl mx-auto mt-5 leading-relaxed">
            Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
          </p>

          {/* Action Buttons */}
          <div className="tp-hero__actions mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/puppies"
              className="btn btn-primary px-8 py-3.5 rounded-full font-bold text-milk bg-[#8c3b16] hover:bg-[#732f11] transition-all shadow-md hover:scale-105 inline-block text-base"
            >
              View available puppies
            </Link>
            <a
              href={siteConfig.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost px-8 py-3.5 rounded-full font-bold text-cocoa bg-[#fffdf8] border-2 border-cocoa hover:bg-honey/30 transition-all shadow-sm hover:scale-105 inline-block text-base"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>

        {/* Arched Puppy Windows Stage with Cartoon Teddy and Quilted Scalloped Fence */}
        <HeroStage />
      </section>

      {/* 2. MEET THE PUPS (DOOR ROOMS) */}
      <section id="meet-title" className="tp-scene tp-meet py-20 bg-honey/20 border-y border-cocoa/10">
        <div className="gutter mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-scrawl text-2xl text-toffee-deep font-bold block mb-1">
              knock knock 🐾
            </span>
            <h2 className="font-plush text-3xl sm:text-5xl font-extrabold text-cocoa">
              Meet the pups
            </h2>
            <p className="text-cocoa/75 text-sm sm:text-base mt-3">
              Peek behind the doors of our Downtown playroom or visit in person. Each puppy is showered with gentle care and socialization.
            </p>
          </div>

          <DoorRoom />

          <div className="text-center mt-12">
            <Link
              to="/puppies"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-cocoa border-2 border-cocoa bg-milk hover:bg-honey transition-colors shadow-sm"
            >
              <span>View all available puppies ({puppiesData.length})</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. TWO WAYS TO MEET YOUR PUPPY */}
      <section id="paths-title" className="tp-scene tp-paths py-20">
        <div className="gutter mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-scrawl text-2xl text-toffee-deep font-bold block mb-1">
              your dream companion 🐶
            </span>
            <h2 className="font-plush text-3xl sm:text-5xl font-extrabold text-cocoa">
              Two ways to meet your puppy
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Way 1: Downtown Showroom */}
            <div className="tp-way tp-way--left p-8 md:p-10 rounded-[2.5rem] bg-[#fdfaf3] border-2 border-cocoa/15 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
              <div>
                <span className="font-scrawl text-xl text-toffee font-bold block mb-2">
                  Way 01 · Local in UAE
                </span>
                <h3 className="font-plush text-2xl md:text-3xl font-extrabold text-cocoa">
                  Visit our Downtown Dubai Showroom
                </h3>
                <p className="text-sm md:text-base text-cocoa/80 mt-3 leading-relaxed">
                  Cuddle, play, and connect with our resident puppies in a relaxing private atmosphere in the heart of Downtown Dubai. Same-day adoption with complete UAE health passport.
                </p>
                <ul className="space-y-2 mt-6 text-sm text-cocoa/85 font-medium">
                  <li>✓ Private, hygienic VIP appointment slots</li>
                  <li>✓ Cuddle and observe puppy personality firsthand</li>
                  <li>✓ Same-day take home with full luxury starter kit</li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-cocoa/10 flex items-center justify-between">
                <span className="text-xs font-bold text-toffee-deep">Downtown Dubai</span>
                <Link
                  to="/contact"
                  className="font-bold text-sm text-cocoa underline hover:text-toffee"
                >
                  Book showroom visit →
                </Link>
              </div>
            </div>

            {/* Way 2: Rare Breed Import */}
            <div className="tp-way tp-way--right p-8 md:p-10 rounded-[2.5rem] bg-[#fdfaf3] border-2 border-cocoa/15 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
              <div>
                <span className="font-scrawl text-xl text-toffee-deep font-bold block mb-2">
                  Way 02 · Worldwide Import
                </span>
                <h3 className="font-plush text-2xl md:text-3xl font-extrabold text-cocoa">
                  Reserve a Rare Import Puppy
                </h3>
                <p className="text-sm md:text-base text-cocoa/80 mt-3 leading-relaxed">
                  Looking for a rare Korean teacup bloodline, micro Maltipoo, or silver toy poodle? We partner directly with verified ethical breeders in South Korea and Europe.
                </p>
                <ul className="space-y-2 mt-6 text-sm text-cocoa/85 font-medium">
                  <li>✓ Rare micro bloodlines with pedigree certificates</li>
                  <li>✓ Weekly 4K HD videos & health updates while growing</li>
                  <li>✓ VIP climate-controlled courier flight into Dubai</li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-cocoa/10 flex items-center justify-between">
                <span className="text-xs font-bold text-toffee-deep">Seoul ✈️ Dubai</span>
                <a
                  href={siteConfig.getWhatsAppUrl("Hi TeddyPups, I'm interested in reserving a rare import teacup puppy!")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-sm text-cocoa underline hover:text-toffee"
                >
                  Inquire import process →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. YOUR PUPPY JOURNEY (CHAT SIMULATION) */}
      <section id="journey-title" className="tp-scene tp-chat py-20 bg-honey/15 border-y border-cocoa/10">
        <div className="gutter mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-scrawl text-2xl text-toffee-deep font-bold block mb-1">
              simple & transparent 💬
            </span>
            <h2 className="font-plush text-3xl sm:text-5xl font-extrabold text-cocoa">
              Your puppy journey
            </h2>
            <p className="text-cocoa/75 text-sm sm:text-base mt-3">
              From your first friendly greeting to settling your puppy into their forever home, we guide you every step of the way.
            </p>
          </div>

          <PhoneChat />
        </div>
      </section>

      {/* 5. TRUST & PASSPORT */}
      <section id="trust-title" className="tp-scene tp-passport py-20">
        <div className="gutter mx-auto max-w-6xl">
          <div className="bg-[#2a170e] text-milk rounded-[3rem] p-8 md:p-14 relative overflow-hidden shadow-2xl">
            <div className="max-w-2xl relative z-10">
              <span className="font-scrawl text-2xl text-honey font-bold block mb-2">
                health & ethical care promise 🛡️
              </span>
              <h2 className="font-plush text-3xl sm:text-5xl font-extrabold text-honey">
                Why families trust TeddyPups
              </h2>
              <p className="text-milk/80 text-sm sm:text-base mt-4 leading-relaxed">
                We believe bringing a puppy into your family is a lifelong commitment. That’s why we hold the highest standards of ethical care, transparent health certifications, and continuous support.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mt-8">
                <div className="bg-milk/10 p-5 rounded-2xl border border-milk/15">
                  <div className="text-honey text-2xl font-bold font-plush">100%</div>
                  <div className="font-bold text-sm mt-1">Veterinarian Certified</div>
                  <p className="text-xs text-milk/70 mt-1">Full medical check, deworming, and core vaccinations.</p>
                </div>
                <div className="bg-milk/10 p-5 rounded-2xl border border-milk/15">
                  <div className="text-honey text-2xl font-bold font-plush">ISO Microchip</div>
                  <div className="font-bold text-sm mt-1">Global Standard ID</div>
                  <p className="text-xs text-milk/70 mt-1">Registered with international tracking and UAE documentation.</p>
                </div>
                <div className="bg-milk/10 p-5 rounded-2xl border border-milk/15">
                  <div className="text-honey text-2xl font-bold font-plush">1-Year</div>
                  <div className="font-bold text-sm mt-1">Congenital Guarantee</div>
                  <p className="text-xs text-milk/70 mt-1">Comprehensive written health warranty for your puppy.</p>
                </div>
                <div className="bg-milk/10 p-5 rounded-2xl border border-milk/15">
                  <div className="text-honey text-2xl font-bold font-plush">24/7 Support</div>
                  <div className="font-bold text-sm mt-1">Lifetime Guidance</div>
                  <p className="text-xs text-milk/70 mt-1">Nutritional, training, and care advice anytime on WhatsApp.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HAPPY FAMILIES & POLAROIDS */}
      <section id="dusk-title" className="tp-scene tp-dusk py-20 bg-honey/20 border-y border-cocoa/10">
        <div className="gutter mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-scrawl text-2xl text-toffee-deep font-bold block mb-1">
              sweet memories 📷
            </span>
            <h2 className="font-plush text-3xl sm:text-5xl font-extrabold text-cocoa">
              Happy families & puppies
            </h2>
            <p className="text-cocoa/75 text-sm sm:text-base mt-3">
              Moments of joy from our wonderful community of pet parents across Dubai and the UAE.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {featuredPolaroids.map((item) => (
              <PolaroidCard
                key={item.id}
                item={item}
                onClick={(it) => setSelectedPhoto(it)}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/happy-families"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-cocoa border-2 border-cocoa bg-milk hover:bg-honey transition-colors shadow-sm"
            >
              <span>Explore all happy families gallery ({polaroidsData.length})</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. QUESTIONS, ANSWERED (FAQ PREVIEW) */}
      <section id="questions-title" className="tp-scene tp-night py-20">
        <div className="gutter mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <span className="font-scrawl text-2xl text-toffee-deep font-bold block mb-1">
              got queries? 💡
            </span>
            <h2 className="font-plush text-3xl sm:text-5xl font-extrabold text-cocoa">
              Questions, answered
            </h2>
          </div>

          <div className="space-y-4">
            {homeFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border-2 border-cocoa/15 bg-white p-5 shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full text-left font-plush text-lg sm:text-xl font-bold text-cocoa flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="text-toffee-deep font-bold text-2xl leading-none">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="text-sm sm:text-base text-cocoa/80 mt-3 pt-3 border-t border-cocoa/10 leading-relaxed font-sans">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link to="/faq" className="text-toffee-deep font-bold text-sm underline hover:text-cocoa">
              Read all frequently asked questions →
            </Link>
          </div>
        </div>
      </section>

      {/* 8. READY TO MEET (BIG CTA) */}
      <section id="cta-title" className="tp-scene tp-home py-16 bg-honey/40 border-t border-cocoa/10 text-center">
        <div className="gutter mx-auto max-w-3xl">
          <span className="font-scrawl text-2xl text-toffee-deep font-bold block mb-2">
            a lifetime of puppy love starts here ♡
          </span>
          <h2 className="font-plush text-3xl sm:text-5xl font-extrabold text-cocoa">
            Ready to meet your new best friend?
          </h2>
          <p className="text-sm sm:text-base text-cocoa/80 mt-4 max-w-xl mx-auto leading-relaxed">
            Our puppy advisors are delighted to assist you with photos, videos, and private showroom visits in Downtown Dubai.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={siteConfig.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp px-9 py-4 rounded-full font-bold text-base shadow-xl hover:scale-105 transition-all"
            >
              Chat on WhatsApp: {siteConfig.phone}
            </a>
            <Link
              to="/contact"
              className="px-8 py-4 rounded-full font-bold text-cocoa bg-milk border-2 border-cocoa hover:bg-honey transition-colors shadow-sm"
            >
              Downtown Showroom Details
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[1000] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="max-w-2xl bg-white p-4 rounded-3xl shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-2 right-2 size-10 rounded-full bg-cocoa text-milk flex items-center justify-center font-bold text-lg hover:bg-toffee transition-colors shadow"
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
    </div>
  );
}
