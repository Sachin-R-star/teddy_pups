import React, { useState, useMemo } from 'react';
import { faqsData } from '../data/faqs';
import { siteConfig } from '../data/siteConfig';
import { PawIcon } from '../components/Navbar';

export default function Faq() {
  const [openId, setOpenId] = useState(1);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Health & Meeting', 'Import & Travel', 'Care & Delivery'];

  const filteredFaqs = useMemo(() => {
    return faqsData.filter((item) => {
      const catMatch = activeCategory === 'All' || item.category === activeCategory;
      const queryMatch =
        !searchQuery ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return catMatch && queryMatch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div data-page="faq" className="tp-page pt-10 pb-24">
      <div className="gutter mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-honey/60 text-cocoa font-bold text-xs mb-4 border border-cocoa/10 shadow-sm">
            <PawIcon className="size-4 text-toffee-deep" />
            <span>Help & Information</span>
          </div>

          <h1 className="font-plush text-4xl sm:text-6xl font-extrabold text-cocoa leading-tight">
            Questions & answers
          </h1>
          <p className="font-sans text-base sm:text-lg text-cocoa/75 mt-3 max-w-xl mx-auto">
            Everything you need to know about puppy health, showroom visits, imported rare breeds, and post-adoption care in Dubai.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search a question (e.g. vaccinated, meeting, delivery)..."
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

          {/* Categories */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-toffee-deep text-milk shadow-md scale-105'
                    : 'bg-white border border-cocoa/15 text-cocoa hover:bg-honey/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-3xl border-2 border-cocoa/15 bg-white p-6 shadow-sm hover:border-toffee/50 transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full text-left font-plush text-lg sm:text-xl font-bold text-cocoa flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="text-toffee-deep font-bold text-2xl shrink-0 leading-none">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-cocoa/10 font-sans text-sm sm:text-base text-cocoa/80 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-honey/20 rounded-3xl p-6 border border-dashed border-cocoa/20">
              <p className="text-cocoa font-bold">No questions found matching your search.</p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                className="mt-3 text-xs text-toffee-deep font-bold underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Still have questions card */}
        <div className="mt-16 bg-honey/30 p-8 sm:p-10 rounded-[2.5rem] border-2 border-cocoa/15 text-center">
          <span className="text-4xl block mb-2">💬</span>
          <h2 className="font-plush text-2xl font-bold text-cocoa">
            Still have questions?
          </h2>
          <p className="text-sm text-cocoa/75 mt-2 max-w-md mx-auto">
            Our puppy specialists are happy to answer any questions about our teacup puppies, certifications, or VIP showroom visits.
          </p>
          <div className="mt-6">
            <a
              href={siteConfig.getWhatsAppUrl("Hi TeddyPups! I have a question about your puppies in Dubai.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp px-8 py-3.5 rounded-full font-bold text-sm shadow-md"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
