import type { ComponentType } from "react";

type P = { className?: string };

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const FlowerLogo = ({ className = "w-8 h-8" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <g fill="currentColor">
      <ellipse cx="12" cy="6.8" rx="3" ry="4.6" />
      <ellipse cx="12" cy="17.2" rx="3" ry="4.6" />
      <ellipse cx="6.8" cy="12" rx="4.6" ry="3" />
      <ellipse cx="17.2" cy="12" rx="4.6" ry="3" />
    </g>
    <circle cx="12" cy="12" r="2.1" fill="#B98A4E" />
  </svg>
);

export const Star8 = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <g {...S}>
      <rect x="7.4" y="7.4" width="9.2" height="9.2" />
      <rect x="7.4" y="7.4" width="9.2" height="9.2" transform="rotate(45 12 12)" />
      <circle cx="12" cy="12" r="1.4" />
    </g>
  </svg>
);

export const WhatsApp = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M20.52 3.48A11.85 11.85 0 0 0 12.04 0C5.46 0 .1 5.35.1 11.93c0 2.1.55 4.15 1.6 5.97L0 24l6.25-1.64a11.9 11.9 0 0 0 5.79 1.47h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.19-3.46-8.42ZM12.05 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.68.96.98-3.59-.24-.37a9.86 9.86 0 0 1-1.51-5.28c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.91 9.88Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.13.3-.34.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.28.18-1.41-.07-.12-.27-.2-.57-.34Z" />
  </svg>
);

export const Instagram = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <g {...S}>
      <rect x="2.9" y="2.9" width="18.2" height="18.2" rx="5.2" />
      <circle cx="12" cy="12" r="4.3" />
    </g>
    <circle cx="17.3" cy="6.7" r="1.15" fill="currentColor" />
  </svg>
);

export const Star = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 2.6l2.8 5.85 6.35.86-4.63 4.45 1.17 6.3L12 16.95l-5.69 3.1 1.17-6.3L2.85 9.3l6.35-.85L12 2.6z" />
  </svg>
);

export const Sparkle = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 2.5l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z" />
  </svg>
);

export const Sparkles = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M10 3l1.7 5 5 1.7-5 1.7L10 16.5l-1.7-5.1-5-1.7 5-1.7L10 3z" />
    <path d="M18.4 13.6l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6z" />
  </svg>
);

export const Ring = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <g {...S}>
      <circle cx="12" cy="14.2" r="6" />
      <path d="M9.6 5.2L12 2.8l2.4 2.1-2.4 2.9-2.4-2.6z" />
    </g>
  </svg>
);

export const Cake = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <g {...S}>
      <path d="M4 20.5h16M5 20.5v-6h14v6M7.5 14.5v-3h9v3" />
      <path d="M12 11.5v-2M12 5.6c-.9-.9-.9-1.9 0-3 .9 1.1.9 2.1 0 3z" />
    </g>
  </svg>
);

export const Cap = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <g {...S}>
      <path d="M12 4.8L2.6 9 12 13.2 21.4 9 12 4.8z" />
      <path d="M6.6 11.4v4.2c0 1.1 2.4 2.8 5.4 2.8s5.4-1.7 5.4-2.8v-4.2" />
      <path d="M21.4 9.3v5.2" />
    </g>
  </svg>
);

export const Heart = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      {...S}
      d="M12 20.4S3.4 15 3.4 8.9c0-3 2.3-4.9 4.7-4.9 1.7 0 3 .9 3.9 2.2.9-1.3 2.2-2.2 3.9-2.2 2.4 0 4.7 1.9 4.7 4.9 0 6.1-8.6 11.5-8.6 11.5z"
    />
  </svg>
);

export const Gift = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <g {...S}>
      <rect x="4.5" y="10.8" width="15" height="9.4" rx="1.4" />
      <path d="M3.8 7.2h16.4v3.6H3.8z" />
      <path d="M12 7.2v13" />
      <path d="M12 7.2c0-2.1-1.2-3.6-2.7-3.6-1.3 0-2.1.9-2.1 2 0 1.6 1.7 2.7 4.8 1.6Z" />
      <path d="M12 7.2c0-2.1 1.2-3.6 2.7-3.6 1.3 0 2.1.9 2.1 2 0 1.6-1.7 2.7-4.8 1.6Z" />
    </g>
  </svg>
);

export const MapPin = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <g {...S}>
      <path d="M12 21.2s-6.6-5.4-6.6-10.2a6.6 6.6 0 1 1 13.2 0c0 4.8-6.6 10.2-6.6 10.2z" />
      <circle cx="12" cy="10.7" r="2.4" />
    </g>
  </svg>
);

