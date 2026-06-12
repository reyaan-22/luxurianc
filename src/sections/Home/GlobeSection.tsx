/**
 * src/sections/Home/GlobeSection.tsx
 * Luxurianc — global member network globe
 * Every founding member appears as a glowing dot on the map.
 */

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe, type GlobeMarker } from "@/components/ui/globe";
import { useInView } from "@/hooks/useInView";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/animations";
import { getMemberCountByCountry, getMemberCount } from "@/lib/supabase";

// Country name → [lat, lng] centroid
const COUNTRY_COORDS: Record<string, [number, number]> = {
  "United States":    [37.09, -95.71],
  "United Kingdom":   [55.38,  -3.44],
  "UAE":              [23.42,  53.85],
  "France":           [46.23,   2.21],
  "Germany":          [51.17,  10.45],
  "India":            [20.59,  78.96],
  "Australia":       [-25.27, 133.78],
  "Canada":           [56.13, -106.35],
  "Singapore":         [1.35, 103.82],
  "Japan":            [36.20, 138.25],
  "Brazil":          [-14.24, -51.93],
  "South Africa":    [-30.56,  22.94],
  "China":            [35.86, 104.19],
  "Italy":            [41.87,  12.57],
  "Spain":            [40.46,  -3.75],
  "Netherlands":      [52.13,   5.29],
  "Switzerland":      [46.82,   8.23],
  "Sweden":           [60.13,  18.64],
  "Norway":           [60.47,   8.47],
  "Denmark":          [56.26,   9.50],
  "Mexico":           [23.63, -102.55],
  "Argentina":       [-38.42, -63.62],
  "South Korea":      [35.91, 127.77],
  "Indonesia":        [-0.79, 113.92],
  "Pakistan":         [30.38,  69.35],
  "Nigeria":          [ 9.08,   8.68],
  "Egypt":            [26.82,  30.80],
  "Turkey":           [38.96,  35.24],
  "Russia":           [61.52,  105.32],
  "Saudi Arabia":     [23.89,  45.08],
  "Qatar":            [25.35,  51.18],
  "New Zealand":     [-40.90, 174.89],
  "Thailand":         [15.87,  100.99],
  "Malaysia":          [4.21,  101.98],
  "Philippines":      [12.88,  121.77],
  "Vietnam":          [14.06,  108.28],
  "Portugal":         [39.40,  -8.22],
  "Greece":           [39.07,  21.82],
  "Poland":           [51.92,  19.15],
};

// Scale member count → marker size
function countToSize(count: number): number {
  if (count >= 500) return 0.12;
  if (count >= 200) return 0.10;
  if (count >= 100) return 0.08;
  if (count >= 50)  return 0.07;
  if (count >= 20)  return 0.06;
  if (count >= 5)   return 0.05;
  return 0.04;
}

// Default markers shown before data loads
const DEMO_MARKERS: GlobeMarker[] = Object.values(COUNTRY_COORDS)
  .slice(0, 18)
  .map(([lat, lng]) => ({ location: [lat, lng], size: 0.04 + Math.random() * 0.04 }));

export default function GlobeSection() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.05 });
  const [markers,     setMarkers]     = useState<GlobeMarker[]>(DEMO_MARKERS);
  const [totalCount,  setTotalCount]  = useState(0);
  const [countryData, setCountryData] = useState<{ country: string; count: number }[]>([]);

  useEffect(() => {
    Promise.all([getMemberCount(), getMemberCountByCountry()]).then(
      ([total, countries]) => {
        setTotalCount(total);
        setCountryData(countries);

        if (countries.length > 0) {
          const live: GlobeMarker[] = countries
            .filter((c) => COUNTRY_COORDS[c.country])
            .map((c) => ({
              location: COUNTRY_COORDS[c.country],
              size: countToSize(c.count),
            }));
          if (live.length > 0) setMarkers(live);
        }
      }
    );
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Outer olive glow ring */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(122,148,69,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="container-luxury relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-10 order-2 lg:order-1"
          >
            <motion.p
              variants={fadeUpVariants}
              custom={0}
              className="text-[0.6rem] tracking-[0.4em] uppercase text-[var(--gold)] font-mono"
            >
              Global network
            </motion.p>

            <motion.h2
              variants={fadeUpVariants}
              custom={0.1}
              className="font-display font-light text-[var(--text-primary)]"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.8rem)", lineHeight: 1.05 }}
            >
              Founding members.<br />
              Every continent.
            </motion.h2>

            <motion.p
              variants={fadeUpVariants}
              custom={0.2}
              className="text-[var(--text-secondary)] text-base leading-relaxed font-light max-w-md"
            >
              Every dot is a real person. A founder, an investor, a builder —
              someone who believed in this before it became obvious.
              This is what a global community looks like from the beginning.
            </motion.p>

            {/* Country breakdown */}
            {countryData.length > 0 && (
              <motion.div
                variants={fadeUpVariants}
                custom={0.3}
                className="space-y-3"
              >
                <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[var(--text-muted)] font-mono">
                  Top regions
                </p>
                <div className="space-y-2">
                  {countryData
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 5)
                    .map(({ country, count }) => (
                      <div key={country} className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: "var(--gold)" }}
                          />
                          <span className="text-sm text-[var(--text-secondary)] font-light truncate">
                            {country}
                          </span>
                        </div>
                        <span className="text-[0.6rem] tracking-[0.2em] font-mono text-[var(--text-muted)] flex-shrink-0">
                          {count.toLocaleString()}
                        </span>
                      </div>
                    ))}
                </div>
              </motion.div>
            )}

            {/* Total counter */}
            <motion.div
              variants={fadeUpVariants}
              custom={0.4}
              className="pt-6 border-t border-[var(--border)]"
            >
              <p
                className="font-display font-light text-[var(--gold)]"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1 }}
              >
                {totalCount > 0 ? totalCount.toLocaleString() : "—"}
              </p>
              <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[var(--text-muted)] font-mono mt-2">
                Founding members worldwide
              </p>
            </motion.div>
          </motion.div>

          {/* Right — globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative order-1 lg:order-2 flex items-center justify-center"
          >
            {/* Glow behind globe */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle 45% at 50% 50%, rgba(122,148,69,0.12) 0%, transparent 70%)",
              }}
            />

            <div className="w-full max-w-[520px] aspect-square mx-auto relative">
              <Globe
                markers={markers}
                speed={0.003}
                interactive
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
