import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowRight, Moon, Sun, Moon as MoonIcon, Utensils, Dumbbell, Waves, Brain, Activity } from "lucide-react";

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
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefers;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const serif = "font-[family-name:var(--font-serif)]";

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

  const pillars = [
    { n: "01", t: "Sono", d: "Ritmo circadiano, profundidade e regularidade como base fisiológica.", Icon: MoonIcon },
    { n: "02", t: "Alimentação", d: "Padrão alimentar individualizado — densidade nutricional antes de restrição.", Icon: Utensils },
    { n: "03", t: "Atividade física", d: "Força, mobilidade e capacidade aeróbica em doses progressivas.", Icon: Dumbbell },
    { n: "04", t: "Gerenciamento de estresse", d: "Regulação autonômica e recuperação como prática, não exceção.", Icon: Waves },
    { n: "05", t: "Administração de ansiedade", d: "Ferramentas cognitivas e comportamentais aplicadas ao dia a dia.", Icon: Brain },
    { n: "06", t: "Dor", d: "Leitura da dor crônica e estratégia para reduzir sua interferência.", Icon: Activity },
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
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-deep-blue selection:text-primary-foreground">
      {/* Header */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/85 backdrop-blur-xl border-b border-border/70"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
          <a href="#top" className="flex items-baseline gap-2 min-w-0">
            <span className={`${serif} text-base sm:text-xl tracking-tight text-deep-blue truncate`}>Longevidade Aplicada</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground hidden md:inline">
              est. protocolo
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-10 text-sm text-muted-foreground">
            <a href="#pilares" className="hover:text-deep-blue transition-colors">Pilares</a>
            <a href="#ciencia" className="hover:text-deep-blue transition-colors">Ciência</a>
            <a href="#faq" className="hover:text-deep-blue transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={toggleTheme}
              aria-label="Alternar tema"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 text-foreground hover:bg-secondary transition-colors"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-full bg-deep-blue text-primary-foreground px-4 sm:px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-all"
            >
              Protocolo
              <ArrowUpRight className="h-4 w-4 hidden sm:inline" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="texture-noise relative pt-28 pb-16 md:pt-44 md:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-10 lg:gap-14 items-end">
          <div className="lg:col-span-7">
            <div className="text-[11px] uppercase tracking-[0.3em] text-sage-deep mb-6 sm:mb-8">
              <span className="inline-block h-px w-8 align-middle bg-sage-deep mr-3" />
              Longevidade aplicada
            </div>
            <h1 className={`${serif} text-[2.25rem] sm:text-[3.2rem] md:text-[4.5rem] lg:text-[5.2rem] leading-[1.02] md:leading-[0.98] tracking-[-0.02em] text-deep-blue font-normal text-balance`}>
              Envelhecer é inevitável.
              <span className="block italic text-deep-blue/80">Envelhecer sem estratégia, não.</span>
            </h1>
            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed">
              Protocolo baseado em ciência para preservar energia, força e clareza pelas próximas décadas.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="#cta"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-deep-blue text-primary-foreground px-7 py-4 text-sm font-medium hover:bg-deep-blue/90 transition-all min-h-[48px]"
              >
                Começar avaliação
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#pilares"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-deep-blue/20 text-deep-blue px-7 py-4 text-sm font-medium hover:bg-secondary transition-all min-h-[48px]"
              >
                Como funciona
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80"
                alt="Retrato editorial de adulto saudável em luz natural"
                className="w-full aspect-[4/5] sm:aspect-[4/5] object-cover rounded-sm shadow-[var(--shadow-elegant)]"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pilares */}
      <section id="pilares" className="texture-noise py-16 md:py-28 bg-secondary/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.3em] text-sage-deep mb-6">Pilares</div>
            <h2 className={`${serif} text-3xl sm:text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] text-deep-blue text-balance`}>
              Seis pilares.
              <span className="block italic text-deep-blue/75">Uma estratégia.</span>
            </h2>
          </div>

          <div className="mt-10 md:mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {pillars.map((p) => {
              const Icon = p.Icon;
              return (
                <article
                  key={p.n}
                  className="group relative bg-card border border-border/70 p-6 sm:p-7 hover:border-deep-blue/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className={`${serif} text-4xl sm:text-5xl leading-none text-deep-blue/90 font-normal`}>
                      {p.n}
                    </span>
                    <Icon className="h-6 w-6 text-sage-deep shrink-0" strokeWidth={1.5} />
                  </div>
                  <h3 className={`${serif} mt-6 text-xl sm:text-2xl text-deep-blue`}>{p.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ciência */}
      <section id="ciencia" className="texture-noise py-16 md:py-28 bg-ivory">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="text-[11px] uppercase tracking-[0.3em] text-sage-deep mb-6">Evidência</div>
              <h2 className={`${serif} text-3xl sm:text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] text-deep-blue text-balance`}>
                Menos opinião.
                <span className="block italic text-deep-blue/75">Mais evidência.</span>
              </h2>
            </div>

            <div className="lg:col-span-7">
              <div className="border-t border-border/70">
                {evidence.map((e, i) => (
                  <article key={e.t} className="border-b border-border/70 py-6 grid grid-cols-[40px_minmax(0,1fr)] md:grid-cols-[64px_1fr] gap-4 md:gap-6">
                    <div className="text-xs font-mono text-sage-deep tracking-widest shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="min-w-0">
                      <h3 className={`${serif} text-xl text-deep-blue leading-tight`}>{e.t}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{e.d}</p>
                      <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-sage-deep break-words">
                        Fonte · {e.f}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prova social */}
      <section className="texture-noise py-16 md:py-28 bg-secondary/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
            {testimonials.map((t) => (
              <figure key={t.n} className="border-t border-deep-blue pt-6">
                <blockquote className={`${serif} text-base sm:text-lg text-deep-blue leading-snug`}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-xs">
                  <div className="font-medium text-deep-blue">{t.n}, {t.age} · {t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="texture-noise py-16 md:py-28 bg-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
            <div className="lg:col-span-4">
              <div className="text-[11px] uppercase tracking-[0.3em] text-sage-deep mb-6">Perguntas</div>
              <h2 className={`${serif} text-2xl sm:text-3xl md:text-4xl leading-[1.05] tracking-[-0.02em] text-deep-blue text-balance`}>
                O que perguntam antes de começar.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <Accordion type="single" collapsible className="border-t border-border">
                {faqs.map((f, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="border-b border-border"
                  >
                    <AccordionTrigger className={`${serif} text-left text-base text-deep-blue hover:no-underline py-5 gap-3`}>
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5 sm:pr-4">
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
      <section id="cta" className="texture-noise py-20 md:py-32 bg-deep-blue text-primary-foreground">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative">
          <div className="text-[11px] uppercase tracking-[0.3em] text-sage mb-8">Próximo passo</div>
          <h2 className={`${serif} text-3xl sm:text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] text-balance`}>
            Os próximos 10 anos vão passar.
            <span className="block italic opacity-80">Como você quer chegar até lá?</span>
          </h2>
          <div className="mt-8 md:mt-10">
            <Button
              asChild
              className="h-14 px-8 sm:px-10 rounded-full bg-background text-deep-blue hover:bg-background/90 text-base font-medium w-full sm:w-auto"
            >
              <a href="mailto:contato@longevidadeaplicada.com">
                Começar avaliação
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className={`${serif} text-lg text-deep-blue`}>Longevidade Aplicada</div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} · Sem promessas milagrosas.
          </p>
        </div>
      </footer>
    </div>
  );
}