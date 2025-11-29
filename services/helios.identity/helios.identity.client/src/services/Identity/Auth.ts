import { buildHeaders, type FetcherData } from '../../helpers/ApiHelper';

const IDENTITY_URL = import.meta.env.VITE_IDENTITY_URL;
const BASE_URL = '/api/identity';

export const buildIdentityUrl = (route: string) => new URL(`${IDENTITY_URL}${BASE_URL}${route}`);

export const loginGoogle = async () => {
	const url = buildIdentityUrl('/auth/login-google');
	url.searchParams.append('returnUrl', window.location.href);
	window.location.href = url.toString();
};

export const auth = async (): Promise<FetcherData> => {
	const payload: FetcherData = {};

	try {
		const url = buildIdentityUrl('/auth');
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
