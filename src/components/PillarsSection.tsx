import { useEffect, useRef, useState } from "react";

type Pillar = {
  n: string;
  t: string;
  d: string;
  src: string;
  ref: string;
  img: string;
};

const PILLARS: Pillar[] = [
  {
    n: "01",
    t: "Sono",
    d: "Ritmo circadiano, profundidade e regularidade como base fisiológica.",
    src: "Walker M. — Why We Sleep · Nature Neuroscience",
    ref: "SLEEP-01",
    img: "https://images.unsplash.com/photo-1520206183501-b80df61043c2?auto=format&fit=crop&w=1400&q=80",
  },
  {
    n: "02",
    t: "Alimentação",
    d: "Padrão alimentar individualizado — densidade nutricional antes de restrição.",
    src: "Ludwig D. — JAMA Internal Medicine",
    ref: "NUTR-02",
    img: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=1400&q=80",
  },
  {
    n: "03",
    t: "Atividade física",
    d: "Força, mobilidade e capacidade aeróbica em doses progressivas.",
    src: "Attia P. — Br. J. Sports Medicine",
    ref: "MOV-03",
    img: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1400&q=80",
  },
  {
    n: "04",
    t: "Gerenciamento de estresse",
    d: "Regulação autonômica e recuperação como prática, não exceção.",
    src: "McEwen B. — Physiological Reviews",
    ref: "STR-04",
    img: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1400&q=80",
  },
  {
    n: "05",
    t: "Administração de ansiedade",
    d: "Ferramentas cognitivas e comportamentais aplicadas ao dia a dia.",
    src: "Hofmann S. — Cognitive Therapy & Research",
    ref: "ANX-05",
    img: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1400&q=80",
  },
  {
    n: "06",
    t: "Dor",
    d: "Leitura da dor crônica e estratégia para reduzir sua interferência.",
    src: "Moseley L. — The Lancet",
    ref: "PAIN-06",
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=80",
  },
];

// Distinct images per pillar (edited for variety)
PILLARS[3].img = "https://images.unsplash.com/photo-1476611317561-60117649dd94?auto=format&fit=crop&w=1400&q=80";
PILLARS[4].img = "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1400&q=80";

const BG = "#0B0E14";
const PANEL = "#12161F";
const INK = "#F2EFE9";
const ACCENT = "#B8935A";
const LINE = "#262C38";

