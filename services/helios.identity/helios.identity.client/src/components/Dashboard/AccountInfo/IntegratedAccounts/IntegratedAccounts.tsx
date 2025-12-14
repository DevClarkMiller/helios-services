import type { User } from 'helios-identity-sdk';
import IntegratedAccountCard, { ADD_ACCOUNT_KEY } from './IntegratedAccountCard';

export interface IntegratedAccountsProps {
	user: User;
}

const IntegratedAccounts = ({ user }: IntegratedAccountsProps) => {
	return (
		<div>
			<h5>Your Integrated Accounts</h5>
			<div
				className="row justify-content-center justify-content-md-start w-100 h-100 m-0"
				style={{ gap: '12px' }}>
				{user.logins.map(userLogin => (
					<div className="col-auto p-0" key={`providerId-${userLogin.providerId}`}>
						<IntegratedAccountCard
							integratedAccountCount={user.logins.length}
							providerId={userLogin.providerId}
						/>
					</div>
				))}
				<div className="col-auto p-0" key={`providerId-${ADD_ACCOUNT_KEY}}`}>
					<IntegratedAccountCard providerId={ADD_ACCOUNT_KEY} />
				</div>
			</div>
		</div>
	);
};

export default IntegratedAccounts;
