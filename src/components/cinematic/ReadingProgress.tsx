import { useEffect, useState, useSyncExternalStore } from "react";
import {
  getPillarProgress,
  subscribePillarProgress,
} from "./pillarProgress";

const PILLAR_LABELS = [
  "Sono",
  "Alimentação",
  "Exercício",
  "Estresse",
  "Ansiedade",
  "Dor",
];

/** Indicador de qual dos 6 pilares está em foco, visível apenas na seção. */
export function PillarIndicator() {
  const { inSection, active, total } = useSyncExternalStore(
    subscribePillarProgress,
    getPillarProgress,
    getPillarProgress,
  );

  return (
    <div
      aria-hidden={!inSection}
      className="fixed left-2 xl:left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-start gap-3 transition-all duration-500"
      style={{
        opacity: inSection ? 1 : 0,
        transform: `translateY(-50%) translateX(${inSection ? "0" : "-12px"})`,
        pointerEvents: "none",
      }}
    >
      {Array.from({ length: total }).map((_, i) => {
        const on = i === active;
        return (
          <div key={i} className="flex items-center gap-2">
            <span
              className="font-mono text-[10px] tracking-[0.22em] transition-all duration-300"
              style={{
                color: on ? "var(--ivory)" : "color-mix(in oklab, var(--ivory) 42%, transparent)",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className="block h-px transition-all duration-500"
              style={{
                width: on ? 26 : 12,
                background: on
                  ? "var(--sage)"
                  : "color-mix(in oklab, var(--ivory) 32%, transparent)",
              }}
            />
            <span
              className="hidden 2xl:inline font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300"
              style={{
                color: "var(--ivory)",
                opacity: on ? 0.9 : 0,
              }}
            >
              {PILLAR_LABELS[i]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const h = document.documentElement;
        const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
        setP(Math.max(0, Math.min(1, scrolled)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
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
      className="fixed bottom-4 right-24 z-40 font-mono text-xs px-3 py-2 rounded-full border hidden lg:block"
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