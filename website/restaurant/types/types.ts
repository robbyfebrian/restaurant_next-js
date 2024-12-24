export type Categories = {
  id: number;
  name: string;
};

export type Profile = {
  id: 0;
  name: string;
  logo: string;
  about_us: string;
  address: string;
  phone: string;
  email: string;
  facebook: string;
  instagram: string;
  twitter: string;
};

export type Faq = {
  id: number;
  question: string;
  answer: string;
};

export type Menu = {
  id: number;
  category: string;
  name: string;
  image: string;
  price: number;
  description: string;
};

export type OpeningHour = {
  id: number;
  day: string;
  opening_time: string;
  closing_time: string;
};
