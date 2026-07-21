import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowRight, Moon, Sun } from "lucide-react";

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
        content: "Longevidade Aplicada",
      },
      {
        property: "og:description",
        content:
          "Envelhecer é inevitável. Envelhecer sem estratégia, não. Um protocolo premium baseado em evidências.",
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

  const pillars = [
    { n: "01", t: "Força", d: "Preservar músculo, mobilidade e autonomia." },
    { n: "02", t: "Metabolismo", d: "Manter energia, composição corporal e saúde metabólica." },
    { n: "03", t: "Cognição", d: "Proteger foco, clareza mental e capacidade de aprender." },
    { n: "04", t: "Recuperação", d: "Sono, estresse e a capacidade do corpo de se recuperar." },
  ];

  const evidence = [
    {
      t: "Sarcopenia após os 30",
      d: "A partir da terceira década, adultos sedentários perdem em média 3–8% de massa muscular por década. Treinamento de força reverte parte significativa desse declínio.",
      f: "Journal of Applied Physiology · Volpi et al.",
    },
    {
      t: "Inflammaging",
      d: "Inflamação sistêmica de baixo grau é hoje reconhecida como um dos principais mecanismos do envelhecimento fisiológico e das doenças crônicas associadas.",
      f: "Nature Reviews Endocrinology · Franceschin & Campisi",
    },
    {
      t: "Sono e função cognitiva",
      d: "Sono profundo consistente está associado à melhor clareança de resíduos metabólicos cerebrais e à preservação da memória ao longo da vida adulta.",
      f: "Science · Xie et al.",
    },
    {
      t: "Força de preensão e mortalidade",
      d: "Força muscular é preditor independente de mortalidade por todas as causas, mais consistente do que pressão arterial em coortes de meia-idade.",
      f: "The Lancet · PURE Study",
    },
  ];

  const process = [
    { n: "01", t: "Avaliar", d: "Um mapa completo de biomarcadores, composição corporal, sono, força e histórico." },
    { n: "02", t: "Entender", d: "Interpretação dos dados no contexto da sua vida — não médias populacionais." },
    { n: "03", t: "Ajustar", d: "Um protocolo individual e progressivo, construído sobre o que já funciona para você." },
    { n: "04", t: "Evoluir", d: "Reavaliações periódicas para calibrar o protocolo à medida que o corpo responde." },
  ];

  const outcomes = [
    "Mais energia consistente ao longo do dia",
    "Sono mais profundo e recuperador",
    "Mais força e mobilidade nos gestos do cotidiano",
    "Melhor controle metabólico e composição corporal",
    "Clareza mental sustentada",
    "Mais confiança e autonomia para os próximos anos",
  ];

  const testimonials = [
    {
      n: "Marina R.",
      age: "47",
      role: "Arquiteta",
      before: "Cansada às 15h todos os dias, dormindo mal há anos.",
      quote:
        "Não foi uma revolução, foi uma recalibragem. Nove meses depois, tenho mais energia com metade do esforço — e voltei a confiar no meu corpo.",
    },
    {
      n: "Carlos P.",
      age: "52",
      role: "Executivo",
      before: "Exames alterados, peso oscilante, sensação de estar envelhecendo rápido.",
      quote:
        "Aprendi a ler meu próprio corpo. Perdi gordura visceral, ganhei força e, pela primeira vez em anos, meus exames mostram uma trajetória.",
    },
    {
      n: "Renata M.",
      age: "39",
      role: "Advogada",
      before: "Rotina intensa, treinos aleatórios, névoa mental à tarde.",
      quote:
        "Parei de acumular hábitos aleatórios. Passei a ter uma estratégia — sono, comida e movimento se conversam. A diferença é sentir clareza todos os dias.",
    },
  ];

  const faqs = [
    { q: "Isso é para quem já tem problemas de saúde?", a: "O protocolo é voltado a adultos saudáveis que querem envelhecer melhor. Se você tem uma condição diagnosticada, trabalhamos em coordenação com seu médico, sem substituí-lo." },
    { q: "Preciso mudar toda a minha rotina?", a: "Não. Mudanças são progressivas e priorizadas por retorno. A maior parte do trabalho começa com ajustes pequenos e sustentáveis, não com reformas radicais." },
    { q: "Preciso tomar suplementos?", a: "Suplementação, quando indicada, aparece depois da comida real e do sono. Ela é orientada por exames — nunca é a primeira alavanca do protocolo." },
    { q: "Quanto tempo leva para perceber mudanças?", a: "Energia, sono e clareza costumam responder nas primeiras semanas. Biomarcadores e composição corporal evoluem em uma escala de meses, não de dias." },
    { q: "Isso substitui acompanhamento médico?", a: "Não. O protocolo é um trabalho de longevidade aplicada — complementar ao cuidado médico. Continue com seu médico e traga os dados; nós conversamos com eles." },
    { q: "Como sei se esse protocolo é adequado para mim?", a: "A conversa inicial existe justamente para isso. Se não fizer sentido para o seu momento, dizemos com clareza — e indicamos o próximo passo mais honesto." },
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
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#top" className="flex items-baseline gap-2">
            <span className={`${serif} text-xl tracking-tight text-deep-blue`}>Longevidade Aplicada</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground hidden sm:inline">
              est. protocolo
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-10 text-sm text-muted-foreground">
            <a href="#problema" className="hover:text-deep-blue transition-colors">O contexto</a>
            <a href="#pilares" className="hover:text-deep-blue transition-colors">Pilares</a>
            <a href="#ciencia" className="hover:text-deep-blue transition-colors">Ciência</a>
            <a href="#protocolo" className="hover:text-deep-blue transition-colors">Protocolo</a>
            <a href="#faq" className="hover:text-deep-blue transition-colors">FAQ</a>
          </nav>
          <a
            href="#cta"
            className="inline-flex items-center gap-2 rounded-full border border-deep-blue/20 bg-deep-blue text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-deep-blue/90 transition-all"
          >
            Conhecer o protocolo
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative pt-40 pb-24 md:pt-48 md:pb-32">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-14 items-end">
          <div className="lg:col-span-7">
            <div className="text-[11px] uppercase tracking-[0.3em] text-sage-deep mb-8">
              <span className="inline-block h-px w-8 align-middle bg-sage-deep mr-3" />
              Longevidade aplicada · Vol. 01
            </div>
            <h1 className={`${serif} text-[3.2rem] md:text-[4.5rem] lg:text-[5.2rem] leading-[0.98] tracking-[-0.02em] text-deep-blue font-normal`}>
              Envelhecer é inevitável.
              <span className="block italic text-deep-blue/80">Envelhecer sem estratégia, não.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Um protocolo baseado em ciência para preservar energia, força, clareza mental e autonomia — construído para quem quer viver bem hoje e continuar vivendo melhor amanhã.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <a
                href="#cta"
                className="group inline-flex items-center gap-2 rounded-full bg-deep-blue text-primary-foreground px-7 py-4 text-sm font-medium hover:bg-deep-blue/90 transition-all"
              >
                Conhecer meu protocolo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#protocolo"
                className="inline-flex items-center gap-2 rounded-full border border-deep-blue/20 text-deep-blue px-7 py-4 text-sm font-medium hover:bg-deep-blue/5 transition-all"
              >
                Entender como funciona
              </a>
            </div>
            <p className="mt-6 text-xs text-muted-foreground tracking-wide">
              Baseado em evidências científicas · Sem promessas milagrosas
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80"
                alt="Retrato editorial de adulto saudável em luz natural"
                className="w-full aspect-[4/5] object-cover rounded-sm shadow-[var(--shadow-elegant)]"
                loading="eager"
              />
              <div className="absolute -bottom-8 -left-8 hidden md:block bg-background border border-border/70 px-6 py-5 max-w-[260px]">
                <div className="text-[10px] uppercase tracking-[0.25em] text-sage-deep">Nota do protocolo</div>
                <p className={`${serif} text-lg text-deep-blue mt-2 leading-snug`}>
                  &ldquo;Longevidade não é sobre viver mais. É sobre chegar melhor.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* footer meta strip */}
        <div className="max-w-6xl mx-auto px-6 mt-24 md:mt-32 border-t border-border pt-8 grid sm:grid-cols-3 gap-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <div>Baseado em evidências</div>
          <div className="sm:text-center">Protocolo individual</div>
          <div className="sm:text-right">Acompanhamento contínuo</div>
        </div>
      </section>

      {/* Problema */}
      <section id="problema" className="py-28 md:py-36 bg-secondary/40">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-[11px] uppercase tracking-[0.3em] text-sage-deep mb-6">O contexto</div>
          <h2 className={`${serif} text-4xl md:text-6xl leading-[1.05] tracking-[-0.02em] text-deep-blue max-w-3xl`}>
            Seu corpo começou a mudar antes de você perceber.
          </h2>
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            A partir dos 30, mudanças graduais em massa muscular, metabolismo, sono, recuperação, composição corporal e função cognitiva acontecem em silêncio. Nada disso aparece de um dia para o outro — e é exatamente por isso que passa despercebido.
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-px bg-border/70 border border-border/70">
            {[
              { t: "Massa muscular", d: "Declínio médio de 3–8% por década em adultos sedentários." },
              { t: "Sono profundo", d: "Fragmentação silenciosa reduz reparo cognitivo e hormonal." },
              { t: "Metabolismo", d: "Sensibilidade à insulina cai bem antes de qualquer diagnóstico." },
              { t: "Recuperação", d: "O corpo passa a levar mais tempo para voltar ao normal." },
              { t: "Cognição", d: "Foco e memória de trabalho começam a exigir mais esforço." },
              { t: "Composição", d: "Menos músculo, mais gordura visceral — com o mesmo peso na balança." },
            ].map((i) => (
              <div key={i.t} className="bg-background p-8">
                <div className={`${serif} text-xl text-deep-blue`}>{i.t}</div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{i.d}</p>
              </div>
            ))}
          </div>

          <p className={`${serif} mt-16 text-2xl md:text-3xl leading-snug text-deep-blue max-w-3xl`}>
            O problema não é ter 30, 40 ou 50 anos.
            <span className="block text-deep-blue/70 italic">
              O problema é chegar aos próximos 10 anos exatamente igual ao que você está fazendo hoje.
            </span>
          </p>
        </div>
      </section>

      {/* Posicionamento + Pilares */}
      <section id="pilares" className="py-28 md:py-36">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-14 items-end">
            <div className="lg:col-span-7">
              <div className="text-[11px] uppercase tracking-[0.3em] text-sage-deep mb-6">Posicionamento</div>
              <h2 className={`${serif} text-4xl md:text-6xl leading-[1.03] tracking-[-0.02em] text-deep-blue`}>
                Você não precisa viver mais.
                <span className="block italic text-deep-blue/75">Precisa viver melhor por mais tempo.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-muted-foreground leading-relaxed">
                Longevidade não é uma corrida contra o tempo. É uma estratégia de vida — construída sobre quatro pilares que se sustentam mutuamente. Trabalhados juntos, eles moldam a diferença entre suportar os próximos anos e habitá-los com liberdade.
              </p>
            </div>
          </div>

          <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, idx) => (
              <article
                key={p.n}
                className="group relative bg-card border border-border/70 p-8 hover:border-deep-blue/30 transition-colors"
              >
                <img
                  src={[
                    "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1531353826977-0941b4779a1c?auto=format&fit=crop&w=800&q=80",
                  ][idx]}
                  alt=""
                  className="w-full aspect-[4/3] object-cover mb-6 grayscale group-hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
                <div className="text-[11px] uppercase tracking-[0.25em] text-sage-deep">{p.n}</div>
                <h3 className={`${serif} mt-2 text-2xl text-deep-blue`}>{p.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3 pilares expandidos */}
      <section className="py-28 md:py-36 bg-deep-blue text-primary-foreground">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.3em] text-sage mb-6">Onde o trabalho começa</div>
            <h2 className={`${serif} text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em]`}>
              Três alavancas que sustentam
              <span className="block italic opacity-80">todo o resto.</span>
            </h2>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-px bg-primary-foreground/10 border border-primary-foreground/10">
            {[
              {
                k: "Força",
                l: "Seu corpo precisa continuar sendo capaz.",
                what: "Treino de força progressivo, mobilidade e potência.",
                why: "Depois dos 30, músculo é o órgão que mais protege sua trajetória — de metabolismo a cognição.",
                r: "Mais autonomia, menos dor, corpo que responde.",
              },
              {
                k: "Metabolismo",
                l: "Energia não deveria ser um luxo.",
                what: "Alimentação estruturada em torno de proteína, fibra e horários reais.",
                why: "Sensibilidade à insulina, gordura visceral e inflamação silenciosa moldam como você acorda todos os dias.",
                r: "Energia estável, composição melhor, exames que fazem sentido.",
              },
              {
                k: "Cognição",
                l: "Seu melhor desempenho também acontece na mente.",
                what: "Sono, gestão de estresse e prática cognitiva intencional.",
                why: "O cérebro dos 40 e 50 pode ser mais claro e mais consistente — se for cuidado como se cuida do corpo.",
                r: "Foco sustentado, memória confiável, humor mais estável.",
              },
            ].map((p) => (
              <div key={p.k} className="bg-deep-blue p-10">
                <div className="text-[11px] uppercase tracking-[0.25em] text-sage">{p.k}</div>
                <h3 className={`${serif} mt-4 text-3xl leading-tight`}>{p.l}</h3>
                <dl className="mt-8 space-y-5 text-sm">
                  <div>
                    <dt className="uppercase tracking-[0.2em] text-[10px] text-primary-foreground/50">O que trabalhamos</dt>
                    <dd className="mt-2 text-primary-foreground/85 leading-relaxed">{p.what}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-[0.2em] text-[10px] text-primary-foreground/50">Por que importa</dt>
                    <dd className="mt-2 text-primary-foreground/85 leading-relaxed">{p.why}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-[0.2em] text-[10px] text-primary-foreground/50">Resultado prático</dt>
                    <dd className="mt-2 text-primary-foreground/85 leading-relaxed">{p.r}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ciência */}
      <section id="ciencia" className="py-28 md:py-36 bg-ivory">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-14 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="text-[11px] uppercase tracking-[0.3em] text-sage-deep mb-6">Evidência</div>
              <h2 className={`${serif} text-4xl md:text-6xl leading-[1.03] tracking-[-0.02em] text-deep-blue`}>
                Menos opinião.
                <span className="block italic text-deep-blue/75">Mais evidência.</span>
              </h2>
              <p className="mt-8 text-muted-foreground leading-relaxed max-w-md">
                Não prometemos parar o tempo. Usamos o que a ciência já sabe sobre envelhecimento saudável para ajudar você a chegar melhor aos próximos anos.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="border-t border-border/70">
                {evidence.map((e, i) => (
                  <article key={e.t} className="border-b border-border/70 py-8 grid md:grid-cols-[80px_1fr] gap-6">
                    <div className="text-xs font-mono text-sage-deep tracking-widest">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className={`${serif} text-2xl text-deep-blue leading-tight`}>{e.t}</h3>
                      <p className="mt-3 text-muted-foreground leading-relaxed">{e.d}</p>
                      <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-sage-deep">
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

      {/* Protocolo */}
      <section id="protocolo" className="py-28 md:py-36">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.3em] text-sage-deep mb-6">Metodologia</div>
            <h2 className={`${serif} text-4xl md:text-6xl leading-[1.03] tracking-[-0.02em] text-deep-blue`}>
              Um protocolo para os próximos anos da sua vida.
            </h2>
            <p className="mt-8 text-muted-foreground leading-relaxed">
              Quatro etapas construídas para trabalhar com o seu corpo — não contra o seu tempo.
            </p>
          </div>

          <ol className="mt-20 relative">
            <span className="hidden md:block absolute left-0 right-0 top-8 h-px bg-border" />
            <div className="grid md:grid-cols-4 gap-10 md:gap-6 relative">
              {process.map((s) => (
                <li key={s.n} className="relative">
                  <div className="flex items-center gap-4">
                    <span className="h-4 w-4 rounded-full bg-background border-2 border-deep-blue" />
                    <span className="text-xs font-mono tracking-widest text-sage-deep">{s.n}</span>
                  </div>
                  <h3 className={`${serif} mt-6 text-3xl text-deep-blue`}>{s.t}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                </li>
              ))}
            </div>
          </ol>
        </div>
      </section>

      {/* Resultados */}
      <section className="py-28 md:py-36 bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-6">
            <img
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80"
              alt="Adulto caminhando ao ar livre em luz natural"
              className="w-full aspect-[4/5] object-cover"
              loading="lazy"
            />
          </div>
          <div className="lg:col-span-6">
            <div className="text-[11px] uppercase tracking-[0.3em] text-sage-deep mb-6">Resultados</div>
            <h2 className={`${serif} text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] text-deep-blue`}>
              O que muda quando você começa
              <span className="block italic text-deep-blue/75">a cuidar do que realmente importa.</span>
            </h2>
            <ul className="mt-10 divide-y divide-border border-t border-b border-border">
              {outcomes.map((o) => (
                <li key={o} className="py-4 flex items-start gap-4">
                  <span className="mt-2 h-1 w-6 bg-sage-deep flex-shrink-0" />
                  <span className="text-deep-blue">{o}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-muted-foreground">
              Resultados variam entre indivíduos. Nada aqui substitui avaliação médica.
            </p>
          </div>
        </div>
      </section>

      {/* Prova social */}
      <section className="py-28 md:py-36">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.3em] text-sage-deep mb-6">Quem já vive esse protocolo</div>
            <h2 className={`${serif} text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] text-deep-blue`}>
              Pessoas reais, trajetórias reais.
            </h2>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-10">
            {testimonials.map((t) => (
              <figure key={t.n} className="border-t border-deep-blue pt-8">
                <div className="text-[11px] uppercase tracking-[0.25em] text-sage-deep">Antes</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t.before}</p>
                <blockquote className={`${serif} mt-8 text-xl text-deep-blue leading-snug`}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 text-sm">
                  <div className="font-medium text-deep-blue">{t.n}, {t.age}</div>
                  <div className="text-muted-foreground">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-28 md:py-36 bg-ivory">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <div className="text-[11px] uppercase tracking-[0.3em] text-sage-deep mb-6">Perguntas</div>
              <h2 className={`${serif} text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] text-deep-blue`}>
                O que costumam perguntar antes de começar.
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
                    <AccordionTrigger className={`${serif} text-left text-lg text-deep-blue hover:no-underline py-6`}>
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-6 pr-4">
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
      <section id="cta" className="py-28 md:py-36 bg-deep-blue text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-[11px] uppercase tracking-[0.3em] text-sage mb-8">Próximo passo</div>
          <h2 className={`${serif} text-4xl md:text-6xl leading-[1.03] tracking-[-0.02em]`}>
            Os próximos 10 anos vão passar
            <span className="block italic opacity-80">de qualquer maneira.</span>
            <span className="block mt-2">A questão é como você quer chegar até lá.</span>
          </h2>
          <p className="mt-8 text-lg text-primary-foreground/75 max-w-2xl mx-auto leading-relaxed">
            Comece agora a construir uma versão mais forte, lúcida e energética do seu futuro.
          </p>
          <div className="mt-12">
            <Button
              asChild
              className="h-14 px-10 rounded-full bg-background text-deep-blue hover:bg-background/90 text-base font-medium"
            >
              <a href="mailto:contato@longevidadeaplicada.com">
                Começar minha avaliação
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.25em] text-primary-foreground/50">
            Sem promessas milagrosas · Sem atalhos · Apenas estratégia baseada em ciência
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-16 bg-background">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className={`${serif} text-2xl text-deep-blue`}>Longevidade Aplicada</div>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
              Um protocolo baseado em evidências para envelhecer com estratégia — energia, força, clareza e autonomia por mais tempo.
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4">Método</div>
            <ul className="space-y-2 text-sm text-deep-blue">
              <li><a href="#problema" className="hover:opacity-70 transition">Sobre</a></li>
              <li><a href="#protocolo" className="hover:opacity-70 transition">Como funciona</a></li>
              <li><a href="#ciencia" className="hover:opacity-70 transition">Ciência</a></li>
              <li><a href="#faq" className="hover:opacity-70 transition">FAQ</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4">Contato</div>
            <ul className="space-y-2 text-sm text-deep-blue">
              <li><a href="mailto:contato@longevidadeaplicada.com" className="hover:opacity-70 transition">E-mail</a></li>
              <li><a href="#cta" className="hover:opacity-70 transition">Avaliação</a></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4">Legal</div>
            <ul className="space-y-2 text-sm text-deep-blue">
              <li><a href="#" className="hover:opacity-70 transition">Termos</a></li>
              <li><a href="#" className="hover:opacity-70 transition">Privacidade</a></li>
            </ul>
            <p className="mt-8 text-xs text-muted-foreground">
              © {new Date().getFullYear()} Longevidade Aplicada.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}