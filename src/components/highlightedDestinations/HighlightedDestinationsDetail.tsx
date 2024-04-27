"use client";
import Container from "../ui/Container";
import data from "../../data/highlighted.json";
import { useEffect, useState } from "react";
import { HighlightedDestinationType } from "@/types/common";
import Grid from "../ui/Grid";
import Title from "../ui/Title";
import BackButton from "../ui/BackButton";

const HighlightedDestinationDetail = ({ id }: { id: string }) => {
  const [item, setItem] = useState<HighlightedDestinationType>();
  const fetchItem = (item: { id: string }) => {
    return item.id === id;
  };

  useEffect(() => {
    const res = data.items.find(fetchItem);
    setItem(res);
  }, []);

  return (
    <Container>
      <BackButton />
      <Grid>
        {item && (
          <>
            <Title
              className="col-span-4 lg:col-span-12 flex justify-center pb-4"
              h="h1"
            >
              {item.name}
            </Title>
            <div className="col-span-4 lg:col-start-2 flex flex-col justify-evenly pb-6">
              <div className="flex justify-between border-b border-mediumGray items-center gap-2 py-3">
                <div className="text-lg font-semibold">Country:</div>
                <p>{item.country}</p>
              </div>
              <div className="flex justify-between border-b border-mediumGray items-center gap-2 py-3">
                <div className="text-lg font-semibold">Dive Type:</div>
                <p>{item.type}</p>
              </div>
              <div className="flex justify-between border-b border-mediumGray items-center gap-2 py-3">
                <div className="text-lg font-semibold">When to go:</div>
                <p>{item.season}</p>
              </div>
            </div>
            <p className="col-span-4 lg:col-start-2 lg:col-span-10 text-base bs:text-lg font-light leading-7">
              {item.description}
            </p>
            <div className="col-span-4 lg:col-span-10 lg:col-start-2">
              <img
                className="aspect-[2/1] object-cover"
                src={item.image}
                alt={item.name}
              />
            </div>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default HighlightedDestinationDetail;
