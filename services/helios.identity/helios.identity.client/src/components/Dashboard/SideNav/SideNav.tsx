import type { SharedSideNavProps } from '../../../types/SideNav';
import SideNavContent from './SideNavContent';

const SideNav = ({ page, setPage }: SharedSideNavProps) => {
	return (
		<div className="sidenav d-none d-md-block p-2 m-0 bg-secondary">
			<SideNavContent page={page} setPage={setPage} />
		</div>
	);
};

export default SideNav;
