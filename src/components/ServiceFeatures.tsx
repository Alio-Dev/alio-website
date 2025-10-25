import React from 'react';
import { CheckCircle, ArrowRight, Code, Database, Smartphone, Globe, Palette, BarChart3, Shield, Server, Cloud, Monitor, Cpu, HardDrive, Lock, Headphones, PieChart, TrendingUp, Eye, Brain, Layers, Figma, Brush, MousePointer, Image, Map, Navigation, Satellite, TreePine, Building, Leaf } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
}

interface ServiceFeaturesProps {
  title: string;
  features: Feature[];
  technologies: string[];
  serviceType: 'digital' | 'web-mobile' | 'it-services' | 'analytics' | 'design' | 'gis';
  onContactClick?: () => void;
}

const getTechnologyIcon = (tech: string, serviceType: string) => {
  const techLower = tech.toLowerCase();
  
  // Common technology icons
  const iconMap: { [key: string]: any } = {
    // Programming Languages & Frameworks
    'react': Code,
    'angular': Code,
    'vue.js': Code,
    'vue': Code,
    'node.js': Server,
    'node': Server,
    'python': Code,
    'django': Code,
    'javascript': Code,
    'typescript': Code,
    'html': Globe,
    'css': Palette,
    'express': Server,
    
    // Databases
    'postgresql': Database,
    'postgres': Database,
    'mongodb': Database,
    'mysql': Database,
    'sql': Database,
    
    // Mobile Development
    'react native': Smartphone,
    'flutter': Smartphone,
    'swift': Smartphone,
    'kotlin': Smartphone,
    'android studio': Smartphone,
    'java': Code,
    
    // Cloud & DevOps
    'aws': Cloud,
    'azure': Cloud,
    'docker': Server,
    'kubernetes': Server,
    'git': Code,
    
    // IT Services
    'linux': Monitor,
    'windows server': Monitor,
    'vmware': Server,
    'cisco': Server,
    'fortinet': Shield,
    'active directory': Server,
    
    // Analytics & Data
    'power bi': BarChart3,
    'tableau': BarChart3,
    'tensorflow': Brain,
    'pandas': BarChart3,
    'numpy': BarChart3,
    'apache spark': Database,
    'elasticsearch': Database,
    'kibana': Eye,
    'd3.js': BarChart3,
    'r': TrendingUp,
    
    // Design Tools
    'adobe creative suite': Palette,
    'adobe creative cloud': Palette,
    'figma': Figma,
    'sketch': Brush,
    'adobe xd': MousePointer,
    'invision': Eye,
    'principle': MousePointer,
    'after effects': Image,
    'illustrator': Brush,
    'photoshop': Image,
    'indesign': Layers,
    'framer': MousePointer,
    'webflow': Globe,
    
    // GIS Technologies
    'arcgis': Map,
    'qgis': Map,
    'postgis': Database,
    'gps': Navigation,
    'drones': Satellite,
    'remote sensing': Satellite,
    'mapbox': Map,
    'leaflet': Map,
    'geoserver': Server,
    'fme': Database,
    'autocad': Building,
    'global mapper': Map,
    
    // Security
    'firewall': Shield,
    'information security': Lock,
    'vpns': Shield,
    
    // Support
    'suporte técnico': Headphones,
    'technical support': Headphones,
  };
  
  // Check for exact matches first
  if (iconMap[techLower]) {
    return iconMap[techLower];
  }
  
  // Check for partial matches
  for (const key in iconMap) {
    if (techLower.includes(key) || key.includes(techLower)) {
      return iconMap[key];
    }
  }
  
  // Default icons based on service type
  const serviceDefaults = {
    'digital': Code,
    'web-mobile': Smartphone,
    'it-services': Server,
    'analytics': BarChart3,
    'design': Palette,
    'gis': Map
  };
  
  return serviceDefaults[serviceType] || Code;
};

const ServiceFeatures: React.FC<ServiceFeaturesProps> = ({ title, features, technologies, serviceType, onContactClick }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Features */}
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-slide-in-left"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle size={20} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Technologies */}
          <div className="bg-gradient-to-br from-blue-700 to-teal-600 rounded-3xl p-8 text-white animate-slide-in-right">
            <h3 className="text-2xl font-bold mb-8">Tecnologias & Ferramentas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {technologies.map((tech, index) => {
                const IconComponent = getTechnologyIcon(tech, serviceType);
                return (
                  <div 
                    key={index}
                    className="bg-white/20 backdrop-blur-sm rounded-xl p-4 hover:bg-white/30 transition-all duration-300 transform hover:scale-105 animate-fade-in flex items-center space-x-3"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <IconComponent size={20} className="text-white flex-shrink-0" />
                    <span className="font-semibold text-sm">{tech}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-3xl p-12 shadow-xl animate-fade-in-up">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Pronto para começar seu projeto?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Entre em contacto connosco para discutir como podemos transformar suas ideias em realidade digital.
          </p>
          <button 
            onClick={onContactClick}
            className="bg-gradient-to-r from-blue-700 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mx-auto"
          >
            Contactar Agora
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;