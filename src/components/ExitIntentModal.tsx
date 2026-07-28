import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/leads.functions";

const FAIXAS = ["18-29", "30-39", "40-49", "50-59", "60+"];
const KEY = "exit-intent-shown";
const MIN_DELAY = 15_000;

export function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"exit" | "ebook">("exit");
  const [nome, setNome] = useState("");
  const [faixa, setFaixa] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const shown = useRef(false);
  const send = useServerFn(submitLead);

  const trigger = useCallback(() => {
    if (shown.current) return;
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(KEY)) return;
    shown.current = true;
    try { sessionStorage.setItem(KEY, "1"); } catch { /* ignore */ }
    setOpen(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(KEY)) return;

    const start = Date.now();
    const ready = () => Date.now() - start >= MIN_DELAY;

    // Desktop: cursor saindo pela borda superior
    const onMouseOut = (e: MouseEvent) => {
      if (ready() && e.clientY <= 0 && !e.relatedTarget) trigger();
    };
    document.addEventListener("mouseout", onMouseOut);

    // Mobile: botão voltar (1º toque mostra o popup, 2º sai de fato)
    let pushed = false;
    if (window.matchMedia("(pointer: coarse)").matches) {
      history.pushState({ exitGuard: true }, "");
      pushed = true;
    }
    const onPopState = () => {
      if (!pushed) return;
      pushed = false;
      if (ready() && !shown.current) {
        history.pushState({ exitGuard: true }, "");
        pushed = true;
        trigger();
      }
    };
    window.addEventListener("popstate", onPopState);

    // Mobile alternativo: chegou ao fim da página e ficou 5s parado
    let idle: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      if (idle) clearTimeout(idle);
      const bottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 120;
      if (bottom) idle = setTimeout(() => { if (ready()) trigger(); }, 5000);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("scroll", onScroll);
      if (idle) clearTimeout(idle);
    };
  }, [trigger]);

  useEffect(() => {
    const onOpenEbook = () => {
      setMode("ebook");
      setStatus("idle");
      setOpen(true);
    };
    window.addEventListener("open-lead-modal", onOpenEbook);
    return () => window.removeEventListener("open-lead-modal", onOpenEbook);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  const isEbook = mode === "ebook";

  const canSubmit = nome.trim().length >= 2 && !!faixa && consent && status !== "sending";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const nomeLimpo = nome.trim();
    const faixaSel = faixa!;
    // Abre já no clique (mesma interação) para não ser bloqueado como popup.
    if (!isEbook) {
      const msg = `Olá! Meu nome é ${nomeLimpo} e tenho ${faixaSel} anos. Vim pelo site e gostaria de agendar minha análise gratuita.`;
      window.open(`https://wa.me/5531994570976?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    }
    setStatus("sending");
    try {
      await send({ data: { nome: nomeLimpo, faixaEtaria: faixaSel } });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-title"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border p-6 sm:p-8"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
          boxShadow: "var(--shadow-elegant)",
        }}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Fechar"
          className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        {status === "done" ? (
          <div className="py-6 text-center">
            <h2
              id="exit-title"
              className="text-3xl leading-tight"
              style={{ fontFamily: "var(--font-serif)", color: "var(--deep-blue)" }}
            >
              Recebido, {nome.split(" ")[0]}.
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              {isEbook
                ? "Enviamos o guia gratuito e o especialista entra em contato pelo WhatsApp."
                : "O especialista entra em contato pelo WhatsApp para sua análise gratuita."}
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="btn-neon mt-6 inline-flex min-h-12 items-center px-6 text-base font-medium"
            >
              Fechar
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <h2
              id="exit-title"
              className="pr-10 text-2xl sm:text-3xl leading-tight"
              style={{ fontFamily: "var(--font-serif)", color: "var(--deep-blue)" }}
            >
              {isEbook
                ? "Receba o guia gratuito de longevidade"
                : "Antes de você ir — que tal uma análise gratuita?"}
            </h2>
            <p className="mt-3 text-base sm:text-lg leading-[1.6] text-muted-foreground">
              {isEbook
                ? "Um material prático com os seis pilares aplicados ao dia a dia, sem compromisso."
                : "Descubra seu ponto de partida com o especialista, sem compromisso."}
            </p>

            <label htmlFor="exit-nome" className="mt-6 block text-sm font-medium">
              Nome
            </label>
            <input
              id="exit-nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              maxLength={80}
              autoComplete="name"
              placeholder="Como podemos te chamar"
              className="mt-2 w-full min-h-12 rounded-xl border px-4 text-base outline-none"
              style={{ background: "var(--background)", borderColor: "var(--border)" }}
            />

            <p className="mt-5 text-sm font-medium">Faixa etária</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {FAIXAS.map((f) => {
                const active = faixa === f;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFaixa(f)}
                    aria-pressed={active}
                    className="min-h-11 rounded-full border px-4 text-sm font-medium transition-transform"
                    style={{
                      borderColor: active ? "var(--sage-deep)" : "var(--border)",
                      background: active
                        ? "color-mix(in oklab, var(--sage) 30%, transparent)"
                        : "var(--background)",
                      color: active ? "var(--deep-blue)" : "var(--muted-foreground)",
                    }}
                  >
                    {f}
                  </button>
                );
              })}
            </div>

            <label className="mt-5 flex items-start gap-3 text-sm leading-[1.5] text-muted-foreground">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-5 w-5 shrink-0"
              />
              <span>
                {isEbook
                  ? "Concordo em receber o guia e ser contatado pelo WhatsApp."
                  : "Concordo em ser contatado pelo WhatsApp sobre minha análise gratuita."}
              </span>
            </label>

            {status === "error" ? (
              <p className="mt-4 text-sm" style={{ color: "var(--destructive)" }}>
                Não conseguimos enviar agora. Tente novamente em instantes.
              </p>
            ) : null}

            <button
              type="submit"
              disabled={!canSubmit}
              className="btn-neon mt-6 w-full min-h-12 text-base font-medium disabled:opacity-50"
            >
              {status === "sending"
                ? "Enviando…"
                : isEbook
                  ? "Quero meu guia gratuito"
                  : "Falar com o especialista"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
