import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DigitalSolutionsPage from './pages/services/DigitalSolutionsPage';
import WebMobilePage from './pages/services/WebMobilePage';
import ITServicesPage from './pages/services/ITServicesPage';
import AnalyticsPage from './pages/services/AnalyticsPage';
import DesignPage from './pages/services/DesignPage';
import GISPage from './pages/services/GISPage';

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
    </Routes>
  );
}

export default App;