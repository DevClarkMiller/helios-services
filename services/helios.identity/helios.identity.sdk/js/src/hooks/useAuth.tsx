import { useCallback, useEffect, useMemo, useState } from "react";
import { login } from "../services/index.js";

export interface UseAuthOptions {
  optional: boolean;
  identityApiUrl?: string | null;
}

const useAuth = (
  identityUrl: string,
  searchParams: any,
  setSearchParams: any,
  options: UseAuthOptions = { optional: false, identityApiUrl: null }
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const tokenParam = useMemo(() => searchParams.get("token"), [searchParams]);
  const { optional, identityApiUrl } = options;

  const getToken = useCallback((): string | null => {
    if (tokenParam) {
      localStorage.setItem("token", tokenParam);

      // Only delete token if it exists in URL
      const newParams = new URLSearchParams(searchParams);
      if (newParams.has("token")) {
        newParams.delete("token");
        setSearchParams(newParams);
      }

      return tokenParam;
    }

    return localStorage.getItem("token");
  }, [tokenParam, searchParams, setSearchParams]);

  const tryLogin = useCallback(async () => {
    setIsLoading(true);

    const data = await login(identityUrl, { optional, identityApiUrl: identityApiUrl ?? identityUrl });

    if (data) setIsLoggedIn(true);
    setIsLoading(false);
  }, [identityUrl, optional, identityApiUrl]);

  useEffect(() => {
    getToken();
    tryLogin();
  }, [getToken, tryLogin]);

  return { isLoading, isLoggedIn, setIsLoggedIn };
};

export default useAuth;
