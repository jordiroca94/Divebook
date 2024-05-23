/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Container from "../ui/Container";
import Grid from "../ui/Grid";
import { DiveType } from "@/types/common";
import Title from "../ui/Title";
import DiveCard from "./DiveCard";
import BackButton from "../ui/BackButton";
import Button from "../ui/Button";
import DiveSkeleton from "./DiveSkeleton";
import { formatteDate } from "@/utils/util";
import { RiSortAsc } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";

const AllDives = () => {
  const [data, setData] = useState<DiveType[]>([]);
  const [loadItems, setLoadItems] = useState<number>(6);
  const [sort, setSort] = useState<"date" | "rate">("date");
  const [openSortModal, setOpenSortModal] = useState<boolean>(false);

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

  const getDivesByRate = async () => {
    const data = await fetch("api/getDivesByRate", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { divesWithRate } = await data.json();
    const dives = divesWithRate.map((item: any) => {
      item.dive.rate = item.rate;
      return item.dive;
    });
    const sortedRates = dives.sort((a: any, b: any) => b.rate - a.rate);

    setData(sortedRates);
  };

  useEffect(() => {
    if (sort === "date") {
      getAllDives();
    } else if (sort === "rate") {
      getDivesByRate();
    }
  }, [sort]);
  return (
    <Container>
      <BackButton />
      <Grid>
        <Title
          className="col-span-4 lg:col-span-12 flex justify-center pb-4"
          h="h1"
        >
          Dives of Our Users
        </Title>
        <span className="col-span-full flex justify-end">
          <div className="relative">
            <button
              onClick={() => setOpenSortModal(!openSortModal)}
              className="flex gap-2 items-center text-base lg:text-lg hover:text-black/70"
            >
              <RiSortAsc className="size-6" />
              <div>Sort by:</div>
              <div className="capitalize">{sort}</div>
            </button>
            {openSortModal && (
              <div className="border-2 bg-white border-mediumGray shadow-md rounded-md absolute top-10 right-0 ">
                <div className="text-base lg:text-lg divide-y divide-mediumGray py-2">
                  <button
                    disabled={sort === "date" && true}
                    onClick={() => {
                      setSort("date"), setOpenSortModal(false);
                    }}
                    className="px-4 pb-1 flex items-center gap-3 hover:text-black/70"
                  >
                    <div>Date</div>
                    <FaCheck
                      className={sort === "date" ? "visible" : "invisible"}
                    />
                  </button>
                  <button
                    disabled={sort === "rate" && true}
                    onClick={() => {
                      setSort("rate"), setOpenSortModal(false);
                    }}
                    className="px-4 pt-1 flex items-center gap-3 hover:text-black/70"
                  >
                    <div>Rate</div>
                    <FaCheck
                      className={sort === "rate" ? "visible" : "invisible"}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </span>

        {data && data.length
          ? data.slice(0, loadItems).map((item: DiveType) => {
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
            })
          : new Array(6).fill(0).map((_, i) => <DiveSkeleton key={i} />)}
        {data && loadItems < data.length && (
          <div className="col-span-4 lg:col-span-12 flex justify-center text-center mt-4 bs:mt-10">
            <Button
              onClick={() => setLoadItems(loadItems + 3)}
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
