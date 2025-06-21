export interface Translations {
  navigation: {
    home: string;
    experience: string;
    projects: string;
    skills: string;
    contact: string;
  };
  home: {
    title: string;
    subtitle: string;
    viewProjects: string;
  };
  projects: {
    title: string;
    description: string;
  };
  experience: {
    title: string;
    jobs: {
      techcorp: {
        company: string;
        role: string;
        duration: string;
        location: string;
        responsibilities: string[];
      };
      innosoft: {
        company: string;
        role: string;
        duration: string;
        location: string;
        responsibilities: string[];
      };
      creative: {
        company: string;
        role: string;
        duration: string;
        location: string;
        responsibilities: string[];
      };
    };
  };
  skills: {
    title: string;
    description: string;
    frontend: {
      title: string;
      description: string;
    };
    backend: {
      title: string;
      description: string;
    };
    fullstack: {
      title: string;
      description: string;
    };
    design: {
      title: string;
      description: string;
    };
  };
  contact: {
    title: string;
    description: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
    downloadCV: string;
    inspirational: string;
  };
  language: {
    es: string;
    en: string;
  };
} 