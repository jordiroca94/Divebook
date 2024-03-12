import React from "react";

type Props = {
  children: React.ReactNode;
};

const Modal = ({ children }: Props) => {
  return (
    <div className="fixed z-40 inset-0 lg:bg-black/50 grid grid-cols-4 lg:grid-cols-12 place-items-center pt-header px-0 lg:px-[6.25rem]">
      <div className="w-full bg-white h-full lg:h-auto col-span-4 lg:col-span-8 lg:col-start-3 px-4 py-10 lg:p-8 pb-12 lg:pb-12 flex flex-col overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default Modal;
