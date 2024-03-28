import Header from "@/components/Header";
import Footer from "@/components/Footer";

const page = async () => {
  return (
    <div>
      <Header />
      <div className="pt-header">This will be highlighted-dives page </div>
      <Footer />
    </div>
  );
};

export default page;
