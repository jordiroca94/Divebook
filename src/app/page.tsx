import HomeDives from "@/components/dives/HomeDives";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HighlightedDestinations from "@/components/highlightedDestinations/HighlightedDestinations";
import HomeHero from "@/components/HomeHero";

export default function Home() {
  return (
    <main>
      <Header />
      <HomeHero />
      <HighlightedDestinations />
      <HomeDives />
      <Footer />
    </main>
  );
}
