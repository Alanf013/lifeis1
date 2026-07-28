import { useEffect, useRef, useState } from "react";

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
    d: "O VO₂ máximo mede a capacidade do corpo de captar, transportar e utilizar oxigênio durante o esforço — um dos indicadores mais fortes de longevidade que existem. Pessoas com maior capacidade cardiorrespiratória têm menor risco de doenças cardiovasculares, diabetes tipo 2 e hipertensão. Além de ganhar anos de vida, um bom VO₂ máximo traz mais disposição no dia a dia, sono de melhor qualidade e recuperação mais rápida após o esforço.",
    f: "",
    poster:
      "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=900&q=70",
  },
  {
    n: "02",
    t: "Massa Magra / Força",
    d: "O músculo vai muito além do movimento: hoje é reconhecido como um verdadeiro órgão endócrino, liberando substâncias que beneficiam praticamente todo o organismo. Depois dos 30 anos, perdemos massa muscular naturalmente se ela não for estimulada — um processo chamado sarcopenia. Treinar força, aliado a uma boa ingestão de proteína e sono de qualidade, preserva força, protege as articulações e reduz o risco de quedas ao longo da vida.",
    f: "",
    poster:
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=900&q=70",
  },
  {
    n: "03",
    t: "Sono",
    d: "O sono é a base de toda recuperação do corpo. É durante o sono profundo que o organismo repara tecidos, regula hormônios e reduz a inflamação acumulada do dia. Dormir mal aumenta a sensibilidade à dor, atrasa a recuperação muscular e compromete a concentração e o humor no dia seguinte.",
    f: "",
    poster:
      "https://images.unsplash.com/photo-1520206183501-b80df61043c2?auto=format&fit=crop&w=900&q=70",
  },
  {
    n: "04",
    t: "Alimentação",
    d: "Mais importante do que restringir é garantir densidade nutricional — nutrientes suficientes para sustentar o metabolismo, a recuperação muscular e o controle da inflamação. Uma alimentação rica em ultraprocessados favorece processos inflamatórios que aceleram o envelhecimento, enquanto um padrão individualizado protege o sistema imunológico e potencializa os resultados do treino.",
    f: "",
    poster:
      "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=900&q=70",
  },
  {
    n: "05",
    t: "Gerenciamento do Estresse",
    d: "O estresse crônico eleva os níveis de cortisol, prejudica o sono, dificulta a recuperação muscular e reduz a motivação para manter uma rotina saudável. Entender os fatores emocionais por trás do abandono do treino é tão importante quanto o programa de exercícios em si — muitas vezes, a dificuldade não é física, mas emocional.",
    f: "",
    poster:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=900&q=70",
  },
  {
    n: "06",
    t: "Administração da Ansiedade",
    d: "O cérebro está em constante adaptação — cada hábito repetido fortalece conexões neurais ligadas à disciplina, ao autocontrole e à capacidade de lidar com desafios. O exercício físico regular estimula a liberação de endorfina, dopamina e serotonina, contribuindo diretamente para o equilíbrio emocional, a qualidade do sono e o bem-estar geral.",
    f: "",
    poster:
      "https://images.unsplash.com/photo-1476611317561-60117649dd94?auto=format&fit=crop&w=900&q=70",
  },
];

function useInView<T extends HTMLElement>(rootMargin = "120px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return { ref, inView };
}

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
          preload="metadata"
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
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
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
            <PillarCard key={p.n} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCard({ p, i }: { p: Pillar; i: number }) {
  const { ref, inView } = useInView<HTMLElement>("-40px");
  return (
            <article
              ref={ref}
              className={`reveal${inView ? " reveal-in" : ""} card-lift rounded-2xl p-4 sm:p-5 border`}
              style={{
                background: "color-mix(in oklab, var(--card) 96%, transparent)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-soft)",
                transitionDelay: `${(i % 3) * 80}ms`,
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
              <p className="mt-2 text-[15px] sm:text-base leading-[1.65] text-muted-foreground">
                {p.d}
              </p>

            </article>
  );
}