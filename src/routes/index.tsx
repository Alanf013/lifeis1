import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowUpRight, ArrowRight, Instagram, MessageCircle } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Scene3D } from "@/components/cinematic/Scene3D";
import { trackEvent } from "@/lib/analytics";
import { ReadingProgress, NeonClock } from "@/components/cinematic/ReadingProgress";
import { PillarsVideo } from "@/components/cinematic/PillarsVideo";
import { ExitIntentModal } from "@/components/ExitIntentModal";

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

const INSTAGRAM_URL = "https://www.instagram.com/ale.saudebemestar_/";
const WHATSAPP_URL =
  "https://wa.me/5531994570976?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20quero%20saber%20mais%20sobre%20os%20planos%20de%20longevidade.";

const ease = [0.23, 1, 0.32, 1] as const;

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [activeT, setActiveT] = useState(0);
  const { scrollY } = useScroll();
  const heroBgY = useTransform(scrollY, [0, 800], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.35]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const id = setInterval(() => setActiveT((v) => (v + 1) % 3), 5000);
    return () => clearInterval(id);
  }, []);

  const serif = "font-[family-name:var(--font-serif)]";

  const evidence = [
    {
      t: "Sono",
      d: "O sono profundo regula hormônios e reduz processos inflamatórios; sono ruim aumenta a sensibilidade à dor e reduz a recuperação muscular.",
      f: "",
    },
    {
      t: "Alimentação — Inflammaging",
      d: "Inflamação silenciosa é hoje um dos principais motores do envelhecimento.",
      f: "Nature Reviews Endocrinology · Franceschi & Campisi",
    },
    {
      t: "Exercício Físico — Sarcopenia após os 30",
      d: "Maior capacidade cardiorrespiratória (VO₂ máximo) reduz risco cardiovascular e mortalidade; adultos sedentários perdem 3–8% de massa muscular por década, e o treino de força reverte boa parte.",
      f: "Journal of Applied Physiology · Volpi et al.",
    },
    {
      t: "Gerenciamento do Estresse",
      d: "Estresse crônico eleva cortisol, prejudica o sono, dificulta a recuperação muscular e reduz a motivação para manter hábitos saudáveis.",
      f: "",
    },
    {
      t: "Administração da Ansiedade",
      d: "Exercício físico regular estimula endorfina, dopamina e serotonina, melhorando humor, sono e função cognitiva.",
      f: "",
    },
    {
      t: "Dor",
      d: "A dor resulta da interação entre fatores físicos, metabólicos, emocionais e comportamentais; manter os pilares reduz incidência de dores e acelera a recuperação.",
      f: "",
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
      style={{ background: "var(--ivory)", color: "var(--deep-blue)" }}
    >
      <Scene3D />
      <motion.div
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none hex-bg"
        style={{ y: heroBgY, opacity: heroOpacity }}
      />
      <div
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 85% 65% at 50% 40%, transparent 50%, color-mix(in oklab, var(--deep-blue) 10%, transparent) 100%)",
        }}
      />
      <ReadingProgress />
      <NeonClock />
      {/* Header */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "backdrop-blur-xl border-b" : ""
        }`}
        style={
          scrolled
            ? { background: "color-mix(in oklab, var(--ivory) 82%, transparent)", borderColor: "color-mix(in oklab, var(--sage) 30%, transparent)" }
            : { background: "transparent" }
        }
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
          <a href="#top" className="flex items-baseline gap-2 min-w-0">
            <span className={`${serif} text-lg sm:text-xl tracking-tight truncate`} style={{ color: "var(--deep-blue)" }}>Longevidade Aplicada</span>
            <span className="text-[11px] uppercase tracking-[0.25em] hidden md:inline text-muted-foreground">est. protocolo</span>
          </a>
          <nav className="hidden md:flex items-center gap-10 text-[15px] font-medium text-muted-foreground">
            <a href="#pilares" className="hover:text-foreground transition-colors">Pilares</a>
            <a href="#ciencia" className="hover:text-foreground transition-colors">Ciência</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-foreground transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="md:hidden inline-flex items-center justify-center h-11 w-11 rounded-full text-muted-foreground"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#cta" className="btn-neon inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-sm font-medium">
              Protocolo
              <ArrowUpRight className="h-4 w-4 hidden sm:inline" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative pt-28 md:pt-40 pb-12 md:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="max-w-3xl"
          >
            <div className="text-[12px] uppercase tracking-[0.3em] font-mono font-medium mb-6 sm:mb-8" style={{ color: "var(--sage-deep)" }}>
              <span className="inline-block h-px w-8 align-middle mr-3" style={{ background: "var(--sage-deep)" }} />
              Longevidade aplicada
            </div>
            <h1
              className="text-[2.75rem] sm:text-[3.6rem] md:text-[4.75rem] leading-[1.08] tracking-[-0.02em] font-normal text-balance"
              style={{ fontFamily: "var(--font-serif)", color: "var(--deep-blue)" }}
            >
              Envelhecer é inevitável.
              <span className="block italic text-muted-foreground">
                Envelhecer sem estratégia, não.
              </span>
            </h1>
            <p className="mt-6 sm:mt-7 text-xl sm:text-2xl max-w-xl leading-[1.6] text-muted-foreground">
              Protocolo baseado em ciência para preservar energia, força e clareza pelas próximas décadas.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a href="#cta" className="btn-neon group inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold min-h-[56px]">
                Começar avaliação
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#pilares"
                className="inline-flex items-center justify-center gap-2 rounded-full border px-8 py-4 text-lg font-medium min-h-[56px]"
                style={{ borderColor: "color-mix(in oklab, var(--sage-deep) 45%, transparent)", color: "var(--sage-deep)" }}
              >
                Como funciona
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <PillarsVideo />

      {/* Ciência */}
      <section id="ciencia" className="relative py-14 md:py-20 vignette">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal className="max-w-2xl mb-10 md:mb-14">
            <div className="text-[12px] uppercase tracking-[0.3em] font-mono font-medium mb-5" style={{ color: "var(--sage-deep)" }}>Evidência</div>
            <h2 className={`${serif} text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-0.02em] text-balance`} style={{ color: "var(--deep-blue)" }}>
              Menos opinião.
              <span className="block italic text-muted-foreground">Mais evidência.</span>
            </h2>
          </Reveal>

          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {evidence.map((e, i) => (
              <motion.article
                key={e.t}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease }}
                className="relative rounded-2xl border p-6 sm:p-7"
                style={{
                  background: "color-mix(in oklab, var(--card) 94%, transparent)",
                  borderColor: "var(--border)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <div
                  className="font-mono text-sm tracking-[0.3em] mb-2"
                  style={{ color: "var(--sage-deep)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3
                  className={`${serif} text-2xl sm:text-3xl leading-tight break-words`}
                  style={{ color: "var(--deep-blue)" }}
                >
                  {e.t}
                </h3>
                <p className="mt-3 text-lg leading-[1.65] text-muted-foreground">{e.d}</p>
                {e.f ? (
                  <p
                    className="mt-4 inline-block rounded-full px-3 py-1.5 text-[12px] uppercase tracking-[0.18em] font-mono font-semibold break-words"
                    style={{
                      color: "var(--sage-deep)",
                      background: "color-mix(in oklab, var(--sage) 18%, transparent)",
                    }}
                  >
                    Fonte · {e.f}
                  </p>
                ) : null}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Prova social */}
      <section className="relative py-16 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal className="relative max-w-2xl mx-auto min-h-[260px]">
            {testimonials.map((t, i) => (
              <figure
                key={t.n}
                aria-hidden={activeT !== i}
                className="absolute inset-0 rounded-2xl p-6 sm:p-8 border transition-opacity duration-1000"
                style={{
                  opacity: activeT === i ? 1 : 0,
                  background: "color-mix(in oklab, var(--card) 96%, transparent)",
                  backdropFilter: "blur(10px)",
                  borderColor: "var(--border)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-full mb-4 flex items-center justify-center text-xl font-semibold"
                  style={{
                    background: "linear-gradient(135deg, var(--sage), var(--sage-deep))",
                    color: "var(--ivory)",
                    boxShadow: "0 8px 20px color-mix(in oklab, var(--sage-deep) 30%, transparent)",
                  }}
                >
                  {t.n.charAt(0)}
                </div>
                <blockquote className={`${serif} text-xl sm:text-2xl leading-[1.45]`} style={{ color: "var(--deep-blue)" }}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-base">
                  <div className="font-medium text-muted-foreground">{t.n}, {t.age} · {t.role}</div>
                </figcaption>
              </figure>
            ))}
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <span
                  key={i}
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: activeT === i ? 24 : 8,
                    background: activeT === i ? "var(--sage-deep)" : "color-mix(in oklab, var(--sage-deep) 30%, transparent)",
                  }}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-14 md:py-20 vignette">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Reveal className="grid lg:grid-cols-12 gap-8 lg:gap-10">
            <div className="lg:col-span-4">
              <div className="text-[12px] uppercase tracking-[0.3em] font-mono font-medium mb-6" style={{ color: "var(--sage-deep)" }}>Perguntas</div>
              <h2 className={`${serif} text-3xl sm:text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] text-balance`} style={{ color: "var(--deep-blue)" }}>
                O que perguntam antes de começar.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <Accordion type="single" collapsible className="border-t-2" style={{ borderColor: "color-mix(in oklab, var(--sage-deep) 35%, transparent)" }}>
                {faqs.map((f, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="border-b border-border"
                  >
                    <AccordionTrigger className={`${serif} text-left text-xl sm:text-2xl hover:no-underline py-6 gap-4 [&[data-state=open]>svg]:rotate-45 [&>svg]:transition-transform [&>svg]:duration-300`} style={{ color: "var(--deep-blue)" }}>
                      <span className="flex items-baseline gap-4 min-w-0">
                        <span className="font-mono text-sm shrink-0" style={{ color: "var(--sage-deep)" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0">{f.q}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-lg leading-[1.65] pb-6 sm:pr-4 pl-0 sm:pl-10 text-muted-foreground">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA final */}
      <section id="cta" className="relative py-16 md:py-24 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in oklab, var(--sage) 22%, transparent), transparent 70%)",
          }}
        />
        <Reveal className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative">
          <div className="text-[12px] uppercase tracking-[0.3em] font-mono font-medium mb-6" style={{ color: "var(--sage-deep)" }}>Próximo passo</div>
          <h2 className={`${serif} text-[2.6rem] sm:text-6xl md:text-7xl leading-[1.03] tracking-[-0.02em] text-balance`} style={{ color: "var(--deep-blue)" }}>
            Os próximos 10 anos vão passar.
            <span className="block italic text-muted-foreground">Como você quer chegar até lá?</span>
          </h2>
          <p className="mt-5 text-sm font-mono uppercase tracking-[0.3em]" style={{ color: "var(--sage-deep)" }}>
            Sua próxima década começa agora
          </p>
          <div className="mt-8">
            {/*
              TODO: subir o e-book real em public/assets/guia-longevidade-aplicada.pdf
              (nome exato) antes de publicar. Enquanto o arquivo não existir,
              este download não vai funcionar.
            */}
            <a
              href="/assets/guia-longevidade-aplicada.pdf"
              download
              onClick={() => trackEvent("guia_pdf_clicado", { local: "cta_final" })}
              className="btn-neon inline-flex items-center gap-2 px-10 py-5 text-lg font-bold"
            >
              Quero meu guia gratuito
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`${serif} text-lg`} style={{ color: "var(--deep-blue)" }}>Longevidade Aplicada</div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} · Sem promessas milagrosas.
          </p>
        </div>
      </footer>

      {/* WhatsApp flutuante */}
      <ExitIntentModal />
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="wa-pulse fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full"
        style={{
          background: "#25D366",
          color: "#FFFFFF",
        }}
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}