"use client";
/**
 * src/components/ui/neural-noise.tsx
 * Interactive WebGL neural noise shader.
 * Pointer/touch moves the noise origin — fully reactive.
 */
import { useEffect, useRef } from "react";

interface NeuralNoiseProps {
  /** RGB floats 0–1. Default: Luxurianc olive #7a9445 */
  color?: [number, number, number];
  opacity?: number;
  speed?: number;
  /** true = fixed (full page), false = absolute (fills parent). Default: false */
  fixed?: boolean;
}

export function NeuralNoise({
  color   = [0.48, 0.60, 0.27],
  opacity = 0.92,
  speed   = 0.0008,
  fixed   = false,
}: NeuralNoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pointer = { x: 0, y: 0, tX: 0.5, tY: 0.5 };
    let gl: WebGLRenderingContext | null = null;
    let uniforms: Record<string, WebGLUniformLocation | null> = {};
    let rafId: number;

    // ── shaders ────────────────────────────────────────────────
    const vsSource = `
      precision mediump float;
      varying vec2 vUv;
      attribute vec2 a_position;
      void main() {
        vUv = 0.5 * (a_position + 1.0);
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform float u_time;
      uniform float u_ratio;
      uniform vec2  u_pointer_position;
      uniform vec3  u_color;
      uniform float u_speed;

      vec2 rotate(vec2 uv, float th) {
        return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
      }

      float neuro_shape(vec2 uv, float t, float p) {
        vec2 sine_acc = vec2(0.0);
        vec2 res      = vec2(0.0);
        float scale   = 8.0;
        for (int j = 0; j < 15; j++) {
          uv        = rotate(uv, 1.0);
          sine_acc  = rotate(sine_acc, 1.0);
          vec2 layer = uv * scale + float(j) + sine_acc - t;
          sine_acc  += sin(layer) + 2.4 * p;
          res       += (0.5 + 0.5 * cos(layer)) / scale;
          scale     *= 1.2;
        }
        return res.x + res.y;
      }

      void main() {
        vec2 uv       = 0.5 * vUv;
        uv.x         *= u_ratio;
        vec2 pointer  = vUv - u_pointer_position;
        pointer.x    *= u_ratio;
        float p       = clamp(length(pointer), 0.0, 1.0);
        p             = 0.5 * pow(1.0 - p, 2.0);
        float t       = u_speed * u_time;
        float noise   = neuro_shape(uv, t, p);
        noise         = 1.2 * pow(noise, 3.0);
        noise        += pow(noise, 10.0);
        noise         = max(0.0, noise - 0.5);
        noise        *= (1.0 - length(vUv - 0.5));
        vec3 col      = u_color * noise;
        gl_FragColor  = vec4(col, noise);
      }
    `;

    // ── helpers ────────────────────────────────────────────────
    function createShader(ctx: WebGLRenderingContext, src: string, type: number) {
      const shader = ctx.createShader(type)!;
      ctx.shaderSource(shader, src);
      ctx.compileShader(shader);
      if (!ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)) {
        console.error("Shader error:", ctx.getShaderInfoLog(shader));
        ctx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function createProgram(ctx: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader) {
      const prog = ctx.createProgram()!;
      ctx.attachShader(prog, vs);
      ctx.attachShader(prog, fs);
      ctx.linkProgram(prog);
      if (!ctx.getProgramParameter(prog, ctx.LINK_STATUS)) {
        console.error("Program error:", ctx.getProgramInfoLog(prog));
        return null;
      }
      return prog;
    }

    // ── init ──────────────────────────────────────────────────
    const ctx = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!ctx) return;
    gl = ctx;

    const vs  = createShader(gl, vsSource, gl.VERTEX_SHADER);
    const fs  = createShader(gl, fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const prog = createProgram(gl, vs, fs);
    if (!prog) return;

    // collect uniforms
    const uCount = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS) as number;
    for (let i = 0; i < uCount; i++) {
      const info = gl.getActiveUniform(prog, i);
      if (info) uniforms[info.name] = gl.getUniformLocation(prog, info.name);
    }

    const verts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buf   = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    gl.useProgram(prog);

    const posLoc = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    gl.uniform3f(uniforms.u_color, color[0], color[1], color[2]);
    gl.uniform1f(uniforms.u_speed, speed);

    // ── resize ────────────────────────────────────────────────
    function resize() {
      if (!gl || !canvas) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w   = canvas.offsetWidth  * dpr;
      const h   = canvas.offsetHeight * dpr;
      canvas.width  = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      if (uniforms.u_ratio) gl.uniform1f(uniforms.u_ratio, w / h);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── pointer tracking ──────────────────────────────────────
    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.tX = (e.clientX - rect.left) / rect.width;
      pointer.tY = (e.clientY - rect.top)  / rect.height;
    }
    function onTouch(e: TouchEvent) {
      if (!e.targetTouches[0] || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      pointer.tX = (e.targetTouches[0].clientX - rect.left) / rect.width;
      pointer.tY = (e.targetTouches[0].clientY - rect.top)  / rect.height;
    }
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("touchmove",   onTouch);

    // ── render loop ───────────────────────────────────────────
    function render() {
      if (!gl) return;
      pointer.x += (pointer.tX - pointer.x) * 0.2;
      pointer.y += (pointer.tY - pointer.y) * 0.2;
      gl.uniform1f(uniforms.u_time,             performance.now());
      gl.uniform2f(uniforms.u_pointer_position, pointer.x, 1 - pointer.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(render);
    }
    render();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove",   onTouch);
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [color, speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      fixed ? "fixed" : "absolute",
        top:           0,
        left:          0,
        width:         "100%",
        height:        "100%",
        pointerEvents: "none",
        opacity,
      }}
    />
  );
}
