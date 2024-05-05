"use client";
import { useEffect, useState } from "react";
import Container from "../ui/Container";
import { DiveType, UserType } from "@/types/common";
import BackButton from "../ui/BackButton";
import Grid from "../ui/Grid";
import Title from "../ui/Title";
import { formatteDate, getAge } from "@/utils/util";
import DiveCard from "../dives/DiveCard";
import DiverDetailSkeleton from "./DiverDetailSkeleton";

type Props = {
  id: string;
};

const DiverDetail = ({ id }: Props) => {
  const [diver, setDiver] = useState<UserType>();
  const [dives, setDives] = useState<any>();
  const getUser = async () => {
    try {
      const userData = await fetch("/api/getUserById", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });
      const data = await userData.json();
      const { user } = data;
      setDiver(user);
    } catch {
      throw Error("An error ocurred uploading a picture ");
    }
  };

  const getUserDives = async () => {
    try {
      const userDives = await fetch("/api/getUserDives", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: diver?.email,
        }),
      });
      const { diverDives } = await userDives.json();
      setDives(diverDives);
    } catch {
      throw Error("An error ocurred fetching data ");
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (diver) {
      getUserDives();
    }
  }, [diver]);
  return (
    <Container>
      <BackButton />
      {diver ? (
        <>
          <Grid>
            <Title
              className="col-span-4 lg:col-span-12 flex justify-center uppercase mb-2 lg:mb-12"
              h="h1"
            >
              {diver.name}
            </Title>
            <div className="col-span-4 lg:col-span-4 lg:col-start-2">
              <img
                className="aspect-square object-cover rounded-full border border-mediumGray"
                src={diver.avatarUrl}
                alt="alt"
              />
            </div>
            <div className="col-span-4 lg:col-span-5 lg:col-start-7 text-lg">
              {diver.certificate && (
                <div className="mb-4">
                  <div className="font-semibold mb-2">Diving expertice</div>
                  <p>{diver.certificate}</p>
                </div>
              )}
              {diver.country?.label && (
                <div className="mb-4">
                  <div className="font-semibold mb-2">Country</div>
                  <p>{diver.country.label}</p>
                </div>
              )}
              {diver.birthDate && (
                <div className="mb-4">
                  <div className="font-semibold mb-2">Age</div>
                  <p>{getAge(diver.birthDate)}</p>
                </div>
              )}
              {diver?.description && (
                <div className="mb-4 hidden bs:block">
                  <div className="font-semibold mb-2">Description</div>
                  <p>{diver.description}</p>
                </div>
              )}
            </div>
            {diver?.description && (
              <div className="mb-4 col-span-4 lg:col-start-2 lg:col-span-10 bs:hidden">
                <div className="font-semibold mb-2">Description</div>
                <p>{diver.description}</p>
              </div>
            )}
          </Grid>
          <Grid className="pt-10 bs:pt-20">
            <h5 className="col-span-full text-lg lg:text-2xl border-b border-b-mediumGray2 pb-4 ">
              My dives
            </h5>
            {dives?.length == 0 && (
              <div className="col-span-4 lg:col-span-6 lg:col-start-4 pt-6 lg:pt-16 lg:text-2xl lg:px-6 text-center">
                {diver.name} did not post any dive
              </div>
            )}
            {dives?.map((item: DiveType) => {
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
                  profileCard={true}
                />
              );
            })}
          </Grid>
        </>
      ) : (
        <DiverDetailSkeleton />
      )}
    </Container>
  );
};

export default DiverDetail;
