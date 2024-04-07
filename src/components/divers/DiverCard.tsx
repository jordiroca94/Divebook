/* eslint-disable @next/next/no-img-element */
import { UserType } from "@/types/common";

const DiverCard = ({
  name,
  email,
  avatarUrl,
  instructor,
  country,
  certificate,
}: UserType) => {
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
        {instructor && (
          <div className="flex justify-center py-3">
            <div className="py-2 px-6 rounded-full font-light bg-green text-white">
              Instructor
            </div>
          </div>
        )}
        <div className="flex justify-center pb-6">
          <p className="text-xl font-semibold">{name}</p>
        </div>
        {country && (
          <div className="flex justify-center pb-6">
            <p className="text-xl font-light">{country.label}</p>
          </div>
        )}
        {certificate && (
          <div className="flex justify-center pb-6">
            <p className="text-xl">{certificate}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiverCard;
