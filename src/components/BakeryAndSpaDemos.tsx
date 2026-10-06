import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, Trash2, X, Check, MapPin, Cake, MessageCircle, Phone } from 'lucide-react';
import { BAKERY_DATA, SPA_DATA } from '../data/bakeryAndSpa';
import { useDemo, formatNaira, SkeletonImage } from '../demo-engine/DemoContext';
import { getWhatsAppLink, CONTACT } from '../config/site';
import type { DemoProps } from './DemoWebsites';

export const BakeryDemo: React.FC<DemoProps> = ({ businessName, tagline, templateSlug, activePage }) => {
  const { cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount, isCartOpen, setIsCartOpen } = useDemo();

  // Custom Cake Builder State
  const [cakeSize, setCakeSize] = useState(BAKERY_DATA.cakeSizes[1]);
  const [flavor, setFlavor] = useState(BAKERY_DATA.flavors[0]);
  const [inscription, setInscription] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [cakeOrderSuccess, setCakeOrderSuccess] = useState(false);

  // Calculate 48h minimum date string (YYYY-MM-DD)
  const minDate = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString().split('T')[0];

  const handleCustomCakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCakeOrderSuccess(true);
  };

  const generateCakeWhatsAppMsg = () => {
    return `Hello ${businessName}!\n\nCustom Cake Request:\n- Size: ${cakeSize.name} (${formatNaira(cakeSize.price)})\n- Flavor: ${flavor}\n- Custom Text: "${inscription || 'None'}"\n- Delivery/Pickup Date: ${pickupDate}\n\nCustomer Details:\n- Name: ${customerName}\n- Phone: ${phone}\n\nPlease confirm availability and payment details!`;
  };

  const navLinks = [
    { label: 'Home', path: `/demo/${templateSlug}` },
    { label: 'Pastry Catalog', path: `/demo/${templateSlug}/menu` },
    { label: 'Custom Cake Builder', path: `/demo/${templateSlug}/cake-builder` },
    { label: 'About Us', path: `/demo/${templateSlug}/about` },
    { label: 'Contact & Pickup', path: `/demo/${templateSlug}/contact` }
  ];

  return (
    <div className="font-sans text-amber-950 bg-[#FFFDF9] min-h-screen flex flex-col justify-between">
      <div>
        <header className="border-b border-amber-200/60 py-4 px-4 sm:px-8 flex justify-between items-center bg-[#FFFDF9]/90 backdrop-blur sticky top-0 z-30">
          <Link to={`/demo/${templateSlug}`} className="font-serif text-2xl font-bold tracking-wide">
            {businessName}
          </Link>

          <nav className="hidden md:flex gap-6 text-xs font-semibold uppercase tracking-wider text-amber-900">
            {navLinks.map((link, idx) => (
              <Link key={idx} to={link.path} className="hover:text-amber-700">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-amber-950">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <Link to={`/demo/${templateSlug}/cake-builder`} className="hidden sm:inline-block px-4 py-2 bg-amber-900 text-amber-50 text-xs font-semibold rounded-full hover:bg-amber-800">
              Build Custom Cake
            </Link>
          </div>
        </header>

        {/* HOME PAGE */}
        {(activePage === 'home' || !activePage) && (
          <section className="py-20 px-6 text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-800">Artisanal Bakery & Patisserie</span>
            <h1 className="text-4xl sm:text-6xl font-serif text-amber-950">{businessName}</h1>
            <p className="text-sm text-amber-900/80 max-w-lg mx-auto">{tagline}</p>
            <div className="pt-6 flex justify-center gap-4">
              <Link to={`/demo/${templateSlug}/menu`} className="px-6 py-3 bg-amber-900 text-white text-xs uppercase font-bold rounded-full">
                Order Pastries
              </Link>
              <Link to={`/demo/${templateSlug}/cake-builder`} className="px-6 py-3 border border-amber-900 text-amber-900 text-xs uppercase font-bold rounded-full">
                Design Custom Cake
              </Link>
            </div>
          </section>
        )}

        {/* MENU PAGE */}
        {activePage === 'menu' && (
          <section className="py-12 px-6 max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase text-amber-800">Fresh Baked Daily</span>
              <h1 className="text-3xl font-serif">Pastry & Bread Catalog</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {BAKERY_DATA.products.map((item) => (
                <div key={item.id} className="bg-white border border-amber-100 rounded-lg overflow-hidden p-4 space-y-3 flex flex-col justify-between shadow-sm">
                  <div className="h-44 rounded overflow-hidden">
                    <SkeletonImage src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-base">{item.name}</h3>
                    <p className="font-semibold text-amber-900 text-sm">{formatNaira(item.price)}</p>
                  </div>
                  <button
                    onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })}
                    className="w-full py-2 bg-amber-900 text-white text-xs font-semibold rounded hover:bg-amber-800"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CUSTOM CAKE BUILDER PAGE */}
        {activePage === 'cake-builder' && (
          <section className="py-12 px-6 max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase text-amber-800">Bespoke Celebrations</span>
              <h1 className="text-3xl font-serif">Custom Cake Builder</h1>
              <p className="text-xs text-amber-800 max-w-md mx-auto">Design your celebration cake with 48-hour advance notice for fresh preparation in Victoria Island.</p>
            </div>

            {cakeOrderSuccess ? (
              <div className="p-8 bg-amber-50 border border-amber-200 text-center space-y-4 rounded-lg">
                <Cake className="w-10 h-10 text-amber-900 mx-auto" />
                <h2 className="text-2xl font-serif">Cake Design Prepared!</h2>
                <p className="text-xs text-amber-900 max-w-md mx-auto">
                  Size: <strong>{cakeSize.name}</strong> • Flavor: <strong>{flavor}</strong> • Total: <strong>{formatNaira(cakeSize.price)}</strong>
                </p>
                <a
                  href={getWhatsAppLink(generateCakeWhatsAppMsg())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 text-white text-xs font-semibold rounded-full hover:bg-emerald-800"
                >
                  <MessageCircle className="w-4 h-4" /> Send Cake Order to WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleCustomCakeSubmit} className="bg-white p-6 border border-amber-200 rounded-lg space-y-6 text-xs">
                <div>
                  <label className="block font-bold text-amber-950 mb-2">1. Select Cake Size</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {BAKERY_DATA.cakeSizes.map((size, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCakeSize(size)}
                        className={`p-3 border rounded text-left ${
                          cakeSize.name === size.name ? 'border-amber-900 bg-amber-50 font-bold' : 'border-amber-200'
                        }`}
                      >
                        <span className="block">{size.name}</span>
                        <span className="text-amber-900 font-serif font-bold">{formatNaira(size.price)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-amber-950 mb-2">2. Select Flavor</label>
                  <select
                    value={flavor}
                    onChange={(e) => setFlavor(e.target.value)}
                    className="w-full p-3 border border-amber-200 rounded bg-amber-50/50"
                  >
                    {BAKERY_DATA.flavors.map((f, idx) => (
                      <option key={idx} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-amber-950 mb-1">3. Custom Inscription / Message on Cake</label>
                  <input
                    type="text"
                    placeholder="e.g. Happy 30th Birthday Funke!"
                    value={inscription}
                    onChange={(e) => setInscription(e.target.value)}
                    className="w-full p-3 border border-amber-200 rounded"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold mb-1">Pickup / Delivery Date (48h min)</label>
                    <input
                      type="date"
                      required
                      min={minDate}
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full p-2.5 border border-amber-200 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sandra Okafor"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-2.5 border border-amber-200 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 812 ..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 border border-amber-200 rounded"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full py-4 bg-amber-900 text-white font-bold text-xs uppercase tracking-wider rounded-full hover:bg-amber-800">
                  Review & Send Cake Request ({formatNaira(cakeSize.price)})
                </button>
              </form>
            )}
          </section>
        )}

        {/* ABOUT PAGE */}
        {activePage === 'about' && (
          <section className="py-16 px-6 max-w-3xl mx-auto space-y-4 text-xs leading-relaxed">
            <h1 className="text-3xl font-serif text-center mb-6">About {businessName}</h1>
            <p>Our Lagos bakery fuses French patisserie techniques with fresh local produce. From 72-hour fermented sourdoughs to hand-decorated celebration cakes, we ensure perfection in every slice.</p>
          </section>
        )}

        {/* CONTACT PAGE */}
        {activePage === 'contact' && (
          <section className="py-16 px-6 max-w-4xl mx-auto space-y-8 text-xs">
            <h1 className="text-3xl font-serif text-center">Bakery Locations</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {BAKERY_DATA.locations.map((loc, idx) => (
                <div key={idx} className="bg-white p-6 border border-amber-200 rounded-lg space-y-2">
                  <h3 className="font-serif font-bold text-base">{loc.name}</h3>
                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-900" /> {loc.address}</p>
                  <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-amber-900" /> {CONTACT.whatsappDisplay}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white h-full flex flex-col justify-between shadow-2xl p-6">
            <div>
              <div className="flex justify-between items-center border-b pb-4">
                <h2 className="font-serif font-bold text-lg text-amber-950">Pastry Bag ({cartCount})</h2>
                <button onClick={() => setIsCartOpen(false)}><X className="w-5 h-5" /></button>
              </div>

              <div className="divide-y divide-amber-100 my-4">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold block">{item.name}</span>
                      <span className="text-amber-900">{formatNaira(item.price)} each</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, -1)}><Minus className="w-3 h-3" /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}><Plus className="w-3 h-3" /></button>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-600 ml-2"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4 space-y-3 text-xs">
              <div className="flex justify-between font-bold text-sm">
                <span>Total</span>
                <span>{formatNaira(cartTotal)}</span>
              </div>
              <a
                href={getWhatsAppLink(`Hello ${businessName}!\nI would like to order pastries:\n${cart.map((i) => `- ${i.quantity}x ${i.name}`).join('\n')}\nTotal: ${formatNaira(cartTotal)}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Send Order on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-amber-950 text-amber-200 py-8 px-6 text-xs text-center">
        <p>{businessName} • WhatsApp {CONTACT.whatsappDisplay} • Telegram @{CONTACT.telegramHandle}</p>
      </footer>
    </div>
  );
};

export const SpaDemo: React.FC<DemoProps> = ({ businessName, tagline, templateSlug, activePage }) => {
  const [selectedService, setSelectedService] = useState(SPA_DATA.services[0]);
  const [bookingDate, setBookingDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [booked, setBooked] = useState(false);

  const navLinks = [
    { label: 'Home', path: `/demo/${templateSlug}` },
    { label: 'Treatments', path: `/demo/${templateSlug}/services` },
    { label: 'Book Sanctuary', path: `/demo/${templateSlug}/booking` },
    { label: 'About', path: `/demo/${templateSlug}/about` },
    { label: 'Contact', path: `/demo/${templateSlug}/contact` }
  ];

  return (
    <div className="bg-[#FAF8F5] text-stone-800 font-sans min-h-screen flex flex-col justify-between">
      <div>
        <header className="py-6 px-8 border-b border-stone-200 flex justify-between items-center bg-[#FAF8F5]/80 backdrop-blur sticky top-0 z-30">
          <Link to={`/demo/${templateSlug}`} className="font-serif text-2xl tracking-widest font-light text-stone-900">
            {businessName}
          </Link>
          <nav className="hidden md:flex gap-6 text-xs uppercase tracking-widest text-stone-600">
            {navLinks.map((link, idx) => (
              <Link key={idx} to={link.path} className="hover:text-stone-900">{link.label}</Link>
            ))}
          </nav>
          <Link to={`/demo/${templateSlug}/booking`} className="px-6 py-2 bg-stone-800 text-stone-100 text-xs font-medium uppercase tracking-wider rounded-sm">
            Book Treatment
          </Link>
        </header>

        {/* HOME PAGE */}
        {(activePage === 'home' || !activePage) && (
          <section className="py-24 px-6 text-center max-w-3xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] font-medium text-stone-500">Sanctuary of Calm</span>
            <h1 className="text-4xl sm:text-6xl font-serif font-light text-stone-900">{businessName}</h1>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-light">{tagline}</p>
            <div className="pt-4">
              <Link to={`/demo/${templateSlug}/booking`} className="px-8 py-3 bg-stone-900 text-white text-xs uppercase tracking-widest">
                Reserve Spa Session
              </Link>
            </div>
          </section>
        )}

        {/* SERVICES PAGE */}
        {activePage === 'services' && (
          <section className="max-w-4xl mx-auto px-6 py-12 space-y-8">
            <h1 className="text-3xl font-serif font-light text-center text-stone-900">Curated Spa Therapies</h1>
            <div className="space-y-6">
              {SPA_DATA.services.map((t) => (
                <div key={t.id} className="p-6 bg-white border border-stone-200 rounded-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-serif text-lg text-stone-900">{t.name}</h3>
                      <span className="text-[10px] uppercase px-2 py-0.5 bg-stone-100 text-stone-600 rounded">{t.duration}</span>
                    </div>
                    <p className="text-xs text-stone-500">{t.description}</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-serif text-lg text-stone-900 font-medium">{formatNaira(t.price)}</span>
                    <Link to={`/demo/${templateSlug}/booking`} className="px-4 py-2 bg-stone-900 text-white text-xs">Book</Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* BOOKING PAGE */}
        {activePage === 'booking' && (
          <section className="max-w-2xl mx-auto px-6 py-12 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase tracking-widest text-stone-500">Reservations</span>
              <h1 className="text-3xl font-serif font-light">Book Your Spa Session</h1>
            </div>

            {booked ? (
              <div className="p-8 bg-stone-100 border border-stone-300 text-center space-y-4">
                <Check className="w-10 h-10 text-emerald-700 mx-auto" />
                <h2 className="text-xl font-serif">Spa Session Prepared</h2>
                <p className="text-xs text-stone-600">
                  {selectedService.name} • {bookingDate} at {timeSlot} • {formatNaira(selectedService.price)}
                </p>
                <a
                  href={getWhatsAppLink(`Hello ${businessName}!\nI'd like to confirm a spa booking:\n- Treatment: ${selectedService.name}\n- Date: ${bookingDate}\n- Time: ${timeSlot}\n- Name: ${guestName}\n- Phone: ${phone}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 text-white text-xs uppercase tracking-widest"
                >
                  Confirm on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setBooked(true); }} className="bg-white p-6 border border-stone-200 rounded space-y-4 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Select Treatment</label>
                  <select
                    value={selectedService.id}
                    onChange={(e) => setSelectedService(SPA_DATA.services.find((s) => s.id === e.target.value) || SPA_DATA.services[0])}
                    className="w-full p-2.5 border bg-stone-50"
                  >
                    {SPA_DATA.services.map((s) => (
                      <option key={s.id} value={s.id}>{s.name} ({formatNaira(s.price)})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Preferred Date</label>
                    <input type="date" required value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="w-full p-2.5 border bg-stone-50" />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Time Slot</label>
                    <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} className="w-full p-2.5 border bg-stone-50">
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Your Full Name</label>
                    <input type="text" required placeholder="e.g. Cynthia Morgan" value={guestName} onChange={(e) => setGuestName(e.target.value)} className="w-full p-2.5 border bg-stone-50" />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Phone / WhatsApp</label>
                    <input type="tel" required placeholder="+234 812 ..." value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2.5 border bg-stone-50" />
                  </div>
                </div>

                <button type="submit" className="w-full py-3.5 bg-stone-900 text-white font-bold uppercase tracking-widest">
                  Confirm Spa Booking ({formatNaira(selectedService.price)})
                </button>
              </form>
            )}
          </section>
        )}

        {/* ABOUT & CONTACT */}
        {activePage === 'about' && (
          <section className="max-w-2xl mx-auto px-6 py-16 text-xs text-center space-y-4">
            <h1 className="text-3xl font-serif">Ikoyi Wellness Sanctuary</h1>
            <p className="text-stone-600">Lumé Wellness provides tranquil private treatment rooms, hydro-gel facials, and volcanic stone therapy tailored for executive relaxation in Ikoyi, Lagos.</p>
          </section>
        )}

        {activePage === 'contact' && (
          <section className="max-w-3xl mx-auto px-6 py-16 text-xs space-y-6">
            <h1 className="text-3xl font-serif text-center">Sanctuary Locations</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {SPA_DATA.locations.map((loc, idx) => (
                <div key={idx} className="bg-white p-6 border border-stone-200 space-y-2">
                  <h3 className="font-serif font-bold text-base">{loc.name}</h3>
                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-stone-600" /> {loc.address}</p>
                  <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-stone-600" /> {CONTACT.whatsappDisplay}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      <footer className="bg-stone-900 text-stone-400 py-8 px-6 text-xs text-center">
        <p>{businessName} • WhatsApp {CONTACT.whatsappDisplay} • Telegram @{CONTACT.telegramHandle}</p>
      </footer>
    </div>
  );
};
