import { fetcher, type FetcherData } from "helios-utilities-sdk";

const BASE_URL = "/api/identity";

const buildUrl = (identityUrl: string, route: string): URL =>
  new URL(`${identityUrl}${BASE_URL}${route}`);

export const auth = async (
  identityUrl: string
): Promise<FetcherData<unknown>> => {
  const url = buildUrl(identityUrl, "/auth");
  return await fetcher(url);
};

export interface LoginOptions {
  optional: boolean;
  identityApiUrl?: string | null;
}

// Try auth, if that doesn't work navigate to identity site giving window.location.href as return url
export const login = async (
  identityUrl: string,
  options: LoginOptions = { optional: false, identityApiUrl: null }
): Promise<any> => {
  const response = await auth(identityUrl);

  options.identityApiUrl ??= identityUrl;

  if (!response.error) return response.data;
  if (options.optional) return false;
  const newUrl = new URL(options.identityApiUrl);
  newUrl.searchParams.append("redirectUrl", window.location.href);

  window.location.href = newUrl.toString();
};
