"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const [scroll, setScroll] = useState<number>(0);
  const { data: session } = useSession();

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setScroll(scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        scroll && "bg-black/25 text-white"
      } px-10 py-6 fixed top-0 z-50 w-full p-6 flex justify-between items-center border border-mediumGray  `}
    >
      <Link href={"/"}>DiveBook</Link>
      <div className="flex justify-between gap-4 items-center">
        <div>One</div>
        <div>Two</div>
        <div>Three</div>
        <a
          className={`${
            scroll && "border-white"
          } border-black border w-fit rounded-md py-2 px-4 cursor-pointer ml-10`}
          href={`${session ? "/profile" : "/login"}`}
        >
          {session ? "Profile" : "Login"}
        </a>
        {!session && (
          <a
            className={`${
              scroll && "border-white"
            } text-white border w-fit rounded-md py-2 px-4 cursor-pointer ml-2 bg-primary`}
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
