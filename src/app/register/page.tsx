import RegisterForm from "@/components/divers/RegisterForm";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// @ts-ignore
import { authOptions } from "../api/auth/[...nextauth]/route";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const page = async () => {
  const session = await getServerSession<any>(authOptions);
  if (session) redirect("/");
  return (
    <div>
      <Header />
      <RegisterForm />
    </div>
  );
};

export default page;
