export type jobItem = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  date: string;
  relevanceScore: number;
  daysAgo: number;
};

export type jobDetail = jobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  location: string;
  salary: string;
  coverImgUrl: string;
  companyUrl: string;
};
