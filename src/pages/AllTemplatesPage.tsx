import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, Filter, ExternalLink, Check } from 'lucide-react';
import { TEMPLATES } from '../data/templates';
import { CATEGORIES } from '../data/categories';

export const AllTemplatesPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string>(categorySlug || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (categorySlug) {
      setSelectedCategory(categorySlug);
    } else {
      setSelectedCategory('all');
    }
  }, [categorySlug]);

  useEffect(() => {
    document.title = 'Browse All Website Templates & Demos | JoshSites';
    window.scrollTo(0, 0);
  }, []);

  const filteredTemplates = TEMPLATES.filter((template) => {
    const matchesCategory =
      selectedCategory === 'all' || template.categorySlug === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.demoBusinessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-showroom-bg text-showroom-text py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-showroom-muted block mb-2">
            Showroom Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-medium text-showroom-text mb-4">
            Website Template Directory
          </h1>
          <p className="text-sm sm:text-base text-showroom-muted leading-relaxed font-light">
            Explore 16 industry-specific website designs. Click any template to launch a live, interactive demo experience.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 sm:p-6 border border-showroom-border rounded-sm mb-10 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">

            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-showroom-muted" />
              <input
                type="text"
                placeholder="Search templates, styles, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-showroom-surface border border-showroom-border rounded-sm text-xs text-showroom-text placeholder:text-showroom-muted focus:outline-none focus:border-showroom-accent focus:ring-1 focus:ring-showroom-accent"
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-showroom-muted">
              <Filter className="w-4 h-4 text-showroom-accent" />
              <span>Showing <strong>{filteredTemplates.length}</strong> of {TEMPLATES.length} templates</span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="pt-2 border-t border-showroom-border flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-sm text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-showroom-accent text-white'
                  : 'bg-showroom-surface text-showroom-text hover:bg-showroom-border'
              }`}
            >
              All Categories ({TEMPLATES.length})
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-sm text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.slug
                    ? 'bg-showroom-accent text-white font-semibold'
                    : 'bg-showroom-surface text-showroom-text hover:bg-showroom-border'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-16 bg-white border border-showroom-border rounded-sm p-8">
            <h3 className="text-lg font-serif font-medium text-showroom-text mb-2">No templates found</h3>
            <p className="text-xs text-showroom-muted mb-4">
              Try clearing your search query or selecting another business category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-showroom-accent text-white text-xs font-semibold rounded-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-white border border-showroom-border rounded-sm overflow-hidden hover:border-showroom-accent transition-all duration-300 flex flex-col justify-between group shadow-sm"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-showroom-surface border-b border-showroom-border">
                  <img
                    src={template.previewImage}
                    alt={template.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-showroom-accent text-white text-[10px] font-semibold px-2.5 py-1 rounded">
                    {template.categoryName}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-serif font-medium text-showroom-text mb-1">
                      {template.demoBusinessName}
                    </h3>
                    <p className="text-xs text-showroom-accent font-medium italic mb-2">
                      "{template.tagline}"
                    </p>
                    <p className="text-xs text-showroom-muted leading-relaxed line-clamp-2">
                      {template.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-showroom-border/60 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-showroom-muted block">
                      Features:
                    </span>
                    <div className="space-y-1 text-[11px] text-showroom-text">
                      {template.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-showroom-accent shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-showroom-border flex items-center gap-2">
                    <Link
                      to={`/demo/${template.slug}`}
                      className="flex-1 py-2.5 bg-showroom-accent text-white text-xs font-semibold rounded-sm text-center hover:bg-showroom-accentHover transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>View Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      to={`/request?template=${template.slug}`}
                      className="px-3 py-2.5 bg-showroom-surface border border-showroom-border text-showroom-text text-xs font-semibold rounded-sm hover:bg-showroom-border transition-colors whitespace-nowrap"
                    >
                      Request Style
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
