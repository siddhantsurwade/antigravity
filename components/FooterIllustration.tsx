"use client";

import React from "react";

export function FooterIllustration({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 420"
      preserveAspectRatio="xMaxYMax slice"
      width="1440"
      height="420"
      role="img"
      aria-label="Sleepy cartoon mascot landscape with sunset hills"
      className={className || "w-full h-auto pointer-events-none"}
    >
      <title>Footer landscape</title>
      <defs>
        <radialGradient id="gFooterSun" cx="40%" cy="35%" r="75%">
          <stop offset="0" stopColor="#FBD3AE" />
          <stop offset="0.65" stopColor="#F29B6A" />
          <stop offset="1" stopColor="#E4572E" />
        </radialGradient>
        {/* Sky gradient: starts at CURRENT page tint at the top, fades to warm peach #F8E3D2 just above the back hill */}
        <linearGradient
          id="footerSkyGrad"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="0"
          y2="210"
        >
          <stop offset="0%" stopColor="var(--background)" />
          <stop offset="100%" stopColor="#F8E3D2" />
        </linearGradient>
      </defs>

      {/* Sky Background */}
      <rect width="1440" height="420" fill="url(#footerSkyGrad)" />

      {/* Back hill */}
      <path
        d="M0 420 L0 230 C180 170 360 190 520 240 S820 200 1000 190 S1300 170 1440 215 L1440 420Z"
        fill="#F1E9DD"
      />

      {/* Sinking Sun: translateY 0 to 28px as --story goes from 0.85 to 1.0 */}
      <g className="footer-sun">
        <circle cx="1100" cy="245" r="183" fill="#F2A074" opacity="0.12" />
        <circle cx="1100" cy="245" r="148" fill="#F2A074" opacity="0.16" />
        <circle cx="1100" cy="245" r="118" fill="url(#gFooterSun)" />
      </g>

      {/* Drifting Clouds */}
      <g
        className="drift"
        style={{ animationDelay: "0s" }}
        opacity="0.9"
        transform="translate(700,120) scale(1.0)"
      >
        <g fill="#FFFFFF">
          <circle cx="0" cy="0" r="16" />
          <circle cx="20" cy="-8" r="21" />
          <circle cx="46" cy="0" r="16" />
          <rect x="0" y="-2" width="46" height="16" rx="8" />
        </g>
      </g>
      <g
        className="drift"
        style={{ animationDelay: "3s" }}
        opacity="0.9"
        transform="translate(1280,70) scale(0.8)"
      >
        <g fill="#FFFFFF">
          <circle cx="0" cy="0" r="16" />
          <circle cx="20" cy="-8" r="21" />
          <circle cx="46" cy="0" r="16" />
          <rect x="0" y="-2" width="46" height="16" rx="8" />
        </g>
      </g>
      <g
        className="drift"
        style={{ animationDelay: "5s" }}
        opacity="0.9"
        transform="translate(420,170) scale(0.7)"
      >
        <g fill="#FFFFFF">
          <circle cx="0" cy="0" r="16" />
          <circle cx="20" cy="-8" r="21" />
          <circle cx="46" cy="0" r="16" />
          <rect x="0" y="-2" width="46" height="16" rx="8" />
        </g>
      </g>

      {/* Midground Hill */}
      <path
        d="M0 420 L0 335 C200 290 380 300 560 330 S900 306 1090 298 S1320 310 1440 330 L1440 420Z"
        fill="#E8DDCC"
      />

      {/* Bushes / Foliage */}
      <g transform="translate(820,308) scale(1.0)">
        <circle cx="0" cy="0" r="14" fill="#8FBFA8" />
        <circle cx="16" cy="-5" r="17" fill="#7FB69E" />
        <circle cx="34" cy="2" r="12" fill="#8FBFA8" />
      </g>
      <g transform="translate(1320,314) scale(1.2)">
        <circle cx="0" cy="0" r="14" fill="#8FBFA8" />
        <circle cx="16" cy="-5" r="17" fill="#7FB69E" />
        <circle cx="34" cy="2" r="12" fill="#8FBFA8" />
      </g>

      {/* Foreground Hill */}
      <path
        d="M0 420 L0 380 C300 350 640 372 960 366 S1300 352 1440 372 L1440 420Z"
        fill="#DDCFB9"
      />
    </svg>
  );
}
