const BASE = import.meta.env.VITE_APP_API;
const CLIENT_URL = import.meta.env.VITE_APP_CLIENT_URL;

export const loginGoogle = async () => {
	const url = new URL(`${BASE}/auth/login-google`);
	url.searchParams.append('returnUrl', CLIENT_URL);
	window.location.href = url.toString();
};

// export const login = async (): Promise<any> => {
// 	const response = await fetch(`${BASE}/auth/login-google`);
// 	return await response.json();
// };
