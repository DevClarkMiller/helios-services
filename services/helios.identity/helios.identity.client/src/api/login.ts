import { buildHeaders, buildUrl, type FetcherData } from './ApiHelper';

export const loginGoogle = async () => {
	const url = buildUrl('/auth/login-google');
	url.searchParams.append('returnUrl', window.location.href);
	window.location.href = url.toString();
};

export const auth = async (): Promise<FetcherData> => {
	const payload: FetcherData = {};

	try {
		const url = buildUrl('/auth');
		const headers = buildHeaders();

		const response = await fetch(url.toString(), { headers: headers });
		if (response.status == 401) throw new Error('Unauthorized');
		payload.data = await response.text();
	} catch (err: unknown) {
		const errorMessage: string = err instanceof Error ? err.message : 'Unknown error occured';
		console.log('Error getting auth: ' + errorMessage);
		payload.error = errorMessage;
	}

	return payload;
};
