import { IDENTITY_URL } from '../constants/IdentityConstants';

export const buildHeaders = (): Headers => {
	const headers = new Headers();
	const token = localStorage.getItem('token') as string;
	if (token) {
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', 'Bearer ' + token);
	} else {
		headers.append('Content-Type', 'application/json');
	}
	return headers;
};

export const identityClient = <T>(method: (_baseUrl: string) => T): T => method(IDENTITY_URL);

export const buildUrl = (url: string): URL => {
	return new URL(`${window.location.origin}${url}`);
};

export interface FetcherData {
	data?: unknown;
	error?: string;
}
