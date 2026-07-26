import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IconSono, IconAlimentacao, IconAtividade, IconEstresse, IconAnsiedade, IconDor } from "./PillarIcons";
import type { ComponentType } from "react";

type P = { n: string; t: string; d: string; Icon: ComponentType };
const PILLARS: P[] = [
  { n: "01", t: "Sono", d: "Ritmo circadiano, profundidade e regularidade como base fisiológica.", Icon: IconSono },
  { n: "02", t: "Alimentação", d: "Padrão alimentar individualizado — densidade nutricional antes de restrição.", Icon: IconAlimentacao },
  { n: "03", t: "Atividade física", d: "Força, mobilidade e capacidade aeróbica em doses progressivas.", Icon: IconAtividade },
  { n: "04", t: "Gerenciamento de estresse", d: "Regulação autonômica e recuperação como prática, não exceção.", Icon: IconEstresse },
  { n: "05", t: "Administração de ansiedade", d: "Ferramentas cognitivas e comportamentais aplicadas ao dia a dia.", Icon: IconAnsiedade },
  { n: "06", t: "Dor", d: "Leitura da dor crônica e estratégia para reduzir sua interferência.", Icon: IconDor },
];

export function PillarsCarousel() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((v) => (v + 1) % PILLARS.length), 4000);
    return () => clearInterval(id);
  }, []);
  return (
    <section id="pilares" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-14">
          <div className="text-[13px] uppercase tracking-[0.3em] font-mono mb-6" style={{ color: "var(--sage-deep)" }}>
            <span className="inline-block h-px w-8 align-middle mr-3" style={{ background: "var(--sage-deep)" }} />
            Pilares · 06
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-0.02em] font-normal"
            style={{ fontFamily: "var(--font-serif)", color: "var(--deep-blue)" }}
          >
            Seis pilares.
            <span className="block italic text-muted-foreground">Uma estratégia.</span>
          </h2>
        </div>

        {/* Mobile: auto-fade carousel. Desktop: grid. */}
        <div className="md:hidden relative min-h-[380px]">
          {PILLARS.map((p, i) => {
            const Icon = p.Icon;
            return (
              <article
                key={p.n}
                aria-hidden={active !== i}
                className="absolute inset-0 rounded-2xl p-6 transition-opacity duration-1000"
                style={{
                  opacity: active === i ? 1 : 0,
                  pointerEvents: active === i ? "auto" : "none",
                  background: "color-mix(in oklab, var(--card) 92%, transparent)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <div className="relative w-16 h-16 mb-5">
                  <div
                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, color-mix(in oklab, var(--sage) 22%, transparent), color-mix(in oklab, var(--sage-deep) 22%, transparent))",
                    }}
                  >
                    <Icon />
                  </div>
                </div>
                <div className="font-mono text-xs tracking-[0.3em] mb-2" style={{ color: "var(--sage-deep)" }}>{p.n}</div>
                <h3 className="text-3xl leading-tight mb-3" style={{ fontFamily: "var(--font-serif)", color: "var(--deep-blue)" }}>{p.t}</h3>
                <p className="text-base leading-[1.65] text-muted-foreground">{p.d}</p>
              </article>
            );
          })}
          <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-2">
            {PILLARS.map((_, i) => (
              <span
                key={i}
                className="h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: active === i ? 20 : 6,
                  background: active === i ? "var(--sage-deep)" : "color-mix(in oklab, var(--sage-deep) 30%, transparent)",
                }}
              />
            ))}
          </div>
        </div>

        <div className="hidden md:grid gap-6 grid-cols-3 relative">
          {PILLARS.map((p, i) => {
            const Icon = p.Icon;
            return (
              <motion.article
                key={p.n}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  background: "color-mix(in oklab, var(--card) 92%, transparent)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "var(--shadow-soft)",
                  animation: `floatCard 3s ease-in-out ${i * 0.4}s infinite`,
                }}
                className="relative rounded-2xl p-7"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-2xl p-px pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, var(--sage), var(--sage-deep), var(--sage))",
                    backgroundSize: "200% 200%",
                    animation: "borderShift 6s linear infinite",
                    WebkitMask:
                      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
                <div className="relative w-16 h-16 mb-5" style={{ perspective: "600px" }}>
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--sage) 55%, transparent), transparent 70%)",
                      animation: "pulseWave 3s ease-in-out infinite",
                    }}
                  />
                  <div
                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, color-mix(in oklab, var(--sage) 22%, transparent), color-mix(in oklab, var(--sage-deep) 22%, transparent))",
                      boxShadow: "0 8px 20px color-mix(in oklab, var(--sage-deep) 22%, transparent)",
                      animation: `spinY ${9 + i}s linear infinite`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <Icon />
                  </div>
                </div>
                <div className="font-mono text-xs tracking-[0.3em] mb-2" style={{ color: "var(--sage-deep)" }}>{p.n}</div>
                <h3
                  className="text-3xl leading-tight mb-3"
                  style={{ fontFamily: "var(--font-serif)", color: "var(--deep-blue)" }}
                >
                  {p.t}
                </h3>
                <p className="text-base leading-[1.65] text-muted-foreground">{p.d}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}