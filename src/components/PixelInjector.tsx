import { useEffect } from "react";
import { useStore } from "../lib/store";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: { track?: (...args: unknown[]) => void; init?: (id: string) => void; page?: (o?: object) => void };
    __bloomyMeta?: boolean;
    __bloomyTt?: boolean;
  }
}

/**
 * Injects Meta (Facebook / Instagram) and TikTok pixels when IDs are
 * configured in the admin dashboard (Pixels & Tracking).
 */
export default function PixelInjector() {
  const { data } = useStore();
  const { meta, instagram, tiktok } = data.settings.pixels;

  useEffect(() => {
    const metaIds = [meta, instagram].filter(Boolean) as string[];
    if (metaIds.length && !window.__bloomyMeta) {
      window.__bloomyMeta = true;
      const boot = document.createElement("script");
      boot.textContent =
        "(function(w,d,s,l){w[l]=w[l]||function(){(w[l].q=w[l].q||[]).push(arguments)};w[l].q=w[l].q||[]})(window,document,'script','fbq');";
      document.head.appendChild(boot);
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://connect.facebook.net/en_US/fbevents.js";
      s.onload = () => {
        metaIds.forEach((id) => {
          try {
            window.fbq?.("init", id);
            window.fbq?.("track", "PageView");
          } catch {
            /* noop */
          }
        });
      };
      document.head.appendChild(s);
    }

    if (tiktok && !window.__bloomyTt) {
      window.__bloomyTt = true;
      const boot = document.createElement("script");
      boot.textContent =
        "(function(w,d,t){w[t]=w[t]||function(){(w[t].q=w[t].q||[]).push(arguments)};w[t].q=w[t].q||[]})(window,document,'ttq');";
      document.head.appendChild(boot);
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://analytics.tiktok.com/i18n/pixel/events.js";
      s.onload = () => {
        try {
          window.ttq?.init?.(tiktok);
          window.ttq?.page?.({});
          window.ttq?.track?.("PageView");
        } catch {
          /* noop */
        }
      };
      document.head.appendChild(s);
    }
  }, [meta, instagram, tiktok]);

  return null;
}
