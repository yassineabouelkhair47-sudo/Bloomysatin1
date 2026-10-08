import { useStore } from "../lib/store";
import Reveal from "./Reveal";
import { CTA } from "./ui";
import { Instagram, Star8 } from "./Icons";

const TILES = [
  { src: "/images/hero.jpg", alt: "Bouquet en satin Bloomy Satin" },
  { src: "/images/product-3.jpg", alt: "Trio de roses en satin" },
  { src: "/images/product-7.jpg", alt: "Bouquet signature de 7 roses en satin" },
  { src: "/images/product-12.jpg", alt: "Bouquet de 12 roses en satin" },
  { src: "/images/product-20.jpg", alt: "Grand bouquet de 20 roses en satin" },
  { src: "/images/atelier.jpg", alt: "Atelier Bloomy Satin — création à la main" },
];

export default function InstagramGallery() {
  const { data } = useStore();
  const profile = `https://www.instagram.com/${data.settings.instagram.replace(/^@/, "")}`;

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center md:mb-16">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-soft">
              <Instagram className="h-7 w-7" />
            </div>
            <p className="mt-5 font-display text-3xl text-ink md:text-4xl">
              @{data.settings.instagram.replace(/^@/, "")}
            </p>
            <p className="mt-3 max-w-md leading-relaxed text-ink/60">{data.content.instagramSec.sub}</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 md:gap-4">
          {TILES.map((t, i) => (
            <Reveal key={t.src} delay={i * 90} className="h-full">
              <a
                href={profile}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Voir sur Instagram : ${t.alt}`}
                className="group relative block h-full overflow-hidden rounded-2xl"
              >
                <img
                  src={t.src}
                  alt={t.alt}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 grid place-items-center bg-wine/50 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100">
                  <span className="grid h-11 w-11 scale-75 place-items-center rounded-full bg-ivory/90 text-burgundy transition-transform duration-500 group-hover:scale-100">
                    <Instagram className="h-5 w-5" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-12 flex flex-col items-center gap-3">
            <Star8 className="h-4 w-4 text-gold" />
            <CTA href={profile} target="_blank" variant="outline">
              <Instagram className="h-4 w-4" />
              Suivez-nous sur Instagram
            </CTA>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
