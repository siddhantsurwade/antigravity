"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export function NotFoundMascot() {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center justify-center select-none overflow-visible w-full max-w-[320px] ${
        isPaused ? "mascot-paused" : ""
      }`}
    >
      {/* 1. The 150px Mascot (stacked body & swinging legs) */}
      <div className="relative z-10 w-[150px] overflow-visible">
        {/* Legs layer BEHIND (swinging from hip line 51% 73.8%) */}
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

        {/* Body layer IN FRONT (static upper body) */}
        <div className="relative z-10 w-full h-auto pointer-events-none">
          <Image
            src="/mascot/footer-sitting-body.png"
            alt="Sleepy mascot sitting on a hill"
            width={567}
            height={1227}
            className="w-full h-auto pointer-events-none"
            priority
          />
        </div>

        {/* Floating "z z z" beside top-right of head */}
        <div
          className="absolute inset-0 pointer-events-none z-20 overflow-visible"
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
      </div>

      {/* 2. Soft rounded hill shape: wide ellipse in footer beige color (#DDCFB9 / var(--footer-bg)), 320px wide and 60px tall */}
      <svg
        viewBox="0 0 320 60"
        className="w-[320px] max-w-[85vw] h-[60px] -mt-[98px] z-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        <ellipse cx="160" cy="30" rx="160" ry="30" fill="var(--footer-bg)" />
      </svg>
    </div>
  );
}
