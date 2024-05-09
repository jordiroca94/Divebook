"use client";
import React from "react";
import Image from "next/image";
import heroImage from "../../public/assets/images/hero.avif";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Grid from "./ui/Grid";
import Title from "./ui/Title";
import CountComponent from "./CountComponent";

const HomeHero = () => {
  const { data: session } = useSession();

  return (
    <div className="relative h-screen">
      <Image
        className="absolute z-0 object-cover h-full w-full"
        src={heroImage}
        alt="Hero"
      />
      <Grid className="absolute z-20 text-white px-8 mt-[450px] lg:mt-80 bs:mt-[400px]">
        <div className="col-span-4 lg:col-span-4 lg:col-start-8">
          <Title
            fontSize="text-2xl lg:text-5xl bs:text-7xl font-semibold"
            className="pb-4"
            h="h1"
          >
            Divers of the World
          </Title>
          <p className="text-base bs:text-2xl">
            Diverbook is a place to discover and share the best places for
            diving.
          </p>
          {!session && (
            <p className="pt-4 text-base bs:text-2xl">
              <Link className="hover:underline" href={"/register"}>
                Register
              </Link>{" "}
              and keep track of your dives & more
            </p>
          )}
          <CountComponent />
        </div>
      </Grid>
    </div>
  );
};

export default HomeHero;
