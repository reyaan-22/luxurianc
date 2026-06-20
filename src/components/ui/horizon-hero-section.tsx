/**
 * src/components/ui/horizon-hero-section.tsx
 * Luxurianc — immersive Three.js scrolling hero
 *
 * Uses position:sticky so the canvas is fully contained in the hero section
 * and never bleeds over MissionScroll or any section below.
 */

"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

// ─── Section content ──────────────────────────────────────────
const SECTIONS = [
  {
    eyebrow: "The founding chapter",
    title:   "LUXURIANC",
    line1:   "A private community for those who",
    line2:   "refuse to accept the ordinary.",
  },
  {
    eyebrow: "01 — Mindset",
    title:   "WEALTH",
    line1:   "Before the portfolio, before the title —",
    line2:   "it begins in the mind.",
  },
  {
    eyebrow: "02 — Legacy",
    title:   "LEGACY",
    line1:   "We are not here for the quarter.",
    line2:   "We are here for the decade.",
  },
];
const TOTAL = SECTIONS.length;

interface ThreeRefs {
  scene:         THREE.Scene | null;
  camera:        THREE.PerspectiveCamera | null;
  renderer:      THREE.WebGLRenderer | null;
  stars:         THREE.Points[];
  nebula:        THREE.Mesh | null;
  mountains:     THREE.Mesh[];
  animId:        number | null;
  targetX:       number;
  targetY:       number;
  targetZ:       number;
  mountainBaseZ: number[];
}

