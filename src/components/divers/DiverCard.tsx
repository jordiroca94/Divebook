/* eslint-disable @next/next/no-img-element */
import { UserType } from "@/types/common";

const DiverCard = ({ name, email, avatarUrl }: UserType) => {
  return (
    <div className="col-span-4 md:col-span-2 lg:col-span-4 xlg:col-span-3 shadow-lg rounded-md border-mediumGray border">
      <div className="flex flex-col ">
        {avatarUrl && (
          <img
            className="p-6 rounded-full object-cover aspect-square"
            src={avatarUrl}
            alt={name}
          />
        )}
        <div className="flex justify-center pb-6">
          <p className="text-xl font-semibold">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default DiverCard;
