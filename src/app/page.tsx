import Login from "@/components/LoginFrom";

export default function Home() {
  return (
    <main className="flex flex-col">
      <p>This is the homepage</p>
      <a
        className="text-red border-black border w-fit rounded-md py-2 px-2 cursor-pointer"
        href="/login"
      >
        Not logged yet ?
      </a>
    </main>
  );
}
