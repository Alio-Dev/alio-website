export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface Translation {
  // Navigation
  nav: {
    home: string;
    services: string;
    about: string;
    contact: string;
    back: string;
    solutions: string;
  };
  
  // Hero Section
  hero: {
    title: string;
    subtitle: string;
    description: string;
    exploreServices: string;
    getStarted: string;
  };
  
  // Services Section
  services: {
    title: string;
    description: string;
    digitalSolutions: {
      title: string;
      description: string;
      features: string[];
    };
    webMobileDev: {
      title: string;
      description: string;
      features: string[];
    };
    itServices: {
      title: string;
      description: string;
      features: string[];
    };
    analytics: {
      title: string;
      description: string;
      features: string[];
    };
    design: {
      title: string;
      description: string;
      features: string[];
    };
    gis: {
      title: string;
      description: string;
      features: string[];
    };
  };

  // Solutions Section
  solutions: {
    title: string;
    subtitle: string;
    description: string;
    viewAll: string;
    learnMore: string;
    downloadApp: string;
    comingSoon: string;
    kelesaKlean: {
      title: string;
      subtitle: string;
      description: string;
      features: string[];
      benefits: string[];
      status: string;
    };
    okwenda: {
      title: string;
      subtitle: string;
      description: string;
      features: string[];
      benefits: string[];
      status: string;
    };
    mwenhu: {
      title: string;
      subtitle: string;
      description: string;
      features: string[];
      benefits: string[];
      status: string;
    };
    customSolutions: {
      title: string;
      description: string;
      features: string[];
      benefits: string[];
    };
  };
  
  // About Section
  about: {
    title: string;
    subtitle: string;
    description1: string;
    description2: string;
    mission: {
      title: string;
      description: string;
    };
    vision: {
      title: string;
      description: string;
    };
    values: {
      title: string;
      items: {
        integrity: string;
        innovation: string;
        dedication: string;
        excellence: string;
        collaboration: string;
        sustainability: string;
      };
    };
    stats: {
      projects: string;
      experience: string;
    };
    whyChoose: {
      title: string;
      reasons: string[];
    };
  };
  
  // Contact Section
  contact: {
    title: string;
    subtitle: string;
    getInTouch: string;
    phone: string;
    email: string;
    location: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      service: string;
      selectService: string;
      message: string;
      messagePlaceholder: string;
      send: string;
    };
  };
  
  // Footer
  footer: {
    tagline: string;
    copyright: string;
  };
}