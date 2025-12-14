import type { User } from 'helios-identity-sdk';
import IntegratedAccountCard, { ADD_ACCOUNT_KEY } from './IntegratedAccountCard';
import IntegratedAccountModal from './IntegratedAccountModal';
import type { IntegratedAccountCardProvider } from '../../../../types/IntegratedAccount';
import { FaGoogle, FaMicrosoft, FaPlus } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useState } from 'react';
import MoreInformationModal from './MoreInformationModal';

export interface IntegratedAccountsProps {
	user: User;
}

const PROVIDERS: IntegratedAccountCardProvider[] = [
	{
		id: 1,
		name: 'Google',
		icon: <FaGoogle />,
		hasOptions: true,
	},
	{
		id: 2,
		name: 'Microsoft',
		icon: <FaMicrosoft />,
		hasOptions: true,
	},
	{
		id: 3,
		name: 'Email',
		icon: <MdEmail />,
		hasOptions: true,
	},
	{
		id: 4,
		name: 'Add New',
		icon: <FaPlus />,
		hasOptions: false,
	},
];

const IntegratedAccounts = ({ user }: IntegratedAccountsProps) => {
	const [showMoreInfoModal, setShowMoreInfoModal] = useState(false);
	const [selectedProvider, setSelectedProvider] = useState<IntegratedAccountCardProvider | null>(null);
	const getProvider = (providerId: number) => PROVIDERS[providerId - 1];

	const onCloseIntegratedAccountModal = () => {
		setSelectedProvider(null);
	};

	const onCloseShowMoreInfoModal = () => {
		setSelectedProvider(null);
		setShowMoreInfoModal(false);
	};

	const openIntegratedAccountModal = (providerId: number) => setSelectedProvider(getProvider(providerId));

	const openMoreInfoModal = (providerId: number) => {
		setSelectedProvider(getProvider(providerId));
		setShowMoreInfoModal(true);
	};

	return (
		<div>
			<h5 className="w-100 text-center text-md-start">Your Integrated Accounts</h5>
			<div
				className="row justify-content-center justify-content-md-start w-100 h-100 m-0"
				style={{ gap: '12px' }}>
				{user.logins.map(userLogin => (
					<div className="col-auto p-0" key={`providerId-${userLogin.providerId}`}>
						<IntegratedAccountCard
							openMoreInfoModal={openMoreInfoModal}
							openIntegratedAccountModal={openIntegratedAccountModal}
							integratedAccountCount={user.logins.length}
							provider={getProvider(userLogin.providerId)}
						/>
					</div>
				))}
				<div className="col-auto p-0" key={`providerId-${ADD_ACCOUNT_KEY}}`}>
					<IntegratedAccountCard
						openMoreInfoModal={openMoreInfoModal}
						openIntegratedAccountModal={openIntegratedAccountModal}
						integratedAccountCount={1}
						provider={getProvider(4)}
					/>
				</div>
			</div>
			{!showMoreInfoModal && selectedProvider && (
				<IntegratedAccountModal onClose={onCloseIntegratedAccountModal} provider={selectedProvider} />
			)}
			{showMoreInfoModal && (
				<MoreInformationModal onClose={onCloseShowMoreInfoModal} provider={selectedProvider} />
			)}
		</div>
	);
};

export default IntegratedAccounts;
