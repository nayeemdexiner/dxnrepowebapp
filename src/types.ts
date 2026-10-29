export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  year: string;
  status: 'Running' | 'Completed';
  gpa?: string;
  board?: string;
  group?: string;
  description: string;
  highlights: string[];
  iconName?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  highlight: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level: number; // percentage
    experience: string;
    icon?: string;
    tag?: string;
  }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Web Development' | 'UI/UX Design' | 'Graphic Design' | 'Logo Design' | 'CNC Design' | 'Social Media Design';
  description: string;
  image: string;
  link: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
  tags: string[];
  featured?: boolean;
  completionYear: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  deliverables: string[];
  popular?: boolean;
}

export interface SocialMediaItem {
  name: string;
  platform: 'facebook' | 'instagram' | 'tiktok' | 'linkedin' | 'telegram' | 'x' | 'threads' | 'whatsapp' | 'github' | 'youtube';
  url: string;
  handle: string;
  color: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
  description: string;
  icon: string;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  mapEmbedUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}
