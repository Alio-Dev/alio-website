import React from 'react';
import { X, Phone, Mail, MapPin, Send, User, Building, MessageSquare, Briefcase, CheckCircle } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useForm, ValidationError } from '@formspree/react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [state, handleSubmit] = useForm("xvgrqrve");

  if (!isOpen) return null;

  if (state.succeeded) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-fade-in-up text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {t.currentLanguage === 'pt' ? 'Mensagem Enviada!' : 'Message Sent!'}
          </h3>
          <p className="text-gray-600 mb-4">
            {t.currentLanguage === 'pt' 
              ? 'Obrigado pelo seu contacto. A sua mensagem foi enviada para a nossa equipa e responderemos em breve!' 
              : 'Thank you for contacting us. Your message has been sent to our team and we will respond shortly!'}
          </p>
          <button
            onClick={onClose}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors mt-4"
          >
            {t.currentLanguage === 'pt' ? 'Fechar' : 'Close'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl transform transition-all animate-fade-in-up">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Information Side */}
            <div className="bg-gradient-to-br from-blue-700 to-teal-600 p-8 lg:p-12 text-white rounded-l-2xl lg:rounded-r-none rounded-t-2xl lg:rounded-t-2xl">
              <div className="flex items-center space-x-3 mb-8">
                <img 
                  src="/Alio.svg" 
                  alt="Alio Analytics Logo" 
                  className="h-10 w-auto filter brightness-0 invert"
                />
                <h2 className="text-2xl font-bold">Alio Analytics</h2>
              </div>
              <h3 className="text-3xl font-bold mb-4">{t.contact.getInTouch}</h3>
              <p className="text-blue-100 mb-8 leading-relaxed">
                {t.contact.subtitle}
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 animate-fade-in">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-blue-100 text-sm">{t.contact.phone}</p>
                    <p className="font-semibold text-lg">+244 923 710 906</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-blue-100 text-sm">{t.contact.email}</p>
                    <p className="font-semibold text-lg">info@alio.ao</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-blue-100 text-sm">{t.contact.location}</p>
                    <p className="font-semibold">Urbanização Nova Vida, Rua 49</p>
                    <p className="font-semibold">Luanda, Angola</p>
                  </div>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute bottom-0 right-0 opacity-10">
                <div className="w-32 h-32 bg-white rounded-full blur-3xl"></div>
              </div>
            </div>
            {/* Contact Form Side */}
            <div className="p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {t.contact.title}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      <User size={16} className="inline mr-2" />
                      {t.contact.form.name} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder={t.contact.form.namePlaceholder}
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail size={16} className="inline mr-2" />
                      {t.contact.form.email} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder={t.contact.form.emailPlaceholder}
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone size={16} className="inline mr-2" />
                      Telefone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Telefone"
                    />
                    <ValidationError prefix="Phone" field="phone" errors={state.errors} />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      <Building size={16} className="inline mr-2" />
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Empresa"
                    />
                    <ValidationError prefix="Company" field="company" errors={state.errors} />
                  </div>
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    <Briefcase size={16} className="inline mr-2" />
                    {t.contact.form.service} *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">{t.contact.form.selectService}</option>
                    <option value="digital-solutions">{t.services.digitalSolutions.title}</option>
                    <option value="web-mobile">{t.services.webMobileDev.title}</option>
                    <option value="it-services">{t.services.itServices.title}</option>
                    <option value="analytics">{t.services.analytics.title}</option>
                    <option value="design">{t.services.design.title}</option>
                    <option value="gis">{t.services.gis.title}</option>
                  </select>
                  <ValidationError prefix="Service" field="service" errors={state.errors} />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare size={16} className="inline mr-2" />
                    {t.contact.form.message} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder={t.contact.form.messagePlaceholder}
                  ></textarea>
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full bg-gradient-to-r from-blue-700 to-teal-600 text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {state.submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {t.currentLanguage === 'pt' ? 'Enviando...' : 'Sending...'}
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      {t.contact.form.send}
                    </>
                  )}
                </button>
              </form>
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>
                  {t.currentLanguage === 'pt' 
                    ? 'Responderemos em até 24 horas' 
                    : 'We will respond within 24 hours'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;