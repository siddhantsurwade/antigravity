"use client";

import React, { useEffect, useRef, useState } from "react";

type ObserverCallback = () => void;

let sharedObserver: IntersectionObserver | null = null;
const observedElements = new Map<Element, ObserverCallback>();

function getSharedObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Trigger when ~15% is visible or isIntersecting
          if (entry.isIntersecting || entry.intersectionRatio >= 0.15) {
            const callback = observedElements.get(entry.target);
            if (callback) {
              callback();
              observedElements.delete(entry.target);
              sharedObserver?.unobserve(entry.target);
            }
          }
        });
      },
      {
        root: null,
        // Appear slightly after entering the screen (-8% bottom margin)
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.15,
      }
    );
  }
  return sharedObserver;
}

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  step?: number;
  uncapped?: boolean;
  immediate?: boolean;
  as?: React.ElementType;
  style?: React.CSSProperties;
  id?: string;
}

export function Reveal({
  children,
  className = "",
  step = 0,
  uncapped = false,
  immediate = false,
  as: Component = "div",
  style,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isInstant, setIsInstant] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const setInstantVisible = () => {
      requestAnimationFrame(() => {
        setIsRevealed(true);
        setIsInstant(true);
      });
    };

    // 1. Reduced motion or unsupported IntersectionObserver -> show immediately without motion
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || !("IntersectionObserver" in window)) {
      setInstantVisible();
      return;
    }

    // 2. Check position on mount: elements already above viewport or restored scroll
    const rect = el.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    // If scrolled past or already in view during scroll restore
    if (rect.top < 0 || rect.bottom <= 0) {
      setInstantVisible();
      return;
    }

    if (window.scrollY > 50 && rect.top < windowHeight * 0.9) {
      setInstantVisible();
      return;
    }

    // 3. Immediate items (e.g. Hero items at page load)
    if (immediate) {
      const raf = requestAnimationFrame(() => {
        setIsRevealed(true);
        setIsAnimating(true);
      });
      return () => cancelAnimationFrame(raf);
    }

    // 4. Register with single shared observer
    const observer = getSharedObserver();
    if (!observer) {
      setInstantVisible();
      return;
    }

    const handleIntersect = () => {
      setIsRevealed(true);
      setIsAnimating(true);
    };

    observedElements.set(el, handleIntersect);
    observer.observe(el);

    return () => {
      observedElements.delete(el);
      observer.unobserve(el);
    };
  }, [immediate]);

  // Handle removing will-change after transition completes
  useEffect(() => {
    if (!isAnimating) return;

    const cappedStep = uncapped ? step : Math.min(step, 6);
    const delayMs = cappedStep * 80;
    // Animation duration (650ms) + delay + safety buffer (100ms)
    const timeoutMs = delayMs + 650 + 100;

    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, timeoutMs);

    return () => clearTimeout(timer);
  }, [isAnimating, step, uncapped]);

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (
      e.target === ref.current &&
      (e.propertyName === "opacity" || e.propertyName === "translate")
    ) {
      setIsAnimating(false);
    }
  };

  return (
    <Component
      ref={ref as unknown as React.Ref<never>}
      id={id}
      data-reveal=""
      data-step={step}
      data-uncapped={uncapped ? "true" : undefined}
      onTransitionEnd={handleTransitionEnd}
      style={
        {
          ...style,
          "--reveal-step": step,
        } as React.CSSProperties
      }
      className={`reveal-item ${isRevealed ? "is-revealed" : ""} ${
        isInstant ? "is-instant" : ""
      } ${isAnimating ? "is-animating" : ""} ${className}`.trim()}
    >
      {children}
    </Component>
  );
}
