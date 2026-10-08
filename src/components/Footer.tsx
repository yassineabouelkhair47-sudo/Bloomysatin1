import { useStore } from "../lib/store";
import { FlowerLogo, Instagram, Lock, Mail, MapPin, Truck, WhatsApp } from "./Icons";

const LINKS = [
  { label: "Accueil", href: "#accueil" },
  { label: "Collections", href: "#collections" },
  { label: "Occasions", href: "#occasions" },
  { label: "À propos", href: "#apropos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const { data, waLink, track } = useStore();
  const s = data.settings;
  const ig = `https://www.instagram.com/${s.instagram.replace(/^@/, "")}`;

  return (
    <footer className="relative border-t border-petal/40 bg-cream/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:px-8 md:py-16 lg:grid-cols-[1.25fr_0.7fr_1fr]">
        <div>
          <a href="#accueil" className="inline-flex items-center gap-2.5">
            <FlowerLogo className="h-8 w-8 text-burgundy" />
            <span className="font-display text-2xl tracking-wide text-ink">
              Bloomy <em className="italic text-burgundy">Satin</em>
            </span>
          </a>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/60">{s.brandDescription}</p>
          <div className="mt-5 flex gap-3">
            <a
              href={ig}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Instagram Bloomy Satin"
              className="grid h-10 w-10 place-items-center rounded-full border border-burgundy/25 text-burgundy transition-all duration-300 hover:border-burgundy hover:bg-burgundy hover:text-ivory"
            >
              <Instagram className="h-4.5 w-4.5" />
            </a>
            <a
              href={waLink("Bonjour Bloomy Satin 🌸")}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => track("Contact")}
              aria-label="WhatsApp Bloomy Satin"
              className="grid h-10 w-10 place-items-center rounded-full border border-burgundy/25 text-burgundy transition-all duration-300 hover:border-[#1FA855] hover:bg-[#1FA855] hover:text-white"
            >
              <WhatsApp className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

        <nav aria-label="Pied de page">
          <h4 className="text-xs font-medium uppercase tracking-[0.24em] text-burgundy">Navigation</h4>
          <ul className="mt-5 space-y-2.5">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-ink/60 transition-colors hover:text-burgundy">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h4 className="text-xs font-medium uppercase tracking-[0.24em] text-burgundy">Contact & livraison</h4>
          <ul className="mt-5 space-y-3.5 text-sm text-ink/60">
            <li>
              <a
                href={waLink("Bonjour Bloomy Satin 🌸")}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => track("Contact")}
                className="flex items-center gap-2.5 transition-colors hover:text-burgundy"
              >
                <WhatsApp className="h-4 w-4 shrink-0 text-satin" /> +{s.whatsapp}
              </a>
            </li>
            <li>
              <a href={`mailto:${s.email}`} className="flex items-center gap-2.5 transition-colors hover:text-burgundy">
                <Mail className="h-4 w-4 shrink-0 text-satin" /> {s.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Instagram className="h-4 w-4 shrink-0 text-satin" /> @{s.instagram.replace(/^@/, "")}
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-satin" /> Livraison partout au Maroc
            </li>
            <li className="flex items-start gap-2.5">
              <Truck className="mt-0.5 h-4 w-4 shrink-0 text-satin" /> {s.deliveryInfo}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-petal/40 py-5">
        <p className="text-center text-xs tracking-wide text-ink/45">
          © {new Date().getFullYear()} Bloomy Satin — fait main au Maroc ✿ Tous droits réservés.
        </p>
        <a
          href="#/admin"
          className="mx-auto mt-2 flex w-fit items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-ink/30 transition-colors hover:text-burgundy"
        >
          <Lock className="h-3 w-3" /> Espace gérant
        </a>
      </div>
    </footer>
  );
}
