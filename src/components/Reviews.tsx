"use client";

import React, { useEffect, useState } from "react";
import Grid from "./ui/Grid";
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import ReviewForm from "./dives/ReviewForm";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { formatteDate } from "@/utils/util";
import { MdStarRate } from "react-icons/md";

type Props = {
  id: string;
};
const Reviews = ({ id }: Props) => {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<any>([]);
  const [rate, setRate] = useState<number | null>(null);
  const [reviewsWithRate, setReviewsWithRate] = useState<number | null>();
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

      const reviewsWithRate = diveReviews.filter(
        (review: any) => review.rate !== null
      );

      const rateSum = diveReviews.reduce(
        (accumulator: any, review: any) => accumulator + review.rate,
        0
      );

      const rateAverage =
        Math.ceil((rateSum / reviewsWithRate.length) * 10) / 10;
      setRate(rateAverage);

      setReviews(diveReviews);
      setReviewsWithRate(reviewsWithRate.length);
    } catch {
      throw Error("An error occurred while fetching data.");
    }
  };

  useEffect(() => {
    getReviews();
  }, []);
  return (
    <Grid>
      <div className="col-span-4 lg:col-span-10 lg:col-start-2 mt-8">
        <div className="flex justify-between items-center border-b border-mediumGray2 pb-3">
          <h5 className="text-xl lg:text-2xl">Reviews</h5>
          {typeof rate === "number" && !isNaN(rate) && (
            <div className="flex items-center gap-2">
              <MdStarRate className="size-6 text-primary" />
              <div className="text-lg">{rate}</div>
              <div className="text-lg text-gray">({reviewsWithRate})</div>
            </div>
          )}
        </div>
        <div>
          {reviews.map((review: any) => (
            <div className="flex md:gap-6 mt-6 md:mt-10" key={review._id}>
              <div className="flex flex-col justify-start items-center gap-2 pt-2 w-[100px]">
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
                  <div className=" py-2 pl-3 rounded-md w-full text-justify">
                    {review.description}
                  </div>
                  <div
                    className={`w-full flex items-center ${
                      !review.rate ? "justify-end" : "justify-between"
                    } lg:justify-end px-3 py-2`}
                  >
                    {review.rate && (
                      <div className="md:hidden">
                        <ReactStars
                          count={5}
                          value={review.rate}
                          edit={false}
                          size={24}
                          activeColor="#00308F"
                        />
                      </div>
                    )}
                    <span>{formatteDate(review.updatedAt)}</span>
                  </div>
                </div>
                {review.rate && (
                  <div className="md:block hidden">
                    <ReactStars
                      count={5}
                      value={review.rate}
                      edit={false}
                      size={24}
                      activeColor="#00308F"
                    />
                  </div>
                )}
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
