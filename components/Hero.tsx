"use client";

import React from "react";
import { SITE_CONFIG } from "@/data/site";
import { BuildingMotif } from "./BuildingMotif";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { GradientWaves } from "./GradientWaves";
import { TechText } from "./TechText";
import { Reveal } from "./Reveal";
import { HeroMascotScene } from "./HeroMascotScene";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center py-12 sm:py-20 overflow-hidden">
      {/* Dynamic Gradient Waves Background from React Bits */}
      <div
        className="absolute inset-0 pointer-events-auto"
        aria-hidden="true"
      >
        <GradientWaves
          horizonColor="#FAF9F6"
          waveColor="#E4572E"
          crestColor="#FFFFFF"
          speed={0.35}
          amplitude={2.3}
          waveScale={0.55}
          waveRatio={0.9}
          swell={32}
          turbulence={18}
          tilt={1.12}
          zoom={1.05}
          height={5.2}
          fogDepth={15}
          detail="medium"
          brightness={1.02}
          opacity={0.28}
          mouseInteraction={true}
          parallaxStrength={0.45}
          grain={true}
          grainIntensity={0.035}
        />
      </div>

      {/* Subtle Technical Grid Background Overlay */}
      <div
        className="absolute inset-0 hero-grid-pattern pointer-events-none opacity-60"
        aria-hidden="true"
      />

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8">
        <div className="w-full flex flex-col items-start">
          {/* Hero Main Content Area with Mascot Scene */}
          <div className="relative w-full pb-10 sm:pb-12">
            {/* Left Content Column */}
            <div className="relative z-10 w-full flex flex-col items-start">
              {/* 1. Eyebrow Pill */}
              <Reveal step={0} immediate uncapped className="mb-5 sm:mb-7">
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-sm text-[11px] sm:text-xs font-mono tracking-wider text-[var(--muted)] shadow-xs">
                  <BuildingMotif pulse />
                  <span className="font-medium text-[var(--foreground)]">
                    {SITE_CONFIG.eyebrow}
                  </span>
                </div>
              </Reveal>

              {/* 2. "Hi, I'm" */}
              <Reveal step={1} immediate uncapped>
                <span className="text-xs sm:text-sm font-mono text-[var(--muted)] tracking-wider uppercase mb-1 block">
                  Hi, I&apos;m
                </span>
              </Reveal>

              {/* 3. Name Wrapper with TechText */}
              <Reveal
                step={2}
                immediate
                uncapped
                className="w-full h-auto overflow-visible -ml-0.5 sm:-ml-1 pb-[0.1em]"
              >
                <TechText
                  text="Siddhant Surwade"
                  fontWeight={700}
                  letterSpacing={-0.04}
                  align="left"
                  color="#14110F"
                  accentColor="#E4572E"
                  reveal="letter"
                  dashLength={4}
                  dashGap={2}
                  specks={14}
                  selection={true}
                  labels={true}
                  draggable={true}
                  sweep={true}
                  speed={0.9}
                />
              </Reveal>

              {/* 4. Orange Tagline */}
              <Reveal step={3} immediate uncapped className="mt-3 sm:mt-4">
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--accent)] leading-tight">
                  {SITE_CONFIG.supportingHeadline}
                </p>
              </Reveal>

              {/* 5. Paragraph Body Copy */}
              <Reveal step={4} immediate uncapped className="mt-6">
                <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed max-w-2xl font-normal">
                  {SITE_CONFIG.heroBio}
                </p>
              </Reveal>

              {/* 6. Currently Building Status Detail */}
              <Reveal step={5} immediate uncapped className="mt-8">
                <a
                  href={SITE_CONFIG.currentlyBuilding.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Nestify live preview (opens in a new tab)"
                  className="hero-building-pill group inline-flex items-center gap-3 px-3.5 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-sm text-xs sm:text-sm text-[var(--muted)] cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)] status-dot-pulse" />
                    <span>Currently building:</span>
                  </span>
                  <span className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                    {SITE_CONFIG.currentlyBuilding.name}
                  </span>
                  <span className="hidden sm:inline text-xs text-[var(--muted)] border-l border-[var(--border)] pl-3">
                    {SITE_CONFIG.currentlyBuilding.description}
                  </span>
                  <ArrowUpRight className="btn-arrow-up-right w-3.5 h-3.5 text-[var(--muted)] group-hover:text-[var(--accent)] transition-all" />
                </a>
              </Reveal>

              {/* 7. Primary and Secondary CTA Buttons */}
              <Reveal
                step={6}
                immediate
                uncapped
                className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto"
              >
                <a
                  href="#projects"
                  className="btn-primary group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-medium shadow-sm"
                >
                  <span>View my work</span>
                  <ArrowDown className="btn-arrow-down w-4 h-4" />
                </a>

                <a
                  href="#contact"
                  className="btn-secondary group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md border border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-sm text-[var(--foreground)] text-sm font-medium"
                >
                  <span>Let&apos;s talk</span>
                  <ArrowUpRight className="btn-arrow-up-right w-4 h-4 opacity-70" />
                </a>
              </Reveal>
            </div>

            {/* Hero Mascot Scene (with breathing mascot, drifting clouds, floating z's and speech bubble) */}
            <div className="hidden md:block absolute right-0 bottom-0 z-0 w-[420px] lg:w-[480px] xl:w-[560px]">
              <HeroMascotScene />
            </div>
          </div>

          {/* 8. Compact Social & Resume Links */}
          <Reveal
            step={7}
            immediate
            uncapped
            className="pt-8 border-t border-[var(--border)] w-full flex flex-wrap items-center gap-6 text-xs sm:text-sm text-[var(--muted)]"
          >
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted)]">
              Direct Links
            </span>

            <a
              href={SITE_CONFIG.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in a new tab)"
              className="direct-link group inline-flex items-center gap-1.5 hover:text-[var(--foreground)] transition-colors py-1 cursor-pointer"
            >
              <GithubIcon className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors" />
              <span className="link-underline">GitHub</span>
              <span className="direct-link-arrow text-[10px] text-[var(--muted)] opacity-60 font-mono transition-transform duration-200">
                ↗
              </span>
            </a>

            <a
              href={SITE_CONFIG.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in a new tab)"
              className="direct-link group inline-flex items-center gap-1.5 hover:text-[var(--foreground)] transition-colors py-1 cursor-pointer"
            >
              <LinkedinIcon className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors" />
              <span className="link-underline">LinkedIn</span>
              <span className="direct-link-arrow text-[10px] text-[var(--muted)] opacity-60 font-mono transition-transform duration-200">
                ↗
              </span>
            </a>

            <a
              href={SITE_CONFIG.socialLinks.resume}
              aria-label="Resume (PDF)"
              className="direct-link group inline-flex items-center gap-1.5 hover:text-[var(--foreground)] transition-colors py-1 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors" />
              <span className="link-underline">Resume (PDF)</span>
              <span className="direct-link-arrow text-[10px] text-[var(--muted)] opacity-60 font-mono transition-transform duration-200">
                ↗
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
