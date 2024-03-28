import DiveDetail from "@/components/DiveDetail";
import DiverDetail from "@/components/DiverDetail";
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
