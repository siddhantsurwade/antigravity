import { SITE_LINKS } from "@/src/data/links";

export type ProjectStatus = "Live" | "In Progress";

export interface ProjectLinkItem {
  live?: string;
  github?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  tags: string[];
  links: ProjectLinkItem;
  image?: string;
  featured?: boolean;
  note?: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "nestify",
    title: "Nestify",
    status: "In Progress",
    description:
      "A verified hostel and room-finding platform for students and young professionals, built to reduce rental fraud.",
    tags: ["v0", "Next.js", "Tailwind CSS", "Vercel"],
    note: "Listings in the preview are sample data.",
    featured: true,
    links: {
      live: SITE_LINKS.nestifyLive,
      github: SITE_LINKS.nestifyRepo,
    },
    image: "",
  },
  {
    id: "portfolio",
    title: "My Portfolio Website",
    status: "In Progress",
    description:
      "Personal portfolio built to document what I'm learning, what I'm building, and where I'm going next.",
    tags: ["Next.js", "Tailwind CSS", "React Bits"],
    featured: false,
    links: {
      github: SITE_LINKS.github,
    },
    image: "",
  },
];

