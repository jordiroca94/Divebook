import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// @ts-ignore
import { authOptions } from "../api/auth/[...nextauth]/route";
import Header from "@/components/Header";
import DiveForm from "@/components/dives/DiveForm";
import Footer from "@/components/Footer";
import { Session } from "next-auth";

const page = async () => {
  const session: Session | null = await getServerSession(authOptions);

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
