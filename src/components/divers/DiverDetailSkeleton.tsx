import React from "react";
import Grid from "../ui/Grid";
import DiveSkeleton from "../dives/DiveSkeleton";

const DiverDetailSkeleton = () => {
  return (
    <Grid>
      <div className="col-span-4 lg:col-span-4 lg:col-start-5 flex justify-center uppercase mb-2 lg:mb-12 h-5 bg-mediumGray "></div>
      <div className="col-span-4 lg:col-span-4 lg:col-start-2">
        <div className="aspect-square rounded-full bg-mediumGray animate-pulse" />
      </div>
      <div className="col-span-4 lg:col-span-5 lg:col-start-7 text-lg">
        <div className="w-2/5 h-5 bg-mediumGray mb-3" />
        <div className="w-2/5 h-5 bg-mediumGray mb-3" />
        <div className="w-2/5 h-5 bg-mediumGray mb-3" />
        <div className="w-2/5 h-5 bg-mediumGray mb-3" />
      </div>
      <div className="mb-4 col-span-4 lg:col-start-2 lg:col-span-10 bs:hidden">
        <div className="w-full h-5 bg-mediumGray mb-3" />
        <div className="w-full h-5 bg-mediumGray mb-3" />
        <div className="w-full h-5 bg-mediumGray mb-3" />
        <div className="w-full h-5 bg-mediumGray mb-3" />
      </div>
      {new Array(4).fill(0).map((_, i) => (
        <DiveSkeleton key={i} />
      ))}
    </Grid>
  );
};

export default DiverDetailSkeleton;
