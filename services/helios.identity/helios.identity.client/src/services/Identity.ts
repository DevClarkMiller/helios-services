const IDENTITY_URL = import.meta.env.VITE_IDENTITY_URL;
const BASE_URL = '/api/identity';

export const buildIdentityUrl = (route: string) => new URL(`${IDENTITY_URL}${BASE_URL}${route}`);

export const loginGoogle = async () => {
	const url = buildIdentityUrl('/auth/login-google');
	const returnUrl = new URL(window.location.href);

	url.searchParams.append('returnUrl', returnUrl.toString());
	window.location.href = url.toString();
};
