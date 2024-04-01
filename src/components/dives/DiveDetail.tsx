"use client";
import React, { useEffect, useState } from "react";
import Container from "../ui/Container";
import { DiveType } from "@/types/common";
import Title from "../ui/Title";
import Grid from "../ui/Grid";
import formatteDate from "@/utils/util";
import { useRouter } from "next/navigation";
import BackButton from "../ui/BackButton";

type Props = {
  id: string;
};

const DiveDetail = ({ id }: Props) => {
  const [item, setItem] = useState<DiveType>();
  const { back } = useRouter();

  const getDives = async () => {
    try {
      const data = await fetch("/api/getDiveById", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const { dive } = await data.json();
      setItem(dive);
    } catch {
      throw Error("An error occurred while fetching data.");
    }
  };

  useEffect(() => {
    getDives();
  }, []);
  return (
    <div className="pt-header">
      <Container>
        <BackButton />
        {item && (
          <>
            <Grid>
              <Title
                className="col-span-4 lg:col-span-12 flex justify-center pb-10"
                h="h1"
              >
                {item.name}
              </Title>
              <div className="lg:col-span-4 lg:col-start-2 flex flex-col justify-evenly">
                <div className="flex items-center text-xl font-semibold gap-2 pb-6">
                  <p>{item.location}</p>
                  <p>-</p>
                  <p>{item.country.label}</p>
                </div>
                <div>
                  <p className="text-base uppercase py-3">Datasheet:</p>
                  <div className="flex justify-between border-b border-mediumGray items-center gap-2 py-3">
                    <div className="text-lg font-semibold">Instructor:</div>
                    <p>{item.instructor}</p>
                  </div>
                  <div className="flex justify-between border-b border-mediumGray items-center gap-2 py-3">
                    <div className="text-lg font-semibold">Deepth:</div>
                    <p>{item.deepth}</p>
                  </div>
                  <div className="flex justify-between border-b border-mediumGray items-center gap-2 py-3">
                    <div className="text-lg font-semibold">Suit:</div>
                    <p>{item.suit}</p>
                  </div>
                  <div className="flex justify-between border-b border-mediumGray items-center gap-2 py-3">
                    <div className="text-lg font-semibold">
                      Water temperature:
                    </div>
                    <p>{item.temperature}</p>
                  </div>
                </div>
              </div>
              <div className="col-span-5 lg:col-start-7">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="rounded-lg aspect-square object-cover"
                />
              </div>
            </Grid>
            <Grid>
              <p className="lg:col-span-7 lg:col-start-2 text-lg py-10">
                {item.description}
              </p>
              <div className="lg:col-span-3 lg:col-start-9 text-lg py-10">
                <div className="flex flex-col gap-2 items-end">
                  <p>{item.user.name}</p>
                  <p>{formatteDate(item.updatedAt)}</p>
                </div>
              </div>
            </Grid>
          </>
        )}
      </Container>
    </div>
  );
};

export default DiveDetail;
