import DiveDetail from "@/components/dives/DiveDetail";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ParamsType } from "@/types/common";

const page = ({ params }: ParamsType) => {
  return (
    <div>
      <Header />
      <DiveDetail id={params.id} />
      <Footer />
    </div>
  );
};

export default page;
