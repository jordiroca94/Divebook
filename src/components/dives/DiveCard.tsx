/* eslint-disable @next/next/no-img-element */
"use client";
import { DiveCardType } from "@/types/common";
import Button from "../ui/Button";
import Link from "next/link";
import { useEffect, useState } from "react";

const DiveCard = ({
  _id,
  name,
  country,
  location,
  description,
  date,
  imageUrl,
  user,
  profileCard,
}: DiveCardType) => {
  const [userId, setUserId] = useState<string | null>(null);
  const getUser = async () => {
    try {
      const userData = await fetch("/api/getUserData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      });
      const data = await userData.json();
      setUserId(data.user._id);
    } catch {
      throw Error("An error occurred while fetching data.");
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);
  return (
    <div className="col-span-4 md:col-span-2 lg:col-span-4 shadow-lg hover:shadow-primary rounded-md border-mediumGray border">
      {imageUrl && (
        <div className="flex justify-center border-b border-mediumGray">
          <img
            className="rounded-md aspect-[4/3] object-cover"
            src={imageUrl}
            alt="Placehodler Image"
          />
        </div>
      )}
      <div className="p-6">
        <h6 className="text-xl font-semibold line-clamp-1">{name}</h6>
        <p className="mt-2">{date}</p>
        <div className="flex gap-2 items-center py-2 text-lg">
          <p className="line-clamp-1">{country.label}</p>
          <small>-</small>
          <p className="line-clamp-1">{location}</p>
        </div>
        <p className="text-base font-thin mb-4 line-clamp-2">{description}</p>
        {!profileCard && (
          <div className="flex items-center gap-2 py-3 ">
            <p>Posted by:</p>
            <Link
              href={`/divers/${userId}`}
              className="hover:text-gray underline"
            >
              {user.name}
            </Link>
          </div>
        )}
        <Button
          className="mt-6 mb-2"
          link={`/dives/${_id}`}
          label="Read more"
        />
      </div>
    </div>
  );
};

export default DiveCard;
