import Login from "@/components/LoginFrom";

export default function Home() {
  return (
    <main className="flex flex-col">
      <h1>This is the homepage</h1>
      <a
        className="text-red border-black border w-fit rounded-md py-2 px-2 cursor-pointer"
        href="/login"
      >
        Not logged yet ?
      </a>
    </main>
  );
}
