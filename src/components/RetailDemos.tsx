import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, Trash2, X, MessageCircle } from 'lucide-react';
import { RETAIL_DATA } from '../data/retailData';
import { useDemo, formatNaira, SkeletonImage } from '../demo-engine/DemoContext';
import { getWhatsAppLink, CONTACT } from '../config/site';
import type { DemoProps } from './DemoWebsites';

export const FashionDemo: React.FC<DemoProps> = ({ businessName, tagline, templateSlug, activePage }) => {
  const { productId } = useParams<{ productId?: string }>();
  const { cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount, isCartOpen, setIsCartOpen } = useDemo();

  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedAreaFee, setSelectedAreaFee] = useState(2000);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const currentProduct = RETAIL_DATA.fashion.products.find((p) => p.id === productId) || RETAIL_DATA.fashion.products[0];
  const finalTotal = cartTotal + selectedAreaFee;

  const navLinks = [
    { label: 'Home', path: `/demo/${templateSlug}` },
    { label: 'Collections', path: `/demo/${templateSlug}/shop` },
    { label: 'Lookbook', path: `/demo/${templateSlug}/lookbook` },
    { label: 'Atelier', path: `/demo/${templateSlug}/about` },
    { label: 'Boutique Location', path: `/demo/${templateSlug}/contact` }
  ];

  return (
    <div className="bg-neutral-950 text-neutral-100 font-sans min-h-screen flex flex-col justify-between text-xs">
      <div>
        <header className="p-6 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur sticky top-0 z-30 flex justify-between items-center">
          <Link to={`/demo/${templateSlug}`} className="font-serif text-3xl font-bold tracking-tighter uppercase text-white">{businessName}</Link>
          <nav className="hidden md:flex gap-6 uppercase tracking-widest text-neutral-400 font-medium">
            {navLinks.map((link, idx) => (
              <Link key={idx} to={link.path} className="hover:text-white">{link.label}</Link>
            ))}
          </nav>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <span className="hidden sm:inline uppercase text-[10px] tracking-widest">Bag ({cartCount})</span>
          </button>
        </header>

        {(activePage === 'home' || !activePage) && (
          <div>
            <section className="relative h-[65vh] flex items-end p-8 sm:p-16 border-b border-neutral-800 overflow-hidden">
              <SkeletonImage src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80" alt="Fashion Editorial" className="absolute inset-0 w-full h-full object-cover opacity-40 -z-10" />
              <div className="relative z-10 max-w-xl space-y-4">
                <span className="text-xs tracking-[0.4em] uppercase text-neutral-400 block">Lagos Resort Edition</span>
                <h1 className="text-4xl sm:text-6xl font-serif uppercase tracking-tight">{businessName}</h1>
                <p className="text-xs text-neutral-300 tracking-wider font-light">{tagline}</p>
                <Link to={`/demo/${templateSlug}/shop`} className="inline-block px-8 py-3.5 bg-white text-black uppercase font-bold tracking-widest mt-4">
                  Shop Collection
                </Link>
              </div>
            </section>

            <section className="p-8 sm:p-16 max-w-7xl mx-auto space-y-8">
              <h2 className="text-xs uppercase tracking-[0.3em] text-neutral-400">Selected Garments</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {RETAIL_DATA.fashion.products.map((p) => (
                  <Link key={p.id} to={`/demo/${templateSlug}/product/${p.id}`} className="group space-y-3 block">
                    <div className="aspect-[3/4] bg-neutral-900 overflow-hidden relative">
                      <SkeletonImage src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex justify-between items-baseline uppercase tracking-wider">
                      <span className="font-medium text-neutral-200">{p.name}</span>
                      <span className="text-amber-400 font-mono">{formatNaira(p.price)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        )}

        {activePage === 'shop' && (
          <section className="p-8 sm:p-16 max-w-7xl mx-auto space-y-8">
            <h1 className="text-2xl font-serif uppercase tracking-wider">Ready-To-Wear Collection</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {RETAIL_DATA.fashion.products.map((p) => (
                <div key={p.id} className="space-y-3">
                  <div className="aspect-[3/4] bg-neutral-900 overflow-hidden">
                    <SkeletonImage src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium uppercase">{p.name}</h3>
                    <span className="text-amber-400 font-mono">{formatNaira(p.price)}</span>
                  </div>
                  <button onClick={() => addToCart({ id: p.id, name: p.name, price: p.price, image: p.image })} className="w-full py-2.5 bg-neutral-800 text-white hover:bg-neutral-700 uppercase font-bold tracking-wider">
                    Add to Bag
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activePage === 'product' && (
          <section className="p-8 sm:p-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="aspect-[3/4] bg-neutral-900 rounded overflow-hidden">
              <SkeletonImage src={currentProduct.image} alt={currentProduct.name} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-6 flex flex-col justify-center">
              <span className="text-neutral-400 uppercase tracking-widest">{currentProduct.category}</span>
              <h1 className="text-3xl font-serif uppercase">{currentProduct.name}</h1>
              <span className="text-2xl font-mono text-amber-400 font-bold block">{formatNaira(currentProduct.price)}</span>

              <div>
                <label className="block text-neutral-400 uppercase tracking-widest mb-2">Select Size</label>
                <div className="flex gap-2">
                  {currentProduct.sizes.map((s) => (
                    <button key={s} onClick={() => setSelectedSize(s)} className={`px-4 py-2 border ${selectedSize === s ? 'border-white bg-white text-black font-bold' : 'border-neutral-700 text-neutral-300'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={() => addToCart({ id: currentProduct.id, name: `${currentProduct.name} (Size: ${selectedSize})`, price: currentProduct.price, image: currentProduct.image })} className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-neutral-200">
                Add Garment to Bag
              </button>
            </div>
          </section>
        )}

        {(activePage === 'lookbook' || activePage === 'about' || activePage === 'contact') && (
          <section className="py-20 px-6 text-center max-w-2xl mx-auto space-y-4">
            <h1 className="text-3xl font-serif uppercase">Ikoyi Atelier</h1>
            <p className="text-neutral-400">Victoria Island Boulevard, Ikoyi, Lagos • WhatsApp {CONTACT.whatsappDisplay}</p>
          </section>
        )}
      </div>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur flex justify-end">
          <div className="w-full max-w-md bg-neutral-900 text-white h-full flex flex-col justify-between p-6 overflow-y-auto border-l border-neutral-800">
            <div>
              <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
                <h2 className="font-serif font-bold text-lg uppercase">Shopping Bag ({cartCount})</h2>
                <button onClick={() => setIsCartOpen(false)}><X className="w-5 h-5" /></button>
              </div>

              <div className="divide-y divide-neutral-800 my-4">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold block">{item.name}</span>
                      <span className="text-amber-400">{formatNaira(item.price)} each</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, -1)}><Minus className="w-3 h-3" /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}><Plus className="w-3 h-3" /></button>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 ml-2"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="border-t border-neutral-800 pt-4 space-y-3">
                <div>
                  <label className="block text-[10px] uppercase text-neutral-400 mb-1">Select Delivery Area</label>
                  <select value={selectedAreaFee} onChange={(e) => setSelectedAreaFee(Number(e.target.value))} className="w-full p-2 bg-neutral-950 border border-neutral-800 text-white">
                    {RETAIL_DATA.fashion.deliveryAreas.map((a, idx) => (
                      <option key={idx} value={a.fee}>{a.name} (+{formatNaira(a.fee)})</option>
                    ))}
                  </select>
                </div>

                <input type="text" placeholder="Full Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full p-2 bg-neutral-950 border border-neutral-800" />
                <input type="tel" placeholder="Phone (+234)" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 bg-neutral-950 border border-neutral-800" />
                <input type="text" placeholder="Delivery Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2 bg-neutral-950 border border-neutral-800" />

                <div className="flex justify-between font-bold text-sm pt-2">
                  <span>Grand Total</span>
                  <span className="text-amber-400">{formatNaira(finalTotal)}</span>
                </div>

                <a href={getWhatsAppLink(`Hello ${businessName}!\nI'd like to order garments:\n${cart.map((i) => `- ${i.quantity}x ${i.name}`).join('\n')}\nDelivery: ${address}\nTotal: ${formatNaira(finalTotal)}\nName: ${customerName}\nPhone: ${phone}`)} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-emerald-700 text-white font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Send Order on WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="bg-neutral-900 text-neutral-500 py-6 text-center">
        <p>{businessName} • WhatsApp {CONTACT.whatsappDisplay}</p>
      </footer>
    </div>
  );
};

export const SneakersDemo: React.FC<DemoProps> = ({ businessName, tagline, templateSlug, activePage }) => {
  const { cart, addToCart, cartTotal, cartCount, isCartOpen, setIsCartOpen } = useDemo();
  const [selectedSize, setSelectedSize] = useState('EU 42');

  return (
    <div className="bg-black text-white font-sans min-h-screen flex flex-col justify-between text-xs">
      <div>
        <header className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <Link to={`/demo/${templateSlug}`} className="font-serif text-2xl font-extrabold uppercase tracking-wider">{businessName}</Link>
          <button onClick={() => setIsCartOpen(true)} className="p-2 bg-white text-black font-bold uppercase">Vault Bag ({cartCount})</button>
        </header>

        {(activePage === 'home' || !activePage) && (
          <section className="py-20 px-6 max-w-5xl mx-auto space-y-8 text-center">
            <span className="font-mono text-amber-400 uppercase">Authentic Sneakers Vault</span>
            <h1 className="text-4xl sm:text-6xl font-serif font-black uppercase">{businessName}</h1>
            <p className="text-zinc-400 max-w-lg mx-auto">{tagline}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 text-left">
              {RETAIL_DATA.sneakers.products.map((p) => (
                <div key={p.id} className="p-4 bg-zinc-900 border border-zinc-800 space-y-3">
                  <div className="h-44 overflow-hidden bg-black">
                    <SkeletonImage src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-sm">{p.name}</h3>
                  <p className="text-amber-400 font-mono font-bold">{formatNaira(p.price)}</p>
                  <div className="flex gap-1 flex-wrap">
                    {p.sizes.map((s) => (
                      <button key={s} onClick={() => setSelectedSize(s)} className={`px-2 py-1 text-[10px] border ${selectedSize === s ? 'bg-white text-black font-bold' : 'border-zinc-700 text-zinc-400'}`}>{s}</button>
                    ))}
                  </div>
                  <button onClick={() => addToCart({ id: p.id, name: `${p.name} (${selectedSize})`, price: p.price, image: p.image })} className="w-full py-2 bg-white text-black font-bold uppercase">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex justify-end">
          <div className="w-full max-w-md bg-zinc-900 p-6 flex flex-col justify-between text-xs">
            <div>
              <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                <h2 className="font-serif font-bold text-base uppercase">Vault Cart</h2>
                <button onClick={() => setIsCartOpen(false)}><X className="w-5 h-5" /></button>
              </div>
              <div className="divide-y divide-zinc-800 my-4">
                {cart.map((item) => (
                  <div key={item.id} className="py-2 flex justify-between items-center">
                    <span>{item.name} x{item.quantity}</span>
                    <span className="text-amber-400 font-mono">{formatNaira(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
            <a href={getWhatsAppLink(`Hello ${businessName}!\nI want to buy sneakers:\n${cart.map((i) => `- ${i.quantity}x ${i.name}`).join('\n')}\nTotal: ${formatNaira(cartTotal)}`)} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-emerald-600 text-white font-bold uppercase text-center">
              Checkout on WhatsApp ({formatNaira(cartTotal)})
            </a>
          </div>
        </div>
      )}

      <footer className="bg-zinc-950 py-6 text-center text-zinc-600">
        <p>{businessName} • Lekki Phase 1 • WhatsApp {CONTACT.whatsappDisplay}</p>
      </footer>
    </div>
  );
};
