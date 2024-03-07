"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="px-6 lg:px-10 py-4 fixed top-0 z-50 w-full p-6 flex justify-between items-center border border-mediumGray bg-white">
      <Link className="font-extrabold text-secondary text-lg " href={"/"}>
        DiveBook
      </Link>
      <div className="flex justify-between gap-4 items-center">
        <div className="hidden lg:flex gap-4">
          <div>One</div>
          <div>Two</div>
          <div>Three</div>
        </div>
        <a
          className="text-sm font-bold text-secondary  w-fit rounded-md py-2 px-4 cursor-pointer ml-10 hover:text-secondary/80"
          href={`${session ? "/profile" : "/login"}`}
        >
          {session ? "Profile" : "Login"}
        </a>
        {!session && (
          <a
            className="text-sm font-bold text-white border w-fit rounded-md py-2 px-4 cursor-pointer ml-2 hover:bg-secondary/80 bg-secondary"
            href="/register"
          >
            Sign up
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;
