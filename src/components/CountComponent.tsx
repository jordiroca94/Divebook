"use client";

import { useEffect, useState } from "react";

const CountComponent = () => {
  const [count, setCount] = useState<{ users: number; divs: number }>();
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
  return <div className="hidden">CountComponent</div>;
};

export default CountComponent;
