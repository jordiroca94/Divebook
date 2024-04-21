"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Loader from "./ui/Loader";
import Container from "./ui/Container";
import Title from "./ui/Title";
import BackButton from "./ui/BackButton";
import Grid from "./ui/Grid";

type Inputs = {
  name: string;
  email: string;
  message: string;
};

const Contact = () => {
  const form: any = useRef();
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const userinfoSchema = z.object({
    email: z.string().email({ message: "An email is required" }),
    name: z.string().min(1, { message: "A name is required" }),
    message: z.string().min(1, { message: "A message is required" }),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    resolver: zodResolver(userinfoSchema),
  });

  const sendEmail = () => {
    setLoading(true);
    emailjs
      .sendForm(
        "service_5xbgnoj",
        "template_p41vdq9",
        form.current,
        "0qEytRhXqOf0cpUUe"
      )
      .then(
        (result) => {
          console.log(result.text);
          setLoading(false);
          setStatus(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
    reset();
    setTimeout(() => {
      setStatus(false);
    }, 5000);
  };

  return (
    <Container className="pt-header xl:h-[85vh]">
      <div className="py-6 lg:py-12">
        <BackButton />
      </div>
      <Title className="bs:pb-4" h="h1">
        Contact us!
      </Title>
      <Grid className="py-12">
        <form
          className="flex flex-col items-start text-lg col-span-4 lg:col-span-6 lg:col-start-4"
          ref={form}
          onSubmit={handleSubmit(sendEmail)}
        >
          <p className="pb-4">
            Do not hesitate to contact us if you have any question
          </p>
          <div className="flex flex-col w-full md:w-3/5">
            <label htmlFor="name" className="font-medium mb-2">
              Name
            </label>
            <input
              id="name"
              className="rounded-md border border-mediumGray py-2 pl-2"
              type="text"
              placeholder="Full name"
              {...register("name")}
            />
            {errors.name?.message && (
              <p aria-describedby="name" className="text-red pt-1">
                A name is required
              </p>
            )}
          </div>
          <div className="flex flex-col w-full md:w-3/5">
            <label htmlFor="email" className="font-medium mt-6 mb-2">
              Email
            </label>
            <input
              id="email"
              className="rounded-md border border-mediumGray py-2 pl-2"
              type="email"
              placeholder="Your email"
              {...register("email")}
            />
            {errors.email?.message && (
              <p aria-describedby="email" className="text-red pt-1">
                An email is required
              </p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="message" className="font-medium mt-6 mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="rounded-md border border-mediumGray py-2 pl-2"
              placeholder="Your message"
              {...register("message")}
            />
            {errors.message?.message && (
              <p aria-describedby="message" className="text-red pt-1">
                A message is required
              </p>
            )}
          </div>
          <button
            className="mt-6 text-base font-bold capitalize text-white border rounded-md py-3 px-6 cursor-pointer hover:bg-primary/80 bg-primary w-full lg:w-auto"
            type="submit"
            value="Send"
          >
            {loading ? <Loader /> : <div>Send</div>}
          </button>

          {status === true && (
            <p className="mt-4 text-primary">
              Your message was sent successfully
            </p>
          )}
        </form>
      </Grid>
    </Container>
  );
};

export default Contact;
