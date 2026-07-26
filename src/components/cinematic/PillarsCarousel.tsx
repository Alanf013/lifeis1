import { Moon, Utensils, Dumbbell, Waves, Brain, Activity } from "lucide-react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type P = { n: string; t: string; d: string; icon: LucideIcon };
const PILLARS: P[] = [
  { n: "01", t: "Sono", d: "Ritmo circadiano, profundidade e regularidade como base fisiológica.", icon: Moon },
  { n: "02", t: "Alimentação", d: "Padrão alimentar individualizado — densidade nutricional antes de restrição.", icon: Utensils },
  { n: "03", t: "Atividade física", d: "Força, mobilidade e capacidade aeróbica em doses progressivas.", icon: Dumbbell },
  { n: "04", t: "Gerenciamento de estresse", d: "Regulação autonômica e recuperação como prática, não exceção.", icon: Waves },
  { n: "05", t: "Administração de ansiedade", d: "Ferramentas cognitivas e comportamentais aplicadas ao dia a dia.", icon: Brain },
  { n: "06", t: "Dor", d: "Leitura da dor crônica e estratégia para reduzir sua interferência.", icon: Activity },
];

export function PillarsCarousel() {
  return (
    <section id="pilares" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-14">
          <div className="text-[12px] uppercase tracking-[0.3em] font-mono mb-6" style={{ color: "var(--sage-deep)" }}>
            <span className="inline-block h-px w-8 align-middle mr-3" style={{ background: "var(--sage-deep)" }} />
            Pilares · 06
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] font-normal"
            style={{ fontFamily: "var(--font-serif)", color: "var(--deep-blue)" }}
          >
            Seis pilares.
            <span className="block italic text-muted-foreground">Uma estratégia.</span>
          </h2>
        </div>

        <div className="flex gap-5 md:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.article
                key={p.n}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ rotateY: 6, rotateX: -4, scale: 1.03 }}
                style={{
                  transformStyle: "preserve-3d",
                  background: "color-mix(in oklab, var(--card) 92%, transparent)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "var(--shadow-soft)",
                }}
                className="relative min-w-[78%] sm:min-w-[54%] md:min-w-0 snap-center rounded-2xl p-6 md:p-7 group"
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
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: "linear-gradient(135deg, color-mix(in oklab, var(--sage) 25%, transparent), color-mix(in oklab, var(--sage-deep) 25%, transparent))",
                    boxShadow: "0 8px 20px color-mix(in oklab, var(--sage-deep) 22%, transparent)",
                  }}
                >
                  <Icon className="h-5 w-5" style={{ color: "var(--sage-deep)" }} />
                </motion.div>
                <div className="font-mono text-xs tracking-[0.3em] mb-2" style={{ color: "var(--sage-deep)" }}>{p.n}</div>
                <h3
                  className="text-2xl md:text-3xl leading-tight mb-3"
                  style={{ fontFamily: "var(--font-serif)", color: "var(--deep-blue)" }}
                >
                  {p.t}
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground">{p.d}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}