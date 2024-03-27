"use client";
import React, { useEffect, useState } from "react";
import Container from "./ui/Container";

type Props = {
  id: string;
};

const DiveDetail = ({ id }: Props) => {
  const [item, setItem] = useState<any>();
  const getDives = async () => {
    try {
      const data = await fetch("/api/getDiveById", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const { dive } = await data.json();
      setItem(dive);
    } catch {
      throw Error("An error occurred while fetching data.");
    }
  };

  useEffect(() => {
    getDives();
  }, []);
  return (
    <div className="pt-header">
      <Container>{item?.name}</Container>
    </div>
  );
};

export default DiveDetail;
