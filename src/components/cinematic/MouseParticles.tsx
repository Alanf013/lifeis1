import { useEffect, useRef } from "react";

export function MouseParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const MAX = isMobile ? 20 : 80;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const parts: { x: number; y: number; vx: number; vy: number; life: number }[] = [];
    const push = (x: number, y: number) => {
      if (parts.length > MAX) parts.shift();
      parts.push({
        x, y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6 - 0.3,
        life: 1,
      });
    };
    const onMove = (e: MouseEvent) => push(e.clientX, e.clientY);
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy; p.life -= 0.012;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(82, 121, 111, ${Math.max(0, p.life) * 0.7})`;
        ctx.fill();
      }
      for (let i = parts.length - 1; i >= 0; i--) if (parts[i].life <= 0) parts.splice(i, 1);
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[5]" aria-hidden />;
}