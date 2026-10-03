"use client";

import { useEffect } from "react";

export function StoryScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const updateStory = () => {
      const docEl = document.documentElement;
      const scrollHeight = docEl.scrollHeight;
      const clientHeight = window.innerHeight || docEl.clientHeight;
      const maxScroll = Math.max(1, scrollHeight - clientHeight);
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

      docEl.style.setProperty("--story", progress.toFixed(4));
      ticking = false;
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateStory);
      }
    };

    // Calculate immediately on mount so reloads while scrolled display the right tint
    updateStory();

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return null;
}
