import React, { useState } from 'react';
import { Code } from 'lucide-react';
import Layout from '../../components/Layout';
import ServiceHero from '../../components/ServiceHero';
import ServiceFeatures from '../../components/ServiceFeatures';
import ContactModal from '../../components/ContactModal';

const DigitalSolutionsPage: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const features = [
    {
      title: "Desenvolvimento Personalizado",
      description: "Criamos soluções digitais sob medida que atendem perfeitamente às necessidades específicas do seu negócio, garantindo funcionalidade e eficiência máximas."
    },
    {
      title: "Análise de Dados Avançada",
      description: "Transformamos dados brutos em insights valiosos através de análises profundas que orientam decisões estratégicas e impulsionam o crescimento."
    },
    {
      title: "Design Gráfico Inovador",
      description: "Desenvolvemos identidades visuais marcantes e materiais gráficos que comunicam efetivamente a essência da sua marca ao público-alvo."
    },
    {
      title: "Consultoria Digital Estratégica",
      description: "Oferecemos orientação especializada para navegar no mundo digital, identificando oportunidades e definindo estratégias de transformação digital."
    }
  ];

  const technologies = [
    "React", "Angular", "Vue.js", "Node.js", "Python", "Django",
    "PostgreSQL", "MongoDB", "AWS", "Docker", "Kubernetes", "Git"
  ];

  return (
    <Layout showBackButton>
      <ServiceHero
        icon={Code}
        title="Soluções Digitais"
        subtitle="Transformar Ideias em Resultados Digitais"
        description="Criamos soluções digitais sob medida para atender às suas necessidades. Nossa expertise abrange desenvolvimento digital, análise de dados, design gráfico e muito mais."
        gradient="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-800"
      />
      
      <ServiceFeatures
        title="Como Transformamos Suas Ideias"
        features={features}
        technologies={technologies}
        serviceType="digital"
        onContactClick={() => setIsContactModalOpen(true)}
      />

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </Layout>
  );
};

export default DigitalSolutionsPage;