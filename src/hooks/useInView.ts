/**
 * src/hooks/useInView.ts
 * Thin wrapper around IntersectionObserver.
 * Returns a ref to attach to a DOM element and a boolean `inView`.
 * Used for triggering scroll-based Framer Motion animations.
 */

"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?:  number;
  rootMargin?: string;
  once?:       boolean;  // Only trigger once (default: true)
}

export function useInView<T extends Element = HTMLDivElement>(
  options: UseInViewOptions = {}
): [React.RefObject<T | null>, boolean] {
  const { threshold = 0.15, rootMargin = "0px", once = true } = options;

  const ref    = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}
