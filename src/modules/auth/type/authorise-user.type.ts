export type AuthorizedUserType = {
  user: User;
  accessToken: string;
};

type User = {
  userId: number;
  name: string;
  email: string;
};
