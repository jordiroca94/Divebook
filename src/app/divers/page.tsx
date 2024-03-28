import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AllDivers from "@/components/AllDivers";

const page = async () => {
  return (
    <div>
      <Header />
      <AllDivers />
      <Footer />
    </div>
  );
};

export default page;
