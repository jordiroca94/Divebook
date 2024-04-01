import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HighlightedDestinationDetail from "@/components/highlightedDestinations/HighlightedDestinationsDetail";
import { ParamsType } from "@/types/common";

const page = ({ params }: ParamsType) => {
  return (
    <div>
      <Header />
      <HighlightedDestinationDetail id={params.id} />
      <Footer />
    </div>
  );
};

export default page;
