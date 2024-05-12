"use client";

import React, { useEffect, useState } from "react";
import Grid from "./ui/Grid";
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import ReviewForm from "./dives/ReviewForm";
import { useSession } from "next-auth/react";
import Link from "next/link";

type Props = {
  id: string;
};
const Reviews = ({ id }: Props) => {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<any>([]);

  const getReviews = async () => {
    try {
      const reviews = await fetch("/api/getReviews", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data } = await reviews.json();
      const diveReviews: any = [];
      data.map((item: any) => {
        if (item.diveId === id) {
          diveReviews.push(item);
        }
      });

      setReviews(diveReviews);
    } catch {
      throw Error("An error occurred while fetching data.");
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <Grid>
      <div className="col-span-4 lg:col-span-10 lg:col-start-2">
        <h5 className="text-base lg:text-2xl w-full border-b border-mediumGray2 pb-3">
          Reviews
        </h5>
        <div>
          {reviews.map((review: any) => (
            <div className="flex gap-3 md:gap-6 mt-6 md:mt-10" key={review._id}>
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="aspect-square size-16 md:size-20 text-3xl lg:text-5xl border-mediumGray2 rounded-full border flex justify-center items-center">
                  {review.postedBy.substring(0, 1)}
                </div>
                <a
                  href={`/divers/${review.userId}`}
                  className="underline  hover:text-gray text-center"
                >
                  {review.postedBy}
                </a>
              </div>
              <div className="flex justify-between w-full gap-4">
                <div className="w-full md:w-[70%]">
                  <div className=" py-2 px-3 rounded-md w-full">
                    {review.description}
                  </div>

                  <div className="md:hidden mt-2">
                    <ReactStars
                      count={5}
                      value={review.rate}
                      edit={false}
                      size={24}
                      activeColor="#ffd700"
                    />
                  </div>
                </div>
                <div className="md:block hidden">
                  <ReactStars
                    count={5}
                    value={review.rate}
                    edit={false}
                    size={24}
                    activeColor="#ffd700"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        {session ? (
          <ReviewForm id={id} />
        ) : (
          <div className="mt-10 w-full flex justify-center pb-12 lg:pb-20">
            <Link
              href="/login"
              className="text-lg border border-mediumGray text-primary shadow-lg p-6 lg:py-10 lg:px-32 w-fit text-center hover:underline"
            >
              Log in to add a review.
            </Link>
          </div>
        )}
      </div>
    </Grid>
  );
};

export default Reviews;
