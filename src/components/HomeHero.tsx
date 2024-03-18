"use client";
import React from "react";
import Image from "next/image";
import heroImage from "../../public/assets/images/hero.avif";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Grid from "./ui/Grid";

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
          <h1 className="text-bs lg:text-5xl font-semibold bs:text-7xl pb-4">
            Divers of the World
          </h1>
          <p className="text-base bs:text-2xl">
            Diverbook is a place to discover and share the best places for
            diving.
          </p>
          {!session && (
            <p className="pt-4">
              <Link className="hover:underline" href={"/register"}>
                Register
              </Link>{" "}
              and keep track of your dives & more
            </p>
          )}
        </div>
      </Grid>
    </div>
  );
};

export default HomeHero;
