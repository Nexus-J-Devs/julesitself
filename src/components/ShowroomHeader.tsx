import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, MessageCircle, Send } from 'lucide-react';
import { getWhatsAppLink, SITE_CONFIG, CONTACT } from '../config/site';

export const ShowroomHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isCurrentRoute = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-showroom-bg/90 backdrop-blur-md border-b border-showroom-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-showroom-accent text-white flex items-center justify-center font-serif text-xl font-bold tracking-wider rounded-sm group-hover:bg-showroom-accentHover transition-colors">
              J
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-showroom-text tracking-tight group-hover:text-showroom-accent transition-colors">
                {SITE_CONFIG.name}
              </span>
              <span className="text-[10px] tracking-widest uppercase font-medium text-showroom-muted">
                SHOWROOM
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link
              to="/#categories"
              className={`hover:text-showroom-accent transition-colors ${
                isCurrentRoute('/templates') || location.hash === '#categories'
                  ? 'text-showroom-accent font-semibold'
                  : 'text-showroom-muted'
              }`}
            >
              Categories
            </Link>

            <Link
              to="/templates"
              className={`hover:text-showroom-accent transition-colors ${
                isCurrentRoute('/templates')
                  ? 'text-showroom-accent font-semibold'
                  : 'text-showroom-muted'
              }`}
            >
              Templates
            </Link>

            <Link
              to="/#how-it-works"
              className="text-showroom-muted hover:text-showroom-accent transition-colors"
            >
              How It Works
            </Link>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-showroom-muted hover:text-showroom-accent transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 text-emerald-700" />
              WhatsApp
            </a>

            <a
              href={CONTACT.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-showroom-muted hover:text-showroom-accent transition-colors flex items-center gap-1.5"
            >
              <Send className="w-4 h-4 text-sky-600" />
              Telegram
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              to="/request"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-showroom-accent text-white text-sm font-medium rounded-sm hover:bg-showroom-accentHover transition-all shadow-sm"
            >
              Request a website
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/request"
              className="px-3 py-1.5 bg-showroom-accent text-white text-xs font-medium rounded-sm"
            >
              Request
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-showroom-text hover:text-showroom-accent focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-showroom-bg border-b border-showroom-border px-4 pt-3 pb-6 space-y-4">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-showroom-text hover:text-showroom-accent py-2"
          >
            Showroom Home
          </Link>
          <Link
            to="/templates"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-showroom-text hover:text-showroom-accent py-2"
          >
            Browse All Templates
          </Link>
          <Link
            to="/request"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-showroom-text hover:text-showroom-accent py-2"
          >
            Request Custom Website
          </Link>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-base font-medium text-emerald-800 py-2"
          >
            <MessageCircle className="w-5 h-5 text-emerald-700" />
            WhatsApp ({CONTACT.whatsappDisplay})
          </a>
          <a
            href={CONTACT.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-base font-medium text-sky-800 py-2"
          >
            <Send className="w-5 h-5 text-sky-600" />
            Telegram (@{CONTACT.telegramHandle})
          </a>
          <div className="pt-2 border-t border-showroom-border text-xs text-showroom-muted">
            Direct Link Shareable Demos for Business Clients
          </div>
        </div>
      )}
    </header>
  );
};
