import { useEffect, useState } from "react";

export function Loader() {
  const [gone, setGone] = useState(false);
  const [fade, setFade] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setFade(true), 1600);
    const t2 = setTimeout(() => setGone(true), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  if (gone) return null;
  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ${fade ? "opacity-0" : "opacity-100"}`}
      style={{ background: "var(--ivory)" }}
    >
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full"
              style={{
                background: i % 2 ? "var(--sage-deep)" : "var(--sage)",
                transform: `rotate(${i * 30}deg) translateY(-42px)`,
                animation: `pulseDot 1.4s ease-in-out ${i * 0.08}s infinite`,
              }}
            />
          ))}
        </div>
        <p
          className="font-mono text-xs uppercase tracking-[0.4em]"
          style={{ color: "var(--sage-deep)" }}
        >
          Carregando sua longevidade…
        </p>
      </div>
    </div>
  );
}