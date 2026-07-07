import { Link, Route, Routes } from 'react-router-dom';
import { DesignSystemLayout } from './DesignSystemLayout';
import { Seo } from './components/Seo';
import { Button } from '../../components/ui/Button';
import { BASE } from './nav';

import OverviewPage from './OverviewPage';
import TokensPage from './TokensPage';
import BrandPage from './BrandPage';
import FoundationsPage from './FoundationsPage';
import PatternsPage from './PatternsPage';
import BrandKitPage from './BrandKitPage';
import ComponentsIndexPage from './components-pages/ComponentsIndexPage';
import ButtonsPage from './components-pages/ButtonsPage';
import FormsPage from './components-pages/FormsPage';
import CardsPage from './components-pages/CardsPage';
import NavigationPage from './components-pages/NavigationPage';
import FeedbackPage from './components-pages/FeedbackPage';
import OverlaysPage from './components-pages/OverlaysPage';
import DisplayPage from './components-pages/DisplayPage';
import TablesPage from './components-pages/TablesPage';
import ChartsPage from './components-pages/ChartsPage';
import MapsPage from './components-pages/MapsPage';

function NotFound() {
  return (
    <div className="py-16 text-center">
      <Seo title="Not found" />
      <p className="font-mono text-overline uppercase tracking-[0.08em] text-tertiary">Error 404</p>
      <h1 className="mt-2 font-display text-h2 text-primary">Page not found</h1>
      <p className="mx-auto mt-2 max-w-md text-body-m text-secondary">
        That design-system page doesn't exist. Try the overview or search with ⌘K.
      </p>
      <Link to={BASE} className="mt-6 inline-block">
        <Button>Back to overview</Button>
      </Link>
    </div>
  );
}

/** The full /design-system section, mounted under a splat route in App. */
export default function DesignSystemApp() {
  return (
    <DesignSystemLayout>
      <Routes>
        <Route index element={<OverviewPage />} />
        <Route path="tokens" element={<TokensPage />} />
        <Route path="brand" element={<BrandPage />} />
        <Route path="foundations" element={<FoundationsPage />} />
        <Route path="patterns" element={<PatternsPage />} />
        <Route path="brand-kit" element={<BrandKitPage />} />
        <Route path="components" element={<ComponentsIndexPage />} />
        <Route path="components/buttons" element={<ButtonsPage />} />
        <Route path="components/forms" element={<FormsPage />} />
        <Route path="components/cards" element={<CardsPage />} />
        <Route path="components/navigation" element={<NavigationPage />} />
        <Route path="components/feedback" element={<FeedbackPage />} />
        <Route path="components/overlays" element={<OverlaysPage />} />
        <Route path="components/display" element={<DisplayPage />} />
        <Route path="components/tables" element={<TablesPage />} />
        <Route path="components/charts" element={<ChartsPage />} />
        <Route path="components/maps" element={<MapsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </DesignSystemLayout>
  );
}
