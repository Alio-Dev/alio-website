import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import Layout from '../../components/Layout';
import ServiceHero from '../../components/ServiceHero';
import ServiceFeatures from '../../components/ServiceFeatures';
import ContactModal from '../../components/ContactModal';

const AnalyticsPage: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const features = [
    {
      title: "Coleta e Limpeza de Dados",
      description: "Implementamos processos robustos de coleta e tratamento de dados, garantindo qualidade e consistência para análises precisas e confiáveis."
    },
    {
      title: "Análise Exploratória e Preditiva",
      description: "Utilizamos técnicas avançadas de análise para descobrir padrões ocultos nos dados e criar modelos preditivos que antecipam tendências futuras."
    },
    {
      title: "Visualização de Dados Interativos",
      description: "Criamos dashboards e relatórios visuais interativos que transformam dados complexos em insights claros e acionáveis para tomada de decisão."
    },
    {
      title: "Business Intelligence Avançado",
      description: "Desenvolvemos soluções de BI que integram múltiplas fontes de dados, fornecendo uma visão holística do desempenho do negócio."
    }
  ];

  const technologies = [
    "Python", "R", "SQL", "Power BI", "Tableau", "TensorFlow",
    "Pandas", "NumPy", "Apache Spark", "Elasticsearch", "Kibana", "D3.js"
  ];

  return (
    <Layout showBackButton>
      <ServiceHero
        icon={BarChart3}
        title="Analytics e Insights"
        subtitle="Transformar Dados em Estratégias Inteligentes"
        description="Nossos serviços de análise de dados e inteligência de negócios fornecem insights valiosos para tomar decisões informadas e orientadas por dados."
        gradient="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800"
      />
      
      <ServiceFeatures
        title="Como Transformamos Dados em Valor"
        features={features}
        technologies={technologies}
        serviceType="analytics"
        onContactClick={() => setIsContactModalOpen(true)}
      />

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </Layout>
  );
};

export default AnalyticsPage;