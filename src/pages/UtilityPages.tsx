import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, FileText } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export const PrivacyPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Privacy Policy | JoshSites Showroom';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-showroom-bg text-showroom-text py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border border-showroom-border p-8 sm:p-12 rounded-sm shadow-sm">

        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-showroom-accent hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Showroom Home
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-showroom-surface border border-showroom-border flex items-center justify-center text-showroom-accent">
            <Shield className="w-4 h-4" />
          </div>
          <h1 className="text-3xl font-serif font-medium">Privacy Policy</h1>
        </div>

        <p className="text-xs text-showroom-muted mb-8">
          Last Updated: October 2024 • {SITE_CONFIG.name}
        </p>

        <div className="space-y-6 text-xs text-showroom-text leading-relaxed">
          <section>
            <h2 className="text-sm font-bold text-showroom-text uppercase tracking-wider mb-2">1. Overview</h2>
            <p className="text-showroom-muted">
              {SITE_CONFIG.name} operates as an interactive digital website showroom showcasing website design concepts for business clients. We value your privacy and only collect information necessary to discuss custom website builds and project inquiries.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-showroom-text uppercase tracking-wider mb-2">2. Information We Collect</h2>
            <p className="text-showroom-muted">
              When you submit a website request form or contact us via WhatsApp, we may collect your name, business name, phone/WhatsApp number, email address, social media links, and project requirements.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-showroom-text uppercase tracking-wider mb-2">3. How We Use Your Information</h2>
            <p className="text-showroom-muted">
              Your information is solely used to respond to your inquiry, provide website project estimates, prepare design proposals, and communicate regarding custom website development services. We do not sell or trade your data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-showroom-text uppercase tracking-wider mb-2">4. Fictional Showcase Data</h2>
            <p className="text-showroom-muted">
              All client websites in this showroom (e.g., Lumé Wellness, Savoré, NOIRÉ, Aurelia Estates) are fictional demo concepts created to demonstrate industry-specific website design capabilities. Any resemblance to existing business entities is coincidental.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-showroom-text uppercase tracking-wider mb-2">5. Contact Us</h2>
            <p className="text-showroom-muted">
              For privacy questions or data deletion requests, contact Josh at{' '}
              <a href={`mailto:${SITE_CONFIG.developer.email}`} className="text-showroom-accent font-semibold underline">
                {SITE_CONFIG.developer.email}
              </a>{' '}
              or via WhatsApp.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Terms of Service | JoshSites Showroom';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-showroom-bg text-showroom-text py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border border-showroom-border p-8 sm:p-12 rounded-sm shadow-sm">

        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-showroom-accent hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Showroom Home
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-showroom-surface border border-showroom-border flex items-center justify-center text-showroom-accent">
            <FileText className="w-4 h-4" />
          </div>
          <h1 className="text-3xl font-serif font-medium">Terms of Service</h1>
        </div>

        <p className="text-xs text-showroom-muted mb-8">
          Last Updated: October 2024 • {SITE_CONFIG.name}
        </p>

        <div className="space-y-6 text-xs text-showroom-text leading-relaxed">
          <section>
            <h2 className="text-sm font-bold text-showroom-text uppercase tracking-wider mb-2">1. Showroom Demonstration</h2>
            <p className="text-showroom-muted">
              {SITE_CONFIG.name} is an interactive showroom platform designed for website prospects to explore website design and structure possibilities. The demo websites presented on this platform are demonstration concepts and do not constitute direct off-the-shelf software purchases.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-showroom-text uppercase tracking-wider mb-2">2. Custom Website Services</h2>
            <p className="text-showroom-muted">
              When a business prospect requests a website inspired by a template, a formal proposal and agreement will be provided detailing project scope, deliverables, timeline, domain registration, and hosting setup.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-showroom-text uppercase tracking-wider mb-2">3. Intellectual Property</h2>
            <p className="text-showroom-muted">
              The layouts, component architectures, and visual branding in this showroom remain the property of {SITE_CONFIG.developer.agency}. Custom client builds receive appropriate license rights for their brand materials and customized site source code upon project completion.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-showroom-text uppercase tracking-wider mb-2">4. WhatsApp Inquiries</h2>
            <p className="text-showroom-muted">
              Direct WhatsApp links redirect to official communication channels with developer Josh. No contract is created simply by submitting an initial inquiry or starting a WhatsApp conversation.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
};

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Page Not Found | JoshSites';
  }, []);

  return (
    <div className="min-h-[70vh] bg-showroom-bg flex items-center justify-center p-6 text-showroom-text">
      <div className="max-w-md w-full bg-white border border-showroom-border p-8 rounded-sm text-center shadow-sm">
        <div className="w-12 h-12 bg-showroom-surface border border-showroom-border text-showroom-accent rounded-full flex items-center justify-center mx-auto mb-4 font-serif text-xl font-bold">
          404
        </div>
        <h1 className="text-2xl font-serif font-medium mb-2">Page Not Found</h1>
        <p className="text-xs text-showroom-muted mb-6">
          The requested showroom route or category URL does not exist or has been moved.
        </p>

        <div className="flex flex-col gap-2">
          <Link
            to="/"
            className="w-full py-2.5 bg-showroom-accent text-white text-xs font-semibold rounded-sm hover:bg-showroom-accentHover transition-colors"
          >
            Go to Showroom Homepage
          </Link>
          <Link
            to="/templates"
            className="w-full py-2.5 bg-showroom-surface border border-showroom-border text-showroom-text text-xs font-semibold rounded-sm hover:bg-showroom-border transition-colors"
          >
            Browse All Website Templates
          </Link>
        </div>
      </div>
    </div>
  );
};
