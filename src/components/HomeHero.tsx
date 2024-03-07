"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Heroimage from "../../public/assets/hero1.avif";

const HomeHero = () => {
  const { data: session } = useSession();

  return (
    <div className="relative">
      <Image
        className="absolute z-0 object-cover h-screen"
        src={Heroimage}
        alt="Hero"
      />
      <div className="absolute z-20 grid grid-cols-4 lg:grid-cols-12 text-white px-8 mt-[500px] lg:mt-80 2xl:mt-[400px] w-full h-full">
        <div className="col-span-4 lg:col-span-4 lg:col-start-8">
          <h1 className="text-2xl lg:text-5xl font-semibold 2xl:text-7xl pb-4">
            Divers of the World
          </h1>
          <p className="text-base 2xl:text-2xl">
            DiveBook is a place to discover and share the best places for
            diving.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
