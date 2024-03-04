import RegisterForm from "@/components/RegisterForm";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// @ts-ignore
import { authOptions } from "../api/auth/[...nextauth]/route";
const page = async () => {
  const session = await getServerSession<any>(authOptions);

  if (session) redirect("/");
  return <RegisterForm />;
};

export default page;
