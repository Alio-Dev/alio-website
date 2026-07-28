import React, { useEffect, useState } from 'react';
import type { IconType } from 'react-icons';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaLinkedinIn, FaFacebookF, FaXTwitter, FaYoutube, FaAws, FaMicrosoft } from 'react-icons/fa6';
import { useLanguage } from '../hooks/useLanguage';
import { getSiteSettings } from '../lib/cms/api';
import type { SiteSettings } from '../lib/cms/types';

// Brand/social glyphs come from react-icons (FontAwesome brand set) — one
// maintained, tree-shakeable source that carries the marks lucide/simple-icons
// dropped (LinkedIn, X, AWS, Microsoft). Icon components stay code-defined;
// only the href + which ones to show come from /gestao (alio_site_settings).
const SOCIAL_ICONS: Record<string, IconType> = {
  LinkedIn: FaLinkedinIn,
  Facebook: FaFacebookF,
  X: FaXTwitter,
  YouTube: FaYoutube,
};

const FALLBACK_SETTINGS = {
  phone: '+244 923 710 906',
  email: 'info@alio.ao',
  address: 'Urbanização Nova Vida, Rua 49, Luanda, Angola',
  social_links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/alioanalytics/' },
    { label: 'Facebook', href: 'https://www.facebook.com/alioanalytics' },
    { label: 'X', href: 'https://twitter.com/alioanalytics' },
    { label: 'YouTube', href: 'https://www.youtube.com/@alioanalytics' },
  ],
};

const Footer: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const [settings, setSettings] = useState<Pick<SiteSettings, 'phone' | 'email' | 'address' | 'social_links'>>(
    FALLBACK_SETTINGS,
  );

  useEffect(() => {
    getSiteSettings()
      .then((s) => {
        if (s) setSettings({ phone: s.phone, email: s.email, address: s.address, social_links: s.social_links });
      })
      .catch(() => {
        /* keep FALLBACK_SETTINGS — the footer must never look broken */
      });
  }, []);

  const socialLinks = settings.social_links
    .map((l) => ({ ...l, Icon: SOCIAL_ICONS[l.label] }))
    .filter((l): l is typeof l & { Icon: IconType } => Boolean(l.Icon));

  // Use translation keys for all text
  const services = [
    t.services.digitalSolutions.title,
    t.services.webMobileDev.title,
    t.services.gis.title,
    t.services.design.title,
  ];
  const isPt = currentLanguage === 'pt';
  const aboutLinks = [
    { label: t.nav.about, href: '/about' },
    { label: isPt ? 'Casos de Estudo' : 'Case Studies', href: '/case-studies' },
    { label: 'Blog', href: '/blog' },
    { label: isPt ? 'Carreiras' : 'Careers', href: '/careers' },
    { label: isPt ? 'Política de Privacidade' : 'Privacy Policy', href: '/privacy' },
    { label: isPt ? 'Termos e Condições' : 'Terms & Conditions', href: '/terms' },
  ];

  return (
    <footer className="bg-[#232e43] text-white pt-12 pb-4 mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
          {/* About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src="/Alio.svg" alt="Alio Analytics Logo" className="h-10 w-auto" />
              <span className="text-lg font-bold">alioanalytics</span>
            </div>
            <p className="text-sm text-blue-100 mb-4">
              {t.footer.tagline}
            </p>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors"
                  aria-label={label}
                  title={label}
                >
                  <Icon size={22} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">{t.nav.services}</h4>
            <ul className="space-y-2 text-blue-100">
              {services.map((service, idx) => (
                <li key={idx}>{service}</li>
              ))}
            </ul>
          </div>
          {/* About Us */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">{t.nav.about}</h4>
            <ul className="space-y-2 text-blue-100">
              {aboutLinks.map((link, idx) => (
                <li key={idx}><a href={link.href} className="hover:text-orange-400 transition-colors">{link.label}</a></li>
              ))}
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">{t.nav.contact}</h4>
            <div className="flex items-start mb-4">
              <MapPin className="text-orange-400 mt-1" size={20} />
              <span className="ml-3 text-blue-100 text-sm">{settings.address}</span>
            </div>
            <div className="flex items-center mb-4">
              <Phone className="text-orange-400" size={20} />
              <span className="ml-3 text-blue-100 text-sm">{settings.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="text-orange-400" size={20} />
              <span className="ml-3 text-blue-100 text-sm">{settings.email}</span>
            </div>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-6">
          <p className="text-xs text-blue-100">© 2025 Alio Analytics. {currentLanguage === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}</p>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <span className="text-xs text-blue-100 mr-2">{currentLanguage === 'pt' ? 'Nossos Parceiros:' : 'Our Partners:'}</span>
            {[
              { name: 'AWS', Icon: FaAws },
              { name: 'Microsoft', Icon: FaMicrosoft },
            ].map(({ name, Icon }) => (
              <span key={name} title={name} className="text-white/90 transition-colors hover:text-orange-400">
                <Icon size={26} aria-label={name} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 