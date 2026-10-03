"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/data/site";
import { BuildingMotif } from "./BuildingMotif";
import { Menu, X, ArrowUpRight, FileText, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect active section based on scroll position
      const sections = SITE_CONFIG.navLinks.map((l) => l.href.replace("#", ""));
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Active if section top has reached near header and bottom is still visible
          if (rect.top <= 140 && rect.bottom >= 140) {
            current = `#${section}`;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[var(--background)]/85 backdrop-blur-md border-b border-[var(--border)] shadow-[0_1px_4px_rgba(0,0,0,0.03)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo / Wordmark */}
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-lg sm:text-xl font-semibold tracking-tight text-[var(--foreground)] hover:opacity-90 transition-opacity focus-visible:outline-none rounded-sm"
          >
            <span>{SITE_CONFIG.name}</span>
            <BuildingMotif className="ml-0.5 group-hover:scale-125 transition-transform duration-200" />
          </Link>

          {/* Desktop Navigation Links with Active State & Dot */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-8 text-sm font-medium"
          >
            {SITE_CONFIG.navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`nav-link relative inline-flex items-center gap-1.5 py-1 transition-colors duration-200 ${
                    isActive
                      ? "text-[var(--accent)] font-semibold"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <span className="nav-link-text">{link.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={SITE_CONFIG.socialLinks.resume}
              aria-label="Resume (PDF)"
              className="btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)] rounded-md"
              title="Resume (PDF)"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            {/* TODO: Add personal booking URL (e.g., Cal.com or Calendly) when available */}
            <a
              href={SITE_CONFIG.socialLinks.calendar}
              className="btn-primary group inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-[var(--accent)] border border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white rounded-md"
            >
              <span>Book a call</span>
              <ArrowUpRight className="btn-arrow-up-right w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Right Controls: Hamburger */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-interactive inline-flex items-center justify-center w-9 h-9 rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:text-[var(--accent)] hover:border-[var(--accent)] cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-0 top-16 sm:top-20 bottom-0 z-40 bg-[var(--background)]/98 backdrop-blur-xl border-b border-[var(--border)] md:hidden flex flex-col justify-between p-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-6 pt-4">
              <span className="text-[11px] font-mono tracking-widest uppercase text-[var(--muted)]">
                Navigation
              </span>
              <nav aria-label="Mobile Navigation" className="flex flex-col gap-4">
                {SITE_CONFIG.navLinks.map((link) => {
                  const isActive = activeSection === link.href;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`text-2xl font-medium tracking-tight py-1 flex items-center justify-between transition-colors ${
                        isActive
                          ? "text-[var(--accent)] font-semibold"
                          : "text-[var(--foreground)] hover:text-[var(--accent)]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{link.label}</span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                        )}
                      </div>
                      <span className="text-xs font-mono text-[var(--muted)]">
                        →
                      </span>
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-[var(--border)]">
              <a
                href={SITE_CONFIG.socialLinks.resume}
                aria-label="Resume (PDF)"
                onClick={closeMobileMenu}
                className="btn-secondary w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-md border border-[var(--border)] bg-[var(--surface)] text-sm font-medium text-[var(--foreground)]"
              >
                <FileText className="w-4 h-4 text-[var(--muted)]" />
                <span>Download / View Resume</span>
              </a>

              {/* TODO: Add personal booking URL (e.g., Cal.com or Calendly) when available */}
              <a
                href={SITE_CONFIG.socialLinks.calendar}
                onClick={closeMobileMenu}
                className="btn-primary w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-md border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white bg-transparent text-sm font-medium"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a call</span>
                <ArrowUpRight className="btn-arrow-up-right w-4 h-4" />
              </a>

              <div className="pt-2 text-center text-xs text-[var(--muted)]">
                {SITE_CONFIG.fullName} • {SITE_CONFIG.location}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
