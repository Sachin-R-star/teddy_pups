import React, { useState, useEffect, useRef } from 'react';
import TeddyMascot from '../components/TeddyMascot';

const FAQ_ITEMS = [
  {
    id: "q-vaccine",
    q: "Are your puppies vaccinated and health-checked?",
    a: "Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.",
    pin: "var(--color-toffee)",
    tilt: "-1.6deg"
  },
  {
    id: "q-meet",
    q: "Can I meet a puppy before I decide?",
    a: "Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision.",
    pin: "var(--color-sky-deep)",
    tilt: "1.2deg"
  },
  {
    id: "q-sameday",
    q: "Can I take my puppy home the same day?",
    a: "Local puppies are available immediately, so you can take your puppy home the same day.",
    pin: "#d9a13c",
    tilt: "-0.8deg"
  },
  {
    id: "q-import",
    q: "Do you import puppies from abroad?",
    a: "Yes. Through our Order Upon Request service we source rare and premium teacup breeds from the most reputable, certified breeders across Europe, Korea, and beyond — and we handle the import for you.",
    pin: "#c45a6a",
    tilt: "1.8deg"
  },
  {
    id: "q-travel",
    q: "How does an imported puppy travel to Dubai?",
    a: "We manage every part of the import process, including health checks, travel arrangements, and the necessary documentation, so your puppy arrives happy, healthy, and stress-free.",
    pin: "var(--color-toffee)",
    tilt: "-1.2deg"
  },
  {
    id: "q-photos",
    q: "Will I see photos and health details first?",
    a: "Yes. Photos, videos, and health certificates are shared before your puppy travels, and our team sends real photos and health details directly on WhatsApp.",
    pin: "var(--color-sky-deep)",
    tilt: "0.7deg"
  },
  {
    id: "q-deliver",
    q: "Do you deliver?",
    a: "Yes. We deliver within Dubai, and our trusted international cargo partners deliver puppies safely to loving homes all around the world.",
    pin: "#d9a13c",
    tilt: "-1.9deg"
  },
  {
    id: "q-breeds",
    q: "Which breeds do you usually have?",
    a: "Breeds we regularly have include Maltipoo, Pomeranian, Poodle and Bichon, plus rare teacup lines such as Korean teacup poodles, Maltese, Pom and Yorkie.",
    pin: "#c45a6a",
    tilt: "1.4deg"
  },
  {
    id: "q-help",
    q: "Is there help after my puppy comes home?",
    a: "Yes. Our team is available 24/7 and offers advice on training, nutrition, and general care to ensure a smooth transition for you and your new furry friend.",
    pin: "var(--color-toffee)",
    tilt: "-1.6deg"
  }
];

export default function Faq() {
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [visiblePins, setVisiblePins] = useState({});
  const noteRefs = useRef([]);

  const filteredItems = FAQ_ITEMS.filter(item =>
    item.q.toLowerCase().includes(search.toLowerCase()) ||
    item.a.toLowerCase().includes(search.toLowerCase())
  );

  // IntersectionObserver to dynamically colorize pins as they scroll into view (User Request Item 26)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-note-index');
            if (index !== null) {
              setVisiblePins(prev => ({ ...prev, [index]: true }));
            }
          }
        });
      },
      { threshold: 0.25, rootMargin: '0px 0px -40px 0px' }
    );

    noteRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filteredItems]);

  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div data-page="faq" className="tp-page">
      <section
        data-pup-scene="true"
        data-tone="dark"
        className="tp-scene tp-faqroom overflow-hidden"
        style={{ "--sky-top": "#a95e32", "--sky-bottom": "#331c11" }}
        aria-labelledby="faq-title"
      >
        <div className="gutter relative mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <header className="max-w-4xl">
            <h1 id="faq-title" className="font-plush text-giant">Questions &amp; answers</h1>
            <p className="text-lede mt-6 max-w-[52ch] text-[var(--ink-soft)]">
              Can't find what you're looking for? Message us on WhatsApp — our team is available 24/7.
            </p>
          </header>

          <div className="mt-12 md:mt-16">
            <div className="tp-notes">
              <aside className="tp-notes__side" aria-label="Find a question">
                <label htmlFor="faq-search" className="font-scrawl tp-notes__label">
                  sniff out a question
                </label>
                <div className="tp-notes__search">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="tp-notes__lens">
                    <circle cx="10.5" cy="10.5" r="6.5"></circle>
                    <path d="m15.5 15.5 5 5"></path>
                  </svg>
                  <input
                    id="faq-search"
                    type="search"
                    placeholder="delivery, Korea, vaccinated…"
                    autoComplete="off"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <p className="tp-notes__count" aria-live="polite">
                  {filteredItems.length} {filteredItems.length === 1 ? 'note' : 'notes'} on the board
                </p>

                {/* Interactive Mascot in FAQ Sidebar */}
                <div className="tp-notes__teddy" style={{ display: 'block', width: 'clamp(9rem, 14vw, 13rem)' }}>
                  <span aria-hidden="true" className="tp-notes__bubble font-plush">
                    <span className="tp-notes__q">?</span>
                    <span className="tp-notes__a">!</span>
                  </span>
                  <TeddyMascot pose="sit" facing="right" interactive={true} />
                </div>

                <a
                  href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I%20have%20a%20question%3A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp tp-notes__ask"
                >
                  Ask your own question
                </a>
              </aside>

              <div className="tp-notes__board">
                <ul className="tp-notes__list">
                  {filteredItems.map((item, index) => {
                    const isInView = !!visiblePins[index];
                    const isExpanded = expandedId === item.id;

                    return (
                      <li
                        key={item.id}
                        ref={(el) => (noteRefs.current[index] = el)}
                        data-note-index={index}
                        data-in-view={isInView ? "true" : "false"}
                        className={`tp-note ${isInView ? 'pin-active' : ''}`}
                        style={{
                          "--tilt": item.tilt,
                          "--pin": item.pin,
                          "--i": index
                        }}
                      >
                        {/* Pin colorizes when scrolled into view (Item 26) */}
                        <span
                          aria-hidden="true"
                          className="tp-note__pin"
                          style={{
                            background: isInView
                              ? `radial-gradient(circle at 34% 30%, #ffffffbf 0 16%, ${item.pin} 20%)`
                              : undefined
                          }}
                        ></span>

                        <h2 className="tp-note__q">
                          <button
                            type="button"
                            id={`btn-${item.id}`}
                            aria-expanded={isExpanded}
                            aria-controls={`answer-${item.id}`}
                            onClick={() => toggleExpand(item.id)}
                          >
                            <span className="font-plush-text">{item.q}</span>
                            <span
                              aria-hidden="true"
                              className="tp-note__chevron"
                              style={{
                                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.25s ease'
                              }}
                            ></span>
                          </button>
                        </h2>

                        <div
                          id={`answer-${item.id}`}
                          role="region"
                          aria-labelledby={`btn-${item.id}`}
                          className="tp-note__answer"
                          style={{
                            display: isExpanded ? 'block' : undefined
                          }}
                        >
                          <div className="tp-note__flap">
                            <p>{item.a}</p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
