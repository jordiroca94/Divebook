import DiveDetail from "@/components/DiveDetail";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const page = ({ params }: any) => {
  return (
    <div>
      <Header />
      <DiveDetail id={params.id} />
      <Footer />
    </div>
  );
};

export default page;
