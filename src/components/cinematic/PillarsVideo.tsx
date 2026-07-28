import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Pillar = {
  n: string;
  t: string;
  d: string;
  f: string;
  poster: string;
  /** Coloque aqui os arquivos quando estiverem prontos: { mp4: "/videos/vo2.mp4", webm: "/videos/vo2.webm" } */
  video?: { mp4?: string; webm?: string };
};

const PILLARS: Pillar[] = [
  {
    n: "01",
    t: "VO₂ Máximo",
    d: "A capacidade de captar, transportar e utilizar oxigênio no esforço — um dos maiores preditores de longevidade.",
    f: "Fonte: [inserir]",
    poster:
      "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=900&q=70",
  },
  {
    n: "02",
    t: "Massa Magra / Força",
    d: "O músculo é um órgão endócrino ativo — preserva força, protege articulações e reduz inflamação.",
    f: "Fonte: Journal of Applied Physiology — Volpi et al.",
    poster:
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=900&q=70",
  },
  {
    n: "03",
    t: "Sono",
    d: "Ritmo circadiano, profundidade e regularidade como base fisiológica de toda a recuperação.",
    f: "Fonte: [inserir]",
    poster:
      "https://images.unsplash.com/photo-1520206183501-b80df61043c2?auto=format&fit=crop&w=900&q=70",
  },
  {
    n: "04",
    t: "Alimentação",
    d: "Padrão alimentar individualizado — densidade nutricional antes de restrição.",
    f: "Fonte: [inserir]",
    poster:
      "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=900&q=70",
  },
  {
    n: "05",
    t: "Gerenciamento do Estresse",
    d: "O estresse crônico eleva cortisol, prejudica o sono e reduz a recuperação muscular.",
    f: "Fonte: [inserir]",
    poster:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=900&q=70",
  },
  {
    n: "06",
    t: "Administração da Ansiedade",
    d: "Neuroplasticidade: cada hábito repetido fortalece conexões neurais de disciplina e autocontrole.",
    f: "Fonte: [inserir]",
    poster:
      "https://images.unsplash.com/photo-1476611317561-60117649dd94?auto=format&fit=crop&w=900&q=70",
  },
];

function PillarMedia({ p }: { p: Pillar }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hasVideo = Boolean(p.video?.mp4 || p.video?.webm);

  return (
    <div
      ref={ref}
      className="media-frame relative w-full aspect-[4/5] overflow-hidden rounded-xl"
      style={{ background: "color-mix(in oklab, var(--sage) 18%, transparent)" }}
    >
      {visible && hasVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={p.poster}
          className="w-full h-full object-cover"
        >
          {p.video?.webm ? <source src={p.video.webm} type="video/webm" /> : null}
          {p.video?.mp4 ? <source src={p.video.mp4} type="video/mp4" /> : null}
        </video>
      ) : (
        <img
          src={p.poster}
          alt={p.t}
          loading="lazy"
          decoding="async"
          className="ken-burns w-full h-full object-cover"
          style={{ animationDelay: `${(Number(p.n) % 3) * 1.6}s` }}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 45%, color-mix(in oklab, var(--deep-blue) 45%, transparent))",
        }}
      />
      <span
        className="absolute bottom-3 left-3 font-mono text-[11px] tracking-[0.3em]"
        style={{ color: "var(--ivory)" }}
      >
        {p.n}
      </span>
    </div>
  );
}

export function PillarsVideo() {
  return (
    <section id="pilares" className="relative py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10 md:mb-14">
          <div
            className="text-[12px] uppercase tracking-[0.3em] font-mono font-medium mb-5"
            style={{ color: "var(--sage-deep)" }}
          >
            <span
              className="inline-block h-px w-8 align-middle mr-3"
              style={{ background: "var(--sage-deep)" }}
            />
            Pilares · 06
          </div>
          <h2
            className="text-4xl sm:text-5xl leading-[1.05] tracking-[-0.02em] font-normal"
            style={{ fontFamily: "var(--font-serif)", color: "var(--deep-blue)" }}
          >
            Seis pilares.
            <span className="block italic text-muted-foreground">Uma estratégia.</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.article
              key={p.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.23, 1, 0.32, 1] }}
              className="rounded-2xl p-4 sm:p-5 border"
              style={{
                background: "color-mix(in oklab, var(--card) 96%, transparent)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <PillarMedia p={p} />
              <div
                className="mt-5 font-mono text-xs tracking-[0.3em]"
                style={{ color: "var(--sage-deep)" }}
              >
                {p.n}
              </div>
              <h3
                className="mt-1 text-2xl sm:text-3xl leading-tight"
                style={{ fontFamily: "var(--font-serif)", color: "var(--deep-blue)" }}
              >
                {p.t}
              </h3>
              <p className="mt-2 text-base sm:text-lg leading-[1.6] text-muted-foreground">
                {p.d}
              </p>
              <p
                className="mt-4 text-[11px] uppercase tracking-[0.2em] font-mono font-medium break-words"
                style={{ color: "var(--sage-deep)" }}
              >
                {p.f}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}