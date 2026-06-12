/**
 * src/hooks/useScrollPosition.ts
 * Returns the current window scroll position (y).
 * Used by Navbar to switch between transparent and solid backgrounds.
 */

"use client";

import { useState, useEffect } from "react";

interface ScrollPosition {
  y:         number;
  direction: "up" | "down" | null;
  isTop:     boolean;
}

export function useScrollPosition(threshold = 0): ScrollPosition {
  const [position, setPosition] = useState<ScrollPosition>({
    y:         0,
    direction: null,
    isTop:     true,
  });

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY  = window.scrollY;
      const direction = currentY > lastY ? "down" : "up";

      setPosition({
        y:         currentY,
        direction: currentY === lastY ? null : direction,
        isTop:     currentY <= threshold,
      });

      lastY = currentY;
    };

    // Passive listener for performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return position;
}
