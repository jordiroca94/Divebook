const formatteDate = (value: string) => {
  const date = new Date(value);
  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  return formattedDate;
};

export default formatteDate;
