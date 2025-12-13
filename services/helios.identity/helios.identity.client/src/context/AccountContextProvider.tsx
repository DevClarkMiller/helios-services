import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { auth, getUser, type User } from 'helios-identity-sdk';
import { identityClient } from '../helpers/ApiHelper';
import { useNavigate, useSearchParams } from 'react-router-dom';

export interface AccountContextType {
	isSignedIn: boolean;
	user: User | undefined;
	isAuthLoading: boolean;
}

export const AccountContext = createContext<AccountContextType>({} as any);

const AccountContextProvider = ({ children }: { children: React.ReactNode }) => {
	const navigate = useNavigate();
	const [isAuthLoading, setIsAuthLoading] = useState(false);
	const [user, setUser] = useState<User>();
	const [isSignedIn, setIsSignedIn] = useState(false);

	const [searchParams] = useSearchParams();
	const paramToken = searchParams.get('token');
	const redirectUrl = searchParams.get('redirectUrl');

	const isAuthenticated = async () => {
		let resp = await identityClient(auth);
		return resp.data != null;
	};

	const onAuth = useCallback(async () => {
		setIsSignedIn(true);
		const fetchedUser = await identityClient(getUser);
		setUser(fetchedUser);
	}, []);

	const setTokenFromParams = useCallback(() => {
		if (!paramToken) return;
		localStorage.setItem('token', paramToken as string);

		const url = new URL(window.location.href);
		url.searchParams.delete('token', paramToken);
		window.history.replaceState({}, '', url.toString());
	}, [paramToken]);

	const redirectToHost = useCallback(
		(isAuth: boolean) => {
			if (!isAuth) return;
			if (!redirectUrl) return true;

			const token = localStorage.getItem('token') as string;

			const url = new URL(redirectUrl);
			url.searchParams.append('token', token);
			window.location.href = url.toString();
			return true;
		},
		[redirectUrl]
	);

	const login = useCallback(async () => {
		setIsAuthLoading(true);
		const isAuth = await isAuthenticated();

		if (isAuth) await onAuth();
		else if (paramToken != null) {
			setTokenFromParams();
			const isAuth = await isAuthenticated();
			redirectToHost(isAuth);
		} else navigate({ pathname: '/login', search: searchParams.toString() });

		setIsAuthLoading(false);
	}, [redirectToHost, onAuth, paramToken, navigate, searchParams, setTokenFromParams]);

	// First thing we do on mount is check if the users login token is valid
	// First try auth
	useEffect(() => {
		login();
	}, [login]);

	const value = useMemo(() => {
		return { isSignedIn, user, isAuthLoading };
	}, [isSignedIn, user, isAuthLoading]);

	return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
};

export default AccountContextProvider;
