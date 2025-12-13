import React, { useMemo, useState } from 'react';

export interface DashboardContextType {
	page: string;
	setPage: React.Dispatch<React.SetStateAction<string>>;
}

const useDashboard = () => {
	const [page, setPage] = useState('Home');

	const contextValue = useMemo(() => {
		return { page, setPage };
	}, [page, setPage]);

	return { contextValue };
};

export default useDashboard;
