import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HighlightedDestinationDetail from "@/components/highlightedDestinations/HighlightedDestinationsDetail";

const page = ({ params }: any) => {
  return (
    <div>
      <Header />
      <HighlightedDestinationDetail id={params.id} />
      <Footer />
    </div>
  );
};

export default page;
