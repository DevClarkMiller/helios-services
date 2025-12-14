import { useContext } from 'react';
import type { IntegratedAccountCardProvider } from '../../../../types/IntegratedAccount';
import { AccountContext } from '../../../../context/AccountContextProvider';
import FieldListItem from './FieldListItem';

export interface IntegratedAccountModalProps {
	provider: IntegratedAccountCardProvider | null;
	onClose: () => void;
}

const IntegratedAccountModal = ({ provider, onClose }: IntegratedAccountModalProps) => {
	const { user } = useContext(AccountContext);

	if (!provider) return;
	const userLogin = user?.logins.find(ul => ul.providerId == provider.id);
	const numConnectedApps = 1;

	return (
		<div className="modal fade show d-block">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content bg-secondary">
					<div className="modal-header text-light" style={{ borderBottom: '1px solid rgb(33, 37, 41)' }}>
						<h1 className="modal-title fs-5" id="staticBackdropLabel">
							{provider.name} Account Info
						</h1>
						<button onClick={onClose} type="button" className="btn-close" aria-label="Close" />
					</div>
					<div className="modal-body text-light">
						{/* TODO: UPDATE API TO REQUIRE A SERVICE IE) TIC-TAC-TOE TO REGISTER BEFORE IT CAN USE IDENTITY */}
						{/* THEN USE THAT TO TRACK THE NUMBER OF SERVICES LINKED */}
						<div className="row w-100 m-0 gap-3 gap-md-1">
							<FieldListItem colSize={12} title="Registered Email: ">
								{userLogin?.email}
							</FieldListItem>
							<FieldListItem colSize={12} title="Number Connected Apps: ">
								{numConnectedApps}
							</FieldListItem>
						</div>
					</div>
					<div className="modal-footer" style={{ borderTop: '1px solid rgb(33, 37, 41)' }}>
						<button onClick={onClose} type="button" className="btn btn-info text-white fw-semibold">
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default IntegratedAccountModal;
