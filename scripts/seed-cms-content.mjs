// One-time migration: moves the 6 hardcoded service pages, legal.ts and
// Footer's contact/social info into the new alio_ CMS tables, so /gestao
// can edit them and the public pages can fetch them at runtime instead of
// requiring a code change + deploy.
//
// EN copy for the service pages didn't exist before (those pages were
// PT-only) — authored here so the bilingual toggle has real content in
// both languages from day one, not empty English fields.
//
// Run with: node --env-file=.env.local scripts/seed-cms-content.mjs
// Idempotent: upserts on slug/kind, safe to re-run.

import { createClient } from '@supabase/supabase-js';

const url = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceRoleKey) {
  console.error('Missing VITE_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY. Run with --env-file=.env.local');
  process.exit(1);
}
const supabase = createClient(url, serviceRoleKey);

const L = (pt, en) => ({ pt, en });

const SERVICE_PAGES = [
  {
    slug: 'digital-solutions',
    icon: 'Code',
    gradient: 'bg-gradient-to-br from-blue-900 via-blue-800 to-purple-800',
    service_type: 'digital',
    display_order: 0,
    title: L('Soluções Digitais', 'Digital Solutions'),
    subtitle: L('Transformar Ideias em Resultados Digitais', 'Turning Ideas into Digital Results'),
    description: L(
      'Criamos soluções digitais sob medida para atender às suas necessidades. Nossa expertise abrange desenvolvimento digital, análise de dados, design gráfico e muito mais.',
      'We create custom digital solutions tailored to your needs. Our expertise spans digital development, data analysis, graphic design and much more.',
    ),
    features_title: L('Como Transformamos Suas Ideias', 'How We Transform Your Ideas'),
    features: [
      {
        title: L('Desenvolvimento Personalizado', 'Custom Development'),
        description: L(
          'Criamos soluções digitais sob medida que atendem perfeitamente às necessidades específicas do seu negócio, garantindo funcionalidade e eficiência máximas.',
          "We build tailor-made digital solutions that perfectly match your business's specific needs, ensuring maximum functionality and efficiency.",
        ),
      },
      {
        title: L('Análise de Dados Avançada', 'Advanced Data Analysis'),
        description: L(
          'Transformamos dados brutos em insights valiosos através de análises profundas que orientam decisões estratégicas e impulsionam o crescimento.',
          'We turn raw data into valuable insights through in-depth analysis that guides strategic decisions and drives growth.',
        ),
      },
      {
        title: L('Design Gráfico Inovador', 'Innovative Graphic Design'),
        description: L(
          'Desenvolvemos identidades visuais marcantes e materiais gráficos que comunicam efetivamente a essência da sua marca ao público-alvo.',
          "We develop striking visual identities and graphic materials that effectively communicate your brand's essence to your target audience.",
        ),
      },
      {
        title: L('Consultoria Digital Estratégica', 'Strategic Digital Consulting'),
        description: L(
          'Oferecemos orientação especializada para navegar no mundo digital, identificando oportunidades e definindo estratégias de transformação digital.',
          'We offer expert guidance to navigate the digital world, identifying opportunities and defining digital transformation strategies.',
        ),
      },
    ],
    technologies: ['React', 'Angular', 'Vue.js', 'Node.js', 'Python', 'Django', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'Git'],
  },
  {
    slug: 'web-mobile',
    icon: 'Smartphone',
    gradient: 'bg-gradient-to-br from-teal-900 via-teal-800 to-blue-800',
    service_type: 'web-mobile',
    display_order: 1,
    title: L('Desenvolvimento Web e Mobile', 'Web & Mobile Development'),
    subtitle: L('Criar Experiências Digitais Impactantes', 'Creating Impactful Digital Experiences'),
    description: L(
      'Do desenvolvimento de sites modernos à criação de aplicativos móveis intuitivos, oferecemos soluções digitais de última geração para cativar e envolver seus usuários.',
      'From building modern websites to creating intuitive mobile apps, we deliver cutting-edge digital solutions to captivate and engage your users.',
    ),
    features_title: L('Nossas Especialidades em Desenvolvimento', 'Our Development Specialties'),
    features: [
      {
        title: L('Desenvolvimento Web Moderno', 'Modern Web Development'),
        description: L(
          'Criamos websites responsivos e performáticos utilizando as mais recentes tecnologias web, garantindo uma experiência excepcional em todos os dispositivos.',
          'We build responsive, high-performance websites using the latest web technologies, ensuring an exceptional experience on every device.',
        ),
      },
      {
        title: L('Aplicações Mobile Nativas', 'Native Mobile Apps'),
        description: L(
          'Desenvolvemos aplicativos móveis nativos para iOS e Android que oferecem performance superior e integração perfeita com as funcionalidades do dispositivo.',
          'We develop native iOS and Android apps that deliver superior performance and seamless integration with device features.',
        ),
      },
      {
        title: L('Progressive Web Apps (PWA)', 'Progressive Web Apps (PWA)'),
        description: L(
          'Combinamos o melhor dos mundos web e mobile com PWAs que funcionam offline, são instaláveis e oferecem experiência similar a apps nativos.',
          'We combine the best of web and mobile with PWAs that work offline, are installable, and offer a native-app-like experience.',
        ),
      },
      {
        title: L('Interface e Experiência do Utilizador', 'Interface & User Experience'),
        description: L(
          'Desenhamos interfaces intuitivas e experiências envolventes que priorizam a usabilidade e satisfação do utilizador final.',
          'We design intuitive interfaces and engaging experiences that prioritize usability and end-user satisfaction.',
        ),
      },
    ],
    technologies: ['React', 'Angular', 'Vue.js', 'React Native', 'Flutter', 'Swift', 'Kotlin', 'Node.js', 'Express', 'MongoDB', 'Firebase', 'TypeScript'],
  },
  {
    slug: 'it-services',
    icon: 'Shield',
    gradient: 'bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900',
    service_type: 'it-services',
    display_order: 2,
    title: L('Serviços Gerais de TI', 'General IT Services'),
    subtitle: L('Capacitar Infraestrutura Digital', 'Empowering Digital Infrastructure'),
    description: L(
      'Oferecemos consultoria, implementação de servidores e redes, segurança cibernética, monitoramento e suporte técnico para manter seus sistemas em pleno funcionamento.',
      'We offer consulting, server and network implementation, cybersecurity, monitoring and technical support to keep your systems running at full capacity.',
    ),
    features_title: L('Nossos Serviços de TI Especializados', 'Our Specialized IT Services'),
    features: [
      {
        title: L('Consultoria Estratégica de TI', 'Strategic IT Consulting'),
        description: L(
          'Fornecemos orientação especializada para alinhar a tecnologia com os objetivos de negócio, otimizando processos e maximizando o retorno sobre investimento.',
          'We provide expert guidance to align technology with business goals, optimizing processes and maximizing return on investment.',
        ),
      },
      {
        title: L('Implementação de Infraestrutura', 'Infrastructure Implementation'),
        description: L(
          'Desenhamos e implementamos infraestruturas robustas e escaláveis, incluindo servidores, redes e sistemas de armazenamento de dados.',
          'We design and implement robust, scalable infrastructure, including servers, networks and data storage systems.',
        ),
      },
      {
        title: L('Segurança e Proteção Cibernética', 'Cybersecurity & Protection'),
        description: L(
          'Protegemos seus ativos digitais com soluções avançadas de segurança, incluindo firewalls, sistemas de detecção de intrusão e políticas de segurança.',
          'We protect your digital assets with advanced security solutions, including firewalls, intrusion detection systems and security policies.',
        ),
      },
      {
        title: L('Suporte Técnico Especializado', 'Specialized Technical Support'),
        description: L(
          'Oferecemos suporte técnico 24/7 com uma equipa de especialistas prontos para resolver qualquer desafio tecnológico que possa surgir.',
          'We offer 24/7 technical support with a team of specialists ready to resolve any technology challenge that may arise.',
        ),
      },
    ],
    technologies: ['Linux', 'Windows Server', 'VMware', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Cisco', 'Fortinet', 'MySQL', 'PostgreSQL', 'Active Directory'],
  },
  {
    slug: 'analytics',
    icon: 'BarChart3',
    gradient: 'bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800',
    service_type: 'analytics',
    display_order: 3,
    title: L('Analytics e Insights', 'Analytics & Insights'),
    subtitle: L('Transformar Dados em Estratégias Inteligentes', 'Turning Data into Smart Strategies'),
    description: L(
      'Nossos serviços de análise de dados e inteligência de negócios fornecem insights valiosos para tomar decisões informadas e orientadas por dados.',
      'Our data analytics and business intelligence services deliver valuable insights for informed, data-driven decision-making.',
    ),
    features_title: L('Como Transformamos Dados em Valor', 'How We Turn Data into Value'),
    features: [
      {
        title: L('Coleta e Limpeza de Dados', 'Data Collection & Cleaning'),
        description: L(
          'Implementamos processos robustos de coleta e tratamento de dados, garantindo qualidade e consistência para análises precisas e confiáveis.',
          'We implement robust data collection and processing pipelines, ensuring quality and consistency for accurate, reliable analysis.',
        ),
      },
      {
        title: L('Análise Exploratória e Preditiva', 'Exploratory & Predictive Analysis'),
        description: L(
          'Utilizamos técnicas avançadas de análise para descobrir padrões ocultos nos dados e criar modelos preditivos que antecipam tendências futuras.',
          'We use advanced analytical techniques to uncover hidden patterns in data and build predictive models that anticipate future trends.',
        ),
      },
      {
        title: L('Visualização de Dados Interativos', 'Interactive Data Visualization'),
        description: L(
          'Criamos dashboards e relatórios visuais interativos que transformam dados complexos em insights claros e acionáveis para tomada de decisão.',
          'We create interactive dashboards and visual reports that turn complex data into clear, actionable insights for decision-making.',
        ),
      },
      {
        title: L('Business Intelligence Avançado', 'Advanced Business Intelligence'),
        description: L(
          'Desenvolvemos soluções de BI que integram múltiplas fontes de dados, fornecendo uma visão holística do desempenho do negócio.',
          'We develop BI solutions that integrate multiple data sources, providing a holistic view of business performance.',
        ),
      },
    ],
    technologies: ['Python', 'R', 'SQL', 'Power BI', 'Tableau', 'TensorFlow', 'Pandas', 'NumPy', 'Apache Spark', 'Elasticsearch', 'Kibana', 'D3.js'],
  },
  {
    slug: 'design',
    icon: 'Palette',
    gradient: 'bg-gradient-to-br from-pink-900 via-rose-800 to-orange-800',
    service_type: 'design',
    display_order: 4,
    title: L('Design Gráfico e Digital', 'Graphic & Digital Design'),
    subtitle: L('Design Gráfico e Digital', 'Graphic & Digital Design'),
    description: L(
      'Nossa equipe de design gráfico e digital dá vida à sua marca por meio de conceitos visuais interativos e interfaces atraentes para a experiência de usuário envolventes.',
      'Our graphic and digital design team brings your brand to life through interactive visual concepts and attractive interfaces for engaging user experiences.',
    ),
    features_title: L('Nossa Abordagem Criativa', 'Our Creative Approach'),
    features: [
      {
        title: L('Desenvolvimento de Identidade Visual', 'Visual Identity Development'),
        description: L(
          'Criamos identidades visuais únicas e memoráveis que capturam a essência da sua marca e comunicam efetivamente com o seu público-alvo.',
          "We create unique, memorable visual identities that capture your brand's essence and communicate effectively with your target audience.",
        ),
      },
      {
        title: L('Design de Interface Intuitiva', 'Intuitive Interface Design'),
        description: L(
          'Desenvolvemos interfaces digitais que priorizam a experiência do utilizador, combinando estética moderna com funcionalidade excepcional.',
          'We develop digital interfaces that prioritize user experience, combining modern aesthetics with exceptional functionality.',
        ),
      },
      {
        title: L('Experiência do Utilizador Otimizada', 'Optimized User Experience'),
        description: L(
          'Aplicamos princípios de UX design para criar jornadas digitais fluidas e envolventes que convertem visitantes em clientes satisfeitos.',
          'We apply UX design principles to create smooth, engaging digital journeys that convert visitors into satisfied customers.',
        ),
      },
      {
        title: L('Produção de Arte Final', 'Final Artwork Production'),
        description: L(
          'Entregamos materiais gráficos finalizados e prontos para implementação, mantendo os mais altos padrões de qualidade e consistência visual.',
          'We deliver finished, implementation-ready graphic materials, upholding the highest standards of quality and visual consistency.',
        ),
      },
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'Sketch', 'Adobe XD', 'InVision', 'Principle', 'After Effects', 'Illustrator', 'Photoshop', 'InDesign', 'Framer', 'Webflow'],
  },
  {
    slug: 'gis',
    icon: 'Map',
    gradient: 'bg-gradient-to-br from-green-900 via-emerald-800 to-teal-800',
    service_type: 'gis',
    display_order: 5,
    title: L('GIS - Sistemas de Informação Geográfica', 'GIS — Geographic Information Systems'),
    subtitle: L('Soluções Espaciais Inteligentes', 'Smart Spatial Solutions'),
    description: L(
      'Oferecemos soluções baseadas em SIG que permitem a análise, visualização e gestão de dados geoespaciais. Desde mapeamento até gestão ambiental, nossos serviços ajudam a tomar decisões informadas e eficazes.',
      'We offer GIS-based solutions for the analysis, visualization and management of geospatial data. From mapping to environmental management, our services help you make informed, effective decisions.',
    ),
    features_title: L('Nossas Especialidades em GIS', 'Our GIS Specialties'),
    features: [
      {
        title: L('Mapeamento e Cartografia Avançada', 'Advanced Mapping & Cartography'),
        description: L(
          'Criamos mapas precisos e detalhados utilizando tecnologias de ponta, incluindo levantamentos topográficos e cartografia digital de alta qualidade.',
          'We create precise, detailed maps using cutting-edge technology, including topographic surveys and high-quality digital cartography.',
        ),
      },
      {
        title: L('Planeamento Urbano e Territorial', 'Urban & Territorial Planning'),
        description: L(
          'Fornecemos soluções GIS para planeamento urbano, gestão territorial e desenvolvimento sustentável, apoiando decisões estratégicas de ordenamento.',
          'We provide GIS solutions for urban planning, land management and sustainable development, supporting strategic land-use decisions.',
        ),
      },
      {
        title: L('Gestão Ambiental Integrada', 'Integrated Environmental Management'),
        description: L(
          'Desenvolvemos sistemas para monitorização ambiental, estudos de impacto, gestão de recursos naturais e implementação de políticas ambientais.',
          'We develop systems for environmental monitoring, impact studies, natural resource management and environmental policy implementation.',
        ),
      },
      {
        title: L('Análise Geoespacial Avançada', 'Advanced Geospatial Analysis'),
        description: L(
          'Realizamos análises espaciais complexas, modelação geográfica e criação de dashboards interativos para visualização de dados geoespaciais.',
          'We perform complex spatial analysis, geographic modeling and build interactive dashboards for geospatial data visualization.',
        ),
      },
    ],
    technologies: ['ArcGIS', 'QGIS', 'PostGIS', 'GPS', 'Drones', 'Remote Sensing', 'Mapbox', 'Leaflet', 'GeoServer', 'FME', 'AutoCAD', 'Global Mapper'],
  },
];

// Inlined from src/data/legal.ts (Node can't import .ts directly without a
// loader) — keep these two files in sync if legal.ts changes before this
// seed runs again; after seeding, alio_legal_docs in Supabase is the
// source of truth and legal.ts's export is no longer read by the site.
const COMPANY =
  'Alio Analytics, Lda (NIF 5001021800), Rua 49, Bairro Nova Vida, Edifício E-67, Kilamba Kiaxi, Luanda, Angola';

const PRIVACY = {
  intro: L(
    `Esta Política de Privacidade explica como a ${COMPANY} ("Alio", "nós") recolhe, utiliza e protege os seus dados pessoais quando visita www.alio.ao ou contacta connosco. Tratamos os dados de acordo com a Lei n.º 22/11, de 17 de Junho (Lei da Protecção de Dados Pessoais) e demais legislação aplicável em Angola.`,
    `This Privacy Policy explains how ${COMPANY} ("Alio", "we") collects, uses and protects your personal data when you visit www.alio.ao or contact us. We process data in accordance with Law No. 22/11 of 17 June (Personal Data Protection Law) and other applicable Angolan legislation.`,
  ),
  sections: [
    { heading: L('Responsável pelo tratamento', 'Data controller'), body: L(`A entidade responsável pelo tratamento dos seus dados é a ${COMPANY}. Para qualquer questão sobre esta política, contacte info@alio.ao.`, `The entity responsible for processing your data is ${COMPANY}. For any question about this policy, contact info@alio.ao.`) },
    { heading: L('Dados que recolhemos', 'Data we collect'), body: L('Recolhemos os dados que nos fornece directamente através do formulário de contacto (nome, e-mail, serviço de interesse e mensagem) e dados técnicos recolhidos automaticamente (endereço IP, tipo de navegador e páginas visitadas) através de ferramentas de análise.', 'We collect the data you provide directly through the contact form (name, e-mail, service of interest and message) and technical data collected automatically (IP address, browser type and pages visited) through analytics tools.') },
    { heading: L('Finalidades e fundamento legal', 'Purposes and legal basis'), body: L('Utilizamos os seus dados para responder a pedidos de contacto, prestar os nossos serviços, cumprir obrigações legais e melhorar o site. O tratamento assenta no seu consentimento, na execução de um contrato ou de diligências pré-contratuais, no cumprimento de obrigações legais e no nosso interesse legítimo, conforme aplicável.', 'We use your data to respond to contact requests, deliver our services, comply with legal obligations and improve the site. Processing is based on your consent, the performance of a contract or pre-contractual steps, compliance with legal obligations, and our legitimate interest, as applicable.') },
    { heading: L('Partilha de dados', 'Data sharing'), body: L('Não vendemos os seus dados. Podemos partilhá-los com prestadores de serviços que actuam em nosso nome (por exemplo, alojamento, envio de formulários e análise), sujeitos a obrigações de confidencialidade, e com autoridades quando exigido por lei.', 'We do not sell your data. We may share it with service providers acting on our behalf (for example, hosting, form delivery and analytics), subject to confidentiality obligations, and with authorities where required by law.') },
    { heading: L('Transferências internacionais', 'International transfers'), body: L('Alguns prestadores podem tratar dados fora de Angola. Nesses casos, adoptamos salvaguardas adequadas e cumprimos os requisitos legais aplicáveis à transferência internacional de dados.', 'Some providers may process data outside Angola. In such cases, we adopt appropriate safeguards and comply with the legal requirements applicable to the international transfer of data.') },
    { heading: L('Conservação', 'Retention'), body: L('Conservamos os dados apenas pelo período necessário às finalidades para que foram recolhidos ou conforme exigido por obrigações legais, findo o qual são eliminados ou anonimizados.', 'We keep data only for as long as necessary for the purposes for which it was collected, or as required by legal obligations, after which it is deleted or anonymised.') },
    { heading: L('Segurança', 'Security'), body: L('Aplicamos medidas técnicas e organizativas razoáveis para proteger os seus dados contra acesso, perda ou divulgação não autorizados.', 'We apply reasonable technical and organisational measures to protect your data against unauthorised access, loss or disclosure.') },
    { heading: L('Os seus direitos', 'Your rights'), body: L('Nos termos da Lei n.º 22/11, tem direito de acesso, rectificação, actualização, oposição e eliminação dos seus dados, bem como de retirar o consentimento. Para exercer estes direitos, contacte info@alio.ao.', 'Under Law No. 22/11, you have the right to access, rectify, update, object to and erase your data, as well as to withdraw consent. To exercise these rights, contact info@alio.ao.') },
    { heading: L('Cookies', 'Cookies'), body: L('O site utiliza cookies e tecnologias semelhantes para funcionamento e análise. Pode gerir as preferências de cookies no seu navegador.', 'The site uses cookies and similar technologies for operation and analytics. You can manage cookie preferences in your browser.') },
    { heading: L('Autoridade de controlo', 'Supervisory authority'), body: L('Tem o direito de apresentar reclamação junto da Agência de Proteção de Dados (APD) de Angola, a autoridade nacional de controlo em matéria de protecção de dados pessoais.', 'You have the right to lodge a complaint with the Agência de Proteção de Dados (APD) of Angola, the national supervisory authority for personal data protection.') },
    { heading: L('Alterações', 'Changes'), body: L('Podemos actualizar esta política periodicamente. A versão em vigor será sempre publicada nesta página, com a respectiva data de actualização.', 'We may update this policy from time to time. The version in force will always be published on this page, with its update date.') },
  ],
};

const TERMS = {
  intro: L(
    `Estes Termos e Condições regem a utilização do site www.alio.ao e dos serviços prestados pela ${COMPANY}. Ao aceder ou utilizar o site, aceita ficar vinculado a estes termos.`,
    `These Terms & Conditions govern the use of the www.alio.ao website and the services provided by ${COMPANY}. By accessing or using the site, you agree to be bound by these terms.`,
  ),
  sections: [
    { heading: L('Aceitação dos termos', 'Acceptance of terms'), body: L('A utilização deste site implica a aceitação integral destes termos. Se não concordar, não deverá utilizar o site.', 'Use of this site implies full acceptance of these terms. If you do not agree, you should not use the site.') },
    { heading: L('Serviços', 'Services'), body: L('A Alio presta serviços de software, dados, GIS, design e transformação digital. O âmbito, prazos e condições de cada projecto são definidos em proposta ou contrato específico.', 'Alio provides software, data, GIS, design and digital transformation services. The scope, timelines and conditions of each project are defined in a specific proposal or contract.') },
    { heading: L('Propriedade intelectual', 'Intellectual property'), body: L('A marca, logótipo, textos, design e demais conteúdos deste site são propriedade da Alio ou dos respectivos titulares e estão protegidos por lei. Não é permitida a sua utilização sem autorização prévia.', 'The brand, logo, texts, design and other content on this site are the property of Alio or their respective owners and are protected by law. Their use is not permitted without prior authorisation.') },
    { heading: L('Utilização aceitável', 'Acceptable use'), body: L('Compromete-se a utilizar o site de forma lícita, sem prejudicar o seu funcionamento, a segurança ou os direitos de terceiros.', 'You agree to use the site lawfully, without harming its operation, security or the rights of third parties.') },
    { heading: L('Ligações a terceiros', 'Third-party links'), body: L('O site pode conter ligações para sites de terceiros. Não somos responsáveis pelo conteúdo ou práticas de privacidade desses sites.', 'The site may contain links to third-party sites. We are not responsible for the content or privacy practices of those sites.') },
    { heading: L('Limitação de responsabilidade', 'Limitation of liability'), body: L('O site é fornecido "tal como está". Na medida permitida por lei, a Alio não se responsabiliza por danos indirectos decorrentes da utilização do site.', 'The site is provided "as is". To the extent permitted by law, Alio is not liable for indirect damages arising from the use of the site.') },
    { heading: L('Lei aplicável e foro', 'Governing law and jurisdiction'), body: L('Estes termos regem-se pela lei angolana. Para a resolução de qualquer litígio é competente o foro da Comarca de Luanda, com renúncia a qualquer outro.', 'These terms are governed by Angolan law. Any dispute shall be subject to the courts of the Judicial District of Luanda, waiving any other jurisdiction.') },
    { heading: L('Alterações', 'Changes'), body: L('Podemos alterar estes termos a qualquer momento. A versão em vigor será publicada nesta página, com a respectiva data.', 'We may change these terms at any time. The version in force will be published on this page, with its date.') },
    { heading: L('Contacto', 'Contact'), body: L('Para qualquer questão sobre estes termos, contacte info@alio.ao.', 'For any question about these terms, contact info@alio.ao.') },
  ],
};

const LEGAL_DOCS = { PRIVACY, TERMS };

const SITE_SETTINGS = {
  id: true,
  phone: '+244 923 710 906',
  email: 'info@alio.ao',
  address: 'Urbanização Nova Vida, Rua 49, Luanda, Angola',
  social_links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/alioanalytics/' },
    { label: 'Facebook', href: 'https://www.facebook.com/alioanalytics' },
    { label: 'X', href: 'https://twitter.com/alioanalytics' },
    { label: 'YouTube', href: 'https://www.youtube.com/@alioanalytics' },
  ],
};

async function main() {
  for (const page of SERVICE_PAGES) {
    const { error } = await supabase.from('alio_service_pages').upsert(page, { onConflict: 'slug' });
    if (error) {
      console.error(`service_pages upsert failed for ${page.slug}:`, error.message);
      continue;
    }
    console.log('seeded service page:', page.slug);
  }

  if (LEGAL_DOCS) {
    for (const [kind, doc] of [
      ['privacy', LEGAL_DOCS.PRIVACY],
      ['terms', LEGAL_DOCS.TERMS],
    ]) {
      const { error } = await supabase
        .from('alio_legal_docs')
        .upsert({ kind, intro: doc.intro, sections: doc.sections }, { onConflict: 'kind' });
      if (error) {
        console.error(`legal_docs upsert failed for ${kind}:`, error.message);
        continue;
      }
      console.log('seeded legal doc:', kind);
    }
  } else {
    console.warn('could not import src/data/legal.ts — skipped legal docs seed');
  }

  const { error: settingsError } = await supabase
    .from('alio_site_settings')
    .upsert(SITE_SETTINGS, { onConflict: 'id' });
  if (settingsError) {
    console.error('site_settings upsert failed:', settingsError.message);
  } else {
    console.log('seeded site settings');
  }
}

main();
