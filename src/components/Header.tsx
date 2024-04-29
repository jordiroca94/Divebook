"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import BurgerButton from "./BurgerButton";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { data: session } = useSession();
  const ref: any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { label: "Community", link: "/divers" },
    { label: "Recommendation", link: "/highlighted-dives" },
    { label: "Dives", link: "/dives" },
    { label: "Contact", link: "/contact" },
  ];

  return (
    <header ref={ref} className="fixed top-0 z-50 w-full">
      <div className="relative z-40 flex justify-between items-center px-6 min-h-header lg:px-10 py-4 p-6 border border-mediumGray bg-white">
        <Link href={"/"}>
          <span className="font-extrabold text-primary text-xl lg:text-2xl">
            Diverbook
          </span>
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
            openModal={openModal}
            setOpenModal={setOpenModal}
            className="lg:hidden ml-2"
          />
        </div>
      </div>
      <AnimatePresence>
        {openModal && (
          <motion.div
            initial={{ y: -250 }}
            animate={{ y: 0 }}
            exit={{ y: -250 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="fixed pt-header top-0 left-0  z-0 flex w-full flex-col p-6 bg-white border border-mediumGray"
          >
            <div className="flex flex-col items-center pt-4 gap-6">
              {navLinks.map((link, index) => (
                <a
                  onClick={() => {
                    setOpenModal(!openModal);
                  }}
                  href={link.link}
                  key={index}
                >
                  <h5 className="underlineAfterHover text-lg">{link.label}</h5>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
