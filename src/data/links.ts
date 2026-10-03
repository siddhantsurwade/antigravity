/**
 * Centralized social, project, and external links for Siddhant Surwade's portfolio.
 * Used across Footer, Navbar, Hero, Projects, and Contact sections.
 */

export const SITE_LINKS = {
  // Profiles & Contact
  github: "https://github.com/siddhantsurwade",
  linkedin: "https://www.linkedin.com/in/siddhant-surwade-596777439/",
  email: "mailto:siddhantsurwade358@gmail.com",
  emailRaw: "siddhantsurwade358@gmail.com",
  resume: "/resume.pdf",

  // Projects
  nestifyRepo: "https://github.com/siddhantsurwade/hostel-finder",
  nestifyLive: "https://hostel-finder-1fby.vercel.app/",

  // TODO: Add personal booking URL (e.g., Cal.com or Calendly) when available
  calendar: "#",
} as const;

export type SiteLinks = typeof SITE_LINKS;
