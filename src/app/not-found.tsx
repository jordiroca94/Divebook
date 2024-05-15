import Header from "@/components/Header";
import Button from "../components/ui/Button";
import Image from "next/image";
import IMG from "../../public/assets/images/404.jpeg";
export default function NotFound() {
  return (
    <main className="grid place-items-center h-screen">
      <Header />
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-lg font-bold text-primary">Error 404</p>
        <h2 className="text-lg px-6 text-center">
          We could not find the page you are looking for
        </h2>
        <div className="size-48">
          <Image src={IMG} alt="Scuba Diving Logo" />
        </div>
        <Button link="/" className="mt-4" label="Home" />
      </div>
    </main>
  );
}
