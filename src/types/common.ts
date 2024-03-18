export type Inputs = {
  name: string;
  email: string;
  message: string;
};

export type UserType = {
  name: string;
  email: string;
};

export type DiveType = {
  _id: string;
  user: UserType;
  name: string;
  country: { value: string; label: string };
  location: string;
  description: string;
  deepth: string;
  temperature: string;
  instructor: string;
  suit: string;
  updatedAt: string;
};
