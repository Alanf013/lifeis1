type Params = Record<string, unknown>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Envia evento para o GA4 se disponível; caso contrário, log estruturado. */
export function trackEvent(name: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
    return;
  }
  console.log("[analytics]", JSON.stringify({ event: name, ...params }));
}
