import { Translation } from '../types/language';

export const translations: Record<string, Translation> = {
  pt: {
    nav: {
      home: "Início",
      services: "Serviços",
      about: "Quem Somos",
      contact: "Contactos",
      back: "Voltar",
      solutions: "Soluções"
    },
    hero: {
      title: "Vamos Transformar sua",
      subtitle: "Visão em Realidade",
      description: "Alio é a síntese da inovação, dedicação e paixão pelo mundo digital. Transformamos visões em soluções digitais sob medida com um time de profissionais altamente qualificados.",
      exploreServices: "Explorar Serviços",
      getStarted: "Começar Agora"
    },
    services: {
      title: "Os Nossos Serviços",
      description: "Soluções digitais abrangentes para acelerar a sua transformação digital e crescimento empresarial.",
      digitalSolutions: {
        title: "Soluções Digitais",
        description: "Criamos soluções digitais sob medida para atender às suas necessidades. Transformar ideias em resultados digitais.",
        features: ["Desenvolvimento Personalizado", "Análise de Dados", "Design Gráfico", "Consultoria Digital"]
      },
      webMobileDev: {
        title: "Desenvolvimento Web e Mobile",
        description: "Do desenvolvimento de sites modernos à criação de aplicativos móveis intuitivos, oferecemos soluções digitais de última geração.",
        features: ["Desenvolvimento Web", "Aplicações Mobile", "React & Angular", "Swift & Flutter"]
      },
      itServices: {
        title: "Serviços Gerais de TI",
        description: "Oferecemos consultoria, implementação de servidores e redes, segurança cibernética e suporte técnico especializado.",
        features: ["Consultoria Estratégica", "Infraestrutura", "Segurança Cibernética", "Suporte Técnico"]
      },
      analytics: {
        title: "Analytics e Insights",
        description: "Nossos serviços de análise de dados fornecem insights valiosos para tomar decisões informadas e orientadas por dados.",
        features: ["Análise de Dados", "Business Intelligence", "Visualização Interativa", "Modelagem Avançada"]
      },
      design: {
        title: "Design Gráfico e Digital",
        description: "Nossa equipa de design dá vida à sua marca através de conceitos visuais interativos e interfaces atraentes.",
        features: ["Identidade Visual", "Design de Interface", "Experiência do Utilizador", "Adobe Creative Cloud"]
      },
      gis: {
        title: "GIS - Sistemas de Informação Geográfica",
        description: "Oferecemos soluções baseadas em SIG que permitem a análise, visualização e gestão de dados geoespaciais.",
        features: ["Mapeamento e Cartografia", "Planeamento Urbano", "Gestão Ambiental", "Levantamento Topogeodésico"]
      }
    },
    solutions: {
      title: "As Nossas Soluções",
      subtitle: "Aplicações Inovadoras",
      description: "Desenvolvemos aplicações móveis e web que resolvem problemas reais e melhoram a vida das pessoas em Angola e além.",
      viewAll: "Ver Todas as Soluções",
      learnMore: "Saber Mais",
      downloadApp: "Baixar App",
      comingSoon: "Em Breve",
      kelesaKlean: {
        title: "Kelesa Klean",
        subtitle: "Gestão de Resíduos e Ecopontos",
        description: "Uma aplicação revolucionária para gestão inteligente de resíduos urbanos, conectando cidadãos, empresas de recolha e ecopontos numa plataforma integrada.",
        features: [
          "Localização de Ecopontos em Tempo Real",
          "Agendamento de Recolha de Resíduos",
          "Sistema de Recompensas por Reciclagem",
          "Relatórios Ambientais Personalizados",
          "Notificações de Recolha",
          "Mapa Interativo de Pontos de Reciclagem"
        ],
        benefits: [
          "Redução do impacto ambiental",
          "Cidades mais limpas e sustentáveis",
          "Incentivos para reciclagem",
          "Gestão eficiente de resíduos"
        ],
        status: "Em Desenvolvimento"
      },
      okwenda: {
        title: "Okwenda",
        subtitle: "Turismo Inteligente para Angola",
        description: "A primeira plataforma digital completa para descobrir, planear e experienciar o melhor que Angola tem para oferecer aos turistas locais e internacionais.",
        features: [
          "Guia Turístico Digital Interativo",
          "Reservas de Hotéis e Restaurantes",
          "Roteiros Personalizados",
          "Realidade Aumentada para Pontos Turísticos",
          "Tradutor Multilíngue Integrado",
          "Comunidade de Viajantes"
        ],
        benefits: [
          "Promoção do turismo nacional",
          "Experiências autênticas e locais",
          "Suporte a negócios locais",
          "Facilita o planeamento de viagens"
        ],
        status: "Em Desenvolvimento"
      },
      mwenhu: {
        title: "Mwenhu",
        subtitle: "Saúde e Bem-Estar Digital",
        description: "Uma plataforma abrangente de saúde digital que conecta pacientes, profissionais de saúde e instituições médicas para cuidados de saúde mais acessíveis e eficientes.",
        features: [
          "Consultas Médicas Online",
          "Gestão de Histórico Médico",
          "Agendamento de Consultas",
          "Monitorização de Saúde em Tempo Real",
          "Farmácia Digital Integrada",
          "Lembretes de Medicação"
        ],
        benefits: [
          "Acesso facilitado aos cuidados de saúde",
          "Redução de custos médicos",
          "Monitorização contínua da saúde",
          "Melhoria na qualidade de vida"
        ],
        status: "Em Desenvolvimento"
      },
      customSolutions: {
        title: "Soluções Personalizadas",
        description: "Além das nossas aplicações principais, desenvolvemos soluções sob medida para atender às necessidades específicas do seu negócio ou organização.",
        features: [
          "Análise de Requisitos Detalhada",
          "Desenvolvimento Ágil e Iterativo",
          "Integração com Sistemas Existentes",
          "Suporte e Manutenção Contínua"
        ],
        benefits: [
          "Solução perfeitamente adaptada",
          "Escalabilidade garantida",
          "ROI maximizado",
          "Vantagem competitiva"
        ]
      }
    },
    about: {
      title: "Liderando a Revolução",
      subtitle: "Digital de Angola",
      description1: "Alio é a síntese da inovação, dedicação e paixão pelo mundo digital. Como ponte entre ideias e resultados tangíveis, dedicamos nosso tempo e expertise para transformar visões em soluções digitais sob medida.",
      description2: "Com um time de profissionais altamente qualificados, a Alio posiciona-se como líder em desenvolvimento de aplicações, analytics, GIS e design gráfico, conectando empresas aos seus objetivos no cenário digital contemporâneo.",
      mission: {
        title: "Missão",
        description: "Guiar nossos clientes em suas jornadas digitais, fornecendo soluções inovadoras que traduzem suas visões em realidades tangíveis. Em cada projeto, nossa missão é superar expectativas, garantindo qualidade, eficiência e autenticidade."
      },
      vision: {
        title: "Visão",
        description: "Ser reconhecida como a empresa de soluções digitais mais confiável e inovadora do mercado, onde ideias se transformam em projetos impactantes que definem o futuro digital."
      },
      values: {
        title: "Valores",
        items: {
          integrity: "Integridade: Manter a honestidade e transparência em todas as nossas ações.",
          innovation: "Inovação: Abraçar a mudança e buscar constantemente novas maneiras de aprimorar.",
          dedication: "Dedicação ao Cliente: Colocar as necessidades dos nossos clientes em primeiro lugar.",
          excellence: "Excelência: Compromisso em entregar somente o melhor, em cada tarefa e projeto.",
          collaboration: "Colaboração: Acreditar no poder do trabalho em equipa para alcançar resultados excepcionais.",
          sustainability: "Sustentabilidade: Promover práticas empresariais responsáveis que beneficiem a comunidade."
        }
      },
      stats: {
        projects: "Projetos Entregues",
        experience: "3+ anos de experiência"
      },
      whyChoose: {
        title: "Porquê Escolher a Alio Analytics?",
        reasons: [
          "Expertise em tecnologia de ponta",
          "Compreensão do mercado local",
          "Soluções escaláveis e sustentáveis",
          "Gestão de projetos dedicada"
        ]
      }
    },
    contact: {
      title: "Vamos Construir Algo Incrível",
      subtitle: "Pronto para dar o próximo passo? Entre em contacto para discutir como podemos ajudá-lo a alcançar os seus objetivos digitais.",
      getInTouch: "Entre em Contacto",
      phone: "Telefone",
      email: "Email",
      location: "Localização",
      form: {
        name: "Nome Completo",
        namePlaceholder: "O seu nome",
        email: "Endereço de Email",
        emailPlaceholder: "seu@email.com",
        service: "Serviço de Interesse",
        selectService: "Selecione um serviço",
        message: "Mensagem",
        messagePlaceholder: "Conte-nos sobre o seu projeto...",
        send: "Enviar Mensagem"
      }
    },
    footer: {
      tagline: "Transformando empresas através de soluções tecnológicas inovadoras",
      copyright: "© 2024 Alio Analytics. Todos os direitos reservados. | Luanda, Angola"
    }
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      about: "About Us",
      contact: "Contact",
      back: "Back",
      solutions: "Solutions"
    },
    hero: {
      title: "Let's Transform Your",
      subtitle: "Vision into Reality",
      description: "Alio is the synthesis of innovation, dedication and passion for the digital world. We transform visions into tailor-made digital solutions with a team of highly qualified professionals.",
      exploreServices: "Explore Services",
      getStarted: "Get Started"
    },
    services: {
      title: "Our Services",
      description: "Comprehensive digital solutions to accelerate your digital transformation and business growth.",
      digitalSolutions: {
        title: "Digital Solutions",
        description: "We create tailor-made digital solutions to meet your needs. Transform ideas into digital results.",
        features: ["Custom Development", "Data Analysis", "Graphic Design", "Digital Consulting"]
      },
      webMobileDev: {
        title: "Web & Mobile Development",
        description: "From developing modern websites to creating intuitive mobile applications, we offer cutting-edge digital solutions.",
        features: ["Web Development", "Mobile Applications", "React & Angular", "Swift & Flutter"]
      },
      itServices: {
        title: "General IT Services",
        description: "We offer consulting, server and network implementation, cybersecurity, and specialized technical support.",
        features: ["Strategic Consulting", "Infrastructure", "Cybersecurity", "Technical Support"]
      },
      analytics: {
        title: "Analytics & Insights",
        description: "Our data analysis services provide valuable insights to make informed and data-driven decisions.",
        features: ["Data Analysis", "Business Intelligence", "Interactive Visualization", "Advanced Modeling"]
      },
      design: {
        title: "Graphic & Digital Design",
        description: "Our design team brings your brand to life through interactive visual concepts and attractive interfaces.",
        features: ["Visual Identity", "Interface Design", "User Experience", "Adobe Creative Cloud"]
      },
      gis: {
        title: "GIS - Geographic Information Systems",
        description: "We offer GIS-based solutions that enable the analysis, visualization and management of geospatial data.",
        features: ["Mapping & Cartography", "Urban Planning", "Environmental Management", "Topographic Survey"]
      }
    },
    solutions: {
      title: "Our Solutions",
      subtitle: "Innovative Applications",
      description: "We develop mobile and web applications that solve real problems and improve people's lives in Angola and beyond.",
      viewAll: "View All Solutions",
      learnMore: "Learn More",
      downloadApp: "Download App",
      comingSoon: "Coming Soon",
      kelesaKlean: {
        title: "Kelesa Klean",
        subtitle: "Waste Management & Eco-points",
        description: "A revolutionary application for intelligent urban waste management, connecting citizens, collection companies and eco-points in an integrated platform.",
        features: [
          "Real-time Eco-point Location",
          "Waste Collection Scheduling",
          "Recycling Rewards System",
          "Personalized Environmental Reports",
          "Collection Notifications",
          "Interactive Recycling Points Map"
        ],
        benefits: [
          "Reduced environmental impact",
          "Cleaner and more sustainable cities",
          "Recycling incentives",
          "Efficient waste management"
        ],
        status: "In Development"
      },
      okwenda: {
        title: "Okwenda",
        subtitle: "Smart Tourism for Angola",
        description: "The first complete digital platform to discover, plan and experience the best that Angola has to offer to local and international tourists.",
        features: [
          "Interactive Digital Tourist Guide",
          "Hotel and Restaurant Reservations",
          "Personalized Itineraries",
          "Augmented Reality for Tourist Spots",
          "Integrated Multilingual Translator",
          "Traveler Community"
        ],
        benefits: [
          "Promotion of national tourism",
          "Authentic and local experiences",
          "Support for local businesses",
          "Facilitates travel planning"
        ],
        status: "In Development"
      },
      mwenhu: {
        title: "Mwenhu",
        subtitle: "Digital Health & Wellness",
        description: "A comprehensive digital health platform that connects patients, healthcare professionals and medical institutions for more accessible and efficient healthcare.",
        features: [
          "Online Medical Consultations",
          "Medical History Management",
          "Appointment Scheduling",
          "Real-time Health Monitoring",
          "Integrated Digital Pharmacy",
          "Medication Reminders"
        ],
        benefits: [
          "Facilitated access to healthcare",
          "Reduced medical costs",
          "Continuous health monitoring",
          "Improved quality of life"
        ],
        status: "In Development"
      },
      customSolutions: {
        title: "Custom Solutions",
        description: "In addition to our main applications, we develop tailor-made solutions to meet the specific needs of your business or organization.",
        features: [
          "Detailed Requirements Analysis",
          "Agile and Iterative Development",
          "Integration with Existing Systems",
          "Continuous Support and Maintenance"
        ],
        benefits: [
          "Perfectly adapted solution",
          "Guaranteed scalability",
          "Maximized ROI",
          "Competitive advantage"
        ]
      }
    },
    about: {
      title: "Leading Angola's",
      subtitle: "Digital Revolution",
      description1: "Alio is the synthesis of innovation, dedication and passion for the digital world. As a bridge between ideas and tangible results, we dedicate our time and expertise to transform visions into tailor-made digital solutions.",
      description2: "With a team of highly qualified professionals, Alio positions itself as a leader in application development, analytics, GIS and graphic design, connecting companies to their objectives in the contemporary digital scenario.",
      mission: {
        title: "Mission",
        description: "Guide our clients on their digital journeys, providing innovative solutions that translate their visions into tangible realities. In each project, our mission is to exceed expectations, ensuring quality, efficiency and authenticity."
      },
      vision: {
        title: "Vision",
        description: "To be recognized as the most reliable and innovative digital solutions company in the market, where ideas are transformed into impactful projects that define the digital future."
      },
      values: {
        title: "Values",
        items: {
          integrity: "Integrity: Maintain honesty and transparency in all our actions.",
          innovation: "Innovation: Embrace change and constantly seek new ways to improve.",
          dedication: "Client Dedication: Put our clients' needs first.",
          excellence: "Excellence: Commitment to deliver only the best, in every task and project.",
          collaboration: "Collaboration: Believe in the power of teamwork to achieve exceptional results.",
          sustainability: "Sustainability: Promote responsible business practices that benefit the community."
        }
      },
      stats: {
        projects: "Projects Delivered",
        experience: "3+ years of experience"
      },
      whyChoose: {
        title: "Why Choose Alio Analytics?",
        reasons: [
          "Cutting-edge technology expertise",
          "Local market understanding",
          "Scalable and sustainable solutions",
          "Dedicated project management"
        ]
      }
    },
    contact: {
      title: "Let's Build Something Amazing",
      subtitle: "Ready to take the next step? Get in touch to discuss how we can help you achieve your digital goals.",
      getInTouch: "Get In Touch",
      phone: "Phone",
      email: "Email",
      location: "Location",
      form: {
        name: "Full Name",
        namePlaceholder: "Your name",
        email: "Email Address",
        emailPlaceholder: "your@email.com",
        service: "Service Interest",
        selectService: "Select a service",
        message: "Message",
        messagePlaceholder: "Tell us about your project...",
        send: "Send Message"
      }
    },
    footer: {
      tagline: "Transforming businesses through innovative technology solutions",
      copyright: "© 2024 Alio Analytics. All rights reserved. | Luanda, Angola"
    }
  }
};

export const languages = [
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
];