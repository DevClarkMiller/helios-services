import type React from 'react';
import { Link } from 'react-router-dom';

export interface SideNavItemProps {
	icon: React.ReactNode;
	to: string;
	text: string;
}

const SideNavItem = ({ icon, to, text }: SideNavItemProps) => {
	return (
		<li>
			<Link
				to={to}
				className="d-flex align-items-center text-decoration-none text-secondary fw-semibold"
				style={{ gap: '4px' }}>
				<span className="d-flex align-items-center">{icon}</span>
				<span>{text}</span>
			</Link>
		</li>
	);
};

export default SideNavItem;
