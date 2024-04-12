import React from "react";

const DiverSkeleton = () => {
  return (
    <div className="col-span-4 md:col-span-2 lg:col-span-4 xlg:col-span-3 shadow-lg rounded-md border-mediumGray border animate-pulse">
      <div className="flex flex-col">
        <div className="p-6">
          <div className="rounded-full object-cover aspect-square bg-mediumGray" />
        </div>
        <div className="flex flex-col items-center gap-4 p-6">
          <div className="w-3/5 h-5 bg-mediumGray"></div>
          <div className="w-3/5 h-5 bg-mediumGray"></div>
          <div className="w-4/5 h-5 bg-mediumGray"></div>
        </div>
      </div>
    </div>
  );
};

export default DiverSkeleton;
