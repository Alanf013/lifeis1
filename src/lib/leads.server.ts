export const FAIXAS = ["18-29", "30-39", "40-49", "50-59", "60+"] as const;
export type Faixa = (typeof FAIXAS)[number];

export function sanitizeNome(input: unknown): string {
  const nome = String(input ?? "").trim().replace(/\s+/g, " ");
  if (nome.length < 2 || nome.length > 80) throw new Error("Nome inválido");
  return nome;
}

export function sanitizeFaixa(input: unknown): Faixa {
  const v = String(input ?? "");
  if (!(FAIXAS as readonly string[]).includes(v)) throw new Error("Faixa etária inválida");
  return v as Faixa;
}

/**
 * Notificação opcional no WhatsApp (CallMeBot).
 * Configure WHATSAPP_API_KEY para ativar; sem a chave o lead só é salvo no banco.
 */
export async function notifyWhatsApp(nome: string, faixa: Faixa): Promise<boolean> {
  const apiKey = process.env.WHATSAPP_API_KEY;
  if (!apiKey) return false;
  const phone = "5531994570976";
  const text = `Novo lead do site: ${nome} — faixa etária ${faixa}`;
  const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apiKey)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`CallMeBot falhou [${res.status}]: ${await res.text()}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error("CallMeBot erro:", err);
    return false;
  }
}
