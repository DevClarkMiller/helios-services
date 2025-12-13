import { useContext } from 'react';
import { AccountContext } from '../../../context/AccountContextProvider';
import { humanizeDateFromIso } from '../../../helpers/DateHelper';

const AccountInfo = () => {
	const { user } = useContext(AccountContext);

	const lastLogin = user?.lastLoginAt ? humanizeDateFromIso(user?.lastLoginAt) : '';

	return (
		<div className="w-100 h-100 p-1">
			<h4>Last logged in: {lastLogin}</h4>
		</div>
	);
};

export default AccountInfo;
