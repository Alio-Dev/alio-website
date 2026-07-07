import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown, Menu, X, Code, BarChart3, Map, Palette, ArrowRight,
  Phone, Mail, MapPin, CheckCircle, Smartphone, Shield, Settings, Image,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import LanguageSwitcher from '../components/LanguageSwitcher';
import ContactModal from '../components/ContactModal';
import ScreenshotsModal from '../components/ScreenshotsModal';
import Footer from '../components/Footer';
import { Seo } from '../components/Seo';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { cn } from '../lib/cn';

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isScreenshotsModalOpen, setIsScreenshotsModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { t, currentLanguage } = useLanguage();
  const isPt = currentLanguage === 'pt';
  // Alio Analytics was founded in 2022 — years of experience updates on its own.
  const yearsExperience = new Date().getFullYear() - 2022;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const services = [
    { icon: Code, ...t.services.digitalSolutions, link: '/services/digital-solutions' },
    { icon: Smartphone, ...t.services.webMobileDev, link: '/services/web-mobile' },
    { icon: Shield, ...t.services.itServices, link: '/services/it-services' },
    { icon: BarChart3, ...t.services.analytics, link: '/services/analytics' },
    { icon: Palette, ...t.services.design, link: '/services/design' },
    { icon: Map, ...t.services.gis, link: '/services/gis' },
  ];

  const solutions: Array<{
    logo?: string; icon?: LucideIcon; title: string; subtitle: string;
    description: string; features: string[]; status: string; gradient: string; comingSoon: boolean;
  }> = [
    { logo: '/kelesa.webp', ...t.solutions.kelesaKlean, features: t.solutions.kelesaKlean.features.slice(0, 4), gradient: 'from-green-600 to-emerald-700', comingSoon: true },
    { logo: '/okwenda.webp', ...t.solutions.okwenda, features: t.solutions.okwenda.features.slice(0, 4), gradient: 'from-blue-600 to-cyan-700', comingSoon: true },
    { logo: '/Mwenhu.webp', ...t.solutions.mwenhu, features: t.solutions.mwenhu.features.slice(0, 4), gradient: 'from-red-500 to-pink-600', comingSoon: true },
    { icon: Settings, title: t.solutions.customSolutions.title, subtitle: isPt ? 'Desenvolvimento Sob Medida' : 'Bespoke Development', description: t.solutions.customSolutions.description, features: t.solutions.customSolutions.features, status: isPt ? 'Disponível' : 'Available', gradient: 'from-purple-600 to-indigo-700', comingSoon: false },
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };
  const openContactModal = () => setIsContactModalOpen(true);
  const openScreenshotsModal = (name: string) => { setSelectedApp(name); setIsScreenshotsModalOpen(true); };

  const navLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'services', label: t.nav.services },
    { id: 'solutions', label: t.nav.solutions },
    { id: 'about', label: t.nav.about },
  ];

  return (
    <div className="min-h-screen bg-bg font-sans text-primary">
      <Seo
        title={isPt ? 'Soluções Digitais e IT em Angola' : 'Digital & IT Solutions in Angola'}
        description={t.hero.description}
        path="/"
      />
      {/* ---------- Navigation ---------- */}
      <nav
        className={cn(
          'fixed inset-x-0 top-0 z-sticky transition-colors duration-300',
          scrolled ? 'bg-bg/90 backdrop-blur-md shadow-sm border-b border-border-subtle' : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex h-16 max-w-container items-center justify-between px-4 sm:px-6 lg:px-8">
          <button onClick={() => scrollToSection('home')} className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-md" aria-label="Alio Analytics home">
            <img src="/Alio.svg" alt="Alio Analytics" className="h-8 w-auto" />
            <span className={cn('hidden font-display text-h6 sm:inline', scrolled ? 'text-primary' : 'text-white')}>
              Alio Analytics
            </span>
          </button>

          {/* Desktop */}
          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToSection(l.id)}
                className={cn(
                  'rounded-md px-3 py-2 text-body-s font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus',
                  scrolled ? 'text-secondary hover:text-brand' : 'text-white/90 hover:text-white',
                )}
              >
                {l.label}
              </button>
            ))}
            <div className="mx-1 flex items-center gap-1">
              <LanguageSwitcher textColorClass={scrolled ? 'text-secondary hover:text-brand' : 'text-white/90 hover:text-white'} />
              <ThemeToggle className={scrolled ? 'text-secondary hover:bg-bg-subtle hover:text-primary' : 'text-white/90 hover:bg-white/10'} />
            </div>
            <Button size="sm" onClick={openContactModal}>{t.nav.contact}</Button>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-1 md:hidden">
            <LanguageSwitcher textColorClass={scrolled ? 'text-secondary' : 'text-white/90'} />
            <ThemeToggle className={scrolled ? 'text-secondary hover:bg-bg-subtle' : 'text-white/90 hover:bg-white/10'} />
            <button
              onClick={() => setIsMenuOpen((o) => !o)}
              className={cn('rounded-md p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus', scrolled ? 'text-primary' : 'text-white')}
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
              {navLinks.map((l) => (
                <button key={l.id} onClick={() => scrollToSection(l.id)} className="block w-full rounded-md px-3 py-2 text-left text-body-m font-medium text-secondary hover:bg-bg-subtle hover:text-brand">
                  {l.label}
                </button>
              ))}
              <Button fullWidth onClick={openContactModal} className="mt-2">{t.nav.contact}</Button>
            </div>
          </div>
        )}
      </nav>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <ScreenshotsModal isOpen={isScreenshotsModalOpen} onClose={() => { setIsScreenshotsModalOpen(false); setSelectedApp(''); }} appName={selectedApp} onContactClick={openContactModal} />

      {/* ---------- Hero ---------- */}
      <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <img src="/hero_section_background.webp" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-primary-950/60" />
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="animate-float absolute -right-40 -top-40 h-80 w-80 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
          <div className="animate-float-delayed absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-container px-4 text-center sm:px-6 lg:px-8">
          <div className="animate-fade-in-up">
            <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-white md:text-6xl lg:text-display-xl">
              {t.hero.title}
              <span className="block bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">
                {t.hero.subtitle}
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-body-l text-neutral-200 md:text-xl">
              {t.hero.description}
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" onClick={() => scrollToSection('services')} rightIcon={<ArrowRight size={20} />}>
                {t.hero.exploreServices}
              </Button>
              <Button size="lg" variant="outline" onClick={openContactModal} className="border-white/70 bg-transparent text-white hover:bg-white hover:text-primary-900">
                {t.hero.getStarted}
              </Button>
            </div>
          </div>
        </div>

        <button onClick={() => scrollToSection('services')} aria-label="Scroll to content" className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/70 hover:text-white">
          <ChevronDown size={32} />
        </button>
      </section>

      {/* ---------- Services ---------- */}
      <section id="services" className="bg-bg-subtle py-20">
        <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-h2 text-primary md:text-display-m">{t.services.title}</h2>
            <p className="mx-auto max-w-3xl text-body-l text-secondary">{t.services.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Link key={i} to={service.link} className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-lg">
                <Card interactive padding="lg" className="flex h-full flex-col">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-brand-135 text-white transition-transform duration-300 group-hover:scale-110">
                    <service.icon size={28} />
                  </div>
                  <h3 className="mb-3 font-display text-h5 text-primary transition-colors group-hover:text-brand">{service.title}</h3>
                  <p className="mb-6 text-body-s text-tertiary">{service.description}</p>
                  <ul className="mb-6 space-y-2">
                    {service.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-3 text-body-s text-secondary">
                        <CheckCircle size={14} className="shrink-0 text-success-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-center gap-2 text-body-s font-semibold text-brand">
                    {isPt ? 'Saiba mais' : 'Learn more'}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Solutions ---------- */}
      <section id="solutions" className="bg-bg py-20">
        <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-h2 text-primary md:text-display-m">
              {t.solutions.title}
              <span className="block bg-gradient-brand bg-clip-text text-transparent">{t.solutions.subtitle}</span>
            </h2>
            <p className="mx-auto max-w-3xl text-body-l text-secondary">{t.solutions.description}</p>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {solutions.map((s, i) => (
              <div key={i} className={cn('group relative overflow-hidden rounded-2xl bg-gradient-to-br shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl', s.gradient)}>
                <div className="relative p-8 text-white">
                  <div className="absolute right-4 top-4">
                    <span className={cn('rounded-full border px-3 py-1 text-caption font-semibold backdrop-blur-sm',
                      s.comingSoon ? 'border-white/30 bg-white/15 text-white' : 'border-white/40 bg-white/20 text-white')}>
                      {s.comingSoon ? t.solutions.comingSoon : s.status}
                    </span>
                  </div>

                  <div className="mb-8 flex items-center justify-center">
                    <div className="rounded-2xl border border-white/20 bg-white/95 p-6 shadow-md transition-transform duration-300 group-hover:scale-105">
                      {s.logo ? (
                        <img src={s.logo} alt={`${s.title} logo`} loading="lazy" className="h-20 w-20 object-contain" />
                      ) : s.icon ? (
                        <s.icon size={80} className="text-neutral-700" />
                      ) : null}
                    </div>
                  </div>

                  <div className="mb-6 text-center">
                    <h3 className="mb-2 font-display text-h3">{s.title}</h3>
                    <p className="mb-4 text-body-l font-medium text-white/90">{s.subtitle}</p>
                    <p className="text-body-s text-white/80">{s.description}</p>
                  </div>

                  <div className="mb-6 rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                    <h4 className="mb-4 text-center font-display text-h6">{isPt ? 'Funcionalidades Principais' : 'Key Features'}</h4>
                    <ul className="space-y-3">
                      {s.features.map((f, fi) => (
                        <li key={fi} className="flex items-start gap-3 text-body-s text-white/90">
                          <CheckCircle size={16} className="mt-0.5 shrink-0 text-accent-300" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col justify-center gap-3 sm:flex-row">
                    {s.logo && (
                      <button onClick={() => openScreenshotsModal(s.title)} className="inline-flex items-center justify-center gap-2 rounded-md bg-white/20 px-6 py-3 text-body-s font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
                        <Image size={18} />
                        {isPt ? 'Ver Screenshots' : 'View Screenshots'}
                      </button>
                    )}
                    <button onClick={openContactModal} className="inline-flex items-center justify-center gap-2 rounded-md bg-white/20 px-6 py-3 text-body-s font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
                      {s.comingSoon ? t.solutions.learnMore : isPt ? 'Contactar' : 'Contact us'}
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Card padding="lg" className="bg-bg-subtle text-center">
            <h3 className="mb-4 font-display text-h3 text-primary">{isPt ? 'Tem uma Ideia para uma Aplicação?' : 'Have an Idea for an App?'}</h3>
            <p className="mx-auto mb-8 max-w-2xl text-body-l text-secondary">
              {isPt
                ? 'Vamos trabalhar juntos para transformar a sua visão numa aplicação que pode impactar positivamente a vida das pessoas.'
                : "Let's work together to turn your vision into an application that can make a real difference in people's lives."}
            </p>
            <Button size="lg" onClick={openContactModal} rightIcon={<ArrowRight size={20} />} className="mx-auto">
              {isPt ? 'Discutir Projeto' : 'Discuss a Project'}
            </Button>
          </Card>
        </div>
      </section>

      {/* ---------- About ---------- */}
      <section id="about" className="bg-bg-subtle py-20">
        <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
          <div className="mb-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 font-display text-h2 text-primary md:text-display-m">
                {t.about.title}
                <span className="block bg-gradient-brand bg-clip-text text-transparent">{t.about.subtitle}</span>
              </h2>
              <p className="mb-6 text-body-l text-secondary">{t.about.description1}</p>
              <p className="mb-8 text-body-l text-secondary">{t.about.description2}</p>
              <div className="grid grid-cols-2 gap-6">
                <Card className="text-center">
                  <div className="font-display text-h2 text-brand">20+</div>
                  <div className="mt-1 text-body-s text-tertiary">{t.about.stats.projects}</div>
                </Card>
                <Card className="text-center">
                  <div className="font-display text-h2 text-accent">{yearsExperience}+</div>
                  <div className="mt-1 text-body-s text-tertiary">{t.about.stats.experience}</div>
                </Card>
              </div>
            </div>
            <div className="rounded-2xl bg-gradient-brand-135 p-8 text-white">
              <h3 className="mb-4 font-display text-h4">{t.about.whyChoose.title}</h3>
              <ul className="space-y-4">
                {t.about.whyChoose.reasons.map((reason, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={20} className="mt-0.5 shrink-0 text-accent-300" />
                    <span className="text-body-m text-white/90">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card padding="lg" className="border-l-4 border-l-primary-500">
              <h3 className="mb-4 font-display text-h4 text-primary">{t.about.mission.title}</h3>
              <p className="text-body-m text-secondary">{t.about.mission.description}</p>
            </Card>
            <Card padding="lg" className="border-l-4 border-l-accent-500">
              <h3 className="mb-4 font-display text-h4 text-primary">{t.about.vision.title}</h3>
              <p className="text-body-m text-secondary">{t.about.vision.description}</p>
            </Card>
            <Card padding="lg" className="border-l-4 border-l-success-500">
              <h3 className="mb-4 font-display text-h4 text-primary">{t.about.values.title}</h3>
              <div className="space-y-2">
                {Object.values(t.about.values.items).map((value, i) => (
                  <p key={i} className="text-body-s text-secondary">{value}</p>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section id="contact" className="bg-primary-950 py-20">
        <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-h2 text-white md:text-display-m">{t.contact.title}</h2>
            <p className="mx-auto max-w-3xl text-body-l text-neutral-300">{t.contact.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h3 className="mb-8 font-display text-h4 text-white">{t.contact.getInTouch}</h3>
              <div className="space-y-6">
                {[
                  { icon: Phone, label: t.contact.phone, value: '+244 923 710 906', tint: 'bg-primary-600' },
                  { icon: Mail, label: t.contact.email, value: 'info@alio.ao', tint: 'bg-accent-600' },
                  { icon: MapPin, label: t.contact.location, value: 'Urbanização Nova Vida, Rua 49, Luanda, Angola', tint: 'bg-primary-500' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-white', item.tint)}>
                      <item.icon size={22} />
                    </div>
                    <div>
                      <p className="text-body-s text-neutral-400">{item.label}</p>
                      <p className="font-semibold text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card padding="lg" className="text-center">
              <h3 className="mb-4 font-display text-h4 text-primary">{isPt ? 'Entre em Contacto' : 'Get in Touch'}</h3>
              <p className="mb-6 text-body-m text-secondary">
                {isPt
                  ? 'Clique no botão abaixo para abrir o nosso formulário de contacto completo.'
                  : 'Click the button below to open our full contact form.'}
              </p>
              <Button size="lg" onClick={openContactModal} leftIcon={<Mail size={20} />} className="mx-auto">
                {isPt ? 'Abrir Formulário de Contacto' : 'Open Contact Form'}
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;
