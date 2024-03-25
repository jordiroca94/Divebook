import React from "react";
// @ts-ignore
import AllDives from "@/components/AllDives";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const page = async () => {
  return (
    <div>
      <Header />
      <AllDives />
      <Footer />
    </div>
  );
};

export default page;
