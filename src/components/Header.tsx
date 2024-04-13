"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import Icon from "../../public/assets/images/icon.png";
import Image from "next/image";
import BurgerButton from "./BurgerButton";
import Button from "./ui/Button";
const Header = () => {
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const { data: session } = useSession();

  const navLinks = [
    { label: "Community", link: "/divers" },
    { label: "Recommendation", link: "/highlighted-dives" },
    { label: "Dives", link: "/dives" },

    { label: "Contact", link: "/contact" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="flex justify-between items-center px-6 min-h-header lg:px-10 py-4 p-6 border border-mediumGray bg-white">
        <Link
          href={"/"}
          className="font-extrabold text-primary text-base lg:text-2xl flex items-center gap-4  "
        >
          <span>Diverbook</span>
          <Image
            className="size-10 hidden lg:block"
            src={Icon}
            alt="Home Icon"
          />
        </Link>
        <div className="flex justify-between gap-3 lg:gap-8 items-center">
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
                className="text-sm lg:text-base font-semibold text-primary  w-fit rounded-md py-2 px-4 cursor-pointer hover:text-primary/80"
                href="/login"
              >
                Login
              </a>
              <a
                className="text-sm lg:text-base  text-white border w-fit rounded-md py-2 px-4 cursor-pointer lg:ml-2 hover:bg-primary/80 bg-primary"
                href="/register"
              >
                Sign up
              </a>
            </div>
          ) : (
            <Link
              href="/profile"
              className="flex gap-2 items-center text-primary"
            >
              <CgProfile className="h-7 w-7" />
              <p>Profile</p>
            </Link>
          )}
          <BurgerButton
            open={open}
            setOpen={setOpen}
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden ml-2"
          />
        </div>
      </div>
      {mobileMenu && (
        <div className="z-40 flex w-full flex-col overflow-hidden p-6 bg-white border border-mediumGray">
          <div className="flex flex-col items-center pt-4 gap-6">
            {navLinks.map((link, index) => (
              <a
                onClick={() => {
                  setMobileMenu(false), setOpen(!open);
                }}
                href={link.link}
                key={index}
              >
                <h5 className="underlineAfterHover text-lg">{link.label}</h5>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
