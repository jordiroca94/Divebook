import Container from "./ui/Container";
import Button from "./ui/Button";
import Grid from "./ui/Grid";
import Title from "./ui/Title";
import data from "../data/highlighted.json";

const AllHighlightedDestinations = () => {
  return (
    <div className="pt-header">
      <Container>
        <Grid>
          <Title
            className="col-span-4 lg:col-span-12 flex justify-center text-center pb-4"
            h="h1"
          >
            Some of our highlighted diving spots
          </Title>
          {data.items.map((item) => (
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
                    When to go:{" "}
                    <span className="font-normal">{item.season}</span>
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
        </Grid>
      </Container>
    </div>
  );
};

export default AllHighlightedDestinations;
