import DiveDetail from "@/components/dives/DiveDetail";
import DiverDetail from "@/components/divers/DiverDetail";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const page = ({ params }: any) => {
  return (
    <div>
      <Header />
      <DiverDetail id={params.id} />
      <Footer />
    </div>
  );
};

export default page;
