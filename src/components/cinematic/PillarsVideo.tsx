import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, ArrowUp } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { WordReveal } from "./TextReveal";
import { setPillarProgress } from "./pillarProgress";

type Pillar = {
  n: string;
  t: string;
  d: string;
  f: string;
  poster: string;
  /** arquivo de áudio ambiente do pilar (loop, volume baixo) */
  audio?: string;
};

const PILLARS: Pillar[] = [
  {
    n: "01",
    t: "Sono",
    d: "Quem dorme mal tende a comer pior porque a falta de sono desregula os hormônios da fome. Ela aumenta a grelina (hormônio que estimula a fome), reduz a leptina (hormônio da saciedade) e altera áreas do cérebro ligadas ao prazer e ao controle dos impulsos, aumentando o desejo por alimentos calóricos, doces e gordurosos.",
    f: "",
    poster:
      "https://images.unsplash.com/photo-1520206183501-b80df61043c2?auto=format&fit=crop&w=900&q=70",
    audio: "/audio/sono.mp3",
  },
  {
    n: "02",
    t: "Alimentação",
    d: "Mais importante do que restringir é garantir densidade nutricional — nutrientes suficientes para sustentar o metabolismo, a recuperação muscular e o controle da inflamação. Uma alimentação rica em ultraprocessados favorece processos inflamatórios que aceleram o envelhecimento, enquanto um padrão individualizado protege o sistema imunológico e potencializa os resultados do treino.",
    f: "",
    poster:
      "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=900&q=70",
    audio: "/audio/alimentacao.mp3",
  },
  {
    n: "03",
    t: "Exercício Físico",
    d: "O exercício físico é a base da longevidade saudável e combina dois fatores essenciais: capacidade cardiorrespiratória e força muscular. A capacidade de captar, transportar e utilizar oxigênio durante o esforço (VO₂ máximo) é um dos indicadores mais fortes de menor risco cardiovascular e maior expectativa de vida. Já o músculo funciona como um verdadeiro órgão endócrino — treinar força preserva massa magra, protege as articulações, melhora o equilíbrio e reduz o risco de quedas, especialmente a partir dos 30 anos, quando a perda muscular natural (sarcopenia) começa a acelerar.",
    f: "",
    poster:
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=900&q=70",
    audio: "/audio/exercicio.mp3",
  },
  {
    n: "04",
    t: "Gerenciamento do Estresse",
    d: "O estresse crônico eleva os níveis de cortisol, prejudica o sono, dificulta a recuperação muscular e reduz a motivação para manter uma rotina saudável. Entender os fatores emocionais por trás do abandono do treino é tão importante quanto o programa de exercícios em si — muitas vezes, a dificuldade não é física, mas emocional.",
    f: "",
    poster:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=900&q=70",
    audio: "/audio/estresse.mp3",
  },
  {
    n: "05",
    t: "Administração da Ansiedade",
    d: "O cérebro está em constante adaptação — cada hábito repetido fortalece conexões neurais ligadas à disciplina, ao autocontrole e à capacidade de lidar com desafios. O exercício físico regular estimula a liberação de endorfina, dopamina e serotonina, contribuindo diretamente para o equilíbrio emocional, a qualidade do sono e o bem-estar geral.",
    f: "",
    poster:
      "https://images.unsplash.com/photo-1476611317561-60117649dd94?auto=format&fit=crop&w=900&q=70",
    audio: "/audio/ansiedade.mp3",
  },
  {
    n: "06",
    t: "Dor",
    d: "A dor raramente tem uma única causa — na maioria das vezes, resulta da interação entre fatores físicos, metabólicos, emocionais e comportamentais. Sono, alimentação, exercício e gerenciamento do estresse influenciam diretamente a recuperação dos tecidos, a inflamação e a forma como o corpo responde a lesões. Quando esses pilares são mantidos de forma consistente, a incidência de dores tende a diminuir, o risco de lesões cai e, caso aconteçam, a recuperação costuma ser mais rápida.",
    f: "",
    poster:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=70",
    audio: "/audio/dor.mp3",
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

/** Crossfade de áudio ambiente entre pilares, só depois de o usuário ativar o som. */
function useAmbientAudio(enabled: boolean, activeIndex: number) {
  const elsRef = useRef<Record<number, HTMLAudioElement>>({});
  const fadeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      Object.values(elsRef.current).forEach((a) => {
        a.pause();
        a.currentTime = 0;
      });
      return;
    }
    const target = PILLARS[activeIndex]?.audio;
    if (!target) return;

    let el = elsRef.current[activeIndex];
    if (!el) {
      el = new Audio(target);
      el.loop = true;
      el.preload = "none";
      el.volume = 0;
      elsRef.current[activeIndex] = el;
    }
    el.play().catch(() => {});

    const MAX = 0.25;
    const STEP = 1000 / 60 / 500; // 0.5s
    if (fadeRef.current) window.clearInterval(fadeRef.current);
    fadeRef.current = window.setInterval(() => {
      let done = true;
      Object.entries(elsRef.current).forEach(([k, a]) => {
        const isActive = Number(k) === activeIndex;
        const goal = isActive ? MAX : 0;
        const delta = STEP * MAX;
        if (Math.abs(a.volume - goal) <= delta) {
          a.volume = goal;
          if (!isActive && a.volume === 0 && !a.paused) a.pause();
        } else {
          a.volume = Math.min(1, Math.max(0, a.volume + (a.volume < goal ? delta : -delta)));
          done = false;
        }
      });
      if (done && fadeRef.current) {
        window.clearInterval(fadeRef.current);
        fadeRef.current = null;
      }
    }, 1000 / 60);

    return () => {
      if (fadeRef.current) {
        window.clearInterval(fadeRef.current);
        fadeRef.current = null;
      }
    };
  }, [enabled, activeIndex]);

  useEffect(
    () => () => {
      Object.values(elsRef.current).forEach((a) => a.pause());
      elsRef.current = {};
    },
    [],
  );
}

