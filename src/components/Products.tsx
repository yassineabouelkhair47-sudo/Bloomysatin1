import { useStore } from "../lib/store";
import { useOrder } from "./OrderModal";
import Reveal from "./Reveal";
import { SectionHeading } from "./ui";
import { Sparkle, WhatsApp } from "./Icons";
import type { Product } from "../lib/defaults";

export function productWaMessage(p: Product): string {
  return `Bonjour Bloomy Satin 🌸 Je souhaite commander le bouquet « ${p.name} » (${p.flowers} fleur${
    p.flowers > 1 ? "s" : ""
  }${p.price != null ? ` — ${p.price} DH` : " — prix sur devis"}).`;
}

export default function Products() {
  const { data, waLink, track } = useStore();
  const { openOrder } = useOrder();
  const cc = data.content.collections;

  return (
    <section id="collections" className="relative scroll-mt-20 bg-gradient-to-b from-ivory via-cream/50 to-ivory py-20 md:py-28">
      <div className="zellige absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading eyebrow={cc.eyebrow} title={cc.title} accent={cc.accent} sub={cc.sub} />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.products.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 90} className="h-full">
              <article className="group flex h-full flex-col rounded-[1.75rem] border border-petal/40 bg-white/70 p-3 shadow-card backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-soft">
                <div className="relative overflow-hidden rounded-t-[999px] rounded-b-xl bg-cream">
                  <img
                    src={p.image}
                    alt={`Bouquet ${p.name} — ${p.flowers} fleurs en satin`}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {p.badge && (
                    <span className="absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap rounded-full bg-wine/85 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-ivory backdrop-blur">
                      {p.badge}
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-wine/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-2xl text-ink">{p.name}</h3>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-ink/45">
                      {p.flowers} fleur{p.flowers > 1 ? "s" : ""}
                    </span>
                  </div>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink/60">{p.description}</p>

                  <div className="mt-4">
                    {p.price != null ? (
                      <p className="flex items-baseline gap-1.5">
                        <span className="font-display text-3xl font-medium text-burgundy">{p.price}</span>
                        <span className="text-xs uppercase tracking-wider text-ink/50">DH</span>
                      </p>
                    ) : (
                      <span className="bob inline-flex items-center gap-1.5 rounded-full border border-dashed border-satin/70 bg-blush/40 px-3.5 py-1.5">
                        <Sparkle className="h-3.5 w-3.5 text-gold" />
                        <span className="font-script text-lg leading-none text-burgundy">Prix sur devis</span>
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => openOrder(p)}
                      className="sheen flex-1 rounded-full bg-burgundy px-4 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-ivory transition-all duration-300 hover:bg-wine focus:outline-none focus-visible:ring-2 focus-visible:ring-satin/70"
                    >
                      Commander
                    </button>
                    <a
                      href={waLink(productWaMessage(p))}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={() => track("Contact")}
                      aria-label={`Commander ${p.name} sur WhatsApp`}
                      title="Commander sur WhatsApp"
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1FA855] text-white shadow-card transition-all duration-300 hover:scale-110 hover:bg-[#178A45]"
                    >
                      <WhatsApp className="h-4.5 w-4.5" />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-12 text-center text-sm text-ink/55">
            Un format, une couleur, une forme particulière en tête ?{" "}
            <a
              href={waLink("Bonjour Bloomy Satin 🌸 J’aimerais créer un bouquet personnalisé.")}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => track("Contact")}
              className="flourish font-medium text-burgundy transition-colors hover:text-wine"
            >
              Écrivez-nous, nous créons ce dont vous rêvez →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
