import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AllDivers from "@/components/divers/AllDivers";
import MapComponent from "@/components/map/MapComponent";
import JoinUs from "@/components/JoinUs";

const page = async () => {
  return (
    <div>
      <Header />
      <MapComponent />
      <JoinUs />
      <AllDivers />
      <Footer />
    </div>
  );
};

export default page;
