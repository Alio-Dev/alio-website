import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import LanguageSwitcher from './LanguageSwitcher';
import ContactModal from './ContactModal';
import Footer from './Footer';
import { Button } from './ui/Button';
import { ThemeToggle } from './ui/ThemeToggle';
import { cn } from '../lib/cn';

interface LayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showBackButton = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  const goToSection = (sectionId: string) => {
    // Sections live on the homepage; navigate there with a hash if elsewhere.
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleContactClick = () => {
    if (location.pathname === '/') {
      const contactSection = document.getElementById('contact');
      if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
      else setIsContactModalOpen(true);
    } else {
      setIsContactModalOpen(true);
    }
    setIsMenuOpen(false);
  };

  const linkCls =
    'rounded-md px-3 py-2 text-body-s font-medium text-secondary transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus';

  return (
    <div className="min-h-screen bg-bg font-sans text-primary">
      <nav className="fixed inset-x-0 top-0 z-sticky border-b border-border-subtle bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-container items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <Link to="/" className="flex items-center gap-2 text-secondary transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-md">
                <ArrowLeft size={20} />
                <span className="hidden sm:inline text-body-s">{t.nav.back}</span>
              </Link>
            )}
            <Link to="/" className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-md">
              <img src="/Alio.svg" alt="Alio Analytics" className="h-8 w-auto" />
              <span className="hidden font-display text-h6 text-primary sm:inline">Alio Analytics</span>
            </Link>
          </div>

          {/* Desktop */}
          <div className="hidden items-center gap-2 md:flex">
            <Link to="/" className={linkCls}>{t.nav.home}</Link>
            <button onClick={() => goToSection('services')} className={linkCls}>{t.nav.services}</button>
            <button onClick={() => goToSection('solutions')} className={linkCls}>{t.nav.solutions}</button>
            <button onClick={() => goToSection('about')} className={linkCls}>{t.nav.about}</button>
            <div className="mx-1 flex items-center gap-1">
              <LanguageSwitcher textColorClass="text-secondary hover:text-brand" />
              <ThemeToggle className="text-secondary hover:bg-bg-subtle hover:text-primary" />
            </div>
            <Button size="sm" onClick={handleContactClick}>{t.nav.contact}</Button>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-1 md:hidden">
            <LanguageSwitcher textColorClass="text-secondary" />
            <ThemeToggle className="text-secondary hover:bg-bg-subtle" />
            <button
              onClick={() => setIsMenuOpen((o) => !o)}
              className="rounded-md p-2 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t border-border-subtle bg-bg md:hidden">
            <div className="space-y-1 px-3 py-3">
              <Link to="/" className={cn(linkCls, 'block w-full text-left')}>{t.nav.home}</Link>
              <button onClick={() => goToSection('services')} className={cn(linkCls, 'block w-full text-left')}>{t.nav.services}</button>
              <button onClick={() => goToSection('solutions')} className={cn(linkCls, 'block w-full text-left')}>{t.nav.solutions}</button>
              <button onClick={() => goToSection('about')} className={cn(linkCls, 'block w-full text-left')}>{t.nav.about}</button>
              <Button fullWidth onClick={handleContactClick} className="mt-2">{t.nav.contact}</Button>
            </div>
          </div>
        )}
      </nav>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
