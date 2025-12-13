import { Route, Routes } from 'react-router-dom';
import SideNav from './SideNav/SideNav';
import AccountInfo from './AccountInfo/AccountInfo';
import { createContext } from 'react';
import useDashboard, { type DashboardContextType } from './useDashboard';

export const DashboardContext = createContext({} as DashboardContextType);

const Dashboard = () => {
	const { contextValue } = useDashboard();

	return (
		<DashboardContext.Provider value={contextValue}>
			<div className="row w-100 h-100 text-white m-0">
				<div className="col-2 p-0 h-100">
					<SideNav />
				</div>
				<div className="col">
					<Routes>
						<Route path="/" element={<AccountInfo />} />
					</Routes>
				</div>
			</div>
		</DashboardContext.Provider>
	);
};

export default Dashboard;
