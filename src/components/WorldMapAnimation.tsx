"use client";
import React, { ComponentProps, ReactNode, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
};

const WorldMapAnimation = ({ children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="text-mapGray max-w-7xl mx-auto">
      {children}
    </div>
  );
};

export default WorldMapAnimation;
