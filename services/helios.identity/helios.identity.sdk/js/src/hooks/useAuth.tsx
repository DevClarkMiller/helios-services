import { useCallback, useEffect, useState } from "react";
import { login } from "../services/index.js";

export interface UseAuthOptions {
  optional: boolean;
  identityApiUrl?: string | null;
}

const useAuth = (
  identityUrl: string,
  searchParams: any,
  setSearchParams: any,
  options: UseAuthOptions = {
    optional: false,
    identityApiUrl: null,
  }
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = searchParams.get("token");

  const getToken = useCallback((): string | null => {
    if (!token) {
      // Check local storage
      const tokenFromStorage = localStorage.getItem("token");
      return tokenFromStorage;
    }

    // Set the token from params into local storage and then delete the token from parms
    localStorage.setItem("token", token as string);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("token");
    setSearchParams(newParams);
    return token;
  }, [searchParams, setSearchParams, token]);

  const tryLogin = useCallback(async () => {
    setIsLoading(true);
    const data = await login(identityUrl, {
      optional: options.optional,
      identityApiUrl: options.identityApiUrl!,
    });

    setIsLoading(false);
    if (data) setIsLoggedIn(true);
  }, [options]);

  useEffect(() => {
    getToken();
    tryLogin();
  }, [
    searchParams,
    setSearchParams,
    token,
    getToken,
    options.optional,
    tryLogin,
  ]);

  return { isLoading, isLoggedIn, setIsLoggedIn };
};

export default useAuth;
