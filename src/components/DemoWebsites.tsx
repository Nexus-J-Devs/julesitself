import React, { useState } from 'react';
import { MapPin, Phone, Check } from 'lucide-react';

interface DemoProps {
  businessName: string;
  tagline: string;
  categorySlug: string;
}

export const RestaurantDemo: React.FC<DemoProps> = ({ businessName, tagline }) => {
  const [activeTab, setActiveTab] = useState<'mains' | 'starters' | 'wines' | 'desserts'>('mains');
  const [reservation, setReservation] = useState({ date: '', time: '19:00', guests: '2', name: '', phone: '' });
  const [reserved, setReserved] = useState(false);

  const menu = {
    starters: [
      { name: "Charred Heirloom Octopus", price: "$24", desc: "Smoked paprika emulsion, crushed fingerlings, squid ink crisp" },
      { name: "Wild Foraged Mushroom Tartare", price: "$19", desc: "Truffled egg yolk yolk, shallot crisp, toasted brioche" },
      { name: "Burrata & Heritage Peaches", price: "$21", desc: "24-month aged balsamic, roasted pistachio, micro basil" }
    ],
    mains: [
      { name: "Dry-Aged Duck Breast", price: "$42", desc: "Spiced cherry reduction, roasted sunchokes, braised endive" },
      { name: "Pan-Seared Sea Bass", price: "$46", desc: "Saffron velouté, baby fennel, crisp samphire" },
      { name: "A5 Wagyu Strip Loin (6oz)", price: "$88", desc: "Bone marrow jus, smoked pomme purée, charred shallots" }
    ],
    wines: [
      { name: "Domaine de la Romanée-Conti 2018", price: "$320 / glass", desc: "Burgundy, France • Elegant red fruit, earthy spice" },
      { name: "Château Margaux Premier Grand Cru 2015", price: "$280 / glass", desc: "Bordeaux, France • Deep cassis, violet, cedar" }
    ],
    desserts: [
      { name: "Dark Chocolate Fondant", price: "$16", desc: "Salted caramel core, Madagascar vanilla bean gelato" },
      { name: "Deconstructed Citrus Tart", price: "$15", desc: "Yuzu curd, toasted meringue, bergamot sorbet" }
    ]
  };

  return (
    <div className="font-sans text-neutral-900 bg-[#FBF9F5]">
      {/* Top Banner */}
      <nav className="border-b border-neutral-200 py-4 px-6 sm:px-12 flex justify-between items-center bg-[#FBF9F5]/90 backdrop-blur-md sticky top-0 z-30">
        <span className="font-serif text-2xl tracking-widest font-bold uppercase">{businessName}</span>
        <div className="hidden md:flex gap-8 text-xs font-semibold tracking-wider uppercase text-neutral-600">
          <a href="#menu" className="hover:text-neutral-900">Menu</a>
          <a href="#atmosphere" className="hover:text-neutral-900">Atmosphere</a>
          <a href="#reservations" className="hover:text-neutral-900">Reservations</a>
          <a href="#location" className="hover:text-neutral-900">Contact</a>
        </div>
        <a href="#reservations" className="px-5 py-2.5 bg-neutral-900 text-white text-xs uppercase tracking-wider font-semibold rounded-none">
          Reserve Table
        </a>
      </nav>

      {/* Hero */}
      <section className="relative h-[75vh] min-h-[500px] flex items-center justify-center text-center px-4 bg-black/40 text-white overflow-hidden">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80" alt="Restaurant interior" className="absolute inset-0 w-full h-full object-cover -z-10 brightness-50" />
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-200">Culinary Destination</span>
          <h1 className="text-4xl sm:text-7xl font-serif tracking-tight font-light">{businessName}</h1>
          <p className="text-sm sm:text-base font-light tracking-wide text-neutral-200 max-w-xl mx-auto italic">{tagline}</p>
          <div className="pt-4 flex justify-center gap-4">
            <a href="#menu" className="px-8 py-3.5 bg-white text-neutral-900 font-semibold text-xs uppercase tracking-widest hover:bg-neutral-100 transition-colors">
              Explore Seasonal Menu
            </a>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 px-4 sm:px-12 max-w-5xl mx-auto">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-amber-800 font-bold">Gastronomy</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-light">Seasonal Tasting Menu</h2>
        </div>

        <div className="flex justify-center gap-6 border-b border-neutral-200 pb-4 mb-10 text-xs font-semibold uppercase tracking-wider">
          {(['mains', 'starters', 'wines', 'desserts'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 transition-all ${activeTab === tab ? 'border-b-2 border-neutral-900 text-neutral-900 font-bold' : 'text-neutral-400 hover:text-neutral-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          {menu[activeTab].map((item, idx) => (
            <div key={idx} className="flex justify-between items-baseline border-b border-neutral-200/60 pb-6">
              <div className="space-y-1 max-w-xl">
                <h3 className="text-lg font-serif font-medium text-neutral-900">{item.name}</h3>
                <p className="text-xs text-neutral-600 font-light">{item.desc}</p>
              </div>
              <span className="font-serif text-base font-semibold text-amber-900 ml-4">{item.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Reservations Modal/Section */}
      <section id="reservations" className="py-20 bg-neutral-900 text-white px-4 sm:px-12">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-300 font-semibold">Table Bookings</span>
          <h2 className="text-3xl sm:text-4xl font-serif">Reserve Your Experience</h2>

          {reserved ? (
            <div className="p-8 bg-neutral-800 border border-neutral-700 text-center space-y-3">
              <Check className="w-8 h-8 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-serif">Reservation Requested</h3>
              <p className="text-xs text-neutral-300">Thank you, {reservation.name}. We will confirm your table for {reservation.guests} guests on {reservation.date} via phone.</p>
              <button onClick={() => setReserved(false)} className="text-xs text-amber-300 underline pt-2">Make another booking</button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setReserved(true); }} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-1">Guests</label>
                <select value={reservation.guests} onChange={(e) => setReservation({...reservation, guests: e.target.value})} className="w-full bg-neutral-800 border border-neutral-700 p-3 text-xs text-white">
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons</option>
                  <option value="4">4 Persons</option>
                  <option value="6">6+ Private Dining</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-1">Date</label>
                <input type="date" required value={reservation.date} onChange={(e) => setReservation({...reservation, date: e.target.value})} className="w-full bg-neutral-800 border border-neutral-700 p-3 text-xs text-white" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-1">Your Name</label>
                <input type="text" required placeholder="Full Name" value={reservation.name} onChange={(e) => setReservation({...reservation, name: e.target.value})} className="w-full bg-neutral-800 border border-neutral-700 p-3 text-xs text-white" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-1">Phone / WhatsApp</label>
                <input type="tel" required placeholder="+234 ..." value={reservation.phone} onChange={(e) => setReservation({...reservation, phone: e.target.value})} className="w-full bg-neutral-800 border border-neutral-700 p-3 text-xs text-white" />
              </div>

              <div className="sm:col-span-2 pt-2">
                <button type="submit" className="w-full py-4 bg-amber-200 text-neutral-900 font-bold text-xs uppercase tracking-widest hover:bg-amber-100 transition-colors">
                  Confirm Table Request
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Hours & Location */}
      <section id="location" className="py-16 px-4 sm:px-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 text-xs">
        <div className="space-y-3">
          <h4 className="font-serif text-lg font-bold">Hours of Operation</h4>
          <p className="text-neutral-600">Tuesday – Thursday: 17:00 – 23:00</p>
          <p className="text-neutral-600">Friday – Sunday: 12:00 – 00:00</p>
          <p className="text-neutral-400 italic">Closed Mondays</p>
        </div>
        <div className="space-y-3">
          <h4 className="font-serif text-lg font-bold">Location & Contact</h4>
          <p className="text-neutral-600 flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-800" /> 14 Victoria Island Boulevard, Lagos</p>
          <p className="text-neutral-600 flex items-center gap-2"><Phone className="w-4 h-4 text-amber-800" /> +234 812 345 6789</p>
        </div>
      </section>
    </div>
  );
};

export const SpaDemo: React.FC<DemoProps> = ({ businessName, tagline }) => {
  const treatments = [
    { name: "Deep Tissue Restoration Therapy", duration: "75 mins", price: "$180", desc: "Therapeutic deep muscle pressure with custom organic essential oils." },
    { name: "Radiance Facial & Hydrogel Mask", duration: "60 mins", price: "$150", desc: "Cellular rejuvenation featuring micro-current therapy and hyaluronic infusion." },
    { name: "Hot Stone Thermal Massage", duration: "90 mins", price: "$220", desc: "Volcanic basalt stones combined with targeted lymphatic drainage." }
  ];

  return (
    <div className="bg-[#FAF8F5] text-stone-800 font-sans min-h-screen">
      <header className="py-6 px-8 border-b border-stone-200 flex justify-between items-center bg-[#FAF8F5]/80 backdrop-blur">
        <span className="font-serif text-2xl tracking-widest font-light text-stone-900">{businessName}</span>
        <a href="#book" className="px-6 py-2 bg-stone-800 text-stone-100 text-xs font-medium uppercase tracking-wider rounded-sm">Book Treatment</a>
      </header>

      <section className="py-24 px-6 text-center max-w-3xl mx-auto space-y-6">
        <span className="text-xs uppercase tracking-[0.3em] font-medium text-stone-500">Sanctuary of Calm</span>
        <h1 className="text-4xl sm:text-6xl font-serif font-light text-stone-900">{businessName}</h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-light">{tagline}</p>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-serif font-light mb-8 text-center text-stone-900">Curated Wellness Treatments</h2>
        <div className="space-y-6">
          {treatments.map((t, idx) => (
            <div key={idx} className="p-6 bg-white border border-stone-200/80 rounded-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-serif text-lg text-stone-900">{t.name}</h3>
                  <span className="text-[10px] uppercase px-2 py-0.5 bg-stone-100 text-stone-600 rounded">{t.duration}</span>
                </div>
                <p className="text-xs text-stone-500">{t.desc}</p>
              </div>
              <span className="font-serif text-lg text-stone-900 font-medium">{t.price}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export const FashionDemo: React.FC<DemoProps> = ({ businessName, tagline }) => {
  const products = [
    { name: "Structured Oversized Trench", price: "$420", category: "Outerwear", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80" },
    { name: "Silk Tailored Blazer", price: "$350", category: "Tailoring", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80" },
    { name: "Raw Denim Wide Trousers", price: "$210", category: "Bottoms", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80" }
  ];

  return (
    <div className="bg-neutral-950 text-neutral-100 font-sans min-h-screen">
      <header className="p-6 border-b border-neutral-800 flex justify-between items-center">
        <span className="font-serif text-3xl font-bold tracking-tighter uppercase">{businessName}</span>
        <div className="flex gap-6 text-xs uppercase tracking-widest text-neutral-400">
          <span>Lookbook</span>
          <span>Collection</span>
          <span>Cart (0)</span>
        </div>
      </header>

      <section className="relative h-[65vh] flex items-end p-8 sm:p-16 border-b border-neutral-800">
        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80" alt="Fashion Editorial" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="relative z-10 max-w-xl space-y-4">
          <span className="text-xs tracking-[0.4em] uppercase text-neutral-400">Autumn / Winter Edition</span>
          <h1 className="text-4xl sm:text-6xl font-serif uppercase tracking-tight">{businessName}</h1>
          <p className="text-xs text-neutral-300 tracking-wider font-light">{tagline}</p>
        </div>
      </section>

      <section className="p-8 sm:p-16 max-w-7xl mx-auto">
        <h2 className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-8">Selected Garments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {products.map((p, idx) => (
            <div key={idx} className="group space-y-3">
              <div className="aspect-[3/4] bg-neutral-900 overflow-hidden relative">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex justify-between items-baseline text-xs uppercase tracking-wider">
                <span className="font-medium text-neutral-200">{p.name}</span>
                <span className="text-neutral-400">{p.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export const RealEstateDemo: React.FC<DemoProps> = ({ businessName, tagline }) => {
  const properties = [
    { title: "The Obsidian Penthouse", price: "$2,850,000", location: "Ikoyi Crescent, Lagos", beds: 4, baths: 5, sqft: "4,500 sqft", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80" },
    { title: "Waterfront Villa Atelier", price: "$4,200,000", location: "Banana Island, Lagos", beds: 6, baths: 7, sqft: "7,200 sqft", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" }
  ];

  return (
    <div className="bg-slate-900 text-slate-100 font-sans min-h-screen">
      <header className="p-6 border-b border-slate-800 flex justify-between items-center max-w-7xl mx-auto">
        <span className="font-serif text-2xl tracking-widest font-medium uppercase text-amber-200">{businessName}</span>
        <button className="px-5 py-2 border border-amber-200/40 text-amber-200 text-xs tracking-widest uppercase hover:bg-amber-200/10">Inquire Agent</button>
      </header>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <span className="text-xs uppercase tracking-[0.3em] text-amber-300 block mb-2">Prime Real Estate</span>
        <h1 className="text-3xl sm:text-5xl font-serif font-light mb-4">{businessName}</h1>
        <p className="text-slate-400 text-sm max-w-2xl font-light mb-12">{tagline}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {properties.map((p, idx) => (
            <div key={idx} className="bg-slate-800 border border-slate-700/80 rounded-sm overflow-hidden space-y-4">
              <div className="aspect-[16/10] bg-slate-950 overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-xl text-white">{p.title}</h3>
                  <span className="font-serif text-lg text-amber-300 font-semibold">{p.price}</span>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-300" /> {p.location}</p>
                <div className="pt-3 border-t border-slate-700/60 flex justify-between text-xs text-slate-300">
                  <span>{p.beds} Beds</span>
                  <span>{p.baths} Baths</span>
                  <span>{p.sqft}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export const FitnessDemo: React.FC<DemoProps> = ({ businessName, tagline }) => {
  return (
    <div className="bg-zinc-950 text-zinc-100 font-sans min-h-screen">
      <header className="p-6 border-b border-zinc-800 flex justify-between items-center">
        <span className="font-serif text-2xl font-extrabold uppercase text-white tracking-wider">{businessName}</span>
        <button className="px-5 py-2 bg-zinc-100 text-zinc-950 text-xs font-bold uppercase tracking-wider">Get Day Pass</button>
      </header>

      <section className="py-20 px-6 max-w-5xl mx-auto text-center space-y-6">
        <span className="text-xs font-mono uppercase text-emerald-400">Reformer Pilates & Conditioning</span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold uppercase">{businessName}</h1>
        <p className="text-zinc-400 text-sm max-w-xl mx-auto">{tagline}</p>

        <div className="pt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="p-6 bg-zinc-900 border border-zinc-800 space-y-2">
            <h3 className="font-serif text-lg font-bold">Reformer Athletic</h3>
            <p className="text-xs text-zinc-400">High-intensity core resistance and muscular endurance.</p>
          </div>
          <div className="p-6 bg-zinc-900 border border-zinc-800 space-y-2">
            <h3 className="font-serif text-lg font-bold">Sculpt & Define</h3>
            <p className="text-xs text-zinc-400">Targeted isolation movements using spring tension.</p>
          </div>
          <div className="p-6 bg-zinc-900 border border-zinc-800 space-y-2">
            <h3 className="font-serif text-lg font-bold">Recovery Flow</h3>
            <p className="text-xs text-zinc-400">Deep fascial release and mobility optimization.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export const InteriorDemo: React.FC<DemoProps> = ({ businessName, tagline }) => {
  return (
    <div className="bg-[#FAF9F5] text-stone-900 font-sans min-h-screen">
      <header className="p-8 border-b border-stone-200 flex justify-between items-center">
        <span className="font-serif text-2xl font-light tracking-widest">{businessName}</span>
        <span className="text-xs uppercase tracking-widest text-stone-500">Interior Architecture</span>
      </header>

      <section className="py-24 px-8 max-w-5xl mx-auto space-y-8">
        <h1 className="text-4xl sm:text-6xl font-serif font-light leading-tight">{tagline}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" alt="Interior space" className="w-full aspect-[4/3] object-cover" />
          <div className="space-y-4 flex flex-col justify-center">
            <h3 className="font-serif text-2xl">Nordique Spatial Design</h3>
            <p className="text-xs text-stone-600 leading-relaxed">We specialize in minimalist luxury residential interiors, custom millwork, and warm architectural lighting for discerning homeowners.</p>
            <button className="px-6 py-3 bg-stone-900 text-stone-100 text-xs uppercase tracking-widest self-start">Request Consultation</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export const BakeryDemo: React.FC<DemoProps> = ({ businessName, tagline }) => {
  return (
    <div className="bg-[#FFFDF9] text-amber-950 font-sans min-h-screen">
      <header className="p-6 border-b border-amber-200/60 flex justify-between items-center">
        <span className="font-serif text-2xl font-bold tracking-wide">{businessName}</span>
        <a href="#order" className="px-5 py-2 bg-amber-900 text-amber-50 text-xs font-semibold rounded-full">Pre-Order Pastries</a>
      </header>

      <section className="py-20 px-6 text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-800">Slow Sourdough & Patisserie</span>
        <h1 className="text-4xl sm:text-6xl font-serif font-light text-amber-950">{businessName}</h1>
        <p className="text-sm text-amber-900/80 max-w-lg mx-auto">{tagline}</p>
      </section>
    </div>
  );
};

export const GenericDemo: React.FC<DemoProps> = ({ businessName, tagline }) => {
  return (
    <div className="bg-stone-50 text-stone-900 font-sans min-h-screen">
      <header className="p-6 border-b border-stone-200 flex justify-between items-center">
        <span className="font-serif text-2xl font-bold">{businessName}</span>
        <button className="px-5 py-2 bg-stone-900 text-white text-xs font-semibold">Contact Business</button>
      </header>

      <section className="py-24 px-6 text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl sm:text-6xl font-serif font-medium text-stone-900">{businessName}</h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">{tagline}</p>
      </section>
    </div>
  );
};
