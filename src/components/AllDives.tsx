"use client";
import React, { useEffect } from "react";
import Container from "./ui/Container";

const AllDives = () => {
  useEffect(() => {
    getAllDives();
  }, []);

  const getAllDives = async () => {};

  return (
    <Container>
      <h2 className="col-span-4 lg:col-span-12 flex justify-center text-3xl lg:text-4xl text-center pb-4">
        Discover our best dives
      </h2>
    </Container>
  );
};

export default AllDives;
