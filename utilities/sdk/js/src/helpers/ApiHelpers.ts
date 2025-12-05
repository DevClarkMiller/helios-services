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
  if ((fetcherData.data as any)?.data)
    fetcherData.data = (fetcherData.data as any).data;
  return fetcherData;
};

export interface FetcherData {
  data?: unknown;
  error?: string;
}
