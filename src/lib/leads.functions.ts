import { createServerFn } from "@tanstack/react-start";
import { sanitizeFaixa, sanitizeNome } from "./leads.server";

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: { nome: string; faixaEtaria: string }) => data)
  .handler(async ({ data }) => {
    const { sanitizeNome, sanitizeFaixa, notifyWhatsApp } = await import("./leads.server");
    const nome = sanitizeNome(data.nome);
    const faixa_etaria = sanitizeFaixa(data.faixaEtaria);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("leads").insert({ nome, faixa_etaria });
    if (error) {
      console.error("Erro ao salvar lead:", error.message);
      throw new Error("Não foi possível registrar seu contato agora.");
    }

    const notified = await notifyWhatsApp(nome, faixa_etaria);
    return { ok: true, notified };
  });