export function PillarsSection() {
  const [active, setActive] = useState<number>(0);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);

  const focus = (i: number) => {
    setActive(i);
    const el = rowRefs.current[i];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // Dial geometry
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const r = 130;

  return (
    <section
      id="pilares"
      className="relative overflow-hidden py-20 md:py-32"
      style={{ backgroundColor: BG, color: INK }}
    >
      {/* Radial depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 30%, rgba(184,147,90,0.10), transparent 70%)",
        }}
      />
      {/* Film grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0'/></filter><rect width='100%25' height='100%25' filter='url(%23g)'/></svg>\")",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl">
          <div
            className="text-[12px] uppercase tracking-[0.3em] mb-6 font-mono font-medium"
            style={{ color: ACCENT }}
          >
            <span
              className="inline-block h-px w-8 align-middle mr-3"
              style={{ backgroundColor: ACCENT }}
            />
            Pilares · 06
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] text-balance font-normal"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Seis pilares.
            <span className="block italic opacity-80">Uma estratégia.</span>
          </h2>
        </div>

        {/* Dial */}
        <div className="mt-12 md:mt-16 hidden md:flex justify-center">
          <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={LINE}
                strokeWidth={1}
              />
              <circle
                cx={cx}
                cy={cy}
                r={r - 22}
                fill="none"
                stroke={LINE}
                strokeWidth={0.5}
                strokeDasharray="2 6"
              />
              {/* tick marks */}
              {Array.from({ length: 60 }).map((_, i) => {
                const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
                const x1 = cx + Math.cos(a) * (r + 4);
                const y1 = cy + Math.sin(a) * (r + 4);
                const x2 = cx + Math.cos(a) * (r + (i % 5 === 0 ? 12 : 8));
                const y2 = cy + Math.sin(a) * (r + (i % 5 === 0 ? 12 : 8));
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={LINE}
                    strokeWidth={i % 5 === 0 ? 1 : 0.5}
                  />
                );
              })}
              {/* center marker */}
              <circle cx={cx} cy={cy} r={2} fill={ACCENT} />
              <text
                x={cx}
                y={cy - 14}
                textAnchor="middle"
                fill={INK}
                fontSize="9"
                fontFamily="ui-monospace, SFMono-Regular, monospace"
                letterSpacing="3"
                opacity="0.6"
              >
                CIRCADIAN
              </text>
              <text
                x={cx}
                y={cy + 22}
                textAnchor="middle"
                fill={ACCENT}
                fontSize="11"
                fontFamily="ui-monospace, SFMono-Regular, monospace"
                letterSpacing="2"
              >
                {String(active + 1).padStart(2, "0")} / 06
              </text>
            </svg>

            {/* Markers */}
            {PILLARS.map((p, i) => {
              const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
              const x = cx + Math.cos(a) * r;
              const y = cy + Math.sin(a) * r;
              const labelX = cx + Math.cos(a) * (r + 34);
              const labelY = cy + Math.sin(a) * (r + 34);
              const isActive = i === active;
              return (
                <button
                  key={p.n}
                  onClick={() => focus(i)}
                  onMouseEnter={() => setActive(i)}
                  aria-label={`Ir para ${p.t}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: x, top: y }}
                >
                  <span
                    className="block rounded-full transition-all duration-300"
                    style={{
                      width: isActive ? 14 : 8,
                      height: isActive ? 14 : 8,
                      backgroundColor: ACCENT,
                      boxShadow: isActive
                        ? `0 0 0 6px rgba(184,147,90,0.15)`
                        : "none",
                    }}
                  />
                  <span
                    className="absolute whitespace-nowrap text-[10px] uppercase tracking-[0.22em] font-mono transition-opacity"
                    style={{
                      left: labelX - x,
                      top: labelY - y,
                      transform: "translate(-50%, -50%)",
                      color: isActive ? INK : "rgba(242,239,233,0.55)",
                    }}
                  >
                    {p.n} · {p.t.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Vertical list / accordion */}
        <div
          className="mt-12 md:mt-20 border-t"
          style={{ borderColor: LINE }}
        >
          {PILLARS.map((p, i) => {
            const isOpen = i === active;
            return (
              <div
                key={p.n}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                className="border-b"
                style={{ borderColor: LINE }}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <button
                  className="w-full text-left grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-8 py-5 sm:py-7 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span
                    className="italic font-normal leading-none text-3xl sm:text-5xl transition-colors"
                    style={{
                      fontFamily: "var(--font-serif)",
                      color: isOpen ? ACCENT : "rgba(242,239,233,0.55)",
                    }}
                  >
                    {p.n}
                  </span>
                  <span
                    className="italic text-xl sm:text-3xl md:text-4xl transition-colors leading-tight"
                    style={{
                      fontFamily: "var(--font-serif)",
                      color: isOpen ? INK : "rgba(242,239,233,0.75)",
                    }}
                  >
                    {p.t}
                  </span>
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.25em] hidden sm:inline"
                    style={{ color: isOpen ? ACCENT : "rgba(242,239,233,0.35)" }}
                  >
                    {p.ref}
                  </span>
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="grid md:grid-cols-[1fr_minmax(0,42%)] gap-6 md:gap-10 pb-8 md:pb-12">
                      <div className="pl-0 sm:pl-[calc(2.5rem+2rem)] md:pl-[calc(3rem+2rem)] max-w-xl">
                        <p
                          className="text-lg sm:text-xl leading-[1.65]"
                          style={{ color: "rgba(242,239,233,0.92)" }}
                        >
                          {p.d}
                        </p>
                        <p
                          className="mt-5 font-mono text-[11px] uppercase tracking-[0.25em] font-medium"
                          style={{ color: ACCENT }}
                        >
                          Fonte · {p.src}
                        </p>
                      </div>
                      <div
                        className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden"
                        style={{ backgroundColor: PANEL }}
                      >
                        <img
                          src={p.img}
                          alt={p.t}
                          loading="lazy"
                          className="w-full h-full object-cover"
                          style={{
                            filter: "grayscale(1) contrast(1.15) brightness(0.85)",
                          }}
                        />
                        <div
                          aria-hidden
                          className="absolute inset-0 mix-blend-overlay opacity-40"
                          style={{
                            backgroundImage:
                              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.7 0'/></filter><rect width='100%25' height='100%25' filter='url(%23g)'/></svg>\")",
                          }}
                        />
                        <div
                          className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-[0.3em]"
                          style={{ color: "rgba(242,239,233,0.7)" }}
                        >
                          {p.ref}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}