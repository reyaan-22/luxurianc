/**
 * src/components/ui/horizon-hero-section.tsx
 * Luxurianc — immersive Three.js scrolling hero
 *
 * 3 scroll sections × 100vh = 300vh total travel.
 * Three.js canvas: starfield (gold-tinted), nebula (warm gold glow),
 * dark mountain silhouettes, atmospheric rim light.
 * GSAP entrance animations, native scroll for camera movement.
 */

"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

// ─── Section content ───────────────────────────────────────────
const SECTIONS = [
  {
    eyebrow:  "The founding chapter",
    title:    "LUXURIANC",
    line1:    "A private community for those who",
    line2:    "refuse to accept the ordinary.",
  },
  {
    eyebrow:  "01 — Mindset",
    title:    "WEALTH IS",
    line1:    "Before the portfolio, before the title —",
    line2:    "it is a way of thinking.",
  },
  {
    eyebrow:  "02 — Legacy",
    title:    "BUILD TO",
    line1:    "We are not here for the quarter.",
    line2:    "We are here for the decade.",
  },
];

const TOTAL = SECTIONS.length; // 3 sections → 300vh

// ─── Types ────────────────────────────────────────────────────
interface Refs {
  scene:           THREE.Scene | null;
  camera:          THREE.PerspectiveCamera | null;
  renderer:        THREE.WebGLRenderer | null;
  stars:           THREE.Points[];
  nebula:          THREE.Mesh | null;
  mountains:       THREE.Mesh[];
  animationId:     number | null;
  targetCamX:      number;
  targetCamY:      number;
  targetCamZ:      number;
  mountainBaseZ:   number[];
}

