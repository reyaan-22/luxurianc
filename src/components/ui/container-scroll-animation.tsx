/**
 * src/components/ui/container-scroll-animation.tsx
 * 3D perspective scroll-driven container.
 * Content tilts in 3D space and levels as you scroll past it.
 * Used in ProductShowcase section on the home page.
 */

"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────
interface ContainerScrollProps {
  titleComponent: string | React.ReactNode;
  children:       React.ReactNode;
}

interface HeaderProps {
  translate:       MotionValue<number>;
  titleComponent:  React.ReactNode;
}

interface CardProps {
  rotate:   MotionValue<number>;
  scale:    MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}

// ─── Main container ──────────────────────────────────────────
export const ContainerScroll = ({ titleComponent, children }: ContainerScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef });

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scaleDimensions = () => (isMobile ? [0.7, 0.9] : [1.05, 1]);

  const rotate    = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale     = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-4 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{ perspective: "1200px" }}
      >
        <ScrollHeader translate={translate} titleComponent={titleComponent} />
        <ScrollCard rotate={rotate} translate={translate} scale={scale}>
          {children}
        </ScrollCard>
      </div>
    </div>
  );
};

// ─── Header (title above card) ────────────────────────────────
export const ScrollHeader = ({ translate, titleComponent }: HeaderProps) => (
  <motion.div
    style={{ translateY: translate }}
    className="max-w-5xl mx-auto text-center mb-8"
  >
    {titleComponent}
  </motion.div>
);

// ─── The tilting card ─────────────────────────────────────────
export const ScrollCard = ({ rotate, scale, children }: CardProps) => (
  <motion.div
    style={{
      rotateX: rotate,
      scale,
      boxShadow:
        "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
    }}
    className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#1a1c17] rounded-[30px] shadow-2xl"
  >
    <div className="h-full w-full overflow-hidden rounded-2xl bg-[#f5f7f0] dark:bg-[#0f100c]">
      {children}
    </div>
  </motion.div>
);
