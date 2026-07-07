import React from 'react';
import { CheckCircle, ArrowRight, Code, Database, Smartphone, Globe, Palette, BarChart3, Shield, Server, Cloud, Monitor, Lock, Headphones, TrendingUp, Eye, Brain, Layers, PenTool, Brush, MousePointer, Image, Map, Navigation, Satellite, Building, type LucideIcon } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

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
  const iconMap: { [key: string]: LucideIcon } = {
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
    'figma': PenTool,
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
  const serviceDefaults: Record<string, LucideIcon> = {
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
  const { currentLanguage } = useLanguage();
  const isPt = currentLanguage === 'pt';

  return (
    <section className="bg-bg-subtle py-20">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="font-display text-h2 text-primary md:text-display-m">{title}</h2>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <Card key={index} interactive padding="lg">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-brand-135 text-white">
                    <CheckCircle size={18} />
                  </div>
                  <div>
                    <h3 className="mb-2 font-display text-h5 text-primary">{feature.title}</h3>
                    <p className="text-body-m text-secondary">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Technologies */}
          <div className="rounded-2xl bg-gradient-brand-135 p-8 text-white">
            <h3 className="mb-8 font-display text-h4">
              {isPt ? 'Tecnologias & Ferramentas' : 'Technologies & Tools'}
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {technologies.map((tech, index) => {
                const IconComponent = getTechnologyIcon(tech, serviceType);
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-xl bg-white/15 p-4 backdrop-blur-sm transition-colors hover:bg-white/25"
                  >
                    <IconComponent size={20} className="shrink-0 text-white" />
                    <span className="text-body-s font-semibold">{tech}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <Card padding="lg" className="text-center">
          <h3 className="mb-4 font-display text-h3 text-primary">
            {isPt ? 'Pronto para começar o seu projeto?' : 'Ready to start your project?'}
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-body-l text-secondary">
            {isPt
              ? 'Entre em contacto connosco para discutir como podemos transformar as suas ideias em realidade digital.'
              : 'Get in touch to discuss how we can turn your ideas into digital reality.'}
          </p>
          <Button size="lg" onClick={onContactClick} rightIcon={<ArrowRight size={20} />} className="mx-auto">
            {isPt ? 'Contactar Agora' : 'Contact Us Now'}
          </Button>
        </Card>
      </div>
    </section>
  );
};

export default ServiceFeatures;