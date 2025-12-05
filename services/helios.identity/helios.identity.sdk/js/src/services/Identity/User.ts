import { fetcher, type FetcherData } from "helios-utilities-sdk";
const BASE_URL = "/api/identity";

const buildUrl = (identityUrl: string, route: string): URL =>
  new URL(`${identityUrl}${BASE_URL}${route}`);

export interface UserLogin {
  userId: string;
  providerId: number;
  providerKey: string;
  email: string;
}

export interface User {
  id: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  createdAt: string;
  lastLoginAt?: string;
  isEmailVerified: boolean;
  logins: UserLogin[];
}

export const getUser = async (identityUrl: string): Promise<User> => {
  const url = buildUrl(identityUrl, "/user");
  const payload = await fetcher(url);
  return payload.data as User;
};
