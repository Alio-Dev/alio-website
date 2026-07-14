import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// Vite + React app → use the /react entrypoints (not /next).
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useLanguage } from './hooks/useLanguage';
import HomePage from './pages/HomePage';
import DigitalSolutionsPage from './pages/services/DigitalSolutionsPage';
import WebMobilePage from './pages/services/WebMobilePage';
import ITServicesPage from './pages/services/ITServicesPage';
import AnalyticsPage from './pages/services/AnalyticsPage';
import DesignPage from './pages/services/DesignPage';
import GISPage from './pages/services/GISPage';
import AboutPage from './pages/AboutPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import BlogPage from './pages/BlogPage';
import BlogArticlePage from './pages/BlogArticlePage';
import CareersPage from './pages/CareersPage';
import LegalPage from './pages/LegalPage';
import NotFoundPage from './pages/NotFoundPage';

// The design system is code-split so it never weighs down the marketing site.
const DesignSystemApp = lazy(() => import('./pages/design-system/DesignSystemApp'));
// Client proposal pages are lazy too — each embeds a heavy standalone asset
// via iframe and has no reason to load unless someone visits that exact URL.
const ProposalIframePage = lazy(() => import('./pages/proposals/ProposalIframePage'));

function DesignSystemFallback() {
  return (
    <div className="ds-root flex min-h-screen items-center justify-center bg-bg">
      <span
        className="inline-block h-8 w-8 animate-spin-fast rounded-full border-2 border-neutral-300 border-t-primary-700"
        role="status"
        aria-label="Loading design system"
      />
    </div>
  );
}

function BlankFallback() {
  return <div className="fixed inset-0 bg-bg" />;
}

/** Keep <html lang> in sync with the active language (WCAG 3.1.1). */
function useHtmlLang() {
  const { currentLanguage } = useLanguage();
  useEffect(() => {
    document.documentElement.lang = currentLanguage === 'pt' ? 'pt' : 'en';
  }, [currentLanguage]);
}

function App() {
  useHtmlLang();
  return (
    <>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services/digital-solutions" element={<DigitalSolutionsPage />} />
      <Route path="/services/web-mobile" element={<WebMobilePage />} />
      <Route path="/services/it-services" element={<ITServicesPage />} />
      <Route path="/services/analytics" element={<AnalyticsPage />} />
      <Route path="/services/design" element={<DesignPage />} />
      <Route path="/services/gis" element={<GISPage />} />

      {/* Company & content pages */}
      <Route path="/about" element={<AboutPage />} />
      <Route path="/case-studies" element={<CaseStudiesPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogArticlePage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/privacy" element={<LegalPage kind="privacy" />} />
      <Route path="/terms" element={<LegalPage kind="terms" />} />

      {/* Client proposals — unlisted, direct-link only (noindex, not in sitemap) */}
      <Route
        path="/propostas/sonagas/roleta-digital"
        element={
          <Suspense fallback={<BlankFallback />}>
            <ProposalIframePage
              assetSrc="/propostas/sonagas/roleta-digital.html"
              title="Roleta Digital — Proposta Sonagás · Alio Analytics"
            />
          </Suspense>
        }
      />
      <Route
        path="/propostas/sonagas/rota-do-gas-seguro"
        element={
          <Suspense fallback={<BlankFallback />}>
            <ProposalIframePage
              assetSrc="/propostas/sonagas/rota-do-gas-seguro.html"
              title="Rota do Gás Seguro — Proposta Sonagás · Alio Analytics"
            />
          </Suspense>
        }
      />

      {/* Design system — canonical at /design-system, with /docs as an alias */}
      <Route
        path="/design-system/*"
        element={
          <Suspense fallback={<DesignSystemFallback />}>
            <DesignSystemApp />
          </Suspense>
        }
      />
      <Route path="/docs" element={<Navigate to="/design-system" replace />} />
      <Route path="/docs/*" element={<Navigate to="/design-system" replace />} />

      {/* Catch-all — must stay last */}
      <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
