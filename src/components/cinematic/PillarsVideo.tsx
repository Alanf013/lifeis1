import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, ArrowUp } from "lucide-react";
import { useReducedMotion } from "framer-motion";
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

/** Crossfade de áudio ambiente entre pilares. Toca por padrão; usuário pode desligar. */
function useAmbientAudio(enabled: boolean, activeIndex: number) {
  const elsRef = useRef<Record<number, HTMLAudioElement>>({});
  const fadeRef = useRef<number | null>(null);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

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

    const MAX = 0.55;
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

  // Navegadores bloqueiam áudio com som antes da primeira interação real do
  // usuário. Assim que ela acontecer (clique, tecla, toque ou scroll), tenta
  // retomar a reprodução do pilar ativo naquele momento — dá a sensação de
  // já "vir com som ligado" assim que a pessoa começa a usar o site.
  useEffect(() => {
    if (!enabled) return;
    const tryResume = () => {
      const el = elsRef.current[activeIndexRef.current];
      el?.play().catch(() => {});
    };
    const events: Array<keyof WindowEventMap> = ["pointerdown", "keydown", "touchstart", "wheel"];
    events.forEach((ev) => window.addEventListener(ev, tryResume, { once: true, passive: true }));
    return () => events.forEach((ev) => window.removeEventListener(ev, tryResume));
  }, [enabled]);

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
  const blockRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [soundOn, setSoundOn] = useState(true);
  const [active, setActive] = useState(0);
  useAmbientAudio(soundOn, active);

  const reduce = Boolean(useReducedMotion());
  const total = PILLARS.length;

  // Pilar ativo = bloco que está no centro da tela. Simples, sem "pin" de
  // scroll (que travava a rolagem) e sem depender de altura fixa.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = Number((e.target as HTMLElement).dataset.index);
          if (!Number.isNaN(i)) setActive((prev) => (prev === i ? prev : i));
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    blockRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // Publica o pilar ativo para o indicador global de progresso.
  useEffect(() => {
    setPillarProgress({ active, total });
  }, [active, total]);

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

  const goToPillar = useCallback((i: number) => {
    blockRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  // Botão de som só aparece quando a pessoa já rolou até o fim da página,
  // para não interromper a experiência sensorial dos 6 pilares.
  const [showSound, setShowSound] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight;
      const h = document.documentElement.scrollHeight;
      setShowSound(y >= h - 120);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="pilares"
      ref={sectionRef}
      className="relative isolate"
      style={{ background: "var(--deep-blue)" }}
    >
      <div className="relative max-w-6xl mx-auto w-full px-4 sm:px-6 pt-14 md:pt-20 pb-8">
        {/* Cabeçalho da seção + controle de som */}
        <div className="flex items-start justify-between gap-4">
            <div className="max-w-xl">
              <div
                className="text-[12px] uppercase tracking-[0.3em] font-mono font-medium mb-4"
                style={{ color: "var(--sage)" }}
              >
                <span
                  className="inline-block h-px w-8 align-middle mr-3"
                  style={{ background: "var(--sage)" }}
                />
                Pilares · 06
              </div>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] font-normal"
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
        </div>
      </div>

      {/* Controle de som fixo no topo — sempre disponível, bem pequeno */}
      <button
        type="button"
        onClick={() => setSoundOn((v) => !v)}
        aria-pressed={soundOn}
        aria-label={soundOn ? "Desligar som ambiente" : "Ligar som ambiente"}
        title={soundOn ? "Desligar som ambiente" : "Ligar som ambiente"}
        className="fixed z-50 inline-flex items-center justify-center rounded-full border transition-opacity duration-300 hover:opacity-100"
        style={{
          right: "calc(0.9rem + env(safe-area-inset-right))",
          top: "calc(4.6rem + env(safe-area-inset-top))",
          height: 30,
          width: 30,
          color: "var(--ivory)",
          borderColor: "color-mix(in oklab, var(--ivory) 26%, transparent)",
          background: "color-mix(in oklab, black 55%, transparent)",
          backdropFilter: "blur(6px)",
          opacity: 0.7,
        }}
      >
        {soundOn ? <Volume2 size={13} /> : <VolumeX size={13} />}
      </button>

      {/* Controle de som discreto — só no fim da página */}
      <button
        type="button"
        onClick={() => setSoundOn((v) => !v)}
        aria-pressed={soundOn}
        aria-hidden={!showSound}
        tabIndex={showSound ? 0 : -1}
        aria-label={soundOn ? "Desligar som ambiente" : "Ligar som ambiente"}
        className="fixed z-50 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] transition-opacity duration-500"
        style={{
          right: "calc(1.25rem + env(safe-area-inset-right))",
          bottom: "calc(1.25rem + env(safe-area-inset-bottom) + 3.5rem + 0.6rem)",
          color: "var(--ivory)",
          borderColor: "color-mix(in oklab, var(--ivory) 26%, transparent)",
          background: "color-mix(in oklab, black 55%, transparent)",
          backdropFilter: "blur(6px)",
          opacity: showSound ? 0.8 : 0,
          pointerEvents: showSound ? "auto" : "none",
        }}
      >
        {soundOn ? <VolumeX size={12} /> : <Volume2 size={12} />}
        {soundOn ? "Desligar som" : "Ligar som"}
      </button>

      {/* Blocos: um pilar após o outro, na ordem, com a imagem visível */}
      <div className="flex flex-col">
        {PILLARS.map((p, i) => (
          <div
            key={p.n}
            data-index={i}
            ref={(el) => {
              blockRefs.current[i] = el;
            }}
            className="relative isolate flex items-end min-h-[78vh] md:min-h-[86vh]"
          >
            <img
              src={p.poster}
              alt={p.t}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={i === 0 ? "high" : "low"}
              className="absolute inset-0 -z-20 h-full w-full object-cover"
              style={{ filter: "saturate(0.85) contrast(1.05)" }}
            />
            {/* Vinheta + gradiente para legibilidade do texto */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.88) 100%)",
              }}
            />
            <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pb-12 md:pb-20">
              <article
                className="w-full max-w-xl rounded-2xl p-6 sm:p-8 border backdrop-blur-md transition-all duration-700"
                style={{
                  background: "color-mix(in oklab, black 42%, transparent)",
                  borderColor: "color-mix(in oklab, var(--ivory) 14%, transparent)",
                  boxShadow: "0 18px 50px -24px rgba(0,0,0,0.75)",
                  opacity: reduce || active === i ? 1 : 0.72,
                  transform: reduce || active === i ? "none" : "translateY(10px)",
                }}
              >
                <div className="font-mono text-xs tracking-[0.3em]" style={{ color: "var(--sage)" }}>
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
                  style={{ color: "color-mix(in oklab, var(--ivory) 82%, transparent)" }}
                >
                  {p.d}
                </p>
              </article>
            </div>
          </div>
        ))}
      </div>

      {/* Indicador: os 6 pilares, destaca o ativo, clicável */}
      <div className="sticky bottom-3 z-10 flex items-center justify-center gap-2.5 py-2 pointer-events-none">
        <div
          className="pointer-events-auto flex items-center gap-2.5 px-3 rounded-full"
          style={{ background: "color-mix(in oklab, black 45%, transparent)", backdropFilter: "blur(6px)" }}
        >
            {PILLARS.map((p, i) => (
              <button
                key={p.n}
                type="button"
                onClick={() => goToPillar(i)}
                aria-label={`Ir para ${p.t}`}
                aria-current={active === i}
                className="min-h-[28px] min-w-[28px] flex items-center justify-center"
              >
                <span
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: active === i ? 28 : 8,
                    background:
                      active === i
                        ? "var(--sage)"
                        : "color-mix(in oklab, var(--ivory) 30%, transparent)",
                  }}
                />
              </button>
            ))}
        </div>
      </div>

      {/* Fechamento / loop da experiência */}
      <div className="relative flex justify-center pb-12 pt-4">
        <button
          type="button"
          onClick={backToTop}
          className="group inline-flex items-center gap-3 min-h-[48px] px-6 rounded-full border transition-colors"
          style={{
            color: "var(--ivory)",
            borderColor: "color-mix(in oklab, var(--ivory) 30%, transparent)",
            background: "color-mix(in oklab, black 35%, transparent)",
          }}
        >
          <ArrowUp size={18} />
          <span className="italic text-lg sm:text-xl" style={{ fontFamily: "var(--font-serif)" }}>
            Sentir tudo de novo
          </span>
        </button>
      </div>
    </section>
  );
}
