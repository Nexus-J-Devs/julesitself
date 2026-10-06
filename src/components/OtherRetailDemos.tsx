import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, X, MessageCircle } from 'lucide-react';
import { OTHER_RETAIL_DATA } from '../data/otherRetailData';
import { useDemo, formatNaira, SkeletonImage } from '../demo-engine/DemoContext';
import { getWhatsAppLink, CONTACT } from '../config/site';
import type { DemoProps } from './DemoWebsites';

// 1. ACCESSORIES DEMO
export const AccessoriesDemo: React.FC<DemoProps> = ({ businessName, tagline, templateSlug, activePage }) => {
  const { cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount, isCartOpen, setIsCartOpen } = useDemo();

  return (
    <div className="bg-amber-50/30 text-stone-900 font-sans min-h-screen flex flex-col justify-between text-xs">
      <div>
        <header className="p-6 border-b border-amber-200/60 bg-white/90 backdrop-blur sticky top-0 z-30 flex justify-between items-center">
          <Link to={`/demo/${templateSlug}`} className="font-serif text-2xl font-bold tracking-wider">{businessName}</Link>
          <nav className="hidden md:flex gap-6 uppercase font-semibold text-stone-600">
            <Link to={`/demo/${templateSlug}`}>Home</Link>
            <Link to={`/demo/${templateSlug}/shop`}>Jewelry & Leather</Link>
            <Link to={`/demo/${templateSlug}/contact`}>Atelier</Link>
          </nav>
          <button onClick={() => setIsCartOpen(true)} className="p-2 bg-stone-900 text-white font-bold uppercase">Cart ({cartCount})</button>
        </header>

        {(activePage === 'home' || !activePage) && (
          <section className="py-20 px-6 text-center max-w-3xl mx-auto space-y-4">
            <span className="font-serif text-amber-900 font-bold uppercase tracking-widest">Handcrafted Luxury</span>
            <h1 className="text-4xl sm:text-6xl font-serif">{businessName}</h1>
            <p className="text-stone-600 max-w-lg mx-auto">{tagline}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 text-left">
              {OTHER_RETAIL_DATA.accessories.products.map((p) => (
                <div key={p.id} className="p-4 bg-white border border-stone-200 rounded space-y-2">
                  <div className="h-48 overflow-hidden rounded">
                    <SkeletonImage src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-sm">{p.name}</h3>
                  <p className="font-serif font-bold text-amber-900">{formatNaira(p.price)}</p>
                  <button onClick={() => addToCart({ id: p.id, name: p.name, price: p.price, image: p.image })} className="w-full py-2 bg-stone-900 text-white font-bold uppercase">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur flex justify-end">
          <div className="w-full max-w-md bg-white p-6 flex flex-col justify-between text-xs">
            <div>
              <div className="flex justify-between items-center border-b pb-3">
                <h2 className="font-serif font-bold text-lg">Shopping Bag ({cartCount})</h2>
                <button onClick={() => setIsCartOpen(false)}><X className="w-5 h-5" /></button>
              </div>
              <div className="divide-y my-4">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 flex justify-between items-center">
                    <div>
                      <span className="font-bold block">{item.name}</span>
                      <span className="text-stone-500">{formatNaira(item.price)} each</span>
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
            <a href={getWhatsAppLink(`Hello ${businessName}!\nI want to order accessories:\n${cart.map((i) => `- ${i.quantity}x ${i.name}`).join('\n')}\nTotal: ${formatNaira(cartTotal)}`)} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-emerald-700 text-white font-bold uppercase text-center flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" /> WhatsApp Checkout ({formatNaira(cartTotal)})
            </a>
          </div>
        </div>
      )}

      <footer className="bg-stone-900 text-stone-400 py-6 text-center">
        <p>{businessName} • Ikoyi • WhatsApp {CONTACT.whatsappDisplay}</p>
      </footer>
    </div>
  );
};

// 2. BEAUTY PRODUCTS DEMO
export const BeautyProductsDemo: React.FC<DemoProps> = ({ businessName, tagline, templateSlug, activePage }) => {
  const { cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount, isCartOpen, setIsCartOpen } = useDemo();

  return (
    <div className="bg-rose-50/20 text-slate-900 font-sans min-h-screen flex flex-col justify-between text-xs">
      <div>
        <header className="p-6 border-b border-rose-100 bg-white sticky top-0 z-30 flex justify-between items-center">
          <Link to={`/demo/${templateSlug}`} className="font-serif text-2xl font-bold uppercase text-rose-950">{businessName}</Link>
          <button onClick={() => setIsCartOpen(true)} className="p-2 bg-rose-950 text-white font-bold uppercase">Glow Bag ({cartCount})</button>
        </header>

        {(activePage === 'home' || !activePage) && (
          <section className="py-20 px-6 text-center max-w-3xl mx-auto space-y-4">
            <span className="font-bold text-rose-900 uppercase tracking-widest">Melanin Clean Botanicals</span>
            <h1 className="text-4xl sm:text-6xl font-serif text-rose-950">{businessName}</h1>
            <p className="text-slate-600 max-w-lg mx-auto">{tagline}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 text-left">
              {OTHER_RETAIL_DATA.beauty.products.map((p) => (
                <div key={p.id} className="p-5 bg-white border border-rose-100 rounded space-y-2">
                  <div className="h-48 overflow-hidden rounded">
                    <SkeletonImage src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-rose-950">{p.name}</h3>
                  <p className="text-[10px] text-rose-800 font-bold uppercase">Skin Type: {p.skinType}</p>
                  <p className="text-slate-500 text-[10px]">Key Ingredients: {p.ingredients}</p>
                  <p className="font-bold text-rose-950 text-sm">{formatNaira(p.price)}</p>
                  <button onClick={() => addToCart({ id: p.id, name: p.name, price: p.price, image: p.image })} className="w-full py-2.5 bg-rose-950 text-white font-bold uppercase">
                    Add Serum to Bag
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur flex justify-end">
          <div className="w-full max-w-md bg-white p-6 flex flex-col justify-between text-xs">
            <div>
              <div className="flex justify-between items-center border-b pb-3">
                <h2 className="font-serif font-bold text-lg text-rose-950">Glow Bag</h2>
                <button onClick={() => setIsCartOpen(false)}><X className="w-5 h-5" /></button>
              </div>
              <div className="divide-y my-4">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 flex justify-between items-center">
                    <div>
                      <span className="font-bold block">{item.name}</span>
                      <span className="text-rose-900">{formatNaira(item.price)} each</span>
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
            <a href={getWhatsAppLink(`Hello ${businessName}!\nI'd like to order skincare serums:\n${cart.map((i) => `- ${i.quantity}x ${i.name}`).join('\n')}\nTotal: ${formatNaira(cartTotal)}`)} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-emerald-700 text-white font-bold uppercase text-center flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" /> Order via WhatsApp ({formatNaira(cartTotal)})
            </a>
          </div>
        </div>
      )}

      <footer className="bg-rose-950 text-rose-200 py-6 text-center">
        <p>{businessName} • Victoria Island • WhatsApp {CONTACT.whatsappDisplay}</p>
      </footer>
    </div>
  );
};

// 3. GENERAL STORE DEMO
export const GeneralStoreDemo: React.FC<DemoProps> = ({ businessName, tagline, templateSlug, activePage }) => {
  const { cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount, isCartOpen, setIsCartOpen } = useDemo();

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen flex flex-col justify-between text-xs">
      <div>
        <header className="p-6 border-b border-slate-200 bg-white sticky top-0 z-30 flex justify-between items-center">
          <Link to={`/demo/${templateSlug}`} className="font-serif text-2xl font-bold uppercase">{businessName}</Link>
          <button onClick={() => setIsCartOpen(true)} className="p-2 bg-slate-900 text-white font-bold uppercase">Store Cart ({cartCount})</button>
        </header>

        {(activePage === 'home' || !activePage) && (
          <section className="py-20 px-6 text-center max-w-3xl mx-auto space-y-4">
            <span className="font-bold text-slate-700 uppercase tracking-widest">Curated Daily Living</span>
            <h1 className="text-4xl sm:text-6xl font-serif">{businessName}</h1>
            <p className="text-slate-600 max-w-lg mx-auto">{tagline}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 text-left">
              {OTHER_RETAIL_DATA.generalStore.products.map((p) => (
                <div key={p.id} className="p-4 bg-white border border-slate-200 rounded space-y-2">
                  <div className="h-48 overflow-hidden rounded">
                    <SkeletonImage src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-sm">{p.name}</h3>
                  <p className="font-bold text-slate-900 text-sm">{formatNaira(p.price)}</p>
                  <button onClick={() => addToCart({ id: p.id, name: p.name, price: p.price, image: p.image })} className="w-full py-2 bg-slate-900 text-white font-bold uppercase">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur flex justify-end">
          <div className="w-full max-w-md bg-white p-6 flex flex-col justify-between text-xs">
            <div>
              <div className="flex justify-between items-center border-b pb-3">
                <h2 className="font-serif font-bold text-lg">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)}><X className="w-5 h-5" /></button>
              </div>
              <div className="divide-y my-4">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 flex justify-between items-center">
                    <div>
                      <span className="font-bold block">{item.name}</span>
                      <span>{formatNaira(item.price)} each</span>
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
            <a href={getWhatsAppLink(`Hello ${businessName}!\nI want to buy store items:\n${cart.map((i) => `- ${i.quantity}x ${i.name}`).join('\n')}\nTotal: ${formatNaira(cartTotal)}`)} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-emerald-700 text-white font-bold uppercase text-center flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" /> Send Order on WhatsApp ({formatNaira(cartTotal)})
            </a>
          </div>
        </div>
      )}

      <footer className="bg-slate-900 text-slate-400 py-6 text-center">
        <p>{businessName} • WhatsApp {CONTACT.whatsappDisplay}</p>
      </footer>
    </div>
  );
};
