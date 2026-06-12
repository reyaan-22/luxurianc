/**
 * src/hooks/useMediaQuery.ts
 * Returns true/false based on a CSS media query string.
 * Prevents hydration mismatch by defaulting to false on the server.
 *
 * Usage:
 *   const isMobile = useMediaQuery("(max-width: 768px)");
 */

"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
