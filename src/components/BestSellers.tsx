import { useStore } from "../lib/store";
import { useOrder } from "./OrderModal";
import { productWaMessage } from "./Products";
import Reveal from "./Reveal";
import { SectionHeading } from "./ui";
import { Check, Sparkle, WhatsApp } from "./Icons";
import type { Product } from "../lib/defaults";

function BestCard({
  p,
  tagline,
  features,
  featured,
  index,
}: {
  p: Product;
  tagline: string;
  features: string[];
  featured?: boolean;
  index: number;
}) {
  const { waLink, track } = useStore();
  const { openOrder } = useOrder();
  const dark = Boolean(featured);

  return (
    <Reveal delay={index * 160} className="h-full">
      <article
        className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-6 shadow-soft transition-all duration-500 hover:-translate-y-2 md:p-8 ${
          dark
            ? "zellige-light bg-wine text-ivory"
            : "border-2 border-gold/50 bg-white/85 text-ink backdrop-blur"
        }`}
      >
        {p.badge && (
          <span
            className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-5 py-2 text-[11px] font-medium uppercase tracking-[0.2em] shadow-card ${
              dark ? "bg-gold text-wine" : "bg-burgundy text-ivory"
            }`}
          >
            {p.badge}
          </span>
        )}

        <div className="grid items-center gap-6 sm:grid-cols-[0.85fr_1.15fr] md:gap-8">
          <div className="relative">
            <div
              className={`overflow-hidden rounded-t-[999px] rounded-b-2xl p-2 ${
                dark ? "bg-ivory/15 ring-1 ring-ivory/25" : "bg-cream/70 ring-1 ring-petal/50"
              }`}
            >
              <div className="overflow-hidden rounded-t-[999px] rounded-b-xl">
                <img
                  src={p.image}
                  alt={`Bouquet ${p.name} — ${p.flowers} fleurs en satin`}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
            <span
              className={`bob absolute -right-3 top-8 grid h-14 w-14 place-items-center rounded-full font-display text-xl font-semibold shadow-card ${
                dark ? "bg-gold text-wine" : "bg-burgundy text-ivory"
              }`}
            >
              {p.flowers}
            </span>
          </div>

          <div className="text-center sm:text-left">
            <p className={`font-script text-2xl ${dark ? "text-petal" : "text-satin"}`}>{tagline}</p>
            <h3 className="mt-1 font-display text-3xl text-ink md:text-4xl">
              {p.name} <span className={`text-lg ${dark ? "text-ivory/60" : "text-ink/50"}`}>· {p.flowers} fleurs</span>
            </h3>
            {p.price != null ? (
              <p className="mt-4 flex items-baseline justify-center gap-2 sm:justify-start">
                <span className={`font-display text-5xl font-medium ${dark ? "text-ivory" : "text-burgundy"}`}>{p.price}</span>
                <span className={`text-sm uppercase tracking-wider ${dark ? "text-ivory/60" : "text-ink/50"}`}>DH</span>
              </p>
            ) : (
              <p className={`mt-4 font-script text-3xl ${dark ? "text-petal" : "text-satin"}`}>prix sur devis</p>
            )}
            <ul className={`mt-5 space-y-2.5 text-sm ${dark ? "text-ivory/80" : "text-ink/65"}`}>
              {features.filter(Boolean).map((f) => (
                <li key={f} className="flex items-center justify-center gap-2.5 sm:justify-start">
                  <span
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                      dark ? "bg-gold/25 text-gold" : "bg-blush text-burgundy"
                    }`}
                  >
                    <Check className="h-3 w-3" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <button
                onClick={() => openOrder(p)}
                className={`sheen rounded-full px-7 py-3.5 text-xs font-medium uppercase tracking-[0.16em] transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-satin/70 ${
                  dark ? "bg-ivory text-burgundy hover:bg-white" : "bg-burgundy text-ivory hover:bg-wine"
                }`}
              >
                Commander
              </button>
              <a
                href={waLink(productWaMessage(p))}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => track("Contact")}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-xs font-medium uppercase tracking-[0.16em] transition-all duration-300 hover:-translate-y-0.5 ${
                  dark
                    ? "border border-ivory/30 text-ivory hover:bg-ivory/10"
                    : "border border-[#1FA855]/40 text-[#178A45] hover:bg-[#1FA855]/10"
                }`}
              >
                <WhatsApp className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function BestSellers() {
  const { data } = useStore();
  const c = data.content.bestsellers;
  const trio = data.products.find((p) => p.flowers === 3) ?? data.products[1];
  const quatuor = data.products.find((p) => p.flowers === 4) ?? data.products[2];
  if (!trio || !quatuor) return null;

  return (
    <section id="prix" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="glow absolute -right-24 top-16 h-80 w-80 rounded-full bg-petal/30 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} accent={c.accent} sub={c.sub} />

        <div className="grid gap-8 pt-4 lg:grid-cols-2 lg:gap-10">
          <BestCard p={trio} tagline={c.tagTrio} features={c.features} featured index={0} />
          <BestCard p={quatuor} tagline={c.tagQuatuor} features={c.features} index={1} />
        </div>

        <Reveal delay={250}>
          <p className="mt-12 text-center text-sm text-ink/55">
            <Sparkle className="mr-1.5 inline h-3.5 w-3.5 text-gold" />
            Vous rêvez plus grand ? Retrouvez tous les formats — de 7 à 40 fleurs — dans notre{" "}
            <a href="#collections" className="flourish font-medium text-burgundy hover:text-wine">
              collection
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
