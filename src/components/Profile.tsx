"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
        <div>
          <p>Name:</p>
          <span className="font-bold">{session?.user?.name} </span>
        </div>
        <div>
          <p>Email:</p>
          <span className="font-bold">{session?.user?.email} </span>
        </div>
        <button
          onClick={() => signOut()}
          className="bg-red text-white font-bold px-6 py-2 mt-3 "
        >
          Log out
        </button>
        <a
          className="border-black border flex justify-center w-full  rounded-md py-2 px-2 cursor-pointer "
          href="/login"
        >
          Go back home
        </a>
      </div>
    </div>
  );
};

export default Profile;
