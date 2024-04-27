"use client";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

const BackButton = () => {
  const { back } = useRouter();

  return (
    <button
      onClick={() => back()}
      className="flex gap-2 items-center mt-12 mb-4 lg:mt-8 lg:mb-8"
    >
      <IoMdArrowBack className="h-7 w-7" />
      <p>Go back</p>
    </button>
  );
};

export default BackButton;
