import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MessageCircle, CheckCircle, ArrowLeft, Send, AlertCircle } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { TEMPLATES } from '../data/templates';
import { getWhatsAppLink, CONTACT } from '../config/site';

export const RequestPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialTemplate = searchParams.get('template') || '';

  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    categorySlug: initialCategory,
    templateSlug: initialTemplate,
    phoneWhatsapp: '',
    email: '',
    currentWebsite: '',
    instagramSocial: '',
    serviceNeeds: ['New Custom Website Build'],
    additionalDetails: '',
    website: '' // Honeypot field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastSubmitTime, setLastSubmitTime] = useState<number | null>(null);
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);

  useEffect(() => {
    document.title = 'Request a Custom Website | JoshSites';
    window.scrollTo(0, 0);
  }, []);

  // Handle 30s throttling cooldown timer
  useEffect(() => {
    if (!lastSubmitTime) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - lastSubmitTime) / 1000);
      const remaining = 30 - elapsed;
      if (remaining <= 0) {
        setCooldownRemaining(0);
        clearInterval(interval);
      } else {
        setCooldownRemaining(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastSubmitTime]);

  const handleNeedsToggle = (need: string) => {
    setFormData((prev) => {
      const exists = prev.serviceNeeds.includes(need);
      if (exists) {
        return { ...prev, serviceNeeds: prev.serviceNeeds.filter((n) => n !== need) };
      } else {
        return { ...prev, serviceNeeds: [...prev.serviceNeeds, need] };
      }
    });
  };

  const selectedCategoryObj = CATEGORIES.find((c) => c.slug === formData.categorySlug);
  const selectedTemplateObj = TEMPLATES.find((t) => t.slug === formData.templateSlug);

  const getWhatsAppSummaryMessage = () => {
    const categoryName = selectedCategoryObj ? selectedCategoryObj.name : formData.categorySlug || 'General Business';
    const templateName = selectedTemplateObj ? selectedTemplateObj.name : formData.templateSlug || 'Not Specified';

    return `Hello Josh!\n\nI am requesting a website for my business:\n- Business Name: ${formData.businessName || 'N/A'}\n- Contact Name: ${formData.name || 'N/A'}\n- Phone/WhatsApp: ${formData.phoneWhatsapp || 'N/A'}\n- Email: ${formData.email || 'N/A'}\n- Industry: ${categoryName}\n- Style Concept: ${templateName}\n- Services Needed: ${formData.serviceNeeds.join(', ')}\n- Notes: ${formData.additionalDetails || 'None'}\n\nLet's discuss building this website!`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client throttling check (30 seconds)
    if (lastSubmitTime && Date.now() - lastSubmitTime < 30000) {
      const remaining = Math.ceil((30000 - (Date.now() - lastSubmitTime)) / 1000);
      setErrorMessage(`Please wait ${remaining} seconds before submitting another request.`);
      return;
    }

    // Validation
    if (!formData.name.trim() || !formData.businessName.trim() || !formData.phoneWhatsapp.trim() || !formData.email.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Business Name, Phone/WhatsApp, and Email).');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const resData = await response.json();

      if (response.ok && resData.ok) {
        setSubmitted(true);
        setLastSubmitTime(Date.now());
        setCooldownRemaining(30);
      } else {
        setErrorMessage(resData.error || 'Unable to submit form at this time. Please use the WhatsApp button below to send your request directly.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMessage('Network connection error. Please send your details directly via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-showroom-bg text-showroom-text py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-showroom-accent hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Showroom Home
        </Link>

        {/* Page Heading */}
        <div className="mb-10 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-showroom-muted block mb-2">
            Get Your Website Built
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-medium text-showroom-text mb-4">
            Request Custom Website
          </h1>
          <p className="text-sm text-showroom-muted leading-relaxed font-light">
            Fill in your business details below to request a tailored version of any showroom concept, or connect directly with Josh on WhatsApp or Telegram.
          </p>
        </div>

        {/* Dual Option Header Card */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-sm p-6 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 block">Fastest Option</span>
            <p className="text-xs text-emerald-800 pt-0.5">Prefer to message immediately on social messaging apps?</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={getWhatsAppLink(formData.businessName ? getWhatsAppSummaryMessage() : "Hello Josh! I'd like to discuss a custom website for my business.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-sm transition-colors inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp ({CONTACT.whatsappDisplay})
            </a>

            <a
              href={CONTACT.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-100 text-xs font-semibold rounded-sm transition-colors inline-flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5 text-sky-600" />
              Message on Telegram
            </a>
          </div>
        </div>

        {/* Request Form Container */}
        <div className="bg-white border border-showroom-border p-6 sm:p-10 rounded-sm shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-serif font-medium text-showroom-text">Request Received!</h2>
                <p className="text-xs text-showroom-muted max-w-md mx-auto leading-relaxed">
                  Request received. I will reply on WhatsApp or Email shortly.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={getWhatsAppLink(getWhatsAppSummaryMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-700 text-white text-xs font-semibold rounded-sm hover:bg-emerald-800 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Continue Request in WhatsApp (Backup)
                </a>

                <button
                  onClick={() => { setSubmitted(false); setErrorMessage(null); }}
                  className="w-full sm:w-auto px-6 py-3 bg-showroom-surface border border-showroom-border text-showroom-text text-xs font-semibold rounded-sm hover:bg-showroom-border transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Inline Error Alert */}
              {errorMessage && (
                <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-sm text-xs space-y-3">
                  <div className="flex items-center gap-2 font-semibold">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                  <div className="pt-1">
                    <a
                      href={getWhatsAppLink(getWhatsAppSummaryMessage())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Send Details via WhatsApp Fallback
                    </a>
                  </div>
                </div>
              )}

              {/* Hidden Honeypot Field */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>

              {/* Section 1: Business Profile */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-showroom-accent border-b border-showroom-border pb-2 mb-4">
                  1. Business Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-showroom-text mb-1">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Johnson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 bg-showroom-surface border border-showroom-border rounded-sm text-xs text-showroom-text focus:outline-none focus:border-showroom-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-showroom-text mb-1">
                      Business Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lumé Spa & Boutique"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full p-2.5 bg-showroom-surface border border-showroom-border rounded-sm text-xs text-showroom-text focus:outline-none focus:border-showroom-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-showroom-text mb-1">
                      Phone / WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +234 812 593 7596"
                      value={formData.phoneWhatsapp}
                      onChange={(e) => setFormData({ ...formData, phoneWhatsapp: e.target.value })}
                      className="w-full p-2.5 bg-showroom-surface border border-showroom-border rounded-sm text-xs text-showroom-text focus:outline-none focus:border-showroom-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-showroom-text mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@lumespa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 bg-showroom-surface border border-showroom-border rounded-sm text-xs text-showroom-text focus:outline-none focus:border-showroom-accent"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Category & Template Choice */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-showroom-accent border-b border-showroom-border pb-2 mb-4">
                  2. Industry Category & Style Selection
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-showroom-text mb-1">
                      Business Industry Category
                    </label>
                    <select
                      value={formData.categorySlug}
                      onChange={(e) => setFormData({ ...formData, categorySlug: e.target.value, templateSlug: '' })}
                      className="w-full p-2.5 bg-showroom-surface border border-showroom-border rounded-sm text-xs text-showroom-text focus:outline-none focus:border-showroom-accent"
                    >
                      <option value="">-- Select Industry --</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.slug}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-showroom-text mb-1">
                      Preferred Template Style Concept (Optional)
                    </label>
                    <select
                      value={formData.templateSlug}
                      onChange={(e) => setFormData({ ...formData, templateSlug: e.target.value })}
                      className="w-full p-2.5 bg-showroom-surface border border-showroom-border rounded-sm text-xs text-showroom-text focus:outline-none focus:border-showroom-accent"
                    >
                      <option value="">-- Select Showroom Template --</option>
                      {TEMPLATES.map((tmpl) => (
                        <option key={tmpl.id} value={tmpl.slug}>
                          {tmpl.demoBusinessName} ({tmpl.categoryName})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Social Links & Current Online Presence */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-showroom-accent border-b border-showroom-border pb-2 mb-4">
                  3. Social Media & Existing Links
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-showroom-text mb-1">
                      Current Website URL (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="e.g. https://mybusiness.com"
                      value={formData.currentWebsite}
                      onChange={(e) => setFormData({ ...formData, currentWebsite: e.target.value })}
                      className="w-full p-2.5 bg-showroom-surface border border-showroom-border rounded-sm text-xs text-showroom-text focus:outline-none focus:border-showroom-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-showroom-text mb-1">
                      Instagram / Social Media Handle (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. @lume_wellness"
                      value={formData.instagramSocial}
                      onChange={(e) => setFormData({ ...formData, instagramSocial: e.target.value })}
                      className="w-full p-2.5 bg-showroom-surface border border-showroom-border rounded-sm text-xs text-showroom-text focus:outline-none focus:border-showroom-accent"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: What do you need? */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-showroom-accent border-b border-showroom-border pb-2 mb-4">
                  4. What do you need for your website?
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {[
                    'New Custom Website Build',
                    'Redesign Existing Website',
                    'WhatsApp Order / Booking Integration',
                    'Domain Name & Hosting Setup',
                    'Custom Photography & Content Support',
                    'E-commerce & Payments Setup'
                  ].map((need, idx) => (
                    <label
                      key={idx}
                      className={`p-3 border rounded-sm flex items-center gap-3 cursor-pointer transition-colors ${
                        formData.serviceNeeds.includes(need)
                          ? 'bg-showroom-accent text-white border-showroom-accent font-semibold'
                          : 'bg-showroom-surface text-showroom-text border-showroom-border hover:border-showroom-accent'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.serviceNeeds.includes(need)}
                        onChange={() => handleNeedsToggle(need)}
                        className="sr-only"
                      />
                      <span className="w-4 h-4 rounded-sm border border-current flex items-center justify-center shrink-0">
                        {formData.serviceNeeds.includes(need) && <CheckCircle className="w-3.5 h-3.5 fill-current" />}
                      </span>
                      <span>{need}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section 5: Additional details */}
              <div>
                <label className="block text-xs font-semibold text-showroom-text mb-1">
                  Additional Details or Specific Requirements
                </label>
                <textarea
                  rows={4}
                  maxLength={1000}
                  placeholder="Tell us about your target audience, special features needed, preferred colors, or timeframe..."
                  value={formData.additionalDetails}
                  onChange={(e) => setFormData({ ...formData, additionalDetails: e.target.value })}
                  className="w-full p-2.5 bg-showroom-surface border border-showroom-border rounded-sm text-xs text-showroom-text focus:outline-none focus:border-showroom-accent"
                ></textarea>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-showroom-border">
                <p className="text-xs text-showroom-muted">
                  {cooldownRemaining > 0
                    ? `Please wait ${cooldownRemaining}s before submitting again.`
                    : 'No commitment required. Josh will send a preliminary proposal.'}
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting || cooldownRemaining > 0}
                  className="w-full sm:w-auto px-8 py-3.5 bg-showroom-accent hover:bg-showroom-accentHover disabled:bg-showroom-muted text-white text-xs font-semibold rounded-sm transition-all shadow-md inline-flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? 'Sending...' : cooldownRemaining > 0 ? `Wait (${cooldownRemaining}s)` : 'Request My Website'}</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
