/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import Container from "./ui/Container";
import Grid from "./ui/Grid";
import Link from "next/link";
import { CountryType, DiveType, UserType } from "@/types/common";
import Title from "./ui/Title";
import { useEdgeStore } from "../../lib/edgestore";
import { SingleImageDropzone } from "./ui/SingleImageDropzone";
import DiveCard from "./dives/DiveCard";
import formatteDate from "@/utils/util";
import BackButton from "./ui/BackButton";
import { IoSettingsOutline } from "react-icons/io5";
import Modal from "./ui/Modal";
import { RxCross2 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import Select from "react-select";
import countryList from "react-select-country-list";

type EditFormTypes = {
  avatarUrl: string;
  description: string;
  country: CountryType;
  birthDate: Date | null;
  certificates: string;
  instructor: string;
};

const Profile = () => {
  const { data: session } = useSession();
  const [dives, setDives] = useState<DiveType[]>([]);
  const [file, setFile] = useState<File>();
  const [userInfo, setUserInfo] = useState<any>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<boolean | null>(null);
  const { edgestore } = useEdgeStore();
  const form: any = useRef();
  const options: any = useMemo(() => countryList().getData(), []);
  const [countryValue, setCountryValue] = useState<any>("");

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<EditFormTypes>({
    defaultValues: {
      avatarUrl: userInfo?.avatarUrl,
      description: "",
      country: { value: "", label: "" },
      birthDate: null,
      certificates: "",
      instructor: "",
    },
  });

  const changeCountryValue = (value: any) => {
    setCountryValue(value);
  };

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
  const uploadImage = async (values: EditFormTypes) => {
    console.log(values, "here-->");
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
        <BackButton />
        <div className="flex gap-8 ">
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
        </div>
        <div className="flex justify-center py-6 lg:hidden col-span-4">
          <button
            className="flex gap-2 items-center"
            onClick={() => setOpenModal(true)}
          >
            <IoSettingsOutline className="h-7 w-7" />
            <p>Edit profile</p>
          </button>
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
      {openModal && (
        <Modal>
          <div className="flex justify-between items-center">
            <h5 className="text-2xl">Edit Profile</h5>
            <button
              className="rounded-full border-mediumGray border p-2 "
              onClick={() => setOpenModal(false)}
            >
              <RxCross2 className="size-5" />
            </button>
          </div>
          <form ref={form} onSubmit={handleSubmit(uploadImage)}>
            <div className="flex flex-col lg:flex-row lg:gap-6">
              <div className="flex flex-col gap-4 w-full lg:w-1/2">
                <label htmlFor="certificate" className="font-medium pt-4">
                  What is you highest certificate?
                </label>
                <select
                  name="certificate"
                  className="border border-mediumGray py-2 px-3 rounded-md "
                >
                  <option selected value="openWater">
                    Open water diver
                  </option>
                  <option value="advancedDiver">
                    Advanced Open Water Diver
                  </option>
                  <option value="rescueDiver">Rescue Diver</option>
                  <option value="scubaMaster">Master Scuba Diver</option>
                  <option value="diveMaster">Master Scuba Diver</option>
                  <option value="scubaMaster">Divemaster</option>
                  <option value="assistantInstructor">
                    Assistant Instructor
                  </option>
                  <option value="scubaInstructor">
                    Open Water Scuba Instructor
                  </option>
                  <option value="scubaTrainer">
                    Master Scuba Diver Trainer
                  </option>
                  <option value="director">Course Director</option>
                </select>
              </div>
              <div className="flex flex-col gap-4 w-full lg:w-1/2">
                <label htmlFor="instructor" className="font-medium pt-4">
                  Are you an instructor?
                </label>
                <select
                  name="instructor"
                  className="border border-mediumGray py-2 px-3 rounded-md "
                >
                  <option selected value="no">
                    No
                  </option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-6">
              <div className="flex flex-col gap-4 w-full lg:w-1/2">
                <label htmlFor="country" className="font-medium pt-4">
                  Where are you from?
                </label>
                <Select
                  options={options}
                  value={countryValue}
                  onChange={changeCountryValue}
                />
              </div>
              <div className="flex flex-col gap-4 w-full lg:w-1/2">
                <label htmlFor="instructor" className="font-medium pt-4">
                  When where you born?
                </label>
                <input
                  id="instructor"
                  className="border border-mediumGray py-2 px-3 rounded-md"
                  type="date"
                />
              </div>
            </div>
            <div className="pt-6">
              <label htmlFor="image" className="font-medium">
                Add an image
              </label>
              <SingleImageDropzone
                className="my-4"
                width={100}
                height={80}
                value={file}
                onChange={(file) => {
                  setFile(file);
                }}
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="description" className="font-medium pb-4">
                Description
              </label>
              <textarea
                id="description"
                className="border border-mediumGray py-2 px-3 rounded-md"
                placeholder="Description"
                rows={3}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-primary text-white cursor-pointer px-6 py-2 rounded-md mt-4 w-full lg:w-auto"
                value="Send"
              >
                Edit profile
              </button>
            </div>
          </form>
        </Modal>
      )}
    </Container>
  );
};

export default Profile;
