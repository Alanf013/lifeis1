import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setP(Math.max(0, Math.min(1, scrolled)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 inset-x-0 h-[3px] z-[60] bg-white/5">
      <div
        className="h-full transition-[width] duration-100"
        style={{
          width: `${p * 100}%`,
          background: "linear-gradient(90deg,#00D4FF,#FF6B35)",
          boxShadow: "0 0 12px #00D4FF",
        }}
      />
    </div>
  );
}

export function NeonClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setT(d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      className="fixed bottom-4 right-4 z-40 font-mono text-xs px-3 py-2 rounded-full border hidden sm:block"
      style={{
        color: "#00D4FF",
        borderColor: "rgba(0,212,255,0.4)",
        background: "rgba(10,15,31,0.6)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 0 16px rgba(0,212,255,0.25)",
      }}
    >
      {t}
    </div>
  );
}