import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, ExternalLink, MessageCircle, ArrowLeft } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { getTemplatesByCategory } from '../data/templates';
import { getWhatsAppLink } from '../config/site';

interface CategoryPageProps {
  categorySlug?: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categorySlug: propSlug }) => {
  const { categorySlug: paramSlug } = useParams<{ categorySlug: string }>();
  const effectiveSlug = propSlug || paramSlug;

  const category = CATEGORIES.find((c) => c.slug === effectiveSlug);
  const templates = category ? getTemplatesByCategory(category.slug) : [];

  useEffect(() => {
    if (category) {
      document.title = `${category.name} Website Designs | JoshSites Showroom`;
    } else {
      document.title = 'Category Not Found | JoshSites';
    }
    window.scrollTo(0, 0);
  }, [category, effectiveSlug]);

  if (!category) {
    return (
      <div className="min-h-screen bg-showroom-bg flex items-center justify-center p-6">
        <div className="max-w-md text-center bg-white p-8 border border-showroom-border rounded-sm">
          <h2 className="text-2xl font-serif font-medium mb-3">Category Not Found</h2>
          <p className="text-xs text-showroom-muted mb-6">
            We couldn't find a business category matching "{effectiveSlug || ''}".
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-showroom-accent text-white text-xs font-semibold rounded-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Showroom Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-showroom-bg text-showroom-text">

      {/* Category Hero Header */}
      <section className="bg-showroom-surface border-b border-showroom-border py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-6 flex items-center gap-2 text-xs text-showroom-muted font-medium">
            <Link to="/" className="hover:text-showroom-accent">Showroom</Link>
            <span>/</span>
            <span className="text-showroom-text">{category.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-showroom-muted">
                Industry Solution
              </span>
              <h1 className="text-3xl sm:text-5xl font-serif font-medium text-showroom-text leading-tight">
                {category.name} Website Designs
              </h1>
              <p className="text-base text-showroom-muted leading-relaxed max-w-2xl font-light">
                {category.shortDescription}
              </p>

              {/* Suitable businesses chips */}
              <div className="pt-2">
                <span className="text-xs font-semibold text-showroom-muted block mb-2">Suitable for:</span>
                <div className="flex flex-wrap gap-2">
                  {category.suitableBusinesses.map((biz, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white border border-showroom-border rounded-sm text-xs font-medium text-showroom-text"
                    >
                      {biz}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-sm overflow-hidden border border-showroom-border aspect-[16/10] bg-white shadow-sm">
                <img
                  src={category.previewImage}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-sm border border-white/50 text-xs">
                  <span className="font-semibold text-showroom-text">Direct Client Link Shareable URL:</span>
                  <div className="font-mono text-[11px] text-showroom-accent truncate pt-0.5">
                    joshsites.netlify.app/{category.slug}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Available Website Templates in Category */}
      <section className="py-16 border-b border-showroom-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-showroom-muted block mb-1">
              Interactive Demos
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-showroom-text">
              Available {category.name} Concepts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-white border border-showroom-border rounded-sm overflow-hidden hover:border-showroom-accent transition-all duration-300 flex flex-col justify-between group shadow-sm"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-showroom-surface border-b border-showroom-border">
                  <img
                    src={template.previewImage}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-showroom-text text-[11px] font-semibold px-2.5 py-1 rounded border border-showroom-border">
                    Style: {template.style}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
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

                    <div className="space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-showroom-muted block">
                        Key Features Included:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-showroom-text">
                        {template.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-showroom-accent shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-showroom-border flex flex-col sm:flex-row items-center gap-3">
                    <Link
                      to={`/demo/${template.slug}`}
                      className="w-full sm:flex-1 py-3 bg-showroom-accent text-white text-xs font-semibold rounded-sm text-center hover:bg-showroom-accentHover transition-colors flex items-center justify-center gap-2"
                    >
                      <span>View Live Interactive Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      to={`/request?category=${category.slug}&template=${template.slug}`}
                      className="w-full sm:w-auto px-5 py-3 bg-showroom-surface border border-showroom-border text-showroom-text text-xs font-semibold text-center rounded-sm hover:bg-showroom-border transition-colors"
                    >
                      Request This Style
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* What Your Website Can Include (Industry Capabilities) */}
      <section className="py-16 bg-showroom-surface border-b border-showroom-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-showroom-muted block mb-1">
              Industry Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-showroom-text mb-3">
              What your {category.name} website can include
            </h2>
            <p className="text-xs text-showroom-muted">
              Every build is customized specifically for your business operations and sales process.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {category.relevantFeatures.map((feature, idx) => (
              <div key={idx} className="bg-white p-6 border border-showroom-border rounded-sm">
                <div className="w-7 h-7 rounded-full bg-showroom-surface border border-showroom-border text-showroom-accent font-serif font-bold text-xs flex items-center justify-center mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-serif font-medium text-showroom-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-showroom-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Conversion Bar */}
      <section className="py-16 bg-showroom-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-serif font-medium text-showroom-text">
            Want a custom {category.name} website for your business?
          </h2>
          <p className="text-xs sm:text-sm text-showroom-muted max-w-xl mx-auto leading-relaxed">
            We can adapt these layouts with your business name, logo, custom photographs, services, prices, and direct customer inquiry channels.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={`/request?category=${category.slug}`}
              className="w-full sm:w-auto px-8 py-3.5 bg-showroom-accent text-white text-xs font-semibold rounded-sm hover:bg-showroom-accentHover transition-colors inline-flex items-center justify-center gap-2"
            >
              Request Custom Website
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={getWhatsAppLink(`Hello Josh! I explored the ${category.name} category on JoshSites and I would like to discuss building a website for my business.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-700 text-white text-xs font-semibold rounded-sm hover:bg-emerald-800 transition-colors inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Discuss on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
