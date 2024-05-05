import { HighlightedDestinationType } from "@/types/common";
import Button from "../ui/Button";
import Link from "next/link";

const HighlightedDestinationCard = ({
  id,
  name,
  country,
  description,
  type,
  season,
  image,
}: HighlightedDestinationType) => {
  return (
    <Link
      href={`/highlighted-dives/${id}`}
      className="group col-span-4 md:col-span-2 lg:col-span-4 shadow-lg hover:shadow-primary rounded-md border-mediumGray border"
    >
      <img className="rounded-t-md" src={image} alt={name} />
      <div className="p-6">
        <h5 className="text-lg font-semibold">{name}</h5>
        <h6 className="py-2">{country}</h6>
        <p className="line-clamp-3 font-light">{description}</p>
        <div className="flex flex-col">
          <span className="font-semibold py-2">
            Dive Type: <span className="font-normal">{type}</span>
          </span>
          <span className="font-semibold line-clamp-1">
            When to go: <span className="font-normal">{season}</span>
          </span>
          <div className="text-white bg-primary px-6 py-3 rounded-md w-fit mt-4">
            Read more
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HighlightedDestinationCard;
