import { Route, Routes } from 'react-router-dom';
import SideNav from './SideNav/SideNav';
import AccountInfo from './AccountInfo/AccountInfo';

const Dashboard = () => {
	return (
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
	);
};

export default Dashboard;
