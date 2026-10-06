import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Smartphone, Tablet, Monitor, ArrowLeft, MessageCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { getTemplateBySlug } from '../data/templates';
import { getWhatsAppLink } from '../config/site';
import {
  RestaurantDemo,
  SpaDemo,
  FashionDemo,
  RealEstateDemo,
  FitnessDemo,
  InteriorDemo,
  BakeryDemo,
  GenericDemo
} from '../components/DemoWebsites';

export const DemoPreviewPage: React.FC = () => {
  const { templateSlug, page } = useParams<{ templateSlug: string; page?: string }>();
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const template = templateSlug ? getTemplateBySlug(templateSlug) : undefined;

  useEffect(() => {
    if (template) {
      document.title = `${template.demoBusinessName} - Interactive Demo Preview | JoshSites`;
    } else {
      document.title = 'Demo Preview | JoshSites';
    }
    window.scrollTo(0, 0);
  }, [template]);

  if (!template) {
    return (
      <div className="min-h-screen bg-showroom-bg flex items-center justify-center p-6 text-showroom-text">
        <div className="max-w-md text-center bg-white p-8 border border-showroom-border rounded-sm shadow-sm">
          <h2 className="text-2xl font-serif font-medium mb-2">Demo Template Not Found</h2>
          <p className="text-xs text-showroom-muted mb-6">
            The requested template demo "{templateSlug}" could not be found.
          </p>
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-showroom-accent text-white text-xs font-semibold rounded-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Templates Catalog
          </Link>
        </div>
      </div>
    );
  }

  // Helper to render category-specific component
  const renderDemoComponent = () => {
    const props = {
      businessName: template.demoBusinessName,
      tagline: template.tagline,
      categorySlug: template.categorySlug,
      templateSlug: template.slug,
      activePage: page || 'home'
    };

    switch (template.categorySlug) {
      case 'restaurant':
        return <RestaurantDemo {...props} />;
      case 'spa':
      case 'beauty':
      case 'beauty-products':
        return <SpaDemo {...props} />;
      case 'fashion':
      case 'footwear':
      case 'accessories':
      case 'general-store':
        return <FashionDemo {...props} />;
      case 'real-estate':
        return <RealEstateDemo {...props} />;
      case 'fitness':
        return <FitnessDemo {...props} />;
      case 'interior':
      case 'creative':
        return <InteriorDemo {...props} />;
      case 'bakery':
      case 'events':
        return <BakeryDemo {...props} />;
      default:
        return <GenericDemo {...props} />;
    }
  };

  const getFrameWidthClass = () => {
    switch (viewportMode) {
      case 'mobile':
        return 'max-w-[390px] border-[10px] border-showroom-borderDark rounded-[32px] shadow-2xl my-6';
      case 'tablet':
        return 'max-w-[768px] border-[8px] border-showroom-borderDark rounded-[16px] shadow-xl my-6';
      default:
        return 'w-full shadow-sm';
    }
  };

  return (
    <div className="min-h-screen bg-[#222220] flex flex-col font-sans">

      {/* Top Showroom Navigation Header Bar */}
      <header className="bg-showroom-text text-white border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0 z-50">

        {/* Left: Back & Badge */}
        <div className="flex items-center gap-4">
          <Link
            to={`/${template.categorySlug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to {template.categoryName}</span>
          </Link>

          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 bg-white/10 rounded text-[11px] font-medium text-emerald-300 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Website Concept by JoshSites</span>
          </div>
        </div>

        {/* Center: Viewport Switcher */}
        <div className="flex items-center gap-1 bg-white/10 p-1 rounded-sm border border-white/10">
          <button
            onClick={() => setViewportMode('desktop')}
            className={`p-1.5 rounded text-xs transition-colors ${
              viewportMode === 'desktop' ? 'bg-white text-showroom-text' : 'text-gray-300 hover:text-white'
            }`}
            title="Desktop View"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewportMode('tablet')}
            className={`p-1.5 rounded text-xs transition-colors ${
              viewportMode === 'tablet' ? 'bg-white text-showroom-text' : 'text-gray-300 hover:text-white'
            }`}
            title="Tablet View"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewportMode('mobile')}
            className={`p-1.5 rounded text-xs transition-colors ${
              viewportMode === 'mobile' ? 'bg-white text-showroom-text' : 'text-gray-300 hover:text-white'
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Convert CTAs */}
        <div className="flex items-center gap-3">
          <a
            href={getWhatsAppLink(`Hello Josh! I am previewing the ${template.demoBusinessName} (${template.name}) demo website and I'd like to build a custom version for my business.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp Josh
          </a>

          <Link
            to={`/request?template=${template.slug}&category=${template.categorySlug}`}
            className="px-4 py-1.5 bg-white text-showroom-text hover:bg-gray-100 text-xs font-semibold rounded transition-colors inline-flex items-center gap-1"
          >
            Request This Style
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </header>

      {/* Main Demo Container Wrapper */}
      <main className="flex-1 bg-[#1A1A18] overflow-y-auto flex justify-center items-start p-0 sm:p-4">
        <div className={`transition-all duration-300 bg-white overflow-hidden ${getFrameWidthClass()}`}>
          {/* Subtle Banner Bar inside Demo View */}
          <div className="bg-showroom-surface text-showroom-text px-4 py-2 text-[11px] border-b border-showroom-border flex items-center justify-between font-mono">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-showroom-accent" />
              Viewing live demo concept: <strong>{template.demoBusinessName}</strong>
            </span>
            <span className="text-showroom-muted hidden sm:inline">
              Style: {template.style}
            </span>
          </div>

          {/* Render Actual Industry Component */}
          <div className="min-h-[80vh]">
            {renderDemoComponent()}
          </div>
        </div>
      </main>

      {/* Floating Mobile WhatsApp CTA */}
      <div className="sm:hidden fixed bottom-4 right-4 z-50">
        <a
          href={getWhatsAppLink(`Hello Josh! I am previewing ${template.demoBusinessName} website concept.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-emerald-700 text-white rounded-full shadow-lg flex items-center gap-2 text-xs font-bold"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
      </div>

    </div>
  );
};
