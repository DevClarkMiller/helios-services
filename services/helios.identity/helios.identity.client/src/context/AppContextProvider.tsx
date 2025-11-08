import { createContext, useMemo, type ReactNode } from 'react';

interface AppContextType {
	t: string;
}

const AppContext = createContext<AppContextType>({} as any);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
	const value = useMemo<AppContextType>(() => {
		return { t: '' };
	}, []);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