export function PillarsVideo() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [active, setActive] = useState(0);

  useAmbientAudio(soundOn, active);

  const reduce = Boolean(useReducedMotion());

  // Publica o pilar ativo para o indicador global de progresso.
  useEffect(() => {
    setPillarProgress({ active, total: PILLARS.length });
  }, [active]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => setPillarProgress({ inSection: e.isIntersecting })),
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      setPillarProgress({ inSection: false });
    };
  }, []);

  const backToTop = useCallback(() => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const bgPoster = PILLARS[active]?.poster;

  return (
    <section
      id="pilares"
      ref={sectionRef}
      className="relative isolate overflow-hidden py-14 md:py-20"
      style={{ background: "var(--deep-blue)" }}
    >
      {/* Fundo: imagem do pilar ativo, com crossfade suave a cada troca — sem vídeo, leve e confiável */}
      <AnimatePresence>
        <motion.div
          key={bgPoster}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 1.1, ease: "easeInOut" }}
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${bgPoster})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "saturate(0.85) contrast(1.05) blur(1px)",
          }}
        />
      </AnimatePresence>
      {/* Vinheta cinematográfica: escuro nas bordas e no topo/rodapé, mais claro no centro para deixar a imagem respirar */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.68) 55%, rgba(0,0,0,0.9) 100%)",
        }}
      />
      {/* Reforço no topo e no rodapé para transicionar suavemente com as seções vizinhas */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.75) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.8) 100%)",
        }}
      />
      {/* Grain analógico */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none mix-blend-overlay"
        style={{
          opacity: 0.09,
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Controle de som — silenciado por padrão */}
        <div className="flex justify-end mb-6">
          <button
            type="button"
            onClick={() => setSoundOn((v) => !v)}
            aria-pressed={soundOn}
            aria-label={soundOn ? "Desativar som ambiente" : "Ativar som ambiente"}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-full border font-mono text-[11px] uppercase tracking-[0.24em] transition-colors"
            style={{
              color: "var(--ivory)",
              borderColor: "color-mix(in oklab, var(--ivory) 32%, transparent)",
              background: "color-mix(in oklab, black 30%, transparent)",
            }}
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            {soundOn ? "Som ligado" : "Ativar som"}
          </button>
        </div>

        <div className="sticky top-16 md:top-20 z-10 max-w-2xl mb-10 md:mb-14 pb-4 pt-2">
          <div
            aria-hidden
            className="absolute inset-x-[-1rem] inset-y-[-1rem] -z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in oklab, var(--deep-blue) 78%, transparent) 55%, transparent 100%)",
            }}
          />
          <div
            className="text-[12px] uppercase tracking-[0.3em] font-mono font-medium mb-5"
            style={{ color: "var(--sage)" }}
          >
            <span
              className="inline-block h-px w-8 align-middle mr-3"
              style={{ background: "var(--sage)" }}
            />
            Pilares · 06
          </div>
          <h2
            className="text-4xl sm:text-5xl leading-[1.05] tracking-[-0.02em] font-normal"
            style={{ fontFamily: "var(--font-serif)", color: "var(--ivory)" }}
          >
            <WordReveal as="div" text="Seis pilares." />
            <WordReveal
              as="div"
              text="Uma estratégia."
              delay={0.12}
              className="italic"
              style={{ color: "color-mix(in oklab, var(--ivory) 72%, transparent)" }}
            />
          </h2>
        </div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.n} p={p} i={i} onFocus={setActive} />
          ))}
        </div>

        {/* Fechamento / loop da experiência */}
        <div className="mt-12 md:mt-16 flex justify-center">
          <button
            type="button"
            onClick={backToTop}
            className="group inline-flex items-center gap-3 min-h-[48px] px-6 rounded-full border transition-colors"
            style={{
              color: "var(--ivory)",
              borderColor: "color-mix(in oklab, var(--ivory) 30%, transparent)",
              background: "color-mix(in oklab, black 25%, transparent)",
            }}
          >
            <ArrowUp size={18} />
            <span
              className="italic text-lg sm:text-xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Sentir tudo de novo
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

