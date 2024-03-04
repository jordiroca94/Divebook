"use client";
import React from "react";
import { useSession } from "next-auth/react";

const HomeHero = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center py-10">
      {session && <div>Hello {session.user?.name}</div>}
      <h1 className="text-4xl pb-10">WELCOME TO MY APP </h1>
      {!session ? (
        <a
          className="border-black border w-fit rounded-md py-2 px-2 cursor-pointer"
          href="/login"
        >
          Not logged yet ?
        </a>
      ) : (
        <a
          className="border-black border w-fit rounded-md py-2 px-2 cursor-pointer"
          href="/profile"
        >
          Go to profile
        </a>
      )}
    </div>
  );
};

export default HomeHero;
