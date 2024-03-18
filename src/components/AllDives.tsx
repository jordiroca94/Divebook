"use client";
import React, { useEffect, useState } from "react";
import Container from "./ui/Container";
import Grid from "./ui/Grid";
import { DiveType } from "@/types/common";
import ProfilePlaceholder from "../../public/assets/images/profilePlaceholder.jpeg";
import Image from "next/image";
import Button from "./ui/Button";
import Link from "next/link";

const AllDives = () => {
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
    <Container>
      <Grid>
        <h2 className="col-span-4 lg:col-span-12 flex justify-center text-3xl lg:text-4xl text-center pb-4">
          Discover the best dives of our users
        </h2>
        {data.map((item: DiveType) => {
          const date = new Date(item.updatedAt);
          const formattedDate = `${date.getDate()}-${
            date.getMonth() + 1
          }-${date.getFullYear()}`;

          return (
            <div
              key={item._id}
              className="col-span-4 lg:col-span-3 shadow-lg rounded-md border-mediumGray border"
            >
              <Image
                className="rounded-md"
                src={ProfilePlaceholder}
                alt="Placehodler Image"
              />
              <div className="p-6">
                <h6 className="text-xl font-semibold">{item.name}</h6>
                <p className="mt-2">{formattedDate}</p>
                <div className="flex gap-2 items-center py-2 text-lg">
                  <p>{item.country.label}</p>
                  <small>-</small>
                  <p>{item.location}</p>
                </div>
                <p className="text-base font-thin">{item.description}</p>
                <div className="flex items-center gap-2 py-4 ">
                  <p>Posted by:</p>
                  <Link href="/" className="text-gray underline">
                    {item.user.name}
                  </Link>
                </div>
                <Button
                  openNewTab
                  className="mt-6 mb-2"
                  link="/item"
                  label="Read more"
                />
              </div>
            </div>
          );
        })}
      </Grid>
    </Container>
  );
};

export default AllDives;