function PillarCard({
  p,
  i,
  onFocus,
}: {
  p: Pillar;
  i: number;
  onFocus: (i: number) => void;
}) {
  const { ref, inView } = useInView<HTMLElement>("-40px");

  // Foco sonoro: card ocupando mais de 50% de visibilidade
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio >= 0.5) onFocus(i);
        });
      },
      { threshold: [0.5, 0.75] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [i, onFocus, ref]);

  return (
            <article
              ref={ref}
              className={`reveal${inView ? " reveal-in" : ""} card-lift rounded-2xl p-6 sm:p-7 border backdrop-blur-md`}
              style={{
                background: "color-mix(in oklab, black 38%, transparent)",
                borderColor: "color-mix(in oklab, var(--ivory) 14%, transparent)",
                boxShadow: "0 18px 50px -24px rgba(0,0,0,0.75)",
                transitionDelay: `${(i % 3) * 80}ms`,
              }}
            >
              <div
                className="font-mono text-xs tracking-[0.3em]"
                style={{ color: "var(--sage)" }}
              >
                {p.n}
              </div>
              <h3
                className="mt-2 text-2xl sm:text-3xl leading-tight"
                style={{ fontFamily: "var(--font-serif)", color: "var(--ivory)" }}
              >
                {p.t}
              </h3>
              <p
                className="mt-3 text-[15px] sm:text-base leading-[1.65] font-medium"
                style={{ color: "color-mix(in oklab, var(--ivory) 78%, transparent)" }}
              >
                {p.d}
              </p>
            </article>
  );
}
