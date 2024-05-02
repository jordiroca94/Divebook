/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Container from "../ui/Container";
import Grid from "../ui/Grid";
import { DiveType } from "@/types/common";
import Title from "../ui/Title";
import DiveCard from "./DiveCard";
import formatteDate from "@/utils/util";
import Button from "../ui/Button";

const HomeDives = () => {
  const [data, setData] = useState<DiveType[]>([]);
  const getAllDives = async () => {
    const data = await fetch("api/getDives", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { dives } = await data.json();
    setData(dives);
  };

  useEffect(() => {
    getAllDives();
  }, []);
  return (
    <Container className="pb-12 lg:pb-20">
      <Grid>
        <Title
          fontSize="text-3xl lg:text-4xl text-center"
          className="col-span-4 lg:col-span-12 flex justify-center pb-4"
          h="h2"
        >
          Dives of Our Users
        </Title>

        {data.slice(0, 4).map((item: DiveType) => {
          const date = formatteDate(item.date);
          return (
            <DiveCard
              key={item._id}
              _id={item._id}
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
        <div className="col-span-4 lg:col-span-12 flex justify-center text-center mt-4 bs:mt-10">
          <Button link="/dives" label="See more" secondary />
        </div>
      </Grid>
    </Container>
  );
};

export default HomeDives;
