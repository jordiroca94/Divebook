import DiveDetail from "@/components/DiveDetail";

const page = ({ params }: any) => {
  return <DiveDetail id={params.diveId} />;
};

export default page;
