import Container from "./ui/Container";
import Button from "./ui/Button";
import Grid from "./ui/Grid";
import Title from "./ui/Title";
import data from "../data/highlighted.json";
import Link from "next/link";
import HighlightedCard from "./HighlightedCard";

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
          <HighlightedCard
            key={item.id}
            id={item.id}
            name={item.name}
            country={item.country}
            description={item.description}
            type={item.type}
            season={item.season}
            image={item.image}
          />
        ))}
        <div className="col-span-4 lg:col-span-12 flex justify-center text-center mt-4 bs:mt-10">
          <Button link="/highlighted-dives" label="See more" secondary />
        </div>
      </Grid>
    </Container>
  );
};

export default HighlightedDestinations;
