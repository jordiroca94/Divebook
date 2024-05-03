import React from "react";
import Grid from "../ui/Grid";

const DiveDetailSkeleton = () => {
  return (
    <>
      <Grid>
        <div className="col-span-2 col-start-2 lg:col-span-4 lg:col-start-5 items-center flex justify-center mb-6 lg:mb-10 h-7 bg-mediumGray animate-pulse"></div>
        <div className="col-span-4 lg:col-start-2 flex flex-col justify-between animate-pulse">
          <div className="flex h-5 w-2/5 lg:w-3/5 bg-mediumGray mb-6"></div>
          <div>
            <div className=" w-full h-5 bg-mediumGray gap-2 py-3 mb-4" />
            <div className=" w-full h-5 bg-mediumGray gap-2 py-3 mb-4" />
            <div className=" w-full h-5 bg-mediumGray gap-2 py-3 mb-4" />
            <div className=" w-full h-5 bg-mediumGray gap-2 py-3 mb-4" />
            <div className=" w-full h-5 bg-mediumGray gap-2 py-3 mb-4" />
          </div>
        </div>
        <div className="col-span-5 lg:col-start-7 animate-pulse">
          <div className="rounded-lg aspect-[3/2] object-cover bg-mediumGray"></div>
        </div>
      </Grid>
      <Grid>
        <div className="col-span-4 lg:col-span-7 lg:col-start-2 mt-2 lg:py-10">
          <div className="w-full h-5 bg-mediumGray mt-4"></div>
          <div className="w-full h-5 bg-mediumGray mt-4"></div>
          <div className="w-full h-5 bg-mediumGray mt-4"></div>
          <div className="w-full h-5 bg-mediumGray mt-4"></div>
          <div className="w-full h-5 bg-mediumGray mt-4"></div>
        </div>
        <div className="col-span-4 lg:col-span-3 lg:col-start-9 text-lg lg:py-10">
          <div className="flex lg:flex-col gap-2 justify-end lg:items-end">
            <div className="w-1/5 h-5 bg-mediumGray"></div>
            <div className="w-2/5 h-5 bg-mediumGray"></div>
          </div>
        </div>
      </Grid>
    </>
  );
};

export default DiveDetailSkeleton;
