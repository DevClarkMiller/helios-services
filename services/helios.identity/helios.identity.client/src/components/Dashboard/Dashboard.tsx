import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import AccountInfo from './AccountInfo/AccountInfo';
import { RxHamburgerMenu } from 'react-icons/rx';
import type { SharedSideNavProps } from '../../types/SideNav';
import { AppContext } from '../../context/AppContextProvider';
import SideNav from './SideNav/SideNav';

export interface SideNavProps extends SharedSideNavProps {
	isSideNavOpen: boolean;
	setIsSideNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dashboard = () => {
	const { page, setPage, setIsSideNavOpen } = useContext(AppContext);

	return (
		<div className="row w-100 h-100 text-white m-0 align-items-start justify-content-start">
			<div className="col-12 d-md-none">
				<button
					className="h-100 btn text-white d-flex align-items-center justify-content-start p-0 pt-1"
					style={{ fontSize: '40px' }}
					onClick={() => setIsSideNavOpen(prevIsSideNavOpen => !prevIsSideNavOpen)}>
					<RxHamburgerMenu />
				</button>
			</div>
			<div className="col-2 p-0 h-100 d-none d-md-block">
				<SideNav page={page} setPage={setPage} />
			</div>
			<div className="col-12 col-md h-100">
				<Routes>
					<Route path="/" element={<AccountInfo />} />
				</Routes>
			</div>
		</div>
	);
};

export default Dashboard;
