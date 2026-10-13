import FinalCta from "../components/home/FinalCta";
import Formula from "../components/home/Formula";
import Gallery from "../components/home/Gallery";
import Hero from "../components/home/Hero";
import Kitchen from "../components/home/Kitchen";
import Reviews from "../components/home/Reviews";
import Sala from "../components/home/Sala";
import Visit from "../components/home/Visit";
import Marquee from "../components/ui/Marquee";
import { marqueeDishes } from "../data/home";
import { useHashScroll } from "../hooks/useHashScroll";

export default function HomePage() {
  useHashScroll();
  return (
    <main>
      <Hero />
      <Marquee items={marqueeDishes} className="border-y border-rice/10 bg-coal py-6 text-rice/90" />
      <Formula />
      <Kitchen />
      <Gallery />
      <Sala />
      <Reviews />
      <Visit />
      <FinalCta />
    </main>
  );
}
