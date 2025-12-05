import {
  type FetcherData,
  buildHeaders,
  normalizeFetcherData,
} from "./ApiHelpers.js";

const poster = async (url: string | URL, body: any): Promise<FetcherData> => {
  const payload: FetcherData = {};

  try {
    const headers = buildHeaders();

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: headers,
      body: body,
    });
    if (response.status == 401) throw new Error("Unauthorized");
    payload.data = await response.json();
  } catch (err: unknown) {
    const errorMessage: string =
      err instanceof Error ? err.message : "Unknown error occured";
    console.log("Error getting auth: " + errorMessage);
    payload.error = errorMessage;
  }

  return normalizeFetcherData(payload);
};

export default poster;
