import { useState } from "react";
import { useStore } from "../lib/store";
import Reveal from "./Reveal";
import { Plus, WhatsApp, Instagram } from "./Icons";

export default function FAQ() {
  const { data, waLink, track } = useStore();
  const c = data.content.faqSec;
  const [open, setOpen] = useState<string | null>(data.faq[0]?.id ?? null);

  return (
    <section id="faq" className="relative scroll-mt-20 bg-gradient-to-b from-ivory via-blush/20 to-ivory py-20 md:py-28">
      <div className="zellige absolute inset-0 opacity-30" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-burgundy/25" />
              <span className="font-script text-3xl text-satin">{c.eyebrow}</span>
            </div>
          </Reveal>
          <Reveal delay={130}>
            <h2 className="mt-4 font-display text-4xl leading-[1.08] text-ink md:text-5xl">
              {c.title} <em className="italic text-burgundy">{c.accent}</em>
            </h2>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-5 max-w-sm leading-relaxed text-ink/60">{c.sub}</p>
          </Reveal>
          <Reveal delay={380}>
            <div className="mt-8 rounded-3xl border border-petal/50 bg-white/70 p-6 backdrop-blur-sm">
              <p className="font-display text-xl text-ink">{c.helpTitle}</p>
              <p className="mt-1.5 text-sm text-ink/55">{c.helpText}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={waLink("Bonjour Bloomy Satin 🌸 J'ai une question :")}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => track("Contact")}
                  className="inline-flex items-center gap-2 rounded-full bg-[#1FA855] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-[#178A45] hover:-translate-y-0.5"
                >
                  <WhatsApp className="h-4 w-4" /> WhatsApp
                </a>
                <a
                  href={`https://www.instagram.com/${data.settings.instagram}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-burgundy/30 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-burgundy transition-all duration-300 hover:bg-burgundy hover:text-ivory hover:-translate-y-0.5"
                >
                  <Instagram className="h-4 w-4" /> Instagram
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="space-y-4">
          {data.faq.map((f, i) => {
            const isOpen = open === f.id;
            return (
              <Reveal key={f.id} delay={i * 70}>
                <div
                  className={`overflow-hidden rounded-2xl border bg-white/75 backdrop-blur-sm transition-all duration-500 ${
                    isOpen ? "border-satin/60 shadow-soft" : "border-petal/40 shadow-card"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : f.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-satin/60"
                  >
                    <span className="font-display text-lg text-ink md:text-xl">{f.q}</span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-400 ${
                        isOpen
                          ? "rotate-45 border-burgundy bg-burgundy text-ivory"
                          : "border-burgundy/25 text-burgundy"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm leading-relaxed text-ink/65 md:text-[15px]">{f.a}</p>
                    </div>
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
