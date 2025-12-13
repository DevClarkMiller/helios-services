import SideNavItem from './SideNavItem';

import { GrServices } from 'react-icons/gr';
import { FaHome } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';

const SideNav = () => {
	return (
		<div className="sidenav p-2 m-0 bg-secondary">
			<h4>Dashboard</h4>
			<nav className="card bg-primary border-0">
				<ul className="d-flex flex-column p-1 m-0" style={{ listStyle: 'none', gap: '8px' }}>
					<SideNavItem to="/" text="Home" icon={<FaHome />} />
					<SideNavItem to="/linkedServices" text="Linked Services" icon={<GrServices />} />
					<SideNavItem to="/settings" text="Settings" icon={<IoIosSettings />} />
				</ul>
			</nav>
		</div>
	);
};

export default SideNav;
