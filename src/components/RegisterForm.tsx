"use client";
import { Inputs } from "@/types/common";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type RegisterValues = {
  name: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const form: any = useRef();

  const registerSchema = z.object({
    email: z.string().email({ message: "An email is required" }),
    name: z.string().min(1, { message: "A name is required" }),
    password: z.string().min(1, { message: "Insert your password" }),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<RegisterValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (values: RegisterValues) => {
    // console.log(values, "form submitted");
    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          values,
        }),
      });
      reset();
    } catch {
      throw Error("An error occurred while registering. Please try again");
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-500">
        <h1 className="text-xl font-bold my-4">Register</h1>
        <form
          ref={form}
          onSubmit={handleSubmit(handleRegister)}
          className="flex flex-col gap-3"
        >
          <label htmlFor="name" className="font-medium mb-2">
            Name
          </label>
          <input
            id="name"
            className="border border-gray-200 py-2 px-6 rounded-md"
            type="text"
            placeholder="Full Name"
            {...register("name")}
          />
          {errors.name?.message && (
            <p aria-describedby="name" className="text-red pt-1">
              {errors.name?.message}
            </p>
          )}
          <label htmlFor="email" className="font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            className="border border-gray-200 py-2 px-6 rounded-md"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email?.message && (
            <p aria-describedby="name" className="text-red pt-1">
              {errors.email?.message}
            </p>
          )}
          <label htmlFor="password" className="font-medium mb-2">
            Password
          </label>
          <input
            id="password"
            className="border border-gray-200 py-2 px-6 rounded-md"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password?.message && (
            <p aria-describedby="name" className="text-red pt-1">
              {errors.password?.message}
            </p>
          )}
          <button
            type="submit"
            className="bg-green-600 text-white cursor-pointer px-6 py-2"
            value="Send"
          >
            Register
          </button>

          <Link className="text-sm mt-3 text-right" href={"/login"}>
            Already have an account ?
            <span className="underline"> Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