// ─── Component ────────────────────────────────────────────────
export const Component = () => {
  const containerRef     = useRef<HTMLDivElement>(null);
  const canvasRef        = useRef<HTMLCanvasElement>(null);
  const overlayRef       = useRef<HTMLDivElement>(null);
  const progressBarRef   = useRef<HTMLDivElement>(null);
  const smoothCam        = useRef({ x: 0, y: 30, z: 100 });

  const [progress,  setProgress]  = useState(0);
  const [sectionIdx, setSectionIdx] = useState(0);
  const [ready, setReady]         = useState(false);

  const refs = useRef<Refs>({
    scene:          null,
    camera:         null,
    renderer:       null,
    stars:          [],
    nebula:         null,
    mountains:      [],
    animationId:    null,
    targetCamX:     0,
    targetCamY:     30,
    targetCamZ:     100,
    mountainBaseZ:  [],
  });

  // ── Three.js init ──────────────────────────────────────────
  useEffect(() => {
    if (!canvasRef.current) return;
    const r = refs.current;

    // Scene
    r.scene = new THREE.Scene();
    r.scene.fog = new THREE.FogExp2(0x000000, 0.00018);

    // Camera
    r.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      3000
    );
    r.camera.position.set(0, 30, 100);

    // Renderer
    r.renderer = new THREE.WebGLRenderer({
      canvas:    canvasRef.current,
      antialias: true,
      alpha:     true,
    });
    r.renderer.setSize(window.innerWidth, window.innerHeight);
    r.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    r.renderer.toneMapping        = THREE.ACESFilmicToneMapping;
    r.renderer.toneMappingExposure = 0.65;

    // Build scene
    buildStars();
    buildNebula();
    buildMountains();
    buildAtmosphere();

    // Store base Z for mountains
    r.mountainBaseZ = r.mountains.map((m) => m.position.z);

    // Animate
    loop();
    setReady(true);

    // Resize
    const onResize = () => {
      if (!r.camera || !r.renderer) return;
      r.camera.aspect = window.innerWidth / window.innerHeight;
      r.camera.updateProjectionMatrix();
      r.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (r.animationId) cancelAnimationFrame(r.animationId);
      r.stars.forEach((s) => { s.geometry.dispose(); (s.material as THREE.Material).dispose(); });
      r.mountains.forEach((m) => { m.geometry.dispose(); (m.material as THREE.Material).dispose(); });
      if (r.nebula)   { r.nebula.geometry.dispose();   (r.nebula.material as THREE.Material).dispose(); }
      r.renderer?.dispose();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Star field ─────────────────────────────────────────────
  function buildStars() {
    const r = refs.current;
    if (!r.scene) return;

    const COUNT = 4000;
    for (let layer = 0; layer < 3; layer++) {
      const geo   = new THREE.BufferGeometry();
      const pos   = new Float32Array(COUNT * 3);
      const col   = new Float32Array(COUNT * 3);
      const sizes = new Float32Array(COUNT);

      for (let j = 0; j < COUNT; j++) {
        const radius = 200 + Math.random() * 800;
        const theta  = Math.random() * Math.PI * 2;
        const phi    = Math.acos(Math.random() * 2 - 1);

        pos[j * 3]     = radius * Math.sin(phi) * Math.cos(theta);
        pos[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        pos[j * 3 + 2] = radius * Math.cos(phi);

        // Gold / off-white palette
        const c = new THREE.Color();
        const t = Math.random();
        if (t < 0.65)       c.set(0xf5f0e8);  // warm white
        else if (t < 0.85)  c.setHSL(0.11, 0.6, 0.82);  // gold
        else                c.setHSL(0.09, 0.4, 0.9);   // amber-white

        col[j * 3]     = c.r;
        col[j * 3 + 1] = c.g;
        col[j * 3 + 2] = c.b;
        sizes[j]       = Math.random() * 1.8 + 0.4;
      }

      geo.setAttribute("position", new THREE.BufferAttribute(pos,   3));
      geo.setAttribute("color",    new THREE.BufferAttribute(col,   3));
      geo.setAttribute("size",     new THREE.BufferAttribute(sizes, 1));

      const mat = new THREE.ShaderMaterial({
        uniforms: {
          time:  { value: 0 },
          depth: { value: layer },
        },
        vertexShader: /* glsl */ `
          attribute float size;
          attribute vec3  color;
          varying   vec3  vColor;
          uniform   float time;
          uniform   float depth;

          void main() {
            vColor = color;
            vec3 p = position;
            float angle = time * 0.04 * (1.0 - depth * 0.25);
            mat2  rot   = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
            p.xy = rot * p.xy;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = size * (280.0 / -mv.z);
            gl_Position  = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          varying vec3 vColor;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float a = 1.0 - smoothstep(0.0, 0.5, d);
            gl_FragColor = vec4(vColor, a);
          }
        `,
        transparent: true,
        blending:    THREE.AdditiveBlending,
        depthWrite:  false,
      });

      const pts = new THREE.Points(geo, mat);
      r.scene.add(pts);
      r.stars.push(pts);
    }
  }

  // ── Nebula ─────────────────────────────────────────────────
  function buildNebula() {
    const r = refs.current;
    if (!r.scene) return;

    const geo = new THREE.PlaneGeometry(6000, 3000, 80, 80);
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        time:   { value: 0 },
        color1: { value: new THREE.Color(0x7a9445) },  // olive gold
        color2: { value: new THREE.Color(0x3a1800) },  // dark amber
      },
      vertexShader: /* glsl */ `
        varying vec2  vUv;
        varying float vElev;
        uniform float time;

        void main() {
          vUv = uv;
          vec3 p = position;
          float elev = sin(p.x * 0.012 + time) * cos(p.y * 0.012 + time) * 18.0;
          p.z  += elev;
          vElev = elev;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3  color1;
        uniform vec3  color2;
        uniform float time;
        varying vec2  vUv;
        varying float vElev;

        void main() {
          float m   = sin(vUv.x * 8.0 + time * 0.4) * cos(vUv.y * 8.0 + time * 0.4);
          vec3  col = mix(color1, color2, m * 0.5 + 0.5);
          float a   = 0.22 * (1.0 - length(vUv - 0.5) * 2.0);
          a += vElev * 0.004;
          gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
        }
      `,
      transparent: true,
      blending:    THREE.AdditiveBlending,
      side:        THREE.DoubleSide,
      depthWrite:  false,
    });

    r.nebula = new THREE.Mesh(geo, mat);
    r.nebula.position.z = -1000;
    r.scene.add(r.nebula);
  }

  // ── Mountains ──────────────────────────────────────────────
  function buildMountains() {
    const r = refs.current;
    if (!r.scene) return;

    const layers = [
      { z: -50,  h: 55,  color: 0x050506, opacity: 1   },
      { z: -100, h: 75,  color: 0x07070a, opacity: 0.9 },
      { z: -150, h: 95,  color: 0x0a0a10, opacity: 0.7 },
      { z: -200, h: 115, color: 0x0d0d16, opacity: 0.5 },
    ];

    layers.forEach((layer, idx) => {
      const pts: THREE.Vector2[] = [];
      const SEG = 60;

      for (let i = 0; i <= SEG; i++) {
        const x = (i / SEG - 0.5) * 1200;
        const y =
          Math.sin(i * 0.08 + idx) * layer.h +
          Math.sin(i * 0.04 + idx * 2) * layer.h * 0.45 +
          (Math.random() - 0.5) * layer.h * 0.15 -
          120;
        pts.push(new THREE.Vector2(x, y));
      }
      pts.push(new THREE.Vector2(6000, -400), new THREE.Vector2(-6000, -400));

      const shape   = new THREE.Shape(pts);
      const geo     = new THREE.ShapeGeometry(shape);
      const mat     = new THREE.MeshBasicMaterial({
        color:       layer.color,
        transparent: true,
        opacity:     layer.opacity,
        side:        THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(0, layer.z * 0.6, layer.z);
      mesh.userData = { idx };
      r.scene!.add(mesh);
      r.mountains.push(mesh);
    });
  }

  // ── Atmosphere ─────────────────────────────────────────────
  function buildAtmosphere() {
    const r = refs.current;
    if (!r.scene) return;

    const geo = new THREE.SphereGeometry(550, 32, 32);
    const mat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: /* glsl */ `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vNormal;
        uniform  float time;
        void main() {
          float i = pow(0.65 - dot(vNormal, vec3(0,0,1)), 2.0);
          // warm gold rim
          vec3  atm = vec3(0.48, 0.58, 0.27) * i;
          float p   = sin(time * 1.8) * 0.08 + 0.92;
          atm *= p;
          gl_FragColor = vec4(atm, i * 0.2);
        }
      `,
      side:        THREE.BackSide,
      blending:    THREE.AdditiveBlending,
      transparent: true,
    });

    r.scene.add(new THREE.Mesh(geo, mat));
  }

  // ── Render loop ────────────────────────────────────────────
  function loop() {
    const r = refs.current;
    r.animationId = requestAnimationFrame(loop);

    const t = Date.now() * 0.001;

    // Tick star uniforms
    r.stars.forEach((s) => {
      const m = s.material as THREE.ShaderMaterial;
      m.uniforms.time.value = t;
    });

    // Tick nebula
    if (r.nebula) {
      const m = r.nebula.material as THREE.ShaderMaterial;
      m.uniforms.time.value = t * 0.5;
    }

    // Smooth camera
    if (r.camera) {
      const k  = 0.06;
      const sc = smoothCam.current;
      sc.x += (r.targetCamX - sc.x) * k;
      sc.y += (r.targetCamY - sc.y) * k;
      sc.z += (r.targetCamZ - sc.z) * k;

      r.camera.position.set(
        sc.x + Math.sin(t * 0.1)  * 1.8,
        sc.y + Math.cos(t * 0.13) * 0.9,
        sc.z
      );
      r.camera.lookAt(0, 8, -500);
    }

    // Subtle mountain sway
    r.mountains.forEach((m, i) => {
      const f = 1 + i * 0.4;
      m.position.x = Math.sin(t * 0.09) * 2 * f;
    });

    r.renderer?.render(r.scene!, r.camera!);
  }

  // ── GSAP entrance ──────────────────────────────────────────
  useEffect(() => {
    if (!ready || !overlayRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(overlayRef.current.querySelectorAll(".lux-eyebrow"), {
      y: 30, opacity: 0, duration: 1.0, stagger: 0.1,
    })
    .from(overlayRef.current.querySelectorAll(".lux-title-char"), {
      y: 120, opacity: 0, duration: 1.4, stagger: 0.04,
    }, "-=0.6")
    .from(overlayRef.current.querySelectorAll(".lux-sub"), {
      y: 40, opacity: 0, duration: 1.0, stagger: 0.15,
    }, "-=0.8")
    .from(progressBarRef.current, {
      opacity: 0, y: 20, duration: 0.8,
    }, "-=0.5");

    return () => { tl.kill(); };
  }, [ready]);

  // ── Scroll handler ─────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const scrollY   = window.scrollY;
      const maxScroll = (containerRef.current?.offsetHeight ?? 1) - window.innerHeight;
      const prog      = Math.min(scrollY / maxScroll, 1);

      setProgress(prog);
      const raw = prog * TOTAL;
      setSectionIdx(Math.min(Math.floor(raw), TOTAL - 1));

      const r = refs.current;

      // Camera waypoints per section
      const waypoints = [
        { x: 0, y: 30, z: 300 },
        { x: 0, y: 42, z: -30 },
        { x: 0, y: 55, z: -650 },
      ];

      const secIdx = Math.min(Math.floor(raw), TOTAL - 1);
      const frac   = raw % 1;
      const cur    = waypoints[secIdx];
      const nxt    = waypoints[Math.min(secIdx + 1, TOTAL - 1)];

      r.targetCamX = cur.x + (nxt.x - cur.x) * frac;
      r.targetCamY = cur.y + (nxt.y - cur.y) * frac;
      r.targetCamZ = cur.z + (nxt.z - cur.z) * frac;

      // Mountain parallax
      r.mountains.forEach((m, i) => {
        const spd   = 0.5 + i * 0.8;
        const tgtZ  = r.mountainBaseZ[i] + scrollY * spd * 0.4;
        // Fly off-screen once user has scrolled past the hero
        m.position.z = prog > 0.88 ? 800000 : r.mountainBaseZ[i];
        if (r.nebula) r.nebula.position.z = tgtZ - 200;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Helpers ────────────────────────────────────────────────
  const splitChars = (text: string) =>
    text.split("").map((ch, i) => (
      <span key={i} className="lux-title-char inline-block overflow-hidden">
        {ch === " " ? " " : ch}
      </span>
    ));

  const sec = SECTIONS[sectionIdx];

  // ── Render ─────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      style={{ height: `${TOTAL * 100}vh`, position: "relative" }}
    >
      {/* Canvas — fixed full-screen behind everything */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Gradient overlay — vignette */}
      <div
        style={{
          position:   "fixed",
          inset:      0,
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(5,5,6,0.65) 100%)",
          zIndex:     1,
          pointerEvents: "none",
        }}
      />

      {/* ── Content overlay ── */}
      <div
        ref={overlayRef}
        style={{
          position:       "fixed",
          inset:          0,
          zIndex:         10,
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          justifyContent: "center",
          pointerEvents:  "none",
        }}
      >
        {/* Eyebrow */}
        <p
          className="lux-eyebrow font-mono text-center"
          style={{
            fontSize:      "0.55rem",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color:         "var(--gold)",
            marginBottom:  "2rem",
            opacity:       ready ? 1 : 0,
          }}
        >
          {sec.eyebrow}
        </p>

        {/* Main title */}
        <h2
          className="font-display font-light text-center overflow-hidden"
          style={{
            fontSize:      "clamp(4rem, 11vw, 9rem)",
            lineHeight:    1,
            letterSpacing: "-0.02em",
            color:         "var(--text-primary)",
            marginBottom:  "2.5rem",
          }}
        >
          {splitChars(sec.title)}
        </h2>

        {/* Divider */}
        <div
          style={{
            width:      "3rem",
            height:     "1px",
            background: "var(--gold)",
            opacity:    0.5,
            marginBottom: "2rem",
          }}
        />

        {/* Subtitle */}
        <div className="text-center space-y-1">
          <p className="lux-sub font-light" style={{ fontSize: "clamp(0.85rem, 1.3vw, 1rem)", color: "var(--text-secondary)", letterSpacing: "0.02em" }}>
            {sec.line1}
          </p>
          <p className="lux-sub font-light" style={{ fontSize: "clamp(0.85rem, 1.3vw, 1rem)", color: "var(--text-secondary)", letterSpacing: "0.02em" }}>
            {sec.line2}
          </p>
        </div>
      </div>

      {/* ── Left: section label ── */}
      <div
        style={{
          position:    "fixed",
          left:        "2rem",
          top:         "50%",
          transform:   "translateY(-50%)",
          zIndex:      10,
          display:     "flex",
          flexDirection: "column",
          alignItems:  "center",
          gap:         "0.75rem",
          pointerEvents: "none",
        }}
      >
        {/* Progress bar */}
        <div
          style={{
            width:      "1px",
            height:     "6rem",
            background: "rgba(122,148,69,0.2)",
            position:   "relative",
          }}
        >
          <div
            style={{
              position:   "absolute",
              top:        0,
              left:       0,
              width:      "100%",
              background: "var(--gold)",
              height:     `${progress * 100}%`,
              transition: "height 0.1s",
            }}
          />
        </div>
        {/* Section dots */}
        {SECTIONS.map((_, i) => (
          <div
            key={i}
            style={{
              width:        "4px",
              height:       "4px",
              borderRadius: "50%",
              background:   i === sectionIdx ? "var(--gold)" : "rgba(122,148,69,0.25)",
              transition:   "background 0.4s",
            }}
          />
        ))}
      </div>

      {/* ── Bottom: scroll indicator ── */}
      <div
        ref={progressBarRef}
        style={{
          position:       "fixed",
          bottom:         "2.5rem",
          left:           "50%",
          transform:      "translateX(-50%)",
          zIndex:         10,
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          gap:            "0.75rem",
          pointerEvents:  "none",
          opacity:        ready ? 1 : 0,
        }}
      >
        <p
          style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.5rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color:         "var(--text-muted)",
          }}
        >
          Scroll
        </p>
        {/* Animated caret */}
        <div
          style={{
            width:      "1px",
            height:     "2.5rem",
            background: "linear-gradient(to bottom, var(--gold), transparent)",
            animation:  "luxScroll 1.8s ease-in-out infinite",
          }}
        />
        {/* Section counter */}
        <p
          style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.5rem",
            letterSpacing: "0.3em",
            color:         "var(--text-muted)",
          }}
        >
          {String(sectionIdx + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
        </p>
      </div>

      {/* Scroll animation keyframes */}
      <style>{`
        @keyframes luxScroll {
          0%, 100% { transform: scaleY(1); opacity: 0.5; }
          50%       { transform: scaleY(1.4); opacity: 1; }
        }
      `}</style>

      {/* Spacer sections (for scrolling height — content is shown in the fixed overlay) */}
      {SECTIONS.slice(1).map((_, i) => (
        <div key={i} style={{ height: "100vh" }} aria-hidden />
      ))}
    </div>
  );
};

export default Component;
