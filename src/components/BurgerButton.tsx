"use client";
import { FC } from "react";

type Props = {
  openModal: boolean;
  setOpenModal: any;
  className?: string;
};

const BurgerButton: FC<Props> = ({
  openModal,
  setOpenModal,
  className = "",
}) => {
  return (
    <div
      className={`${className} flex h-[22px] w-[22px] flex-col justify-center`}
      onClick={() => setOpenModal(!openModal)}
    >
      <div
        id="header-line-1"
        className={`h-px w-full flex-none bg-black transition-all ease-in-out ${
          openModal
            ? "translate-y-px rotate-[45deg] delay-300 duration-300"
            : ""
        }`}
      />
      <div
        id="header-line-2"
        className={`h-px w-0 flex-none bg-black transition-all duration-300 ease-in-out ${
          openModal ? "my-0 pr-0" : "my-[49%] pr-[100%] delay-300"
        }`}
      />
      <div
        id="header-line-3"
        className={`h-px w-full flex-none bg-black transition-all ease-in-out ${
          openModal
            ? "-translate-y-px rotate-[-45deg] delay-300 duration-300"
            : ""
        }`}
      />
    </div>
  );
};

export default BurgerButton;
