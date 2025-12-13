import type { User } from 'helios-identity-sdk';
import IntegratedAccountCard from './IntegratedAccountCard';

export interface IntegratedAccountsProps {
	user: User;
}

const IntegratedAccounts = ({ user }: IntegratedAccountsProps) => {
	return (
		<div>
			{user.logins.map(userLogin => (
				<IntegratedAccountCard providerId={userLogin.providerId} />
			))}
		</div>
	);
};

export default IntegratedAccounts;
