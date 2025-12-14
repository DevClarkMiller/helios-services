import { useContext } from 'react';
import { AccountContext } from '../../../context/AccountContextProvider';
import { humanizeDateFromIso } from '../../../helpers/DateHelper';
import IntegratedAccounts from './IntegratedAccounts/IntegratedAccounts';

const AccountInfo = () => {
	const { user } = useContext(AccountContext);

	if (!user) return null;

	const lastLogin = user?.lastLoginAt ? humanizeDateFromIso(user?.lastLoginAt) : '';

	return (
		<div className="w-100 h-100 p-1 d-flex flex-column" style={{ gap: '8px' }}>
			<h4 className="m-0">
				Last Login Time: <span className="fw-normal">{lastLogin}</span>
			</h4>
			<div>
				<IntegratedAccounts user={user} />
			</div>
		</div>
	);
};

export default AccountInfo;
