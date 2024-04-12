import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AllDivers from "@/components/divers/AllDivers";
import MapComponent from "@/components/MapComponent";

const page = async () => {
  return (
    <div>
      <Header />
      <MapComponent />
      <AllDivers />
      <Footer />
    </div>
  );
};

export default page;
