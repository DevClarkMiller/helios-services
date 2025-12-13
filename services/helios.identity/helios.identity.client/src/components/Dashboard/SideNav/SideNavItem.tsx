import type React from 'react';
import { Link } from 'react-router-dom';

export interface SideNavItemProps {
	page: string;
	icon: React.ReactNode;
	to: string;
	text: string;
	disabled?: boolean;
	setPage: React.Dispatch<React.SetStateAction<string>>;
}

const SideNavItem = ({ disabled, page, icon, to, text, setPage }: SideNavItemProps) => {
	const active = text == page;
	let conditionalClassName = active ? 'active' : '';
	conditionalClassName = disabled ? conditionalClassName + ' disabled' : conditionalClassName;

	return (
		<Link
			onClick={() => setPage(text)}
			to={to}
			aria-current={active ? 'true' : 'false'}
			className={`list-group-item list-group-item-action d-flex align-items-center text-decoration-none text-secondary fw-semibold ${conditionalClassName}`}
			style={{ gap: '4px' }}>
			<span className="d-flex align-items-center">{icon}</span>
			<span>{text}</span>
		</Link>
	);
};

export default SideNavItem;