export const Component = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef    = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);
  const smoothCam    = useRef({ x: 0, y: 20, z: 80 });

  const [sectionIdx, setSectionIdx] = useState(0);
  const [progress,   setProgress]   = useState(0);
  const [ready,      setReady]      = useState(false);

  const three = useRef<ThreeRefs>({
    scene: null, camera: null, renderer: null,
    stars: [], nebula: null, mountains: [],
    animId: null,
    targetX: 0, targetY: 20, targetZ: 80,
    mountainBaseZ: [],
  });

  // ── Three.js bootstrap ────────────────────────────────────
  useEffect(() => {
    if (!canvasRef.current || !stickyRef.current) return;
    const r  = three.current;
    const el = stickyRef.current;

    r.scene  = new THREE.Scene();
    r.scene.fog = new THREE.FogExp2(0x05050a, 0.00022);

    r.camera = new THREE.PerspectiveCamera(70, el.clientWidth / el.clientHeight, 0.1, 3000);
    r.camera.position.set(0, 20, 80);

    r.renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    r.renderer.setSize(el.clientWidth, el.clientHeight);
    r.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    r.renderer.setClearColor(0x05050a, 1); // solid dark bg — no bleed-through
    r.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    r.renderer.toneMappingExposure = 0.7;

    buildStars();
    buildNebula();
    buildMountains();
    buildAtmosphere();
    r.mountainBaseZ = r.mountains.map((m) => m.position.z);

    tick();
    setReady(true);

    const onResize = () => {
      if (!r.camera || !r.renderer || !stickyRef.current) return;
      const w = stickyRef.current.clientWidth;
      const h = stickyRef.current.clientHeight;
      r.camera.aspect = w / h;
      r.camera.updateProjectionMatrix();
      r.renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (r.animId) cancelAnimationFrame(r.animId);
      r.stars.forEach((s) => { s.geometry.dispose(); (s.material as THREE.Material).dispose(); });
      r.mountains.forEach((m) => { m.geometry.dispose(); (m.material as THREE.Material).dispose(); });
      if (r.nebula) { r.nebula.geometry.dispose(); (r.nebula.material as THREE.Material).dispose(); }
      r.renderer?.dispose();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function buildStars() {
    const r = three.current;
    if (!r.scene) return;
    const COUNT = 3500;
    for (let layer = 0; layer < 3; layer++) {
      const geo   = new THREE.BufferGeometry();
      const pos   = new Float32Array(COUNT * 3);
      const col   = new Float32Array(COUNT * 3);
      const sizes = new Float32Array(COUNT);
      for (let j = 0; j < COUNT; j++) {
        const rad = 180 + Math.random() * 700;
        const th  = Math.random() * Math.PI * 2;
        const ph  = Math.acos(Math.random() * 2 - 1);
        pos[j*3]   = rad * Math.sin(ph) * Math.cos(th);
        pos[j*3+1] = rad * Math.sin(ph) * Math.sin(th);
        pos[j*3+2] = rad * Math.cos(ph);
        const c = new THREE.Color();
        const t = Math.random();
        if (t < 0.65)      c.set(0xf5f0e8);
        else if (t < 0.85) c.setHSL(0.11, 0.7, 0.82);
        else               c.setHSL(0.09, 0.4, 0.92);
        col[j*3] = c.r; col[j*3+1] = c.g; col[j*3+2] = c.b;
        sizes[j] = Math.random() * 1.6 + 0.3;
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos,   3));
      geo.setAttribute("color",    new THREE.BufferAttribute(col,   3));
      geo.setAttribute("size",     new THREE.BufferAttribute(sizes, 1));
      const mat = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, depth: { value: layer } },
        vertexShader: `
          attribute float size; attribute vec3 color;
          varying vec3 vColor;
          uniform float time, depth;
          void main(){
            vColor = color;
            vec3 p = position;
            float a = time*0.035*(1.0-depth*0.25);
            mat2 rot = mat2(cos(a),-sin(a),sin(a),cos(a));
            p.xy = rot*p.xy;
            vec4 mv = modelViewMatrix*vec4(p,1.0);
            gl_PointSize = size*(260.0/-mv.z);
            gl_Position = projectionMatrix*mv;
          }`,
        fragmentShader: `
          varying vec3 vColor;
          void main(){
            float d = length(gl_PointCoord-vec2(.5));
            if(d>.5) discard;
            gl_FragColor = vec4(vColor, 1.0-smoothstep(0.0,.5,d));
          }`,
        transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
      });
      const pts = new THREE.Points(geo, mat);
      r.scene.add(pts); r.stars.push(pts);
    }
  }

  function buildNebula() {
    const r = three.current;
    if (!r.scene) return;
    const geo = new THREE.PlaneGeometry(5000, 2500, 60, 60);
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        time:   { value: 0 },
        color1: { value: new THREE.Color(0x7a9445) },
        color2: { value: new THREE.Color(0x2d1200) },
      },
      vertexShader: `
        varying vec2 vUv; varying float vEl;
        uniform float time;
        void main(){
          vUv=uv; vec3 p=position;
          float el=sin(p.x*.013+time)*cos(p.y*.013+time)*16.0;
          p.z+=el; vEl=el;
          gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);
        }`,
      fragmentShader: `
        uniform vec3 color1,color2; uniform float time;
        varying vec2 vUv; varying float vEl;
        void main(){
          float m=sin(vUv.x*7.0+time*.35)*cos(vUv.y*7.0+time*.35);
          vec3 col=mix(color1,color2,m*.5+.5);
          float a=0.18*(1.0-length(vUv-0.5)*2.0)+vEl*0.003;
          gl_FragColor=vec4(col,clamp(a,0.0,1.0));
        }`,
      transparent: true, blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide, depthWrite: false,
    });
    r.nebula = new THREE.Mesh(geo, mat);
    r.nebula.position.z = -900;
    r.scene.add(r.nebula);
  }

  function buildMountains() {
    const r = three.current;
    if (!r.scene) return;
    const layers = [
      { z: -40,  h: 50,  color: 0x08080c, opacity: 1   },
      { z: -90,  h: 70,  color: 0x0a0a10, opacity: 0.9 },
      { z: -140, h: 90,  color: 0x0c0c14, opacity: 0.7 },
      { z: -190, h: 110, color: 0x0e0e18, opacity: 0.5 },
    ];
    layers.forEach((layer, idx) => {
      const pts: THREE.Vector2[] = [];
      const SEG = 55;
      for (let i = 0; i <= SEG; i++) {
        const x = (i / SEG - 0.5) * 1100;
        const y =
          Math.sin(i * 0.07 + idx * 1.2) * layer.h +
          Math.sin(i * 0.035 + idx * 0.8) * layer.h * 0.4 +
          (Math.random() - 0.5) * layer.h * 0.12 - 110;
        pts.push(new THREE.Vector2(x, y));
      }
      pts.push(new THREE.Vector2(6000, -500), new THREE.Vector2(-6000, -500));
      const mesh = new THREE.Mesh(
        new THREE.ShapeGeometry(new THREE.Shape(pts)),
        new THREE.MeshBasicMaterial({ color: layer.color, transparent: true, opacity: layer.opacity, side: THREE.DoubleSide })
      );
      mesh.position.set(0, layer.z * 0.5, layer.z);
      r.scene!.add(mesh); r.mountains.push(mesh);
    });
  }

  function buildAtmosphere() {
    const r = three.current;
    if (!r.scene) return;
    const mat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        varying vec3 vN;
        void main(){ vN=normalize(normalMatrix*normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
      fragmentShader: `
        varying vec3 vN; uniform float time;
        void main(){
          float i=pow(0.62-dot(vN,vec3(0,0,1)),2.0);
          vec3 a=vec3(0.48,0.58,0.27)*i*(sin(time*1.6)*.07+.93);
          gl_FragColor=vec4(a,i*0.18);
        }`,
      side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true,
    });
    r.scene.add(new THREE.Mesh(new THREE.SphereGeometry(500, 28, 28), mat));
  }

  function tick() {
    const r = three.current;
    r.animId = requestAnimationFrame(tick);
    const t = Date.now() * 0.001;

    r.stars.forEach((s) => {
      (s.material as THREE.ShaderMaterial).uniforms.time.value = t;
    });
    if (r.nebula) (r.nebula.material as THREE.ShaderMaterial).uniforms.time.value = t * 0.45;

    if (r.camera) {
      const sc = smoothCam.current;
      sc.x += (r.targetX - sc.x) * 0.055;
      sc.y += (r.targetY - sc.y) * 0.055;
      sc.z += (r.targetZ - sc.z) * 0.055;
      r.camera.position.set(
        sc.x + Math.sin(t * 0.09) * 1.5,
        sc.y + Math.cos(t * 0.12) * 0.8,
        sc.z,
      );
      r.camera.lookAt(0, 5, -400);
    }

    r.mountains.forEach((m, i) => {
      m.position.x = Math.sin(t * 0.08) * (1.5 + i * 0.3);
    });

    r.renderer?.render(r.scene!, r.camera!);
  }

  // ── GSAP entrance ─────────────────────────────────────────
  useEffect(() => {
    if (!ready || !overlayRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(overlayRef.current.querySelectorAll(".lx-eye"),   { y: 20, opacity: 0, duration: 0.9, stagger: 0.1 })
      .from(overlayRef.current.querySelectorAll(".lx-char"),  { y: 100, opacity: 0, duration: 1.3, stagger: 0.04 }, "-=0.5")
      .from(overlayRef.current.querySelectorAll(".lx-sub"),   { y: 30, opacity: 0, duration: 0.9, stagger: 0.12 }, "-=0.7")
      .from(overlayRef.current.querySelectorAll(".lx-ui"),    { opacity: 0, y: 15, duration: 0.7 }, "-=0.4");
    return () => { tl.kill(); };
  }, [ready]);

  // ── Scroll ────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const rect   = containerRef.current.getBoundingClientRect();
      const total  = containerRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const prog   = Math.max(0, Math.min(scrolled / total, 1));

      setProgress(prog);
      const raw = prog * TOTAL;
      setSectionIdx(Math.min(Math.floor(raw), TOTAL - 1));

      const r   = three.current;
      const waypoints = [
        { x: 0, y: 20, z: 280 },
        { x: 0, y: 35, z: -20 },
        { x: 0, y: 50, z: -600 },
      ];
      const si  = Math.min(Math.floor(raw), TOTAL - 1);
      const fr  = raw % 1;
      const cur = waypoints[si];
      const nxt = waypoints[Math.min(si + 1, TOTAL - 1)];
      r.targetX = cur.x + (nxt.x - cur.x) * fr;
      r.targetY = cur.y + (nxt.y - cur.y) * fr;
      r.targetZ = cur.z + (nxt.z - cur.z) * fr;

      r.mountains.forEach((m, i) => {
        m.position.z = prog > 0.9 ? 999999 : r.mountainBaseZ[i];
        if (r.nebula) r.nebula.position.z = r.mountainBaseZ[3] - 200 - scrolled * (0.3 + i * 0.1);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sec = SECTIONS[sectionIdx];

  return (
    <div
      ref={containerRef}
      style={{ height: `${TOTAL * 100}vh`, position: "relative" }}
    >
      {/* ── Sticky viewport — canvas lives entirely in here ── */}
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top:      0,
          height:   "100vh",
          overflow: "hidden",
          background: "#05050a",
        }}
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />

        {/* Vignette */}
        <div
          style={{
            position:   "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 25%, rgba(5,5,10,0.7) 100%)",
          }}
        />

        {/* ── Content overlay ── */}
        <div
          ref={overlayRef}
          style={{
            position: "absolute", inset: 0, display: "flex",
            flexDirection: "column", alignItems: "center", justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          {/* Eyebrow */}
          <p
            className="lx-eye font-mono"
            style={{
              fontSize: "0.55rem", letterSpacing: "0.45em", textTransform: "uppercase",
              color: "var(--gold)", marginBottom: "1.75rem",
            }}
          >
            {sec.eyebrow}
          </p>

          {/* Title */}
          <h2
            className="font-display font-light text-center"
            style={{
              fontSize: "clamp(4rem, 11vw, 9rem)", lineHeight: 1,
              letterSpacing: "-0.02em", color: "var(--text-primary)",
              marginBottom: "2rem", overflow: "hidden",
            }}
          >
            {sec.title.split("").map((ch, i) => (
              <span key={i} className="lx-char inline-block">{ch === " " ? " " : ch}</span>
            ))}
          </h2>

          {/* Divider */}
          <div style={{ width: "2.5rem", height: "1px", background: "var(--gold)", opacity: 0.45, marginBottom: "1.75rem" }} />

          {/* Subtitle */}
          <p className="lx-sub font-light text-center" style={{ fontSize: "clamp(0.8rem, 1.2vw, 0.95rem)", color: "var(--text-secondary)", marginBottom: "0.35rem", letterSpacing: "0.02em" }}>
            {sec.line1}
          </p>
          <p className="lx-sub font-light text-center" style={{ fontSize: "clamp(0.8rem, 1.2vw, 0.95rem)", color: "var(--text-secondary)", letterSpacing: "0.02em" }}>
            {sec.line2}
          </p>
        </div>

        {/* ── Left progress bar ── */}
        <div
          className="lx-ui"
          style={{
            position: "absolute", left: "2rem", top: "50%", transform: "translateY(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem",
            pointerEvents: "none",
          }}
        >
          <div style={{ width: "1px", height: "5rem", background: "rgba(122,148,69,0.15)", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", background: "var(--gold)", height: `${progress * 100}%`, transition: "height 0.1s" }} />
          </div>
          {SECTIONS.map((_, i) => (
            <div key={i} style={{ width: "3px", height: "3px", borderRadius: "50%", background: i === sectionIdx ? "var(--gold)" : "rgba(122,148,69,0.2)", transition: "background 0.4s" }} />
          ))}
        </div>

        {/* ── Bottom scroll cue ── */}
        <div
          className="lx-ui"
          style={{
            position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem",
            pointerEvents: "none",
          }}
        >
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.48rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--text-muted)" }}>Scroll</p>
          <div style={{ width: "1px", height: "2.5rem", background: "linear-gradient(to bottom, var(--gold), transparent)", animation: "luxCaret 1.9s ease-in-out infinite" }} />
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.48rem", letterSpacing: "0.3em", color: "var(--text-muted)" }}>
            {String(sectionIdx + 1).padStart(2,"0")} / {String(TOTAL).padStart(2,"0")}
          </p>
        </div>

        <style>{`@keyframes luxCaret { 0%,100%{opacity:.4;transform:scaleY(1)} 50%{opacity:1;transform:scaleY(1.3)} }`}</style>
      </div>
    </div>
  );
};

export default Component;
