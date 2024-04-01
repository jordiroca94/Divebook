import Container from "../ui/Container";
import Grid from "../ui/Grid";
import Title from "../ui/Title";
import data from "../../data/highlighted.json";
import HighlightedCard from "./HighlightedDestinationsCard";

const AllHighlightedDestinations = () => {
  return (
    <div className="pt-header">
      <Container>
        <Grid>
          <Title
            className="col-span-4 lg:col-span-12 flex justify-center pb-4"
            h="h1"
          >
            Some of our highlighted diving spots
          </Title>
          {data.items.map((item) => (
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
        </Grid>
      </Container>
    </div>
  );
};

export default AllHighlightedDestinations;
