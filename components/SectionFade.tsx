"use client";

import React from "react";
import { Reveal, RevealProps } from "./Reveal";

interface SectionFadeProps extends RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function SectionFade({
  children,
  className = "",
  step = 0,
  ...props
}: SectionFadeProps) {
  return (
    <Reveal className={className} step={step} {...props}>
      {children}
    </Reveal>
  );
}
