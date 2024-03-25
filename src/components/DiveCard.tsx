/* eslint-disable @next/next/no-img-element */
import { CountryType, DiveCardType, DiveType } from "@/types/common";
import Button from "./ui/Button";

const DiveCard = ({
  name,
  country,
  location,
  description,
  formattedDate,
  imageUrl,
}: DiveCardType) => {
  return (
    <div className="col-span-4 xlg:col-span-3 shadow-lg rounded-md border-mediumGray border">
      {imageUrl && (
        <div className="flex justify-center">
          <img
            className="rounded-md aspect-[4/3]"
            src={imageUrl}
            alt="Placehodler Image"
          />
        </div>
      )}
      <div className="p-6">
        <h6 className="text-xl font-semibold">{name}</h6>
        <p className="mt-2">{formattedDate}</p>
        <div className="flex gap-2 items-center py-2 text-lg">
          <p>{country.label}</p>
          <small>-</small>
          <p>{location}</p>
        </div>
        <p className="text-base font-thin pb-4">{description}</p>
        <Button
          openNewTab
          className="mt-6 mb-2"
          link="/item"
          label="Read more"
        />
      </div>
    </div>
  );
};

export default DiveCard;
