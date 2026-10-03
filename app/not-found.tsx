import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { NotFoundMascot } from "@/components/NotFoundMascot";

export const metadata: Metadata = {
  title: "404 — Page not found | Siddhant Surwade",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 py-16 text-center bg-[var(--background)] selection:bg-[var(--accent)] selection:text-white">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center">
        {/* Step 0: The Sleepy Mascot sitting on hill */}
        <Reveal step={0} immediate className="mb-6 sm:mb-8 flex justify-center w-full">
          <NotFoundMascot />
        </Reveal>

        {/* Step 1: Small mono label in site style */}
        <Reveal step={1} immediate className="mb-3 sm:mb-4">
          <div className="flex items-center justify-center gap-2.5">
            <span
              className="section-dash inline-block w-3 sm:w-3.5 h-[2px] rounded-full bg-[var(--accent)] shrink-0"
              aria-hidden="true"
            />
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted)] select-none">
              ERROR / 404
            </span>
          </div>
        </Reveal>

        {/* Step 2: Big bold heading in section heading style */}
        <Reveal step={2} immediate className="mb-4">
          <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-tight text-[var(--foreground)] leading-[1.15]">
            This page is taking a nap.
          </h1>
        </Reveal>

        {/* Step 3: Short line below in muted body colour */}
        <Reveal step={3} immediate className="mb-8 sm:mb-10 max-w-md">
          <p className="text-base sm:text-lg text-[var(--muted)] font-normal leading-relaxed">
            I couldn&apos;t find what you were looking for. Maybe it moved, or maybe it never existed.
          </p>
        </Reveal>

        {/* Step 4: Primary orange button */}
        <Reveal step={4} immediate>
          <Link
            href="/"
            className="btn-primary group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-medium shadow-sm"
          >
            <span>Take me home</span>
            <ArrowUpRight className="btn-arrow-up-right w-4 h-4" />
          </Link>
        </Reveal>
      </div>
    </main>
  );
}
