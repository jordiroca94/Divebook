/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import { IoMdArrowBack } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import Container from "./ui/Container";
import Grid from "./ui/Grid";
import Link from "next/link";
import { DiveType } from "@/types/common";
import Button from "./ui/Button";
import Title from "./ui/Title";
import { useEdgeStore } from "../../lib/edgestore";
import { SingleImageDropzone } from "./ui/SingleImageDropzone";
import DiveCard from "./DiveCard";
import formatteDate from "@/utils/util";

const Profile = () => {
  const { data: session } = useSession();
  const [dives, setDives] = useState<DiveType[]>([]);
  const [file, setFile] = useState<File>();
  const [userInfo, setUserInfo] = useState<any>("");
  const [submitError, setSubmitError] = useState<boolean | null>(null);
  const { edgestore } = useEdgeStore();
  const getProfileDives = async () => {
    const response = await fetch("api/getDives", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { dives } = await response.json();
    const profileDives: DiveType[] = [];
    dives.map((el: DiveType) => {
      if (el.user.email === session?.user?.email) {
        return profileDives.push(el);
      }
    });
    setDives(profileDives);
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
        window.location.reload();
      } else {
        setSubmitError(true);
      }
    } catch {
      throw Error("An error ocurred uploading a picture ");
    }
  };

  const getUserImage = async () => {
    try {
      const email = session?.user?.email;
      const image = await fetch("api/getUserImage", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const data = await image.json();
      setUserInfo(data.user);
    } catch {
      throw Error("An error ocurred uploading a picture ");
    }
  };

  useEffect(() => {
    getProfileDives();
  }, [session]);

  useEffect(() => {
    getUserImage();
  }, [session]);
  return (
    <Container className="pt-header">
      <div className="flex justify-between py-6 lg:py-12">
        <Link href="/" className="flex gap-2 items-center">
          <IoMdArrowBack className="h-7 w-7" />
          <p>Go back</p>
        </Link>
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
        Profile
      </Title>
      <Grid className="mt-4 lg:mt-16">
        <div className="lg:hidden col-span-4 py-6 px-3">
          <img
            className="aspect-square rounded-full border border-mediumGray"
            src={userInfo?.avatarUrl && userInfo?.avatarUrl}
            alt="alt"
          />
        </div>
        <div className="col-span-4 lg:col-start-3 text-lg lg:mb-6">
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
              width={100}
              height={100}
              value={file}
              onChange={(file) => {
                setFile(file);
              }}
            />
            <Button
              className="font-normal mt-6"
              onClick={() => uploadImage()}
              label="Change Image"
            />
          </div>
          {submitError && (
            <p className="text-red text-base mt-4">You must upload an image</p>
          )}
        </div>
        <div className="hidden lg:block lg:col-span-3 lg:col-start-8">
          <img
            className="aspect-square object-cover rounded-full border border-mediumGray"
            src={userInfo?.avatarUrl && userInfo?.avatarUrl}
            alt="alt"
          />
        </div>
        <div className="col-span-4 flex justify-between items-center lg:col-start-3 lg:col-span-8 text-lg pt-10 border-t border-mediumGray">
          <h6 className="text-xl">
            Your dives: {dives.length > 0 && dives.length}
          </h6>
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
          const date = formatteDate(item.updatedAt);
          return (
            <DiveCard
              _id={item._id}
              key={item._id}
              name={item.name}
              country={item.country}
              location={item.location}
              description={item.description}
              date={date}
              imageUrl={item.imageUrl}
              user={item.user}
            />
          );
        })}
        {!dives.length && (
          <div className="grid place-items-center col-span-full">
            <Link
              href="/create-dive"
              className="border border-mediumGray shadow-lg p-10 text-center hover:underline"
            >
              You do not have any dive yet. Add your first dive!
            </Link>
          </div>
        )}
      </Grid>
    </Container>
  );
};

export default Profile;
