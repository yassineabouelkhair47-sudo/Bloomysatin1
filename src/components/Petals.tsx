import type { CSSProperties } from "react";
import { PetalShape } from "./Icons";

interface PetalCfg {
  left: string;
  dur: number;
  delay: number;
  size: number;
  sway: number;
  spin: number;
  op: number;
  color: string;
}

const PETALS: PetalCfg[] = [
  { left: "4%", dur: 17, delay: 0, size: 22, sway: 90, spin: 320, op: 0.5, color: "#E9BAC1" },
  { left: "14%", dur: 21, delay: 4, size: 16, sway: 60, spin: 260, op: 0.4, color: "#F4DCE0" },
  { left: "26%", dur: 19, delay: 8, size: 20, sway: 110, spin: 340, op: 0.45, color: "#CE8794" },
  { left: "38%", dur: 23, delay: 2, size: 14, sway: 70, spin: 240, op: 0.35, color: "#E9BAC1" },
  { left: "50%", dur: 18, delay: 10, size: 24, sway: 100, spin: 360, op: 0.45, color: "#F4DCE0" },
  { left: "62%", dur: 22, delay: 6, size: 17, sway: 80, spin: 300, op: 0.4, color: "#CE8794" },
  { left: "72%", dur: 16, delay: 1, size: 21, sway: 120, spin: 330, op: 0.5, color: "#E9BAC1" },
  { left: "82%", dur: 20, delay: 12, size: 15, sway: 60, spin: 250, op: 0.35, color: "#F4DCE0" },
  { left: "90%", dur: 24, delay: 5, size: 23, sway: 95, spin: 350, op: 0.45, color: "#CE8794" },
  { left: "96%", dur: 18, delay: 14, size: 16, sway: 70, spin: 280, op: 0.4, color: "#E9BAC1" },
];

export default function Petals({
  count = 10,
  className = "",
  inset = "inset-0",
}: {
  count?: number;
  className?: string;
  inset?: string;
}) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute overflow-hidden ${inset} ${className}`}>
      {PETALS.slice(0, count).map((p, i) => (
        <span
          key={i}
          className="petal"
          style={
            {
              width: p.size,
              height: p.size,
              left: p.left,
              "--dur": `${p.dur}s`,
              "--delay": `${p.delay}s`,
              "--sway": `${p.sway}px`,
              "--spin": `${p.spin}deg`,
              "--po": p.op,
            } as CSSProperties
          }
        >
          <span
            className={p.color === "#CE8794" ? "text-satin" : p.color === "#F4DCE0" ? "text-blush" : "text-petal"}
            style={{ width: p.size, height: p.size, display: "block" }}
          >
            <PetalShape className="h-full w-full" />
          </span>
        </span>
      ))}
    </div>
  );
}
