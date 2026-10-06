import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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

        {/* Demo Preview View (Full Screen Viewport Switcher) */}
        <Route path="/demo/:templateSlug" element={<DemoPreviewPage />} />

        {/* Legal & Utility */}
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />

        {/* Direct Shareable Category Routes */}
        <Route path="/spa" element={<CategoryPage categorySlug="spa" />} />
        <Route path="/beauty" element={<CategoryPage categorySlug="beauty" />} />
        <Route path="/restaurant" element={<CategoryPage categorySlug="restaurant" />} />
        <Route path="/fashion" element={<CategoryPage categorySlug="fashion" />} />
        <Route path="/footwear" element={<CategoryPage categorySlug="footwear" />} />
        <Route path="/accessories" element={<CategoryPage categorySlug="accessories" />} />
        <Route path="/interior" element={<CategoryPage categorySlug="interior" />} />
        <Route path="/real-estate" element={<CategoryPage categorySlug="real-estate" />} />
        <Route path="/creative" element={<CategoryPage categorySlug="creative" />} />
        <Route path="/fitness" element={<CategoryPage categorySlug="fitness" />} />
        <Route path="/events" element={<CategoryPage categorySlug="events" />} />
        <Route path="/bakery" element={<CategoryPage categorySlug="bakery" />} />
        <Route path="/beauty-products" element={<CategoryPage categorySlug="beauty-products" />} />
        <Route path="/general-store" element={<CategoryPage categorySlug="general-store" />} />
        <Route path="/home-services" element={<CategoryPage categorySlug="home-services" />} />
        <Route path="/education" element={<CategoryPage categorySlug="education" />} />

        {/* Dynamic Category Fallback Route */}
        <Route path="/:categorySlug" element={<CategoryPage />} />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ShowroomLayout>
  );
};

export default App;
