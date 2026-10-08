import { useStore } from "../lib/store";
import Reveal from "./Reveal";
import Petals from "./Petals";
import { CTA, Stars } from "./ui";
import { ArrowRight, FlowerLogo, ICONS, Sparkle, Star8 } from "./Icons";

export default function Hero() {
  const { data, waLink, track } = useStore();
  const h = data.content.hero;
  const marquee = data.content.marquee.filter(Boolean);
  const trust = data.content.trust;

  const prices = data.products.map((p) => p.price).filter((x): x is number => x != null);
  const minPrice = prices.length ? Math.min(...prices) : 10;

  return (
    <>
      <section id="accueil" className="relative overflow-hidden pb-16 pt-28 md:pt-40">
        <div className="glow absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blush/60 blur-3xl" />
        <div className="glow absolute -right-40 top-1/4 h-[26rem] w-[26rem] rounded-full bg-petal/35 blur-3xl" style={{ animationDelay: "3s" }} />
        <div className="zellige absolute inset-0 opacity-60" />
        <Petals count={9} />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div>
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.34em] text-burgundy/75">
                <span className="h-px w-8 bg-burgundy/40" />
                {h.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={130}>
              <h1 className="mt-6 font-display text-[2.9rem] leading-[1.02] text-ink sm:text-6xl lg:text-[4.5rem]">
                {h.title} <em className="italic text-burgundy">{h.accent}</em>
              </h1>
            </Reveal>
            <Reveal delay={260}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ink/65 md:text-lg">{h.support}</p>
            </Reveal>
            <Reveal delay={390}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <CTA href={waLink("Bonjour Bloomy Satin 🌸 Je souhaite passer une commande.")} target="_blank" onClick={() => track("Contact")}>
                  {h.ctaPrimary}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </CTA>
                <CTA href="#collections" variant="outline">
                  {h.ctaSecondary}
                </CTA>
              </div>
            </Reveal>
            <Reveal delay={520}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Stars n={5} className="h-4 w-4" />
                <p className="text-sm text-ink/60">
                  <strong className="font-medium text-ink">{h.rating}</strong> — {h.ratingLabel}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal variant="scale" delay={220} className="relative">
            <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
              <Star8 className="bob absolute -right-6 -top-8 h-16 w-16 text-gold/60" />
              <Sparkle className="absolute -left-8 top-1/3 h-7 w-7 text-satin/70" />
              <div className="relative rounded-t-[999px] rounded-b-[2.25rem] bg-white/60 p-2.5 shadow-soft ring-1 ring-petal/50 backdrop-blur-sm">
                <div className="overflow-hidden rounded-t-[999px] rounded-b-[1.85rem]">
                  <img
                    src={h.image}
                    alt="Bouquet de fleurs en satin fait main par Bloomy Satin"
                    className="kenburns aspect-[4/5] w-full object-cover"
                    fetchPriority="high"
                  />
                </div>
              </div>

              <div className="floaty absolute -left-3 top-24 md:-left-12">
                <div className="flex items-center gap-2.5 rounded-2xl border border-petal/50 bg-white/90 px-4 py-3 shadow-card backdrop-blur">
                  <FlowerLogo className="h-6 w-6 shrink-0 text-burgundy" />
                  <p className="text-[11px] font-medium leading-snug text-ink">
                    100% fait main
                    <span className="block font-normal text-ink/50">zéro eau · zéro entretien</span>
                  </p>
                </div>
              </div>
              <div className="floaty-slow absolute -right-2 bottom-10 md:-right-8">
                <div className="rounded-2xl border border-gold/40 bg-white/90 px-4 py-3 text-right shadow-card backdrop-blur">
                  <p className="font-display text-2xl leading-none text-burgundy">Dès {minPrice} DH</p>
                  <p className="mt-1 text-[11px] text-ink/55">livraison partout au Maroc</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Marquee ribbon */}
      {marquee.length > 0 && (
        <div className="zellige-light relative overflow-hidden bg-wine py-4">
          <div className="marquee-track" aria-hidden="true">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-center">
                {marquee.map((m) => (
                  <span key={`${dup}-${m}`} className="flex items-center gap-6 pr-6 font-display text-base italic tracking-wide text-ivory/85 md:text-lg">
                    {m}
                    <Star8 className="h-3.5 w-3.5 shrink-0 text-gold/80" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Social proof band */}
      {trust.length > 0 && (
        <section className="relative py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {trust.map((t, i) => {
                const Ic = ICONS[t.icon] ?? Sparkle;
                return (
                  <Reveal key={t.id} delay={i * 110} className="h-full">
                    <div className="group h-full text-center">
                      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-blush/60 text-burgundy ring-1 ring-petal/50 transition-all duration-500 group-hover:scale-110 group-hover:bg-burgundy group-hover:text-ivory">
                        <Ic className="h-6 w-6" />
                      </div>
                      <h3 className="mt-4 font-display text-xl text-ink">{t.title}</h3>
                      <p className="mx-auto mt-2 max-w-[15rem] text-sm leading-relaxed text-ink/55">{t.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
            {data.content.satisfaction && (
              <Reveal delay={420}>
                <div className="mt-12 flex flex-col items-center justify-center gap-3 border-t border-petal/40 pt-8 text-center sm:flex-row sm:gap-4">
                  <Stars n={5} />
                  <p className="text-sm text-ink/60">{data.content.satisfaction}</p>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}
    </>
  );
}
