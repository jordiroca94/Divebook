import Image from "next/image";
import image1 from "../../public/assets/images/destination.jpeg";

const HighlightedDestinations = () => {
  const items = [
    {
      key: "1",
      name: "Bajo Alcyone - Cocos Island",
      country: "Costa Rica",
      description:
        "Cocos Island, which lies far from the Costa Rican Pacific coast, is only accessible by liveaboard but is consistently ranked as the top destination in the world for hammerhead diving with this first-class dive site",
      type: "Shark",
      season: "June to November",
      image: image1,
    },
    {
      key: "2",
      name: "Bajo Alcyone - Cocos Island",
      country: "Costa Rica",
      description:
        "Cocos Island, which lies far from the Costa Rican Pacific coast, is only accessible by liveaboard but is consistently ranked as the top destination in the world for hammerhead diving with this first-class dive site",
      type: "Shark",
      season: "June to November",
      image: image1,
    },
    {
      key: "3",
      name: "Bajo Alcyone - Cocos Island",
      country: "Costa Rica",
      description:
        "Cocos Island, which lies far from the Costa Rican Pacific coast, is only accessible by liveaboard but is consistently ranked as the top destination in the world for hammerhead diving with this first-class dive site",
      type: "Shark",
      season: "June to November",
      image: image1,
    },
  ];
  return (
    <div className="grid grid-cols-4 lg:grid-cols-12 py-16 lg:py-32 px-4 lg:px-20 gap-6">
      <h2 className="col-span-4 lg:col-span-12 flex justify-center">
        Some of our highlighted diving spots
      </h2>
      {items.map((item) => (
        <div
          className="col-span-4 lg:col-span-4 shadow-lg rounded-md border-mediumGray border"
          key={item.key}
        >
          <Image className="rounded-t-md" src={item.image} alt={item.name} />
          <div className="p-4">
            <h6 className="text-lg font-semibold">{item.country}</h6>
            <h5 className="py-2">{item.name}</h5>
            <p className="line-clamp-3 ">{item.description}</p>
            <div className="flex py-2 gap-2">
              <span className="font-semibold">Dive Type: </span>
              <p>{item.type}</p>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">When to go: </span>
              <p>{item.season}</p>
            </div>
            <div className="mt-6 mb-2">
              <a
                className="text-base font-bold text-white border w-fit rounded-md py-2 px-4 cursor-pointer hover:bg-primary/80 bg-primary"
                href="/item"
              >
                Read more
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HighlightedDestinations;
