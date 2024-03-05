"use client";
import React from "react";
import { useSession } from "next-auth/react";

const HomeHero = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center pt-28 bg-lightGray">
      {session && <div className="text-2xl ">Hello {session.user?.name}</div>}
      <div className="flex items-center gap-8">
        <h1 className="text-4xl">Dives of the World </h1>
        <p>
          DiveBook is a place to discover and share the best places for diving.
        </p>
      </div>
    </div>
  );
};

export default HomeHero;
