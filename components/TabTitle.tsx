"use client";

import { useEffect, useRef } from "react";

export function TabTitle() {
  const originalTitleRef = useRef<string>("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab hidden: clear any pending "welcome back" restore timer
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }

        // Store the title that was there right before leaving (if not our temporary titles)
        const currentTitle = document.title;
        if (
          currentTitle &&
          currentTitle !== "psst, come back 💤" &&
          currentTitle !== "welcome back ☀️"
        ) {
          originalTitleRef.current = currentTitle;
        }

        document.title = "psst, come back 💤";
      } else {
        // Tab visible again: show welcome back message for 1.5 seconds
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        document.title = "welcome back ☀️";

        timeoutRef.current = setTimeout(() => {
          if (originalTitleRef.current) {
            document.title = originalTitleRef.current;
          }
          timeoutRef.current = null;
        }, 1500);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return null;
}
