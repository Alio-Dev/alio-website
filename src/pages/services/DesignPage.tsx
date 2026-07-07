import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import Layout from '../../components/Layout';
import ServiceHero from '../../components/ServiceHero';
import ServiceFeatures from '../../components/ServiceFeatures';
import ContactModal from '../../components/ContactModal';

const DesignPage: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const features = [
    {
      title: "Desenvolvimento de Identidade Visual",
      description: "Criamos identidades visuais únicas e memoráveis que capturam a essência da sua marca e comunicam efetivamente com o seu público-alvo."
    },
    {
      title: "Design de Interface Intuitiva",
      description: "Desenvolvemos interfaces digitais que priorizam a experiência do utilizador, combinando estética moderna com funcionalidade excepcional."
    },
    {
      title: "Experiência do Utilizador Otimizada",
      description: "Aplicamos princípios de UX design para criar jornadas digitais fluidas e envolventes que convertem visitantes em clientes satisfeitos."
    },
    {
      title: "Produção de Arte Final",
      description: "Entregamos materiais gráficos finalizados e prontos para implementação, mantendo os mais altos padrões de qualidade e consistência visual."
    }
  ];

  const technologies = [
    "Adobe Creative Suite", "Figma", "Sketch", "Adobe XD", "InVision", "Principle",
    "After Effects", "Illustrator", "Photoshop", "InDesign", "Framer", "Webflow"
  ];

  return (
    <Layout showBackButton>
      <ServiceHero
        icon={Palette}
        title="Design Gráfico e Digital"
        subtitle="Design Gráfico e Digital"
        description="Nossa equipe de design gráfico e digital dá vida à sua marca por meio de conceitos visuais interativos e interfaces atraentes para a experiência de usuário envolventes."
        gradient="bg-gradient-to-br from-pink-900 via-rose-800 to-orange-800"
      />
      
      <ServiceFeatures
        title="Nossa Abordagem Criativa"
        features={features}
        technologies={technologies}
        serviceType="design"
        onContactClick={() => setIsContactModalOpen(true)}
      />

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </Layout>
  );
};

export default DesignPage;