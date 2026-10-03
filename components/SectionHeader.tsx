import React from "react";
import { Reveal } from "./Reveal";

export interface SectionHeaderProps {
  number: string;
  label: string;
  title: string;
  subtitle?: string;
  marker?: "line" | "dot";
  className?: string;
}

/**
 * Standard portfolio section numbering & labels:
 * 01 / ABOUT
 * 02 / PROJECTS
 * 03 / SKILLS
 * 04 / EXPERIENCE
 * 05 / EDUCATION
 * 06 / ACHIEVEMENTS
 * 07 / SERVICES
 * 08 / CONTACT
 */
export const SECTION_METADATA = {
  about: { number: "01", label: "ABOUT" },
  projects: { number: "02", label: "PROJECTS" },
  skills: { number: "03", label: "SKILLS" },
  experience: { number: "04", label: "EXPERIENCE" },
  education: { number: "05", label: "EDUCATION" },
  achievements: { number: "06", label: "ACHIEVEMENTS" },
  services: { number: "07", label: "SERVICES" },
  contact: { number: "08", label: "CONTACT" },
} as const;

export function SectionHeader({
  number,
  label,
  title,
  subtitle,
  marker = "line",
  className = "",
}: SectionHeaderProps) {
  // Format single-digit numbers to two digits (e.g., '1' -> '01')
  const formattedNumber = number.length === 1 ? `0${number}` : number;
  const formattedLabel = label.toUpperCase();

  return (
    <div className={`mb-12 sm:mb-16 ${className}`}>
      {/* Step 0: Monospace label with orange dash drawing in */}
      <Reveal step={0}>
        <div className="flex items-center gap-2.5 mb-2.5 sm:mb-3">
          {marker === "dot" ? (
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0"
              aria-hidden="true"
            />
          ) : (
            <span
              className="section-dash inline-block w-3 sm:w-3.5 h-[2px] rounded-full bg-[var(--accent)] shrink-0"
              aria-hidden="true"
            />
          )}
          <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted)] select-none">
            {formattedNumber} / {formattedLabel}
          </span>
        </div>
      </Reveal>

      {/* Step 1: Main H2 Heading */}
      <Reveal step={1}>
        <h2 className="text-[clamp(1.85rem,4vw,3.25rem)] font-bold tracking-tight text-[var(--foreground)] leading-[1.15]">
          {title}
        </h2>
      </Reveal>

      {/* Step 2: Optional one-line muted subtitle below */}
      {subtitle && (
        <Reveal step={2}>
          <p className="mt-3 text-base sm:text-lg text-[var(--muted)] max-w-2xl font-normal leading-relaxed">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
