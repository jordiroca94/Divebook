import React from "react";
import WorldMapAnimation from "./WorldMapAnimation";
import WorldMap from "./WorldMap";
import Container from "./ui/Container";
import Title from "./ui/Title";

const MapComponent = () => {
  return (
    <Container className="lg:py-20 py-10">
      <Title className="flex justify-center pb-10" h="h1">
        Where is our community from ?
      </Title>
      <WorldMapAnimation>
        <WorldMap />
      </WorldMapAnimation>
    </Container>
  );
};

export default MapComponent;
