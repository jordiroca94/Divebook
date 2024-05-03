import dayjs from "dayjs";

export const formatteDate = (value: string | null | Date) => {
  const formattedDate = dayjs(value).format("D-MMM-YYYY");
  return formattedDate;
};

export const getAge = (date: any) => {
  const birthdate: any = new Date(date);
  const today: any = new Date();
  const differenceInMilliseconds = today - birthdate;
  const age = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)
  );
  return age;
};
