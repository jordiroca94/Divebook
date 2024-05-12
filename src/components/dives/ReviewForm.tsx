"use client";
import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  userId: string;
  id: string;
};

const ReviewForm = ({ userId, id }: Props) => {
  const form = useRef<HTMLFormElement>(null);
  const { data: session } = useSession();
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const ratingChanged = (newRating: number) => {
    setRate(newRating);
  };

  const reviewSchema = z.object({
    description: z
      .string()
      .min(5, { message: "Comment must be longer than 5 characters" }),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: "",
    },
    resolver: zodResolver(reviewSchema),
  });

  const createReview = async (values: { description: string }) => {
    setLoading(true);
    const parsedValues = {
      postedBy: session?.user?.name,
      rate: rate,
      description: values.description,
      userId: userId,
      diveId: id,
    };
    try {
      await fetch("/api/createReview", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          parsedValues,
        }),
      });
      reset();
      window.location.reload();
      setLoading(false);
    } catch {
      throw Error("An error occurred while creating a review.");
    }
  };

  return (
    <form
      ref={form}
      onSubmit={handleSubmit(createReview)}
      className="flex gap-3 md:gap-6 mt-6 md:mt-10"
    >
      <div className="aspect-square size-16 md:size-20 text-3xl lg:text-5xl border-mediumGray2 border flex justify-center items-center">
        {session?.user?.name && session.user.name.substring(0, 1)}
      </div>
      <div className="w-full">
        <div className="flex justify-between w-full gap-4">
          <div className="w-full md:w-[70%]">
            <textarea
              id="description"
              className="border border-mediumGray py-2 px-3 rounded-md w-full"
              placeholder="Please write your comment"
              rows={6}
              {...register("description")}
            />
            {errors.description?.message && (
              <p aria-describedby="name" className="text-red pt-1">
                {errors.description?.message}
              </p>
            )}
            <div className="md:hidden mt-2">
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
              />
            </div>
          </div>
          <div className="md:block hidden">
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />
          </div>
        </div>
        <Button className="mt-4" loading={loading} submit label="Send Review" />

        {/* <button
          type="submit"
          className="bg-primary cursor-pointer px-16 py-2 text-white rounded-md my-4 lg:w-fit"
        >
          Send Review
        </button> */}
      </div>
    </form>
  );
};

export default ReviewForm;
