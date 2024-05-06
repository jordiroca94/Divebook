import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import Container from "./ui/Container";

const Footer = () => {
  const year: number = new Date().getFullYear();
  return (
    <Container className="bg-primary py-12 lg:py-20">
      <footer className="text-white flex items-center flex-col gap-4">
        <a className="hover:underline" href="/terms-and-conditions">
          Terms and Conditions
        </a>
        <div className="flex gap-6">
          <Link
            aria-label="Linkedin"
            href="https://www.linkedin.com/in/jordi-roca-soler/"
            target="_blank"
          >
            <BsLinkedin className="h-8 w-8" />
          </Link>
          <Link
            aria-label="Github"
            href="https://github.com/jordiroca94/Diverbook"
            target="_blank"
          >
            <FaGithub className="h-8 w-8" />
          </Link>
        </div>
        <div className="text-base">Copyright &copy; {year} Jordi Roca</div>
      </footer>
    </Container>
  );
};

export default Footer;
