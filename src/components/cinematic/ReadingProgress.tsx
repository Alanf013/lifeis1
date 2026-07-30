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
    <div className="fixed top-0 inset-x-0 h-[3px] z-[60]" style={{ background: "color-mix(in oklab, var(--sage) 10%, transparent)" }}>
      <div
        className="h-full transition-[width] duration-100"
        style={{
          width: `${p * 100}%`,
          background: "linear-gradient(90deg, var(--sage), var(--sage-deep))",
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
      className="fixed bottom-4 right-24 z-40 font-mono text-xs px-3 py-2 rounded-full border hidden sm:block"
      style={{
        color: "var(--sage-deep)",
        borderColor: "color-mix(in oklab, var(--sage-deep) 30%, transparent)",
        background: "color-mix(in oklab, var(--ivory) 75%, transparent)",
        backdropFilter: "blur(10px)",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      {t}
    </div>
  );
}