"use client";
import Link from "next/link";
import Container from "./ui/Container";
import { useSession } from "next-auth/react";

const JoinUs = () => {
  const { data: session } = useSession();

  if (session) return null;

  return (
    <Container>
      <div className="w-full flex justify-center">
        <Link
          href="/login"
          className="border border-mediumGray text-primary shadow-lg p-6 lg:py-10 lg:text-2xl lg:px-32 w-fit text-center hover:underline"
        >
          Register and join our community!!
        </Link>
      </div>
    </Container>
  );
};

export default JoinUs;
