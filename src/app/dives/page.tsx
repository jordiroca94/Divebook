import React from "react";
// @ts-ignore
import AllDives from "@/components/AllDives";
import Header from "@/components/Header";

const page = async () => {
  return (
    <div>
      <Header />
      <AllDives />
    </div>
  );
};

export default page;
