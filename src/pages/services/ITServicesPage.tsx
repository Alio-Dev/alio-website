import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import Layout from '../../components/Layout';
import ServiceHero from '../../components/ServiceHero';
import ServiceFeatures from '../../components/ServiceFeatures';
import ContactModal from '../../components/ContactModal';

const ITServicesPage: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const features = [
    {
      title: "Consultoria Estratégica de TI",
      description: "Fornecemos orientação especializada para alinhar a tecnologia com os objetivos de negócio, otimizando processos e maximizando o retorno sobre investimento."
    },
    {
      title: "Implementação de Infraestrutura",
      description: "Desenhamos e implementamos infraestruturas robustas e escaláveis, incluindo servidores, redes e sistemas de armazenamento de dados."
    },
    {
      title: "Segurança e Proteção Cibernética",
      description: "Protegemos seus ativos digitais com soluções avançadas de segurança, incluindo firewalls, sistemas de detecção de intrusão e políticas de segurança."
    },
    {
      title: "Suporte Técnico Especializado",
      description: "Oferecemos suporte técnico 24/7 com uma equipa de especialistas prontos para resolver qualquer desafio tecnológico que possa surgir."
    }
  ];

  const technologies = [
    "Linux", "Windows Server", "VMware", "Docker", "Kubernetes", "AWS",
    "Azure", "Cisco", "Fortinet", "MySQL", "PostgreSQL", "Active Directory"
  ];

  return (
    <Layout showBackButton>
      <ServiceHero
        icon={Shield}
        title="Serviços Gerais de TI"
        subtitle="Capacitar Infraestrutura Digital"
        description="Oferecemos consultoria, implementação de servidores e redes, segurança cibernética, monitoramento e suporte técnico para manter seus sistemas em pleno funcionamento."
        gradient="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900"
      />
      
      <ServiceFeatures
        title="Nossos Serviços de TI Especializados"
        features={features}
        technologies={technologies}
        serviceType="it-services"
        onContactClick={() => setIsContactModalOpen(true)}
      />

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </Layout>
  );
};

export default ITServicesPage;