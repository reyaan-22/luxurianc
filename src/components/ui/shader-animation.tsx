"use client";
/**
 * src/components/ui/shader-animation.tsx
 * Full-screen GLSL shader — adapted for Luxurianc.
 * Concentric gold/amber ripple rings on deep black.
 */
import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    uniforms: { time: { value: number }; resolution: { value: THREE.Vector2 } };
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    // Gold/amber ripple — warm tones only, dark background
    const fragmentShader = `
      precision highp float;
      uniform vec2  resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.04;
        float lineWidth = 0.0025;

        // Luminance accumulator
        float lum = 0.0;
        for (int i = 0; i < 6; i++) {
          float fi = float(i);
          lum += lineWidth * (fi * fi + 1.0)
            / abs(fract(t + fi * 0.011) * 5.0
                  - length(uv)
                  + mod(uv.x + uv.y, 0.22));
        }

        // Gold palette: dark bg + warm highlight
        vec3 bg   = vec3(0.020, 0.020, 0.028);      // #050508
        vec3 gold = vec3(0.72, 0.58, 0.27) * lum * 2.8; // olive-gold glow
        vec3 col  = clamp(bg + gold, 0.0, 1.0);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const camera = new THREE.Camera();
    camera.position.z = 1;

    const scene   = new THREE.Scene();
    const geo     = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      time:       { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    };

    const mat  = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    scene.add(new THREE.Mesh(geo, mat));

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.resolution.value.set(renderer.domElement.width, renderer.domElement.height);
    };
    resize();
    window.addEventListener("resize", resize, false);

    const animate = () => {
      const id = requestAnimationFrame(animate);
      uniforms.time.value += 0.05;
      renderer.render(scene, camera);
      if (sceneRef.current) sceneRef.current.animationId = id;
    };

    sceneRef.current = { renderer, uniforms, animationId: 0 };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        if (container.contains(sceneRef.current.renderer.domElement))
          container.removeChild(sceneRef.current.renderer.domElement);
        sceneRef.current.renderer.dispose();
      }
      geo.dispose();
      mat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    />
  );
}
