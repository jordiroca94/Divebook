"use client";

import { useEffect, useState } from "react";
import Container from "./ui/Container";
import Grid from "./ui/Grid";
import CountUp from "react-countup";
import IMG from "../../public/assets/images/count.jpg";
import Image from "next/image";

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
    <Container className="pt-12 lg:py-20 bs:py-32">
      <Grid>
        <div className="col-span-4 lg:col-start-2 lg:col-span-4 flex flex-col justify-center">
          <h3 className="text-3xl bs:text-4xl text-center font-semibold bs:leading-relaxed">
            We bring you closer to the diving world
          </h3>
          {count && (
            <div className="flex justify-center gap-10 mt-6 lg:mt-12">
              <div className="flex flex-col items-center gap-1">
                <CountUp
                  className="font-bold text-2xl bs:text-4xl"
                  enableScrollSpy
                  duration={3}
                  start={0}
                  end={count.users}
                />
                <p className="text-sm font-semibold text-primary bs:text-lg">
                  USERS
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <CountUp
                  className="font-bold text-2xl bs:text-4xl"
                  enableScrollSpy
                  duration={3}
                  start={0}
                  end={count.dives}
                />
                <p className="text-sm font-semibold text-primary bs:text-lg">
                  DIVES
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <CountUp
                  className="font-bold text-2xl bs:text-4xl"
                  enableScrollSpy
                  duration={3}
                  start={0}
                  end={30}
                />
                <p className="text-sm font-semibold text-primary bs:text-lg">
                  REVIEWS
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-4 lg:col-start-7 lg:col-span-4">
          <Image src={IMG} alt="Image" className="rounded-md" />
        </div>
      </Grid>
    </Container>
  );
};

export default CountComponent;
