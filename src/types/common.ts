export type Inputs = {
  name: string;
  email: string;
  message: string;
};

export type UserType = {
  name: string;
  email: string;
};

export type CountryType = {
  value: string;
  label: string;
};

export type DiveType = {
  _id: string;
  user: UserType;
  name: string;
  country: CountryType;
  location: string;
  description: string;
  deepth: string;
  temperature: string;
  instructor: string;
  suit: string;
  updatedAt: string;
  imageUrl: string;
};

export type DiveCardType = {
  _id: string;
  name: string;
  country: CountryType;
  location: string;
  description: string;
  formattedDate: string;
  imageUrl: string;
  user: UserType;
};
