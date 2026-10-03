"use client";

import React, { useState } from "react";
import { SITE_LINKS } from "@/src/data/links";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { Mail, FileText, ArrowUp, Copy, Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { FooterMascot } from "./FooterMascot";
import { FooterIllustration } from "./FooterIllustration";

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(SITE_LINKS.emailRaw);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = SITE_LINKS.emailRaw;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // In case clipboard permissions are denied
      setCopied(false);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer id="contact" className="relative w-full overflow-visible transition-colors scroll-mt-20">
      {/* Full-width scene banner on top (NOT animated, left untouched) */}
      <div
        className="relative z-20 w-full overflow-visible leading-none"
        style={
          {
            "--mascot-x": "14%",
            "--mascot-y": "87.4%",
          } as React.CSSProperties
        }
      >
        {/* Mascot sitting on the ridge of the darker front hill */}
        <div
          style={{
            left: "var(--mascot-x, 14%)",
            top: "var(--mascot-y, 87.4%)",
            transform: "translate(-50%, -70%)",
          }}
          className="absolute z-20 w-[75px] sm:w-[100px] md:w-[130px] select-none"
        >
          <FooterMascot />
        </div>

        <FooterIllustration className="w-full h-auto pointer-events-none" />
      </div>

      {/* Footer content area directly below banner */}
      <div className="w-full bg-[var(--footer-bg)] py-16 sm:py-20 md:py-24 transition-colors relative z-10">
        <div className="w-full max-w-6xl mx-auto px-5 sm:px-8">
          {/* Step 0: "Thanks for stopping by." heading */}
          <Reveal step={0}>
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--foreground)] leading-tight">
                Thanks for stopping by.
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-[var(--muted)] font-normal leading-relaxed">
                I&apos;m learning in public, so check back as the site grows.
              </p>
            </div>
          </Reveal>

          {/* Step 1: The line below it */}
          <Reveal step={1}>
            <div className="mt-10 sm:mt-12 border-t border-[var(--border)]" />
          </Reveal>

          {/* Step 2: Links row + Back to top */}
          <Reveal step={2}>
            <div className="pt-8 sm:pt-10 flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8">
              {/* Link Row */}
              <div className="flex flex-wrap items-center gap-y-4 gap-x-6 sm:gap-x-8 text-xs sm:text-sm">
                {/* GitHub */}
                <a
                  href={SITE_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in a new tab)"
                  className="direct-link group inline-flex items-center gap-2 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors py-1 cursor-pointer"
                >
                  <GithubIcon className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors shrink-0" />
                  <span className="link-underline font-medium">GitHub</span>
                  <span className="direct-link-arrow text-[11px] text-[var(--muted)] opacity-60 font-mono transition-transform duration-200">↗</span>
                </a>

                {/* LinkedIn */}
                <a
                  href={SITE_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile (opens in a new tab)"
                  className="direct-link group inline-flex items-center gap-2 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors py-1 cursor-pointer"
                >
                  <LinkedinIcon className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors shrink-0" />
                  <span className="link-underline font-medium">LinkedIn</span>
                  <span className="direct-link-arrow text-[11px] text-[var(--muted)] opacity-60 font-mono transition-transform duration-200">↗</span>
                </a>

                {/* Email with visible text & copy button */}
                <div className="inline-flex items-center gap-1.5 sm:gap-2">
                  <a
                    href={SITE_LINKS.email}
                    aria-label={`Send email to ${SITE_LINKS.emailRaw}`}
                    className="direct-link group inline-flex items-center gap-2 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors py-1 cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors shrink-0" />
                    <span className="link-underline font-mono text-xs sm:text-sm">
                      {SITE_LINKS.emailRaw}
                    </span>
                  </a>

                  {/* Accessible copy button */}
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label={copied ? "Email copied to clipboard" : "Copy email address to clipboard"}
                    title={copied ? "Copied to clipboard!" : "Copy email address"}
                    className="btn-interactive inline-flex items-center justify-center p-1.5 rounded-md border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-[var(--muted)] bg-[var(--surface)] transition-all cursor-pointer shadow-2xs"
                  >
                    {copied ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-[var(--accent)] px-0.5 animate-pop-spring">
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </span>
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Resume */}
                <a
                  href={SITE_LINKS.resume}
                  aria-label="Resume (PDF)"
                  className="direct-link group inline-flex items-center gap-2 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors py-1 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors shrink-0" />
                  <span className="link-underline font-medium">Resume</span>
                  <span className="direct-link-arrow text-[11px] text-[var(--muted)] opacity-60 font-mono transition-transform duration-200">↗</span>
                </a>
              </div>

              {/* Back to top with up-arrow icon nudging 2px on hover */}
              <div className="self-start md:self-auto pt-2 md:pt-0">
                <button
                  type="button"
                  onClick={handleScrollToTop}
                  aria-label="Scroll back to top of page"
                  className="back-to-top-btn group inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer py-1"
                >
                  <span className="link-underline">Back to top</span>
                  <span className="back-to-top-circle w-7 h-7 rounded-full border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center transition-all shadow-2xs">
                    <ArrowUp className="w-3.5 h-3.5 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors" />
                  </span>
                </button>
              </div>
            </div>
          </Reveal>

          {/* Step 3: Copyright & build credit in monospace */}
          <Reveal step={3}>
            <div className="mt-12 sm:mt-16 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-[var(--muted)]">
              <div>© 2026 Siddhant Surwade</div>
              <div>Built with Next.js, Tailwind &amp; Antigravity</div>
            </div>
          </Reveal>
        </div>
      </div>
    </footer>
  );
}
