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
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  console.log(error, "error-->");
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
        console.log("we got here --->>");
        setError("User already existst");
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
        setSuccess("User created Successfully");
      }
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
          {error && (
            <div className="bg-red text-white w-fit text-sm py-1 px-3 rounded-md mt-2 ">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-600 text-white w-fit text-sm py-1 px-3 rounded-md mt-2 ">
              {success}
            </div>
          )}
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
