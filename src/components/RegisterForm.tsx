"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import Title from "./ui/Title";

type RegisterValuesType = {
  name: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const form: any = useRef();
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

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
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<RegisterValuesType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (values: RegisterValuesType) => {
    setSuccess(false);
    setError(false);
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
            values,
          }),
        });
        reset();
        setSuccess(true);
      }
    } catch {
      throw Error("An error occurred while registering. Please try again");
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg py-6 px-8 w-[90%] lg:w-auto rounded-lg border-t-4 border-primary">
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
          <button
            type="submit"
            className="bg-primary text-white cursor-pointer px-6 py-2 rounded-md mt-4"
            value="Send"
          >
            Register
          </button>
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
    </div>
  );
};

export default RegisterForm;
