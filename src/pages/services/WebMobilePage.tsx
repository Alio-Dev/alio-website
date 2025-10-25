import React, { useState } from 'react';
import { Smartphone } from 'lucide-react';
import Layout from '../../components/Layout';
import ServiceHero from '../../components/ServiceHero';
import ServiceFeatures from '../../components/ServiceFeatures';
import ContactModal from '../../components/ContactModal';

const WebMobilePage: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const features = [
    {
      title: "Desenvolvimento Web Moderno",
      description: "Criamos websites responsivos e performáticos utilizando as mais recentes tecnologias web, garantindo uma experiência excepcional em todos os dispositivos."
    },
    {
      title: "Aplicações Mobile Nativas",
      description: "Desenvolvemos aplicativos móveis nativos para iOS e Android que oferecem performance superior e integração perfeita com as funcionalidades do dispositivo."
    },
    {
      title: "Progressive Web Apps (PWA)",
      description: "Combinamos o melhor dos mundos web e mobile com PWAs que funcionam offline, são instaláveis e oferecem experiência similar a apps nativos."
    },
    {
      title: "Interface e Experiência do Utilizador",
      description: "Desenhamos interfaces intuitivas e experiências envolventes que priorizam a usabilidade e satisfação do utilizador final."
    }
  ];

  const technologies = [
    "React", "Angular", "Vue.js", "React Native", "Flutter", "Swift",
    "Kotlin", "Node.js", "Express", "MongoDB", "Firebase", "TypeScript"
  ];

  return (
    <Layout showBackButton>
      <ServiceHero
        icon={Smartphone}
        title="Desenvolvimento Web e Mobile"
        subtitle="Criar Experiências Digitais Impactantes"
        description="Do desenvolvimento de sites modernos à criação de aplicativos móveis intuitivos, oferecemos soluções digitais de última geração para cativar e envolver seus usuários."
        gradient="bg-gradient-to-br from-teal-900 via-teal-800 to-blue-800"
      />
      
      <ServiceFeatures
        title="Nossas Especialidades em Desenvolvimento"
        features={features}
        technologies={technologies}
        serviceType="web-mobile"
        onContactClick={() => setIsContactModalOpen(true)}
      />

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </Layout>
  );
};

export default WebMobilePage;