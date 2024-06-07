import DiverDetail from "@/components/divers/DiverDetail";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ParamsType } from "@/types/common";

const page = ({ params }: ParamsType) => {
  return (
    <div>
      <Header />
      <DiverDetail id={params.id} />
      <Footer />
    </div>
  );
};

export default page;
