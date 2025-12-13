import { Route, Routes } from 'react-router-dom';
import SideNav from './SideNav/SideNav';

const Dashboard = () => {
	return (
		<div className="w-100 h-100 row text-white m-0">
			<div className="col-2 p-0">
				<SideNav />
			</div>
			<div className="col-auto">
				<Routes>
					<Route path="/home" element={<>Home</>} />
				</Routes>
			</div>
		</div>
	);
};

export default Dashboard;
