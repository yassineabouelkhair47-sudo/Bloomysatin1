import { useStore } from "../lib/store";
import Reveal from "./Reveal";
import Petals from "./Petals";
import { CTA } from "./ui";
import { Sparkle, Star8 } from "./Icons";

export default function CustomOrders() {
  const { data, waLink, track } = useStore();
  const c = data.content.custom;

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="glow absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-blush/50 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal variant="left" className="relative order-2 lg:order-1">
          <div className="relative mx-auto max-w-md">
            <Petals count={5} inset="-inset-x-6 -inset-y-10" />
            <Star8 className="bob absolute -left-6 -top-7 z-10 h-14 w-14 text-gold/60" />
            <div className="relative overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-white/60 p-2.5 shadow-soft ring-1 ring-petal/50">
              <div className="overflow-hidden rounded-t-[999px] rounded-b-[1.6rem]">
                <img
                  src={c.image}
                  alt="Artisane façonnant une rose en satin à la main dans l'atelier Bloomy Satin"
                  loading="lazy"
                  className="kenburns aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
            <div className="floaty absolute -right-4 bottom-8 z-10 rounded-2xl border border-gold/40 bg-white/95 px-5 py-3.5 text-center shadow-card md:-right-10">
              <p className="font-script text-2xl leading-none text-burgundy">{c.badge}</p>
              <p className="mt-1 text-[11px] text-ink/55">{c.badgeNote}</p>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-burgundy/25" />
              <span className="font-script text-3xl text-satin">{c.eyebrow}</span>
              <Sparkle className="h-3.5 w-3.5 text-gold" />
            </div>
          </Reveal>
          <Reveal delay={130}>
            <h2 className="mt-4 font-display text-4xl leading-[1.08] text-ink md:text-5xl">
              {c.title} <em className="italic text-burgundy">{c.accent}</em>
            </h2>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-6 max-w-md leading-relaxed text-ink/65">{c.sub}</p>
          </Reveal>

          <div className="mt-9 space-y-6">
            {c.steps.map((s, i) => (
              <Reveal key={s.id} delay={340 + i * 130}>
                <div className="group flex items-start gap-5">
                  <span className="flourish mt-1.5 font-display text-3xl font-medium text-satin transition-colors duration-300 group-hover:text-burgundy">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="border-l border-petal/50 pl-5">
                    <h3 className="font-display text-xl text-ink">{s.title}</h3>
                    <p className="mt-1 max-w-sm text-sm leading-relaxed text-ink/60">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={700}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <CTA
                href={waLink("Bonjour Bloomy Satin 🌸 Je souhaite créer un bouquet personnalisé. Voici mon idée : ")}
                target="_blank"
                onClick={() => track("Contact")}
              >
                {c.cta}
              </CTA>
              <p className="text-xs text-ink/50">{c.note}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
