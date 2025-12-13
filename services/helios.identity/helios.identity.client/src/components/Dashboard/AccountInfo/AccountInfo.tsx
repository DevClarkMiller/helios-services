import { useContext } from 'react';
import { AccountContext } from '../../../context/AccountContextProvider';

const AccountInfo = () => {
	const { user } = useContext(AccountContext);

	return (
		<div className="w-100 h-100 p-1">
			<h4>Last logged in: {user?.lastLoginAt}</h4>
		</div>
	);
};

export default AccountInfo;
