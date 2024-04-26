"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import Title from "../ui/Title";
import { UserType } from "@/types/common";
import Modal from "../ui/Modal";
import { RxCross2 } from "react-icons/rx";
import Button from "../ui/Button";

const RegisterForm = () => {
  const form: any = useRef();
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openTermsModal, setOpenTermsModal] = useState<boolean>(false);
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
    <div className="grid pt-16 md:pt-0 place-items-center h-screen">
      <div className="shadow-lg  py-6 px-8 w-[90%] lg:w-auto rounded-lg border-t-4 border-primary max-w-[370px]">
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
            <input type="checkbox" id="terms" {...register("terms")} />
            <label htmlFor="terms" className="pt-6">
              By creating an account, I accept the{" "}
              <button
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
      {openTermsModal && (
        <Modal height="h-screen md:h-auto md:max-h-[80vh]">
          <div className="flex justify-between items-center pt-4 md:pt-0">
            <h5 className="text-2xl">Terms & conditions</h5>
            <button
              className="rounded-full border-mediumGray border p-2 "
              onClick={() => setOpenTermsModal(false)}
            >
              <RxCross2 className="size-5" />
            </button>
          </div>
          <div className="text-base flex flex-col">
            <p>Welcome to Diverbook!</p>
            <br></br>
            <p>
              These terms and conditions govern your use of the Diverbook web
              application hosted at diverbook.vercel.app. By accessing or using
              Diverbook, you agree to be bound by these terms.
            </p>
            <br></br>
            <p>
              <strong>1. Age Restriction:</strong> Users under the age of 14 are
              not permitted to use Diverbook. By accessing or using Diverbook,
              you confirm that you are at least 14 years old.
            </p>
            <br></br>
            <p>
              <strong>2. User Conduct:</strong> Diverbook aims to provide a safe
              and enjoyable environment for all users. You agree not to engage
              in any conduct that violates these Terms or any applicable laws.
              In particular, you agree not to post, upload, or share any content
              that is unlawful, harmful, threatening, abusive, harassing,
              defamatory, vulgar, obscene, or otherwise objectionable.
            </p>
            <br></br>
            <p>
              <strong>3. User Responsibility:</strong> You are solely
              responsible for your use of Diverbook and any content you post,
              upload, or share on the platform. Diverbook does not endorse or
              control the content posted by users, but reserves the right to
              remove any content that it considers inappropriate or in violation
              of these Terms.
            </p>
            <br></br>
            <p>
              <strong>4. Account Termination:</strong> Diverbook reserves the
              right to terminate or suspend your account and access at any time
              and for any reason, including but not limited to violations of
              these Terms or misuse of the platform.
            </p>
            <br></br>
            <p>
              <strong>5. Modification of Terms:</strong> Diverbook may modify
              these Terms at any time without prior notice. It is your
              responsibility to review these Terms regularly to stay informed of
              any changes. Your continued use of Diverbook after the posting of
              changes constitutes your acceptance of the modified Terms.
            </p>
            <br></br>
            <p>
              <strong>6. Disclaimer:</strong> Diverbook is provided as it is and
              without warranty of any kind. Diverbook makes no representations
              or warranties regarding the accuracy, completeness, or reliability
              of Diverbook or any content posted on the platform.
            </p>
            <br></br>
            <p>
              <strong>7. Limitation of Liability:</strong> In no event shall
              Diverbook or its affiliates be liable for any direct, indirect,
              incidental, special, or consequential damages arising out of or in
              any way connected with your use of Diverbook or any content posted
              on the platform.
            </p>
            <br></br>
            <p>
              <strong>8. Governing Law:</strong> These Terms shall be governed
              by and construed in accordance with the laws of Spain. Any
              disputes arising under these Terms shall be subject to the
              exclusive jurisdiction of the courts of Spain.
            </p>
            <br></br>
            <p>
              If you have any questions or concerns about these Terms, please{" "}
              <a className="text-primary underline" href="/contact">
                contact us.
              </a>
            </p>
            <br></br>
            <p>Thank you for using Diverbook!</p>

            <Button
              onClick={() => setOpenTermsModal(false)}
              className="w-fit mt-6"
              label="Accept terms "
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RegisterForm;
