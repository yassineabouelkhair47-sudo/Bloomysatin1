import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  variant?: "up" | "left" | "right" | "scale";
  className?: string;
  style?: CSSProperties;
}

export default function Reveal({ children, delay = 0, variant = "up", className = "", style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      className={`reveal reveal-${variant} ${inView ? "reveal-in" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
