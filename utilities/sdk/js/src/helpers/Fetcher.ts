import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import {
  type FetcherData,
  buildHeaders,
  handleErr,
  normalizeFetcherData,
} from "./ApiHelpers.js";

const fetcher = async <T>(
  url: string | URL,
  isText = false,
): Promise<FetcherData<T>> => {
  let payload: FetcherData<T> = {};

  try {
    const headers = buildHeaders();

    const response = await fetch(url.toString(), { headers: headers });
    if (response.status == 401) throw new UnauthorizedError("Unauthorized");
    const data = isText ? await response.text() : await response.json();
    payload.data = data;
  } catch (err: unknown) {
    payload = handleErr(err, payload);
  }

  return normalizeFetcherData(payload);
};

export default fetcher;
