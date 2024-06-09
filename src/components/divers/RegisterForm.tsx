"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import Title from "../ui/Title";
import { GeolocationType, UserType } from "@/types/common";
import TermsModal from "../TermsModal";
import Button from "../ui/Button";

const RegisterForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openTermsModal, setOpenTermsModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [geolocation, setGeolocation] = useState<GeolocationType>();
  const hasUppercase = RegExp(/[A-Z]/);
  const hasNumber = RegExp(/\d/);

  const password = z
    .string()
    .min(6, { message: "Password must be more than 6 characters" })
    .refine((value) => hasUppercase.test(value), {
      message: "Password must have an uppercase letter",
    })
    .refine((value) => hasNumber.test(value), {
      message: "Password must include at least one number",
    });

  const registerSchema = z.object({
    email: z.string().email({ message: "An email is required" }),
    name: z.string().min(1, { message: "A name is required" }),
    password: password,
    terms: z.boolean().refine((data: boolean) => data === true, {
      message: "You must agree to the terms and conditions",
    }),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<UserType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      avatarUrl: "",
      description: "",
      country: { value: "", label: "" },
      birthDate: null,
      certificate: "",
      instructor: "",
      terms: false,
    },
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (values: UserType) => {
    setSuccess(false);
    setError(false);
    setLoading(true);

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError(true);
      } else {
        await fetch("api/register", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
            avatarUrl:
              "https://files.edgestore.dev/0ajhytejvs3pwkiy/myPublicImages/_public/b82160aa-8396-4688-b234-cd7e1daba2ba.jpeg",
            description: "",
            country: { label: "", value: "" },
            certificate: "",
            birthDate: null,
            instructor: false,
            geolocation: geolocation,
          }),
        });
        reset();
        setSuccess(true);
        setLoading(false);
      }
    } catch {
      throw Error("An error occurred while registering. Please try again");
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setGeolocation({ latitude, longitude });
      });
    }
  }, []);

  return (
    <div className="grid pt-20 md:pt-0 place-items-center h-screen">
      <div className="shadow-lg py-6 px-8 w-full rounded-lg border-t-4 border-primary max-w-[365px]">
        <Title fontSize="text-xl font-bold" className="my-4" h="h1">
          Register
        </Title>
        <form
          ref={form}
          onSubmit={handleSubmit(handleRegister)}
          className="flex flex-col gap-3"
        >
          <label htmlFor="name" className="font-medium">
            Name
          </label>
          <input
            id="name"
            className="border border-mediumGray py-2 px-6 rounded-md"
            type="text"
            placeholder="Full Name"
            {...register("name")}
          />
          {errors.name?.message && (
            <p aria-describedby="name" className="text-red pt-1">
              {errors.name?.message}
            </p>
          )}
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            id="email"
            className="border border-mediumGray py-2 px-6 rounded-md"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email?.message && (
            <p aria-describedby="email" className="text-red pt-1">
              {errors.email?.message}
            </p>
          )}
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <div className="flex gap-2 items-center">
            <input
              id="password"
              className="border border-mediumGray py-2 px-6 rounded-md"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
            />
            <BiShow
              onClick={() => setShowPassword(true)}
              className={`h-8 w-8 ${showPassword && "hidden"}`}
            />
            <BiHide
              onClick={() => setShowPassword(false)}
              className={`h-8 w-8 ${!showPassword && "hidden"}`}
            />
          </div>
          {errors.password?.message && (
            <p aria-describedby="password" className="text-red pt-1">
              {errors.password?.message}
            </p>
          )}
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              id="terms"
              {...register("terms")}
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <label htmlFor="terms" className="pt-6">
              By creating an account, I accept the{" "}
              <button
                type="button"
                onClick={() => setOpenTermsModal(true)}
                className="underline text-primary"
              >
                Terms and conditions
              </button>
            </label>
          </div>
          {errors.terms?.message && (
            <p aria-describedby="terms" className="text-red pt-1">
              {errors.terms?.message}
            </p>
          )}
          <Button className="mt-4" loading={loading} submit label="Register" />
          {error && (
            <div className="bg-red text-white w-fit text-sm py-1 px-3 rounded-md mt-2 ">
              User already existst
            </div>
          )}
          <Link
            className={`text-sm mt-3 text-right ${success && "text-primary"}`}
            href="/login"
          >
            {success
              ? "Registration done successfully"
              : "Already have an account?"}

            <span className="underline"> Login</span>
          </Link>
        </form>
      </div>
      {openTermsModal && (
        <TermsModal
          setOpenTermsModal={setOpenTermsModal}
          setIsChecked={setIsChecked}
        />
      )}
    </div>
  );
};

export default RegisterForm;
