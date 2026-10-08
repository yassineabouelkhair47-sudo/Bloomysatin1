import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { useStore } from "../lib/store";
import type { Product } from "../lib/defaults";
import { WhatsApp, XIcon } from "./Icons";

const OCCASIONS = [
  "Mariage",
  "Fiançailles",
  "Anniversaire",
  "Saint-Valentin",
  "Diplôme",
  "Anniversaire de rencontre",
  "Cadeau",
  "Autre occasion",
];

interface OrderCtx {
  openOrder: (p: Product) => void;
}

const Ctx = createContext<OrderCtx | null>(null);

export function useOrder(): OrderCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useOrder must be used within OrderProvider");
  return c;
}

const inp =
  "w-full rounded-xl border border-petal/70 bg-white/80 px-4 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:outline-none focus:ring-2 focus:ring-satin/50";

export function OrderProvider({ children }: { children: ReactNode }) {
  const { data, waLink, track } = useStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [occasion, setOccasion] = useState(OCCASIONS[0]);
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const openOrder = useCallback(
    (p: Product) => {
      setProduct(p);
      setOpen(true);
      track("InitiateCheckout");
    },
    [track],
  );

  const close = useCallback(() => {
    setOpen(false);
    setName("");
    setCity("");
    setOccasion(OCCASIONS[0]);
    setDate("");
    setNote("");
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!product) return;
    const msg = [
      "Bonjour Bloomy Satin 🌸 Je souhaite passer une commande :",
      `• Bouquet : ${product.name} (${product.flowers} fleur${product.flowers > 1 ? "s" : ""}${
        product.price != null ? ` — ${product.price} DH` : " — prix sur devis"
      })`,
      `• Nom : ${name.trim()}`,
      `• Livraison : ${city.trim()}`,
      `• Occasion : ${occasion}`,
      date ? `• Date souhaitée : ${date}` : "",
      note.trim() ? `• Message : ${note.trim()}` : "",
      "Merci !",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(waLink(msg), "_blank", "noopener");
    track("Contact");
    close();
  };

  return (
    <Ctx.Provider value={{ openOrder }}>
      {children}
      {open && product && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Commander un bouquet">
          <div className="absolute inset-0 bg-wine/55 backdrop-blur-sm" onClick={close} />
          <div className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-ivory p-6 shadow-soft sm:rounded-3xl sm:p-8">
            <button
              onClick={close}
              aria-label="Fermer"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-petal/60 text-ink/60 transition hover:bg-blush/50 hover:text-burgundy"
            >
              <XIcon className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-4 pr-10">
              <div className="h-20 w-16 shrink-0 overflow-hidden rounded-t-full rounded-b-xl bg-cream">
                <img src={product.image} alt="" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="font-script text-2xl text-satin leading-none">Votre commande</p>
                <h3 className="mt-1 font-display text-2xl text-ink">
                  {product.name} <span className="text-base text-ink/50">· {product.flowers} fleurs</span>
                </h3>
                <p className="text-sm text-ink/55">
                  {product.price != null ? (
                    <>
                      <strong className="text-burgundy">{product.price} DH</strong> — livraison estimée :{" "}
                      {data.settings.deliveryPrice}
                    </>
                  ) : (
                    <>prix confirmé sur WhatsApp</>
                  )}
                </p>
              </div>
            </div>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs font-medium uppercase tracking-[0.14em] text-ink/55">
                  Votre nom *
                  <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex. Salma" className={`${inp} mt-1.5 normal-case tracking-normal`} />
                </label>
                <label className="block text-xs font-medium uppercase tracking-[0.14em] text-ink/55">
                  Ville / quartier *
                  <input required value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ex. Casablanca" className={`${inp} mt-1.5 normal-case tracking-normal`} />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs font-medium uppercase tracking-[0.14em] text-ink/55">
                  Occasion
                  <select value={occasion} onChange={(e) => setOccasion(e.target.value)} className={`${inp} mt-1.5 normal-case tracking-normal`}>
                    {OCCASIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-xs font-medium uppercase tracking-[0.14em] text-ink/55">
                  Date souhaitée
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={`${inp} mt-1.5 normal-case tracking-normal`} />
                </label>
              </div>
              <label className="block text-xs font-medium uppercase tracking-[0.14em] text-ink/55">
                Un mot pour votre fleur (optionnel)
                <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="Couleurs préférées, carte manuscrite…" className={`${inp} mt-1.5 resize-none normal-case tracking-normal`} />
              </label>
              <button
                type="submit"
                className="sheen flex w-full items-center justify-center gap-2.5 rounded-full bg-[#1FA855] px-6 py-4 text-sm font-medium uppercase tracking-[0.14em] text-white shadow-soft transition-all duration-300 hover:bg-[#178A45] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FA855]/60"
              >
                <WhatsApp className="h-5 w-5" />
                Envoyer ma commande sur WhatsApp
              </button>
              <p className="text-center text-xs text-ink/45">
                Votre message sera pré-rempli dans WhatsApp — il ne vous reste qu'à appuyer sur « envoyer ».
              </p>
            </form>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}


