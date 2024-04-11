/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Container from "../ui/Container";
import Grid from "../ui/Grid";
import { DiveType } from "@/types/common";
import Title from "../ui/Title";
import DiveCard from "./DiveCard";
import formatteDate from "@/utils/util";
import BackButton from "../ui/BackButton";
import Button from "../ui/Button";

const AllDives = () => {
  const [data, setData] = useState<DiveType[]>([]);
  const [loadItems, setLoadItems] = useState<number>(8);
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
    <Container className="pt-header lg:py-32">
      <div className="mt-10 my-6">
        <BackButton />
      </div>
      <Grid>
        <Title
          className="col-span-4 lg:col-span-12 flex justify-center pb-4"
          h="h1"
        >
          Dives of Our Users
        </Title>

        {data.slice(0, loadItems).map((item: DiveType) => {
          const date = formatteDate(item.updatedAt);
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
        {loadItems < data.length && (
          <div className="col-span-4 lg:col-span-12 flex justify-center text-center mt-4 bs:mt-10">
            <Button
              onClick={() => setLoadItems(loadItems + 4)}
              label="See more"
              secondary
            />
          </div>
        )}
      </Grid>
    </Container>
  );
};

export default AllDives;
