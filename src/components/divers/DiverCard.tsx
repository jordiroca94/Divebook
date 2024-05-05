/* eslint-disable @next/next/no-img-element */
import { UserType } from "@/types/common";
import Link from "next/link";

const DiverCard = ({
  name,
  avatarUrl,
  instructor,
  country,
  certificate,
  _id,
}: UserType) => {
  return (
    <div className="group relative col-span-4 md:col-span-2 lg:col-span-4 xlg:col-span-3 shadow-lg rounded-md border-mediumGray border hover:shadow-primary">
      <Link href={`/divers/${_id}`} className="flex flex-col ">
        <div className="absolute hidden group-hover:block z-40 top-1/2 left-1/2 transform duration-500 -translate-x-1/2 -translate-y-1/2">
          <span className="text-white bg-primary px-5 py-3 rounded-md">
            Read more
          </span>
        </div>
        {avatarUrl && (
          <img
            className="p-6 rounded-full object-cover aspect-square"
            src={avatarUrl}
            alt={name}
          />
        )}
        {instructor && (
          <div className="flex justify-center py-3">
            <div className="py-2 px-6 rounded-full font-light bg-primary text-white">
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
      </Link>
    </div>
  );
};

export default DiverCard;
