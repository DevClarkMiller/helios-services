import { useContext } from 'react';
import { AccountContext } from '../../../context/AccountContextProvider';

const AccountInfo = () => {
	const { user } = useContext(AccountContext);
	return (
		<div className="card p-2">
			<div className="card-body">
				<h6>User ID: {user?.id}</h6>
			</div>
		</div>
	);
};

export default AccountInfo;
