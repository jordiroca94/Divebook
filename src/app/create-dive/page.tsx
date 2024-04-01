import LoginForm from "@/components/LoginForm";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// @ts-ignore
import { authOptions } from "../api/auth/[...nextauth]/route";
import Header from "@/components/Header";
import DiveForm from "@/components/dives/DiveForm";
import Footer from "@/components/Footer";

const page = async () => {
  const session = await getServerSession<any>(authOptions);

  if (!session) redirect("/");

  return (
    <div>
      <Header />
      <DiveForm />
      <Footer />
    </div>
  );
};

export default page;
