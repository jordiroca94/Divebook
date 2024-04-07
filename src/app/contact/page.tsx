import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

const page = async () => {
  return (
    <div>
      <Header />
      <Contact />
      <Footer />
    </div>
  );
};

export default page;
