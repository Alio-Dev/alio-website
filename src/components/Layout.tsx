import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import LanguageSwitcher from './LanguageSwitcher';
import ContactModal from './ContactModal';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showBackButton = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleContactClick = () => {
    if (location.pathname === '/') {
      // If on homepage, try to scroll to contact section first
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        // If contact section not found, open modal
        setIsContactModalOpen(true);
      }
    } else {
      // If on other pages, open modal directly
      setIsContactModalOpen(true);
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              {showBackButton && (
                <Link 
                  to="/" 
                  className="flex items-center text-gray-600 hover:text-blue-700 transition-colors"
                >
                  <ArrowLeft size={20} className="mr-2" />
                  <span className="hidden sm:inline">{t.nav.back}</span>
                </Link>
              )}
              <Link to="/" className="flex items-center space-x-3">
                <img 
                  src="/Alio.svg" 
                  alt="Alio Analytics Logo" 
                  className="h-8 w-auto"
                />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-teal-600 bg-clip-text text-transparent hidden sm:inline">
                  Alio Analytics
                </span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-baseline space-x-8">
                <Link to="/" className="text-gray-900 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors">
                  {t.nav.home}
                </Link>
                <button onClick={() => scrollToSection('services')} className="text-gray-900 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors">
                  {t.nav.services}
                </button>
                <button onClick={() => scrollToSection('solutions')} className="text-gray-900 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors">
                  {t.nav.solutions}
                </button>
                <button onClick={() => scrollToSection('about')} className="text-gray-900 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors">
                  {t.nav.about}
                </button>
                <button onClick={handleContactClick} className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
                  {t.nav.contact}
                </button>
              </div>
              <LanguageSwitcher />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <LanguageSwitcher />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-900 hover:text-blue-700 p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t animate-slide-down">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-700 w-full text-left">
                {t.nav.home}
              </Link>
              <button onClick={() => scrollToSection('services')} className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-700 w-full text-left">
                {t.nav.services}
              </button>
              <button onClick={() => scrollToSection('solutions')} className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-700 w-full text-left">
                {t.nav.solutions}
              </button>
              <button onClick={() => scrollToSection('about')} className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-700 w-full text-left">
                {t.nav.about}
              </button>
              <button onClick={handleContactClick} className="block px-3 py-2 text-base font-medium bg-blue-700 text-white rounded-lg mx-3 text-center">
                {t.nav.contact}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;