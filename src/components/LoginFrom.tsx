import Link from "next/link";
import React from "react";

const LoginFrom = () => {
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-500">
        <h1 className="text-xl font-bold my-4">Login with your credentials</h1>
        <form className="flex flex-col gap-3">
          <input
            className="border border-gray-200 py-2 px-6 rounded-md"
            type="text"
            placeholder="Email"
          />
          <input
            className="border border-gray-200 py-2 px-6 rounded-md"
            type="password"
            placeholder="Password"
          />
          <button
            type="submit"
            className="bg-green-600 text-white cursor-pointer px-6 py-2"
          >
            Login
          </button>
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2 ">
            Error message
          </div>
          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Do not have an account ?<span className="underline"> Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginFrom;
