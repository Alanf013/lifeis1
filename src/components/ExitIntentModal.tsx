import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/leads.functions";
import { trackEvent } from "@/lib/analytics";

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
  const [errors, setErrors] = useState<{ nome?: string; faixa?: string; consent?: string }>({});
  const waUrl = useRef<string | null>(null);

  const trigger = useCallback(() => {
    if (shown.current) return;
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(KEY)) return;
    shown.current = true;
    try { sessionStorage.setItem(KEY, "1"); } catch { /* ignore */ }
    setOpen(true);
    trackEvent("popup_exibido", { origem: "exit_intent" });
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
    if (status === "sending") return;

    const nextErrors: typeof errors = {};
    if (nome.trim().length < 2) nextErrors.nome = "Informe seu nome (mínimo 2 caracteres).";
    if (!faixa) nextErrors.faixa = "Selecione sua faixa etária.";
    if (!consent) nextErrors.consent = "É preciso aceitar para continuar.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const nomeLimpo = nome.trim();
    const faixaSel = faixa!;
    const msg = `Vim pelo Site, quero saber mais sobre o prejeto!`;
    waUrl.current = `https://wa.me/5531994570976?text=${encodeURIComponent(msg)}`;
    setStatus("sending");
    try {
      await send({ data: { nome: nomeLimpo, faixaEtaria: faixaSel } });
      setStatus("done");
      trackEvent("popup_lead_enviado", { faixa_etaria: faixaSel, modo: mode });
      if (!isEbook && waUrl.current) {
        const url = waUrl.current;
        setTimeout(() => window.open(url, "_blank", "noopener,noreferrer"), 1200);
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] overflow-y-auto overscroll-contain"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-title"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border p-6 sm:p-8 max-h-[85dvh] overflow-y-auto overscroll-contain"
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
                : "Recebemos seus dados! Você será direcionado ao WhatsApp para falar com o especialista."}
            </p>
            {!isEbook && waUrl.current ? (
              <a
                href={waUrl.current}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-base underline"
                style={{ color: "var(--sage-deep)" }}
              >
                Abrir o WhatsApp agora
              </a>
            ) : null}
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
              onChange={(e) => {
                setNome(e.target.value);
                if (errors.nome) setErrors((p) => ({ ...p, nome: undefined }));
              }}
              maxLength={80}
              autoComplete="name"
              aria-invalid={!!errors.nome}
              placeholder="Como podemos te chamar"
              className="mt-2 w-full min-h-12 rounded-xl border px-4 text-base outline-none"
              style={{ background: "var(--background)", borderColor: errors.nome ? "var(--destructive)" : "var(--border)" }}
            />
            {errors.nome ? (
              <p className="mt-1.5 text-sm" style={{ color: "var(--destructive)" }}>{errors.nome}</p>
            ) : null}

            <p className="mt-5 text-sm font-medium">Faixa etária</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {FAIXAS.map((f) => {
                const active = faixa === f;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => {
                      setFaixa(f);
                      if (errors.faixa) setErrors((p) => ({ ...p, faixa: undefined }));
                    }}
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
            {errors.faixa ? (
              <p className="mt-1.5 text-sm" style={{ color: "var(--destructive)" }}>{errors.faixa}</p>
            ) : null}

            <label className="mt-5 flex items-start gap-3 text-sm leading-[1.5] text-muted-foreground">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (errors.consent) setErrors((p) => ({ ...p, consent: undefined }));
                }}
                className="mt-1 h-5 w-5 shrink-0"
              />
              <span>
                {isEbook
                  ? "Concordo em receber o guia e ser contatado pelo WhatsApp."
                  : "Concordo em ser contatado pelo WhatsApp sobre minha análise gratuita."}
              </span>
            </label>
            {errors.consent ? (
              <p className="mt-1.5 text-sm" style={{ color: "var(--destructive)" }}>{errors.consent}</p>
            ) : null}

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
