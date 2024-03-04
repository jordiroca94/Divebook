import LoginForm from "@/components/LoginForm";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// @ts-ignore
import { authOptions } from "../api/auth/[...nextauth]/route";
import Header from "@/components/Header";

const page = async () => {
  const session = await getServerSession<any>(authOptions);

  if (session) redirect("/");

  return (
    <div>
      <Header />
      <LoginForm />
    </div>
  );
};

export default page;
