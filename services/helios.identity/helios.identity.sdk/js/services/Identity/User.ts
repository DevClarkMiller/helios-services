import { type FetcherData } from "../../helpers/ApiHelper";
import fetcher from "../../helpers/Fetcher";

const BASE_URL = "/api/identity";

const buildUrl = (identityUrl: string, route: string): URL =>
  new URL(`${identityUrl}${BASE_URL}${route}`);

export const getUser = async (identityUrl: string): Promise<FetcherData> => {
  const url = buildUrl(identityUrl, "/user");
  const payload = await fetcher(url);
  return payload;
};
