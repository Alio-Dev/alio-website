import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ServiceHeroProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
}

const ServiceHero: React.FC<ServiceHeroProps> = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  description, 
  gradient 
}) => {
  return (
    <section className={`relative min-h-[70vh] flex items-center justify-center overflow-hidden ${gradient}`}>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl mb-8 animate-bounce-gentle">
            <Icon size={48} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-6 font-medium">
            {subtitle}
          </p>
          <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;