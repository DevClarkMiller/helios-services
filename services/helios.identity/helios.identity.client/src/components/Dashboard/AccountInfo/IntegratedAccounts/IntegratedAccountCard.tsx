import { FaSun, FaGoogle, FaMicrosoft, FaPlus } from 'react-icons/fa';

const PROVIDERS = [
	{
		name: 'Google',
		icon: <FaGoogle />,
	},
	{
		name: 'Microsoft',
		icon: <FaMicrosoft />,
	},
	{
		name: 'Helios',
		icon: <FaSun />,
	},
	{
		name: 'Add New',
		icon: <FaPlus />,
	},
];

export const ADD_ACCOUNT_KEY = 4;

export interface IntegratedAccountCardProps {
	integratedAccountCount?: number;
	providerId: number;
}

const IntegratedAccountCard = ({ integratedAccountCount = 1, providerId }: IntegratedAccountCardProps) => {
	const provider = PROVIDERS[providerId - 1];
	const canRemove = integratedAccountCount > 1 && providerId != ADD_ACCOUNT_KEY;

	// TODO: ADD LOGIC BEHIND THESE: IE MERGING OF ACCOUNTS

	const onMoreInfo = () => {
		if (providerId != ADD_ACCOUNT_KEY) console.log('Cannot remove only account integrated into service');
		else console.log('Learn how to integrate more accounts');
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
			<div className="integrated-account-card card text-white">
				<div className="w-100 text-center fw-semibold p-2 pb-0">{provider.name}</div>
				<div className="fw-semibold d-flex align-items-center flex-grow-1 p-2" style={{ fontSize: '50px' }}>
					{provider.icon}
				</div>
				<button
					disabled
					onClick={onClick}
					className={`btn w-100 fw-semibold text-white ${canRemove ? 'btn-danger' : 'btn-info'}`}>
					{canRemove ? 'Remove' : 'More Info'}
				</button>
			</div>
		</>
	);
};

export default IntegratedAccountCard;
