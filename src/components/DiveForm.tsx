import Link from "next/link";
import Container from "./ui/Container";
import { IoMdArrowBack } from "react-icons/io";

const DiveForm = () => {
  return (
    <Container className="pt-header">
      <div className="flex justify-between py-6 lg:py-12">
        <Link href="/profile" className="flex gap-2 items-center">
          <IoMdArrowBack className="h-7 w-7" />
          <p>Go back</p>
        </Link>
      </div>
      <div>This is the form to create dives</div>
    </Container>
  );
};

export default DiveForm;
