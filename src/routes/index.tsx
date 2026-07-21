import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Moon,
  Apple,
  Activity,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Clock,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Longevidade Científica — Biologia aplicada para viver mais e melhor",
      },
      {
        name: "description",
        content:
          "Recupere sua energia, limpe sua mente e adicione anos à sua vida com protocolos baseados em ciência. Sono, alimentação e movimento para os 30+.",
      },
      {
        property: "og:title",
        content: "Longevidade Científica — Biologia aplicada",
      },
      {
        property: "og:description",
        content:
          "Protocolos baseados em ciência para energia, foco e vitalidade após os 30. Nada de modismos.",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    form.reset();
    alert("Obrigado! Seu material foi enviado para o e-mail informado.");
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      {/* Sticky Header */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/85 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <div className="h-8 w-8 rounded-full bg-deep-blue flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-sage" />
            </div>
            <span className="text-deep-blue">Longevidade Aplicada</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#pilares" className="hover:text-deep-blue transition-colors">
              Pilares
            </a>
            <a href="#ciencia" className="hover:text-deep-blue transition-colors">
              Ciência
            </a>
            <a href="#faq" className="hover:text-deep-blue transition-colors">
              FAQ
            </a>
          </nav>
          <a
            href="#oferta"
            className="inline-flex items-center gap-2 rounded-full bg-deep-blue text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-all"
          >
            Avaliação
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sage/40 bg-sage/10 px-4 py-1.5 text-xs font-medium text-sage-deep mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-sage-deep animate-pulse" />
              Ciência aplicada à vitalidade
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-deep-blue leading-[1.05]">
              Longevidade não é sorte.
              <span className="block text-sage-deep italic font-light">
                É biologia aplicada.
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Recupere sua energia, limpe sua mente e adicione anos à sua vida com
              protocolos baseados em ciência — não em modismos.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 bg-card rounded-2xl p-2 border border-border shadow-[var(--shadow-soft)] flex flex-col sm:flex-row gap-2 max-w-xl"
            >
              <Input
                required
                name="name"
                placeholder="Seu nome"
                className="border-0 shadow-none focus-visible:ring-0 h-12"
              />
              <Input
                required
                type="email"
                name="email"
                placeholder="Seu melhor e-mail"
                className="border-0 shadow-none focus-visible:ring-0 h-12"
              />
              <Button
                type="submit"
                className="h-12 px-6 rounded-xl bg-deep-blue hover:bg-deep-blue/90 text-primary-foreground font-medium whitespace-nowrap"
              >
                Baixar o Guia
              </Button>
            </form>
            <p className="mt-3 text-xs text-muted-foreground flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-sage-deep" />
              Guia gratuito. Sem spam. Cancele quando quiser.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-sage/30 to-transparent rounded-3xl blur-2xl" />
            <img
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80"
              alt="Pessoa em movimento funcional na natureza"
              className="relative rounded-3xl shadow-[var(--shadow-elegant)] w-full aspect-[4/5] object-cover"
              loading="eager"
            />
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-[var(--shadow-elegant)] border border-border max-w-[220px]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-sage/20 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-sage-deep" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-deep-blue">+12 anos</div>
                  <div className="text-xs text-muted-foreground">
                    de vitalidade média
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dor / Identificação */}
      <section className="py-24 bg-deep-blue text-primary-foreground">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-sage mb-4">
              O diagnóstico honesto
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              Você não está velho.
              <span className="block text-sage font-light italic">
                Está desregulado.
              </span>
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/70 leading-relaxed">
              Cansaço crônico, névoa mental e inflamação não são normais aos 40. São
              sinais de que seu relógio biológico está fora de sincronia — e a boa
              notícia é que ele pode ser recalibrado.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Fadiga que café não resolve",
                "Sono que não repara",
                "Dores articulares 'da idade'",
                "Foco que desaparece à tarde",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-primary-foreground/85"
                >
                  <CheckCircle2 className="h-5 w-5 text-sage flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&w=800&q=80"
                alt="Antes: cansaço"
                className="rounded-2xl w-full aspect-[3/4] object-cover grayscale"
              />
              <div className="absolute bottom-3 left-3 bg-background/90 text-deep-blue text-xs font-medium rounded-full px-3 py-1">
                Antes
              </div>
            </div>
            <div className="relative mt-8">
              <img
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80"
                alt="Depois: vitalidade"
                className="rounded-2xl w-full aspect-[3/4] object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-sage text-deep-blue text-xs font-medium rounded-full px-3 py-1">
                Depois
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pilares */}
      <section id="pilares" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs uppercase tracking-widest text-sage-deep mb-3">
              Os 3 pilares
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-deep-blue">
              A ciência da longevidade cabe em três palavras.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Não são sete. Não são vinte. Três alavancas biológicas — quando
              ajustadas juntas, mudam tudo.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Moon,
                title: "Sono",
                subtitle: "O reparo celular que você ignora",
                text: "Cada hora de sono profundo repara DNA, elimina beta-amiloide e recalibra hormônios. Sem sono, nada funciona.",
                img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1000&q=80",
              },
              {
                icon: Apple,
                title: "Alimentação",
                subtitle: "Combustível anti-inflamatório",
                text: "Alimentos integrais e densos em nutrientes reduzem inflamação sistêmica — a raiz silenciosa do envelhecimento acelerado.",
                img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1000&q=80",
              },
              {
                icon: Activity,
                title: "Movimento",
                subtitle: "Exercício como medicina, não punição",
                text: "Força, mobilidade e caminhada em zona 2 — o coquetel que ativa autofagia e preserva massa muscular.",
                img: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=1000&q=80",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="group relative overflow-hidden rounded-3xl bg-card border border-border shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-xl bg-sage/15 flex items-center justify-center">
                      <p.icon className="h-5 w-5 text-sage-deep" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">
                        Pilar
                      </div>
                      <div className="font-semibold text-deep-blue">{p.title}</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-deep-blue leading-snug">
                    {p.subtitle}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {p.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ciência / Prova Social */}
      <section id="ciencia" className="py-24 bg-secondary/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="text-xs uppercase tracking-widest text-sage-deep mb-3">
                O que a ciência diz
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-deep-blue leading-[1.1]">
                Evidência, não promessa.
              </h2>
              <div className="mt-8 space-y-6">
                {[
                  {
                    n: "01",
                    t: "Ciclo circadiano",
                    d: "Estudos publicados em Cell Metabolism (2019) mostram que alinhar alimentação à luz solar reduz marcadores inflamatórios em até 30%.",
                  },
                  {
                    n: "02",
                    t: "Inflamação crônica",
                    d: "A 'inflammaging' — inflamação silenciosa de baixo grau — é hoje considerada o denominador comum das doenças da idade adulta.",
                  },
                  {
                    n: "03",
                    t: "Autofagia",
                    d: "Jejum intermitente e treino de força ativam a limpeza celular, mecanismo premiado com o Nobel de Medicina em 2016.",
                  },
                ].map((s) => (
                  <div key={s.n} className="flex gap-5 border-l-2 border-sage pl-5">
                    <div>
                      <div className="text-xs font-mono text-sage-deep">{s.n}</div>
                      <div className="font-semibold text-deep-blue mt-1">{s.t}</div>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {s.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              {[
                {
                  n: "Marina R., 47",
                  q: "Em 90 dias voltei a ter a energia dos meus 30. Sem dieta maluca. Só ajustes de sono e alimentação com base em ciência.",
                  img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
                },
                {
                  n: "Carlos P., 52",
                  q: "A névoa mental sumiu na terceira semana. Meu médico ficou impressionado com os exames do último trimestre.",
                  img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
                },
                {
                  n: "Renata M., 39",
                  q: "Parei de contar calorias e comecei a contar nutrientes. Mudei mais em 2 meses do que em 5 anos de academia.",
                  img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
                },
              ].map((t) => (
                <figure
                  key={t.n}
                  className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
                >
                  <blockquote className="text-deep-blue leading-relaxed">
                    &ldquo;{t.q}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 flex items-center gap-3">
                    <img
                      src={t.img}
                      alt={t.n}
                      className="h-10 w-10 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div className="text-sm font-medium text-deep-blue">{t.n}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Oferta */}
      <section id="oferta" className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-[2rem] bg-deep-blue text-primary-foreground p-10 md:p-16 shadow-[var(--shadow-elegant)]">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-sage/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-sage/10 blur-3xl" />

            <div className="relative grid md:grid-cols-5 gap-10 items-center">
              <div className="md:col-span-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-sage/15 border border-sage/30 px-3 py-1 text-xs text-sage mb-6">
                  <Clock className="h-3.5 w-3.5" />
                  Vagas limitadas este mês
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]">
                  Pare de guessing.
                  <span className="block text-sage font-light italic">
                    Comece a viver.
                  </span>
                </h2>
                <p className="mt-5 text-primary-foreground/70 max-w-md leading-relaxed">
                  <strong className="text-primary-foreground">
                    Protocolo de Longevidade Integrada
                  </strong>{" "}
                  — 12 semanas de acompanhamento personalizado com exames, plano
                  nutricional e ajustes de sono e treino.
                </p>

                <ul className="mt-6 space-y-2.5 text-sm text-primary-foreground/85">
                  {[
                    "Diagnóstico completo com painel de biomarcadores",
                    "Protocolo individual de sono, nutrição e movimento",
                    "Reavaliação quinzenal 1:1 comigo",
                    "Grupo privado de mentoria vitalícia",
                  ].map((i) => (
                    <li key={i} className="flex gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-sage flex-shrink-0 mt-0.5" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>

              <form
                onSubmit={handleSubmit}
                className="md:col-span-2 bg-background text-foreground rounded-2xl p-6 space-y-3"
              >
                <div>
                  <div className="text-xs uppercase tracking-widest text-sage-deep">
                    Avaliação gratuita
                  </div>
                  <div className="text-lg font-semibold text-deep-blue mt-1">
                    Reserve sua vaga
                  </div>
                </div>
                <Input required name="name" placeholder="Nome completo" className="h-11" />
                <Input
                  required
                  type="email"
                  name="email"
                  placeholder="Seu melhor e-mail"
                  className="h-11"
                />
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-sage-deep hover:bg-sage-deep/90 text-primary-foreground font-medium"
                >
                  Garantir minha avaliação
                </Button>
                <p className="text-[11px] text-muted-foreground text-center">
                  Retorno em até 24h úteis · 100% confidencial
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-secondary/20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-widest text-sage-deep mb-3">
              Perguntas honestas
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-deep-blue">
              O que costumam me perguntar.
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {[
              {
                q: "Preciso mudar tudo de uma vez?",
                a: "Não. O protocolo é progressivo — começamos por sono (a alavanca de maior retorno), depois alimentação, depois movimento. Nada de mudanças radicais no dia 1.",
              },
              {
                q: "Isso funciona se eu tenho pouca disponibilidade?",
                a: "Sim. Os protocolos são desenhados para adultos com agenda cheia. A maioria das intervenções custa menos de 20 minutos/dia bem colocados.",
              },
              {
                q: "Preciso de suplementos caros?",
                a: "Não. Suplementação, quando necessária, é orientada por exames e é a última alavanca — nunca a primeira. Comida real vem primeiro.",
              },
              {
                q: "Em quanto tempo vejo resultados?",
                a: "Energia e clareza mental melhoram nas primeiras 2 semanas. Biomarcadores inflamatórios costumam ceder entre 60 e 90 dias.",
              },
              {
                q: "É seguro se eu já tenho alguma condição?",
                a: "Sim, o protocolo é individual e integrado ao seu histórico médico. Trabalhamos junto com o seu médico quando necessário.",
              },
            ].map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card border border-border rounded-2xl px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left text-deep-blue font-medium hover:no-underline py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-deep-blue flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5 text-sage" />
            </div>
            <span className="text-deep-blue font-medium">Longevidade Aplicada</span>
          </div>
          <p>© {new Date().getFullYear()} — Biologia aplicada à vida real.</p>
        </div>
      </footer>
    </div>
  );
}