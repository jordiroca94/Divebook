import AllDives from "@/components/AllDives";
import Header from "@/components/Header";
import HighlightedDestinations from "@/components/HighlightedDestinations";
import HomeHero from "@/components/HomeHero";

export default function Home() {
  return (
    <main>
      <Header />
      <HomeHero />
      <HighlightedDestinations />
      <AllDives />
    </main>
  );
}
