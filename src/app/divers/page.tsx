import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AllDivers from "@/components/divers/AllDivers";
import WorldMap from "@/components/WorldMap";
import WorldMapAnimation from "@/components/WorldMapAnimation";

const page = async () => {
  return (
    <div>
      <Header />
      <AllDivers />
      <WorldMapAnimation>
        <WorldMap />
      </WorldMapAnimation>
      <Footer />
    </div>
  );
};

export default page;
