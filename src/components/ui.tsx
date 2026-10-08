import type { ReactNode } from "react";
import Reveal from "./Reveal";
import { Star, Star8 } from "./Icons";

export function SectionHeading({
  eyebrow,
  title,
  accent,
  sub,
  align = "center",
  light = false,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  sub?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} mb-12 max-w-2xl md:mb-16`} style={{ maxWidth: center ? "42rem" : undefined }}>
      <Reveal>
        <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
          <span className={`h-px w-10 ${light ? "bg-gold/60" : "bg-burgundy/25"}`} />
          <span className={`font-script text-2xl leading-none md:text-3xl ${light ? "text-petal" : "text-satin"}`}>{eyebrow}</span>
          <Star8 className={`w-3.5 ${light ? "text-gold/80" : "text-gold"}`} />
          <span className={`h-px w-10 ${light ? "bg-gold/60" : "bg-burgundy/25"}`} />
        </div>
      </Reveal>
      <Reveal delay={130}>
        <h2 className={`mt-4 font-display text-4xl leading-[1.08] md:text-5xl ${light ? "text-ivory" : "text-ink"}`}>
          {title}
          {accent ? (
            <>
              {" "}
              <em className={light ? "italic text-petal" : "italic text-burgundy"}>{accent}</em>
            </>
          ) : null}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={240}>
          <p className={`mt-5 text-base leading-relaxed md:text-lg ${light ? "text-ivory/75" : "text-ink/65"}`}>{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

type Variant = "primary" | "outline" | "wa" | "light" | "gold";

const V: Record<Variant, string> = {
  primary: "bg-burgundy text-ivory shadow-soft hover:bg-wine hover:-translate-y-0.5",
  outline: "border border-burgundy/35 text-burgundy hover:bg-burgundy hover:text-ivory hover:-translate-y-0.5",
  wa: "bg-[#1FA855] text-white shadow-soft hover:bg-[#178A45] hover:-translate-y-0.5",
  light: "bg-ivory text-burgundy shadow-soft hover:bg-white hover:-translate-y-0.5",
  gold: "border border-gold/60 text-gold hover:bg-gold hover:text-ivory hover:-translate-y-0.5",
};

export function CTA({
  href,
  onClick,
  children,
  variant = "primary",
  className = "",
  target,
}: {
  href: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  target?: "_blank";
}) {
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noreferrer noopener" : undefined}
      onClick={onClick}
      className={`sheen group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-satin/70 focus-visible:ring-offset-2 ${V[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

export function Stars({ n = 5, className = "w-4 h-4" }: { n?: number; className?: string }) {
  return (
    <span className="flex gap-0.5" aria-label={`${n} sur 5`}>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className={`${className} text-gold`} />
      ))}
    </span>
  );
}
