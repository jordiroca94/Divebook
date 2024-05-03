/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import Container from "../ui/Container";
import Grid from "../ui/Grid";
import Link from "next/link";
import { DiveType, UserType } from "@/types/common";
import Title from "../ui/Title";
import DiveCard from "../dives/DiveCard";
import BackButton from "../ui/BackButton";
import { IoSettingsOutline } from "react-icons/io5";
import EditProfileForm from "./EditProfileForm";
import ProfileInformation from "./ProfileInformation";
import { formatteDate } from "@/utils/util";

const Profile = () => {
  const { data: session } = useSession();
  const [dives, setDives] = useState<DiveType[]>([]);
  const [userInfo, setUserInfo] = useState<UserType>();
  const [openModal, setOpenModal] = useState(false);

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

  const getUserData = async () => {
    try {
      const email = session?.user?.email;
      const userData = await fetch("api/getUserData", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const data = await userData.json();
      setUserInfo(data.user);
    } catch {
      throw Error("An error ocurred uploading a picture ");
    }
  };

  useEffect(() => {
    getProfileDives();
  }, [session]);

  useEffect(() => {
    getUserData();
  }, [session]);

  useEffect(() => {
    openModal
      ? document.body.classList.add("overflow-y-hidden")
      : document.body.classList.remove("overflow-y-hidden");
  }, [openModal]);

  return (
    <Container>
      <div className="flex justify-between ">
        <BackButton />
        <div className="mt-7 lg:mt-0 flex items-center gap-8 ">
          <div className="hidden lg:block">
            <button
              className="flex gap-2 items-center"
              onClick={() => setOpenModal(true)}
            >
              <IoSettingsOutline className="h-7 w-7" />
              <p>Edit profile</p>
            </button>
          </div>
          <button className="flex gap-2 items-center" onClick={() => signOut()}>
            <CiLogout className="h-7 w-7" />
            <p>Log out</p>
          </button>
        </div>
      </div>
      <Title className="col-span-4 lg:col-span-12 flex justify-center" h="h1">
        Profile
      </Title>
      <Grid className="mt-4 lg:mt-16">
        <div className="lg:hidden col-span-4 py-6 px-3">
          {userInfo?.avatarUrl ? (
            <img
              className="aspect-square object-cover rounded-full border border-mediumGray"
              src={userInfo.avatarUrl}
              alt="alt"
            />
          ) : (
            <div className="aspect-square rounded-full bg-mediumGray animate-pulse"></div>
          )}
        </div>
        <ProfileInformation userInfo={userInfo} />
        <div className="flex justify-center py-6 lg:hidden col-span-4">
          <button
            className="flex gap-2 items-center"
            onClick={() => setOpenModal(true)}
          >
            <IoSettingsOutline className="h-7 w-7" />
            <p>Edit profile</p>
          </button>
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
          const date = formatteDate(item.date);
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
      {openModal && (
        <EditProfileForm userInfo={userInfo} setOpenModal={setOpenModal} />
      )}
    </Container>
  );
};

export default Profile;
