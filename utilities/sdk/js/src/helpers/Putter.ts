import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import {
  buildHeaders,
  handleErr,
  normalizeFetcherData,
  type FetcherData,
} from "./ApiHelpers.js";

const putter = async (url: string | URL, body: any): Promise<FetcherData> => {
  let payload: FetcherData = {};

  try {
    const headers = buildHeaders();

    const response = await fetch(url.toString(), {
      method: "PUT",
      headers: headers,
      body: body,
    });
    if (response.status == 401) throw new UnauthorizedError("Unauthorized");
    payload.data = await response.json();
  } catch (err: unknown) {
    payload = handleErr(err, payload);
  }

  return normalizeFetcherData(payload);
};

export default putter;
