import { UnauthorizedError } from "../errors/UnauthorizedError.js";

const NESTED_KEYS = ["data", "error", "succeeded"];

export const buildHeaders = (): Headers => {
  const headers = new Headers();
  const token = localStorage.getItem("token") as string;
  if (token) {
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);
  } else {
    headers.append("Content-Type", "application/json");
  }

  return headers;
};

export const buildUrl = (url: string): URL => {
  return new URL(`${window.location.origin}${url}`);
};

export const normalizeFetcherData = (fetcherData: FetcherData) => {
  const data = fetcherData.data as any;
  if (!data) return fetcherData;

  NESTED_KEYS.forEach((key) => {
    if (key in data) (fetcherData as any)[key] = data[key];
  });

  return fetcherData;
};

export const handleErr = (err: unknown, payload: FetcherData): FetcherData => {
  let errorMessage = "";

  if (err instanceof UnauthorizedError) {
    errorMessage = err.message;
    payload.unauthorized = true;
  } else if (err instanceof Error) errorMessage = err.message;
  else errorMessage = "Unknown error occured";

  console.log("Error: " + errorMessage);
  payload.error = errorMessage;
  return payload;
};

export interface FetcherData {
  data?: unknown;
  error?: string;
  succeeded?: boolean;
  unauthorized?: boolean;
}
