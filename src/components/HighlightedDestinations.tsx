import Image from "next/image";
import image1 from "../../public/assets/images/destination1.jpeg";
import image2 from "../../public/assets/images/destination2.jpeg";
import image3 from "../../public/assets/images/destination3.jpeg";
import Container from "./ui/Container";
import Button from "./ui/Button";
import Grid from "./ui/Grid";
import Title from "./ui/Title";

const HighlightedDestinations = () => {
  const items = [
    {
      key: "1",
      name: "SS Thistlegorm - Ras Mohammed",
      country: "Egypt",
      description:
        "One of the best wreck dives in the world (and probably one of the most famous dive sites), the SS Thistlegorm lies in the northern section of the Red Sea. As a popular day trip and liveaboard stop, it’s easily accessible from Sharm El-Sheikh. The wreck itself was previously a 420-foot (128-meter) British transport ship. Unfortunately, she met her fate in 1941 when she was sunk by a German air attack. Today, she remains a window into history with a visible cargo of trucks, jeeps, motorcycles, tanks, and even a locomotive. For this reason, many divers consider it one of the top 3 dive sites in the world.",
      type: "Wreck",
      season: "March to May, September to November",
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
      image: image2,
    },
    {
      key: "3",
      name: "Tiger Beach - Grand Bahama Island",
      country: "Bahamas",
      description:
        "Known for shark diving, the Bahamas is a wonderland country of fantastic dive sites and home to some of the best diving in the Caribbean. While you can swim with hammerheads, oceanic whitetips, and reef sharks, at Tiger Beach, you’ll find daily encounters with several tiger sharks all at once. While you wait on the sandy bottom, these large sharks circle around the group in an experience that will delight thrill-seekers and underwater photographers alike. There’s also a chance to see nurse, lemon, and Caribbean reef sharks at this famous Bahamas shark dive site.",
      type: "Shark",
      season: "October to January",
      image: image3,
    },
  ];
  return (
    <Container className="pt-12 lg:pt-20">
      <Grid>
        <Title
          className="col-span-4 lg:col-span-12 flex justify-center text-center pb-4"
          h="h2"
        >
          Some of our highlighted diving spots
        </Title>
        {items.map((item) => (
          <div
            className="col-span-4 md:col-span-2 lg:col-span-4 shadow-lg rounded-md border-mediumGray border"
            key={item.key}
          >
            <Image className="rounded-t-md" src={item.image} alt={item.name} />
            <div className="p-6">
              <h6 className="text-lg font-semibold">{item.country}</h6>
              <h5 className="py-2">{item.name}</h5>
              <p className="line-clamp-3 ">{item.description}</p>
              <div className="flex flex-col">
                <span className="font-semibold py-2">
                  Dive Type: <span className="font-normal">{item.type}</span>
                </span>
                <span className="font-semibold">
                  When to go: <span className="font-normal">{item.season}</span>
                </span>
              </div>
              <Button
                openNewTab
                className="mt-6 mb-2"
                link="/item"
                label="Read more"
              />
            </div>
          </div>
        ))}
      </Grid>
    </Container>
  );
};

export default HighlightedDestinations;
