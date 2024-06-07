import LoginForm from "@/components/LoginForm";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// @ts-ignore
import { authOptions } from "../api/auth/[...nextauth]/route";
import Header from "@/components/Header";
import { Session } from "next-auth";

const page = async () => {
  const session: Session | null = await getServerSession(authOptions);

  if (session) redirect("/");

  return (
    <div>
      <Header />
      <LoginForm />
    </div>
  );
};

export default page;
