import { FaInfo } from 'react-icons/fa';
import type { IntegratedAccountCardProvider } from '../../../../types/IntegratedAccount';

export const ADD_ACCOUNT_KEY = 4;

export interface IntegratedAccountCardProps {
	integratedAccountCount?: number;
	provider: IntegratedAccountCardProvider;
	openIntegratedAccountModal: (providerId: number) => void;
	openMoreInfoModal: (providerId: number) => void;
}

const IntegratedAccountCard = ({
	integratedAccountCount = 1,
	provider,
	openIntegratedAccountModal,
	openMoreInfoModal,
}: IntegratedAccountCardProps) => {
	const canRemove = integratedAccountCount > 1 && provider.id != ADD_ACCOUNT_KEY;

	// TODO: ADD LOGIC BEHIND THESE: IE MERGING OF ACCOUNTS

	const onMoreInfo = () => {
		openMoreInfoModal(provider.id);
	};

	const onRemove = () => {
		console.log('On remove');
	};

	const onClick = () => {
		if (canRemove) onRemove();
		else onMoreInfo();
	};

	return (
		<>
			<div className="integrated-account-card card text-light">
				{provider.hasOptions ? (
					<button
						onClick={() => openIntegratedAccountModal(provider.id)}
						className="btn btn-info w-100 fw-semibold text-white rounded-0">
						<FaInfo />
					</button>
				) : (
					<div className="w-100 text-center fw-semibold p-2 pb-0">{provider.name}</div>
				)}
				<div className="fw-semibold d-flex align-items-center flex-grow-1 p-2" style={{ fontSize: '50px' }}>
					{provider.icon}
				</div>
				<button
					onClick={onClick}
					className={`btn p-0 remove-and-info-button w-100 fw-semibold text-light ${canRemove ? 'btn-danger' : 'btn-info'}`}>
					{canRemove ? 'Remove' : 'More Info'}
				</button>
			</div>
		</>
	);
};

export default IntegratedAccountCard;
