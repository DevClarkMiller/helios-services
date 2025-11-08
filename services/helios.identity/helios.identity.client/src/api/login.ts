const BASE = import.meta.env.VITE_APP_API;

interface FetcherData {
	data?: unknown;
	error?: string;
}

export const loginGoogle = async () => {
	const url = new URL(`${BASE}/auth/login-google`);
	url.searchParams.append('returnUrl', window.location.href);
	window.location.href = url.toString();
};

export const auth = async (): Promise<FetcherData> => {
	const payload: FetcherData = {};

	try {
		const url = new URL(`${BASE}/auth`);
		const headers = buildHeaders();

		const response = await fetch(url, { headers: headers });
		alert(await response);
	} catch (err: unknown) {
		const errorMessage: string = err instanceof Error ? err.message : 'Unknown error occured';
		payload.error = errorMessage;
	}

	return payload;
};

// export const build

// const fetcher = async (endpoint: string): Promise<FetcherData> => {
//   let payload: FetcherData = {};
//   const headers = buildHeaders();
//   try {
//     const response = await fetch(`${serverURL}${endpoint}`, {
//       headers: headers,
//     });
//     payload.data = await response.json();
//   } catch (err: unknown) {
//     const errorMessage: string = err instanceof Error ? err.message : 'Unknown error occured';
//     console.log(`Error on endpoint ${endpoint}, ${errorMessage}`);
//     payload = { error: errorMessage };
//   }
//   return payload;
// };

// const poster = async (endpoint, dataToPost) => {
//   let payload;
//   const headers = buildHeaders();
//   try {
//     const response = await fetch(`${serverURL}${endpoint}`, {
//       method: 'POST',
//       headers: headers,
//       body: JSON.stringify(dataToPost),
//     });
//     payload = await response.json();
//   } catch (error) {
//     payload = error;
//   }
//   return payload;
// };

const buildHeaders = (): Headers => {
	const headers = new Headers();
	const token = JSON.parse(localStorage.getItem('token') as string);
	if (token) {
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', 'Bearer ' + token);
	} else {
		headers.append('Content-Type', 'application/json');
	}
	return headers;
};

// export const login = async (): Promise<any> => {
// 	const response = await fetch(`${BASE}/auth/login-google`);
// 	return await response.json();
// };
