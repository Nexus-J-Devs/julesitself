import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Check, Calculator } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { formatNaira, SkeletonImage } from '../demo-engine/DemoContext';
import { getWhatsAppLink, CONTACT } from '../config/site';
import type { DemoProps } from './DemoWebsites';

// 1. INTERIOR DEMO
export const InteriorDemo: React.FC<DemoProps> = ({ businessName, tagline, templateSlug, activePage }) => {
  const [budget, setBudget] = useState(25000000);
  const [style, setStyle] = useState('Contemporary Minimalist');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-[#FAF9F5] text-stone-900 font-sans min-h-screen flex flex-col justify-between text-xs">
      <div>
        <header className="p-8 border-b border-stone-200 bg-[#FAF9F5]/90 backdrop-blur sticky top-0 z-30 flex justify-between items-center">
          <Link to={`/demo/${templateSlug}`} className="font-serif text-2xl font-light tracking-widest">{businessName}</Link>
          <nav className="hidden md:flex gap-6 uppercase tracking-widest text-stone-600">
            <Link to={`/demo/${templateSlug}`}>Home</Link>
            <Link to={`/demo/${templateSlug}/portfolio`}>Portfolio</Link>
            <Link to={`/demo/${templateSlug}/consultation`}>Consultation Brief</Link>
            <Link to={`/demo/${templateSlug}/contact`}>Studio</Link>
          </nav>
          <Link to={`/demo/${templateSlug}/consultation`} className="px-6 py-2.5 bg-stone-900 text-stone-100 uppercase tracking-widest">Request Brief</Link>
        </header>

        {(activePage === 'home' || !activePage) && (
          <section className="py-24 px-8 max-w-5xl mx-auto space-y-8">
            <h1 className="text-4xl sm:text-6xl font-serif font-light leading-tight">{tagline}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              <SkeletonImage src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" alt="Interior space" className="w-full aspect-[4/3] object-cover" />
              <div className="space-y-4 flex flex-col justify-center">
                <h3 className="font-serif text-2xl">Nordique Spatial Design</h3>
                <p className="text-stone-600 leading-relaxed">We specialize in minimalist luxury residential interiors, custom millwork, and architectural lighting for discerning Lagos homeowners.</p>
                <Link to={`/demo/${templateSlug}/consultation`} className="px-6 py-3 bg-stone-900 text-stone-100 uppercase tracking-widest self-start">Request Consultation</Link>
              </div>
            </div>
          </section>
        )}

        {activePage === 'portfolio' && (
          <section className="py-16 px-8 max-w-5xl mx-auto space-y-8">
            <h1 className="text-3xl font-serif text-center">Selected Interior Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PORTFOLIO_DATA.interior.projects.map((p) => (
                <div key={p.id} className="space-y-3 bg-white p-4 border border-stone-200">
                  <div className="h-64 overflow-hidden">
                    <SkeletonImage src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-serif text-lg">{p.title}</h3>
                  <p className="text-stone-500">{p.type} • Est. Budget: {p.budget}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activePage === 'consultation' && (
          <section className="py-16 px-8 max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-serif text-center">Design Consultation Brief</h1>
            {submitted ? (
              <div className="p-8 bg-white border border-stone-300 text-center space-y-3">
                <Check className="w-8 h-8 text-emerald-700 mx-auto" />
                <h3 className="text-lg font-serif">Consultation Brief Prepared!</h3>
                <p>Budget: {formatNaira(budget)} • Style: {style}</p>
                <a href={getWhatsAppLink(`Hello ${businessName}!\nI'd like an interior design consultation:\n- Estimated Budget: ${formatNaira(budget)}\n- Style: ${style}\n- Name: ${name}\n- Phone: ${phone}`)} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-emerald-800 text-white font-bold uppercase">
                  Send Brief on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="bg-white p-6 border border-stone-200 space-y-4">
                <div>
                  <label className="block font-bold mb-1">Target Project Budget ({formatNaira(budget)})</label>
                  <input type="range" min={10000000} max={100000000} step={5000000} value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="block font-bold mb-1">Preferred Aesthetic Style</label>
                  <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full p-2.5 border">
                    <option value="Contemporary Minimalist">Contemporary Minimalist</option>
                    <option value="Warm Japandi & Wood">Warm Japandi & Wood</option>
                    <option value="Opulent Modern Executive">Opulent Modern Executive</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" required placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="p-2.5 border" />
                  <input type="tel" required placeholder="Phone (+234)" value={phone} onChange={(e) => setPhone(e.target.value)} className="p-2.5 border" />
                </div>
                <button type="submit" className="w-full py-3.5 bg-stone-900 text-stone-100 font-bold uppercase">Submit Consultation Brief</button>
              </form>
            )}
          </section>
        )}

        {activePage === 'contact' && (
          <section className="py-16 px-8 text-center max-w-2xl mx-auto space-y-4">
            <h1 className="text-3xl font-serif">Ikoyi Design Studio</h1>
            <p>12 Bourdillon Road, Ikoyi, Lagos • WhatsApp {CONTACT.whatsappDisplay}</p>
          </section>
        )}
      </div>

      <footer className="bg-stone-900 text-stone-400 py-6 text-center">
        <p>{businessName} • Ikoyi • WhatsApp {CONTACT.whatsappDisplay}</p>
      </footer>
    </div>
  );
};

// 2. REAL ESTATE DEMO
export const RealEstateDemo: React.FC<DemoProps> = ({ businessName, tagline, templateSlug, activePage }) => {
  const [selectedListing, setSelectedListing] = useState(PORTFOLIO_DATA.realEstate.listings[0]);
  const [loanAmount, setLoanAmount] = useState(100000000);
  const [tenureYears, setTenureYears] = useState(15);
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [requested, setRequested] = useState(false);

  // Mortgage estimate formula: simple annual interest 18% in Naira
  const monthlyInterestRate = 0.18 / 12;
  const totalMonths = tenureYears * 12;
  const estimatedMonthlyPayment = Math.round((loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalMonths)));

  return (
    <div className="bg-slate-900 text-slate-100 font-sans min-h-screen flex flex-col justify-between text-xs">
      <div>
        <header className="p-6 border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-30 flex justify-between items-center max-w-7xl mx-auto">
          <Link to={`/demo/${templateSlug}`} className="font-serif text-2xl font-medium uppercase text-amber-200">{businessName}</Link>
          <nav className="hidden md:flex gap-6 uppercase tracking-widest text-slate-400">
            <Link to={`/demo/${templateSlug}`}>Home</Link>
            <Link to={`/demo/${templateSlug}/properties`}>Properties</Link>
            <Link to={`/demo/${templateSlug}/mortgage`}>Mortgage Calculator</Link>
            <Link to={`/demo/${templateSlug}/contact`}>Inquire Agent</Link>
          </nav>
          <Link to={`/demo/${templateSlug}/properties`} className="px-5 py-2 border border-amber-200/40 text-amber-200 uppercase hover:bg-amber-200/10">Listings</Link>
        </header>

        {(activePage === 'home' || !activePage) && (
          <section className="py-20 px-6 max-w-7xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-300 block mb-2">Prime Waterfront Real Estate</span>
            <h1 className="text-3xl sm:text-5xl font-serif font-light mb-4">{businessName}</h1>
            <p className="text-slate-400 max-w-2xl font-light mb-12">{tagline}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PORTFOLIO_DATA.realEstate.listings.map((p) => (
                <div key={p.id} className="bg-slate-800 border border-slate-700 rounded-sm overflow-hidden space-y-4">
                  <div className="aspect-[16/10] bg-slate-950 overflow-hidden">
                    <SkeletonImage src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-serif text-xl text-white">{p.title}</h3>
                      <span className="font-serif text-lg text-amber-300 font-semibold">{formatNaira(p.price)}</span>
                    </div>
                    <p className="text-slate-400 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-300" /> {p.location}</p>
                    <div className="pt-3 border-t border-slate-700 flex justify-between text-slate-300">
                      <span>{p.beds} Beds</span>
                      <span>{p.baths} Baths</span>
                      <span>{p.sqft}</span>
                    </div>
                    <button onClick={() => { setSelectedListing(p); setRequested(true); }} className="w-full py-2.5 bg-amber-200 text-slate-950 font-bold uppercase mt-2">Request Private Inspection</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activePage === 'mortgage' && (
          <section className="py-16 px-6 max-w-xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <Calculator className="w-8 h-8 text-amber-300 mx-auto" />
              <h1 className="text-3xl font-serif">Mortgage Payment Estimator</h1>
            </div>
            <div className="bg-slate-800 p-6 border border-slate-700 rounded space-y-4">
              <div>
                <label className="block text-slate-300 mb-1">Mortgage Principal Loan ({formatNaira(loanAmount)})</label>
                <input type="range" min={20000000} max={500000000} step={10000000} value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Tenure ({tenureYears} Years @ 18% Annual Rate)</label>
                <select value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))} className="w-full p-2 bg-slate-900 border text-white">
                  <option value={5}>5 Years</option>
                  <option value={10}>10 Years</option>
                  <option value={15}>15 Years</option>
                  <option value={20}>20 Years</option>
                </select>
              </div>
              <div className="p-4 bg-slate-950 text-center border border-slate-700 rounded space-y-1">
                <span className="text-slate-400">Estimated Monthly Repayment</span>
                <span className="text-2xl font-serif text-amber-300 font-bold block">{formatNaira(estimatedMonthlyPayment)} / month</span>
              </div>
            </div>
          </section>
        )}

        {(activePage === 'properties' || activePage === 'contact') && (
          <section className="py-16 px-6 text-center max-w-2xl mx-auto space-y-4">
            <h1 className="text-3xl font-serif text-amber-200">Banana Island Sales Advisory</h1>
            <p className="text-slate-400">Ikoyi Crescent, Lagos • WhatsApp {CONTACT.whatsappDisplay}</p>
          </section>
        )}
      </div>

      {requested && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-800 p-6 border border-slate-700 rounded max-w-md w-full space-y-4 text-xs">
            <h3 className="text-xl font-serif text-amber-200">Request Inspection — {selectedListing.title}</h3>
            <input type="text" placeholder="Full Name" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full p-2.5 bg-slate-900 border border-slate-700 text-white" />
            <input type="tel" placeholder="Phone (+234)" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2.5 bg-slate-900 border border-slate-700 text-white" />
            <a href={getWhatsAppLink(`Hello ${businessName}!\nI want to schedule an inspection:\n- Property: ${selectedListing.title}\n- Price: ${formatNaira(selectedListing.price)}\n- Name: ${clientName}\n- Phone: ${phone}`)} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-emerald-700 text-white font-bold uppercase text-center block">
              Send Viewing Request on WhatsApp
            </a>
            <button onClick={() => setRequested(false)} className="w-full py-2 bg-slate-700 text-slate-300">Close</button>
          </div>
        </div>
      )}

      <footer className="bg-slate-950 py-6 text-center text-slate-500">
        <p>{businessName} • Ikoyi • WhatsApp {CONTACT.whatsappDisplay}</p>
      </footer>
    </div>
  );
};
