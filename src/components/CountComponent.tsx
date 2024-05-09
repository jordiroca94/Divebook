"use client";

import { useEffect, useState } from "react";
import CountUp from "react-countup";
import Dive from "../../models/dive";

const CountComponent = () => {
  const [count, setCount] = useState<{ users: number; dives: number }>();
  const getCounts = async () => {
    try {
      const res = await fetch("/api/getCounts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { count } = await res.json();
      setCount(count);
    } catch {
      throw Error("An error occurred while fetching data.");
    }
  };

  useEffect(() => {
    getCounts();
  }, []);
  return (
    <>
      {count ? (
        <div className="flex justify-center gap-10 mt-6 lg:mt-12">
          <div className="flex flex-col items-center gap-1">
            <CountUp
              className="font-bold text-2xl bs:text-4xl"
              enableScrollSpy
              duration={3}
              start={0}
              end={count.users}
            />
            <p className="text-sm font-semibold text-white bs:text-lg">USERS</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <CountUp
              className="font-bold text-2xl bs:text-4xl"
              enableScrollSpy
              duration={3}
              start={0}
              end={count.dives}
            />
            <p className="text-sm font-semibold text-white bs:text-lg">DIVES</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <CountUp
              className="font-bold text-2xl bs:text-4xl"
              enableScrollSpy
              duration={3}
              start={0}
              end={30}
            />
            <p className="text-sm font-semibold text-white bs:text-lg">
              REVIEWS
            </p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center gap-10 mt-6 lg:mt-12">
          <div className="flex flex-col items-center gap-1">
            <CountUp
              className="font-bold text-2xl bs:text-4xl"
              enableScrollSpy
              duration={0}
              start={0}
              end={0}
            />
            <p className="text-sm font-semibold text-white bs:text-lg">USERS</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <CountUp
              className="font-bold text-2xl bs:text-4xl"
              enableScrollSpy
              duration={0}
              start={0}
              end={0}
            />
            <p className="text-sm font-semibold text-white bs:text-lg">DIVES</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <CountUp
              className="font-bold text-2xl bs:text-4xl"
              enableScrollSpy
              duration={3}
              start={0}
              end={0}
            />
            <p className="text-sm font-semibold text-white bs:text-lg">
              REVIEWS
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CountComponent;
