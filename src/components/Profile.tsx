"use client";
import React from "react";
import { signOut } from "next-auth/react";

const Profile = () => {
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
        <div>
          <p>Name:</p>
          <span className="font-bold">Jordi </span>
        </div>
        <div>
          <p>Email:</p>
          <span className="font-bold">jordirocasoler94@gmail.com </span>
        </div>
        <button
          onClick={() => signOut()}
          className="bg-red text-white font-bold px-6 py-2 mt-3 "
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Profile;
