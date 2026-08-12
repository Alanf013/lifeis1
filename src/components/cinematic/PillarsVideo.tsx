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

/** Ganho relativo por pilar (volume geral baixo, sem sobreposição). */
const AUDIO_GAIN: Record<number, number> = {
  0: 0.07, // Sono — quase imperceptível
  1: 0.08, // Alimentação
  2: 0.1, // Exercício
  3: 0.07, // Estresse
  4: 0.08, // Ansiedade
  5: 0.09, // Dor
};

/** Troca instantânea de áudio ambiente entre pilares (sem sobreposição). */
function useAmbientAudio(enabled: boolean, activeIndex: number) {
  const elsRef = useRef<Record<number, HTMLAudioElement>>({});
  const fadeRef = useRef<number[]>([]);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    // Microfade (~110ms): evita o estalo/clique do corte seco, sem sobreposição.
    const FADE_MS = 110;
    const STEP_MS = 15;

    const clearFades = () => {
      fadeRef.current.forEach((id) => {
        window.clearInterval(id);
        window.clearTimeout(id);
      });
      fadeRef.current = [];
    };

    const fadeTo = (el: HTMLAudioElement, to: number, onDone?: () => void) => {
      const from = el.volume;
      const steps = Math.max(1, Math.round(FADE_MS / STEP_MS));
      let i = 0;
      const id = window.setInterval(() => {
        i += 1;
        el.volume = Math.min(1, Math.max(0, from + (to - from) * (i / steps)));
        if (i >= steps) {
          window.clearInterval(id);
          fadeRef.current = fadeRef.current.filter((x) => x !== id);
          onDone?.();
        }
      }, STEP_MS);
      fadeRef.current.push(id);
    };

    if (!enabled) {
      clearFades();
      Object.values(elsRef.current).forEach((a) => {
        if (a.paused) return;
        fadeTo(a, 0, () => {
          a.pause();
          a.currentTime = 0;
        });
      });
      return () => clearFades();
    }
    const target = PILLARS[activeIndex]?.audio;
    if (!target) return;

    clearFades();

    // Fade-out curtíssimo dos demais pilares antes de subir o novo:
    // nunca dois sons audíveis ao mesmo tempo.
    let pending = 0;
    Object.entries(elsRef.current).forEach(([k, a]) => {
      if (Number(k) === activeIndex || a.paused) return;
      pending += 1;
      fadeTo(a, 0, () => {
        a.pause();
        a.currentTime = 0;
      });
    });

    let el = elsRef.current[activeIndex];
    if (!el) {
      el = new Audio(target);
      el.loop = true;
      el.preload = "none";
      el.volume = 0;
      elsRef.current[activeIndex] = el;
    }
    const gain = AUDIO_GAIN[activeIndex] ?? 0.18;
    const audio = el;
    const start = () => {
      audio.volume = 0;
      audio
        .play()
        .then(() => fadeTo(audio, gain))
        .catch(() => {});
    };
    if (pending > 0) {
      fadeRef.current.push(window.setTimeout(start, FADE_MS));
    } else {
      start();
    }

    return () => clearFades();
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

  // Revelação suave do painel de fechamento (apenas visual, não toca no áudio)
  const closingRef = useRef<HTMLDivElement | null>(null);
  const [closingIn, setClosingIn] = useState(false);
  useEffect(() => {
    const el = closingRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setClosingIn(e.isIntersecting),
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const backToTop = useCallback(() => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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
          bottom: "calc(1.25rem + env(safe-area-inset-bottom) + 3.75rem + 0.7rem)",
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
            <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
              <img
                src={p.poster}
                alt={p.t}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={i === 0 ? "high" : "low"}
                className="h-full w-full object-cover will-change-transform"
                style={{
                  filter:
                    reduce || active === i
                      ? "saturate(0.92) contrast(1.06) brightness(1)"
                      : "saturate(0.7) contrast(1.02) brightness(0.82)",
                  transform: reduce
                    ? "none"
                    : active === i
                      ? "scale(1.06) translateY(0)"
                      : "scale(1.01) translateY(8px)",
                  transition:
                    "transform 2600ms cubic-bezier(0.22,1,0.36,1), filter 1200ms ease-out",
                }}
              />
            </div>
            {/* Vinheta + gradiente para legibilidade do texto */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.88) 100%)",
              }}
            />
            {/* Véu de transição entre pilares: escurece o bloco que sai */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 pointer-events-none"
              style={{
                background: "rgba(0,0,0,1)",
                opacity: reduce ? 0 : active === i ? 0 : 0.28,
                transition: "opacity 900ms ease-out",
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

      {/* Fechamento / loop da experiência */}
      <div
        ref={closingRef}
        className="relative flex flex-col items-center justify-center gap-3 px-6 pb-16 pt-10 text-center"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, black 55%, transparent) 0%, color-mix(in oklab, black 88%, transparent) 100%)",
          opacity: reduce ? 1 : closingIn ? 1 : 0,
          transform: reduce ? "none" : closingIn ? "translateY(0)" : "translateY(14px)",
          transition: "opacity 700ms ease-out, transform 700ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <p
          className="text-sm sm:text-base"
          style={{
            color: "color-mix(in oklab, var(--ivory) 62%, transparent)",
            opacity: reduce ? 1 : closingIn ? 1 : 0,
            transform: reduce ? "none" : closingIn ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 600ms ease-out 120ms, transform 600ms ease-out 120ms",
          }}
        >
          Seis pilares. Uma única estratégia de longevidade.
        </p>
        <button
          type="button"
          onClick={backToTop}
          className="group inline-flex items-center gap-3 min-h-[52px] px-7 rounded-full border transition-transform duration-300 hover:scale-[1.03]"
          style={{
            color: "var(--ink, #0B0E14)",
            borderColor: "transparent",
            background: "var(--sage)",
            opacity: reduce ? 1 : closingIn ? 1 : 0,
            transform: reduce ? "none" : closingIn ? "scale(1)" : "scale(0.96)",
            transition:
              "opacity 600ms ease-out 240ms, transform 600ms cubic-bezier(0.22,1,0.36,1) 240ms",
            boxShadow: closingIn
              ? "0 18px 40px -22px color-mix(in oklab, var(--sage) 80%, transparent)"
              : "none",
          }}
        >
          <ArrowUp size={18} />
          <span className="italic text-lg sm:text-xl" style={{ fontFamily: "var(--font-serif)" }}>
            Reviver a experiência
          </span>
        </button>
      </div>
    </section>
  );
}
