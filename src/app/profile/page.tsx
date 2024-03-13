import Profile from "@/components/Profile";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// @ts-ignore
import { authOptions } from "../api/auth/[...nextauth]/route";
import Header from "@/components/Header";

const page = async () => {
  const session = await getServerSession<any>(authOptions);

  if (!session) redirect("/");

  return (
    <div>
      <Header />
      <Profile />
    </div>
  );
};

export default page;
