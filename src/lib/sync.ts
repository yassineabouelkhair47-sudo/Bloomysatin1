import { defaultData } from "./defaults";
import type { StoreData } from "./defaults";

/* ─────────────────────────────────────────────────────────────────
   Lien de synchronisation GLOBAL du site.

   Après avoir créé votre canal depuis le tableau de bord
   (Espace gérant → Cloud & Sync), copiez le lien affiché et collez-le
   ci-dessous dans DEFAULT_SYNC_URL, puis republiez le site.
   Dès lors, TOUS les visiteurs (téléphones, tablettes, PC) verront
   automatiquement vos dernières modifications à chaque visite.
   ───────────────────────────────────────────────────────────────── */
export const DEFAULT_SYNC_URL = "";
export const DEFAULT_SYNC_TOKEN = "";

/** Valide + fusionne n'importe quelle charge utile avec les valeurs par défaut. */
export function normalizeData(p: unknown): StoreData {
  if (!p || typeof p !== "object") return defaultData;
  const d = p as Partial<StoreData>;
  return {
    products: Array.isArray(d.products) ? (d.products as StoreData["products"]) : defaultData.products,
    testimonials: Array.isArray(d.testimonials) ? (d.testimonials as StoreData["testimonials"]) : defaultData.testimonials,
    faq: Array.isArray(d.faq) ? (d.faq as StoreData["faq"]) : defaultData.faq,
    content: { ...defaultData.content, ...(d.content ?? {}) },
    settings: {
      ...defaultData.settings,
      ...(d.settings ?? {}),
      pixels: { ...defaultData.settings.pixels, ...(d.settings?.pixels ?? {}) },
      sync: { ...defaultData.settings.sync, ...(d.settings?.sync ?? {}) },
    },
  };
}

/** Charge complète (sauvegarde) avec enveloppe horodatée. */
export function exportJson(d: StoreData): string {
  return JSON.stringify(
    { app: "bloomy-satin", version: 1, updatedAt: new Date().toISOString(), data: d },
    null,
    2,
  );
}

/** Accepte une sauvegarde enveloppée { data: … } ou une charge brute. */
export function parseImport(text: string): StoreData | null {
  try {
    const parsed = JSON.parse(text) as Record<string, unknown>;
    if (!parsed || typeof parsed !== "object") return null;
    const payload =
      parsed.data && typeof parsed.data === "object" && Array.isArray((parsed.data as { products?: unknown }).products)
        ? parsed.data
        : parsed;
    if (!payload || typeof payload !== "object" || !Array.isArray((payload as { products?: unknown }).products)) return null;
    return normalizeData(payload);
  } catch {
    return null;
  }
}

export function downloadJson(filename: string, text: string) {
  const blob = new Blob([text], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/** Récupère la dernière version depuis un lien JSON public (avec délai). */
export async function fetchRemote(url: string, timeoutMs = 8000): Promise<StoreData | null> {
  try {
    const ctrl = new AbortController();
    const t = window.setTimeout(() => ctrl.abort(), timeoutMs);
    const res = await fetch(url, { signal: ctrl.signal, cache: "no-store" });
    window.clearTimeout(t);
    if (!res.ok) return null;
    return normalizeData(await res.json());
  } catch {
    return null;
  }
}

/** La charge publiée ne contient jamais le mot de passe ni le token. */
export function stripSecrets(d: StoreData): StoreData {
  return {
    ...d,
    settings: {
      ...d.settings,
      adminPassword: "",
      sync: { ...d.settings.sync, token: "" },
    },
  };
}

export interface SyncChannel {
  url: string;
  token: string;
}

/** Crée un canal gratuit sur jsonblob.com et renvoie son lien + token. */
export async function createChannel(d: StoreData): Promise<SyncChannel | null> {
  try {
    const res = await fetch("https://jsonblob.com/api/jsonBlob", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stripSecrets(d)),
    });
    if (!res.ok) return null;
    const loc = res.headers.get("Location") ?? "";
    const url = loc.startsWith("http") ? loc : `https://jsonblob.com/api/jsonBlob/${loc}`;
    const token = res.headers.get("X-Access-Token") ?? "";
    return { url, token };
  } catch {
    return null;
  }
}

/** Publie la charge sur le canal (PUT jsonblob). */
export async function pushChannel(channel: SyncChannel, d: StoreData): Promise<boolean> {
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (channel.token) headers["X-Access-Token"] = channel.token;
    const res = await fetch(channel.url, {
      method: "PUT",
      headers,
      body: JSON.stringify(stripSecrets(d)),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Canal effectif : celui enregistré localement, sinon celui codé dans le site. */
export function getEffectiveChannel(d: StoreData): SyncChannel {
  const local = d.settings.sync;
  if (local.url) return { url: local.url, token: local.token };
  return { url: DEFAULT_SYNC_URL, token: DEFAULT_SYNC_TOKEN };
}
