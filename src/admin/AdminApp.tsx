import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { AUTH_KEY, useStore } from "../lib/store";
import { downloadJson, exportJson, getEffectiveChannel } from "../lib/sync";
import type {
  ContentData,
  FaqItem,
  IconItem,
  Pixels,
  Product,
  Settings,
  StatItem,
  StepItem,
  Testimonial,
} from "../lib/defaults";
import { ICONS, ICON_KEYS, Check, FlowerLogo, Lock, Plus, Sparkle, XIcon } from "../components/Icons";

const inp =
  "w-full rounded-xl border border-petal/70 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:outline-none focus:ring-2 focus:ring-satin/50";
const labelCls = "mb-1.5 block text-[11px] font-medium uppercase tracking-[0.16em] text-ink/55";
const card = "rounded-3xl border border-petal/50 bg-white/80 p-5 backdrop-blur md:p-6";
const smallBtn =
  "inline-flex items-center gap-2 rounded-full border border-burgundy/30 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-burgundy transition-colors hover:bg-burgundy hover:text-ivory";

function Field({ l, children, hint }: { l: string; children: ReactNode; hint?: string }) {
  return (
    <div>
      <span className={labelCls}>{l}</span>
      {children}
      {hint && <p className="mt-1.5 text-xs leading-relaxed text-ink/40">{hint}</p>}
    </div>
  );
}

/* ---------- Éditeurs réutilisables ---------- */

