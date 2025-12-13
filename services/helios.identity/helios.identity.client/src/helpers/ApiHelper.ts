import type { FetcherData } from 'helios-utilities-sdk';
import { IDENTITY_URL } from '../constants/IdentityConstants';

export const buildUrl = (url: string): URL => {
	return new URL(`${window.location.origin}${url}`);
};

export const identityClient = async <T extends FetcherData<any>>(
	method: (_baseUrl: string) => T | Promise<T>
): Promise<T> => {
	return await method(IDENTITY_URL);
};
