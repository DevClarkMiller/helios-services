const Header = () => {
	const appName = import.meta.env.VITE_APP_NAME;

	return (
		<header className="shadow-lg bg-secondary w-100 p-3">
			<h2 className="text-secondary fw-bold text-light text-light">{appName}</h2>
		</header>
	);
};

export default Header;
