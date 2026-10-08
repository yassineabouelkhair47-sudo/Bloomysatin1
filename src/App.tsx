import { useEffect, useState } from "react";
import { StoreProvider } from "./lib/store";
import PixelInjector from "./components/PixelInjector";
import { OrderProvider } from "./components/OrderModal";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Occasions from "./components/Occasions";
import Benefits from "./components/Benefits";
import CustomOrders from "./components/CustomOrders";
import Testimonials from "./components/Testimonials";
import BestSellers from "./components/BestSellers";
import FAQ from "./components/FAQ";
import InstagramGallery from "./components/InstagramGallery";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import AdminApp from "./admin/AdminApp";

function Landing() {
  return (
    <OrderProvider>
      <a
        href="#collections"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-full focus:bg-wine focus:px-5 focus:py-2.5 focus:text-sm focus:text-ivory"
      >
        Aller directement aux bouquets
      </a>
      <Navbar />
      <main>
        <Hero />
        <Products />
        <Occasions />
        <Benefits />
        <CustomOrders />
        <Testimonials />
        <BestSellers />
        <FAQ />
        <InstagramGallery />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </OrderProvider>
  );
}

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const isAdmin = hash.startsWith("#/admin");

  return (
    <StoreProvider>
      <PixelInjector />
      {isAdmin ? <AdminApp /> : <Landing />}
    </StoreProvider>
  );
}
