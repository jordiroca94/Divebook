"use client";
import Link from "next/link";
import Container from "./ui/Container";
import { IoMdArrowBack } from "react-icons/io";
import Grid from "./ui/Grid";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useSession } from "next-auth/react";
import { DiveType, UserType } from "@/types/common";
import Title from "./ui/Title";

const DiveForm = () => {
  const { data: session } = useSession();
  const form: any = useRef();
  const options: any = useMemo(() => countryList().getData(), []);
  const [countryValue, setCountryValue] = useState<any>("");
  const [metricSystem, setMetricSystem] = useState<"meeters" | "feet">(
    "meeters"
  );
  const [temperatureSystem, setTemperatureSystem] = useState<
    "celsius" | "farenheit"
  >("celsius");
  const [formSubmitted, setFormSubmitted] = useState<Boolean>(false);

  const diveSchema = z.object({
    name: z.string().min(1, { message: "Required" }),
    location: z.string().min(1, { message: "Required" }),
    deepth: z.string().min(1, { message: "Required" }),
    temperature: z.string().min(1, { message: "Required" }),
    instructor: z.string().min(1, { message: "Required" }),
    suit: z.string().min(1, { message: "Required" }),
    description: z.string().min(1, { message: "Required" }),
  });

  const changeCountryValue = (value: any) => {
    setCountryValue(value);
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<DiveType>({
    defaultValues: {
      user: {},
      name: "",
      country: {},
      location: "",
      description: "",
      deepth: "",
      temperature: "",
      instructor: "",
      suit: "",
    },
    resolver: zodResolver(diveSchema),
  });

  const handleMetricSystem = (event: any) => {
    setMetricSystem(event.target.value);
  };

  const handleTemperatureSystem = (event: any) => {
    setTemperatureSystem(event.target.value);
  };

  const createDive = async (values: DiveType) => {
    const parsedValues = {
      user: session?.user,
      name: values.name,
      country: countryValue,
      location: values.location,
      deepth: values.deepth.concat(" ", metricSystem),
      temperature: values.temperature.concat(" ", temperatureSystem),
      instructor: values.instructor,
      suit: values.suit,
      description: values.description,
    };

    try {
      await fetch("api/dive", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          parsedValues,
        }),
      });
      setFormSubmitted(true);
      reset();
    } catch {
      throw Error("An error ocurred while registering. Please try again ");
    }
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
        <Title className="col-span-4 lg:col-span-12 lg:col-start-3" h="h1">
          Tell us about your last dive!
        </Title>
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
            <Select
              className="lg:w-1/2"
              options={options}
              value={countryValue}
              onChange={changeCountryValue}
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
            <label htmlFor="deepth" className="font-medium pt-4">
              How deep was it ?
            </label>
            <fieldset className="flex gap-4 items-center">
              <input
                id="deepth"
                className="border border-mediumGray py-2 px-3 rounded-md w-[100px]"
                type="number"
                placeholder="Deepth"
                {...register("deepth")}
              />
              <label htmlFor="meters">meeters</label>
              <input
                type="radio"
                id="meters"
                name="meters"
                value="meeters"
                checked={metricSystem === "meeters"}
                onChange={handleMetricSystem}
              />
              <label htmlFor="feet">feet</label>
              <input
                type="radio"
                id="feet"
                name="feet"
                value="feet"
                checked={metricSystem === "feet"}
                onChange={handleMetricSystem}
              />
            </fieldset>
            {errors.deepth?.message && (
              <p aria-describedby="deepth" className="text-red pt-1">
                {errors.deepth?.message}
              </p>
            )}
            <label htmlFor="deepth" className="font-medium pt-4">
              Water temperature
            </label>
            <fieldset className="flex gap-4 items-center">
              <input
                id="temperature"
                className="border border-mediumGray py-2 px-3 rounded-md w-[100px]"
                type="number"
                placeholder="Water temperature"
                {...register("temperature")}
              />
              <label htmlFor="celsius">celsius</label>
              <input
                type="radio"
                id="celsius"
                name="celsius"
                value="celsius"
                checked={temperatureSystem === "celsius"}
                onChange={handleTemperatureSystem}
              />
              <label htmlFor="farenheit">farenheit</label>
              <input
                type="radio"
                id="farenheit"
                name="farenheit"
                value="farenheit"
                checked={temperatureSystem === "farenheit"}
                onChange={handleTemperatureSystem}
              />
            </fieldset>

            {errors.temperature?.message && (
              <p aria-describedby="temperature" className="text-red pt-1">
                {errors.temperature?.message}
              </p>
            )}
            <label htmlFor="instructor" className="font-medium pt-4">
              Who was your instructor?
            </label>
            <input
              id="instructor"
              className="border border-mediumGray py-2 px-3 rounded-md lg:w-1/2"
              type="text"
              placeholder="Instructor name"
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
            {formSubmitted && (
              <p className="text-sm mt-3 text-primary">
                Dive created successfully
              </p>
            )}
          </form>
        </div>
      </Grid>
    </Container>
  );
};

export default DiveForm;
