import { HighlightedDestination } from "@/types/common";
import Button from "../ui/Button";

const HighlightedDestinationCard = ({
  id,
  name,
  country,
  description,
  type,
  season,
  image,
}: HighlightedDestination) => {
  return (
    <div className="col-span-4 md:col-span-2 lg:col-span-4 shadow-lg rounded-md border-mediumGray border">
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
        </div>
        <Button
          className="mt-6 mb-2"
          link={`/highlighted-dives/${id}`}
          label="Read more"
        />
      </div>
    </div>
  );
};

export default HighlightedDestinationCard;
