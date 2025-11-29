import { buildHeaders, buildUrl, type FetcherData } from '../../helpers/ApiHelper';

export const getUser = async (): Promise<unknown> => {
	const payload: FetcherData = {};

	try {
		const url = buildUrl('/api/identity/user');
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
