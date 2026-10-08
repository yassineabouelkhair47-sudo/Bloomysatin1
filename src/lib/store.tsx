import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { defaultData } from "./defaults";
import type { StoreData } from "./defaults";
import { DEFAULT_SYNC_URL, createChannel, fetchRemote, getEffectiveChannel, normalizeData, parseImport, pushChannel } from "./sync";

const KEY = "bloomy-satin-store-v1";
export const AUTH_KEY = "bloomy-satin-auth";

function load(): StoreData {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return normalizeData(JSON.parse(raw));
  } catch {
    /* ignore corrupted storage */
  }
  return defaultData;
}

export interface SyncState {
  status: "off" | "loading" | "live" | "error";
  at: number | null;
  saving: boolean;
}

interface StoreCtx {
  data: StoreData;
  update: (fn: (d: StoreData) => StoreData) => void;
  reset: () => void;
  waLink: (message: string) => string;
  track: (event: string) => void;
  /** État de la synchronisation cloud */
  syncState: SyncState;
  /** Publie immédiatement sur le canal */
  saveNow: () => Promise<boolean>;
  /** Crée un canal jsonblob et l'enregistre localement */
  createSyncChannel: () => Promise<{ url: string; token: string } | null>;
  /** Restaure une sauvegarde (JSON enveloppé ou brut) */
  importStore: (text: string) => boolean;
  /** Recharge la version cloud à la demande */
  refreshRemote: () => Promise<boolean>;
}

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<StoreData>(load);
  const [syncState, setSyncState] = useState<SyncState>({ status: "off", at: null, saving: false });
  const skipPushRef = useRef(false);

  /* Persistance locale (cache de l'appareil) */
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch {
      /* stockage plein — l'état reste en mémoire */
    }
  }, [data]);

  const syncUrl = data.settings.sync.url || DEFAULT_SYNC_URL;

  /* Au démarrage : charge la dernière version cloud pour TOUS les visiteurs */
  useEffect(() => {
    if (!syncUrl) {
      setSyncState({ status: "off", at: null, saving: false });
      return;
    }
    let alive = true;
    setSyncState((s) => ({ ...s, status: "loading" }));
    fetchRemote(syncUrl).then((remote) => {
      if (!alive) return;
      if (remote) {
        skipPushRef.current = true;
        setData((d) => ({
          ...remote,
          settings: {
            ...remote.settings,
            sync: d.settings.sync, // on garde le canal local de l'appareil
            adminPassword: d.settings.adminPassword, // on ne remplace jamais le mdp local
          },
        }));
        setSyncState({ status: "live", at: Date.now(), saving: false });
      } else {
        setSyncState((s) => ({ ...s, status: "error" }));
      }
    });
    return () => {
      alive = false;
    };
  }, [syncUrl]);

  /* Auto-push : à chaque modification (si activé), publie sur le canal */
  useEffect(() => {
    const ch = getEffectiveChannel(data);
    if (!ch.url || !data.settings.sync.autoSave) return;
    if (skipPushRef.current) {
      skipPushRef.current = false;
      return;
    }
    const t = window.setTimeout(async () => {
      setSyncState((s) => ({ ...s, saving: true }));
      const ok = await pushChannel(ch, data);
      setSyncState((s) => ({
        ...s,
        saving: false,
        at: ok ? Date.now() : s.at,
        status: ok ? "live" : s.status === "loading" ? "loading" : s.status,
      }));
    }, 2500);
    return () => window.clearTimeout(t);
  }, [data]);

  const update = useCallback((fn: (d: StoreData) => StoreData) => setData((d) => fn(d)), []);

  const reset = useCallback(() => {
    skipPushRef.current = true;
    setData(defaultData);
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* noop */
    }
  }, []);

  const waLink = useCallback(
    (message: string) =>
      `https://wa.me/${data.settings.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`,
    [data.settings.whatsapp],
  );

  const track = useCallback((event: string) => {
    try {
      const w = window as unknown as {
        fbq?: (...args: unknown[]) => void;
        ttq?: { track?: (...args: unknown[]) => void };
      };
      if (typeof w.fbq === "function") w.fbq("track", event);
      if (w.ttq && typeof w.ttq.track === "function") w.ttq.track(event);
    } catch {
      /* pixels non chargés */
    }
  }, []);

  const saveNow = useCallback(async () => {
    const ch = getEffectiveChannel(data);
    if (!ch.url) return false;
    setSyncState((s) => ({ ...s, saving: true }));
    const ok = await pushChannel(ch, data);
    setSyncState((s) => ({ ...s, saving: false, at: ok ? Date.now() : s.at, status: ok ? "live" : "error" }));
    return ok;
  }, [data]);

  const createSyncChannel = useCallback(async () => {
    const ch = await createChannel(data);
    if (ch) {
      skipPushRef.current = true;
      setData((d) => ({
        ...d,
        settings: {
          ...d.settings,
          sync: { ...d.settings.sync, url: ch.url, token: ch.token, autoSave: true },
        },
      }));
    }
    return ch;
  }, [data]);

  const importStore = useCallback((text: string) => {
    const parsed = parseImport(text);
    if (!parsed) return false;
    skipPushRef.current = true;
    setData((d) => ({
      ...parsed,
      settings: {
        ...parsed.settings,
        sync: d.settings.sync,
        adminPassword: d.settings.adminPassword,
      },
    }));
    return true;
  }, []);

  const refreshRemote = useCallback(async () => {
    const ch = getEffectiveChannel(data);
    if (!ch.url) return false;
    setSyncState((s) => ({ ...s, status: "loading" }));
    const remote = await fetchRemote(ch.url);
    if (remote) {
      skipPushRef.current = true;
      setData((d) => ({
        ...remote,
        settings: { ...remote.settings, sync: d.settings.sync, adminPassword: d.settings.adminPassword },
      }));
      setSyncState({ status: "live", at: Date.now(), saving: false });
      return true;
    }
    setSyncState((s) => ({ ...s, status: "error" }));
    return false;
  }, [data]);

  const value = useMemo(
    () => ({ data, update, reset, waLink, track, syncState, saveNow, createSyncChannel, importStore, refreshRemote }),
    [data, update, reset, waLink, track, syncState, saveNow, createSyncChannel, importStore, refreshRemote],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): StoreCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useStore must be used within StoreProvider");
  return c;
}
