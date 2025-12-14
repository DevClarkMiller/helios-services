import React, { createContext, useMemo, useState } from 'react';

export interface AppContextType {
	page: string;
	isSideNavOpen: boolean;
	setPage: React.Dispatch<React.SetStateAction<string>>;
	setIsSideNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType>({} as any);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [page, setPage] = useState('Home');
	const [isSideNavOpen, setIsSideNavOpen] = useState(false);

	const value = useMemo(() => {
		return { isSideNavOpen, page, setPage, setIsSideNavOpen };
	}, [isSideNavOpen, page, setPage, setIsSideNavOpen]);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
