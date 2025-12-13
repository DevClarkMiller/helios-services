import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { auth, getUser, type User } from 'helios-identity-sdk';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { FetcherData } from 'helios-utilities-sdk';
import { identityClient } from '../helpers/ApiHelper';

export interface AccountContextType {
	isSignedIn: boolean;
	user: User | undefined;
	isAuthLoading: boolean;
	identityClientSecure: typeof identityClient;
}

export const AccountContext = createContext<AccountContextType>({} as any);

const AccountContextProvider = ({ children }: { children: React.ReactNode }) => {
	const navigate = useNavigate();
	const [isAuthLoading, setIsAuthLoading] = useState(false);
	const [user, setUser] = useState<User>();
	const [isSignedIn, setIsSignedIn] = useState(false);

	const [searchParams] = useSearchParams();
	const paramToken = useMemo(() => searchParams.get('token'), [searchParams]);
	const redirectUrl = useMemo(() => searchParams.get('redirectUrl'), [searchParams]);

	const isAuthenticated = useCallback(async () => {
		let resp = await identityClient(auth);
		return resp.data != null;
	}, []);

	const onAuth = useCallback(async () => {
		setIsSignedIn(true);
		const resp = await identityClient(getUser);
		if (resp.data) setUser(resp.data);
	}, []);

	const setTokenFromParams = useCallback(() => {
		if (!paramToken) return;
		localStorage.setItem('token', paramToken as string);

		const url = new URL(window.location.href);
		url.searchParams.delete('token', paramToken);
		window.history.replaceState({}, '', url.toString());
	}, [paramToken]);

	const redirectToHost = useCallback(() => {
		if (!redirectUrl) return true;

		const token = localStorage.getItem('token') as string;

		const url = new URL(redirectUrl);
		url.searchParams.append('token', token);
		window.location.href = url.toString();
		return true;
	}, [redirectUrl]);

	const login = useCallback(async () => {
		setIsAuthLoading(true);

		let isAuth = await isAuthenticated();

		if (isAuth) {
			await onAuth();
		} else if (paramToken) {
			setTokenFromParams();
			isAuth = await isAuthenticated();
			if (isAuth) {
				await onAuth();
				redirectToHost();
			} else {
				navigate({ pathname: '/login', search: searchParams.toString() });
			}
		} else {
			navigate({ pathname: '/login', search: searchParams.toString() });
		}

		setIsAuthLoading(false);
	}, [isAuthenticated, onAuth, paramToken, navigate, searchParams, setTokenFromParams, redirectToHost]);

	// First thing we do on mount is check if the users login token is valid
	// First try auth
	useEffect(() => {
		login();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const identityClientSecure = useCallback(
		async <T extends FetcherData<any>>(method: (_baseUrl: string) => T | Promise<T>): Promise<T> => {
			const payload = await identityClient(method);

			if (payload.unauthorized) {
				login();
			}

			return payload;
		},
		[login]
	);

	const value = useMemo(() => {
		return { isSignedIn, user, isAuthLoading, identityClientSecure };
	}, [isSignedIn, user, isAuthLoading, identityClientSecure]);

	return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
};

export default AccountContextProvider;
