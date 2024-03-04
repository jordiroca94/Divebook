"use client";
import React from "react";
import { useSession } from "next-auth/react";
import TemporaryImage from "../../public/assets/temporary.avif";
import Image from "next/image";

const HomeHero = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center pt-28 bg-lightGray">
      {session && <div className="text-2xl ">Hello {session.user?.name}</div>}
      <h1 className="text-4xl pb-10">WELCOME TO MY APP </h1>
      <Image src={TemporaryImage} alt="under construction" />
    </div>
  );
};

export default HomeHero;
