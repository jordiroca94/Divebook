"use client";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import { IoMdArrowBack } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import Container from "./ui/Container";
import { useRouter } from "next/navigation";
import Grid from "./ui/Grid";
import Link from "next/link";
import { DiveType } from "@/types/common";
import Image from "next/image";
import ProfilePlaceholder from "../../public/assets/images/profilePlaceholder.jpeg";
import Button from "./ui/Button";
import Title from "./ui/Title";
import { useEdgeStore } from "../../lib/edgestore";
import { SingleImageDropzone } from "./ui/SingleImageDropzone";

const Profile = () => {
  const { data: session } = useSession();
  const { back } = useRouter();
  const [dives, setDives] = useState<DiveType[]>([]);
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const getProfileDives = async () => {
    const response = await fetch("api/getDives", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { dives } = await response.json();
    setDives(dives);
  };
  const uploadImage = async () => {
    try {
      if (file) {
        const res = await edgestore.myPublicImages.upload({ file });
        const avatarUrl = res.url;
        const email = session?.user?.email;
        await fetch("api/updateUser", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            avatarUrl,
            email,
          }),
        });
      }
    } catch {
      throw Error("An error ocurred uploading a picture ");
    }
  };

  useEffect(() => {
    getProfileDives();
  }, []);
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
      <Title
        fontSize="text-3xl lg:text-4xl text-center"
        className="col-span-4 lg:col-span-12 flex justify-center"
        h="h1"
      >
        Welcome to your profile
      </Title>
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
          <div className="pt-6">
            <SingleImageDropzone
              width={200}
              height={100}
              value={file}
              onChange={(file) => {
                setFile(file);
              }}
            />
          </div>
          <button
            className="mt-4 px-2 py-2 rounded-md bg-secondary text-white"
            onClick={() => uploadImage()}
          >
            upload image
          </button>
        </div>
        <div className="col-span-4 lg:col-span-3 lg:col-start-8 bg-black aspect-square rounded-full">
          {/* <Image src={session?.user.avatarUrl} alt="alt" /> */}
        </div>
        <div className="col-span-4 flex justify-between items-center lg:col-start-3 lg:col-span-8 text-lg pt-10">
          <p>Your dives:</p>
          <Link
            href="/create-dive"
            className="flex gap-2 font-light py-2 border-gray border w-fit px-3 rounded-md bg-primary text-white"
          >
            <IoAddCircleOutline className="h-7 w-7 text-white" />
            <p>Add a dive </p>
          </Link>
        </div>
      </Grid>
      <Grid className="py-10 lg:py-20">
        {dives.map((item) => {
          const date = new Date(item.updatedAt);
          const formattedDate = `${date.getDate()}-${
            date.getMonth() + 1
          }-${date.getFullYear()}`;
          if (item.user.email == session?.user?.email) {
            return (
              <div
                key={item._id}
                className="col-span-4 xlg:col-span-3 shadow-lg rounded-md border-mediumGray border"
              >
                <div className="flex justify-center">
                  <Image
                    className="rounded-md"
                    src={ProfilePlaceholder}
                    alt="Placehodler Image"
                  />
                </div>
                <div className="p-6">
                  <h6 className="text-xl font-semibold">{item.name}</h6>
                  <p className="mt-2">{formattedDate}</p>
                  <div className="flex gap-2 items-center py-2 text-lg">
                    <p>{item.country.label}</p>
                    <small>-</small>
                    <p>{item.location}</p>
                  </div>
                  <p className="text-base font-thin pb-4">{item.description}</p>
                  <Button
                    openNewTab
                    className="mt-6 mb-2"
                    link="/item"
                    label="Read more"
                  />
                </div>
              </div>
            );
          }
        })}
      </Grid>
    </Container>
  );
};

export default Profile;
