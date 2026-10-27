import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  alpha: number;
}

const COLORS = ["#4ad4c2", "#00ffcc", "#4ad4c2", "#3bc4b2", "rgba(255,255,255,0.4)"];

function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const COUNT = isTouch ? 60 : 100;
    const CONNECT_DIST = 150;
    const MOUSE_DIST = 200;

    let w = 0;
    let h = 0;
    let animId = 0;
    let paused = false;
    const mouse = { x: -9999, y: -9999 };

    // Aurora blobs
    const auroras = [
      { x: 0.2, y: 0.3, r: 400, color: "rgba(74,212,194,0.06)", vx: 0.0001, vy: 0.00015 },
      { x: 0.7, y: 0.6, r: 350, color: "rgba(227,6,19,0.04)", vx: -0.00012, vy: 0.0001 },
      { x: 0.5, y: 0.8, r: 300, color: "rgba(0,255,204,0.05)", vx: 0.00008, vy: -0.00013 },
    ];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
        color: randomColor(),
        alpha: Math.random() * 0.5 + 0.3,
      });
    }

    function onMouse(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    window.addEventListener("mousemove", onMouse);

    function onVisibility() {
      paused = document.hidden;
      if (!paused) animId = requestAnimationFrame(loop);
    }
    document.addEventListener("visibilitychange", onVisibility);

    function loop() {
      if (paused) return;
      ctx!.clearRect(0, 0, w, h);

      // Draw aurora blobs
      for (const a of auroras) {
        if (!reducedMotion) {
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < 0 || a.x > 1) a.vx *= -1;
          if (a.y < 0 || a.y > 1) a.vy *= -1;
        }
        const grad = ctx!.createRadialGradient(a.x * w, a.y * h, 0, a.x * w, a.y * h, a.r);
        grad.addColorStop(0, a.color);
        grad.addColorStop(1, "transparent");
        ctx!.fillStyle = grad;
        ctx!.fillRect(0, 0, w, h);
      }

      if (reducedMotion) {
        // Just draw static dots
        for (const p of particles) {
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx!.fillStyle = p.color;
          ctx!.globalAlpha = p.alpha;
          ctx!.fill();
        }
        ctx!.globalAlpha = 1;
        animId = requestAnimationFrame(loop);
        return;
      }

      // Update & draw particles
      for (const p of particles) {
        // Mouse attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_DIST && dist > 0) {
          const force = (MOUSE_DIST - dist) / MOUSE_DIST * 0.015;
          p.vx += dx / dist * force;
          p.vy += dy / dist * force;
        }

        // Apply velocity with damping
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Wrap around edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Draw particle
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = p.alpha;
        ctx!.fill();
      }

      // Draw connections
      ctx!.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.15;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = "#4ad4c2";
            ctx!.globalAlpha = alpha;
            ctx!.stroke();
          }
        }
      }

      ctx!.globalAlpha = 1;
      animId = requestAnimationFrame(loop);
    }

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background: "transparent" }}
    />
  );
}
