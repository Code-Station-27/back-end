import { User } from '.prisma/client';

export type ITokenResponse = {
  access_token: string;
  refresh_token: string;
};

export type ILoginResponse = ITokenResponse & {
  user: User;
};

export type IAccessTokenResponse = {
  access_token: string;
};
