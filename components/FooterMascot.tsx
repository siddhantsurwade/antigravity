"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const FOOTER_LINES = [
  "Goodnight! 🌙",
  "Thanks for stopping by!",
  "Come back soon 🌤️",
  "Psst… the email button works",
];

const BUBBLE_TIME = 2800; // matches var(--bubble-time)

export function FooterMascot() {
  const [isPaused, setIsPaused] = useState(false);
  const [bubbleIndex, setBubbleIndex] = useState<number | null>(null);
  const [isLeaving, setIsLeaving] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasAutoTriggeredRef = useRef(false);

  // Helper to show bubble with custom duration and smooth exit
  const showBubbleWithDuration = (index: number, duration: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);

    setBubbleIndex(index);
    setIsLeaving(false);

    // Fade out slightly before full duration for smooth exit
    leaveTimerRef.current = setTimeout(() => {
      setIsLeaving(true);
    }, Math.max(0, duration - 260));

    // Reset bubble after full duration
    timerRef.current = setTimeout(() => {
      setBubbleIndex(null);
      setIsLeaving(false);
    }, duration);
  };

  // IntersectionObserver: Pause looping animations when off-screen & auto-trigger Goodnight
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPaused(!entry.isIntersecting);

        // Auto-show "Goodnight! 🌙" when mascot is ~60% visible for the first time
        if (
          !hasAutoTriggeredRef.current &&
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.55
        ) {
          hasAutoTriggeredRef.current = true;
          showBubbleWithDuration(0, 3000);
        }
      },
      { threshold: [0.05, 0.55, 0.6] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Handle clicking or tapping the mascot
  const handleMascotClick = () => {
    // If auto bubble (0) or any line is visible, continue from the next line in order.
    // If closed, cycle begins from line 0 ("Goodnight! 🌙").
    const nextIndex =
      bubbleIndex === null ? 0 : (bubbleIndex + 1) % FOOTER_LINES.length;

    showBubbleWithDuration(nextIndex, BUBBLE_TIME);
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
      className={`relative w-full h-auto select-none overflow-visible ${isPaused ? "mascot-paused" : ""}`}
    >
      {/* 1. Mascot Illustration: Legs layer BEHIND, Body layer IN FRONT */}
      <div className="relative w-full h-auto overflow-visible">
        {/* Legs layer: BEHIND, swinging gently from hip line (51% 73.8%) */}
        <div
          className="footer-mascot-legs absolute inset-0 w-full h-full pointer-events-none"
          style={{
            transformOrigin: "51% 73.8%",
          }}
        >
          <Image
            src="/mascot/footer-sitting-legs.png"
            alt=""
            aria-hidden="true"
            width={567}
            height={1227}
            className="w-full h-auto pointer-events-none"
            priority
          />
        </div>

        {/* Body layer: IN FRONT, static upper body */}
        <div className="relative z-10 w-full h-auto pointer-events-none">
          <Image
            src="/mascot/footer-sitting-body.png"
            alt="Sleepy mascot sitting on the hill"
            width={567}
            height={1227}
            className="w-full h-auto pointer-events-none"
            priority
          />
        </div>
      </div>

      {/* 2. Floating "z z z" beside top-right of his head (fades out while bubble is open) */}
      <div
        className={`absolute inset-0 pointer-events-none z-20 overflow-visible transition-opacity duration-300 ${
          bubbleIndex !== null ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      >
        <span
          className="footer-z-letter absolute text-[13px]"
          style={{
            left: "81%",
            top: "13%",
            animationDelay: "0s",
          }}
        >
          z
        </span>
        <span
          className="footer-z-letter absolute text-[17px]"
          style={{
            left: "83.5%",
            top: "9.5%",
            animationDelay: "-2.7s",
          }}
        >
          Z
        </span>
        <span
          className="footer-z-letter absolute text-[21px]"
          style={{
            left: "86%",
            top: "6%",
            animationDelay: "-1.8s",
          }}
        >
          z
        </span>
      </div>

      {/* 3. Clickable button over the whole mascot */}
      <button
        type="button"
        onClick={handleMascotClick}
        aria-label="Say hi to the mascot"
        className="absolute inset-0 z-20 cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 transition-shadow"
      />

      {/* 4. Speech Bubble above his head */}
      {bubbleIndex !== null && (
        <div
          className={`mascot-bubble absolute z-30 pointer-events-none whitespace-nowrap bg-white border border-[var(--border)] rounded-[14px] px-3.5 py-2 shadow-md text-[13px] text-[var(--foreground)] font-sans font-medium bottom-[105%] left-0 sm:left-1/2 sm:-translate-x-1/2 ${
            isLeaving ? "is-leaving" : ""
          }`}
        >
          <span>{FOOTER_LINES[bubbleIndex]}</span>
          {/* Tail pointing down at head: left-[36px] on mobile (near center of 75px mascot), centered on sm: */}
          <div
            className="absolute -bottom-[5px] left-[36px] sm:left-1/2 sm:-translate-x-1/2 w-2.5 h-2.5 bg-white border-b border-r border-[var(--border)] rotate-45"
            aria-hidden="true"
          />
        </div>
      )}

      {/* 5. Accessible announcement for assistive tech */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {bubbleIndex !== null ? FOOTER_LINES[bubbleIndex] : ""}
      </div>
    </div>
  );
}
