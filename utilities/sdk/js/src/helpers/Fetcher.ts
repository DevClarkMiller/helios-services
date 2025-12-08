import {
  type FetcherData,
  buildHeaders,
  normalizeFetcherData,
} from "./ApiHelpers.js";

const fetcher = async (url: string | URL): Promise<FetcherData> => {
  const payload: FetcherData = {};

  try {
    const headers = buildHeaders();

    const response = await fetch(url.toString(), { headers: headers });
    if (response.status == 401) throw new Error("Unauthorized");
    const data = await response.json();
    payload.data = data;
  } catch (err: unknown) {
    const errorMessage: string =
      err instanceof Error ? err.message : "Unknown error occured";
    console.log("Error getting auth: " + errorMessage);
    payload.error = errorMessage;
  }

  return normalizeFetcherData(payload);
};

export default fetcher;
