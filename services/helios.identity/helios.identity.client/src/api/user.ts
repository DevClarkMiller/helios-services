import { buildHeaders, type FetcherData } from './ApiHelper';

const BASE = import.meta.env.VITE_APP_API;

export const getUser = async (): Promise<unknown> => {
	const payload: FetcherData = {};

	try {
		const url = new URL(`${BASE}/user`);
		const headers = buildHeaders();

		const response = await fetch(url.toString(), { headers: headers });
		if (response.status == 401) throw new Error('Unauthorized');
		const responseData = await response.json();
		payload.data = responseData.data;
	} catch (err: unknown) {
		const errorMessage: string = err instanceof Error ? err.message : 'Unknown error occured';
		payload.error = errorMessage;
	}

	return payload;
};
