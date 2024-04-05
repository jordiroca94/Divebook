export type Inputs = {
  name: string;
  email: string;
  message: string;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  description?: string;
  country?: CountryType;
  certificates?: string;
  birthDate?: Date | null;
  instructor?: Boolean;
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
  date: string;
  imageUrl: string;
  user: UserType;
};

export type HighlightedDestinationType = {
  id: string;
  name: string;
  country: string;
  description: string;
  type: string;
  season: string;
  image: string;
};

export type ParamsType = {
  params: { id: string };
};
