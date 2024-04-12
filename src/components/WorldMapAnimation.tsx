"use client";
import { CountryType } from "@/types/common";
import React, { ComponentProps, ReactNode, useEffect, useRef } from "react";

type Props = {
  countries: CountryType[] | undefined;
  children: ReactNode;
};

const WorldMapAnimation = ({ children, countries }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current === null) return;
    const map = ref.current.querySelector("svg");
    if (!map) return;
    countries?.forEach(({ value }) => {
      const path = map.querySelector(`[data-cc=${value.toLowerCase()}]`);
      path?.classList.add(
        "text-primary/70",
        "transition-colors",
        "duration-[2000ms]"
      );
    });
  }, [countries]);

  return (
    <div ref={ref} className="text-mapGray max-w-6xl bs:max-w-7xl mx-auto">
      {children}
    </div>
  );
};

export default WorldMapAnimation;
