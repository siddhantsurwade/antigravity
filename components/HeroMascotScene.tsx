"use client";

import React, { useState, useEffect, useRef } from "react";
import { HeroIllustration } from "./HeroIllustration";

const HERO_LINES = [
  "5 more minutes… 💤",
  "Shh, I'm sleeping",
  "Hi! Nice to meet you",
  "Coffee first, code later ☕",
];

const BUBBLE_TIME = 2800; // matches var(--bubble-time)

export function HeroMascotScene() {
  const [isPaused, setIsPaused] = useState(false);
  const [bubbleIndex, setBubbleIndex] = useState<number | null>(null);
  const [isLeaving, setIsLeaving] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // IntersectionObserver: Pause looping animations when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPaused(!entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Handle clicking or tapping the mascot
  const handleMascotClick = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);

    setBubbleIndex((prev) => (prev === null ? 0 : (prev + 1) % HERO_LINES.length));
    setIsLeaving(false);

    // Fade out slightly before full timeout for smooth exit
    leaveTimerRef.current = setTimeout(() => {
      setIsLeaving(true);
    }, BUBBLE_TIME - 260);

    // Reset bubble after full bubble time
    timerRef.current = setTimeout(() => {
      setBubbleIndex(null);
      setIsLeaving(false);
    }, BUBBLE_TIME);
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-auto select-none ${isPaused ? "mascot-paused" : ""}`}
    >
      {/* 1. MASKED ILLUSTRATION LAYER: Background SVG + Boy image with soft edge fade */}
      <div
        className="relative w-full h-auto pointer-events-none hero-illustration-mask"
        style={
          {
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 82%, transparent 100%), linear-gradient(to bottom, black 0%, black 78%, transparent 100%)",
            WebkitMaskComposite: "source-in",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 82%, transparent 100%), linear-gradient(to bottom, black 0%, black 78%, transparent 100%)",
            maskComposite: "intersect",
          } as React.CSSProperties
        }
      >
        {/* Background SVG: Sun, Drifting Clouds, Hills, Bushes, Ground Shadow */}
        <HeroIllustration />

        {/* The Boy Mascot: Transparent WebP stacked over background, breathing gently */}
        <div
          className="absolute pointer-events-none select-none"
          style={{
            left: "39.328125%",
            top: "13.076923%",
            width: "24.46875%",
            height: "73.84615%",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mascot/hero-boy.webp"
            alt=""
            aria-hidden="true"
            className="hero-boy-breathe w-full h-full object-contain pointer-events-none"
            style={{
              transformOrigin: "50% 100%",
            }}
          />
        </div>
      </div>


      {/* 3. Clickable button over the boy */}
      <button
        type="button"
        onClick={handleMascotClick}
        aria-label="Say hi to the mascot"
        className="absolute z-20 cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 transition-shadow"
        style={{
          left: "38%",
          top: "13%",
          width: "27%",
          height: "74%",
        }}
      />

      {/* 4. SIBLING LAYER FOR SPEECH BUBBLE: Above head, never clipped by illustration mask */}
      {bubbleIndex !== null && (
        <div
          className={`mascot-bubble absolute z-30 pointer-events-none whitespace-nowrap bg-white border border-[var(--border)] rounded-[14px] px-3.5 py-2 shadow-md text-[13px] text-[var(--foreground)] font-sans font-medium ${
            isLeaving ? "is-leaving" : ""
          }`}
          style={{
            left: "51.5%",
            bottom: "89%",
            transform: "translateX(-50%)",
          }}
        >
          <span>{HERO_LINES[bubbleIndex]}</span>
          {/* Tail pointing down at head */}
          <div
            className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-b border-r border-[var(--border)] rotate-45"
            aria-hidden="true"
          />
        </div>
      )}

      {/* 5. Accessible announcement for assistive tech */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {bubbleIndex !== null ? HERO_LINES[bubbleIndex] : ""}
      </div>
    </div>
  );
}
