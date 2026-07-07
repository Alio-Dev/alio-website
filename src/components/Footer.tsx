import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { siFacebook, siX, siYoutube } from 'simple-icons';
import { useLanguage } from '../hooks/useLanguage';
import { BrandIcon, type SimpleIcon } from './ui/BrandIcon';

// lucide v1 removed brand/social icons; brand glyphs now come from simple-icons.
// LinkedIn was also removed from simple-icons (trademark) — rendered as an
// interim mark; drop in an official LinkedIn SVG in the Phase 3 footer rebuild.
const socialLinks: { label: string; href: string; icon: SimpleIcon | null }[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/alioanalytics/', icon: null },
  { label: 'Facebook', href: 'https://www.facebook.com/alioanalytics', icon: siFacebook },
  { label: 'X', href: 'https://twitter.com/alioanalytics', icon: siX },
  { label: 'YouTube', href: 'https://www.youtube.com/@alioanalytics', icon: siYoutube },
];

const Footer: React.FC = () => {
  const { t, currentLanguage } = useLanguage();

  // Use translation keys for all text
  const services = [
    t.services.digitalSolutions.title,
    t.services.webMobileDev.title,
    t.services.gis.title,
    t.services.design.title,
  ];
  const aboutLinks = [
    { label: t.nav.about, href: '#' },
    { label: t.nav.contact, href: '#' },
    { label: 'Privacy Policy', href: '#' }, // You can add translation keys for these if available
    { label: 'Terms & Conditions', href: '#' },
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
              {socialLinks.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors"
                  aria-label={label}
                  title={label}
                >
                  {icon ? (
                    <BrandIcon icon={icon} size={22} />
                  ) : (
                    <span className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-sm border border-current text-[11px] font-bold leading-none">
                      in
                    </span>
                  )}
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
              <span className="ml-3 text-blue-100 text-sm">Urbanização Nova Vida, Rua 49,<br />Luanda, Angola</span>
            </div>
            <div className="flex items-center mb-4">
              <Phone className="text-orange-400" size={20} />
              <span className="ml-3 text-blue-100 text-sm">+244 923 710 906</span>
            </div>
            <div className="flex items-center">
              <Mail className="text-orange-400" size={20} />
              <span className="ml-3 text-blue-100 text-sm">info@alio.ao</span>
            </div>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-6">
          <p className="text-xs text-blue-100">© 2025 Alio Analytics. {currentLanguage === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}</p>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <span className="text-xs text-blue-100 mr-2">{currentLanguage === 'pt' ? 'Nossos Parceiros:' : 'Our Partners:'}</span>
            {/* Partner marks: AWS & Microsoft are trademarked and were removed
               from simple-icons — swap these badges for official partner logo
               assets during the Phase 3 footer rebuild. */}
            {['AWS', 'Microsoft'].map((partner) => (
              <span
                key={partner}
                className="rounded-md border border-white/25 px-2 py-1 text-xs font-semibold text-white transition-colors hover:border-white/60"
                title={partner}
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 