"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import { IoMdArrowBack } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import Container from "./ui/Container";
import { useRouter } from "next/navigation";
import Grid from "./ui/Grid";
import Link from "next/link";

const Profile = () => {
  const { data: session } = useSession();
  const { back } = useRouter();

  return (
    <Container className="pt-header">
      <div className="flex justify-between py-6 lg:py-12">
        <button className="flex gap-2 items-center" onClick={() => back()}>
          <IoMdArrowBack className="h-7 w-7" />
          <p>Go back</p>
        </button>
        <button className="flex gap-2 items-center" onClick={() => signOut()}>
          <CiLogout className="h-7 w-7" />
          <p>Log out</p>
        </button>
      </div>
      <h1 className="col-span-4 lg:col-span-12 flex justify-center text-3xl lg:text-4xl text-center">
        Welcome to your profile
      </h1>
      <Grid className="mt-4 lg:mt-16">
        <div className="col-span-4 lg:col-start-3 text-lg ">
          <div className="pb-6">Your information:</div>
          <div>
            <p>Name:</p>
            <span className="font-bold">{session?.user?.name} </span>
          </div>
          <div className="pt-6">
            <p>Email:</p>
            <span className="font-bold">{session?.user?.email} </span>
          </div>
        </div>
        <div className="col-span-6 lg:col-start-8 text-lg">
          <p className="pb-6">Your dives:</p>
          <p className="pb-4">
            You have not added any dive to your profile? Let s start!
          </p>
          <Link
            href="/dive"
            className="flex gap-2 font-light py-2 border-gray border w-fit px-3 rounded-md bg-primary text-white"
          >
            <IoAddCircleOutline className="h-7 w-7 text-white" />
            <p>Add a dive </p>
          </Link>
        </div>
      </Grid>
    </Container>
  );
};

export default Profile;
