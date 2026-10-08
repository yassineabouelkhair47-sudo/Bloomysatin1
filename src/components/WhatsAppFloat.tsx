import { useStore } from "../lib/store";
import { WhatsApp } from "./Icons";

export default function WhatsAppFloat() {
  const { waLink, track } = useStore();

  return (
    <a
      href={waLink("Bonjour Bloomy Satin 🌸 Je souhaite passer une commande.")}
      target="_blank"
      rel="noreferrer noopener"
      onClick={() => track("Contact")}
      aria-label="Commander sur WhatsApp"
      className="group fixed bottom-5 right-5 z-[70] flex items-center md:bottom-7 md:right-7"
    >
      <span className="pointer-events-none max-w-0 overflow-hidden whitespace-nowrap rounded-full bg-wine text-xs font-medium uppercase tracking-[0.14em] text-ivory opacity-0 transition-all duration-500 group-hover:mr-3 group-hover:max-w-[240px] group-hover:px-4 group-hover:py-3 group-hover:opacity-100">
        Commander sur WhatsApp
      </span>
      <span className="wa-pulse grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-soft transition-transform duration-300 group-hover:scale-110 md:h-16 md:w-16">
        <WhatsApp className="h-7 w-7 md:h-8 md:w-8" />
      </span>
    </a>
  );
}
