export type ProjectStatus = "Live" | "In Progress";

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: ProjectStatus;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  image?: string;
  productIdeas?: string[];
  note?: string;
}

export interface SkillItem {
  name: string;
  isPlaceholder?: boolean;
}

export interface SkillCategory {
  id: string;
  name: string;
  label?: "Learning" | "Tools" | "Currently Exploring" | string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  period?: string;
  description: string;
  isPlaceholder?: boolean;
}

export interface EducationItem {
  institution: string;
  degree: string;
  location: string;
  year: string;
  expectedGraduation?: string;
  cgpa?: string;
  coursework?: string[];
}

export interface AchievementItem {
  title: string;
  description: string;
  isPlaceholder?: boolean;
}

export interface ServiceItem {
  title: string;
  description: string;
  isPlaceholder?: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  fullName: string;
  role: string;
  college: string;
  location: string;
  eyebrow: string;
  headline: string;
  supportingHeadline: string;
  heroBio: string;
  currentlyBuilding: {
    name: string;
    description: string;
    url?: string;
    status: string;
  };
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
    calendar: string;
    resume: string;
  };
  navLinks: NavLink[];
}
