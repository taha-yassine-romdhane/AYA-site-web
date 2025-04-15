import HeroSection from "./components/HeroSection";
import CategorySection from "./components/CategorySection";
import EventSection from "./components/EventSection";
import TestimonialSection from "./components/TestimonialSection";
import CtaSection from "./components/CtaSection";
import Welcome from "./components/welcome";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* <HeroSection /> */}
      {/* <CategorySection /> */}
      {/* <EventSection /> */}
      <Welcome />
      {/* <TestimonialSection /> */}
      {/* <CtaSection /> */}
    </main>
  );
}
