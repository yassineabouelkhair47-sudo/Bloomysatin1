import { useStore } from "../lib/store";
import Reveal from "./Reveal";
import Petals from "./Petals";
import { CTA, Stars } from "./ui";
import { ArrowRight, Instagram, Star8, WhatsApp } from "./Icons";

export default function FinalCTA() {
  const { data, waLink, track } = useStore();
  const s = data.settings;
  const c = data.content.finalCta;

  return (
    <section id="contact" className="zellige-light relative scroll-mt-20 overflow-hidden bg-wine py-24 md:py-32">
      <div className="glow absolute -left-24 -top-24 h-96 w-96 rounded-full bg-burgundy/60 blur-3xl" />
      <div className="glow absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-rose/30 blur-3xl" style={{ animationDelay: "4s" }} />
      <Petals count={7} className="opacity-60" />

      <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
        <Reveal>
          <Star8 className="mx-auto h-8 w-8 text-gold" />
        </Reveal>
        <Reveal delay={130}>
          {c.script && <p className="mt-6 font-script text-3xl text-petal md:text-4xl">{c.script}</p>}
        </Reveal>
        <Reveal delay={240}>
          <h2 className="mt-3 font-display text-4xl leading-[1.06] text-ivory md:text-6xl">
            {c.title} <em className="italic text-petal">{c.accent}</em>
          </h2>
        </Reveal>
        <Reveal delay={370}>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-ivory/75 md:text-lg">{c.sub}</p>
        </Reveal>
        <Reveal delay={500}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <CTA href="#collections" variant="light">
              {c.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </CTA>
            <CTA
              href={waLink("Bonjour Bloomy Satin 🌸 Je souhaite vous contacter au sujet d'une commande.")}
              target="_blank"
              onClick={() => track("Contact")}
              variant="gold"
            >
              <WhatsApp className="h-4 w-4" />
              {c.ctaSecondary}
            </CTA>
          </div>
        </Reveal>
        <Reveal delay={620}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ivory/60">
            <span className="flex items-center gap-2">
              <WhatsApp className="h-4 w-4 text-petal" /> +{s.whatsapp}
            </span>
            <a
              href={`https://www.instagram.com/${s.instagram.replace(/^@/, "")}`}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2 transition-colors hover:text-ivory"
            >
              <Instagram className="h-4 w-4 text-petal" /> @{s.instagram.replace(/^@/, "")}
            </a>
          </div>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Stars n={5} className="h-3.5 w-3.5" />
            <span className="text-xs tracking-wide text-ivory/50">4,9/5 — plus de 500 clientes comblées</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
