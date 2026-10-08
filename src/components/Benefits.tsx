import { useStore } from "../lib/store";
import Reveal from "./Reveal";
import { ICONS, Sparkle, Star8 } from "./Icons";

export default function Benefits() {
  const { data } = useStore();
  const c = data.content.benefits;

  return (
    <section id="apropos" className="relative scroll-mt-20 bg-gradient-to-b from-ivory via-blush/25 to-ivory py-20 md:py-28">
      <div className="zellige absolute inset-0 opacity-40" />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Sticky intro column */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-burgundy/25" />
              <span className="font-script text-3xl text-satin">{c.eyebrow}</span>
              <Star8 className="h-3.5 w-3.5 text-gold" />
            </div>
          </Reveal>
          <Reveal delay={130}>
            <h2 className="mt-4 font-display text-4xl leading-[1.08] text-ink md:text-5xl">
              {c.title} <em className="italic text-burgundy">{c.accent}</em>
            </h2>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-6 max-w-md leading-relaxed text-ink/65">{c.intro}</p>
          </Reveal>
          {c.stats.length > 0 && (
            <Reveal delay={390}>
              <div className="mt-8 flex flex-wrap gap-8">
                {c.stats.map((s) => (
                  <div key={s.id}>
                    <p className="font-display text-3xl font-medium text-burgundy">{s.n}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-ink/50">{s.l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
          {c.script && (
            <Reveal delay={500}>
              <p className="mt-10 font-script text-4xl text-satin/90">{c.script}</p>
            </Reveal>
          )}
        </div>

        {/* Benefits list */}
        <div>
          {c.items.map((b, i) => {
            const Ic = ICONS[b.icon] ?? Sparkle;
            return (
              <Reveal key={b.id} delay={(i % 3) * 90}>
                <div className="group flex gap-5 border-b border-petal/40 py-6 transition-colors duration-300 first:pt-0 hover:bg-white/50 md:px-4">
                  <div className="mt-0.5 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-burgundy shadow-card ring-1 ring-petal/50 transition-all duration-500 group-hover:scale-110 group-hover:bg-burgundy group-hover:text-ivory">
                    <Ic className="h-5.5 w-5.5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-ink md:text-[1.35rem]">
                      <span className="mr-3 font-body text-xs font-medium tracking-[0.2em] text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {b.title}
                    </h3>
                    <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-ink/60">{b.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
