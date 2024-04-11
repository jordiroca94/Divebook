"use client";
import React, { useEffect, useState } from "react";
import WorldMapAnimation from "./WorldMapAnimation";
import WorldMap from "./WorldMap";
import Container from "./ui/Container";
import Title from "./ui/Title";
import { CountryType } from "@/types/common";

const MapComponent = () => {
  const [data, setData] = useState<CountryType[]>();

  const getDiversByCountry = async () => {
    const data = await fetch("/api/getUsersByCountry", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { countries } = await data.json();
    setData(countries);
  };
  console.log(data, "countries");

  useEffect(() => {
    getDiversByCountry();
  }, []);
  return (
    <Container className="lg:py-20 py-10">
      <Title className="flex justify-center pb-10" h="h1">
        Where is our community from ?
      </Title>
      <WorldMapAnimation>
        <WorldMap />
      </WorldMapAnimation>
    </Container>
  );
};

export default MapComponent;
