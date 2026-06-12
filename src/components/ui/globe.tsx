/**
 * src/components/ui/globe.tsx
 * Luxurianc — dark luxury 3D globe with member dots per country
 * Powered by cobe. Olive green markers, cinematic rotation.
 */

"use client";

import { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";

export interface GlobeMarker {
  location: [number, number]; // [lat, lng]
  size: number;               // 0.03 small → 0.12 large
}

interface GlobeProps {
  markers?: GlobeMarker[];
  className?: string;
  speed?: number;
  interactive?: boolean;
}

// Default markers — major world cities for demo when no Supabase data
const DEFAULT_MARKERS: GlobeMarker[] = [
  { location: [40.71, -74.01], size: 0.08 }, // New York
  { location: [51.51, -0.13],  size: 0.07 }, // London
  { location: [48.86, 2.35],   size: 0.06 }, // Paris
  { location: [25.20, 55.27],  size: 0.07 }, // Dubai
  { location: [1.35,  103.82], size: 0.06 }, // Singapore
  { location: [35.69, 139.69], size: 0.06 }, // Tokyo
  { location: [-33.87, 151.21],size: 0.05 }, // Sydney
  { location: [19.08, 72.88],  size: 0.07 }, // Mumbai
  { location: [37.77, -122.42],size: 0.06 }, // San Francisco
  { location: [43.65, -79.38], size: 0.05 }, // Toronto
  { location: [-23.55, -46.63],size: 0.05 }, // São Paulo
  { location: [55.75, 37.62],  size: 0.05 }, // Moscow
  { location: [30.05, 31.25],  size: 0.04 }, // Cairo
  { location: [-26.20, 28.04], size: 0.04 }, // Johannesburg
  { location: [39.91, 116.39], size: 0.06 }, // Beijing
];

export function Globe({
  markers = DEFAULT_MARKERS,
  className = "",
  speed = 0.0025,
  interactive = true,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef    = useRef(0);
  const pointerRef = useRef<{ x: number } | null>(null);
  const phiOffset = useRef(0);
  const dragging  = useRef(false);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (!interactive) return;
    pointerRef.current = { x: e.clientX };
    dragging.current = true;
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
  }, [interactive]);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
    pointerRef.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
  }, []);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (!dragging.current || !pointerRef.current) return;
      phiOffset.current += (e.clientX - pointerRef.current.x) / 200;
      pointerRef.current = { x: e.clientX };
    };
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [onPointerUp]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let globe: ReturnType<typeof createGlobe> | null = null;
    let animId = 0;
    let running = true;

    const init = () => {
      const w = canvas.offsetWidth;
      if (w === 0) return;

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width:  w * 2,
        height: w * 2,
        phi:    0,
        theta:  0.25,
        dark:   1,
        diffuse: 1.8,
        mapSamples: 20000,
        mapBrightness: 4,
        baseColor:   [0.08, 0.09, 0.07],
        markerColor: [0.48, 0.58, 0.27],
        glowColor:   [0.48, 0.58, 0.27],
        markers,
      });

      // Animation loop using globe.update()
      const animate = () => {
        if (!running || !globe) return;
        if (!dragging.current) phiRef.current += speed;
        globe.update({
          phi:    phiRef.current + phiOffset.current,
          theta:  0.25,
          width:  canvas.offsetWidth * 2,
          height: canvas.offsetWidth * 2,
        });
        animId = requestAnimationFrame(animate);
      };
      animId = requestAnimationFrame(animate);

      setTimeout(() => { if (canvas) canvas.style.opacity = "1"; }, 50);
    };

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      const ro = new ResizeObserver(() => {
        if (canvas.offsetWidth > 0) { ro.disconnect(); init(); }
      });
      ro.observe(canvas);
      return () => ro.disconnect();
    }

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      globe?.destroy();
    };
  }, [markers, speed]);

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={onPointerDown}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        opacity: 0,
        transition: "opacity 1.4s ease",
        cursor: interactive ? "grab" : "default",
        borderRadius: "50%",
        touchAction: "none",
      }}
    />
  );
}
