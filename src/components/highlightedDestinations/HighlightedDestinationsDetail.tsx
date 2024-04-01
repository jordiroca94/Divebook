import Container from "../ui/Container";

type Props = {
  id: string;
};

const HighlightedDestinationDetail = ({ id }: Props) => {
  return (
    <div className="pt-header">
      <Container>highlighted destination {id}</Container>
    </div>
  );
};

export default HighlightedDestinationDetail;
