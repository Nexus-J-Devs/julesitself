import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { CREATIVE_AND_EVENTS_DATA } from '../data/creativeAndEventsData';
import { SkeletonImage } from '../demo-engine/DemoContext';
import { getWhatsAppLink, CONTACT } from '../config/site';
import type { DemoProps } from './DemoWebsites';

// 1. CREATIVE PORTFOLIO DEMO
export const CreativeDemo: React.FC<DemoProps> = ({ businessName, tagline, templateSlug, activePage }) => {
  const [selectedService, setSelectedService] = useState(CREATIVE_AND_EVENTS_DATA.creative.rateCard[0]);
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="bg-[#141412] text-neutral-100 font-sans min-h-screen flex flex-col justify-between text-xs">
      <div>
        <header className="p-8 border-b border-neutral-800 bg-[#141412]/90 backdrop-blur sticky top-0 z-30 flex justify-between items-center">
          <Link to={`/demo/${templateSlug}`} className="font-serif text-3xl font-light tracking-tighter uppercase">{businessName}</Link>
          <nav className="hidden md:flex gap-6 uppercase tracking-widest text-neutral-400">
            <Link to={`/demo/${templateSlug}`}>Home</Link>
            <Link to={`/demo/${templateSlug}/work`}>Work</Link>
            <Link to={`/demo/${templateSlug}/rate-card`}>Rate Card</Link>
            <Link to={`/demo/${templateSlug}/contact`}>Contact</Link>
          </nav>
          <Link to={`/demo/${templateSlug}/rate-card`} className="px-5 py-2 bg-white text-black font-bold uppercase">Commission Studio</Link>
        </header>

        {(activePage === 'home' || !activePage) && (
          <section className="py-24 px-8 max-w-5xl mx-auto space-y-8">
            <span className="text-xs uppercase tracking-[0.4em] text-neutral-500">Brand & Direction</span>
            <h1 className="text-4xl sm:text-6xl font-serif font-light leading-tight">{tagline}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              {CREATIVE_AND_EVENTS_DATA.creative.projects.map((p) => (
                <div key={p.id} className="space-y-3 bg-neutral-900 p-4 border border-neutral-800">
                  <div className="h-64 overflow-hidden">
                    <SkeletonImage src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-serif text-lg">{p.title}</h3>
                  <span className="text-neutral-500 uppercase tracking-widest">{p.category}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {activePage === 'rate-card' && (
          <section className="py-16 px-8 max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-serif text-center uppercase">Studio Rate Card</h1>
            <div className="space-y-4">
              {CREATIVE_AND_EVENTS_DATA.creative.rateCard.map((r, idx) => (
                <div key={idx} className="p-5 bg-neutral-900 border border-neutral-800 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-sm">{r.service}</h3>
                    <p className="text-neutral-500">Timeline: {r.timeline}</p>
                  </div>
                  <span className="font-mono text-amber-400 font-bold">{r.rate}</span>
                </div>
              ))}
            </div>

            {sent ? (
              <div className="p-6 bg-neutral-900 border border-neutral-800 text-center space-y-3">
                <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-serif">Commission Request Ready!</h3>
                <a href={getWhatsAppLink(`Hello ${businessName}!\nI'd like to commission project:\n- Service: ${selectedService.service}\n- Rate: ${selectedService.rate}\n- Name: ${clientName}\n- Phone: ${phone}`)} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-emerald-700 text-white font-bold uppercase">
                  Send Commission Brief on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="bg-neutral-900 p-6 border border-neutral-800 space-y-4">
                <label className="block font-bold">Commission Service</label>
                <select value={selectedService.service} onChange={(e) => setSelectedService(CREATIVE_AND_EVENTS_DATA.creative.rateCard.find((r) => r.service === e.target.value) || CREATIVE_AND_EVENTS_DATA.creative.rateCard[0])} className="w-full p-2 bg-black border border-neutral-800 text-white">
                  {CREATIVE_AND_EVENTS_DATA.creative.rateCard.map((r, idx) => (
                    <option key={idx} value={r.service}>{r.service} ({r.rate})</option>
                  ))}
                </select>
                <input type="text" required placeholder="Full Name" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full p-2 bg-black border border-neutral-800 text-white" />
                <input type="tel" required placeholder="Phone (+234)" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 bg-black border border-neutral-800 text-white" />
                <button type="submit" className="w-full py-3 bg-white text-black font-bold uppercase">Commission Project</button>
              </form>
            )}
          </section>
        )}

        {(activePage === 'work' || activePage === 'contact') && (
          <section className="py-16 px-8 text-center max-w-2xl mx-auto space-y-4 text-neutral-400">
            <h1 className="text-3xl font-serif text-white uppercase">Victoria Island Studio</h1>
            <p>Admiralty Way, Lagos • WhatsApp {CONTACT.whatsappDisplay}</p>
          </section>
        )}
      </div>

      <footer className="bg-black py-6 text-center text-neutral-600">
        <p>{businessName} • WhatsApp {CONTACT.whatsappDisplay}</p>
      </footer>
    </div>
  );
};

// 2. EVENTS DEMO
export const EventsDemo: React.FC<DemoProps> = ({ businessName, tagline, templateSlug, activePage }) => {
  const [guestCount, setGuestCount] = useState(150);
  const [selectedPkg, setSelectedPkg] = useState(CREATIVE_AND_EVENTS_DATA.events.packages[0]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-[#FAF7F2] text-neutral-900 font-sans min-h-screen flex flex-col justify-between text-xs">
      <div>
        <header className="p-6 border-b border-neutral-200 bg-[#FAF7F2]/90 backdrop-blur sticky top-0 z-30 flex justify-between items-center">
          <Link to={`/demo/${templateSlug}`} className="font-serif text-2xl font-bold uppercase tracking-wider">{businessName}</Link>
          <nav className="hidden md:flex gap-6 uppercase font-semibold text-neutral-600">
            <Link to={`/demo/${templateSlug}`}>Home</Link>
            <Link to={`/demo/${templateSlug}/quote`}>Quote Builder</Link>
            <Link to={`/demo/${templateSlug}/contact`}>Contact</Link>
          </nav>
          <Link to={`/demo/${templateSlug}/quote`} className="px-5 py-2 bg-amber-900 text-white font-bold uppercase">Build Quote</Link>
        </header>

        {(activePage === 'home' || !activePage) && (
          <section className="py-20 px-6 text-center max-w-3xl mx-auto space-y-4">
            <span className="font-bold uppercase text-amber-900">Bespoke Event Production</span>
            <h1 className="text-4xl sm:text-6xl font-serif font-light">{businessName}</h1>
            <p className="text-neutral-600 max-w-lg mx-auto">{tagline}</p>
            <div className="pt-4">
              <Link to={`/demo/${templateSlug}/quote`} className="px-8 py-3 bg-neutral-900 text-white font-bold uppercase">Build Event Estimate</Link>
            </div>
          </section>
        )}

        {activePage === 'quote' && (
          <section className="py-16 px-6 max-w-xl mx-auto space-y-6">
            <h1 className="text-3xl font-serif text-center">Event Quote Estimator</h1>
            {submitted ? (
              <div className="p-6 bg-white border text-center space-y-3">
                <Check className="w-8 h-8 text-emerald-700 mx-auto" />
                <h3 className="text-lg font-bold">Quote Request Prepared!</h3>
                <p>Package: {selectedPkg.name} ({selectedPkg.estimateRange}) • Guests: {guestCount}</p>
                <a href={getWhatsAppLink(`Hello ${businessName}!\nI'd like an event quote:\n- Package: ${selectedPkg.name}\n- Estimate Range: ${selectedPkg.estimateRange}\n- Guests: ${guestCount}\n- Name: ${name}\n- Phone: ${phone}`)} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-emerald-700 text-white font-bold uppercase">
                  Send Event Request on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="bg-white p-6 border space-y-4">
                <div>
                  <label className="block font-bold mb-1">Select Event Type</label>
                  <select value={selectedPkg.name} onChange={(e) => setSelectedPkg(CREATIVE_AND_EVENTS_DATA.events.packages.find((p) => p.name === e.target.value) || CREATIVE_AND_EVENTS_DATA.events.packages[0])} className="w-full p-2 border">
                    {CREATIVE_AND_EVENTS_DATA.events.packages.map((p, idx) => (
                      <option key={idx} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Estimated Guests ({guestCount})</label>
                  <input type="range" min={30} max={500} step={10} value={guestCount} onChange={(e) => setGuestCount(Number(e.target.value))} className="w-full" />
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 font-bold text-center">
                  Budget Estimate: {selectedPkg.estimateRange}
                </div>
                <input type="text" required placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border" />
                <input type="tel" required placeholder="Phone (+234)" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border" />
                <button type="submit" className="w-full py-3 bg-neutral-900 text-white font-bold uppercase">Request Official Quote</button>
              </form>
            )}
          </section>
        )}

        {activePage === 'contact' && (
          <section className="py-16 px-6 text-center max-w-2xl mx-auto space-y-4">
            <h1 className="text-3xl font-serif">Ikoyi Event Studio</h1>
            <p>Bourdillon Road, Ikoyi, Lagos • WhatsApp {CONTACT.whatsappDisplay}</p>
          </section>
        )}
      </div>

      <footer className="bg-neutral-900 text-neutral-400 py-6 text-center">
        <p>{businessName} • Ikoyi • WhatsApp {CONTACT.whatsappDisplay}</p>
      </footer>
    </div>
  );
};
