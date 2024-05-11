"use client";
import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import { useForm } from "react-hook-form";

type Props = {
  userId: string;
  id: string;
};

const ReviewForm = ({ userId, id }: Props) => {
  const form = useRef<HTMLFormElement>(null);
  const { data: session } = useSession();
  const [rate, setRate] = useState<number | null>(null);

  const ratingChanged = (newRating: number) => {
    setRate(newRating);
  };

  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      description: "",
    },
  });

  const createReview = async (values: { description: string }) => {
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
    } catch {
      throw Error("An error occurred while creating a review.");
    }
  };

  return (
    <form
      ref={form}
      onSubmit={handleSubmit(createReview)}
      className="flex gap-6 mt-10"
    >
      <div className="size-20 text-5xl border-mediumGray2 border flex justify-center items-center">
        {session?.user?.name && session.user.name.substring(0, 1)}
      </div>
      <div className="w-full">
        <div className="flex justify-between w-full gap-4">
          <textarea
            id="description"
            className="border border-mediumGray py-2 px-3 rounded-md w-[70%]"
            placeholder="Please write your comment"
            rows={6}
            {...register("description")}
          />
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"
          />
        </div>
        <button
          type="submit"
          className="bg-primary cursor-pointer px-16 py-2 text-white rounded-md my-4 lg:w-fit"
        >
          Send Review
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
