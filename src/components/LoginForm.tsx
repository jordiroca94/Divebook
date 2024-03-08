"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
type LoginValuesType = { email: string; password: string };

const LoginForm = () => {
  const form: any = useRef();
  const router = useRouter();
  const [error, setError] = useState(false);
  const loginSchema = z.object({
    email: z.string().email({ message: "An email is required" }),
    password: z.string().min(1, { message: "Insert your password" }),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginValuesType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (values: LoginValuesType) => {
    const { email, password } = values;
    try {
      setError(false);
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res && res.status === 200) {
        return router.replace("/profile");
      } else {
        setError(true);
      }
    } catch (error) {}
    console.log("There was an error, please try again");
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg py-10 px-8 rounded-lg border-t-4 border-primary">
        <h1 className="text-xl font-bold my-4">Login with your credentials</h1>
        <form
          ref={form}
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-3"
        >
          <label htmlFor="email" className="font-medium mb-2">
            Email
          </label>
          <input
            className="border border-mediumGray py-2 px-6 rounded-md"
            id="email"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email?.message && (
            <p aria-describedby="email" className="text-red pt-1">
              {errors.email?.message}
            </p>
          )}
          <label htmlFor="password" className="font-medium mb-2">
            Password
          </label>
          <input
            className="border border-mediumGray py-2 px-6 rounded-md"
            type="password"
            placeholder="Password"
            id="password"
            {...register("password")}
          />
          {errors.password?.message && (
            <p aria-describedby="password" className="text-red pt-1">
              {errors.password?.message}
            </p>
          )}
          {error && <p className="text-red pt-1">Wrong email or password</p>}
          <button
            type="submit"
            className="bg-primary cursor-pointer px-6 py-2 text-white rounded-md my-4 "
          >
            Login
          </button>
          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Do not have an account ?<span className="underline"> Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
