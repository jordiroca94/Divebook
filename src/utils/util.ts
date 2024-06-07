import dayjs from "dayjs";

export const formatteDate = (value: string | null | Date) => {
  const formattedDate = dayjs(value).format("D-MMM-YYYY");
  return formattedDate;
};

export const getAge = (date: string | number | Date) => {
  const birthdate: Date = new Date(date);
  const today: Date = new Date();
  const differenceInMilliseconds = today.getTime() - birthdate.getTime();
  const age = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)
  );
  return age;
};
