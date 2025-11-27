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

export const buildUrl = (url: string): URL => {
	if (window.location.href.includes('localhost')) return new URL(`https://localhost:7022${url}`);
	return new URL(url);
};

export interface FetcherData {
	data?: unknown;
	error?: string;
}
