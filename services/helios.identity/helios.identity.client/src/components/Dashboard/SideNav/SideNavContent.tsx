import type { SharedSideNavProps } from '../../../types/SideNav';

import SideNavItem from './SideNavItem';

import { GrServices } from 'react-icons/gr';
import { FaHome } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';

const SideNavContent = ({ page, setPage }: SharedSideNavProps) => {
	return (
		<>
			<h4>Dashboard</h4>
			<nav className="card bg-primary border-0 list-group bg-success">
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
		</>
	);
};

export default SideNavContent;
