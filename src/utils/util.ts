import dayjs from "dayjs";

const formatteDate = (value: string | null | Date) => {
  const formattedDate = dayjs(value).format("D-MMM-YYYY");
  return formattedDate;
};

export default formatteDate;
