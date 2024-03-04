"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className=" bg-black/30 text-white px-10 py-6 fixed top-0 z-50 w-full p-6 flex justify-between items-center ">
      <Link href={"/"}>MY-APP</Link>
      <div className="flex justify-between gap-4 items-center">
        <div>One</div>
        <div>Two</div>
        <div>Three</div>
        {session ? (
          <a
            className="border-white border w-fit rounded-md py-2 px-2 cursor-pointer"
            href="/profile"
          >
            Profile
          </a>
        ) : (
          <a
            className="border-white border w-fit rounded-md py-2 px-2 cursor-pointer ml-10"
            href="/login"
          >
            Login
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;
