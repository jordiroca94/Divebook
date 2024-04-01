import AllDives from "@/components/dives/AllDives";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const page = async () => {
  return (
    <div>
      <Header />
      <AllDives />
      <Footer />
    </div>
  );
};

export default page;
