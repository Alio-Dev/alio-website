import React, { useState } from 'react';
import { Map } from 'lucide-react';
import Layout from '../../components/Layout';
import ServiceHero from '../../components/ServiceHero';
import ServiceFeatures from '../../components/ServiceFeatures';
import ContactModal from '../../components/ContactModal';

const GISPage: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const features = [
    {
      title: "Mapeamento e Cartografia Avançada",
      description: "Criamos mapas precisos e detalhados utilizando tecnologias de ponta, incluindo levantamentos topográficos e cartografia digital de alta qualidade."
    },
    {
      title: "Planeamento Urbano e Territorial",
      description: "Fornecemos soluções GIS para planeamento urbano, gestão territorial e desenvolvimento sustentável, apoiando decisões estratégicas de ordenamento."
    },
    {
      title: "Gestão Ambiental Integrada",
      description: "Desenvolvemos sistemas para monitorização ambiental, estudos de impacto, gestão de recursos naturais e implementação de políticas ambientais."
    },
    {
      title: "Análise Geoespacial Avançada",
      description: "Realizamos análises espaciais complexas, modelação geográfica e criação de dashboards interativos para visualização de dados geoespaciais."
    }
  ];

  const technologies = [
    "ArcGIS", "QGIS", "PostGIS", "GPS", "Drones", "Remote Sensing",
    "Mapbox", "Leaflet", "GeoServer", "FME", "AutoCAD", "Global Mapper"
  ];

  return (
    <Layout showBackButton>
      <ServiceHero
        icon={Map}
        title="GIS - Sistemas de Informação Geográfica"
        subtitle="Soluções Espaciais Inteligentes"
        description="Oferecemos soluções baseadas em SIG que permitem a análise, visualização e gestão de dados geoespaciais. Desde mapeamento até gestão ambiental, nossos serviços ajudam a tomar decisões informadas e eficazes."
        gradient="bg-gradient-to-br from-green-900 via-emerald-800 to-teal-800"
      />
      
      <ServiceFeatures
        title="Nossas Especialidades em GIS"
        features={features}
        technologies={technologies}
        serviceType="gis"
        onContactClick={() => setIsContactModalOpen(true)}
      />

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </Layout>
  );
};

export default GISPage;