import CountComponent from "@/components/CountComponent";
import HomeDives from "@/components/dives/HomeDives";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HighlightedDestinations from "@/components/highlightedDestinations/HighlightedDestinations";
import HomeHero from "@/components/HomeHero";
import JoinUs from "@/components/JoinUs";

export default function Home() {
  return (
    <main>
      <Header />
      <HomeHero />
      <CountComponent />
      <HighlightedDestinations />
      <JoinUs />
      <HomeDives />
      <Footer />
    </main>
  );
}
