"use client";
import React, { useEffect, useState } from "react";
import WorldMapAnimation from "./WorldMapAnimation";
import WorldMap from "./WorldMap";
import Container from "./ui/Container";
import Title from "./ui/Title";
import { CountryType } from "@/types/common";
import BackButton from "./ui/BackButton";

const MapComponent = () => {
  const [countries, setCountries] = useState<CountryType[]>();
  const [uniqueCountries, setUniqueCountries] = useState<string[]>();

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
    const countriesList = countries?.map((country) => country.label).sort();
    // @ts-ignore
    const uniqueArray = [...new Set(countriesList)];
    setUniqueCountries(uniqueArray);
  }, [countries]);

  useEffect(() => {
    getDiversByCountry();
  }, []);
  return (
    <Container className="lg:pt-32 pb-10 pt-24">
      <BackButton />
      <Title className="flex justify-center pb-4 lg:pb-10" h="h1">
        Where is our community from ?
      </Title>
      <p className="hidden lg:block font-light lg:text-2xl text-center pb-6">
        {uniqueCountries?.map((country) => country).join(", ")}
      </p>
      <WorldMapAnimation countries={countries}>
        <WorldMap />
      </WorldMapAnimation>
      <p className=" lg:hidden font-light text-base text-center pt-6">
        {uniqueCountries?.map((country) => country).join(", ")}
      </p>
    </Container>
  );
};

export default MapComponent;
