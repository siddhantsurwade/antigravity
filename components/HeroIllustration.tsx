"use client";

import React from "react";

/**
 * Background Hero Illustration
 * Sun, Drifting Clouds, Hills, Foliage, and Mascot Ground Shadow.
 * Boy is rendered in a separate transparent image layer on top so that
 * breathing animation can be reliably driven via CSS transforms.
 */
export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 520"
      width="640"
      height="520"
      role="img"
      aria-label="Sleepy cartoon mascot scene with sun and hills"
      className={className || "w-full h-auto"}
      style={{ overflow: "visible" }}
    >
      <title>Sleepy mascot on a hill</title>
      <defs>
        <radialGradient id="gSun" cx="40%" cy="35%" r="75%">
          <stop offset="0" stopColor="#FBD3AE" />
          <stop offset="0.65" stopColor="#F29B6A" />
          <stop offset="1" stopColor="#E4572E" />
        </radialGradient>
        <radialGradient id="gMoon" cx="38%" cy="32%" r="78%">
          <stop offset="0" stopColor="#FFF6E2" />
          <stop offset="0.7" stopColor="#F1E1C0" />
          <stop offset="1" stopColor="#D9C6A0" />
        </radialGradient>
        <linearGradient id="fH" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="170" y2="0">
          <stop offset="0" stopColor="#000" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <linearGradient id="fV" gradientUnits="userSpaceOnUse" x1="0" y1="430" x2="0" y2="520">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask id="mH" maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="520">
          <rect width="640" height="520" fill="url(#fH)" />
        </mask>
        <mask id="mV" maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="520">
          <rect width="640" height="520" fill="url(#fV)" />
        </mask>
      </defs>

      {/* Sun, Clouds, Hills and Bushes with edge mask */}
      <g mask="url(#mV)">
        <g mask="url(#mH)">
          {/* Sun layers */}
          <circle cx="330" cy="250" r="217" fill="#F2A074" opacity="0.12" />
          <circle cx="330" cy="250" r="175" fill="#F2A074" opacity="0.16" />
          <circle cx="330" cy="250" r="140" fill="url(#gSun)" />

          {/* Drifting Clouds */}
          {/* Cloud 1 (14s) */}
          <g transform="translate(110,150) scale(1.0)">
            <g className="hero-cloud-1" opacity="0.9">
              <g fill="#FFFFFF">
                <circle cx="0" cy="0" r="16" />
                <circle cx="20" cy="-8" r="21" />
                <circle cx="46" cy="0" r="16" />
                <rect x="0" y="-2" width="46" height="16" rx="8" />
              </g>
            </g>
          </g>

          {/* Cloud 2 (16s, delay -4s) */}
          <g transform="translate(470,90) scale(0.8)">
            <g className="hero-cloud-2" opacity="0.9">
              <g fill="#FFFFFF">
                <circle cx="0" cy="0" r="16" />
                <circle cx="20" cy="-8" r="21" />
                <circle cx="46" cy="0" r="16" />
                <rect x="0" y="-2" width="46" height="16" rx="8" />
              </g>
            </g>
          </g>

          {/* Cloud 3 (12s, delay -2s) */}
          <g transform="translate(520,250) scale(0.7)">
            <g className="hero-cloud-3" opacity="0.9">
              <g fill="#FFFFFF">
                <circle cx="0" cy="0" r="16" />
                <circle cx="20" cy="-8" r="21" />
                <circle cx="46" cy="0" r="16" />
                <rect x="0" y="-2" width="46" height="16" rx="8" />
              </g>
            </g>
          </g>

          {/* Background Hill */}
          <path
            d="M-20 520 L-20 360 Q120 300 250 350 Q330 380 420 330 Q540 270 660 330 L660 520Z"
            fill="#F1E9DD"
          />

          {/* Midground Hill */}
          <path
            d="M-20 520 L-20 430 Q140 380 300 420 Q440 455 560 405 Q620 385 660 395 L660 520Z"
            fill="#E8DDCC"
          />

          {/* Foliage / Bushes */}
          <g transform="translate(70,418) scale(0.9)">
            <circle cx="0" cy="0" r="14" fill="#8FBFA8" />
            <circle cx="16" cy="-5" r="17" fill="#7FB69E" />
            <circle cx="34" cy="2" r="12" fill="#8FBFA8" />
          </g>
          <g transform="translate(500,424) scale(1.1)">
            <circle cx="0" cy="0" r="14" fill="#8FBFA8" />
            <circle cx="16" cy="-5" r="17" fill="#7FB69E" />
            <circle cx="34" cy="2" r="12" fill="#8FBFA8" />
          </g>

          {/* Foreground Hill */}
          <path
            d="M-20 520 L-20 470 Q130 430 290 450 Q360 458 430 448 Q560 427 660 462 L660 520Z"
            fill="#DDCFB9"
          />
        </g>
      </g>

      {/* Mascot Shadow - completely still, anchored under his feet */}
      <ellipse cx="330" cy="452" rx="86" ry="9" fill="#000" opacity="0.22" />
    </svg>
  );
}
