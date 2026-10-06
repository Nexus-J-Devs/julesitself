import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Check, ShoppingBag, Plus, Minus, Trash2, X, Search, Clock, Menu as MenuIcon, MessageCircle } from 'lucide-react';
import { RESTAURANT_DATA } from '../data/restaurant';
import { useDemo, formatNaira, SkeletonImage } from '../demo-engine/DemoContext';
import { getWhatsAppLink, CONTACT } from '../config/site';

export interface DemoProps {
  businessName: string;
  tagline: string;
  categorySlug: string;
  templateSlug: string;
  activePage: string;
}

export const RestaurantDemo: React.FC<DemoProps> = ({ businessName, tagline, templateSlug, activePage }) => {
  const { cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount, isCartOpen, setIsCartOpen } = useDemo();

  const [activeTab, setActiveTab] = useState<'mains' | 'starters' | 'soups' | 'grills' | 'drinks' | 'pastries'>('mains');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpicy, setFilterSpicy] = useState(false);
  const [filterVegetarian, setFilterVegetarian] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Reservation form state
  const [reservation, setReservation] = useState({ date: '', time: '19:00', guests: '2', name: '', phone: '', location: RESTAURANT_DATA.locations[0].name });
  const [reserved, setReserved] = useState(false);

  // Delivery / Checkout state
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('delivery');
  const [selectedAreaFee, setSelectedAreaFee] = useState<number>(RESTAURANT_DATA.deliveryAreas[0].fee);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '', notes: '' });

  const finalTotal = cartTotal + (deliveryType === 'delivery' ? selectedAreaFee : 0);

  const filteredMenuItems = RESTAURANT_DATA.menu.filter((item) => {
    if (activeTab && item.category !== activeTab) return false;
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) && !item.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filterSpicy && !item.spicy) return false;
    if (filterVegetarian && !item.vegetarian) return false;
    return true;
  });

  const generateWhatsAppOrderText = () => {
    const itemsList = cart.map((i) => `- ${i.quantity}x ${i.name} (${formatNaira(i.price * i.quantity)})`).join('\n');
    const deliveryDetails = deliveryType === 'delivery'
      ? `Delivery to: ${customerInfo.address}\nDelivery Fee: ${formatNaira(selectedAreaFee)}`
      : 'Order Type: Pickup at Restaurant';

    return `Hello ${businessName}!\n\nNew Food Order:\n${itemsList}\n\nSubtotal: ${formatNaira(cartTotal)}\n${deliveryDetails}\nGrand Total: ${formatNaira(finalTotal)}\n\nCustomer Details:\nName: ${customerInfo.name}\nPhone: ${customerInfo.phone}\nNotes: ${customerInfo.notes || 'None'}\n\nPlease confirm availability and payment details!`;
  };

  const navLinks = [
    { label: 'Home', path: `/demo/${templateSlug}` },
    { label: 'Seasonal Menu', path: `/demo/${templateSlug}/menu` },
    { label: 'Online Order', path: `/demo/${templateSlug}/order` },
    { label: 'Reservations', path: `/demo/${templateSlug}/reservations` },
    { label: 'Gallery', path: `/demo/${templateSlug}/gallery` },
    { label: 'About Us', path: `/demo/${templateSlug}/about` },
    { label: 'Contact & Hours', path: `/demo/${templateSlug}/contact` }
  ];

  return (
    <div className="font-sans text-neutral-900 bg-[#FBF9F5] min-h-screen flex flex-col justify-between">
      <div>

        {/* Navigation Bar */}
        <header className="border-b border-neutral-200 py-4 px-4 sm:px-8 flex justify-between items-center bg-[#FBF9F5]/95 backdrop-blur-md sticky top-0 z-30">
          <Link to={`/demo/${templateSlug}`} className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl tracking-widest font-bold uppercase text-neutral-900">{businessName}</span>
            <span className="text-[10px] tracking-widest uppercase text-amber-900 font-semibold">Lagos Fine Dining</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex gap-6 text-xs font-semibold tracking-wider uppercase text-neutral-700">
            {navLinks.map((link, idx) => (
              <Link key={idx} to={link.path} className="hover:text-amber-900 transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-neutral-900 hover:text-amber-900 transition-colors"
              aria-label="Open order bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-800 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <Link
              to={`/demo/${templateSlug}/reservations`}
              className="hidden sm:inline-block px-4 py-2 bg-neutral-900 text-white text-xs uppercase tracking-wider font-semibold hover:bg-amber-900 transition-colors"
            >
              Reserve Table
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </header>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FBF9F5] border-b border-neutral-200 px-6 py-4 space-y-3 text-xs uppercase font-bold tracking-wider">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-neutral-800 hover:text-amber-900"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* PAGE 1: HOME PAGE */}
        {(activePage === 'home' || !activePage) && (
          <div>
            <section className="relative h-[70vh] min-h-[480px] flex items-center justify-center text-center px-4 bg-black/50 text-white overflow-hidden">
              <SkeletonImage
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
                alt="Restaurant interior"
                className="absolute inset-0 w-full h-full -z-10 brightness-50"
              />
              <div className="max-w-3xl space-y-4 px-4">
                <span className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-200 block">Lagos Culinary Heritage</span>
                <h1 className="text-4xl sm:text-6xl font-serif tracking-tight font-light">{businessName}</h1>
                <p className="text-sm sm:text-base font-light tracking-wide text-neutral-200 max-w-xl mx-auto italic">{tagline}</p>
                <div className="pt-4 flex flex-wrap justify-center gap-4">
                  <Link to={`/demo/${templateSlug}/menu`} className="px-6 py-3 bg-white text-neutral-900 font-semibold text-xs uppercase tracking-widest hover:bg-amber-100 transition-colors">
                    View Full Menu
                  </Link>
                  <Link to={`/demo/${templateSlug}/reservations`} className="px-6 py-3 bg-amber-900 text-white font-semibold text-xs uppercase tracking-widest hover:bg-amber-800 transition-colors">
                    Book Table
                  </Link>
                </div>
              </div>
            </section>

            {/* Featured Items Strip */}
            <section className="py-16 px-4 sm:px-12 max-w-6xl mx-auto">
              <div className="text-center space-y-2 mb-10">
                <span className="text-xs uppercase tracking-[0.2em] text-amber-800 font-bold block">Chef Specials</span>
                <h2 className="text-3xl font-serif font-light">Popular Lagos Delicacies</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {RESTAURANT_DATA.menu.filter((i) => i.popular).slice(0, 6).map((item) => (
                  <div key={item.id} className="bg-white border border-neutral-200 rounded-sm overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <SkeletonImage src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-serif font-semibold text-base">{item.name}</h3>
                          <span className="font-serif font-bold text-amber-900 shrink-0">{formatNaira(item.price)}</span>
                        </div>
                        <p className="text-xs text-neutral-600 font-light mt-1.5 leading-relaxed">{item.description}</p>
                      </div>
                      <button
                        onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })}
                        className="w-full mt-4 py-2 bg-neutral-900 text-white text-xs uppercase tracking-wider font-semibold hover:bg-amber-900 transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" /> Add to Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* PAGE 2 & 3: MENU & ORDER PAGES */}
        {(activePage === 'menu' || activePage === 'order') && (
          <section className="py-12 px-4 sm:px-12 max-w-6xl mx-auto">
            <div className="text-center space-y-2 mb-8">
              <span className="text-xs uppercase tracking-[0.2em] text-amber-800 font-bold block">Gastronomy</span>
              <h1 className="text-3xl sm:text-4xl font-serif font-light">Seasonal Menu & Online Ordering</h1>
              <p className="text-xs text-neutral-600 max-w-md mx-auto">Select items below to order directly for instant delivery across Victoria Island, Lekki, Ikoyi, Ikeja, and Yaba.</p>
            </div>

            {/* Search & Filters */}
            <div className="bg-white p-4 border border-neutral-200 rounded-sm mb-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search dishes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 text-xs focus:outline-none focus:border-amber-800"
                  />
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" checked={filterSpicy} onChange={(e) => setFilterSpicy(e.target.checked)} />
                    <span>🌶️ Spicy</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" checked={filterVegetarian} onChange={(e) => setFilterVegetarian(e.target.checked)} />
                    <span>🌱 Vegetarian</span>
                  </label>
                </div>
              </div>

              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2 border-t border-neutral-100 pt-3 text-xs font-semibold uppercase tracking-wider">
                {(['mains', 'starters', 'soups', 'grills', 'drinks', 'pastries'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-sm transition-colors ${
                      activeTab === tab ? 'bg-amber-900 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMenuItems.length === 0 ? (
                <div className="col-span-2 text-center py-12 text-neutral-500 text-xs">
                  No dishes found matching your search filters.
                </div>
              ) : (
                filteredMenuItems.map((item) => (
                  <div key={item.id} className="bg-white p-5 border border-neutral-200/80 rounded-sm flex gap-4 items-center justify-between">
                    <div className="space-y-1.5 max-w-sm">
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif font-semibold text-base text-neutral-900">{item.name}</h3>
                        {item.spicy && <span className="text-[10px] text-red-600 font-bold">🌶️</span>}
                      </div>
                      <p className="text-xs text-neutral-600 font-light leading-relaxed">{item.description}</p>
                      <span className="font-serif text-sm font-bold text-amber-900 block pt-1">{formatNaira(item.price)}</span>
                    </div>

                    <button
                      onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })}
                      className="px-3 py-2 bg-neutral-900 hover:bg-amber-900 text-white text-xs font-semibold rounded-sm transition-colors shrink-0 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {/* PAGE 4: RESERVATIONS PAGE */}
        {activePage === 'reservations' && (
          <section className="py-16 bg-neutral-900 text-white px-4 sm:px-12 my-6">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-amber-300 font-semibold block">Table Bookings</span>
              <h1 className="text-3xl sm:text-4xl font-serif">Reserve Your Table</h1>
              <p className="text-xs text-neutral-400">Experience exquisite Nigerian dining at {businessName}. Select your date and time below.</p>

              {reserved ? (
                <div className="p-8 bg-neutral-800 border border-neutral-700 text-center space-y-4">
                  <Check className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h2 className="text-xl font-serif text-white">Reservation Request Sent!</h2>
                  <p className="text-xs text-neutral-300 max-w-md mx-auto">
                    Thank you, <strong>{reservation.name}</strong>. Your request for <strong>{reservation.guests} guests</strong> at {reservation.location} on <strong>{reservation.date}</strong> at {reservation.time} has been prepared.
                  </p>
                  <a
                    href={getWhatsAppLink(`Hello ${businessName}!\n\nI would like to confirm a table reservation:\n- Name: ${reservation.name}\n- Phone: ${reservation.phone}\n- Branch: ${reservation.location}\n- Guests: ${reservation.guests}\n- Date: ${reservation.date}\n- Time: ${reservation.time}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 text-white text-xs font-semibold rounded-sm hover:bg-emerald-800 transition-colors"
                  >
                    Confirm via WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setReserved(true); }} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-1">Select Branch</label>
                    <select value={reservation.location} onChange={(e) => setReservation({...reservation, location: e.target.value})} className="w-full bg-neutral-800 border border-neutral-700 p-3 text-xs text-white">
                      {RESTAURANT_DATA.locations.map((loc, idx) => (
                        <option key={idx} value={loc.name}>{loc.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-1">Party Size</label>
                    <select value={reservation.guests} onChange={(e) => setReservation({...reservation, guests: e.target.value})} className="w-full bg-neutral-800 border border-neutral-700 p-3 text-xs text-white">
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="6">6+ Guests (Private Dining)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-1">Date</label>
                    <input type="date" required value={reservation.date} onChange={(e) => setReservation({...reservation, date: e.target.value})} className="w-full bg-neutral-800 border border-neutral-700 p-3 text-xs text-white" />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-1">Time Slot</label>
                    <select value={reservation.time} onChange={(e) => setReservation({...reservation, time: e.target.value})} className="w-full bg-neutral-800 border border-neutral-700 p-3 text-xs text-white">
                      <option value="12:30">12:30 PM (Lunch)</option>
                      <option value="14:00">02:00 PM (Lunch)</option>
                      <option value="18:30">06:30 PM (Dinner)</option>
                      <option value="20:00">08:00 PM (Dinner)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-1">Your Full Name</label>
                    <input type="text" required placeholder="e.g. Tunde Balogun" value={reservation.name} onChange={(e) => setReservation({...reservation, name: e.target.value})} className="w-full bg-neutral-800 border border-neutral-700 p-3 text-xs text-white" />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-1">Phone / WhatsApp</label>
                    <input type="tel" required placeholder="+234 812 ..." value={reservation.phone} onChange={(e) => setReservation({...reservation, phone: e.target.value})} className="w-full bg-neutral-800 border border-neutral-700 p-3 text-xs text-white" />
                  </div>

                  <div className="sm:col-span-2 pt-2">
                    <button type="submit" className="w-full py-4 bg-amber-200 text-neutral-900 font-bold text-xs uppercase tracking-widest hover:bg-amber-100 transition-colors">
                      Submit Table Reservation
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>
        )}

        {/* PAGE 5: GALLERY PAGE */}
        {activePage === 'gallery' && (
          <section className="py-12 px-4 sm:px-12 max-w-6xl mx-auto">
            <div className="text-center space-y-2 mb-10">
              <span className="text-xs uppercase tracking-[0.2em] text-amber-800 font-bold block">Atmosphere</span>
              <h1 className="text-3xl font-serif">Kitchen & Dining Gallery</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80"
              ].map((img, idx) => (
                <div key={idx} className="h-64 rounded-sm overflow-hidden shadow-sm">
                  <SkeletonImage src={img} alt={`Gallery image ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PAGE 6: ABOUT PAGE */}
        {activePage === 'about' && (
          <section className="py-16 px-4 sm:px-12 max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] text-amber-800 font-bold block">Our Story</span>
              <h1 className="text-4xl font-serif font-light">{businessName}</h1>
            </div>

            <div className="prose prose-neutral text-xs leading-relaxed text-neutral-700 space-y-4">
              <p>
                Founded in Lagos, {businessName} celebrates authentic Nigerian culinary traditions while elevating classic recipes with premium ingredients and refined presentation.
              </p>
              <p>
                From our signature firewood-smoked Party Jollof to our slow-braised soups cooked with native herbs, every dish reflects our commitment to hospitality and local flavor.
              </p>
            </div>
          </section>
        )}

        {/* PAGE 7: CONTACT PAGE */}
        {activePage === 'contact' && (
          <section className="py-16 px-4 sm:px-12 max-w-5xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-amber-800 font-bold block">Reach Us</span>
              <h1 className="text-3xl font-serif">Locations & Operating Hours</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
              {RESTAURANT_DATA.locations.map((loc, idx) => (
                <div key={idx} className="bg-white p-6 border border-neutral-200 rounded-sm space-y-3">
                  <h3 className="font-serif font-bold text-lg text-neutral-900">{loc.name}</h3>
                  <p className="flex items-center gap-2 text-neutral-600"><MapPin className="w-4 h-4 text-amber-800 shrink-0" /> {loc.address}</p>
                  <p className="flex items-center gap-2 text-neutral-600"><Phone className="w-4 h-4 text-amber-800 shrink-0" /> {CONTACT.whatsappDisplay}</p>
                  <p className="flex items-center gap-2 text-neutral-600"><Clock className="w-4 h-4 text-amber-800 shrink-0" /> {loc.hours}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white h-full flex flex-col justify-between shadow-2xl p-6 overflow-y-auto">
            <div>
              <div className="flex justify-between items-center border-b pb-4">
                <h2 className="font-serif font-bold text-lg text-neutral-900">Your Order Bag ({cartCount})</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-1 hover:text-amber-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 text-xs text-neutral-500">
                  Your food order is currently empty.
                </div>
              ) : (
                <div className="divide-y divide-neutral-100 my-4 space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="pt-3 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <h4 className="font-bold text-neutral-900">{item.name}</h4>
                        <p className="text-neutral-500">{formatNaira(item.price)} each</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 bg-neutral-100 rounded">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 bg-neutral-100 rounded">
                          <Plus className="w-3 h-3" />
                        </button>
                        <button onClick={() => removeFromCart(item.id)} className="p-1 text-red-600 ml-2">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t pt-4 space-y-4 text-xs">
                {/* Delivery Option Switcher */}
                <div className="space-y-2">
                  <label className="block font-bold uppercase tracking-wider text-[10px] text-neutral-500">Fulfillment Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setDeliveryType('delivery')}
                      className={`p-2 border rounded text-xs font-semibold ${deliveryType === 'delivery' ? 'bg-amber-900 text-white border-amber-900' : 'bg-neutral-50'}`}
                    >
                      Delivery
                    </button>
                    <button
                      onClick={() => setDeliveryType('pickup')}
                      className={`p-2 border rounded text-xs font-semibold ${deliveryType === 'pickup' ? 'bg-amber-900 text-white border-amber-900' : 'bg-neutral-50'}`}
                    >
                      Pickup
                    </button>
                  </div>
                </div>

                {deliveryType === 'delivery' && (
                  <div>
                    <label className="block font-bold text-[10px] text-neutral-500 uppercase mb-1">Select Delivery Area</label>
                    <select
                      value={selectedAreaFee}
                      onChange={(e) => setSelectedAreaFee(Number(e.target.value))}
                      className="w-full p-2 border text-xs bg-neutral-50"
                    >
                      {RESTAURANT_DATA.deliveryAreas.map((area, idx) => (
                        <option key={idx} value={area.fee}>
                          {area.name} (+{formatNaira(area.fee)})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Customer Details */}
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full p-2 border text-xs bg-neutral-50"
                  />
                  <input
                    type="tel"
                    placeholder="Phone / WhatsApp (+234)"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full p-2 border text-xs bg-neutral-50"
                  />
                  {deliveryType === 'delivery' && (
                    <input
                      type="text"
                      placeholder="Delivery Street Address"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      className="w-full p-2 border text-xs bg-neutral-50"
                    />
                  )}
                </div>

                {/* Totals */}
                <div className="pt-2 border-t space-y-1 font-semibold">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatNaira(cartTotal)}</span>
                  </div>
                  {deliveryType === 'delivery' && (
                    <div className="flex justify-between text-neutral-500 font-normal">
                      <span>Delivery Fee</span>
                      <span>{formatNaira(selectedAreaFee)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-amber-900 pt-1">
                    <span>Grand Total</span>
                    <span>{formatNaira(finalTotal)}</span>
                  </div>
                </div>

                <a
                  href={getWhatsAppLink(generateWhatsAppOrderText())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> Send Order on WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-10 px-4 sm:px-12 border-t border-neutral-800 text-xs mt-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start gap-6">
          <div className="space-y-2">
            <span className="font-serif text-lg text-white font-bold block">{businessName}</span>
            <p className="max-w-xs">{tagline}</p>
          </div>
          <div className="space-y-1">
            <span className="text-white font-bold block">Contact</span>
            <p>WhatsApp: {CONTACT.whatsappDisplay}</p>
            <p>Telegram: @{CONTACT.telegramHandle}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Generic Fallback Demo for other categories
export const GenericDemo: React.FC<DemoProps> = ({ businessName, tagline }) => {
  return (
    <div className="bg-stone-50 text-stone-900 font-sans min-h-screen">
      <header className="p-6 border-b border-stone-200 flex justify-between items-center">
        <span className="font-serif text-2xl font-bold">{businessName}</span>
        <a href={getWhatsAppLink(`Hello ${businessName}!`)} target="_blank" rel="noopener noreferrer" className="px-5 py-2 bg-stone-900 text-white text-xs font-semibold">Contact Business</a>
      </header>

      <section className="py-24 px-6 text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl sm:text-6xl font-serif font-medium text-stone-900">{businessName}</h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">{tagline}</p>
      </section>
    </div>
  );
};

export { BakeryDemo, SpaDemo } from './BakeryAndSpaDemos';
export { SalonDemo, FitnessDemo, HomeServicesDemo, EducationDemo } from './ServicesAndEduDemos';
export { FashionDemo, SneakersDemo } from './RetailDemos';
export { AccessoriesDemo, BeautyProductsDemo, GeneralStoreDemo } from './OtherRetailDemos';
export { InteriorDemo, RealEstateDemo } from './PortfolioDemos';
export { CreativeDemo, EventsDemo } from './CreativeAndEventsDemos';
