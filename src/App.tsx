import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ShowroomHeader } from './components/ShowroomHeader';
import { ShowroomFooter } from './components/ShowroomFooter';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { AllTemplatesPage } from './pages/AllTemplatesPage';
import { DemoPreviewPage } from './pages/DemoPreviewPage';
import { RequestPage } from './pages/RequestPage';
import { PrivacyPage, TermsPage, NotFoundPage } from './pages/UtilityPages';

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
};

// Client-side redirect component preserving query parameters (e.g. ?name=)
const ShortDemoRedirect: React.FC<{ targetSlug: string }> = ({ targetSlug }) => {
  const location = useLocation();
  return <Navigate to={`/demo/${targetSlug}${location.search}`} replace />;
};

// Layout wrapper for standard Showroom pages
const ShowroomLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isDemoPage = location.pathname.startsWith('/demo/');

  if (isDemoPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ShowroomHeader />
      <main className="flex-1">{children}</main>
      <ShowroomFooter />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ShowroomLayout>
      <ScrollToTop />
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<HomePage />} />

        {/* Templates Directory */}
        <Route path="/templates" element={<AllTemplatesPage />} />
        <Route path="/templates/:categorySlug" element={<AllTemplatesPage />} />

        {/* Website Request Form */}
        <Route path="/request" element={<RequestPage />} />

        {/* Demo Preview View (Full Screen Viewport Switcher & Multi-page Engine) */}
        <Route path="/demo/:templateSlug" element={<DemoPreviewPage />} />
        <Route path="/demo/:templateSlug/:page" element={<DemoPreviewPage />} />
        <Route path="/demo/:templateSlug/product/:productId" element={<DemoPreviewPage />} />

        {/* Short Direct Shareable Demo Routes preserving query strings */}
        <Route path="/restaurant" element={<ShortDemoRedirect targetSlug="savore-bistro" />} />
        <Route path="/bakery" element={<ShortDemoRedirect targetSlug="maison-crumb" />} />
        <Route path="/spa" element={<ShortDemoRedirect targetSlug="lumere-wellness" />} />
        <Route path="/salon" element={<ShortDemoRedirect targetSlug="velours-salon" />} />
        <Route path="/beauty" element={<ShortDemoRedirect targetSlug="velours-salon" />} />
        <Route path="/fitness" element={<ShortDemoRedirect targetSlug="forme-studio" />} />
        <Route path="/realestate" element={<ShortDemoRedirect targetSlug="aurelia-properties" />} />
        <Route path="/real-estate" element={<ShortDemoRedirect targetSlug="aurelia-properties" />} />
        <Route path="/fashion" element={<ShortDemoRedirect targetSlug="noire-atelier" />} />
        <Route path="/sneakers" element={<ShortDemoRedirect targetSlug="sole-craft" />} />
        <Route path="/footwear" element={<ShortDemoRedirect targetSlug="sole-craft" />} />
        <Route path="/accessories" element={<ShortDemoRedirect targetSlug="aurum-goods" />} />
        <Route path="/interior" element={<ShortDemoRedirect targetSlug="atelier-north" />} />
        <Route path="/creative" element={<ShortDemoRedirect targetSlug="studio-kai" />} />
        <Route path="/events" element={<ShortDemoRedirect targetSlug="verve-events" />} />
        <Route path="/beauty-products" element={<ShortDemoRedirect targetSlug="botanique-lab" />} />
        <Route path="/store" element={<ShortDemoRedirect targetSlug="habitat-store" />} />
        <Route path="/general-store" element={<ShortDemoRedirect targetSlug="habitat-store" />} />
        <Route path="/home-services" element={<ShortDemoRedirect targetSlug="apex-services" />} />
        <Route path="/education" element={<ShortDemoRedirect targetSlug="cortex-academy" />} />

        {/* Legal & Utility */}
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />

        {/* Category Overview Page Routes */}
        <Route path="/category/:categorySlug" element={<CategoryPage />} />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ShowroomLayout>
  );
};

export default App;