function TextArrEditor({ items, onChange, placeholder }: { items: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  return (
    <div className="space-y-2.5">
      {items.map((v, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={v}
            onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))}
            className={inp}
            placeholder={placeholder}
          />
          <button
            onClick={() => onChange(items.filter((_, j) => j !== i))}
            aria-label="Supprimer"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-petal/70 text-ink/50 transition-colors hover:bg-burgundy hover:text-ivory"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button onClick={() => onChange([...items, ""])} className={smallBtn}>
        <Plus className="h-4 w-4" /> Ajouter
      </button>
    </div>
  );
}

function IconListEditor({ items, onChange, addLabel }: { items: IconItem[]; onChange: (v: IconItem[]) => void; addLabel?: string }) {
  const upd = (id: string, patch: Partial<IconItem>) => onChange(items.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  return (
    <div className="space-y-3">
      {items.map((it) => {
        const Ic = ICONS[it.icon] ?? Sparkle;
        return (
          <div key={it.id} className="grid gap-3 rounded-2xl border border-petal/50 bg-white/70 p-4 sm:grid-cols-[190px_1fr] lg:grid-cols-[190px_1fr_1.2fr_auto]">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blush/70 text-burgundy">
                <Ic className="h-5 w-5" />
              </span>
              <select value={it.icon} onChange={(e) => upd(it.id, { icon: e.target.value })} className={inp} aria-label="Icône">
                {ICON_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>
            <input value={it.title} onChange={(e) => upd(it.id, { title: e.target.value })} placeholder="Titre" className={inp} />
            <textarea rows={2} value={it.text} onChange={(e) => upd(it.id, { text: e.target.value })} placeholder="Texte" className={`${inp} resize-none`} />
            <button
              onClick={() => onChange(items.filter((x) => x.id !== it.id))}
              aria-label="Supprimer"
              className="self-start grid h-10 w-10 place-items-center rounded-xl border border-petal/60 text-ink/50 transition-colors hover:bg-burgundy hover:text-ivory"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        );
      })}
      <button onClick={() => onChange([...items, { id: `i${Date.now().toString(36)}`, icon: ICON_KEYS[0], title: addLabel ?? "Nouvel élément", text: "" }])} className={smallBtn}>
        <Plus className="h-4 w-4" /> {addLabel ?? "Ajouter"}
      </button>
    </div>
  );
}

function StepsEditor({ items, onChange }: { items: StepItem[]; onChange: (v: StepItem[]) => void }) {
  const upd = (id: string, patch: Partial<StepItem>) => onChange(items.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={it.id} className="grid gap-3 rounded-2xl border border-petal/50 bg-white/70 p-4 sm:grid-cols-[40px_1fr_1.3fr_auto]">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-blush/70 font-display text-sm font-semibold text-burgundy">
            {i + 1}
          </span>
          <input value={it.title} onChange={(e) => upd(it.id, { title: e.target.value })} placeholder="Titre de l'étape" className={inp} />
          <textarea rows={2} value={it.text} onChange={(e) => upd(it.id, { text: e.target.value })} placeholder="Description" className={`${inp} resize-none`} />
          <button
            onClick={() => onChange(items.filter((x) => x.id !== it.id))}
            aria-label="Supprimer"
            className="self-start grid h-10 w-10 place-items-center rounded-xl border border-petal/60 text-ink/50 transition-colors hover:bg-burgundy hover:text-ivory"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button onClick={() => onChange([...items, { id: `s${Date.now().toString(36)}`, title: "Nouvelle étape", text: "" }])} className={smallBtn}>
        <Plus className="h-4 w-4" /> Ajouter une étape
      </button>
    </div>
  );
}

function StatsEditor({ items, onChange }: { items: StatItem[]; onChange: (v: StatItem[]) => void }) {
  const upd = (id: string, patch: Partial<StatItem>) => onChange(items.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  return (
    <div className="space-y-2.5">
      {items.map((it) => (
        <div key={it.id} className="flex gap-2">
          <input value={it.n} onChange={(e) => upd(it.id, { n: e.target.value })} className={`${inp} w-28 shrink-0`} placeholder="500+" />
          <input value={it.l} onChange={(e) => upd(it.id, { l: e.target.value })} className={inp} placeholder="Libellé (ex. bouquets offerts)" />
          <button
            onClick={() => onChange(items.filter((x) => x.id !== it.id))}
            aria-label="Supprimer"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-petal/70 text-ink/50 transition-colors hover:bg-burgundy hover:text-ivory"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button onClick={() => onChange([...items, { id: `st${Date.now().toString(36)}`, n: "0", l: "" }])} className={smallBtn}>
        <Plus className="h-4 w-4" /> Ajouter un chiffre
      </button>
    </div>
  );
}

function ImgField({ l, value, onChange }: { l: string; value: string; onChange: (v: string) => void }) {
  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => onChange(String(r.result));
    r.readAsDataURL(f);
    e.target.value = "";
  };
  return (
    <div>
      <span className={labelCls}>{l}</span>
      <div className="flex items-start gap-4">
        <div className="w-24 shrink-0 overflow-hidden rounded-xl bg-blush/40">
          <img src={value} alt="" className="aspect-square w-full object-cover" />
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <label className="block cursor-pointer rounded-full border border-burgundy/30 py-2 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-burgundy transition-colors hover:bg-burgundy hover:text-ivory">
            Changer (fichier)
            <input type="file" accept="image/*" className="hidden" onChange={onFile} />
          </label>
          <input
            value={value.startsWith("data:") ? "" : value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="…ou coller une URL d'image"
            className="w-full rounded-xl border border-petal/70 bg-white px-3 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-satin/50"
          />
        </div>
      </div>
      <p className="mt-1.5 text-[11px] text-ink/40">Astuce : fichier &lt; 1 Mo pour un stockage fiable.</p>
    </div>
  );
}

/* ---------- Connexion ---------- */

function Login({ password, onOk }: { password: string; onOk: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (pw === password) {
      onOk();
    } else {
      setErr(true);
      setPw("");
    }
  };

  return (
    <div className="zellige relative flex min-h-screen items-center justify-center bg-cream px-5">
      <form onSubmit={submit} className="relative w-full max-w-sm rounded-3xl border border-petal/50 bg-white/90 p-8 shadow-soft backdrop-blur">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-blush/70 text-burgundy">
          <Lock className="h-6 w-6" />
        </div>
        <h1 className="mt-4 text-center font-display text-3xl text-ink">Espace gérant</h1>
        <p className="mt-1 text-center text-sm text-ink/55">Bloomy Satin — tableau de bord</p>
        {err && (
          <p className="mt-5 rounded-xl bg-burgundy/10 px-4 py-2.5 text-center text-sm text-burgundy">Mot de passe incorrect. Réessayez.</p>
        )}
        <label className="mt-6 block">
          <span className={labelCls}>Mot de passe</span>
          <input type="password" autoFocus value={pw} onChange={(e) => setPw(e.target.value)} className={inp} placeholder="••••••••" />
        </label>
        <button
          type="submit"
          className="sheen mt-5 w-full rounded-full bg-burgundy py-3.5 text-sm font-medium uppercase tracking-[0.16em] text-ivory transition-all duration-300 hover:bg-wine"
        >
          Se connecter
        </button>
        <p className="mt-4 text-center text-xs text-ink/40">Par défaut : bloomy2025 (modifiable dans « Sécurité »)</p>
      </form>
    </div>
  );
}

/* ---------- Tableau de bord ---------- */

type Tab = "products" | "hero" | "offers" | "custom" | "sections" | "testimonials" | "faq" | "shop" | "cloud" | "pixels" | "security";

const TABS: { id: Tab; label: string }[] = [
  { id: "products", label: "Produits" },
  { id: "hero", label: "Accueil" },
  { id: "offers", label: "Occasions & Atouts" },
  { id: "custom", label: "Sur mesure" },
  { id: "sections", label: "Textes de sections" },
  { id: "testimonials", label: "Témoignages" },
  { id: "faq", label: "FAQ" },
  { id: "shop", label: "Boutique & Contact" },
  { id: "cloud", label: "Cloud & Sync" },
  { id: "pixels", label: "Pixels & Tracking" },
  { id: "security", label: "Sécurité" },
];

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const { data, update, reset, syncState, saveNow, createSyncChannel, importStore, refreshRemote } = useStore();
  const [tab, setTab] = useState<Tab>("products");
  const [creating, setCreating] = useState(false);
  const [cloudMsg, setCloudMsg] = useState("");
  const [saved, setSaved] = useState(false);
  const [newPw, setNewPw] = useState("");
  const [pwSaved, setPwSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setSaved(true);
    const t = setTimeout(() => setSaved(false), 2200);
    return () => clearTimeout(t);
  }, [data]);

  const s = data.settings;
  const c = data.content;

  const setSetting = (k: keyof Settings, v: string | number | boolean | object) =>
    update((d) => ({ ...d, settings: { ...d.settings, [k]: v } as Settings }));
  const setPixel = (k: keyof Pixels, v: string) =>
    update((d) => ({ ...d, settings: { ...d.settings, pixels: { ...d.settings.pixels, [k]: v } } }));

  const patchC = (key: keyof ContentData, p: Record<string, unknown>) =>
    update((d) => ({
      ...d,
      content: {
        ...d.content,
        [key]: { ...(d.content[key] as unknown as Record<string, unknown>), ...p },
      } as ContentData,
    }));
  const setC = (p: Partial<ContentData>) => update((d) => ({ ...d, content: { ...d.content, ...p } }));
  const setHero = (k: string, v: string) => patchC("hero", { [k]: v });
  const setCollections = (k: string, v: string) => patchC("collections", { [k]: v });
  const setOcc = (k: string, v: unknown) => patchC("occasions", { [k]: v });
  const setBen = (k: string, v: unknown) => patchC("benefits", { [k]: v });
  const setCustom = (k: string, v: unknown) => patchC("custom", { [k]: v });
  const setTestSec = (k: string, v: string) => patchC("testimonialsSec", { [k]: v });
  const setBest = (k: string, v: unknown) => patchC("bestsellers", { [k]: v });
  const setFaqSec = (k: string, v: string) => patchC("faqSec", { [k]: v });
  const setInsta = (v: string) => patchC("instagramSec", { sub: v });
  const setFinal = (k: string, v: string) => patchC("finalCta", { [k]: v });

  const setProduct = (id: string, patch: Partial<Product>) =>
    update((d) => ({ ...d, products: d.products.map((p) => (p.id === id ? { ...p, ...patch } : p)) }));
  const addProduct = () =>
    update((d) => ({
      ...d,
      products: [
        ...d.products,
        { id: `p${Date.now().toString(36)}`, name: "Nouveau bouquet", flowers: 1, price: null, description: "Décrivez votre bouquet…", image: "/images/hero.jpg" },
      ],
    }));
  const delProduct = (id: string) => update((d) => ({ ...d, products: d.products.filter((p) => p.id !== id) }));

  const setTestimonial = (id: string, patch: Partial<Testimonial>) =>
    update((d) => ({ ...d, testimonials: d.testimonials.map((t) => (t.id === id ? { ...t, ...patch } : t)) }));
  const setFaq = (id: string, patch: Partial<FaqItem>) =>
    update((d) => ({ ...d, faq: d.faq.map((f) => (f.id === id ? { ...f, ...patch } : f)) }));

  const onFile = (id: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setProduct(id, { image: String(r.result) });
    r.readAsDataURL(f);
    e.target.value = "";
  };

  /* ---- Cloud & sync ---- */
  const channel = getEffectiveChannel(data);
  const localChannelUrl = data.settings.sync.url;

  const handleCreate = async () => {
    setCreating(true);
    setCloudMsg("");
    const ch = await createSyncChannel();
    setCreating(false);
    setCloudMsg(ch ? "Canal créé ✓ — copiez le lien ci-dessous." : "Création impossible — vérifiez votre connexion et réessayez.");
  };
  const handleSaveNow = async () => {
    setCloudMsg("");
    const ok = await saveNow();
    setCloudMsg(ok ? "Publié ! Vos visiteurs verront les nouveautés à leur prochaine visite. ✓" : "Échec de la publication — un canal avec token est requis. Recréez le canal.");
  };
  const handleRefresh = async () => {
    setCloudMsg("");
    const ok = await refreshRemote();
    setCloudMsg(ok ? "Dernière version cloud chargée. ✓" : "Aucune version trouvée à cette adresse.");
  };
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCloudMsg("Lien copié ✓");
      window.setTimeout(() => setCloudMsg(""), 2500);
    } catch {
      setCloudMsg("Copie impossible — sélectionnez le lien manuellement.");
    }
  };
  const onImportFile = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      const ok = importStore(String(r.result));
      setCloudMsg(ok ? "Sauvegarde restaurée. ✓" : "Fichier invalide.");
      setTab("products");
    };
    r.readAsText(f);
    e.target.value = "";
  };

  const STATUS: Record<"off" | "loading" | "live" | "error", { dot: string; label: string }> = {
    off: { dot: "bg-ink/30", label: "Aucune synchronisation active" },
    loading: { dot: "bg-amber-400 animate-pulse", label: "Chargement de la version cloud…" },
    live: { dot: "bg-emerald-500", label: "Connecté — tous les visiteurs voient la dernière version" },
    error: { dot: "bg-red-500", label: "Connexion impossible — vérifiez le lien" },
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-40 bg-wine text-ivory shadow-soft">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <div className="flex items-center gap-2.5">
            <FlowerLogo className="h-7 w-7 text-petal" />
            <span className="font-display text-xl">
              Bloomy <em className="italic text-petal">Satin</em>
            </span>
            <span className="hidden rounded-full bg-ivory/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-ivory/70 sm:inline">
              Espace gérant
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`hidden items-center gap-1.5 text-xs text-petal transition-opacity duration-300 sm:flex ${saved ? "opacity-100" : "opacity-0"}`}
              aria-live="polite"
            >
              <Check className="h-3.5 w-3.5" /> Enregistré
            </span>
            {syncState.status === "live" && (
              <span className="hidden items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-300 md:flex">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Cloud
              </span>
            )}
            <a
              href="#/"
              className="rounded-full border border-ivory/30 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-colors hover:bg-ivory/10"
            >
              Voir le site
            </a>
            <button
              onClick={onLogout}
              className="rounded-full bg-ivory/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-colors hover:bg-ivory/20"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8 md:py-10">
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-all duration-300 ${
                tab === t.id ? "bg-burgundy text-ivory shadow-card" : "bg-white/70 text-ink/60 hover:bg-white hover:text-burgundy"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {/* ---------- PRODUITS ---------- */}
          {tab === "products" && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="max-w-xl text-sm leading-relaxed text-ink/55">
                  Ajoutez, modifiez ou supprimez vos bouquets : nom, quantité, prix, badge, description et image.
                  Les changements s'enregistrent automatiquement et sont visibles immédiatement.
                </p>
                <button onClick={addProduct} className={smallBtn}>
                  <Plus className="h-4 w-4" /> Ajouter un bouquet
                </button>
              </div>
              {data.products.map((p) => (
                <div key={p.id} className={`${card} relative grid gap-5 md:grid-cols-[160px_1fr]`}>
                  <button
                    onClick={() => delProduct(p.id)}
                    aria-label="Supprimer ce bouquet"
                    className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full border border-petal/60 bg-white/70 text-ink/50 transition-colors hover:bg-burgundy hover:text-ivory"
                  >
                    <XIcon className="h-3.5 w-3.5" />
                  </button>
                  <div>
                    <span className={labelCls}>Image du produit</span>
                    <div className="overflow-hidden rounded-xl bg-blush/40">
                      <img src={p.image} alt="" className="aspect-square w-full object-cover" />
                    </div>
                    <label className="mt-2.5 block cursor-pointer rounded-full border border-burgundy/30 py-2 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-burgundy transition-colors hover:bg-burgundy hover:text-ivory">
                      Changer (fichier)
                      <input type="file" accept="image/*" className="hidden" onChange={onFile(p.id)} />
                    </label>
                    <input
                      value={p.image.startsWith("data:") ? "" : p.image}
                      onChange={(e) => setProduct(p.id, { image: e.target.value })}
                      placeholder="…ou coller une URL"
                      className="mt-2.5 w-full rounded-xl border border-petal/70 bg-white px-3 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-satin/50"
                    />
                  </div>
                  <div className="grid gap-4 pt-6 sm:grid-cols-2 md:pt-0">
                    <Field l="Nom du bouquet">
                      <input value={p.name} onChange={(e) => setProduct(p.id, { name: e.target.value })} className={inp} />
                    </Field>
                    <Field l="Nombre de fleurs">
                      <input
                        type="number"
                        min={1}
                        value={p.flowers}
                        onChange={(e) => setProduct(p.id, { flowers: Math.max(1, Number(e.target.value) || 1) })}
                        className={inp}
                      />
                    </Field>
                    <Field l="Prix (DH)" hint="Laisser vide pour afficher « Prix sur devis » sur la boutique.">
                      <input
                        type="number"
                        min={0}
                        value={p.price ?? ""}
                        placeholder="ex. 65"
                        onChange={(e) => setProduct(p.id, { price: e.target.value === "" ? null : Math.max(0, Number(e.target.value)) })}
                        className={inp}
                      />
                    </Field>
                    <Field l="Badge (optionnel)" hint="ex. « Le plus demandé » — affiché au-dessus de l'image.">
                      <input value={p.badge ?? ""} onChange={(e) => setProduct(p.id, { badge: e.target.value || undefined })} className={inp} />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field l="Description">
                        <textarea rows={2} value={p.description} onChange={(e) => setProduct(p.id, { description: e.target.value })} className={`${inp} resize-none`} />
                      </Field>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ---------- ACCUEIL / HERO ---------- */}
          {tab === "hero" && (
            <div className="space-y-5">
              <div className={card}>
                <h3 className="font-display text-2xl text-ink">Bannière d'accueil (héro)</h3>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <Field l="Petit texte au-dessus du titre">
                    <input value={c.hero.eyebrow} onChange={(e) => setHero("eyebrow", e.target.value)} className={inp} />
                  </Field>
                  <Field l="Titre — partie en italique" hint="Le reste du titre s'affiche en noir, cette partie en bordeaux italique.">
                    <input value={c.hero.accent} onChange={(e) => setHero("accent", e.target.value)} className={inp} />
                  </Field>
                  <Field l="Titre principal">
                    <input value={c.hero.title} onChange={(e) => setHero("title", e.target.value)} className={inp} />
                  </Field>
                  <Field l="Note / réputation">
                    <input value={c.hero.rating} onChange={(e) => setHero("rating", e.target.value)} className={inp} />
                  </Field>
                  <div className="md:col-span-2">
                    <Field l="Texte de présentation">
                      <textarea rows={2} value={c.hero.support} onChange={(e) => setHero("support", e.target.value)} className={`${inp} resize-none`} />
                    </Field>
                  </div>
                  <Field l="Libellé bouton principal">
                    <input value={c.hero.ctaPrimary} onChange={(e) => setHero("ctaPrimary", e.target.value)} className={inp} />
                  </Field>
                  <Field l="Libellé bouton secondaire">
                    <input value={c.hero.ctaSecondary} onChange={(e) => setHero("ctaSecondary", e.target.value)} className={inp} />
                  </Field>
                  <div className="md:col-span-2">
                    <Field l="Texte sous la note (ex. « plus de 500 clientes… »)">
                      <input value={c.hero.ratingLabel} onChange={(e) => setHero("ratingLabel", e.target.value)} className={inp} />
                    </Field>
                  </div>
                  <div className="md:col-span-2">
                    <ImgField l="Image du héro" value={c.hero.image} onChange={(v) => setHero("image", v)} />
                  </div>
                </div>
              </div>

              <div className={card}>
                <h3 className="font-display text-2xl text-ink">Ruban défilant</h3>
                <p className="mt-1.5 text-sm text-ink/50">Les messages séparés par des étoiles, sous la bannière.</p>
                <div className="mt-4">
                  <TextArrEditor items={c.marquee} onChange={(v) => setC({ marquee: v })} placeholder="Votre message…" />
                </div>
              </div>

              <div className={card}>
                <h3 className="font-display text-2xl text-ink">Piliers de confiance</h3>
                <p className="mt-1.5 text-sm text-ink/50">Les 4 (ou plus) arguments sous le ruban défilant.</p>
                <div className="mt-4">
                  <IconListEditor items={c.trust} onChange={(v) => setC({ trust: v })} addLabel="Nouveau pilier" />
                </div>
              </div>

              <div className={card}>
                <h3 className="font-display text-2xl text-ink">Ligne de satisfaction</h3>
                <div className="mt-4">
                  <input value={c.satisfaction} onChange={(e) => setC({ satisfaction: e.target.value })} className={inp} />
                </div>
              </div>
            </div>
          )}

          {/* ---------- OCCASIONS & ATOUTS ---------- */}
          {tab === "offers" && (
            <div className="space-y-5">
              <div className={card}>
                <h3 className="font-display text-2xl text-ink">Section « Occasions »</h3>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <Field l="Petit titre (script)">
                    <input value={c.occasions.eyebrow} onChange={(e) => setOcc("eyebrow", e.target.value)} className={inp} />
                  </Field>
                  <Field l="Titre — partie en italique">
                    <input value={c.occasions.accent} onChange={(e) => setOcc("accent", e.target.value)} className={inp} />
                  </Field>
                  <Field l="Titre principal">
                    <input value={c.occasions.title} onChange={(e) => setOcc("title", e.target.value)} className={inp} />
                  </Field>
                  <Field l="Sous-titre">
                    <input value={c.occasions.sub} onChange={(e) => setOcc("sub", e.target.value)} className={inp} />
                  </Field>
                </div>
                <div className="mt-5">
                  <span className={labelCls}>Cartes d'occasions</span>
                  <IconListEditor items={c.occasions.items} onChange={(v) => setOcc("items", v)} addLabel="Nouvelle occasion" />
                </div>
              </div>

              <div className={card}>
                <h3 className="font-display text-2xl text-ink">Section « Pourquoi nous »</h3>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <Field l="Petit titre (script)">
                    <input value={c.benefits.eyebrow} onChange={(e) => setBen("eyebrow", e.target.value)} className={inp} />
                  </Field>
                  <Field l="Titre — partie en italique">
                    <input value={c.benefits.accent} onChange={(e) => setBen("accent", e.target.value)} className={inp} />
                  </Field>
                  <Field l="Titre principal">
                    <input value={c.benefits.title} onChange={(e) => setBen("title", e.target.value)} className={inp} />
                  </Field>
                  <Field l="Signature (script manuscrit)">
                    <input value={c.benefits.script} onChange={(e) => setBen("script", e.target.value)} className={inp} />
                  </Field>
                  <div className="md:col-span-2">
                    <Field l="Texte de présentation">
                      <textarea rows={3} value={c.benefits.intro} onChange={(e) => setBen("intro", e.target.value)} className={`${inp} resize-none`} />
                    </Field>
                  </div>
                </div>
                <div className="mt-5">
                  <span className={labelCls}>Chiffres clés</span>
                  <StatsEditor items={c.benefits.stats} onChange={(v) => setBen("stats", v)} />
                </div>
                <div className="mt-5">
                  <span className={labelCls}>Atouts (liste numérotée)</span>
                  <IconListEditor items={c.benefits.items} onChange={(v) => setBen("items", v)} addLabel="Nouvel atout" />
                </div>
              </div>
            </div>
          )}

          {/* ---------- SUR MESURE ---------- */}
          {tab === "custom" && (
            <div className={card}>
              <h3 className="font-display text-2xl text-ink">Section « Sur mesure »</h3>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <Field l="Petit titre (script)">
                  <input value={c.custom.eyebrow} onChange={(e) => setCustom("eyebrow", e.target.value)} className={inp} />
                </Field>
                <Field l="Titre — partie en italique">
                  <input value={c.custom.accent} onChange={(e) => setCustom("accent", e.target.value)} className={inp} />
                </Field>
                <Field l="Titre principal">
                  <input value={c.custom.title} onChange={(e) => setCustom("title", e.target.value)} className={inp} />
                </Field>
                <Field l="Bouton">
                  <input value={c.custom.cta} onChange={(e) => setCustom("cta", e.target.value)} className={inp} />
                </Field>
                <div className="md:col-span-2">
                  <Field l="Texte de présentation">
                    <textarea rows={3} value={c.custom.sub} onChange={(e) => setCustom("sub", e.target.value)} className={`${inp} resize-none`} />
                  </Field>
                </div>
                <Field l="Texte sous le bouton">
                  <input value={c.custom.note} onChange={(e) => setCustom("note", e.target.value)} className={inp} />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field l="Badge flottant">
                    <input value={c.custom.badge} onChange={(e) => setCustom("badge", e.target.value)} className={inp} />
                  </Field>
                  <Field l="Note du badge">
                    <input value={c.custom.badgeNote} onChange={(e) => setCustom("badgeNote", e.target.value)} className={inp} />
                  </Field>
                </div>
                <div className="md:col-span-2">
                  <ImgField l="Image de l'atelier" value={c.custom.image} onChange={(v) => setCustom("image", v)} />
                </div>
              </div>
              <div className="mt-5">
                <span className={labelCls}>Étapes (01 → 02 → 03…)</span>
                <StepsEditor items={c.custom.steps} onChange={(v) => setCustom("steps", v)} />
              </div>
            </div>
          )}

          {/* ---------- TEXTES DE SECTIONS ---------- */}
          {tab === "sections" && (
            <div className="space-y-5">
              <div className={card}>
                <h3 className="font-display text-2xl text-ink">Section « Collections »</h3>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <Field l="Petit titre (script)"><input value={c.collections.eyebrow} onChange={(e) => setCollections("eyebrow", e.target.value)} className={inp} /></Field>
                  <Field l="Titre — partie en italique"><input value={c.collections.accent} onChange={(e) => setCollections("accent", e.target.value)} className={inp} /></Field>
                  <Field l="Titre principal"><input value={c.collections.title} onChange={(e) => setCollections("title", e.target.value)} className={inp} /></Field>
                  <Field l="Sous-titre"><input value={c.collections.sub} onChange={(e) => setCollections("sub", e.target.value)} className={inp} /></Field>
                </div>
              </div>

              <div className={card}>
                <h3 className="font-display text-2xl text-ink">Section « Best-sellers »</h3>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <Field l="Petit titre (script)"><input value={c.bestsellers.eyebrow} onChange={(e) => setBest("eyebrow", e.target.value)} className={inp} /></Field>
                  <Field l="Titre — partie en italique"><input value={c.bestsellers.accent} onChange={(e) => setBest("accent", e.target.value)} className={inp} /></Field>
                  <Field l="Titre principal"><input value={c.bestsellers.title} onChange={(e) => setBest("title", e.target.value)} className={inp} /></Field>
                  <Field l="Sous-titre"><input value={c.bestsellers.sub} onChange={(e) => setBest("sub", e.target.value)} className={inp} /></Field>
                  <Field l="Slogan carte « le plus demandé »"><input value={c.bestsellers.tagTrio} onChange={(e) => setBest("tagTrio", e.target.value)} className={inp} /></Field>
                  <Field l="Slogan carte « coup de cœur »"><input value={c.bestsellers.tagQuatuor} onChange={(e) => setBest("tagQuatuor", e.target.value)} className={inp} /></Field>
                  <div className="md:col-span-2">
                    <span className={labelCls}>Points forts listés sur les deux cartes</span>
                    <TextArrEditor items={c.bestsellers.features} onChange={(v) => setBest("features", v)} placeholder="Point fort…" />
                  </div>
                </div>
              </div>

              <div className={card}>
                <h3 className="font-display text-2xl text-ink">Section « Témoignages » (titre)</h3>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <Field l="Petit titre (script)"><input value={c.testimonialsSec.eyebrow} onChange={(e) => setTestSec("eyebrow", e.target.value)} className={inp} /></Field>
                  <Field l="Titre — partie en italique"><input value={c.testimonialsSec.accent} onChange={(e) => setTestSec("accent", e.target.value)} className={inp} /></Field>
                  <Field l="Titre principal"><input value={c.testimonialsSec.title} onChange={(e) => setTestSec("title", e.target.value)} className={inp} /></Field>
                  <Field l="Sous-titre"><input value={c.testimonialsSec.sub} onChange={(e) => setTestSec("sub", e.target.value)} className={inp} /></Field>
                </div>
              </div>

              <div className={card}>
                <h3 className="font-display text-2xl text-ink">Section « FAQ » (titre & aide)</h3>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <Field l="Petit titre (script)"><input value={c.faqSec.eyebrow} onChange={(e) => setFaqSec("eyebrow", e.target.value)} className={inp} /></Field>
                  <Field l="Titre — partie en italique"><input value={c.faqSec.accent} onChange={(e) => setFaqSec("accent", e.target.value)} className={inp} /></Field>
                  <Field l="Titre principal"><input value={c.faqSec.title} onChange={(e) => setFaqSec("title", e.target.value)} className={inp} /></Field>
                  <Field l="Sous-titre"><input value={c.faqSec.sub} onChange={(e) => setFaqSec("sub", e.target.value)} className={inp} /></Field>
                  <Field l="Carte d'aide — titre"><input value={c.faqSec.helpTitle} onChange={(e) => setFaqSec("helpTitle", e.target.value)} className={inp} /></Field>
                  <Field l="Carte d'aide — texte"><input value={c.faqSec.helpText} onChange={(e) => setFaqSec("helpText", e.target.value)} className={inp} /></Field>
                </div>
              </div>

              <div className={card}>
                <h3 className="font-display text-2xl text-ink">Section « Instagram »</h3>
                <div className="mt-5">
                  <Field l="Texte sous le nom du compte">
                    <textarea rows={2} value={c.instagramSec.sub} onChange={(e) => setInsta(e.target.value)} className={`${inp} resize-none`} />
                  </Field>
                </div>
              </div>

              <div className={card}>
                <h3 className="font-display text-2xl text-ink">Coup de cœur final</h3>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <Field l="Mot en script manuscrit"><input value={c.finalCta.script} onChange={(e) => setFinal("script", e.target.value)} className={inp} /></Field>
                  <Field l="Titre — partie en italique"><input value={c.finalCta.accent} onChange={(e) => setFinal("accent", e.target.value)} className={inp} /></Field>
                  <Field l="Titre principal"><input value={c.finalCta.title} onChange={(e) => setFinal("title", e.target.value)} className={inp} /></Field>
                  <Field l="Sous-titre"><input value={c.finalCta.sub} onChange={(e) => setFinal("sub", e.target.value)} className={inp} /></Field>
                  <Field l="Bouton principal"><input value={c.finalCta.ctaPrimary} onChange={(e) => setFinal("ctaPrimary", e.target.value)} className={inp} /></Field>
                  <Field l="Bouton secondaire"><input value={c.finalCta.ctaSecondary} onChange={(e) => setFinal("ctaSecondary", e.target.value)} className={inp} /></Field>
                </div>
              </div>
            </div>
          )}

          {/* ---------- TÉMOIGNAGES ---------- */}
          {tab === "testimonials" && (
            <div className="space-y-5">
              <p className="text-sm text-ink/55">
                Remplacez ces témoignages de démonstration par les avis réels de vos clientes.
              </p>
              {data.testimonials.map((t) => (
                <div key={t.id} className={`${card} relative`}>
                  <button
                    onClick={() => update((d) => ({ ...d, testimonials: d.testimonials.filter((x) => x.id !== t.id) }))}
                    aria-label="Supprimer ce témoignage"
                    className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-petal/60 text-ink/50 transition-colors hover:bg-burgundy hover:text-ivory"
                  >
                    <XIcon className="h-3.5 w-3.5" />
                  </button>
                  <div className="grid gap-4 sm:grid-cols-4">
                    <Field l="Nom"><input value={t.name} onChange={(e) => setTestimonial(t.id, { name: e.target.value })} className={inp} /></Field>
                    <Field l="Ville"><input value={t.city} onChange={(e) => setTestimonial(t.id, { city: e.target.value })} className={inp} /></Field>
                    <Field l="Occasion"><input value={t.occasion} onChange={(e) => setTestimonial(t.id, { occasion: e.target.value })} className={inp} /></Field>
                    <Field l="Note (1–5)">
                      <input type="number" min={1} max={5} value={t.rating} onChange={(e) => setTestimonial(t.id, { rating: Math.min(5, Math.max(1, Number(e.target.value) || 5)) })} className={inp} />
                    </Field>
                    <div className="sm:col-span-4">
                      <Field l="Témoignage">
                        <textarea rows={2} value={t.text} onChange={(e) => setTestimonial(t.id, { text: e.target.value })} className={`${inp} resize-none`} />
                      </Field>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() =>
                  update((d) => ({
                    ...d,
                    testimonials: [
                      ...d.testimonials,
                      { id: `t${Date.now().toString(36)}`, name: "Nouvelle cliente", city: "Ville", occasion: "Occasion", text: "Son avis ici…", rating: 5 },
                    ],
                  }))
                }
                className={smallBtn}
              >
                <Plus className="h-4 w-4" /> Ajouter un témoignage
              </button>
            </div>
          )}

          {/* ---------- FAQ ---------- */}
          {tab === "faq" && (
            <div className="space-y-5">
              {data.faq.map((f) => (
                <div key={f.id} className={`${card} relative`}>
                  <button
                    onClick={() => update((d) => ({ ...d, faq: d.faq.filter((x) => x.id !== f.id) }))}
                    aria-label="Supprimer cette question"
                    className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-petal/60 text-ink/50 transition-colors hover:bg-burgundy hover:text-ivory"
                  >
                    <XIcon className="h-3.5 w-3.5" />
                  </button>
                  <div className="grid gap-4">
                    <Field l="Question"><input value={f.q} onChange={(e) => setFaq(f.id, { q: e.target.value })} className={inp} /></Field>
                    <Field l="Réponse"><textarea rows={3} value={f.a} onChange={(e) => setFaq(f.id, { a: e.target.value })} className={`${inp} resize-none`} /></Field>
                  </div>
                </div>
              ))}
              <button
                onClick={() =>
                  update((d) => ({
                    ...d,
                    faq: [...d.faq, { id: `f${Date.now().toString(36)}`, q: "Nouvelle question ?", a: "Votre réponse ici." }],
                  }))
                }
                className={smallBtn}
              >
                <Plus className="h-4 w-4" /> Ajouter une question
              </button>
            </div>
          )}

          {/* ---------- BOUTIQUE & CONTACT ---------- */}
          {tab === "shop" && (
            <div className={card}>
              <h3 className="font-display text-2xl text-ink">Informations de la boutique</h3>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Field l="Description de la marque" hint="Utilisée dans le pied de page.">
                    <textarea rows={3} value={s.brandDescription} onChange={(e) => setSetting("brandDescription", e.target.value)} className={`${inp} resize-none`} />
                  </Field>
                </div>
                <Field l="Numéro WhatsApp" hint="Format international sans « + », ex. 212661234567.">
                  <input value={s.whatsapp} onChange={(e) => setSetting("whatsapp", e.target.value)} className={inp} />
                </Field>
                <Field l="Nom d'utilisateur Instagram" hint="Sans le @ — utilisé pour les liens.">
                  <input value={s.instagram} onChange={(e) => setSetting("instagram", e.target.value)} className={inp} />
                </Field>
                <Field l="Email de contact">
                  <input type="email" value={s.email} onChange={(e) => setSetting("email", e.target.value)} className={inp} />
                </Field>
                <Field l="Prix de la livraison" hint="Texte affiché sur la boutique (ex. « 20 – 40 DH »).">
                  <input value={s.deliveryPrice} onChange={(e) => setSetting("deliveryPrice", e.target.value)} className={inp} />
                </Field>
                <div className="md:col-span-2">
                  <Field l="Informations de livraison" hint="Texte descriptif affiché dans le pied de page.">
                    <input value={s.deliveryInfo} onChange={(e) => setSetting("deliveryInfo", e.target.value)} className={inp} />
                  </Field>
                </div>
              </div>
            </div>
          )}

          {/* ---------- CLOUD & SYNC ---------- */}
          {tab === "cloud" && (
            <div className="space-y-5">
              {/* Statut */}
              <div className={card}>
                <h3 className="font-display text-2xl text-ink">Statut de la synchronisation</h3>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className={`h-3 w-3 rounded-full ${STATUS[syncState.status].dot}`} />
                  <span className="text-sm font-medium text-ink">{STATUS[syncState.status].label}</span>
                  {syncState.saving && <span className="text-xs text-ink/50">— enregistrement en cours…</span>}
                </div>
                <div className="mt-4 grid gap-3 text-sm text-ink/55 md:grid-cols-2">
                  <p>
                    Dernière publication :{" "}
                    <strong className="text-ink">
                      {syncState.at ? new Date(syncState.at).toLocaleString("fr-MA") : "aucune"}
                    </strong>
                  </p>
                  <p className="break-all">
                    Lien actif : <strong className="text-ink">{channel.url || "aucun"}</strong>
                  </p>
                </div>
                {cloudMsg && (
                  <p className="mt-4 rounded-xl bg-blush/50 px-4 py-3 text-sm text-burgundy" aria-live="polite">
                    {cloudMsg}
                  </p>
                )}
              </div>

              {/* Canal */}
              <div className={card}>
                <h3 className="font-display text-2xl text-ink">Canal de synchronisation (gratuit)</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/55">
                  Créez votre canal cloud en un clic : chaque modification est ensuite enregistrée automatiquement, et{" "}
                  <strong>tous les visiteurs</strong> (téléphones, tablettes, PC, n'importe où) voient votre boutique à
                  jour dès qu'ils l'ouvrent.
                </p>
                <button
                  onClick={handleCreate}
                  disabled={creating}
                  className="sheen mt-4 rounded-full bg-burgundy px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] text-ivory transition-all duration-300 hover:bg-wine disabled:opacity-60"
                >
                  {creating ? "Création en cours…" : localChannelUrl ? "Recréer un canal (remplacer l'actuel)" : "Créer mon canal de synchronisation"}
                </button>
                {localChannelUrl && (
                  <div className="mt-4 space-y-3">
                    <Field l="Lien de votre canal">
                      <input readOnly value={localChannelUrl} className={`${inp} font-mono text-xs`} />
                    </Field>
                    <button onClick={() => handleCopy(localChannelUrl)} className={smallBtn}>
                      Copier le lien
                    </button>
                    <div className="rounded-2xl border border-gold/50 bg-gold/10 p-4 text-sm leading-relaxed text-ink/75">
                      <strong>Étape finale (une seule fois) :</strong> envoyez ce lien au développeur du site (ou collez-le
                      dans <code className="rounded bg-white/70 px-1.5 py-0.5 font-mono text-xs">DEFAULT_SYNC_URL</code> du
                      fichier <code className="rounded bg-white/70 px-1.5 py-0.5 font-mono text-xs">src/lib/sync.ts</code>{" "}
                      puis republiez le site). Ensuite, toutes vos mises à jour atteindront automatiquement tous vos
                      visiteurs sur tous leurs appareils.
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className={card}>
                <h3 className="font-display text-2xl text-ink">Publication & sauvegarde</h3>
                <label className="mt-4 flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={data.settings.sync.autoSave}
                    onChange={(e) => setSetting("sync", { ...data.settings.sync, autoSave: e.target.checked })}
                    className="h-5 w-5 accent-burgundy"
                  />
                  <span className="text-sm text-ink/70">Enregistrement automatique à chaque modification</span>
                </label>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={handleSaveNow}
                    disabled={!channel.url || syncState.saving}
                    className="sheen rounded-full bg-[#1FA855] px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#178A45] disabled:opacity-50"
                  >
                    {syncState.saving ? "Publication…" : "Publier maintenant (visible par tous)"}
                  </button>
                  <button onClick={handleRefresh} disabled={!channel.url} className={smallBtn}>
                    Actualiser depuis le lien
                  </button>
                </div>
              </div>

              {/* Sauvegarde manuelle */}
              <div className={card}>
                <h3 className="font-display text-2xl text-ink">Sauvegarde manuelle (fichier)</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/55">
                  Exportez une copie complète de votre boutique (produits, textes, prix, pixels…) ou restaurez une
                  sauvegarde antérieure. <strong>Attention :</strong> ce fichier contient le mot de passe de l'espace
                  gérant — ne le partagez pas.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button onClick={() => downloadJson("bloomy-satin-sauvegarde.json", exportJson(data))} className={smallBtn}>
                    Télécharger ma sauvegarde
                  </button>
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-burgundy/30 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-burgundy transition-colors hover:bg-burgundy hover:text-ivory">
                    Restaurer une sauvegarde
                    <input type="file" accept="application/json,.json" className="hidden" onChange={onImportFile} />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* ---------- PIXELS ---------- */}
          {tab === "pixels" && (
            <div className="space-y-5">
              <div className={card}>
                <h3 className="flex items-center gap-2 font-display text-2xl text-ink">
                  <Sparkle className="h-5 w-5 text-gold" /> Pixels de suivi
                </h3>
                <div className="mt-5 grid gap-5">
                  <Field l="Meta / Facebook Pixel ID" hint="Permet de suivre vos campagnes publicitaires Meta sur le site.">
                    <input value={s.pixels.meta} placeholder="ex. 1234567890123456" onChange={(e) => setPixel("meta", e.target.value)} className={inp} />
                  </Field>
                  <Field l="Instagram tracking (ID Meta dédié)" hint="Optionnel — si vous utilisez un pixel Meta séparé pour Instagram.">
                    <input value={s.pixels.instagram} placeholder="ex. 6543210987654321" onChange={(e) => setPixel("instagram", e.target.value)} className={inp} />
                  </Field>
                  <Field l="TikTok Pixel ID" hint="Pour le suivi des campagnes TikTok Ads.">
                    <input value={s.pixels.tiktok} placeholder="ex. C1A2B3C4D5E6F7G8" onChange={(e) => setPixel("tiktok", e.target.value)} className={inp} />
                  </Field>
                </div>
              </div>
              <div className="rounded-3xl border border-gold/40 bg-gold/10 p-5 text-sm leading-relaxed text-ink/70">
                Les pixels sont chargés automatiquement après enregistrement. Événements envoyés :{" "}
                <strong>PageView</strong> (visite), <strong>InitiateCheckout</strong> (ouverture de la commande) et{" "}
                <strong>Contact</strong> (clics sur les boutons WhatsApp). Videz le champ pour désactiver un pixel.
              </div>
            </div>
          )}

          {/* ---------- SÉCURITÉ ---------- */}
          {tab === "security" && (
            <div className="space-y-5">
              <div className={card}>
                <h3 className="font-display text-2xl text-ink">Mot de passe</h3>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
                  <div className="flex-1">
                    <Field l="Nouveau mot de passe">
                      <input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="Minimum 6 caractères" className={inp} />
                    </Field>
                  </div>
                  <button
                    onClick={() => {
                      if (newPw.length >= 6) {
                        setSetting("adminPassword", newPw);
                        setNewPw("");
                        setPwSaved(true);
                        setTimeout(() => setPwSaved(false), 2500);
                      }
                    }}
                    className="rounded-full bg-burgundy px-6 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-wine"
                  >
                    Mettre à jour
                  </button>
                </div>
                <p className={`mt-3 flex items-center gap-1.5 text-sm text-burgundy transition-opacity ${pwSaved ? "opacity-100" : "opacity-0"}`}>
                  <Check className="h-4 w-4" /> Mot de passe mis à jour.
                </p>
              </div>
              <div className={`${card} border-burgundy/30`}>
                <h3 className="font-display text-2xl text-burgundy">Zone sensible</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  Réinitialise toute la boutique (produits, textes, images, témoignages, FAQ, contacts et pixels) à
                  son état d'origine. Cette action est irréversible.
                </p>
                <button
                  onClick={() => {
                    if (confirmReset) {
                      reset();
                      setConfirmReset(false);
                    } else {
                      setConfirmReset(true);
                      setTimeout(() => setConfirmReset(false), 4000);
                    }
                  }}
                  className={`mt-4 rounded-full px-6 py-2.5 text-xs font-medium uppercase tracking-[0.14em] transition-all duration-300 ${
                    confirmReset ? "bg-burgundy text-ivory" : "border border-burgundy/40 text-burgundy hover:bg-burgundy/10"
                  }`}
                >
                  {confirmReset ? "Confirmer la réinitialisation ?" : "Réinitialiser la boutique"}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function AdminApp() {
  const { data } = useStore();
  const [authed, setAuthed] = useState(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === "1";
    } catch {
      return false;
    }
  });

  const onOk = () => {
    try {
      sessionStorage.setItem(AUTH_KEY, "1");
    } catch {
      /* noop */
    }
    setAuthed(true);
  };
  const onLogout = () => {
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch {
      /* noop */
    }
    setAuthed(false);
  };

  if (!authed) return <Login password={data.settings.adminPassword} onOk={onOk} />;
  return <Dashboard onLogout={onLogout} />;
}
