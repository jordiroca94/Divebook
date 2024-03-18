"use client";
import React, { useEffect, useState } from "react";
import Container from "./ui/Container";

const AllDives = () => {
  const [data, setData] = useState([]);
  const getAllDives = async () => {
    const data = await fetch("api/getDives", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { dives } = await data.json();
    setData(dives);
  };

  useEffect(() => {
    getAllDives();
  }, []);
  console.log(data, "dives");
  return (
    <Container>
      <h2 className="col-span-4 lg:col-span-12 flex justify-center text-3xl lg:text-4xl text-center pb-4">
        Discover our best dives
      </h2>
    </Container>
  );
};

export default AllDives;
