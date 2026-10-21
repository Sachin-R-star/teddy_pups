import React, { useState } from 'react';
import { siteConfig } from '../data/siteConfig';

export default function PhoneChat() {
  const [activeTab, setActiveTab] = useState(0);

  const scenarios = [
    {
      title: '1. Say hello',
      text: 'Message us on WhatsApp. Tell us the puppy breed, color, or vibe you are dreaming of.',
      msgs: [
        { from: 'me', text: 'Hi TeddyPups! Do you currently have teacup Maltipoo or Pomeranian puppies available in Dubai? 🐶' },
        { from: 'them', text: 'Hello! Yes, we have two gorgeous teacup Maltipoos and a tiny Korean Pomeranian in our Downtown Dubai showroom today! ✨' },
        { from: 'them', type: 'media', caption: 'Meet Max (Maltipoo boy, 3 months)' }
      ]
    },
    {
      title: '2. Video or showroom',
      text: 'Join a live video call or come visit our cozy private showroom in Downtown Dubai to cuddle and bond.',
      msgs: [
        { from: 'me', text: 'Can I see a quick video of Max playing?' },
        { from: 'them', type: 'video_clip', duration: '0:24', text: 'Here is Max having playtime in the lounge! 🐾' },
        { from: 'them', text: 'Would you like to drop by our Downtown showroom tomorrow around 3 PM to meet him in person?' },
        { from: 'me', text: 'Yes please! Booking a slot for 3 PM.' }
      ]
    },
    {
      title: '3. Health passport',
      text: 'Every puppy receives full veterinarian checks, microchip, and UAE health certifications before going home.',
      msgs: [
        { from: 'them', text: 'Here are Max’s complete health records: fully vaccinated, microchipped with UAE MOCCAE documentation ready! 📋' },
        { from: 'me', text: 'That gives us so much peace of mind! Thank you so much.' }
      ]
    },
    {
      title: '4. Welcome home',
      text: 'Take your puppy home with a luxury starter pack, care guidelines, and 24/7 post-adoption advisor support.',
      msgs: [
        { from: 'them', text: 'Your welcome puppy kit is packed with organic food, blanket with mama scent, toys, and custom bed! 🏡❤️' },
        { from: 'me', text: 'Max has settled into our living room so well. We are in love!' }
      ]
    }
  ];

  const current = scenarios[activeTab];

  return (
    <div className="tp-chat__grid grid lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
      {/* Left Steps Navigation */}
      <div className="lg:col-span-7 space-y-4">
        {scenarios.map((sc, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveTab(idx)}
            className={`w-full text-left p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
              activeTab === idx
                ? 'bg-white border-toffee-deep shadow-md translate-x-1'
                : 'bg-milk/70 border-cocoa/10 hover:bg-white/60'
            }`}
          >
            <span
              className={`tp-chat__num font-plush size-9 rounded-full flex items-center justify-center font-bold text-lg shrink-0 ${
                activeTab === idx ? 'bg-toffee-deep text-milk' : 'bg-honey text-cocoa'
              }`}
            >
              {idx + 1}
            </span>
            <div>
              <h3 className="font-plush text-xl font-bold text-cocoa">{sc.title}</h3>
              <p className="text-sm text-cocoa/80 mt-1 leading-relaxed">{sc.text}</p>
            </div>
          </button>
        ))}

        <div className="pt-2">
          <a
            href={siteConfig.getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp inline-flex items-center gap-2 px-6 py-3 font-bold text-sm shadow-md"
          >
            <span>💬</span> Start your WhatsApp journey
          </a>
        </div>
      </div>

      {/* Right Smartphone Simulator */}
      <div className="lg:col-span-5 flex justify-center">
        <div className="w-full max-w-[320px] bg-stone-900 rounded-[2.8rem] p-3 shadow-2xl border-4 border-stone-800 relative">
          {/* Phone speaker/notch */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-stone-900 rounded-full z-20 flex items-center justify-center">
            <div className="w-12 h-1 bg-stone-700 rounded-full" />
          </div>

          {/* Screen Content */}
          <div className="bg-[#efeae2] rounded-[2.3rem] overflow-hidden pt-7 pb-4 flex flex-col h-[520px] shadow-inner text-xs font-sans">
            {/* WhatsApp Header */}
            <div className="bg-[#075e54] text-white px-3 py-2.5 flex items-center gap-2.5 shadow">
              <div className="size-8 rounded-full overflow-hidden border border-white/40 shrink-0 bg-honey">
                <img src={siteConfig.logo} alt="Logo" className="size-full object-cover" />
              </div>
              <div className="flex-1 truncate">
                <div className="font-bold text-sm truncate">TeddyPups Dubai 🐾</div>
                <div className="text-[10px] text-emerald-200">Online · Official Advisor</div>
              </div>
            </div>

            {/* Messages body */}
            <div className="flex-1 p-3 space-y-2.5 overflow-y-auto">
              <div className="text-center">
                <span className="bg-amber-100/80 text-stone-600 text-[10px] px-2.5 py-0.5 rounded-md shadow-sm">
                  TODAY
                </span>
              </div>

              {current.msgs.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 shadow-sm text-[12px] leading-snug ${
                      msg.from === 'me'
                        ? 'bg-[#d9fdd3] text-stone-900 rounded-tr-none'
                        : 'bg-white text-stone-900 rounded-tl-none border border-stone-200/60'
                    }`}
                  >
                    {msg.type === 'media' ? (
                      <div className="space-y-1">
                        <div className="rounded-xl overflow-hidden aspect-[4/3] bg-honey/30">
                          <img
                            src="https://puppy.instabizweb.com/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp"
                            alt="Puppy"
                            className="size-full object-cover"
                          />
                        </div>
                        <p className="font-medium pt-1 text-[11px] text-stone-800">{msg.caption}</p>
                      </div>
                    ) : msg.type === 'video_clip' ? (
                      <div className="space-y-1">
                        <div className="bg-stone-800 text-white rounded-xl p-2.5 flex items-center gap-2">
                          <span className="size-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
                            ▶
                          </span>
                          <span className="font-mono text-[11px]">{msg.duration} Video clip</span>
                        </div>
                        <p className="text-[11px] pt-0.5">{msg.text}</p>
                      </div>
                    ) : (
                      <p>{msg.text}</p>
                    )}
                    <span className="text-[9px] text-stone-400 block text-right mt-0.5">
                      12:{30 + i} PM ✓✓
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="px-3 pt-2 flex items-center gap-2 border-t border-stone-300 bg-[#f0f2f5]">
              <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-stone-400 text-[11px] border border-stone-300">
                Type a message...
              </div>
              <div className="size-7 rounded-full bg-[#128c7e] text-white flex items-center justify-center font-bold text-xs">
                ➤
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
