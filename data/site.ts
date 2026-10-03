import { SiteConfig } from "@/types";
import { SITE_LINKS } from "@/src/data/links";

export const SITE_CONFIG: SiteConfig = {
  name: "Siddhant",
  fullName: "Siddhant Mithunkumar Surwade",
  role: "Second-year Computer Engineering Student",
  college: "MGM College of Engineering and Technology",
  location: "Kamothe, Navi Mumbai",
  eyebrow: "COMPUTER ENGINEERING STUDENT • BUILDER • EXPLORER",
  headline: "Hi, I'm Siddhant.",
  supportingHeadline: "I learn by building.",
  heroBio:
    "I'm a second-year Computer Engineering student exploring web development and the many areas of technology that interest me. I learn fastest when I'm building something real.",
  currentlyBuilding: {
    name: "Nestify",
    description: "A verified hostel & room-finding platform for students",
    url: SITE_LINKS.nestifyLive,
    status: "In Progress",
  },
  socialLinks: {
    github: SITE_LINKS.github,
    linkedin: SITE_LINKS.linkedin,
    email: SITE_LINKS.email,
    // TODO: Add personal booking URL (e.g., Cal.com or Calendly) when available
    calendar: SITE_LINKS.calendar,
    resume: SITE_LINKS.resume,
  },
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
};
