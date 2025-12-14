import ReactSlidingPane from 'react-sliding-pane';
import type { SharedSideNavProps } from '../../../types/SideNav';
import SideNavContent from './SideNavContent';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContextProvider';

export interface MobileSideNavProps extends SharedSideNavProps {
	isOpen: boolean;
	onRequestClose: () => void;
}

const MobileSideNav = () => {
	const { page, setPage, isSideNavOpen, setIsSideNavOpen } = useContext(AppContext);

	return (
		<ReactSlidingPane
			className="d-md-none mobile-sidenav"
			onRequestClose={() => setIsSideNavOpen(false)}
			isOpen={isSideNavOpen}
			from="left"
			width="100%">
			<SideNavContent page={page} setPage={setPage} />
		</ReactSlidingPane>
	);
};

export default MobileSideNav;
