import React from 'react';

export interface SharedSideNavProps {
	page: string;
	setPage: React.Dispatch<React.SetStateAction<string>>;
}
