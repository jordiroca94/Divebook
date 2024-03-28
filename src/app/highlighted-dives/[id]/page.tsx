import Footer from "@/components/Footer";
import Header from "@/components/Header";

const page = ({ params }: any) => {
  return (
    <div>
      <Header />
      <div className="pt-header">
        This is the page of highlighted dive {params.id}
      </div>
      <Footer />
    </div>
  );
};

export default page;
