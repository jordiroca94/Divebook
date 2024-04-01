"use client";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

const BackButton = () => {
  const { back } = useRouter();

  return (
    <button onClick={() => back()} className="flex gap-2 items-center">
      <IoMdArrowBack className="h-7 w-7" />
      <p>Go back</p>
    </button>
  );
};

export default BackButton;
