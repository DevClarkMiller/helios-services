const BASE = import.meta.env.VITE_APP_API;

export const loginGoogle = async () => {
	window.location.href = `${BASE}/auth/login-google`;
};

// export const login = async (): Promise<any> => {
// 	const response = await fetch(`${BASE}/auth/login-google`);
// 	return await response.json();
// };
