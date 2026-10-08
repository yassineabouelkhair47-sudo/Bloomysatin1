import { useStore } from "../lib/store";
import Reveal from "./Reveal";
import { SectionHeading, Stars } from "./ui";
import { Quote } from "./Icons";

const TILT = ["-rotate-1", "rotate-1", "-rotate-[0.6deg]", "rotate-[0.6deg]"];

export default function Testimonials() {
  const { data } = useStore();
  const c = data.content.testimonialsSec;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ivory via-cream/60 to-ivory py-20 md:py-28">
      <div className="zellige absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} accent={c.accent} sub={c.sub} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.testimonials.map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 120} className="h-full">
              <figure
                className={`group relative flex h-full flex-col rounded-3xl border border-petal/40 bg-white/75 p-7 shadow-card backdrop-blur-sm transition-all duration-500 hover:rotate-0 hover:shadow-soft ${TILT[i % TILT.length]}`}
              >
                <Quote className="h-7 w-7 text-petal transition-colors duration-500 group-hover:text-satin" />
                <div className="mt-3">
                  <Stars n={t.rating} className="h-3.5 w-3.5" />
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink/70">« {t.text} »</blockquote>
                <figcaption className="mt-6 flex items-center justify-between gap-3 border-t border-petal/40 pt-4">
                  <div>
                    <p className="font-display text-lg leading-tight text-ink">{t.name}</p>
                    <p className="text-xs text-ink/50">{t.city}</p>
                  </div>
                  <span className="rounded-full bg-blush/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-burgundy">
                    {t.occasion}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
