import { useStore } from "../lib/store";
import Reveal from "./Reveal";
import { SectionHeading } from "./ui";
import { ICONS, Sparkle } from "./Icons";

export default function Occasions() {
  const { data } = useStore();
  const c = data.content.occasions;
  const items = c.items;

  return (
    <section id="occasions" className="relative scroll-mt-20 overflow-hidden py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blush/30 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} accent={c.accent} sub={c.sub} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((o, i) => {
            const Ic = ICONS[o.icon] ?? Sparkle;
            return (
              <Reveal key={o.id} delay={(i % 4) * 100} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-3xl border border-petal/40 bg-white/60 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-satin/60 hover:shadow-soft">
                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-blush/50 transition-transform duration-700 group-hover:scale-[2.2]" />
                  <div className="relative">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-blush to-petal/70 text-burgundy ring-1 ring-petal/50 transition-all duration-500 group-hover:from-burgundy group-hover:to-wine group-hover:text-ivory">
                      <Ic className="h-5.5 w-5.5" />
                    </div>
                    <h3 className="mt-4 font-display text-[1.35rem] text-ink">{o.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink/55">{o.text}</p>
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
