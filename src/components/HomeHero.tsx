"use client";
import React from "react";
import Image from "next/image";
import heroImage from "../../public/assets/images/hero.avif";
import Link from "next/link";
import { useSession } from "next-auth/react";

const HomeHero = () => {
  const { data: session } = useSession();

  return (
    <div className="relative h-screen">
      <Image
        className="absolute z-0 object-cover h-full w-full"
        src={heroImage}
        alt="Hero"
      />
      <div className="absolute z-20 grid grid-cols-4 lg:grid-cols-12 text-white px-8 mt-[450px] lg:mt-80 2xl:mt-[400px]">
        <div className="col-span-4 lg:col-span-4 lg:col-start-8">
          <h1 className="text-2xl lg:text-5xl font-semibold 2xl:text-7xl pb-4">
            Divers of the World
          </h1>
          <p className="text-base 2xl:text-2xl">
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
      </div>
    </div>
  );
};

export default HomeHero;
