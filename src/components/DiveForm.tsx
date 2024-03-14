"use client";
import Link from "next/link";
import Container from "./ui/Container";
import { IoMdArrowBack } from "react-icons/io";
import Grid from "./ui/Grid";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type DiveType = {
  name: string;
  country: string;
  location: string;
  description: string;
  deepth: string;
  instructor: string;
  suit: string;
};

const DiveForm = () => {
  const form: any = useRef();

  const registerSchema = z.object({
    name: z.string().min(1, { message: "Required" }),
    country: z.string().min(1, { message: "Required" }),
    location: z.string().min(1, { message: "Required" }),
    description: z.string().min(1, { message: "Required" }),
    deepth: z.string().min(1, { message: "Required" }),
    instructor: z.string().min(1, { message: "Required" }),
    suit: z.string().min(1, { message: "Required" }),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<DiveType>({
    defaultValues: {
      name: "",
      country: "",
      location: "",
      description: "",
      deepth: "",
      instructor: "",
      suit: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const createDive = async (values: DiveType) => {
    console.log(values, "form submitted ");
  };

  return (
    <Container className="pt-header">
      <div className="flex justify-between py-6 lg:py-12">
        <Link href="/profile" className="flex gap-2 items-center">
          <IoMdArrowBack className="h-7 w-7" />
          <p>Go back</p>
        </Link>
      </div>
      <Grid>
        <h1 className="col-span-4 lg:col-span-12 lg:col-start-3 text-3xl lg:text-4xl">
          Tell us about your last dive!
        </h1>
        <div className="col-span-4 lg:col-start-3 lg:col-span-8">
          <form
            ref={form}
            onSubmit={handleSubmit(createDive)}
            className="flex flex-col gap-3 pb-10 lg:pb-20"
          >
            <label htmlFor="name" className="font-medium pt-4">
              Put a name to your dive
            </label>
            <input
              id="name"
              className="border border-mediumGray py-2 px-3 rounded-md lg:w-1/2"
              type="text"
              placeholder="Dive's name"
              {...register("name")}
            />
            {errors.name?.message && (
              <p aria-describedby="name" className="text-red pt-1">
                {errors.name?.message}
              </p>
            )}
            <label htmlFor="country" className="font-medium pt-4">
              Country
            </label>
            <input
              id="country"
              className="border border-mediumGray py-2 px-3 rounded-md lg:w-1/2"
              type="text"
              placeholder="Country"
              {...register("country")}
            />
            {errors.country?.message && (
              <p aria-describedby="country" className="text-red pt-1">
                {errors.country?.message}
              </p>
            )}
            <label htmlFor="location" className="font-medium pt-4">
              Where was it?
            </label>
            <input
              id="location"
              className="border border-mediumGray py-2 px-3 rounded-md lg:w-1/2"
              type="text"
              placeholder="Location"
              {...register("location")}
            />
            {errors.location?.message && (
              <p aria-describedby="location" className="text-red pt-1">
                {errors.location?.message}
              </p>
            )}
            <label htmlFor="location" className="font-medium pt-4">
              How deep was it ?
            </label>
            <input
              id="deepth"
              className="border border-mediumGray py-2 px-3 rounded-md lg:w-1/2"
              type="text"
              placeholder="Deepth"
              {...register("deepth")}
            />
            {errors.deepth?.message && (
              <p aria-describedby="deepth" className="text-red pt-1">
                {errors.deepth?.message}
              </p>
            )}
            <label htmlFor="instructor" className="font-medium pt-4">
              Who was your instructor?
            </label>
            <input
              id="instructor"
              className="border border-mediumGray py-2 px-3 rounded-md lg:w-1/2"
              type="text"
              placeholder="Instructor"
              {...register("instructor")}
            />
            {errors.instructor?.message && (
              <p aria-describedby="instructor" className="text-red pt-1">
                {errors.instructor?.message}
              </p>
            )}
            <label htmlFor="instructor" className="font-medium pt-4">
              Tell us about your suit
            </label>
            <input
              id="suit"
              className="border border-mediumGray py-2 px-3 rounded-md lg:w-1/2"
              type="text"
              placeholder="Suit"
              {...register("suit")}
            />
            {errors.suit?.message && (
              <p aria-describedby="suit" className="text-red pt-1">
                {errors.suit?.message}
              </p>
            )}
            <label htmlFor="description" className="font-medium pt-4">
              Tell us about your experience
            </label>
            <textarea
              id="description"
              className="border border-mediumGray py-2 px-3 rounded-md"
              placeholder="Description"
              rows={3}
              {...register("description")}
            />
            {errors.description?.message && (
              <p aria-describedby="description" className="text-red pt-1">
                {errors.description?.message}
              </p>
            )}
            <button
              type="submit"
              className="bg-primary cursor-pointer px-16 py-2 text-white rounded-md my-4 lg:w-fit"
            >
              Submit
            </button>
          </form>
        </div>
      </Grid>
    </Container>
  );
};

export default DiveForm;
