"use client";
import React, { useEffect, useState } from "react";
import WorldMapAnimation from "./WorldMapAnimation";
import WorldMap from "./WorldMap";
import Container from "./ui/Container";
import Title from "./ui/Title";
import { CountryType } from "@/types/common";

const MapComponent = () => {
  const [countries, setCountries] = useState<CountryType[]>();

  const getDiversByCountry = async () => {
    const data = await fetch("/api/getUsersByCountry", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { countries } = await data.json();
    setCountries(countries);
  };

  useEffect(() => {
    getDiversByCountry();
  }, []);
  return (
    <Container className="lg:py-20 py-10">
      <Title className="flex justify-center pb-10" h="h1">
        Where is our community from ?
      </Title>
      <p className="font-light text-2xl  text-center pb-6 ">
        {countries?.map((country) => country.label).join(", ")}
      </p>
      <WorldMapAnimation countries={countries}>
        <WorldMap />
      </WorldMapAnimation>
    </Container>
  );
};

export default MapComponent;
