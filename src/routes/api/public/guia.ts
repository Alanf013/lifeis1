import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/guia")({
  server: {
    handlers: {
      GET: async () => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin.storage
          .from("midias-site")
          .createSignedUrl("LifeIs1.pdf", 600, { download: "guia-longevidade-aplicada.pdf" });
        if (error || !data?.signedUrl) {
          return new Response("Guia indisponível no momento.", { status: 503 });
        }
        return new Response(null, {
          status: 302,
          headers: { Location: data.signedUrl, "Cache-Control": "no-store" },
        });
      },
    },
  },
});