import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DigitalSolutionsPage from './pages/services/DigitalSolutionsPage';
import WebMobilePage from './pages/services/WebMobilePage';
import ITServicesPage from './pages/services/ITServicesPage';
import AnalyticsPage from './pages/services/AnalyticsPage';
import DesignPage from './pages/services/DesignPage';
import GISPage from './pages/services/GISPage';

// The design system is code-split so it never weighs down the marketing site.
const DesignSystemApp = lazy(() => import('./pages/design-system/DesignSystemApp'));

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

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services/digital-solutions" element={<DigitalSolutionsPage />} />
      <Route path="/services/web-mobile" element={<WebMobilePage />} />
      <Route path="/services/it-services" element={<ITServicesPage />} />
      <Route path="/services/analytics" element={<AnalyticsPage />} />
      <Route path="/services/design" element={<DesignPage />} />
      <Route path="/services/gis" element={<GISPage />} />

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
    </Routes>
  );
}

export default App;