export const Truck = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <g {...S}>
      <path d="M2.6 7h11v9.6h-11z" />
      <path d="M13.6 10.2h3.9l3 3v3.4h-6.9" />
      <circle cx="7" cy="17.4" r="1.9" />
      <circle cx="16.6" cy="17.4" r="1.9" />
    </g>
  </svg>
);

export const Palette = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <g {...S}>
      <path d="M12 3a9 9 0 1 0-.4 18c1.6 0 2.4-1 2-2.3-.5-1.4.4-2.8 1.9-2.8h1.6a3 3 0 0 0 3-3.2C19.4 7.3 16.1 3 12 3z" />
    </g>
    <circle cx="7.8" cy="10.6" r="1" fill="currentColor" />
    <circle cx="11" cy="7.6" r="1" fill="currentColor" />
    <circle cx="15.4" cy="8.4" r="1" fill="currentColor" />
  </svg>
);

export const Scissors = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <g {...S}>
      <circle cx="6" cy="6.8" r="2.3" />
      <circle cx="6" cy="17.2" r="2.3" />
      <path d="M8 8.2L20 15.6M8 15.8L20 8.4" />
    </g>
  </svg>
);

export const Bow = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <g {...S}>
      <path d="M12 12C10 8.2 6.6 6.6 4.6 8c-1.5 1.1-1 3.9 1 5.4 1.8 1.4 4.7.9 6.4-1.4z" />
      <path d="M12 12c2-3.8 5.4-5.4 7.4-4 1.5 1.1 1 3.9-1 5.4-1.8 1.4-4.7.9-6.4-1.4z" />
      <path d="M9.5 12.8L7 18.5M14.5 12.8L17 18.5" />
    </g>
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export const CalendarHeart = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <g {...S}>
      <rect x="3.8" y="5.8" width="16.4" height="14.4" rx="2" />
      <path d="M3.8 10h16.4M8.2 3.4V7M15.8 3.4V7" />
      <path d="M12 17.2s-3.1-2-3.1-4c0-1.1.9-1.8 1.7-1.8.6 0 1.1.3 1.4.8.3-.5.8-.8 1.4-.8.8 0 1.7.7 1.7 1.8 0 2-3.1 4-3.1 4z" />
    </g>
  </svg>
);

export const Check = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path {...S} d="M4.5 12.6l5 5L19.5 7" />
  </svg>
);

export const Plus = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path {...S} d="M12 5v14M5 12h14" />
  </svg>
);

export const ArrowRight = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path {...S} d="M4 12h15m-6-6l6 6-6 6" />
  </svg>
);

export const Quote = ({ className = "w-6 h-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M9.6 5.4C6.2 6.6 4 9.3 4 12.8V18.6h6.4v-6.4H7.2c0-2.4 1.2-4 3.6-5L9.6 5.4zm10 0C16.2 6.6 14 9.3 14 12.8V18.6h6.4v-6.4h-3.2c0-2.4 1.2-4 3.6-5l-1.2-1.8z" />
  </svg>
);

export const XIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path {...S} d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const Menu = ({ className = "w-6 h-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path {...S} d="M4 7h16M4 12h16M4 17h10" />
  </svg>
);

export const Lock = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <g {...S}>
      <rect x="5" y="10.4" width="14" height="9.6" rx="2" />
      <path d="M8.4 10.4V8a3.6 3.6 0 0 1 7.2 0v2.4" />
      <circle cx="12" cy="15.2" r="1.3" />
    </g>
  </svg>
);

export const Mail = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <g {...S}>
      <rect x="3.4" y="5.4" width="17.2" height="13.2" rx="2" />
      <path d="M4.4 7.4l7.6 5.6 7.6-5.6" />
    </g>
  </svg>
);

export const PetalShape = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 2C17 6.5 18 13.5 12 22 6 13.5 7 6.5 12 2Z" />
  </svg>
);

/* ---- Registre d'icônes utilisables dans le CMS ---- */
export const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  scissors: Scissors,
  flower: FlowerLogo,
  gift: Gift,
  palette: Palette,
  bow: Bow,
  truck: Truck,
  calendarHeart: CalendarHeart,
  ring: Ring,
  sparkle: Sparkle,
  sparkles: Sparkles,
  cake: Cake,
  cap: Cap,
  heart: Heart,
  mapPin: MapPin,
  mail: Mail,
  star8: Star8,
  check: Check,
  quote: Quote,
};

export const ICON_KEYS = Object.keys(ICONS);
