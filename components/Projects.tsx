"use client";

import React from "react";
import Image from "next/image";
import { PROJECTS_DATA, ProjectItem } from "@/data/projects";
import { ArrowUpRight, Plus, ExternalLink } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function Projects() {
  const featuredProject = PROJECTS_DATA.find((p) => p.featured) || PROJECTS_DATA[0];
  const regularProjects = PROJECTS_DATA.filter((p) => p.id !== featuredProject.id);

  return (
    <section id="projects" className="relative py-24 md:py-32 border-t border-[var(--border)] scroll-mt-20">
      <div className="w-full max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <SectionHeader
          number="02"
          label="PROJECTS"
          title="Selected work"
          subtitle="Things I've built while learning, experimenting, and figuring things out."
        />

        {/* Projects Grid Container */}
        <div className="space-y-6 sm:space-y-8">
          {/* Featured Card: Nestify (Full Width) */}
          {featuredProject && (
            <Reveal step={0} className="w-full">
              <FeaturedProjectCard project={featuredProject} />
            </Reveal>
          )}

          {/* 2-Column Grid: Portfolio + Coming Soon */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {regularProjects.map((project, idx) => (
              <Reveal key={project.id} step={Math.min(idx, 6)} className="h-full">
                <RegularProjectCard project={project} />
              </Reveal>
            ))}

            {/* "More projects coming soon" Placeholder Card */}
            <Reveal step={Math.min(regularProjects.length, 6)} className="h-full">
              <ComingSoonCard />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// Featured Project Card Component (Large full-width layout)
function FeaturedProjectCard({ project }: { project: ProjectItem }) {
  return (
    <article className="project-card card-interactive group relative rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 lg:p-10 overflow-hidden">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12">
        {/* Left Column: Details */}
        <div className="flex-1 w-full flex flex-col justify-between">
          <div>
            {/* Status Badge & Label */}
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] status-dot-pulse" />
                <span>{project.status}</span>
              </span>

              <span className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider">
                Featured Prototype
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-200">
              {project.title}
            </h3>

            {/* Description */}
            <p className="mt-4 text-base sm:text-lg text-[var(--muted)] leading-relaxed">
              {project.description}
            </p>

            {/* Tech Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="tag-chip px-2.5 py-1 rounded-md text-xs font-mono border border-[var(--mint-line)] bg-[var(--mint-soft)] text-[var(--muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Prototype Disclaimer Note */}
            {project.note && (
              <div className="mt-6 p-3 rounded-lg border border-[var(--border)] bg-[var(--background)]/60 text-xs text-[var(--muted)] font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-70" />
                <span>Note: {project.note}</span>
              </div>
            )}
          </div>

          {/* Action Links with primary/secondary button micro-interactions */}
          <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-wrap items-center gap-4">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nestify live preview (opens in a new tab)"
                className="btn-primary group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs sm:text-sm font-medium shadow-xs"
              >
                <span>Live preview</span>
                <ArrowUpRight className="btn-arrow-up-right w-4 h-4" />
              </a>
            )}

            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nestify GitHub repository (opens in a new tab)"
                className="btn-secondary inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-[var(--border)] text-[var(--foreground)] text-xs sm:text-sm font-medium bg-[var(--background)]"
                title="View GitHub repository"
              >
                <GithubIcon className="w-4 h-4 text-[var(--muted)]" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Preview Browser Frame (Full Width Uncropped Screenshot) */}
        <div className="lg:w-[48%] w-full self-center rounded-lg border border-[var(--border)] bg-[var(--background)] flex flex-col overflow-hidden relative group/preview shadow-xs">
          {/* Simulated Browser Bar */}
          <div className="h-8 border-b border-[var(--border)] bg-[var(--surface)] px-3 flex items-center justify-between select-none shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--border)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--border)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--border)]" />
            </div>
            <span className="text-[10px] font-mono text-[var(--muted)] tracking-wider">
              nestify • preview
            </span>
            <div className="w-6" />
          </div>

          {/* Preview Image Area: Natural aspect ratio, full screenshot width visible */}
          <div className="relative w-full overflow-hidden bg-[var(--surface)] flex items-center justify-center">
            <Image
              src="/projects/nestify-preview.webp"
              alt="Nestify homepage showing the search bar and verified hostel filters"
              width={1845}
              height={880}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 550px"
              className="w-full h-auto block transition-transform duration-300 ease-out group-hover:scale-[1.03] group-hover/preview:scale-[1.03] motion-reduce:transform-none"
            />

            {/* Quick click hint to open live preview */}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nestify live preview (opens in a new tab)"
                className="absolute bottom-3 right-3 text-[11px] font-mono text-[var(--foreground)] bg-[var(--surface)]/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-[var(--border)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 flex items-center gap-1 transition-all shadow-xs z-10"
              >
                <span className="link-underline">open demo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

// Regular Project Card Component (For Portfolio & future additions)
function RegularProjectCard({ project }: { project: ProjectItem }) {
  return (
    <article className="project-card card-interactive group relative rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 flex flex-col justify-between h-full">
      <div>
        {/* Status Badge */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] status-dot-pulse" />
            <span>{project.status}</span>
          </span>

          <span className="text-[11px] font-mono text-[var(--muted)]">
            01
          </span>
        </div>

        {/* Thumbnail Preview */}
        <div className="w-full h-36 rounded-lg border border-[var(--border)] bg-[var(--background)] relative overflow-hidden mb-6 group-hover:border-[var(--accent)]/30 transition-colors">
          <Image
            src="/projects/portfolio-preview.webp"
            alt="Homepage of my portfolio website with the sleepy mascot on a sunny hill"
            width={1840}
            height={830}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
            className="w-full h-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
          />
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm sm:text-base text-[var(--muted)] leading-relaxed">
          {project.description}
        </p>

        {/* Tech Tags */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="tag-chip px-2 py-0.5 rounded-md text-[11px] font-mono border border-[var(--mint-line)] bg-[var(--mint-soft)] text-[var(--muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Links */}
      <div className="mt-6 pt-5 border-t border-[var(--border)] flex items-center gap-4">
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} GitHub repository (opens in a new tab)`}
            className="direct-link group/link inline-flex items-center gap-1.5 text-xs font-mono text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span className="link-underline">GitHub</span>
          </a>
        )}

        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live preview (opens in a new tab)`}
            className="btn-interactive group/btn inline-flex items-center gap-1 text-xs font-mono text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors ml-auto"
          >
            <span className="link-underline">Preview</span>
            <ArrowUpRight className="btn-arrow-up-right w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </article>
  );
}

// "More projects coming soon" Placeholder Card
function ComingSoonCard() {
  return (
    <div className="coming-soon-card card-interactive group/coming-soon relative rounded-xl border-2 border-dashed border-[var(--border)] bg-[var(--surface)]/40 p-6 sm:p-8 flex flex-col justify-between items-start h-full">
      <div className="w-full">
        {/* Placeholder Icon / Marker */}
        <div className="w-10 h-10 rounded-lg border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center text-[var(--muted)] mb-6 transition-colors">
          <Plus className="coming-soon-plus w-5 h-5 text-[var(--muted)]" />
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          More projects coming soon
        </h3>

        {/* Supporting description */}
        <p className="mt-3 text-sm sm:text-base text-[var(--muted)] leading-relaxed">
          I&apos;m still building. More experiments, ideas, and projects will appear here as I explore and create.
        </p>
      </div>

      <div className="mt-8 pt-5 border-t border-dashed border-[var(--border)] w-full flex items-center justify-between text-xs font-mono text-[var(--muted)]">
        <span>[NEXT EXPERIMENT]</span>
        <span className="w-2 h-2 rounded-[2px] bg-[var(--accent)] opacity-60" />
      </div>
    </div>
  );
}
