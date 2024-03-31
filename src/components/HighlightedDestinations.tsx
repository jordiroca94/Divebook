import Container from "./ui/Container";
import Button from "./ui/Button";
import Grid from "./ui/Grid";
import Title from "./ui/Title";
import data from "../data/highlighted.json";
import Link from "next/link";

const HighlightedDestinations = () => {
  return (
    <Container className="pt-12 lg:pt-20">
      <Grid>
        <Title
          className="col-span-4 lg:col-span-12 flex justify-center text-center pb-4"
          h="h2"
        >
          Some of our highlighted diving spots
        </Title>
        {data.items.slice(0, 3).map((item) => (
          <div
            className="col-span-4 md:col-span-2 lg:col-span-4 shadow-lg rounded-md border-mediumGray border"
            key={item.id}
          >
            <img className="rounded-t-md" src={item.image} alt={item.name} />
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
                className="mt-6 mb-2"
                link={`/highlighted-dives/${item.id}`}
                label="Read more"
              />
            </div>
          </div>
        ))}
        <div className="col-span-4 lg:col-span-12 flex justify-center text-center">
          <Button link="/highlighted-dives" label="See more" secondary />
        </div>
      </Grid>
    </Container>
  );
};

export default HighlightedDestinations;
