import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { getWhatsAppLink, SITE_CONFIG } from '../config/site';
import { CATEGORIES } from '../data/categories';

export const ShowroomFooter: React.FC = () => {
  return (
    <footer className="bg-showroom-surface border-t border-showroom-border text-showroom-text mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-showroom-accent text-white flex items-center justify-center font-serif text-lg font-bold rounded-sm">
                J
              </div>
              <span className="font-serif text-xl font-bold text-showroom-text tracking-tight">
                {SITE_CONFIG.name}
              </span>
            </div>
            <p className="text-sm text-showroom-muted leading-relaxed">
              Interactive website demo showroom. Send prospects direct links tailored specifically to their industry.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded border border-emerald-200 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp Direct: {SITE_CONFIG.developer.whatsappDisplay}
              </a>
              <Link
                to="/request"
                className="inline-flex items-center gap-1 text-xs font-semibold text-showroom-accent hover:underline"
              >
                Request Custom Website Build
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Business Categories Grid Quicklinks */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-showroom-muted">
              Business Categories
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-sm">
              {CATEGORIES.slice(0, 12).map((cat) => (
                <Link
                  key={cat.id}
                  to={`/${cat.slug}`}
                  className="text-showroom-muted hover:text-showroom-accent transition-colors py-0.5 text-xs font-medium"
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                to="/templates"
                className="text-showroom-accent font-semibold hover:underline py-0.5 text-xs"
              >
                View all 16 categories →
              </Link>
            </div>
          </div>

          {/* Agency Details */}
          <div className="space-y-3 text-xs text-showroom-muted">
            <h4 className="text-xs font-bold uppercase tracking-widest text-showroom-text">
              Agency & Developer
            </h4>
            <p className="leading-relaxed">
              Crafted by <strong className="text-showroom-text">{SITE_CONFIG.developer.agency}</strong>. Building bespoke web applications, custom digital storefronts, and brand platforms.
            </p>
            <div className="pt-1 space-y-1">
              <div>Email: <a href={`mailto:${SITE_CONFIG.developer.email}`} className="text-showroom-text underline">{SITE_CONFIG.developer.email}</a></div>
              <div>WhatsApp: <a href={getWhatsAppLink()} className="text-showroom-text underline">{SITE_CONFIG.developer.whatsappDisplay}</a></div>
              <div className="text-emerald-700 font-medium pt-1">● {SITE_CONFIG.developer.availability}</div>
            </div>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="mt-12 pt-8 border-t border-showroom-border/60 flex flex-col sm:flex-row items-center justify-between text-xs text-showroom-muted gap-4">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. All demo concepts created for showcase purposes.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-showroom-text transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-showroom-text transition-colors">
              Terms of Service
            </Link>
            <Link to="/request" className="hover:text-showroom-text transition-colors">
              Website Request
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
