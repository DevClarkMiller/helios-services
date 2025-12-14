import type { IntegratedAccountCardProvider } from '../../../../types/IntegratedAccount';
import { ADD_ACCOUNT_KEY } from './IntegratedAccountCard';

export interface MoreInformationModalProps {
	provider: IntegratedAccountCardProvider | null;
	onClose: () => void;
}

const MoreInformationModal = ({ provider, onClose }: MoreInformationModalProps) => {
	const isAddNew = provider?.id == ADD_ACCOUNT_KEY;

	return (
		<div className="modal fade show d-block">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content bg-secondary">
					<div className="modal-header text-light" style={{ borderBottom: '1px solid rgb(33, 37, 41)' }}>
						<h1 className="modal-title fs-5" id="staticBackdropLabel">
							More Information
						</h1>
						<button onClick={onClose} type="button" className="btn-close" aria-label="Close" />
					</div>
					<div className="modal-body text-light">
						{isAddNew ? (
							<>
								Adding a new login provider merges existing identity accounts. Supported apps will also
								merge or allow you to choose an account.
							</>
						) : (
							<>You cannot delete this integration because it's your only one.</>
						)}
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

export default MoreInformationModal;
