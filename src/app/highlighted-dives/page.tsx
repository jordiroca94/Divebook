import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AllHighlightedDestinations from "@/components/AllHighlightedDestinations";

const page = async () => {
  return (
    <div>
      <Header />
      <AllHighlightedDestinations />
      <Footer />
    </div>
  );
};

export default page;
