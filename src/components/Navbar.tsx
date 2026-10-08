import { useEffect, useState } from "react";
import { useStore } from "../lib/store";
import { FlowerLogo, Instagram, Menu, WhatsApp, XIcon } from "./Icons";

const LINKS = [
  { label: "Accueil", href: "#accueil" },
  { label: "Collections", href: "#collections" },
  { label: "Occasions", href: "#occasions" },
  { label: "À propos", href: "#apropos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { waLink, track } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waMsg = "Bonjour Bloomy Satin 🌸 Je souhaite passer une commande.";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "bg-ivory/90 shadow-card backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
        <a href="#accueil" className="group flex items-center gap-2.5" aria-label="Bloomy Satin — accueil">
          <FlowerLogo className="h-8 w-8 text-burgundy transition-transform duration-500 group-hover:rotate-45" />
          <span className="font-display text-[1.55rem] tracking-wide text-ink">
            Bloomy <em className="italic text-burgundy">Satin</em>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-[11px] font-medium uppercase tracking-[0.18em] text-ink/65 transition-colors hover:text-burgundy"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-satin transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={`https://www.instagram.com/bloomy_satin12`}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Instagram Bloomy Satin"
            className="hidden h-10 w-10 place-items-center rounded-full border border-burgundy/25 text-burgundy transition-all duration-300 hover:border-burgundy hover:bg-burgundy hover:text-ivory md:grid"
          >
            <Instagram className="h-4.5 w-4.5" />
          </a>
          <a
            href={waLink(waMsg)}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => track("Contact")}
            className="sheen hidden items-center gap-2 rounded-full bg-[#1FA855] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-white shadow-soft transition-all duration-300 hover:bg-[#178A45] hover:-translate-y-0.5 sm:inline-flex"
          >
            <WhatsApp className="h-4 w-4" />
            Commander
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-burgundy/25 text-burgundy lg:hidden"
          >
            {open ? <XIcon className="h-4.5 w-4.5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-petal/40 bg-ivory/95 backdrop-blur-md lg:hidden">
          <nav className="mx-auto max-w-6xl px-5 py-4" aria-label="Navigation mobile">
            {LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-petal/30 py-3 font-display text-xl text-ink transition-colors hover:text-burgundy"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {l.label}
              </a>
            ))}
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.instagram.com/bloomy_satin12"
                target="_blank"
                rel="noreferrer noopener"
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-burgundy/30 py-3 text-xs font-medium uppercase tracking-[0.14em] text-burgundy"
              >
                <Instagram className="h-4 w-4" /> Instagram
              </a>
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => track("Contact")}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1FA855] py-3 text-xs font-medium uppercase tracking-[0.14em] text-white"
              >
                <WhatsApp className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
