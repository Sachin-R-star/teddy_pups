import React, { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import { PawIcon } from '../components/Navbar';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    breed: 'Maltipoo',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Pre-fill WhatsApp and open
    const text = `Hi TeddyPups! My name is ${formData.name || 'Friend'}. I am interested in a ${formData.breed}. My message/visit request: "${formData.message || 'I would love to arrange a visit to your Downtown showroom.'}"`;
    window.open(siteConfig.getWhatsAppUrl(text), '_blank');
  };

  return (
    <div data-page="contact" className="tp-page pt-10 pb-24">
      <div className="gutter mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-honey/60 text-cocoa font-bold text-xs mb-4 border border-cocoa/10 shadow-sm">
            <PawIcon className="size-4 text-toffee-deep" />
            <span>Showroom & Appointments</span>
          </div>

          <h1 className="font-plush text-4xl sm:text-6xl font-extrabold text-cocoa leading-tight">
            Get in touch with us
          </h1>
          <p className="font-sans text-base sm:text-lg text-cocoa/75 mt-3">
            Visit our boutique showroom in Downtown Dubai or speak with our puppy care advisors today.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Handwritten Letter Form */}
          <div className="lg:col-span-7">
            <div className="tp-post p-8 sm:p-12 rounded-[2.5rem] bg-[#fefcf8] border-2 border-cocoa/20 shadow-xl relative overflow-hidden">
              {/* Wax Seal Stamp Decoration */}
              <div className="absolute top-6 right-6 size-14 rounded-full bg-[#991b1b] text-milk flex items-center justify-center font-bold text-xs shadow-md border-2 border-[#7f1d1d] rotate-[12deg] select-none">
                VIP SEAL
              </div>

              <span className="font-scrawl text-2xl text-toffee-deep font-bold block mb-4">
                handwritten note ✍️
              </span>

              <form onSubmit={handleSubmit} className="space-y-6">
                <p className="font-scrawl text-2xl sm:text-3xl text-cocoa leading-relaxed">
                  Dear TeddyPups,
                  <br className="mb-2" />
                  My name is{' '}
                  <input
                    type="text"
                    required
                    placeholder="your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border-b-2 border-dashed border-cocoa/40 bg-transparent px-2 py-0.5 text-toffee-deep font-bold focus:border-toffee-deep focus:outline-none w-44 inline-block font-sans text-base"
                  />
                  . I would love to learn more about your available{' '}
                  <select
                    value={formData.breed}
                    onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                    className="border-b-2 border-dashed border-cocoa/40 bg-transparent px-2 py-0.5 text-toffee-deep font-bold focus:border-toffee-deep focus:outline-none inline-block font-sans text-base cursor-pointer"
                  >
                    <option value="Maltipoo">Maltipoo</option>
                    <option value="Pomeranian">Pomeranian</option>
                    <option value="Poodle">Poodle</option>
                    <option value="Pomsky">Pomsky</option>
                    <option value="Shih Tzu">Shih Tzu</option>
                    <option value="Bichon Frise">Bichon Frise</option>
                  </select>{' '}
                  puppies.
                </p>

                <div>
                  <label className="block text-xs font-bold text-cocoa/70 uppercase tracking-wider mb-2 font-sans">
                    My Phone Number / WhatsApp:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+971 50 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-cocoa/15 bg-white text-cocoa text-sm focus:border-toffee-deep focus:outline-none shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-cocoa/70 uppercase tracking-wider mb-2 font-sans">
                    Preferred Visit Date or Custom Inquiry:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="We would love to arrange a showroom visit this weekend..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-cocoa/15 bg-white text-cocoa text-sm focus:border-toffee-deep focus:outline-none shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-whatsapp w-full py-4 rounded-full font-bold text-base shadow-lg hover:scale-[1.02] transition-transform cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>💬</span> Send Letter via WhatsApp
                </button>

                {submitted && (
                  <p className="text-center text-xs text-emerald-700 font-bold">
                    ✓ Opening WhatsApp with your message!
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Right Column: Showroom Details & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-[2.5rem] bg-[#fdfaf3] border-2 border-cocoa/15 shadow-sm space-y-5">
              <div>
                <span className="font-scrawl text-xl text-toffee-deep font-bold block mb-1">
                  downtown showroom 📍
                </span>
                <h2 className="font-plush text-2xl font-bold text-cocoa">
                  Visit us in Downtown Dubai
                </h2>
              </div>

              <div className="space-y-3 text-sm text-cocoa/80 font-sans">
                <p className="flex items-start gap-2.5">
                  <span className="text-base">📍</span>
                  <span><strong>Address:</strong> {siteConfig.address}</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <span className="text-base">🕒</span>
                  <span><strong>Visiting Hours:</strong> {siteConfig.showroomHours}</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <span className="text-base">📞</span>
                  <span><strong>Phone / WhatsApp:</strong> {siteConfig.phone}</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <span className="text-base">✉️</span>
                  <span><strong>Email:</strong> {siteConfig.email}</span>
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={siteConfig.getWhatsAppUrl("Hi TeddyPups! I'd like to book an appointment to visit your Downtown Dubai showroom.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp w-full text-center py-3 rounded-full font-bold text-sm block shadow-md"
                >
                  Book Showroom Appointment
                </a>
              </div>
            </div>

            {/* Interactive Location Card */}
            <div className="rounded-[2.5rem] overflow-hidden border-2 border-cocoa/15 shadow-md relative aspect-[16/9] bg-amber-50">
              <iframe
                title="Downtown Dubai Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14441.054366961476!2d55.26787884841686!3d25.197197022877114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e502e1ceb7e2!2sDowntown%20Dubai%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
