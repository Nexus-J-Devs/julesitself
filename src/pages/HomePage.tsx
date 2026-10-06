import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, CheckCircle2, Sparkles, MessageCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { TEMPLATES } from '../data/templates';
import { getWhatsAppLink } from '../config/site';

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return CATEGORIES;
    const query = searchQuery.toLowerCase();
    return CATEGORIES.filter(
      (cat) =>
        cat.name.toLowerCase().includes(query) ||
        cat.shortDescription.toLowerCase().includes(query) ||
        cat.suitableBusinesses.some((b) => b.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-showroom-bg text-showroom-text">

      {/* Editorial Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 border-b border-showroom-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-showroom-surface border border-showroom-border rounded-full text-xs font-semibold text-showroom-accent tracking-wide uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Interactive Website Showroom
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-medium text-showroom-text tracking-tight leading-[1.08] mb-8">
              Choose your business. <br />
              <span className="italic font-normal text-showroom-accent">See what your website could look like.</span>
            </h1>

            <p className="text-lg sm:text-xl text-showroom-muted leading-relaxed max-w-2xl font-light mb-10">
              A curated collection of bespoke, production-ready website concepts tailored for distinct industries. Explore high-converting designs, realistic interactive components, and request a custom build for your brand.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#categories"
                className="px-8 py-4 bg-showroom-accent text-white text-base font-medium rounded-sm hover:bg-showroom-accentHover transition-all shadow-md inline-flex items-center justify-center gap-2 group"
              >
                Explore Business Categories
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <Link
                to="/templates"
                className="px-8 py-4 bg-showroom-surface border border-showroom-border text-showroom-text text-base font-medium rounded-sm hover:bg-showroom-border transition-colors inline-flex items-center justify-center gap-2"
              >
                View All Templates
              </Link>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-emerald-50 text-emerald-900 border border-emerald-200 text-base font-medium rounded-sm hover:bg-emerald-100 transition-colors inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-emerald-700" />
                WhatsApp Josh
              </a>
            </div>

            {/* Micro reassurance badges */}
            <div className="mt-12 pt-8 border-t border-showroom-border/60 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-showroom-muted font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-showroom-accent" />
                <span>16 Business Categories Supported</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-showroom-accent" />
                <span>Direct Link Shareable to Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-showroom-accent" />
                <span>Custom Domain & Brand Integration</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Category Finder / Interactive Selector */}
      <section id="categories" className="py-20 bg-showroom-bg border-b border-showroom-border scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-showroom-muted block mb-2">
                Step 1: Select Industry
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-showroom-text">
                What kind of business do you run?
              </h2>
            </div>

            {/* Category Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-showroom-muted" />
              <input
                type="text"
                placeholder="Search categories (e.g. restaurant, spa, real estate)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-showroom-border rounded-sm text-sm text-showroom-text placeholder:text-showroom-muted/70 focus:outline-none focus:border-showroom-accent focus:ring-1 focus:ring-showroom-accent transition-all"
              />
            </div>
          </div>

          {/* Business Category Cards Grid */}
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12 bg-showroom-surface rounded border border-showroom-border">
              <p className="text-showroom-muted text-sm">No business category matching "{searchQuery}".</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-3 text-xs font-semibold text-showroom-accent underline"
              >
                Clear Search Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/${category.slug}`}
                  className="group bg-white border border-showroom-border hover:border-showroom-accent transition-all duration-300 rounded-sm overflow-hidden flex flex-col justify-between hover:shadow-md"
                >
                  <div className="relative aspect-[16/10] bg-showroom-surface overflow-hidden">
                    <img
                      src={category.previewImage}
                      alt={category.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                    <span className="absolute bottom-3 left-3 text-xs font-medium text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded">
                      {category.suitableBusinesses.slice(0, 2).join(' • ')}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-serif font-medium text-showroom-text group-hover:text-showroom-accent transition-colors mb-2">
                        {category.name}
                      </h3>
                      <p className="text-xs text-showroom-muted line-clamp-2 leading-relaxed mb-4">
                        {category.shortDescription}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-showroom-border/60 flex items-center justify-between text-xs font-semibold text-showroom-accent">
                      <span>Explore Demos</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Featured Demos Spotlight */}
      <section className="py-20 bg-showroom-surface border-b border-showroom-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-showroom-muted block mb-2">
                Live Previews
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-showroom-text">
                Featured Industry Concepts
              </h2>
            </div>
            <Link
              to="/templates"
              className="text-sm font-semibold text-showroom-accent hover:underline flex items-center gap-1"
            >
              View all 16 template demos →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEMPLATES.slice(0, 3).map((template) => (
              <div
                key={template.id}
                className="bg-white border border-showroom-border rounded-sm overflow-hidden flex flex-col justify-between group hover:border-showroom-accent transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-showroom-surface">
                  <img
                    src={template.previewImage}
                    alt={template.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-showroom-accent text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded">
                    {template.categoryName}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-serif font-medium text-showroom-text mb-1">
                      {template.demoBusinessName}
                    </h3>
                    <p className="text-xs text-showroom-accent font-medium italic mb-3">
                      "{template.tagline}"
                    </p>
                    <p className="text-xs text-showroom-muted leading-relaxed mb-4">
                      {template.description}
                    </p>

                    <div className="space-y-1.5 mb-6">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-showroom-muted block">
                        Included Features:
                      </span>
                      <ul className="text-xs text-showroom-text space-y-1">
                        {template.features.slice(0, 3).map((feat, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-showroom-accent"></span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-showroom-border flex items-center justify-between gap-3">
                    <Link
                      to={`/demo/${template.slug}`}
                      className="flex-1 px-4 py-2 bg-showroom-accent text-white text-xs font-semibold rounded-sm text-center hover:bg-showroom-accentHover transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>View Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      to={`/request?template=${template.slug}`}
                      className="px-4 py-2 bg-showroom-surface border border-showroom-border text-showroom-text text-xs font-semibold rounded-sm hover:bg-showroom-border transition-colors"
                    >
                      Request Style
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-showroom-bg border-b border-showroom-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-showroom-muted block mb-2">
              The Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-showroom-text mb-4">
              How JoshSites Works
            </h2>
            <p className="text-sm text-showroom-muted">
              Simple, transparent exploration designed to show exact client capabilities before writing code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white border border-showroom-border rounded-sm relative">
              <span className="font-serif text-5xl font-bold text-showroom-border/80 absolute top-4 right-6">
                01
              </span>
              <h3 className="text-xl font-serif font-medium text-showroom-text mb-3 pt-4">
                Choose Your Business
              </h3>
              <p className="text-xs text-showroom-muted leading-relaxed">
                Select your industry category or navigate directly via a category URL share link sent by your developer.
              </p>
            </div>

            <div className="p-8 bg-white border border-showroom-border rounded-sm relative">
              <span className="font-serif text-5xl font-bold text-showroom-border/80 absolute top-4 right-6">
                02
              </span>
              <h3 className="text-xl font-serif font-medium text-showroom-text mb-3 pt-4">
                Explore Website Concepts
              </h3>
              <p className="text-xs text-showroom-muted leading-relaxed">
                Interact with live, responsive website demos with realistic menus, services, galleries, and inquiry forms.
              </p>
            </div>

            <div className="p-8 bg-white border border-showroom-border rounded-sm relative">
              <span className="font-serif text-5xl font-bold text-showroom-border/80 absolute top-4 right-6">
                03
              </span>
              <h3 className="text-xl font-serif font-medium text-showroom-text mb-3 pt-4">
                Request Your Custom Version
              </h3>
              <p className="text-xs text-showroom-muted leading-relaxed">
                Submit your business details or discuss via WhatsApp to get a customized version tailored with your brand identity.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Built Around Your Business Banner */}
      <section className="py-20 bg-showroom-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                Tailored Craftsmanship
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-medium leading-tight">
                Built around your business, tailored to your clients.
              </h2>
              <p className="text-sm text-gray-200 leading-relaxed font-light">
                Every website concept in this showroom is a foundation. When you request a website build, your custom platform is customized with your logo, brand colors, commercial photography, menu items, pricing, and messaging.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                  <span>Custom Logo & Typography</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                  <span>WhatsApp & Direct Booking</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                  <span>Fast Mobile Loading Speed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                  <span>SEO & Domain Setup</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 p-8 rounded-sm backdrop-blur-sm border border-white/20 space-y-6">
              <h3 className="text-2xl font-serif font-medium">Ready to build yours?</h3>
              <p className="text-xs text-gray-200 leading-relaxed">
                Send your details to start a conversation or request a direct proposal.
              </p>

              <div className="space-y-3 pt-2">
                <Link
                  to="/request"
                  className="block w-full py-3.5 bg-white text-showroom-accent font-medium text-center text-sm rounded-sm hover:bg-gray-100 transition-colors shadow-sm"
                >
                  Submit Website Request Form
                </Link>

                <a
                  href={getWhatsAppLink("Hello Josh! I'm ready to discuss a custom website build for my business.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-center text-sm rounded-sm transition-colors border border-emerald-600 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat Directly on WhatsApp
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
