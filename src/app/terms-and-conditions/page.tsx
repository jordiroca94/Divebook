import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Terms from "@/components/Terms";

const page = async () => {
  return (
    <div>
      <Header />
      <Terms />
      <Footer />
    </div>
  );
};

export default page;
