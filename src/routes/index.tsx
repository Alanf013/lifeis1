import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Scene3D } from "@/components/cinematic/Scene3D";
import { ReadingProgress, NeonClock } from "@/components/cinematic/ReadingProgress";
import { Typewriter } from "@/components/cinematic/Typewriter";
import { PillarsCarousel } from "@/components/cinematic/PillarsCarousel";
import { Loader } from "@/components/cinematic/Loader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Longevidade Aplicada — Um protocolo para envelhecer com estratégia",
      },
      {
        name: "description",
        content:
          "Um protocolo baseado em ciência para preservar energia, força, clareza mental e autonomia — para quem quer viver bem hoje e continuar vivendo melhor amanhã.",
      },
      {
        property: "og:title",
        content: "Longevidade Aplicada — Um protocolo para envelhecer com estratégia",
      },
      {
        property: "og:description",
        content:
          "Um protocolo baseado em ciência para preservar energia, força, clareza mental e autonomia — para quem quer viver bem hoje e continuar vivendo melhor amanhã.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const serif = "font-[family-name:var(--font-serif)]";
  const ease = [0.23, 1, 0.32, 1] as const;

  const evidence = [
    {
      t: "Sarcopenia após os 30",
      d: "Adultos sedentários perdem 3–8% de massa muscular por década. Força reverte boa parte.",
      f: "Journal of Applied Physiology · Volpi et al.",
    },
    {
      t: "Inflammaging",
      d: "Inflamação silenciosa é hoje um dos principais motores do envelhecimento.",
      f: "Nature Reviews Endocrinology · Franceschin & Campisi",
    },
    {
      t: "Sono e função cognitiva",
      d: "Sono profundo consistente preserva memória e clareza ao longo da vida adulta.",
      f: "Science · Xie et al.",
    },
  ];

  const testimonials = [
    {
      n: "Marina R.",
      age: "47",
      role: "Arquiteta",
      quote:
        "Não foi revolução, foi recalibragem. Mais energia com metade do esforço.",
    },
    {
      n: "Carlos P.",
      age: "52",
      role: "Executivo",
      quote:
        "Aprendi a ler meu próprio corpo. Meus exames mostram uma trajetória.",
    },
    {
      n: "Renata M.",
      age: "39",
      role: "Advogada",
      quote:
        "Parei de acumular hábitos. Passei a ter estratégia — e clareza todos os dias.",
    },
  ];

  const faqs = [
    { q: "Preciso mudar toda a minha rotina?", a: "Não. Mudanças são progressivas e priorizadas por retorno." },
    { q: "Isso substitui acompanhamento médico?", a: "Não. É complementar — trabalhamos em coordenação com seu médico." },
    { q: "Quanto tempo leva para perceber mudanças?", a: "Energia e sono respondem em semanas. Biomarcadores, em meses." },
    { q: "Preciso tomar suplementos?", a: "Só quando indicado por exames — nunca como primeira alavanca." },
  ];

  return (
    <div
      className="relative min-h-screen font-sans antialiased overflow-x-hidden"
      style={{ background: "#0A0F1F", color: "#ffffff" }}
    >
      <Loader />
      <Scene3D />
      <ReadingProgress />
      <NeonClock />
      {/* Header */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "backdrop-blur-xl border-b" : ""
        }`}
        style={
          scrolled
            ? { background: "rgba(10,15,31,0.75)", borderColor: "rgba(0,212,255,0.15)" }
            : { background: "transparent" }
        }
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
          <a href="#top" className="flex items-baseline gap-2 min-w-0">
            <span className={`${serif} text-lg sm:text-xl tracking-tight text-white truncate`}>Longevidade Aplicada</span>
            <span className="text-[11px] uppercase tracking-[0.25em] hidden md:inline" style={{ color: "#B0C4DE" }}>est. protocolo</span>
          </a>
          <nav className="hidden md:flex items-center gap-10 text-[15px] font-medium" style={{ color: "#B0C4DE" }}>
            <a href="#pilares" className="hover:text-white transition-colors">Pilares</a>
            <a href="#ciencia" className="hover:text-white transition-colors">Ciência</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a href="#cta" className="btn-neon inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-sm font-medium">
              Protocolo
              <ArrowUpRight className="h-4 w-4 hidden sm:inline" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative pt-32 md:pt-48 pb-20 md:pb-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2, ease }}
            className="max-w-3xl"
          >
            <div className="text-[12px] uppercase tracking-[0.3em] font-mono font-medium mb-6 sm:mb-8" style={{ color: "#00D4FF" }}>
              <span className="inline-block h-px w-8 align-middle mr-3" style={{ background: "#00D4FF" }} />
              Longevidade aplicada
            </div>
            <h1
              className="text-[2.25rem] sm:text-[3.2rem] md:text-[4.5rem] leading-[1.05] tracking-[-0.02em] text-white font-bold text-balance"
              style={{ fontFamily: "'Orbitron', var(--font-serif)", textShadow: "0 0 40px rgba(0,212,255,0.25)" }}
            >
              <Typewriter lines={["Envelhecer é inevitável.", "Envelhecer sem estratégia, não."]} />
            </h1>
            <p className="mt-6 sm:mt-7 text-lg sm:text-xl max-w-xl leading-[1.6]" style={{ color: "#B0C4DE" }}>
              Protocolo baseado em ciência para preservar energia, força e clareza pelas próximas décadas.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a href="#cta" className="btn-neon group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold min-h-[52px]">
                Começar avaliação
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#pilares"
                className="inline-flex items-center justify-center gap-2 rounded-full border px-8 py-4 text-base font-medium min-h-[52px] transition-all hover:scale-105"
                style={{ borderColor: "rgba(0,212,255,0.4)", color: "#00D4FF" }}
              >
                Como funciona
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <PillarsCarousel />

      {/* Ciência */}
      <section id="ciencia" className="relative py-16 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="text-[12px] uppercase tracking-[0.3em] font-mono font-medium mb-6" style={{ color: "#00D4FF" }}>Evidência</div>
              <h2 className={`${serif} text-3xl sm:text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] text-white text-balance`}>
                Menos opinião.
                <span className="block italic" style={{ color: "#B0C4DE" }}>Mais evidência.</span>
              </h2>
            </div>

            <div className="lg:col-span-7">
              <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                {evidence.map((e, i) => (
                  <motion.article
                    key={e.t}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease }}
                    className="border-b py-8 grid grid-cols-[40px_minmax(0,1fr)] md:grid-cols-[64px_1fr] gap-4 md:gap-6"
                    style={{ borderColor: "rgba(255,255,255,0.1)" }}
                  >
                    <div className="text-sm font-mono tracking-widest shrink-0" style={{ color: "#00D4FF" }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="min-w-0">
                      <h3 className={`${serif} text-2xl text-white leading-tight`}>{e.t}</h3>
                      <p className="mt-3 text-base sm:text-lg leading-[1.65]" style={{ color: "#B0C4DE" }}>{e.d}</p>
                      <p className="mt-4 text-[11px] uppercase tracking-[0.2em] font-mono font-medium break-words" style={{ color: "#FF6B35" }}>
                        Fonte · {e.f}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prova social */}
      <section className="relative py-16 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t.n}
                initial={{ opacity: 0, y: 40, rotateX: 5 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.15, ease }}
                className="relative rounded-2xl p-6 border"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(10px)",
                  borderColor: "rgba(0,212,255,0.2)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="w-14 h-14 rounded-full mb-4 flex items-center justify-center text-xl font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg,#00D4FF,#0066FF)",
                    boxShadow: "0 0 20px rgba(0,212,255,0.6)",
                  }}
                >
                  {t.n.charAt(0)}
                </div>
                <blockquote className={`${serif} text-lg sm:text-xl text-white leading-[1.4]`}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-sm">
                  <div className="font-medium" style={{ color: "#B0C4DE" }}>{t.n}, {t.age} · {t.role}</div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-16 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
            <div className="lg:col-span-4">
              <div className="text-[12px] uppercase tracking-[0.3em] font-mono font-medium mb-6" style={{ color: "#00D4FF" }}>Perguntas</div>
              <h2 className={`${serif} text-2xl sm:text-3xl md:text-4xl leading-[1.05] tracking-[-0.02em] text-white text-balance`}>
                O que perguntam antes de começar.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <Accordion type="single" collapsible className="border-t" style={{ borderColor: "rgba(255,255,255,0.1)" } as any}>
                {faqs.map((f, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="border-b"
                    style={{ borderColor: "rgba(255,255,255,0.1)" }}
                  >
                    <AccordionTrigger className={`${serif} text-left text-lg sm:text-xl text-white hover:no-underline py-6 gap-3 [&[data-state=open]>svg]:rotate-45 [&>svg]:transition-transform [&>svg]:duration-300`}>
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-base leading-[1.65] pb-6 sm:pr-4" style={{ color: "#B0C4DE" }}>
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section id="cta" className="relative py-24 md:py-36 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.18), transparent 70%)",
          }}
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative">
          <div className="text-[12px] uppercase tracking-[0.3em] font-mono font-medium mb-8" style={{ color: "#00D4FF" }}>Próximo passo</div>
          <h2 className={`${serif} text-3xl sm:text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] text-balance text-white`}>
            Os próximos 10 anos vão passar.
            <span className="block italic" style={{ color: "#B0C4DE" }}>Como você quer chegar até lá?</span>
          </h2>
          <p className="mt-6 text-sm font-mono uppercase tracking-[0.3em]" style={{ color: "#FF6B35" }}>
            Sua próxima década começa agora
          </p>
          <div className="mt-10">
            <a
              href="mailto:contato@longevidadeaplicada.com"
              className="btn-neon inline-flex items-center gap-2 px-10 py-5 text-lg font-bold"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Minha próxima década
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 relative" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className={`${serif} text-lg text-white`}>Longevidade Aplicada</div>
          <p className="text-xs" style={{ color: "#B0C4DE" }}>
            © {new Date().getFullYear()} · Sem promessas milagrosas.
          </p>
        </div>
      </footer>
    </div>
  );
}