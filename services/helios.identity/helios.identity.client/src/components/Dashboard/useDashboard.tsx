import React, { useState } from 'react';

export interface DashboardContextType {
	page: string;
	isSideNavOpen: boolean;
	setPage: React.Dispatch<React.SetStateAction<string>>;
	// setIsSideNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useDashboard = () => {
	const [page, setPage] = useState('Home');
	const [isSideNavOpen, setIsSideNavOpen] = useState(false);

	return { isSideNavOpen, page, setIsSideNavOpen, setPage };
};

export default useDashboard;
