import React from "react";
import Grid from "./Grid";

type Props = {
  children: React.ReactNode;
  width?: string;
};

const Modal = ({ children, width }: Props) => {
  return (
    <Grid className="fixed z-40 inset-0 lg:bg-black/50 place-items-center pt-header px-0 lg:px-[6.25rem]">
      <div
        className={`w-full bg-white h-full lg:h-auto ${
          width ? width : "col-span-4 lg:col-span-8 lg:col-start-3"
        } px-4 py-5 lg:p-8 flex flex-col overflow-y-scroll`}
      >
        {children}
      </div>
    </Grid>
  );
};

export default Modal;
