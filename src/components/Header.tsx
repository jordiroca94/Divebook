"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import profileSvg from "../svgs/profile";

const Header = () => {
  const { data: session } = useSession();

  const navLinks = [
    { label: "Explore", link: "/" },
    { label: "Share", link: "/" },
  ];

  return (
    <header className="px-6 min-h-header lg:px-10 py-4 fixed top-0 z-50 w-full p-6 flex justify-between items-center border border-mediumGray bg-white">
      <Link href={"/"} className="font-extrabold text-primary text-lg ">
        Diverbook
      </Link>
      <div className="flex justify-between gap-8 items-center">
        <div className="hidden lg:flex gap-4">
          {navLinks.map((link) => (
            <Link href={link.link} key={link.label}>
              {link.label}
            </Link>
          ))}
        </div>
        {!session ? (
          <div>
            <a
              className="text-base font-bold text-primary  w-fit rounded-md py-2 px-4 cursor-pointer hover:text-primary/80"
              href="/login"
            >
              Login
            </a>
            <a
              className="text-base font-bold text-white border w-fit rounded-md py-2 px-4 cursor-pointer ml-2 hover:bg-primary/80 bg-primary"
              href="/register"
            >
              Sign up
            </a>
          </div>
        ) : (
          <Link href="/profile" className="flex gap-1 items-center text-gray">
            <div className="h-10 w-10">{profileSvg}</div>
            <p>Profile</p>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
