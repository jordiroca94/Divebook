import React from "react";

const DiveSkeleton = () => {
  return (
    <div className="col-span-4 md:col-span-2 lg:col-span-4 shadow-lg rounded-md border-mediumGray border animate-pulse">
      <div className="flex flex-col">
        <div className="object-cover rounded-md aspect-[4/3] bg-mediumGray" />
        <div className="flex flex-col gap-4 p-6">
          <div className="w-3/5 h-5 bg-mediumGray"></div>
          <div className="w-2/5 h-5 bg-mediumGray"></div>
          <div className="w-3/5 h-5 bg-mediumGray"></div>
          <div className="w-3/5 h-5 bg-mediumGray"></div>
          <div className="w-2/5 h-5 bg-mediumGray mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default DiveSkeleton;
