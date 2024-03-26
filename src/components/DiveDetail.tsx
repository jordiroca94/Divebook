"use client";
import React, { useEffect, useState } from "react";

type Props = {
  id: string;
};

const DiveDetail = ({ id }: Props) => {
  //   const [data, setData] = useState<any>();
  //   const getDives = async () => {
  //     try {
  //       const data = await fetch("api/getDiveById", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ id }),
  //       });
  //       console.log("fetching data");
  //       //   const { dive } = await data.json();
  //       //   setData(dive);
  //     } catch {
  //       throw Error("An error occurred while fetching data.");
  //     }
  //   };

  //   useEffect(() => {
  //     getDives();
  //   }, []);
  return <div>Page for ID -- {id}</div>;
};

export default DiveDetail;
