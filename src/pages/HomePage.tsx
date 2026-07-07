import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X, Code, BarChart3, Map, Palette, ArrowRight, Phone, Mail, MapPin, CheckCircle, Database, Smartphone, Shield, Settings, Image } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import LanguageSwitcher from '../components/LanguageSwitcher';
import ContactModal from '../components/ContactModal';
import ScreenshotsModal from '../components/ScreenshotsModal';
import Footer from '../components/Footer';

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isScreenshotsModalOpen, setIsScreenshotsModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: Code,
      title: t.services.digitalSolutions.title,
      description: t.services.digitalSolutions.description,
      features: t.services.digitalSolutions.features,
      link: '/services/digital-solutions'
    },
    {
      icon: Smartphone,
      title: t.services.webMobileDev.title,
      description: t.services.webMobileDev.description,
      features: t.services.webMobileDev.features,
      link: '/services/web-mobile'
    },
    {
      icon: Shield,
      title: t.services.itServices.title,
      description: t.services.itServices.description,
      features: t.services.itServices.features,
      link: '/services/it-services'
    },
    {
      icon: BarChart3,
      title: t.services.analytics.title,
      description: t.services.analytics.description,
      features: t.services.analytics.features,
      link: '/services/analytics'
    },
    {
      icon: Palette,
      title: t.services.design.title,
      description: t.services.design.description,
      features: t.services.design.features,
      link: '/services/design'
    },
    {
      icon: Map,
      title: t.services.gis.title,
      description: t.services.gis.description,
      features: t.services.gis.features,
      link: '/services/gis'
    }
  ];

  const solutions = [
    {
      logo: '/kelesa.png',
      title: t.solutions.kelesaKlean.title,
      subtitle: t.solutions.kelesaKlean.subtitle,
      description: t.solutions.kelesaKlean.description,
      features: t.solutions.kelesaKlean.features.slice(0, 4),
      status: t.solutions.kelesaKlean.status,
      gradient: 'from-green-600 to-emerald-700',
      delay: '0s',
      comingSoon: true
    },
    {
      logo: '/okwenda.png',
      title: t.solutions.okwenda.title,
      subtitle: t.solutions.okwenda.subtitle,
      description: t.solutions.okwenda.description,
      features: t.solutions.okwenda.features.slice(0, 4),
      status: t.solutions.okwenda.status,
      gradient: 'from-blue-600 to-cyan-700',
      delay: '0.1s',
      comingSoon: true
    },
    {
      logo: '/Mwenhu.png',
      title: t.solutions.mwenhu.title,
      subtitle: t.solutions.mwenhu.subtitle,
      description: t.solutions.mwenhu.description,
      features: t.solutions.mwenhu.features.slice(0, 4),
      status: t.solutions.mwenhu.status,
      gradient: 'from-red-500 to-pink-600',
      delay: '0.2s',
      comingSoon: true
    },
    {
      icon: Settings,
      title: t.solutions.customSolutions.title,
      subtitle: "Desenvolvimento Sob Medida",
      description: t.solutions.customSolutions.description,
      features: t.solutions.customSolutions.features,
      status: "Disponível",
      gradient: 'from-purple-600 to-indigo-700',
      delay: '0.3s',
      comingSoon: false
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  const openScreenshotsModal = (appName: string) => {
    setSelectedApp(appName);
    setIsScreenshotsModalOpen(true);
  };

  const closeScreenshotsModal = () => {
    setIsScreenshotsModalOpen(false);
    setSelectedApp('');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="/Alio.svg" 
                alt="Alio Analytics Logo" 
                className="h-8 w-auto"
              />
              <div className="text-xl font-bold bg-gradient-to-r from-blue-700 to-teal-600 bg-clip-text text-transparent hidden sm:inline">
                Alio Analytics
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-baseline space-x-8">
                <button onClick={() => scrollToSection('home')} className={`${scrollY <= 50 ? 'text-orange-500' : 'text-gray-900 hover:text-blue-700'} px-3 py-2 text-sm font-medium transition-colors`}>
                  {t.nav.home}
                </button>
                <button onClick={() => scrollToSection('services')} className={`${scrollY <= 50 ? 'text-orange-500' : 'text-gray-900 hover:text-blue-700'} px-3 py-2 text-sm font-medium transition-colors`}>
                  {t.nav.services}
                </button>
                <button onClick={() => scrollToSection('solutions')} className={`${scrollY <= 50 ? 'text-orange-500' : 'text-gray-900 hover:text-blue-700'} px-3 py-2 text-sm font-medium transition-colors`}>
                  {t.nav.solutions}
                </button>
                <button onClick={() => scrollToSection('about')} className={`${scrollY <= 50 ? 'text-orange-500' : 'text-gray-900 hover:text-blue-700'} px-3 py-2 text-sm font-medium transition-colors`}>
                  {t.nav.about}
                </button>
                <button onClick={openContactModal} className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
                  {t.nav.contact}
                </button>
              </div>
              <LanguageSwitcher textColorClass={scrollY <= 50 ? 'text-orange-500' : 'text-gray-900 hover:text-blue-700'} />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <LanguageSwitcher textColorClass={scrollY <= 50 ? 'text-orange-500' : 'text-gray-900 hover:text-blue-700'} />
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
              <button onClick={() => scrollToSection('home')} className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-700 w-full text-left">
                {t.nav.home}
              </button>
              <button onClick={() => scrollToSection('services')} className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-700 w-full text-left">
                {t.nav.services}
              </button>
              <button onClick={() => scrollToSection('solutions')} className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-700 w-full text-left">
                {t.nav.solutions}
              </button>
              <button onClick={() => scrollToSection('about')} className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-700 w-full text-left">
                {t.nav.about}
              </button>
              <button onClick={openContactModal} className="block px-3 py-2 text-base font-medium bg-blue-700 text-white rounded-lg mx-3 text-center">
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

      {/* Screenshots Modal */}
      <ScreenshotsModal 
        isOpen={isScreenshotsModalOpen} 
        onClose={closeScreenshotsModal}
        appName={selectedApp}
        onContactClick={openContactModal}
      />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/hero_section_background.png" alt="Hero Background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-teal-400/20 to-blue-400/20 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {t.hero.title}
              <span className="block bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
                {t.hero.subtitle}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('services')}
                className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                {t.hero.exploreServices}
                <ArrowRight size={20} />
              </button>
              <button 
                onClick={openContactModal}
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105"
              >
                {t.hero.getStarted}
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-white/70" />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              {t.services.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.services.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-blue-700 to-teal-600 p-3 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                    <service.icon size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700 text-sm">
                      <CheckCircle size={14} className="text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center text-blue-700 font-semibold group-hover:text-blue-800 transition-colors">
                  Saiba mais
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              {t.solutions.title}
              <span className="block bg-gradient-to-r from-blue-700 to-teal-600 bg-clip-text text-transparent">
                {t.solutions.subtitle}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t.solutions.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-slide-in-up"
                style={{ animationDelay: solution.delay }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-90`}></div>
                <div className="relative p-8 text-white">
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      solution.comingSoon 
                        ? 'bg-orange-500/20 text-orange-200 border border-orange-300/30' 
                        : 'bg-green-500/20 text-green-200 border border-green-300/30'
                    }`}>
                      {solution.comingSoon ? t.solutions.comingSoon : solution.status}
                    </span>
                  </div>

                  {/* Logo Section - Enhanced */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="bg-white/95 backdrop-blur-sm p-6 rounded-3xl shadow-lg group-hover:scale-110 transition-transform duration-300 border border-white/20">
                      {solution.logo ? (
                        <img 
                          src={solution.logo} 
                          alt={`${solution.title} Logo`}
                          className="w-20 h-20 object-contain"
                        />
                      ) : (
                        <solution.icon size={80} className="text-gray-700" />
                      )}
                    </div>
                  </div>
                  
                  <div className="text-center mb-6">
                    <h3 className="text-3xl font-bold mb-2 group-hover:text-orange-200 transition-colors">
                      {solution.title}
                    </h3>
                    
                    <p className="text-lg font-medium text-white/90 mb-4">
                      {solution.subtitle}
                    </p>
                    
                    <p className="text-white/80 mb-6 leading-relaxed text-sm">
                      {solution.description}
                    </p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <h4 className="text-lg font-semibold mb-4 text-center">Funcionalidades Principais</h4>
                    <ul className="space-y-3">
                      {solution.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-white/90">
                          <CheckCircle size={16} className="text-orange-300 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {/* Screenshots Button - Only for apps with logos (not custom solutions) */}
                    {solution.logo && (
                      <button 
                        onClick={() => openScreenshotsModal(solution.title)}
                        className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group-hover:shadow-lg justify-center"
                      >
                        <Image size={18} />
                        {t.currentLanguage === 'pt' ? 'Ver Screenshots' : 'View Screenshots'}
                      </button>
                    )}
                    
                    {/* Learn More / Contact Button */}
                    <button 
                      onClick={openContactModal}
                      className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group-hover:shadow-lg justify-center"
                    >
                      {solution.comingSoon ? t.solutions.learnMore : 'Contactar'}
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
                
                {/* Enhanced Decorative Elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl transform translate-x-20 -translate-y-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform -translate-x-16 translate-y-16"></div>
                <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/5 rounded-full blur-xl transform -translate-x-12 -translate-y-12"></div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl p-12 animate-fade-in-up">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Tem uma Ideia para uma Aplicação?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Vamos trabalhar juntos para transformar a sua visão numa aplicação que pode impactar positivamente a vida das pessoas.
            </p>
            <button 
              onClick={openContactModal}
              className="bg-gradient-to-r from-blue-700 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mx-auto"
            >
              Discutir Projeto
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t.about.title}
                <span className="block bg-gradient-to-r from-blue-700 to-teal-600 bg-clip-text text-transparent">
                  {t.about.subtitle}
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t.about.description1}
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t.about.description2}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl animate-fade-in">
                  <div className="text-3xl font-bold text-blue-700 mb-2">15+</div>
                  <div className="text-gray-600 text-sm">{t.about.stats.projects}</div>
                </div>
                <div className="text-center p-4 bg-teal-50 rounded-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="text-3xl font-bold text-teal-700 mb-2">3+</div>
                  <div className="text-gray-600 text-sm">{t.about.stats.experience}</div>
                </div>
              </div>
            </div>
            <div className="relative animate-slide-in-right">
              <div className="bg-gradient-to-br from-blue-700 to-teal-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">{t.about.whyChoose.title}</h3>
                <ul className="space-y-4">
                  {t.about.whyChoose.reasons.map((reason, index) => (
                    <li key={index} className="flex items-start animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <CheckCircle size={20} className="text-orange-300 mr-3 mt-1 flex-shrink-0" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-2xl p-8 animate-slide-in-up">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">{t.about.mission.title}</h3>
              <p className="text-blue-800 leading-relaxed">{t.about.mission.description}</p>
            </div>
            <div className="bg-teal-50 rounded-2xl p-8 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-2xl font-bold text-teal-900 mb-4">{t.about.vision.title}</h3>
              <p className="text-teal-800 leading-relaxed">{t.about.vision.description}</p>
            </div>
            <div className="bg-orange-50 rounded-2xl p-8 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-2xl font-bold text-orange-900 mb-4">{t.about.values.title}</h3>
              <div className="space-y-3">
                {Object.values(t.about.values.items).map((value, index) => (
                  <p key={index} className="text-orange-800 text-sm leading-relaxed">{value}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in-up">
              {t.contact.title}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-slide-in-left">
              <h3 className="text-2xl font-bold text-white mb-8">{t.contact.getInTouch}</h3>
              <div className="space-y-6">
                <div className="flex items-center animate-fade-in">
                  <div className="bg-blue-700 p-3 rounded-lg">
                    <Phone size={24} className="text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-300">{t.contact.phone}</p>
                    <p className="text-white font-semibold">+244 923 710 906</p>
                  </div>
                </div>
                <div className="flex items-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <div className="bg-teal-600 p-3 rounded-lg">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-300">{t.contact.email}</p>
                    <p className="text-white font-semibold">info@alio.ao</p>
                  </div>
                </div>
                <div className="flex items-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="bg-orange-500 p-3 rounded-lg">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-300">{t.contact.location}</p>
                    <p className="text-white font-semibold">Urbanização Nova Vida, Rua 49<br />Luanda, Angola</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 animate-slide-in-right">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Entre em Contacto</h3>
                <p className="text-gray-600 mb-6">
                  Clique no botão abaixo para abrir o nosso formulário de contacto completo
                </p>
                <button
                  onClick={openContactModal}
                  className="bg-gradient-to-r from-blue-700 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mx-auto"
                >
                  <Mail size={20} />
                  Abrir Formulário de Contacto
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;