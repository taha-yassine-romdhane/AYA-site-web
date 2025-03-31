import Image from "next/image";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CategorySection from "./components/CategorySection";
import EventSection from "./components/EventSection";
import TestimonialSection from "./components/TestimonialSection";
import CtaSection from "./components/CtaSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <CategorySection />
      <EventSection />
      <TestimonialSection />
      <CtaSection />
    </main>
  );
}
