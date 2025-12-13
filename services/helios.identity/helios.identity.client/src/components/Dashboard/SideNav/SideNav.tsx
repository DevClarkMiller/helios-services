import SideNavItem from './SideNavItem';

import { GrServices } from 'react-icons/gr';
import { FaHome } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';
import { useContext } from 'react';
import { DashboardContext } from '../Dashboard';

const SideNav = () => {
	const { page, setPage } = useContext(DashboardContext);

	// TODO: IMPLMENET REST OF PAGES NEEDED

	return (
		<div className="sidenav p-2 m-0 bg-secondary">
			<h4>Dashboard</h4>
			<nav className="card bg-primary border-0 list-group">
				<SideNavItem page={page} setPage={setPage} to="/" text="Home" icon={<FaHome />} />
				<SideNavItem
					disabled
					page={page}
					setPage={setPage}
					to="/linkedServices"
					text="Linked Services"
					icon={<GrServices />}
				/>
				<SideNavItem
					disabled
					page={page}
					setPage={setPage}
					to="/settings"
					text="Settings"
					icon={<IoIosSettings />}
				/>
			</nav>
		</div>
	);
};

export default SideNav;
